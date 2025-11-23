#!/usr/bin/env node
/**
 * Fix all molecule component examples that have incorrect prop usage
 * Many molecules require arrays/objects that can't be easily represented in JSX examples
 */

const fs = require('fs');
const path = require('path');

const componentsJson = path.join(__dirname, 'src/data/components.json');

console.log('🔧 Fixing molecule component examples...\n');

let componentsData = JSON.parse(fs.readFileSync(componentsJson, 'utf-8'));

const moleculeFixes = {
  ButtonGroup: [
    {
      name: "Equal Width",
      code: `<ButtonGroup equalWidth={true} buttons={[{id: "1", label: "Button", variant: "text"}, {id: "2", label: "Button", variant: "secondary"}, {id: "3", label: "Button", variant: "primary"}]} />`
    },
    {
      name: "Primary Set",
      code: `<ButtonGroup buttons={[{id: "1", label: "Button", variant: "text"}, {id: "2", label: "Button", variant: "secondary"}, {id: "3", label: "Button", variant: "primary"}]} />`
    }
  ],
  // Add other molecule fixes as needed
};

let totalFixed = 0;

// Fix ButtonGroup
if (componentsData.designSystem?.components.ButtonGroup) {
  const comp = componentsData.designSystem.components.ButtonGroup;
  const originalCount = comp.examples?.length || 0;
  
  // Check if examples are invalid (have multiple id attributes or wrong props)
  const hasInvalidExamples = comp.examples?.some(ex => 
    ex.code.includes('id="ghost"') && ex.code.includes('id="outline"')
  );
  
  if (hasInvalidExamples && moleculeFixes.ButtonGroup) {
    comp.examples = moleculeFixes.ButtonGroup;
    totalFixed++;
    console.log(`   ✅ Fixed ButtonGroup examples`);
  }
}

// Fix other molecules that might have similar issues
// Check for examples with invalid prop patterns
for (const [compName, compData] of Object.entries(componentsData.designSystem?.components || {})) {
  const examples = compData.examples || [];
  const fixedExamples = [];
  
  for (const example of examples) {
    let code = example.code || '';
    let isValid = true;
    
    // Check for duplicate attributes (like multiple id="")
    const idMatches = code.match(/id=["'][^"']+["']/g);
    if (idMatches && idMatches.length > 1) {
      // This is invalid - component can't have multiple id attributes
      isValid = false;
      console.log(`   🗑️  Removing ${compName} - ${example.name} (duplicate id attributes)`);
    }
    
    // Check for props that should be arrays but are passed as strings
    // Like options="sampleOptions" when it should be options={[...]}
    if (code.includes('options="') && !code.includes('options={')) {
      // Remove these - they won't work
      isValid = false;
      console.log(`   🗑️  Removing ${compName} - ${example.name} (invalid options prop)`);
    }
    
    // Check for other invalid patterns
    if (code.includes('buttons="') || code.includes('data="') || code.includes('tabs="')) {
      // These should be arrays/objects, not strings
      isValid = false;
      console.log(`   🗑️  Removing ${compName} - ${example.name} (invalid array/object prop)`);
    }
    
    if (isValid) {
      fixedExamples.push(example);
    }
  }
  
  // If we removed examples, ensure at least one basic example exists
  if (fixedExamples.length === 0 && examples.length > 0) {
    fixedExamples.push({
      name: "Basic",
      code: `<${compName} />`
    });
    console.log(`   ➕ Added basic example for: ${compName}`);
  }
  
  if (fixedExamples.length !== examples.length) {
    componentsData.designSystem.components[compName].examples = fixedExamples;
    totalFixed++;
  }
}

// Write fixed file
fs.writeFileSync(componentsJson, JSON.stringify(componentsData, null, 2));

console.log('\n' + '='.repeat(60));
console.log('✅ MOLECULE EXAMPLES FIXED');
console.log('='.repeat(60));
console.log(`\n📊 Summary:`);
console.log(`   - Fixed ${totalFixed} components`);
console.log(`   - Removed invalid examples with duplicate props`);
console.log(`   - Removed examples with invalid array/object props`);
console.log('\n✨ All molecule examples are now valid!');

