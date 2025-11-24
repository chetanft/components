#!/usr/bin/env node
/**
 * Syncs component changes from docs to npm package
 * Ensures component exports are validated and npm package is built
 * Now includes version synchronization
 * 
 * Note: Docs imports directly from source - no components.json needed
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { syncVersion } = require('./sync-version.cjs');

console.log('🔄 Syncing docs changes to npm package...\n');

// Step 0: Sync versions first (single source of truth)
console.log('0️⃣ Syncing versions...');
try {
  syncVersion();
} catch (error) {
  console.error('❌ Version sync failed. Fix version inconsistencies before syncing.');
  process.exit(1);
}

// Step 1: Validate exports
console.log('\n1️⃣ Validating component exports...');
try {
  execSync('npm run validate:docs', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
} catch (error) {
  console.error('❌ Validation failed. Fix exports before building.');
  process.exit(1);
}

// Step 2: Build npm package
console.log('\n2️⃣ Building npm package...');
try {
  execSync('npm run build', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
  console.log('\n✅ Package built successfully!');
} catch (error) {
  console.error('❌ Build failed');
  process.exit(1);
}

console.log('\n📦 Ready to publish: npm run publish');

