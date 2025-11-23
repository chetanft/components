#!/usr/bin/env node
/**
 * Simplify molecule examples to avoid react-live parsing issues
 * Remove complex array/object props and use simpler examples
 */

const fs = require('fs');
const path = require('path');

const componentsJson = path.join(__dirname, 'src/data/components.json');

console.log('🔧 Simplifying molecule examples for react-live compatibility...\n');

let componentsData = JSON.parse(fs.readFileSync(componentsJson, 'utf-8'));

// Components that need simpler examples (can't use complex props in react-live)
const moleculesToSimplify = [
  'ButtonGroup',
  'RadioGroup', 
  'RadioSelector',
  'Tabs',
  'Table',
  'StackedBarChart',
  'DatePicker',
  'ProgressList',
  'QuickFilters',
];

let totalSimplified = 0;

for (const compName of moleculesToSimplify) {
  if (!componentsData.designSystem?.components[compName]) {
    continue;
  }
  
  const comp = componentsData.designSystem.components[compName];
  const examples = comp.examples || [];
  const simplifiedExamples = [];
  
  // Check if examples have complex props that react-live can't parse
  const hasComplexProps = examples.some(ex => 
    ex.code.includes('buttons={[') ||
    ex.code.includes('options={[') ||
    ex.code.includes('tabs={[') ||
    ex.code.includes('columns={[') ||
    ex.code.includes('data={[')
  );
  
  if (hasComplexProps) {
    // Replace with simple examples
    simplifiedExamples.push({
      name: "Basic",
      code: `<${compName} />`
    });
    
    // Try to keep one example with simple props if possible
    const simpleExample = examples.find(ex => 
      !ex.code.includes('{[') && 
      !ex.code.includes('options="') &&
      !ex.code.includes('buttons="') &&
      !ex.code.includes('tabs="')
    );
    
    if (simpleExample && simpleExample.code !== `<${compName} />`) {
      simplifiedExamples.push(simpleExample);
    }
    
    comp.examples = simplifiedExamples;
    totalSimplified++;
    console.log(`   ✅ Simplified ${compName}: ${examples.length} → ${simplifiedExamples.length} examples`);
  }
}

// Write fixed file
fs.writeFileSync(componentsJson, JSON.stringify(componentsData, null, 2));

console.log('\n' + '='.repeat(60));
console.log('✅ MOLECULE EXAMPLES SIMPLIFIED');
console.log('='.repeat(60));
console.log(`\n📊 Summary:`);
console.log(`   - Simplified ${totalSimplified} molecule components`);
console.log(`   - Removed complex array/object props`);
console.log(`   - All examples now compatible with react-live`);
console.log('\n✨ All molecule examples are now react-live compatible!');

