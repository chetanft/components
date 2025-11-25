#!/usr/bin/env node
/**
 * Test different code wrapping formats to find what react-live accepts
 */

const testCases = [
  '<Button>Click me</Button>',
  '<Dropdown label="Test" />',
  '<Dropdown label=\'Test\' />',
  '<RadioGroup options={[{value: "1", label: "One"}]} />',
];

const formats = [
  (code) => `() => ${code}`,
  (code) => `() => (${code})`,
  (code) => `function Preview() { return ${code} }`,
  (code) => `function Preview() {\n  return (\n    ${code}\n  )\n}`,
  (code) => `() => {\n  return ${code}\n}`,
];

console.log('Testing react-live code formats...\n');

for (const testCase of testCases) {
  console.log(`\nTesting: ${testCase.substring(0, 30)}...`);
  for (let i = 0; i < formats.length; i++) {
    const wrapped = formats[i](testCase);
    // Check for basic syntax issues
    const hasBalancedParens = (wrapped.match(/\(/g) || []).length === (wrapped.match(/\)/g) || []).length;
    const hasBalancedBraces = (wrapped.match(/\{/g) || []).length === (wrapped.match(/\}/g) || []).length;
    
    console.log(`  Format ${i + 1}: ${hasBalancedParens && hasBalancedBraces ? '✅' : '❌'} ${wrapped.substring(0, 60)}...`);
  }
}





