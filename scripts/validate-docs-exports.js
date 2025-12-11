#!/usr/bin/env node
/**
 * Validates that all components used in docs are properly exported in src/index.ts
 * Run this before building npm package to ensure docs and package stay in sync
 */

const fs = require('fs');
const path = require('path');

const docsRegistryPath = path.join(__dirname, '../ft-docs/src/registry.tsx');
const srcIndexPath = path.join(__dirname, '../src/index.ts');
const componentsIndexPath = path.join(__dirname, '../src/components/index.ts');

if (!fs.existsSync(docsRegistryPath)) {
  console.error('❌ Docs registry not found:', docsRegistryPath);
  process.exit(1);
}

const registryContent = fs.readFileSync(docsRegistryPath, 'utf8');
const srcIndexContent = fs.readFileSync(srcIndexPath, 'utf8');
const componentsIndexContent = fs.readFileSync(componentsIndexPath, 'utf8');

// Extract component names from registry imports
const importMatch = registryContent.match(/import\s*{([^}]+)}\s*from\s*["']\.\.\/\.\.\/src["']/);
if (!importMatch) {
  console.error('❌ Could not find imports in registry.tsx');
  process.exit(1);
}

const docsComponents = importMatch[1]
  .split(',')
  .map(c => c.trim())
  .filter(c => c && !c.startsWith('//'));

console.log('📋 Components used in docs:');
docsComponents.forEach(c => console.log(`  • ${c}`));

// Check if components are exported
const allExports = srcIndexContent + componentsIndexContent;
const missing = [];

docsComponents.forEach(comp => {
  // Check various export patterns
  const exportPatterns = [
    new RegExp(`export\\s+.*\\b${comp}\\b`, 'g'),
    new RegExp(`export\\s*{\\s*[^}]*\\b${comp}\\b`, 'g'),
    new RegExp(`export\\s*\\*\\s*from.*components`, 'g'), // catch-all export
  ];
  
  const isExported = exportPatterns.some(pattern => pattern.test(allExports));
  
  if (!isExported) {
    missing.push(comp);
  }
});

if (missing.length > 0) {
  console.error('\n❌ Missing exports:');
  missing.forEach(c => console.error(`  • ${c}`));
  console.error('\n💡 Add these to src/components/index.ts or src/index.ts');
  process.exit(1);
}

console.log('\n✅ All docs components are properly exported!');

















