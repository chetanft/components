#!/usr/bin/env node
/**
 * Syncs component changes from docs to npm package
 * Ensures components.json and registry stay in sync with actual components
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔄 Syncing docs changes to npm package...\n');

// Step 1: Validate exports
console.log('1️⃣ Validating component exports...');
try {
  execSync('npm run validate:docs', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
} catch (error) {
  console.error('❌ Validation failed. Fix exports before building.');
  process.exit(1);
}

// Step 2: Update components.json from Storybook files (if needed)
console.log('\n2️⃣ Updating components.json from Storybook...');
const extractScript = path.join(__dirname, '../ft-docs/extract_all_components.py');
if (fs.existsSync(extractScript)) {
  try {
    execSync(`python3 "${extractScript}"`, { stdio: 'inherit', cwd: path.join(__dirname, '..') });
  } catch (error) {
    console.warn('⚠️  Could not run extraction script (Python may not be available)');
    console.warn('   This is optional - components.json will use existing data');
  }
} else {
  console.log('   Skipping (extract script not found)');
}

// Step 3: Build npm package
console.log('\n3️⃣ Building npm package...');
try {
  execSync('npm run build', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
  console.log('\n✅ Package built successfully!');
} catch (error) {
  console.error('❌ Build failed');
  process.exit(1);
}

console.log('\n📦 Ready to publish: npm run publish');
















