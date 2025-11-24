#!/usr/bin/env node

import { readFileSync } from 'fs';
import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { syncVersion } = require('./sync-version.cjs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

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

function execCommand(command, description) {
  try {
    log(`\n${description}...`, 'cyan');
    const result = execSync(command, { 
      cwd: projectRoot, 
      stdio: 'inherit' 
    });
    log(`✅ ${description} completed successfully`, 'green');
    return true;
  } catch (error) {
    log(`❌ ${description} failed: ${error.message}`, 'red');
    return false;
  }
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
      resolve(answer.trim());
    });
  });
}

async function showMainMenu(rl) {
  log('\n🚀 Design System Publishing CLI', 'bold');
  log('================================', 'blue');
  
  const packageJson = JSON.parse(readFileSync(join(projectRoot, 'package.json'), 'utf8'));
  log(`📦 Package: ${packageJson.name}`, 'cyan');
  log(`📄 Version: ${packageJson.version}`, 'cyan');
  log(`📝 Description: ${packageJson.description}`, 'cyan');
  
  log('\nSelect an option:', 'yellow');
  log('1. 🔍 Validate package before publishing', 'white');
  log('2. 📦 Create local package (npm pack)', 'white');
  log('3. 🧪 Dry run publish (test without publishing)', 'white');
  log('4. 🏷️  Publish as beta version', 'white');
  log('5. 📈 Publish patch version (1.0.1 → 1.0.2)', 'white');
  log('6. 📊 Publish minor version (1.0.1 → 1.1.0)', 'white');
  log('7. 🚀 Publish major version (1.0.1 → 2.0.0)', 'white');
  log('8. 🐙 Publish to GitHub Packages', 'white');
  log('9. 🌐 Publish to npm registry', 'white');
  log('10. 📋 Check published versions', 'white');
  log('11. 🧹 Clean build artifacts', 'white');
  log('12. 🔄 Sync versions across packages', 'white');
  log('0. ❌ Exit', 'white');
  
  const choice = await askQuestion(rl, '\nEnter your choice (0-12): ');
  return choice;
}

async function handleVersionCheck() {
  log('\n🔄 Checking version consistency...', 'blue');
  try {
    syncVersion();
    log('✅ Versions are synchronized', 'green');
    return true;
  } catch (error) {
    log(`❌ Version check failed: ${error.message}`, 'red');
    return false;
  }
}

async function handleValidation() {
  log('\n🔍 Running package validation...', 'blue');
  
  // First check version consistency
  const versionOk = await handleVersionCheck();
  if (!versionOk) {
    log('⚠️  Version sync failed. Attempting to sync...', 'yellow');
    try {
      syncVersion();
      log('✅ Versions synchronized', 'green');
    } catch (error) {
      log('❌ Could not sync versions. Please fix manually.', 'red');
      return false;
    }
  }
  
  return execCommand('npm run validate:package', 'Package validation');
}

async function handleLocalPack() {
  log('\n📦 Creating local package...', 'blue');
  return execCommand('npm run publish:local', 'Local package creation');
}

async function handleDryRun() {
  log('\n🧪 Running dry run publish...', 'blue');
  return execCommand('npm run publish:dry-run', 'Dry run publish');
}

async function handleBetaPublish(rl) {
  log('\n🏷️  Publishing beta version...', 'blue');
  
  const confirm = await askQuestion(rl, 'Are you sure you want to publish a beta version? (y/N): ');
  if (confirm.toLowerCase() !== 'y') {
    log('❌ Beta publish cancelled', 'yellow');
    return false;
  }
  
  return execCommand('npm run publish:beta', 'Beta version publish');
}

async function handleVersionPublish(rl, type) {
  const versionTypes = {
    'patch': 'patch version (bug fixes)',
    'minor': 'minor version (new features)',
    'major': 'major version (breaking changes)'
  };
  
  log(`\n📈 Publishing ${versionTypes[type]}...`, 'blue');
  
  const confirm = await askQuestion(rl, `Are you sure you want to publish a ${versionTypes[type]}? (y/N): `);
  if (confirm.toLowerCase() !== 'y') {
    log(`❌ ${type} version publish cancelled`, 'yellow');
    return false;
  }
  
  // Ensure versions are synced before publishing
  log('\n🔄 Ensuring versions are synchronized...', 'cyan');
  try {
    syncVersion();
  } catch (error) {
    log(`⚠️  Version sync warning: ${error.message}`, 'yellow');
  }
  
  return execCommand(`npm run publish:${type}`, `${type} version publish`);
}

async function handleGitHubPublish(rl) {
  log('\n🐙 Publishing to GitHub Packages...', 'blue');
  
  const confirm = await askQuestion(rl, 'Are you sure you want to publish to GitHub Packages? (y/N): ');
  if (confirm.toLowerCase() !== 'y') {
    log('❌ GitHub publish cancelled', 'yellow');
    return false;
  }
  
  // Ensure versions are synced before publishing
  log('\n🔄 Ensuring versions are synchronized...', 'cyan');
  try {
    syncVersion();
  } catch (error) {
    log(`⚠️  Version sync warning: ${error.message}`, 'yellow');
  }
  
  return execCommand('npm run publish:github', 'GitHub Packages publish');
}

async function handleNpmPublish(rl) {
  log('\n🌐 Publishing to npm registry...', 'blue');
  log('⚠️  Warning: This will publish to the public npm registry!', 'yellow');
  
  const confirm = await askQuestion(rl, 'Are you absolutely sure you want to publish to npm? (y/N): ');
  if (confirm.toLowerCase() !== 'y') {
    log('❌ npm publish cancelled', 'yellow');
    return false;
  }
  
  // Ensure versions are synced before publishing
  log('\n🔄 Ensuring versions are synchronized...', 'cyan');
  try {
    syncVersion();
  } catch (error) {
    log(`⚠️  Version sync warning: ${error.message}`, 'yellow');
  }
  
  return execCommand('npm run publish:npm', 'npm registry publish');
}

async function handleVersionCheck() {
  log('\n📋 Checking published versions...', 'blue');
  return execCommand('npm run version:check', 'Version check');
}

async function handleClean() {
  log('\n🧹 Cleaning build artifacts...', 'blue');
  return execCommand('npm run clean', 'Build cleanup');
}

async function main() {
  const rl = createReadlineInterface();
  
  try {
    while (true) {
      const choice = await showMainMenu(rl);
      
      switch (choice) {
        case '1':
          await handleValidation();
          break;
        case '2':
          await handleLocalPack();
          break;
        case '3':
          await handleDryRun();
          break;
        case '4':
          await handleBetaPublish(rl);
          break;
        case '5':
          await handleVersionPublish(rl, 'patch');
          break;
        case '6':
          await handleVersionPublish(rl, 'minor');
          break;
        case '7':
          await handleVersionPublish(rl, 'major');
          break;
        case '8':
          await handleGitHubPublish(rl);
          break;
        case '9':
          await handleNpmPublish(rl);
          break;
        case '10':
          await handleVersionCheck();
          break;
        case '11':
          await handleClean();
          break;
        case '12':
          await handleVersionCheck();
          break;
        case '0':
          log('\n👋 Goodbye!', 'cyan');
          rl.close();
          return;
        default:
          log('\n❌ Invalid choice. Please select a number from 0-12.', 'red');
      }
      
      if (choice !== '0') {
        await askQuestion(rl, '\nPress Enter to continue...');
      }
    }
  } catch (error) {
    log(`\n❌ An error occurred: ${error.message}`, 'red');
  } finally {
    rl.close();
  }
}

main(); 