#!/usr/bin/env node

/**
 * Documentation Sync Checker
 * 
 * This script helps ensure that downloadable documentation stays in sync
 * with actual component exports when components are added or modified.
 * 
 * Run: npm run update-docs
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking documentation sync...\n');

// Read the main index.ts to get actual exports
const indexPath = path.join(__dirname, '../src/index.ts');
const indexContent = fs.readFileSync(indexPath, 'utf8');

// Extract component exports
const componentExports = [];
const exportMatches = indexContent.match(/export \{ ([^}]+) \}/g);
if (exportMatches) {
  exportMatches.forEach(match => {
    const components = match.replace(/export \{ /, '').replace(/ \}/, '').split(', ');
    components.forEach(comp => {
      const cleanComp = comp.trim().split(' ')[0]; // Remove "as" aliases
      if (!cleanComp.includes('Type') && !cleanComp.includes('Props')) {
        componentExports.push(cleanComp);
      }
    });
  });
}

// Read the prompt documentation
const promptPath = path.join(__dirname, '../src/stories/prompts/General.stories.tsx');
const promptContent = fs.readFileSync(promptPath, 'utf8');

// Check if main components are documented
const mainComponents = ['Button', 'Input', 'Table', 'Badge', 'ProgressBar', 'Tabs', 'Checkbox', 'Icon'];
const missingDocs = [];
const extraDocs = [];

console.log('📦 Current component exports in src/index.ts:');
console.log(componentExports.map(c => `  • ${c}`).join('\n'));
console.log();

console.log('📝 Components documented in prompts:');
mainComponents.forEach(comp => {
  if (promptContent.includes(`name: "${comp}"`)) {
    console.log(`  ✅ ${comp}`);
  } else {
    console.log(`  ❌ ${comp} - MISSING`);
    missingDocs.push(comp);
  }
});

console.log();

// Check for components that might need documentation
componentExports.forEach(comp => {
  if (mainComponents.includes(comp)) return; // Already checked above
  
  if (!promptContent.includes(`name: "${comp}"`)) {
    console.log(`  ⚠️  ${comp} - Not documented (consider adding)`);
  }
});

console.log();

// Provide actionable feedback
if (missingDocs.length > 0) {
  console.log('🚨 ACTION REQUIRED:');
  console.log('The following components are exported but not documented:');
  missingDocs.forEach(comp => {
    console.log(`  • Update src/stories/prompts/General.stories.tsx to include ${comp}`);
  });
  console.log();
  console.log('📝 Also update:');
  console.log('  • componentExamples.components array');
  console.log('  • generateJSONDocs() examples');
  console.log('  • generateMDXDocs() content');
  console.log('  • Integration prompts with new component names');
  console.log();
  process.exit(1);
} else {
  console.log('✅ Documentation appears to be in sync!');
  console.log();
  console.log('💡 Remember to:');
  console.log('  • Test downloadable JSON/MDX files after component changes');
  console.log('  • Update version numbers and "Last updated" dates');
  console.log('  • Verify examples work with actual component props');
  console.log();
}

console.log('🔄 To update docs after changes:');
console.log('  1. Edit src/stories/prompts/General.stories.tsx');
console.log('  2. Update componentExamples.components array');
console.log('  3. Update generateJSONDocs() and generateMDXDocs()');
console.log('  4. Test the downloadable files');
console.log('  5. Update version/date stamps'); 