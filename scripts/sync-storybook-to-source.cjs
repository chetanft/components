#!/usr/bin/env node
/**
 * Sync Storybook Stories to Component Source
 * 
 * Extracts component metadata from Storybook stories and updates:
 * - Component TypeScript interfaces (from argTypes)
 * - Component JSDoc comments (from descriptions)
 * - Component prop documentation
 * 
 * Usage: node scripts/sync-storybook-to-source.cjs
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectRoot = path.join(__dirname, '..');
const storiesDir = path.join(projectRoot, 'src', 'stories');
const componentsDir = path.join(projectRoot, 'src', 'components');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[0m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function findStoryFiles() {
  const storyFiles = [];
  
  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walkDir(filePath);
      } else if (file.endsWith('.stories.tsx')) {
        storyFiles.push(filePath);
      }
    }
  }
  
  walkDir(storiesDir);
  walkDir(componentsDir);
  
  return storyFiles;
}

function parseStoryFile(storyPath) {
  try {
    const content = fs.readFileSync(storyPath, 'utf8');
    
    // Extract component import - handle multiple import patterns
    const importPatterns = [
      /import\s+{\s*(\w+)\s*}\s+from\s+['"]([^'"]+)['"]/,
      /import\s+(\w+)\s+from\s+['"]([^'"]+)['"]/,
    ];
    
    let componentName = null;
    let importPath = null;
    
    for (const pattern of importPatterns) {
      const match = content.match(pattern);
      if (match && match[2] && (match[2].includes('components') || match[2].includes('../'))) {
        componentName = match[1];
        importPath = match[2];
        break;
      }
    }
    
    if (!componentName || !importPath) {
      return null;
    }
    
    // Extract meta object - handle both Meta<typeof Component> and Meta<typeof meta>
    const metaPatterns = [
      /const\s+meta:\s*Meta<[^>]*>\s*=\s*({[\s\S]*?});/,
      /const\s+meta\s*=\s*({[\s\S]*?}):\s*Meta/,
    ];
    
    let metaStr = null;
    for (const pattern of metaPatterns) {
      const match = content.match(pattern);
      if (match) {
        metaStr = match[1];
        break;
      }
    }
    
    if (!metaStr) {
      // Try to find meta object without type annotation
      const simpleMatch = content.match(/const\s+meta[^=]*=\s*({[\s\S]*?});/);
      if (simpleMatch) {
        metaStr = simpleMatch[1];
      }
    }
    
    if (!metaStr) return null;
    
    // Extract component description
    const descPatterns = [
      /description:\s*{\s*component:\s*['"]([^'"]+)['"]/,
      /description:\s*['"]([^'"]+)['"]/,
    ];
    
    let description = null;
    for (const pattern of descPatterns) {
      const match = metaStr.match(pattern);
      if (match) {
        description = match[1];
        break;
      }
    }
    
    // Extract argTypes - handle nested objects
    const argTypes = {};
    const argTypesMatch = metaStr.match(/argTypes:\s*({[\s\S]*?})(?:\s*,?\s*(?:parameters|export|};|$))/);
    
    if (argTypesMatch) {
      const argTypesStr = argTypesMatch[1];
      
      // Parse each argType property
      const propPattern = /(\w+):\s*{([^}]+(?:{[^}]*}[^}]*)*)}/g;
      let propMatch;
      
      while ((propMatch = propPattern.exec(argTypesStr)) !== null) {
        const propName = propMatch[1];
        const propDef = propMatch[2];
        
        const controlMatch = propDef.match(/control:\s*['"]([^'"]+)['"]/);
        const descMatch = propDef.match(/description:\s*['"]([^'"]+)['"]/);
        const optionsMatch = propDef.match(/options:\s*\[([^\]]+)\]/);
        
        argTypes[propName] = {
          control: controlMatch ? controlMatch[1] : null,
          description: descMatch ? descMatch[1] : null,
          options: optionsMatch ? optionsMatch[1].split(',').map(o => o.trim().replace(/['"]/g, '')) : null,
        };
      }
    }
    
    // Determine component file path
    let componentPath = null;
    if (importPath.startsWith('../components/')) {
      const relPath = importPath.replace('../components/', '');
      componentPath = path.join(componentsDir, relPath, `${componentName}.tsx`);
    } else if (importPath.startsWith('./')) {
      const relPath = importPath.replace('./', '');
      componentPath = path.join(path.dirname(storyPath), relPath, `${componentName}.tsx`);
    } else if (importPath.includes('components/')) {
      const parts = importPath.split('components/');
      if (parts.length > 1) {
        const relPath = parts[1];
        componentPath = path.join(componentsDir, relPath, `${componentName}.tsx`);
      }
    }
    
    // If component path not found, try common patterns
    if (!componentPath || !fs.existsSync(componentPath)) {
      // Try finding component in atoms, molecules, organisms
      const possiblePaths = [
        path.join(componentsDir, 'atoms', componentName, `${componentName}.tsx`),
        path.join(componentsDir, 'molecules', componentName, `${componentName}.tsx`),
        path.join(componentsDir, 'organisms', componentName, `${componentName}.tsx`),
        path.join(componentsDir, 'templates', componentName, `${componentName}.tsx`),
      ];
      
      for (const possiblePath of possiblePaths) {
        if (fs.existsSync(possiblePath)) {
          componentPath = possiblePath;
          break;
        }
      }
    }
    
    return {
      componentName,
      importPath,
      description,
      argTypes,
      componentPath,
      storyPath,
    };
  } catch (error) {
    log(`⚠️  Error parsing ${storyPath}: ${error.message}`, 'yellow');
    return null;
  }
}

function updateComponentSource(componentInfo) {
  if (!componentInfo.componentPath || !fs.existsSync(componentInfo.componentPath)) {
    log(`   ⚠️  Component file not found: ${componentInfo.componentPath}`, 'yellow');
    return false;
  }
  
  try {
    let content = fs.readFileSync(componentInfo.componentPath, 'utf8');
    
    // Safety check: Skip if file already has corrupted syntax
    if (content.includes('} extends React.') && content.match(/} extends React\./g)?.length > 1) {
      log(`   ⚠️  File appears corrupted, skipping: ${componentInfo.componentName}`, 'yellow');
      return false;
    }
    
    let updated = false;
    
    // Update JSDoc comment if description exists
    if (componentInfo.description) {
      // Find props interface
      const propsInterfaceRegex = /(export\s+(?:interface|type)\s+\w+Props[^{]*\{)/;
      const interfaceMatch = content.match(propsInterfaceRegex);
      
      if (interfaceMatch) {
        const interfaceStart = interfaceMatch[1];
        const beforeInterface = content.substring(0, content.indexOf(interfaceStart));
        
        // Check if JSDoc already exists before interface
        const linesBefore = beforeInterface.split('\n');
        const lastFewLines = linesBefore.slice(-3).join('\n');
        
        if (!lastFewLines.includes('/**') || !lastFewLines.includes(componentInfo.description)) {
          // Add or update JSDoc comment
          const jsdoc = `/**\n * ${componentInfo.description}\n */\n`;
          
          // Remove existing JSDoc if present
          const cleanedBefore = beforeInterface.replace(/\/\*\*[\s\S]*?\*\/\s*$/, '');
          content = cleanedBefore + jsdoc + content.substring(content.indexOf(interfaceStart));
          updated = true;
        }
      }
    }
    
    // Update prop comments from argTypes
    if (Object.keys(componentInfo.argTypes).length > 0) {
      // Find props interface content
      const propsInterfaceRegex = /(export\s+(?:interface|type)\s+\w+Props[^{]*\{)([\s\S]*?)(\})/;
      const propsMatch = content.match(propsInterfaceRegex);
      
      if (propsMatch) {
        let propsContent = propsMatch[2];
        let propsUpdated = false;
        
        // Update each prop with description from argTypes
        for (const [propName, argType] of Object.entries(componentInfo.argTypes)) {
          if (argType.description) {
            // Find prop definition - handle multiline props
            const propRegex = new RegExp(`(\\s*)(/\\*\\*[\\s\\S]*?\\*/\\s*)?(${propName})(\\??:)([^;]+)(;?)`, 'g');
            let propMatch;
            
            while ((propMatch = propRegex.exec(propsContent)) !== null) {
              const indent = propMatch[1];
              const existingComment = propMatch[2];
              const propDef = propMatch[0];
              
              // Skip if comment already matches
              if (existingComment && existingComment.includes(argType.description)) {
                continue;
              }
              
              // Remove existing comment if present, add new one
              const propWithoutComment = propDef.replace(/\/\*\*[\s\S]*?\*\/\s*/, '');
              const newProp = `${indent}/** ${argType.description} */\n${indent}${propWithoutComment.trim()}`;
              
              propsContent = propsContent.replace(propDef, newProp);
              propsUpdated = true;
              break; // Only update first occurrence
            }
          }
        }
        
        if (propsUpdated) {
          content = content.replace(propsInterfaceRegex, `$1${propsContent}$3`);
          updated = true;
        }
      }
    }
    
    if (updated) {
      fs.writeFileSync(componentInfo.componentPath, content, 'utf8');
      return true;
    }
    
    return false;
  } catch (error) {
    log(`   ❌ Error updating ${componentInfo.componentPath}: ${error.message}`, 'red');
    return false;
  }
}

function syncStorybookToSource() {
  log('\n🔄 Syncing Storybook stories to component source...\n', 'cyan');
  log('⚠️  WARNING: This script is experimental and may corrupt files.', 'yellow');
  log('⚠️  Always commit your changes before running this script.', 'yellow');
  log('⚠️  Review changes carefully after running.\n', 'yellow');
  
  // Step 1: Find all story files
  log('1️⃣ Finding Storybook story files...', 'blue');
  const storyFiles = findStoryFiles();
  log(`   Found ${storyFiles.length} story files`, 'cyan');
  
  // Step 2: Parse story files
  log('\n2️⃣ Parsing story files...', 'blue');
  const componentInfos = [];
  for (const storyFile of storyFiles) {
    const info = parseStoryFile(storyFile);
    if (info) {
      componentInfos.push(info);
      log(`   ✅ Parsed: ${info.componentName}`, 'green');
    }
  }
  
  log(`\n   Parsed ${componentInfos.length} components`, 'cyan');
  
  // Step 3: Update component source files
  log('\n3️⃣ Updating component source files...', 'blue');
  let updatedCount = 0;
  let skippedCount = 0;
  
  for (const info of componentInfos) {
    log(`   Processing: ${info.componentName}`, 'cyan');
    if (updateComponentSource(info)) {
      log(`   ✅ Updated: ${info.componentName}`, 'green');
      updatedCount++;
    } else {
      log(`   ⏭️  Skipped: ${info.componentName}`, 'yellow');
      skippedCount++;
    }
  }
  
  // Summary
  log('\n═══════════════════════════════════════', 'green');
  log('✅ Storybook to Source Sync Complete!', 'bold');
  log('═══════════════════════════════════════', 'green');
  log(`\n📊 Summary:`, 'cyan');
  log(`   • Total components: ${componentInfos.length}`, 'cyan');
  log(`   • Updated: ${updatedCount}`, 'green');
  log(`   • Skipped: ${skippedCount}`, 'yellow');
  log(`\n💡 Component source files have been updated with Storybook metadata`, 'cyan');
}

// Run if called directly
if (require.main === module) {
  try {
    syncStorybookToSource();
    process.exit(0);
  } catch (error) {
    log(`\n❌ Error: ${error.message}`, 'red');
    console.error(error);
    process.exit(1);
  }
}

module.exports = { syncStorybookToSource };

