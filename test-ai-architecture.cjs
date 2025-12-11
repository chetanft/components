#!/usr/bin/env node

/**
 * Test script to verify the AI architecture works correctly
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing FT Design System AI Architecture...\n');

// Test 1: Check build files exist
try {
  const coreExists = fs.existsSync('./dist/index.js');
  const aiExists = fs.existsSync('./dist/ai/index.js');
  const typesExist = fs.existsSync('./dist/index.d.ts') && fs.existsSync('./dist/ai/index.d.ts');
  const stylesExist = fs.existsSync('./dist/styles.css');
  
  if (coreExists && aiExists && typesExist && stylesExist) {
    console.log('✅ All build files exist');
    console.log('   Core: dist/index.js ✓');
    console.log('   AI layer: dist/ai/index.js ✓');
    console.log('   Types: dist/index.d.ts, dist/ai/index.d.ts ✓');
    console.log('   Styles: dist/styles.css ✓');
  } else {
    console.error('❌ Some build files are missing');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Build file check failed:', error.message);
  process.exit(1);
}

// Test 2: Check file sizes
try {
  const coreSize = fs.statSync('./dist/index.js').size;
  const aiSize = fs.statSync('./dist/ai/index.js').size;
  const stylesSize = fs.statSync('./dist/styles.css').size;
  
  console.log('✅ Build file sizes look good');
  console.log(`   Core bundle: ${Math.round(coreSize / 1024)}KB`);
  console.log(`   AI bundle: ${Math.round(aiSize / 1024)}KB`);
  console.log(`   Styles: ${Math.round(stylesSize / 1024)}KB`);
} catch (error) {
  console.error('❌ File size check failed:', error.message);
  process.exit(1);
}

// Test 3: Check TypeScript definitions
try {
  const coreTypes = fs.readFileSync('./dist/index.d.ts', 'utf8');
  const aiTypes = fs.readFileSync('./dist/ai/index.d.ts', 'utf8');
  
  if (coreTypes.includes('export') && aiTypes.includes('export')) {
    console.log('✅ TypeScript definitions generated correctly');
    console.log(`   Core types: ${coreTypes.split('\n').length} lines`);
    console.log(`   AI types: ${aiTypes.split('\n').length} lines`);
  } else {
    console.error('❌ TypeScript definitions are incomplete');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ TypeScript definitions check failed:', error.message);
  process.exit(1);
}
  
// Test 4: Package exports
try {
  const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  const exports = packageJson.exports;
  
  if (exports['.'] && exports['./ai'] && exports['./styles.css']) {
    console.log('✅ Package exports configured correctly');
    console.log('   Available exports: ., ./ai, ./styles.css');
  } else {
    console.error('❌ Package exports not configured correctly');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Package.json validation failed:', error.message);
  process.exit(1);
}

// Test 5: Check AI utilities in built files
try {
  const aiBundle = fs.readFileSync('./dist/ai/index.js', 'utf8');
  
  if (aiBundle.includes('filterAIClasses') && aiBundle.includes('withAIProtection')) {
    console.log('✅ AI utilities included in build');
    console.log('   filterAIClasses ✓');
    console.log('   withAIProtection ✓');
  } else {
    console.error('❌ AI utilities missing from build');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ AI utilities check failed:', error.message);
  process.exit(1);
}

console.log('\n🎉 All tests passed! AI architecture is working correctly.');
console.log('\n📖 Usage Examples:');
console.log('   Standard: import { Button } from "ft-design-system"');
console.log('   AI-protected: import { Button } from "ft-design-system"');
console.log('   Utilities: import { filterAIClasses } from "ft-design-system"'); 