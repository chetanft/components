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
  } else {
    log('   ✅ CSS file found', 'green');
  }

  return true;
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

// Run setup
main().catch(error => {
  log(`\n❌ Error: ${error.message}`, 'red');
  process.exit(1);
});

