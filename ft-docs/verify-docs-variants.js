#!/usr/bin/env node
/**
 * Verify that variants are properly displayed in docs pages
 */

const { getAllComponentNames, getComponentMetadata } = require('./src/lib/component-metadata.ts');

console.log('🔍 Verifying Variants in Docs Pages\n');
console.log('='.repeat(70));

const components = getAllComponentNames();
const testComponents = ['Badge', 'Button', 'Checkbox', 'Switch', 'Input', 'Dropdown'];

let allPassed = true;
const results = [];

testComponents.forEach(name => {
  try {
    const meta = getComponentMetadata(name);
    if (!meta) {
      console.log(`❌ ${name}: Component metadata not found`);
      allPassed = false;
      results.push({ name, status: 'FAIL', reason: 'Metadata not found' });
      return;
    }

    const examples = meta.examples || [];
    
    if (examples.length === 0) {
      console.log(`⚠️  ${name}: No examples/variants found`);
      results.push({ name, status: 'WARN', reason: 'No variants', count: 0 });
      return;
    }

    // Check that each example has required fields
    const invalidExamples = examples.filter(e => !e.name || !e.code);
    if (invalidExamples.length > 0) {
      console.log(`❌ ${name}: ${invalidExamples.length} invalid examples (missing name or code)`);
      allPassed = false;
      results.push({ name, status: 'FAIL', reason: 'Invalid examples', count: examples.length });
      return;
    }

    // Check for duplicates
    const uniqueNames = [...new Set(examples.map(e => e.name))];
    if (uniqueNames.length !== examples.length) {
      console.log(`⚠️  ${name}: ${examples.length - uniqueNames.length} duplicate variants found`);
      results.push({ name, status: 'WARN', reason: 'Duplicates found', count: uniqueNames.length, total: examples.length });
    } else {
      console.log(`✅ ${name}: ${examples.length} variants (all unique)`);
      results.push({ name, status: 'PASS', count: examples.length });
    }

    // Display variant names
    console.log(`   Variants: ${uniqueNames.join(', ')}`);
    console.log('');

  } catch (e) {
    console.log(`❌ ${name}: Error - ${e.message}`);
    allPassed = false;
    results.push({ name, status: 'FAIL', reason: e.message });
  }
});

console.log('='.repeat(70));
console.log('\n📊 Summary:\n');

const passed = results.filter(r => r.status === 'PASS').length;
const warnings = results.filter(r => r.status === 'WARN').length;
const failed = results.filter(r => r.status === 'FAIL').length;

console.log(`   ✅ Passed: ${passed}`);
console.log(`   ⚠️  Warnings: ${warnings}`);
console.log(`   ❌ Failed: ${failed}`);

const totalVariants = results.reduce((sum, r) => sum + (r.count || 0), 0);
console.log(`   📦 Total Variants: ${totalVariants}`);

console.log('\n' + '='.repeat(70));
console.log('\n📝 Docs Page Rendering Check:\n');

// Simulate what the docs page does
testComponents.forEach(name => {
  const meta = getComponentMetadata(name);
  if (meta && meta.examples && meta.examples.length > 0) {
    console.log(`✅ ${name}: Would render ${meta.examples.length} variant examples`);
    console.log(`   - Each variant has: name="${meta.examples[0].name}", code="${meta.examples[0].code.substring(0, 50)}..."`);
  } else {
    console.log(`⚠️  ${name}: Would show "No examples" section`);
  }
});

console.log('\n✅ Verification complete!\n');

if (!allPassed) {
  console.log('⚠️  Some issues found. Please review the output above.\n');
  process.exit(1);
} else {
  console.log('✅ All checks passed! Variants should be visible in docs pages.\n');
  process.exit(0);
}

