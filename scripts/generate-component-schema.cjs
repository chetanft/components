#!/usr/bin/env node

/**
 * FT Design System Component Schema Generator
 * 
 * Generates a machine-readable JSON schema of all components with:
 * - Component name and description
 * - Props with types, defaults, and descriptions
 * - Usage examples
 * 
 * This helps AI tools understand the component API.
 */

const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const componentsDir = path.join(projectRoot, 'src/components');
const outputPath = path.join(projectRoot, 'component-schema.json');

/**
 * Extract JSDoc comments and prop information from a component file
 */
function extractComponentInfo(filePath, componentName) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Extract main component JSDoc
    const jsdocMatch = content.match(/\/\*\*[\s\S]*?@public[\s\S]*?\*\/\s*export\s+(const|function)\s+\w+/);
    let description = `${componentName} component from FT Design System`;
    
    if (jsdocMatch) {
      const jsdoc = jsdocMatch[0];
      // Extract first meaningful line
      const lines = jsdoc.split('\n');
      for (const line of lines) {
        const cleaned = line.replace(/^\s*\*\s*/, '').trim();
        if (cleaned && 
            !cleaned.startsWith('@') && 
            !cleaned.startsWith('/**') && 
            !cleaned.startsWith('*/') &&
            cleaned.length > 10) {
          description = cleaned;
          break;
        }
      }
    }
    
    // Extract interface/type definition for props
    const propsInterfaceMatch = content.match(
      new RegExp(`export\\s+(?:interface|type)\\s+${componentName}Props[^{]*\\{([^}]+(?:\\{[^}]*\\}[^}]*)*)\\}`, 's')
    );
    
    const props = [];
    
    if (propsInterfaceMatch) {
      const propsContent = propsInterfaceMatch[1];
      
      // Parse each prop
      const propMatches = propsContent.matchAll(
        /\/\*\*[\s\S]*?\*\/\s*(\w+)\??\s*:\s*([^;]+);|(\w+)\??\s*:\s*([^;]+);/g
      );
      
      for (const match of propMatches) {
        const propName = match[1] || match[3];
        const propType = (match[2] || match[4] || 'unknown').trim();
        
        // Skip internal/inherited props
        if (['children', 'className', 'style', 'ref', 'key'].includes(propName)) continue;
        
        // Extract description from JSDoc if present
        let propDescription = '';
        let defaultValue = undefined;
        
        const jsdocBefore = match[0].match(/\/\*\*([\s\S]*?)\*\//);
        if (jsdocBefore) {
          const jsdocContent = jsdocBefore[1];
          // Extract description
          const descLines = jsdocContent.split('\n')
            .map(l => l.replace(/^\s*\*\s*/, '').trim())
            .filter(l => l && !l.startsWith('@'));
          if (descLines.length > 0) {
            propDescription = descLines[0];
          }
          // Extract @default
          const defaultMatch = jsdocContent.match(/@default\s+(.+)/);
          if (defaultMatch) {
            defaultValue = defaultMatch[1].trim().replace(/['"]/g, '');
          }
        }
        
        props.push({
          name: propName,
          type: cleanType(propType),
          required: !match[0].includes('?:'),
          default: defaultValue,
          description: propDescription || `The ${propName} prop`,
        });
      }
    }
    
    // Extract example from JSDoc
    let example = null;
    const exampleMatch = content.match(/@example[\s\S]*?```tsx([\s\S]*?)```/);
    if (exampleMatch) {
      example = exampleMatch[1].trim();
    }
    
    return {
      description,
      props,
      example,
    };
  } catch (e) {
    return {
      description: `${componentName} component`,
      props: [],
      example: null,
    };
  }
}

/**
 * Clean up TypeScript type for readability
 */
function cleanType(type) {
  return type
    .replace(/\s+/g, ' ')
    .replace(/React\.ReactNode/g, 'ReactNode')
    .replace(/React\.ComponentPropsWithoutRef<[^>]+>/g, 'HTMLAttributes')
    .trim();
}

/**
 * Scan directory for components
 */
function scanComponents(dirPath, category) {
  const components = [];
  
  if (!fs.existsSync(dirPath)) return components;
  
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const componentDir = path.join(dirPath, entry.name);
      const mainFile = path.join(componentDir, `${entry.name}.tsx`);
      
      if (fs.existsSync(mainFile)) {
        const info = extractComponentInfo(mainFile, entry.name);
        
        components.push({
          name: entry.name,
          category,
          import: `import { ${entry.name} } from 'ft-design-system';`,
          ...info,
        });
      }
    }
  }
  
  return components;
}

/**
 * Generate the schema
 */
function generateSchema() {
  console.log('🔍 Generating component schema...');
  
  const categories = {
    atoms: path.join(componentsDir, 'atoms'),
    molecules: path.join(componentsDir, 'molecules'),
    organisms: path.join(componentsDir, 'organisms'),
  };
  
  const allComponents = [];
  
  for (const [category, dirPath] of Object.entries(categories)) {
    console.log(`  📁 Scanning ${category}...`);
    const components = scanComponents(dirPath, category);
    allComponents.push(...components);
    console.log(`     Found ${components.length} components`);
  }
  
  // Sort alphabetically
  allComponents.sort((a, b) => a.name.localeCompare(b.name));
  
  // Read package version
  const packageJson = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf-8'));
  
  const schema = {
    $schema: 'https://ft-design-system.dev/component-schema.json',
    name: 'ft-design-system',
    version: packageJson.version,
    generatedAt: new Date().toISOString(),
    
    // Quick usage
    quickStart: {
      install: 'npm install ft-design-system',
      cssImport: "import 'ft-design-system/styles.css';",
      componentImport: "import { Button, Input, Table } from 'ft-design-system';",
      coreImport: "import { Button, Input, Table } from 'ft-design-system/core';",
    },
    
    // Summary
    summary: {
      total: allComponents.length,
      byCategory: {
        atoms: allComponents.filter(c => c.category === 'atoms').length,
        molecules: allComponents.filter(c => c.category === 'molecules').length,
        organisms: allComponents.filter(c => c.category === 'organisms').length,
      },
    },
    
    // All components
    components: allComponents,
    
    // Common patterns
    patterns: {
      button: '<Button variant="primary">Click me</Button>',
      input: '<Input label="Name" placeholder="Enter name" />',
      table: '<Table columns={cols} data={rows} />',
      card: '<Card title="Title"><Content /></Card>',
      modal: '<Modal open={open} onClose={close}>Content</Modal>',
      form: '<Form onSubmit={submit}><FormItem label="Field"><Input /></FormItem></Form>',
    },
  };
  
  // Write schema
  fs.writeFileSync(outputPath, JSON.stringify(schema, null, 2));
  console.log(`\n✅ Schema generated: ${outputPath}`);
  console.log(`   Total components: ${allComponents.length}`);
  
  return schema;
}

// Run if called directly
if (require.main === module) {
  generateSchema();
}

module.exports = { generateSchema };
