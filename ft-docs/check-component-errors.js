#!/usr/bin/env node
/**
 * Script to check for component errors in the docs
 * Finds missing exports, registry issues, and code example problems
 */

const fs = require('fs');
const path = require('path');

const errors = {
  missingExports: [],
  missingInRegistry: [],
  invalidCodeExamples: [],
  syntaxErrors: [],
};

// Paths
const rootDir = path.join(__dirname, '..');
const componentsIndex = path.join(rootDir, 'src/components/index.ts');
const registryFile = path.join(__dirname, 'src/registry.tsx');
const componentsJson = path.join(__dirname, 'src/data/components.json');

console.log('🔍 Checking component errors...\n');

// 1. Read registry to see what components are expected
const registryContent = fs.readFileSync(registryFile, 'utf-8');
const registryImports = registryContent.match(/import \{([^}]+)\} from/s)?.[1] || '';
const registryComponents = registryImports
  .split(',')
  .map(c => c.trim())
  .filter(c => c && !c.startsWith('//'));

console.log(`Found ${registryComponents.length} components in registry\n`);

// 2. Check components.json to see what components are documented
let componentsData = {};
try {
  componentsData = JSON.parse(fs.readFileSync(componentsJson, 'utf-8'));
} catch (e) {
  console.error('❌ Error reading components.json:', e.message);
  process.exit(1);
}

const documentedComponents = Object.keys(componentsData.designSystem?.components || {});
console.log(`Found ${documentedComponents.length} documented components\n`);

// 3. Check for missing exports in components/index.ts
const componentsIndexContent = fs.readFileSync(componentsIndex, 'utf-8');

// Extract exported components
const exportedComponents = new Set();
const exportMatches = componentsIndexContent.matchAll(/export \* from ['"]([^'"]+)['"]/g);
for (const match of exportMatches) {
  const exportPath = match[1];
  // Extract component name from path
  const parts = exportPath.split('/');
  const componentName = parts[parts.length - 1];
  exportedComponents.add(componentName);
  
  // Also check for direct file exports
  if (exportPath.includes('/')) {
    const fileName = parts[parts.length - 1];
    if (fileName.includes('.')) {
      exportedComponents.add(fileName.split('.')[0]);
    }
  }
}

// Check for named exports
const namedExports = componentsIndexContent.matchAll(/export \{ ([^}]+) \} from/g);
for (const match of namedExports) {
  const exports = match[1].split(',').map(e => e.trim().split(' as ')[0].trim());
  exports.forEach(e => exportedComponents.add(e));
}

// 4. Check each registry component
console.log('📋 Checking registry components:\n');
for (const comp of registryComponents) {
  // Check if component is exported
  const isExported = Array.from(exportedComponents).some(exp => 
    exp.toLowerCase() === comp.toLowerCase() || 
    exp.includes(comp) || 
    comp.includes(exp)
  );
  
  if (!isExported && comp !== 'Logo' && comp !== 'Logos') {
    // Check if it's a direct file export
    const directExport = componentsIndexContent.includes(`./atoms/${comp}`) ||
                         componentsIndexContent.includes(`./molecules/${comp}`) ||
                         componentsIndexContent.includes(`./organisms/${comp}`);
    
    if (!directExport) {
      errors.missingExports.push(comp);
      console.log(`  ❌ ${comp}: Not exported from components/index.ts`);
    }
  }
}

// 5. Check code examples for syntax errors
console.log('\n📝 Checking code examples:\n');
let exampleErrors = 0;
for (const [compName, compData] of Object.entries(componentsData.designSystem?.components || {})) {
  const examples = compData.examples || [];
  for (const example of examples) {
    const code = example.code || '';
    
    // Check for balanced brackets/braces/parens
    const openBraces = (code.match(/\{/g) || []).length;
    const closeBraces = (code.match(/\}/g) || []).length;
    const openBrackets = (code.match(/\[/g) || []).length;
    const closeBrackets = (code.match(/\]/g) || []).length;
    const openParens = (code.match(/\(/g) || []).length;
    const closeParens = (code.match(/\)/g) || []).length;
    
    if (openBraces !== closeBraces || openBrackets !== closeBrackets || openParens !== closeParens) {
      errors.invalidCodeExamples.push({
        component: compName,
        example: example.name,
        code: code.substring(0, 50) + '...',
        issues: [
          openBraces !== closeBraces && `Unmatched braces: ${openBraces} open, ${closeBraces} close`,
          openBrackets !== closeBrackets && `Unmatched brackets: ${openBrackets} open, ${closeBrackets} close`,
          openParens !== closeParens && `Unmatched parens: ${openParens} open, ${closeParens} close`,
        ].filter(Boolean),
      });
      exampleErrors++;
    }
    
    // Check for complex expressions that might cause issues
    if (code.includes('options={[') || code.includes('options={[')) {
      // Check if it's properly closed
      const optionsMatch = code.match(/options=\{([^}]+)\}/);
      if (optionsMatch && !optionsMatch[1].includes(']')) {
        errors.invalidCodeExamples.push({
          component: compName,
          example: example.name,
          code: code.substring(0, 50) + '...',
          issues: ['Incomplete options array'],
        });
        exampleErrors++;
      }
    }
  }
}

// 6. Check for components in docs but not in registry
console.log('\n📚 Checking documented components:\n');
for (const comp of documentedComponents) {
  if (!registryComponents.includes(comp) && comp !== 'Logos' && comp !== 'Logo') {
    errors.missingInRegistry.push(comp);
    console.log(`  ⚠️  ${comp}: Documented but not in registry`);
  }
}

// Print summary
console.log('\n' + '='.repeat(60));
console.log('📊 ERROR SUMMARY');
console.log('='.repeat(60));
console.log(`\n❌ Missing Exports: ${errors.missingExports.length}`);
if (errors.missingExports.length > 0) {
  errors.missingExports.forEach(comp => console.log(`   - ${comp}`));
}

console.log(`\n❌ Missing in Registry: ${errors.missingInRegistry.length}`);
if (errors.missingInRegistry.length > 0) {
  errors.missingInRegistry.forEach(comp => console.log(`   - ${comp}`));
}

console.log(`\n❌ Invalid Code Examples: ${errors.invalidCodeExamples.length}`);
if (errors.invalidCodeExamples.length > 0) {
  console.log('\nFirst 10 invalid examples:');
  errors.invalidCodeExamples.slice(0, 10).forEach(err => {
    console.log(`   - ${err.component} - ${err.example}:`);
    err.issues.forEach(issue => console.log(`     ${issue}`));
  });
}

// Write errors to file for fixing script
const errorsFile = path.join(__dirname, 'component-errors.json');
fs.writeFileSync(errorsFile, JSON.stringify(errors, null, 2));
console.log(`\n💾 Errors saved to: ${errorsFile}`);

const totalErrors = errors.missingExports.length + 
                   errors.missingInRegistry.length + 
                   errors.invalidCodeExamples.length;

if (totalErrors === 0) {
  console.log('\n✅ No errors found!');
  process.exit(0);
} else {
  console.log(`\n❌ Total errors: ${totalErrors}`);
  process.exit(1);
}





