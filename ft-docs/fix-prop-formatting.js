#!/usr/bin/env node
/**
 * Fix prop formatting - ensure numbers and booleans use curly braces
 */

const fs = require('fs');
const path = require('path');

const componentsJson = path.join(__dirname, 'src/data/components.json');

console.log('🔧 Fixing prop formatting...\n');

let componentsData = JSON.parse(fs.readFileSync(componentsJson, 'utf-8'));

let totalFixed = 0;

// Process all components
for (const [compName, compData] of Object.entries(componentsData.designSystem?.components || {})) {
  const examples = compData.examples || [];
  let needsUpdate = false;
  
  const fixedExamples = examples.map(ex => {
    let code = ex.code || '';
    const originalCode = code;
    
    // Fix number props: prop=123 -> prop={123}
    code = code.replace(/(\w+)=(\d+)(\s|>)/g, '$1={$2}$3');
    
    // Fix boolean props: prop=true -> prop={true} (if not already fixed)
    code = code.replace(/(\w+)=true(\s|>)/g, '$1={true}$2');
    code = code.replace(/(\w+)=false(\s|>)/g, '$1={false}$2');
    
    if (code !== originalCode) {
      needsUpdate = true;
    }
    
    return { ...ex, code };
  });
  
  if (needsUpdate) {
    componentsData.designSystem.components[compName].examples = fixedExamples;
    totalFixed++;
    console.log(`   ✅ Fixed ${compName} prop formatting`);
  }
}

// Write fixed file
fs.writeFileSync(componentsJson, JSON.stringify(componentsData, null, 2));

console.log('\n' + '='.repeat(60));
console.log('✅ PROP FORMATTING FIXED');
console.log('='.repeat(60));
console.log(`\n📊 Summary:`);
console.log(`   - Fixed ${totalFixed} components`);
console.log('\n✨ All props are now properly formatted!');

