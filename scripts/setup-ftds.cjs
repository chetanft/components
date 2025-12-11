#!/usr/bin/env node

/**
 * FT Design System Setup Automation Script
 * 
 * Automatically configures FT Design System in your project:
 * - Detects framework (Next.js App Router, Pages Router, Vite, CRA)
 * - Injects CSS import in correct location
 * - Updates Tailwind config to include FT DS content paths
 * - Verifies setup
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const projectRoot = process.cwd();

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function detectFramework() {
  const packageJsonPath = path.join(projectRoot, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    return null;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };

  // Check for Next.js
  if (deps.next) {
    // Check for App Router (app directory exists)
    if (fs.existsSync(path.join(projectRoot, 'app'))) {
      return 'nextjs-app-router';
    }
    // Check for Pages Router (pages directory exists)
    if (fs.existsSync(path.join(projectRoot, 'pages'))) {
      return 'nextjs-pages-router';
    }
    // Default to App Router for Next.js 13+
    return 'nextjs-app-router';
  }

  // Check for Vite
  if (deps.vite || fs.existsSync(path.join(projectRoot, 'vite.config.js')) ||
      fs.existsSync(path.join(projectRoot, 'vite.config.ts'))) {
    return 'vite';
  }

  // Check for Create React App
  if (deps['react-scripts'] || fs.existsSync(path.join(projectRoot, 'src', 'index.js')) ||
      fs.existsSync(path.join(projectRoot, 'src', 'index.tsx'))) {
    return 'cra';
  }

  return 'unknown';
}

function findRootFile(framework) {
  const files = {
    'nextjs-app-router': ['app/layout.tsx', 'app/layout.js'],
    'nextjs-pages-router': ['pages/_app.tsx', 'pages/_app.js'],
    'vite': ['src/main.tsx', 'src/main.ts', 'src/main.jsx', 'src/main.js'],
    'cra': ['src/index.tsx', 'src/index.jsx', 'src/index.ts', 'src/index.js'],
  };

  const candidates = files[framework] || [];
  for (const file of candidates) {
    const fullPath = path.join(projectRoot, file);
    if (fs.existsSync(fullPath)) {
      return fullPath;
    }
  }

  return null;
}

function injectCSSImport(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const cssImport = "import 'ft-design-system/styles.css';";

  // Check if already imported
  if (content.includes("ft-design-system/styles.css") || 
      content.includes("ft-design-system/dist/styles.css")) {
    log('   ✅ CSS import already exists', 'green');
    return false;
  }

  // Find the best insertion point
  let lines = content.split('\n');
  let insertIndex = 0;

  // For Next.js App Router, insert after 'use client' if present
  if (filePath.includes('app/layout')) {
    const useClientIndex = lines.findIndex(line => line.includes("'use client'"));
    if (useClientIndex !== -1) {
      insertIndex = useClientIndex + 1;
    } else {
      // Insert after imports
      const lastImportIndex = lines.findLastIndex(line => 
        line.trim().startsWith('import ') && !line.includes('from')
      );
      if (lastImportIndex !== -1) {
        insertIndex = lastImportIndex + 1;
      }
    }
  } else {
    // For other frameworks, insert at the top after existing imports
    const lastImportIndex = lines.findLastIndex(line => 
      line.trim().startsWith('import ')
    );
    if (lastImportIndex !== -1) {
      insertIndex = lastImportIndex + 1;
    }
  }

  // Insert the import
  lines.splice(insertIndex, 0, cssImport);
  const newContent = lines.join('\n');

  fs.writeFileSync(filePath, newContent, 'utf-8');
  log(`   ✅ Added CSS import to ${path.relative(projectRoot, filePath)}`, 'green');
  return true;
}

function updateTailwindConfig() {
  const configFiles = [
    'tailwind.config.js',
    'tailwind.config.ts',
    'tailwind.config.cjs',
    'tailwind.config.mjs',
  ];

  let configPath = null;
  for (const file of configFiles) {
    const fullPath = path.join(projectRoot, file);
    if (fs.existsSync(fullPath)) {
      configPath = fullPath;
      break;
    }
  }

  if (!configPath) {
    log('   ⚠️  Tailwind config not found. You may need to create one.', 'yellow');
    return false;
  }

  const content = fs.readFileSync(configPath, 'utf-8');
  const ftdsPath = "'./node_modules/ft-design-system/dist/**/*.{js,jsx}'";

  // Check if already configured
  if (content.includes('ft-design-system')) {
    log('   ✅ Tailwind config already includes FT Design System', 'green');
    return false;
  }

  // Try to parse and update
  try {
    // For JS/TS config files, we need to update the content array
    if (configPath.endsWith('.js') || configPath.endsWith('.ts') || configPath.endsWith('.cjs') || configPath.endsWith('.mjs')) {
      // Find content array
      const contentMatch = content.match(/content:\s*\[([^\]]*)\]/s);
      if (contentMatch) {
        const existingContent = contentMatch[1];
        const newContent = existingContent.trim() 
          ? `${existingContent.trim()},\n    ${ftdsPath}`
          : ftdsPath;
        
        const updated = content.replace(
          /content:\s*\[([^\]]*)\]/s,
          `content: [\n    ${newContent}\n  ]`
        );
        
        fs.writeFileSync(configPath, updated, 'utf-8');
        log(`   ✅ Updated Tailwind config: ${path.relative(projectRoot, configPath)}`, 'green');
        return true;
      }
    }
  } catch (error) {
    log(`   ⚠️  Could not auto-update Tailwind config: ${error.message}`, 'yellow');
    log('   💡 Please manually add to content array:', 'cyan');
    log(`      ${ftdsPath}`, 'cyan');
    return false;
  }

  return false;
}

function verifySetup() {
  log('\n🔍 Verifying setup...', 'cyan');
  let allGood = true;

  // Check if package is installed
  const nodeModulesPath = path.join(projectRoot, 'node_modules', 'ft-design-system');
  if (!fs.existsSync(nodeModulesPath)) {
    log('   ❌ ft-design-system package not found in node_modules', 'red');
    log('   💡 Run: npm install ft-design-system', 'yellow');
    return false;
  }
  log('   ✅ Package installed', 'green');

  // Check if CSS file exists
  const cssPath = path.join(nodeModulesPath, 'dist', 'styles.css');
  if (!fs.existsSync(cssPath)) {
    log('   ⚠️  CSS file not found. Package may need to be rebuilt.', 'yellow');
    allGood = false;
  } else {
    log('   ✅ CSS file found', 'green');
  }

  // Check CSS import
  const framework = detectFramework();
  if (framework && framework !== 'unknown') {
    const rootFile = findRootFile(framework);
    if (rootFile) {
      const content = fs.readFileSync(rootFile, 'utf-8');
      if (content.includes("ft-design-system/styles.css") || 
          content.includes("ft-design-system/dist/styles.css")) {
        log(`   ✅ CSS import found in ${path.relative(projectRoot, rootFile)}`, 'green');
      } else {
        log(`   ❌ CSS import not found in ${path.relative(projectRoot, rootFile)}`, 'red');
        log('   💡 Run: npx ft-design-system setup', 'yellow');
        allGood = false;
      }
    }
  }

  // Check Tailwind config
  const configFiles = [
    'tailwind.config.js',
    'tailwind.config.ts',
    'tailwind.config.cjs',
    'tailwind.config.mjs',
  ];
  
  let configPath = null;
  for (const file of configFiles) {
    const fullPath = path.join(projectRoot, file);
    if (fs.existsSync(fullPath)) {
      configPath = fullPath;
      break;
    }
  }

  if (configPath) {
    const content = fs.readFileSync(configPath, 'utf-8');
    if (content.includes('ft-design-system')) {
      log(`   ✅ Tailwind config includes FT Design System`, 'green');
    } else {
      log(`   ❌ Tailwind config missing FT Design System path`, 'red');
      log('   💡 Run: npx ft-design-system update', 'yellow');
      allGood = false;
    }
  } else {
    log('   ⚠️  Tailwind config not found', 'yellow');
    log('   💡 You may need to create one if using Tailwind', 'cyan');
  }

  return allGood;
}

function updateConfig() {
  log('\n🔄 Updating FT Design System configuration...', 'cyan');
  
  // Check if package is installed
  const nodeModulesPath = path.join(projectRoot, 'node_modules', 'ft-design-system');
  if (!fs.existsSync(nodeModulesPath)) {
    log('   ❌ ft-design-system package not found in node_modules', 'red');
    log('   💡 Run: npm install ft-design-system', 'yellow');
    return false;
  }

  // Update Tailwind config
  log('\n1️⃣ Updating Tailwind config...', 'cyan');
  const tailwindUpdated = updateTailwindConfig();

  // Check and update CSS import if needed
  log('\n2️⃣ Checking CSS import...', 'cyan');
  const framework = detectFramework();
  if (framework && framework !== 'unknown') {
    const rootFile = findRootFile(framework);
    if (rootFile) {
      injectCSSImport(rootFile);
    } else {
      log('   ⚠️  Could not find root file for CSS import', 'yellow');
    }
  } else {
    log('   ⚠️  Could not detect framework for CSS import', 'yellow');
  }

  log('\n✅ Configuration update complete!', 'green');
  log('💡 Restart your dev server if it\'s running', 'cyan');
  
  return tailwindUpdated;
}

function createReadlineInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}

function askQuestion(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim().toLowerCase());
    });
  });
}

async function main() {
  log('\n🚀 FT Design System Setup', 'bold');
  log('========================\n', 'blue');

  // Step 1: Detect framework
  log('1️⃣ Detecting framework...', 'cyan');
  const framework = detectFramework();
  
  if (!framework || framework === 'unknown') {
    log('   ⚠️  Could not detect framework automatically', 'yellow');
    log('   💡 Please configure manually. See docs/INTEGRATION_GUIDE.md', 'cyan');
    process.exit(1);
  }

  const frameworkNames = {
    'nextjs-app-router': 'Next.js (App Router)',
    'nextjs-pages-router': 'Next.js (Pages Router)',
    'vite': 'Vite + React',
    'cra': 'Create React App',
  };

  log(`   ✅ Detected: ${frameworkNames[framework]}`, 'green');

  // Step 2: Find root file
  log('\n2️⃣ Finding root file...', 'cyan');
  const rootFile = findRootFile(framework);
  if (!rootFile) {
    log('   ❌ Could not find root file', 'red');
    log('   💡 Please configure manually. See docs/INTEGRATION_GUIDE.md', 'cyan');
    process.exit(1);
  }
  log(`   ✅ Found: ${path.relative(projectRoot, rootFile)}`, 'green');

  // Step 3: Ask for confirmation
  const rl = createReadlineInterface();
  log('\n📋 Setup will:', 'cyan');
  log('   • Add CSS import to root file', 'white');
  log('   • Update Tailwind config (if found)', 'white');
  
  const confirm = await askQuestion(rl, '\n❓ Proceed? (y/n): ');
  rl.close();

  if (confirm !== 'y' && confirm !== 'yes') {
    log('\n❌ Setup cancelled', 'yellow');
    process.exit(0);
  }

  // Step 4: Inject CSS import
  log('\n3️⃣ Injecting CSS import...', 'cyan');
  injectCSSImport(rootFile);

  // Step 5: Update Tailwind config
  log('\n4️⃣ Updating Tailwind config...', 'cyan');
  updateTailwindConfig();

  // Step 6: Verify setup
  const verified = verifySetup();

  // Summary
  log('\n═══════════════════════════════════════', 'green');
  log('✅ Setup Complete!', 'bold');
  log('═══════════════════════════════════════', 'green');
  
  log('\n📋 Next steps:', 'cyan');
  log('   1. Restart your dev server', 'white');
  log('   2. Import components:', 'white');
  log('      import { Button, Input } from "ft-design-system";', 'cyan');
  log('   3. Use components in your app!', 'white');
  
  if (!verified) {
    log('\n⚠️  Setup verification had issues. Please check manually.', 'yellow');
  }

  log('\n💡 For more info, see: docs/INTEGRATION_GUIDE.md\n', 'cyan');
}

function showHelp() {
  console.log('\n📖 FT Design System CLI');
  console.log('======================\n');
  console.log('Usage: npx ft-design-system <command>\n');
  console.log('Commands:');
  console.log('  setup          Set up FT Design System in your project (default)');
  console.log('  verify         Verify that FT Design System is properly configured');
  console.log('  update         Update Tailwind config after package updates');
  console.log('  init           Scaffold a new project with FT Design System');
  console.log('  add <name>     Add specific components (like shadcn)');
  console.log('  list           List all available components');
  console.log('  help           Show this help message\n');
  console.log('Examples:');
  console.log('  npx ft-design-system setup');
  console.log('  npx ft-design-system add button input table');
  console.log('  npx ft-design-system add --all');
  console.log('  npx ft-design-system list');
  console.log('  npx ft-design-system list --category atoms');
  console.log('  npx ftds add button  (shorter alias)\n');
}

/**
 * Load the component registry
 */
function loadRegistry() {
  // Try to find registry in multiple locations
  const locations = [
    path.join(projectRoot, 'node_modules', 'ft-design-system', 'registry.json'),
    path.join(__dirname, '..', 'registry.json'),
    path.join(projectRoot, 'registry.json'),
  ];
  
  for (const location of locations) {
    if (fs.existsSync(location)) {
      try {
        return JSON.parse(fs.readFileSync(location, 'utf-8'));
      } catch (e) {
        continue;
      }
    }
  }
  
  return null;
}

/**
 * List available components
 */
function listComponents(category = null) {
  const registry = loadRegistry();
  
  if (!registry) {
    log('\n❌ Registry not found. Make sure ft-design-system is installed.', 'red');
    log('   Run: npm install ft-design-system', 'yellow');
    return;
  }
  
  log('\n📦 FT Design System Components', 'bold');
  log(`   Version: ${registry.version}`, 'cyan');
  log(`   Total: ${registry.summary.total} components\n`, 'cyan');
  
  const categories = ['atoms', 'molecules', 'organisms', 'charts', 'templates'];
  
  for (const cat of categories) {
    if (category && cat !== category) continue;
    
    const components = registry.components.filter(c => c.category === cat);
    if (components.length === 0) continue;
    
    log(`\n📁 ${cat.toUpperCase()} (${components.length})`, 'blue');
    log('─'.repeat(40), 'blue');
    
    for (const comp of components) {
      const subComps = comp.subComponents.length > 0 
        ? ` [+${comp.subComponents.length} sub]` 
        : '';
      const deps = comp.dependencies.peer.length > 0 
        ? ` (needs: ${comp.dependencies.peer.slice(0, 2).join(', ')}${comp.dependencies.peer.length > 2 ? '...' : ''})` 
        : '';
      log(`   ${comp.name}${subComps}${deps}`, 'white');
    }
  }
  
  log('\n💡 Usage:', 'cyan');
  log('   npx ftds add <component-name>', 'white');
  log('   npx ftds add button input table', 'white');
  log('   npx ftds list --category molecules\n', 'white');
}

/**
 * Add components to the project
 */
async function addComponents(componentNames) {
  const registry = loadRegistry();
  
  if (!registry) {
    log('\n❌ Registry not found. Make sure ft-design-system is installed.', 'red');
    log('   Run: npm install ft-design-system', 'yellow');
    return false;
  }
  
  log('\n🚀 FT Design System - Add Components', 'bold');
  log('=====================================\n', 'blue');
  
  // Handle --all flag
  if (componentNames.includes('--all')) {
    log('📦 Adding all components...', 'cyan');
    componentNames = registry.components.map(c => c.name.toLowerCase());
  }
  
  // Resolve component names (case-insensitive)
  const resolvedComponents = [];
  const notFound = [];
  const allPeerDeps = new Set();
  const allInternalDeps = new Set();
  
  for (const name of componentNames) {
    const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const found = registry.components.find(c => 
      c.name.toLowerCase() === normalized ||
      c.name.toLowerCase().replace(/[^a-z0-9]/g, '') === normalized
    );
    
    if (found) {
      resolvedComponents.push(found);
      
      // Collect dependencies
      found.dependencies.peer.forEach(d => allPeerDeps.add(d));
      found.dependencies.internal.forEach(d => allInternalDeps.add(d));
    } else {
      notFound.push(name);
    }
  }
  
  // Report not found
  if (notFound.length > 0) {
    log(`⚠️  Components not found: ${notFound.join(', ')}`, 'yellow');
    log('   Use "npx ftds list" to see available components', 'cyan');
  }
  
  if (resolvedComponents.length === 0) {
    log('\n❌ No valid components specified.', 'red');
    return false;
  }
  
  // Show what will be added
  log('📋 Components to add:', 'cyan');
  for (const comp of resolvedComponents) {
    const subComps = comp.subComponents.length > 0 
      ? ` (includes: ${comp.subComponents.slice(0, 3).join(', ')}${comp.subComponents.length > 3 ? '...' : ''})` 
      : '';
    log(`   ✓ ${comp.name}${subComps}`, 'green');
  }
  
  // Show internal dependencies
  if (allInternalDeps.size > 0) {
    const depsNotIncluded = [...allInternalDeps].filter(
      d => !resolvedComponents.find(c => c.name === d)
    );
    if (depsNotIncluded.length > 0) {
      log('\n📎 Required internal dependencies:', 'cyan');
      for (const dep of depsNotIncluded) {
        log(`   + ${dep}`, 'yellow');
      }
      log('   (These will be imported from ft-design-system)', 'cyan');
    }
  }
  
  // Show peer dependencies
  if (allPeerDeps.size > 0) {
    log('\n📦 Peer dependencies needed:', 'cyan');
    for (const dep of allPeerDeps) {
      log(`   ${dep}`, 'yellow');
    }
  }
  
  // Generate import statement
  log('\n📝 Import Statement:', 'cyan');
  log('─'.repeat(50), 'cyan');
  
  const importNames = resolvedComponents.map(c => c.name).join(', ');
  log(`import { ${importNames} } from 'ft-design-system';`, 'green');
  
  // Note about AI protection
  log('\n// Note: AI-protected by default. For unprotected:', 'cyan');
  log(`import { ${importNames} } from 'ft-design-system/core';`, 'green');
  
  // CSS import reminder
  log('\n// Don\'t forget to import CSS (in your root file):', 'cyan');
  log(`import 'ft-design-system/styles.css';`, 'green');
  
  log('\n─'.repeat(50), 'cyan');
  
  // Check if peer deps are installed
  const packageJsonPath = path.join(projectRoot, 'package.json');
  if (fs.existsSync(packageJsonPath) && allPeerDeps.size > 0) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };
    
    const missingDeps = [...allPeerDeps].filter(dep => !allDeps[dep]);
    
    if (missingDeps.length > 0) {
      log('\n⚠️  Missing peer dependencies. Install with:', 'yellow');
      log(`   npm install ${missingDeps.join(' ')}`, 'cyan');
    }
  }
  
  // Ensure CSS is imported
  log('\n🔧 Checking project setup...', 'cyan');
  const framework = detectFramework();
  if (framework && framework !== 'unknown') {
    const rootFile = findRootFile(framework);
    if (rootFile) {
      injectCSSImport(rootFile);
    }
  }
  
  // Update Tailwind config
  updateTailwindConfig();
  
  log('\n✅ Components ready to use!', 'green');
  log('💡 Tip: Restart your dev server to see changes.\n', 'cyan');
  
  return true;
}

async function initProject() {
  log('\n🚀 FT Design System Project Scaffold', 'bold');
  log('====================================\n', 'blue');

  // Check if directory is empty
  const files = fs.readdirSync(projectRoot);
  if (files.length > 0 && !files.includes('package.json')) {
    log('⚠️  Directory is not empty. Please run init in an empty directory.', 'yellow');
    process.exit(1);
  }

  const rl = createReadlineInterface();
  
  log('Select a framework:', 'cyan');
  log('  1. Next.js (App Router)', 'white');
  log('  2. Next.js (Pages Router)', 'white');
  log('  3. Vite + React', 'white');
  log('  4. Create React App', 'white');
  
  const choice = await askQuestion(rl, '\nEnter your choice (1-4): ');
  rl.close();

  const templateMap = {
    '1': 'nextjs-app-router',
    '2': 'nextjs-pages-router',
    '3': 'vite-react',
    '4': 'create-react-app'
  };

  const templateName = templateMap[choice];
  if (!templateName) {
    log('❌ Invalid choice', 'red');
    process.exit(1);
  }

  // Try to find templates in multiple locations
  // 1. In node_modules (when installed via npm)
  let templatePath = path.join(projectRoot, 'node_modules', 'ft-design-system', 'templates', templateName);
  
  // 2. If not found, try relative to script location (for development)
  if (!fs.existsSync(templatePath)) {
    const scriptDir = __dirname;
    templatePath = path.join(scriptDir, '..', 'templates', templateName);
  }
  
  // 3. Fallback: try relative to current directory
  if (!fs.existsSync(templatePath)) {
    const relativePath = path.join(projectRoot, '..', '..', 'templates', templateName);
    if (fs.existsSync(relativePath)) {
      templatePath = relativePath;
    }
  }
  if (!fs.existsSync(templatePath)) {
    log(`❌ Template not found: ${templateName}`, 'red');
    log('💡 Templates should be in templates/ directory', 'yellow');
    process.exit(1);
  }

  log(`\n📦 Copying template files for ${templateName}...`, 'cyan');
  
  // Copy template files
  function copyRecursive(src, dest) {
    const entries = fs.readdirSync(src, { withFileTypes: true });
    
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      
      if (entry.isDirectory()) {
        fs.mkdirSync(destPath, { recursive: true });
        copyRecursive(srcPath, destPath);
      } else {
        // Skip README.md from template
        if (entry.name === 'README.md') {
          continue;
        }
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }

  try {
    copyRecursive(templatePath, projectRoot);
    log('   ✅ Template files copied', 'green');
  } catch (error) {
    log(`   ❌ Error copying files: ${error.message}`, 'red');
    process.exit(1);
  }

  log('\n📋 Next steps:', 'cyan');
  log('   1. Install dependencies: npm install', 'white');
  log('   2. Start development: npm run dev (or npm start for CRA)', 'white');
  log('   3. Import components: import { Button } from "ft-design-system";', 'white');
  log('\n✅ Project scaffolded successfully!', 'green');
  log('💡 See templates/README.md for more information\n', 'cyan');
}

// Parse command from arguments
const command = process.argv[2] || 'setup';
const args = process.argv.slice(3);

// Route to appropriate command
if (command === 'setup') {
  main().catch(error => {
    log(`\n❌ Error: ${error.message}`, 'red');
    process.exit(1);
  });
} else if (command === 'verify') {
  const verified = verifySetup();
  if (verified) {
    log('\n✅ FT Design System is properly configured!', 'green');
    process.exit(0);
  } else {
    log('\n⚠️  Setup verification found issues. Please check your configuration.', 'yellow');
    log('💡 Run "npx ft-design-system setup" to configure automatically.', 'cyan');
    process.exit(1);
  }
} else if (command === 'update') {
  const updated = updateConfig();
  process.exit(updated ? 0 : 1);
} else if (command === 'init') {
  initProject().catch(error => {
    log(`\n❌ Error: ${error.message}`, 'red');
    process.exit(1);
  });
} else if (command === 'add') {
  if (args.length === 0) {
    log('\n❌ Please specify component names to add.', 'red');
    log('   Usage: npx ftds add button input table', 'cyan');
    log('   Use "npx ftds list" to see available components.', 'cyan');
    process.exit(1);
  }
  addComponents(args).then(success => {
    process.exit(success ? 0 : 1);
  }).catch(error => {
    log(`\n❌ Error: ${error.message}`, 'red');
    process.exit(1);
  });
} else if (command === 'list') {
  // Check for category filter
  const categoryIndex = args.indexOf('--category');
  const category = categoryIndex !== -1 ? args[categoryIndex + 1] : null;
  listComponents(category);
  process.exit(0);
} else if (command === 'help' || command === '--help' || command === '-h') {
  showHelp();
  process.exit(0);
} else {
  log(`\n❌ Unknown command: ${command}`, 'red');
  showHelp();
  process.exit(1);
}

