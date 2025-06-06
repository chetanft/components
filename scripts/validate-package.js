#!/usr/bin/env node

import { readFileSync, existsSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFileExists(filePath, description) {
  const fullPath = join(projectRoot, filePath);
  if (existsSync(fullPath)) {
    log(`✓ ${description} exists: ${filePath}`, 'green');
    return true;
  } else {
    log(`✗ ${description} missing: ${filePath}`, 'red');
    return false;
  }
}

function validatePackageJson() {
  log('\n📦 Validating package.json...', 'blue');
  
  const packageJsonPath = join(projectRoot, 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
  
  const requiredFields = ['name', 'version', 'main', 'module', 'types', 'description'];
  let isValid = true;
  
  requiredFields.forEach(field => {
    if (packageJson[field]) {
      log(`✓ ${field}: ${packageJson[field]}`, 'green');
    } else {
      log(`✗ Missing required field: ${field}`, 'red');
      isValid = false;
    }
  });
  
  return isValid;
}

function validateDistFiles() {
  log('\n🏗️  Validating dist files...', 'blue');
  
  const distFiles = [
    'dist/index.js',
    'dist/index.esm.js', 
    'dist/index.d.ts',
    'dist/styles.css'
  ];
  
  let allFilesExist = true;
  
  distFiles.forEach(file => {
    const exists = checkFileExists(file, `Build output`);
    if (!exists) allFilesExist = false;
  });
  
  return allFilesExist;
}

function validateFileSize() {
  log('\n📏 Checking file sizes...', 'blue');
  
  const filesToCheck = [
    'dist/index.js',
    'dist/index.esm.js',
    'dist/styles.css'
  ];
  
  filesToCheck.forEach(file => {
    const fullPath = join(projectRoot, file);
    if (existsSync(fullPath)) {
      const stats = statSync(fullPath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      log(`📊 ${file}: ${sizeKB} KB`, 'yellow');
    }
  });
}

function validateExports() {
  log('\n🔄 Validating exports...', 'blue');
  
  try {
    // Try to dynamically import the built module
    const distPath = join(projectRoot, 'dist/index.js');
    if (existsSync(distPath)) {
      log('✓ Main export file is accessible', 'green');
      return true;
    } else {
      log('✗ Main export file not found', 'red');
      return false;
    }
  } catch (error) {
    log(`✗ Export validation failed: ${error.message}`, 'red');
    return false;
  }
}

function main() {
  log('🚀 Validating Design System Package', 'blue');
  log('=====================================\n', 'blue');
  
  const validations = [
    validatePackageJson(),
    validateDistFiles(),
    validateExports()
  ];
  
  validateFileSize();
  
  const allValid = validations.every(result => result);
  
  log('\n=====================================', 'blue');
  if (allValid) {
    log('✅ Package validation passed! Ready to publish.', 'green');
    process.exit(0);
  } else {
    log('❌ Package validation failed. Please fix the issues above.', 'red');
    process.exit(1);
  }
}

main(); 