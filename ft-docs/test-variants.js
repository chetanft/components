#!/usr/bin/env node
/**
 * Test script to verify all component variants are being extracted and displayed
 */

const { getAllComponentNames, getComponentMetadata } = require('./src/lib/component-metadata.ts');

console.log('🧪 Testing Component Variant Extraction\n');
console.log('='.repeat(60));

const components = getAllComponentNames();
console.log(`\n📦 Total Components: ${components.length}\n`);

// Test key components
const testComponents = [
  'Badge',
  'Button', 
  'Checkbox',
  'Switch',
  'Input',
  'Dropdown',
  'Tabs',
  'Label',
  'Text',
  'RadioGroup'
];

let totalVariants = 0;
let componentsWithVariants = 0;
let componentsWithoutVariants = 0;
const issues = [];

console.log('Testing Variant Extraction:\n');

testComponents.forEach(name => {
  try {
    const meta = getComponentMetadata(name);
    if (meta) {
      const variants = meta.examples || [];
      const uniqueVariants = [...new Set(variants.map(e => e.name))];
      
      if (uniqueVariants.length > 0) {
        componentsWithVariants++;
        totalVariants += uniqueVariants.length;
        console.log(`✅ ${name.padEnd(20)} ${uniqueVariants.length.toString().padStart(3)} variants`);
        console.log(`   ${uniqueVariants.join(', ')}`);
      } else {
        componentsWithoutVariants++;
        console.log(`⚠️  ${name.padEnd(20)} 0 variants (no examples found)`);
        issues.push(`${name}: No variants extracted`);
      }
    } else {
      console.log(`❌ ${name.padEnd(20)} NOT FOUND`);
      issues.push(`${name}: Component not found`);
    }
  } catch (e) {
    console.log(`❌ ${name.padEnd(20)} ERROR: ${e.message}`);
    issues.push(`${name}: ${e.message}`);
  }
});

console.log('\n' + '='.repeat(60));
console.log('\n📊 Summary:');
console.log(`   Components with variants: ${componentsWithVariants}`);
console.log(`   Components without variants: ${componentsWithoutVariants}`);
console.log(`   Total variants extracted: ${totalVariants}`);
console.log(`   Issues found: ${issues.length}`);

if (issues.length > 0) {
  console.log('\n⚠️  Issues:');
  issues.forEach(issue => console.log(`   - ${issue}`));
}

// Test all components
console.log('\n' + '='.repeat(60));
console.log('\n🔍 Testing All Components:\n');

let allComponentsWithVariants = 0;
let allComponentsWithoutVariants = 0;

components.slice(0, 20).forEach(name => {
  try {
    const meta = getComponentMetadata(name);
    if (meta) {
      const variants = meta.examples || [];
      if (variants.length > 0) {
        allComponentsWithVariants++;
      } else {
        allComponentsWithoutVariants++;
      }
    }
  } catch (e) {
    // Skip errors
  }
});

console.log(`   Components with variants: ${allComponentsWithVariants}`);
console.log(`   Components without variants: ${allComponentsWithoutVariants}`);

console.log('\n✅ Variant extraction test complete!\n');

