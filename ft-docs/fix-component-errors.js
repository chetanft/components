#!/usr/bin/env node
/**
 * Script to fix component errors found by check-component-errors.js
 */

const fs = require('fs');
const path = require('path');

const errorsFile = path.join(__dirname, 'component-errors.json');
const componentsJson = path.join(__dirname, 'src/data/components.json');

console.log('🔧 Fixing component errors...\n');

// Read errors
let errors = {};
try {
  errors = JSON.parse(fs.readFileSync(errorsFile, 'utf-8'));
} catch (e) {
  console.error('❌ Error reading errors file:', e.message);
  process.exit(1);
}

// Read components.json
let componentsData = {};
try {
  componentsData = JSON.parse(fs.readFileSync(componentsJson, 'utf-8'));
} catch (e) {
  console.error('❌ Error reading components.json:', e.message);
  process.exit(1);
}

let fixed = 0;

// Fix 1: Remove invalid code examples
console.log('1️⃣  Fixing invalid code examples...\n');
const errorMap = new Map();
for (const error of errors.invalidCodeExamples || []) {
  const key = `${error.component}::${error.example}`;
  if (!errorMap.has(key)) {
    errorMap.set(key, error);
  }
}

for (const [compName, compData] of Object.entries(componentsData.designSystem?.components || {})) {
  const examples = compData.examples || [];
  const originalLength = examples.length;
  
  // Filter out invalid examples
  const validExamples = examples.filter(ex => {
    const key = `${compName}::${ex.name}`;
    const error = errorMap.get(key);
    
    if (error) {
      // Check if this example has the issues mentioned
      const code = ex.code || '';
      const hasIncompleteOptions = error.issues.some(issue => issue.includes('Incomplete options array')) &&
                                   (code.includes('options={[') || code.includes('options={['));
      
      if (hasIncompleteOptions) {
        console.log(`   🗑️  Removing: ${compName} - ${ex.name} (incomplete options array)`);
        return false;
      }
    }
    
    // Also check for syntax errors
    const openBraces = (ex.code.match(/\{/g) || []).length;
    const closeBraces = (ex.code.match(/\}/g) || []).length;
    const openBrackets = (ex.code.match(/\[/g) || []).length;
    const closeBrackets = (ex.code.match(/\]/g) || []).length;
    
    if (openBraces !== closeBraces || openBrackets !== closeBrackets) {
      console.log(`   🗑️  Removing: ${compName} - ${ex.name} (syntax error)`);
      return false;
    }
    
    return true;
  });
  
  if (validExamples.length !== originalLength) {
    componentsData.designSystem.components[compName].examples = validExamples;
    fixed += (originalLength - validExamples.length);
  }
}

// Fix 2: Add missing components to registry (if they're design system tokens, skip them)
console.log('\n2️⃣  Checking missing registry components...\n');
const designSystemTokens = ['ThemeSystem', 'Colors', 'ColorSystem', 'DesignTokens'];
for (const comp of errors.missingInRegistry || []) {
  if (designSystemTokens.includes(comp)) {
    console.log(`   ℹ️  Skipping design system token: ${comp} (not a component)`);
  } else {
    console.log(`   ⚠️  Component ${comp} needs to be added to registry manually`);
  }
}

// Fix 3: Ensure all examples have valid syntax
console.log('\n3️⃣  Validating all code examples...\n');
let removedCount = 0;
for (const [compName, compData] of Object.entries(componentsData.designSystem?.components || {})) {
  const examples = compData.examples || [];
  const validExamples = [];
  
  for (const example of examples) {
    const code = example.code || '';
    
    // Check for balanced brackets/braces/parens
    const openBraces = (code.match(/\{/g) || []).length;
    const closeBraces = (code.match(/\}/g) || []).length;
    const openBrackets = (code.match(/\[/g) || []).length;
    const closeBrackets = (code.match(/\]/g) || []).length;
    const openParens = (code.match(/\(/g) || []).length;
    const closeParens = (code.match(/\)/g) || []).length;
    
    const isValid = openBraces === closeBraces && 
                   openBrackets === closeBrackets && 
                   openParens === closeParens;
    
    if (isValid) {
      validExamples.push(example);
    } else {
      removedCount++;
      console.log(`   🗑️  Removed invalid example: ${compName} - ${example.name}`);
    }
  }
  
  // If we removed examples and there are no valid ones left, add a basic one
  if (validExamples.length === 0 && examples.length > 0) {
    validExamples.push({
      name: "Basic",
      code: `<${compName} />`
    });
    console.log(`   ➕ Added basic example for: ${compName}`);
  }
  
  componentsData.designSystem.components[compName].examples = validExamples;
}

// Write fixed components.json
fs.writeFileSync(componentsJson, JSON.stringify(componentsData, null, 2));
console.log(`\n✅ Fixed ${fixed + removedCount} issues`);
console.log(`   - Removed ${removedCount} invalid code examples`);
console.log(`   - Updated components.json`);

console.log('\n✨ Done! Run check-component-errors.js again to verify.');

