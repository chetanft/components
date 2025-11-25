#!/usr/bin/env node
/**
 * Test actual component code examples to find runtime errors
 */

const fs = require('fs');
const path = require('path');

const componentsJson = path.join(__dirname, 'src/data/components.json');

console.log('🧪 Testing component code examples...\n');

const componentsData = JSON.parse(fs.readFileSync(componentsJson, 'utf-8'));

const errors = [];

// Test each component's examples
for (const [compName, compData] of Object.entries(componentsData.designSystem?.components || {})) {
  const examples = compData.examples || [];
  
  for (const example of examples) {
    const code = example.code || '';
    
    // Test different wrapping formats
    const formats = [
      `() => (${code})`,
      `() => ${code}`,
      `function Preview() { return ${code} }`,
      `function Preview() {\n  return (\n    ${code}\n  )\n}`,
    ];
    
    // Check for common issues
    const issues = [];
    
    // 1. Check for single quotes in JSX attributes (can cause issues)
    if (code.includes("='") && code.includes('="')) {
      issues.push('Mixed quote types');
    }
    
    // 2. Check for unclosed tags
    const openTags = (code.match(/</g) || []).length;
    const closeTags = (code.match(/>/g) || []).length;
    if (openTags !== closeTags) {
      issues.push('Unmatched tags');
    }
    
    // 3. Check for complex expressions
    if (code.includes('options={[') || code.includes('options={[')) {
      // Check if properly closed
      const optionsStart = code.indexOf('options={');
      if (optionsStart !== -1) {
        let braceCount = 0;
        let bracketCount = 0;
        let foundEnd = false;
        
        for (let i = optionsStart + 'options={'.length; i < code.length; i++) {
          if (code[i] === '{') braceCount++;
          if (code[i] === '}') {
            braceCount--;
            if (braceCount === 0) {
              foundEnd = true;
              break;
            }
          }
          if (code[i] === '[') bracketCount++;
          if (code[i] === ']') bracketCount--;
        }
        
        if (!foundEnd || bracketCount !== 0) {
          issues.push('Incomplete options array');
        }
      }
    }
    
    // 4. Check for problematic patterns
    if (code.includes("'") && code.includes('"') && code.indexOf("'") < code.indexOf('"')) {
      // Single quotes before double quotes can cause parsing issues
      issues.push('Quote order issue');
    }
    
    if (issues.length > 0) {
      errors.push({
        component: compName,
        example: example.name,
        code: code.substring(0, 80),
        issues,
      });
    }
  }
}

console.log(`Found ${errors.length} problematic examples:\n`);

// Group by component
const byComponent = {};
for (const error of errors) {
  if (!byComponent[error.component]) {
    byComponent[error.component] = [];
  }
  byComponent[error.component].push(error);
}

for (const [comp, compErrors] of Object.entries(byComponent)) {
  console.log(`\n❌ ${comp}: ${compErrors.length} issues`);
  compErrors.forEach(err => {
    console.log(`   - ${err.example}: ${err.issues.join(', ')}`);
    console.log(`     Code: ${err.code}...`);
  });
}

// Save errors
const errorsFile = path.join(__dirname, 'component-runtime-errors.json');
fs.writeFileSync(errorsFile, JSON.stringify(errors, null, 2));
console.log(`\n💾 Errors saved to: ${errorsFile}`);

if (errors.length === 0) {
  console.log('\n✅ No errors found!');
  process.exit(0);
} else {
  console.log(`\n❌ Total errors: ${errors.length}`);
  process.exit(1);
}





