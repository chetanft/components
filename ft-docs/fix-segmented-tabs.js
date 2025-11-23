#!/usr/bin/env node
/**
 * Fix SegmentedTabs - use items prop instead of tabs
 */

const fs = require('fs');
const path = require('path');

const componentsJson = path.join(__dirname, 'src/data/components.json');

console.log('🔧 Fixing SegmentedTabs...\n');

let componentsData = JSON.parse(fs.readFileSync(componentsJson, 'utf-8'));

if (componentsData.designSystem?.components.SegmentedTabs) {
  const comp = componentsData.designSystem.components.SegmentedTabs;
  
  // Replace tabs prop with items prop
  comp.examples = comp.examples.map(ex => {
    let code = ex.code || '';
    
    // Replace tabs={} with items={}
    code = code.replace(/tabs=/g, 'items=');
    
    // If no items prop, add it with at least one item
    if (!code.includes('items=')) {
      code = code.replace(/\s*\/>/, ' items={[{label: "Tab 1", value: "tab1"}]} />');
    } else if (code.includes('items={[]}')) {
      // Replace empty array with at least one item
      code = code.replace('items={[]}', 'items={[{label: "Tab 1", value: "tab1"}]}');
    }
    
    return { ...ex, code };
  });
  
  console.log('   ✅ Fixed SegmentedTabs (changed tabs to items, added default item)');
  
  // Write fixed file
  fs.writeFileSync(componentsJson, JSON.stringify(componentsData, null, 2));
  
  console.log('\n✨ SegmentedTabs is now fixed!');
} else {
  console.log('   ❌ SegmentedTabs not found');
}

