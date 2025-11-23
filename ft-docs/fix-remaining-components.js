#!/usr/bin/env node
/**
 * Fix remaining component errors - add missing props and fix syntax
 */

const fs = require('fs');
const path = require('path');

const componentsJson = path.join(__dirname, 'src/data/components.json');

console.log('🔧 Fixing remaining component errors...\n');

let componentsData = JSON.parse(fs.readFileSync(componentsJson, 'utf-8'));

let totalFixed = 0;

// Fix RadioSelector
if (componentsData.designSystem?.components.RadioSelector) {
  const comp = componentsData.designSystem.components.RadioSelector;
  comp.examples = comp.examples.map(ex => {
    let code = ex.code || '';
    if (!code.includes('options=') && !code.includes('name=')) {
      code = code.replace(/\s*\/>/, ' name="demo" options={[]} />');
    } else if (!code.includes('options=')) {
      code = code.replace(/\s*\/>/, ' options={[]} />');
    }
    return { ...ex, code };
  });
  console.log('   ✅ Fixed RadioSelector');
  totalFixed++;
}

// Fix SegmentedTabs
if (componentsData.designSystem?.components.SegmentedTabs) {
  const comp = componentsData.designSystem.components.SegmentedTabs;
  comp.examples = comp.examples.map(ex => {
    let code = ex.code || '';
    if (!code.includes('tabs=') && !code.includes('defaultValue=')) {
      code = code.replace(/\s*\/>/, ' tabs={[]} defaultValue="" />');
    } else if (!code.includes('tabs=')) {
      code = code.replace(/\s*\/>/, ' tabs={[]} />');
    }
    return { ...ex, code };
  });
  console.log('   ✅ Fixed SegmentedTabs');
  totalFixed++;
}

// Fix QuickFilters
if (componentsData.designSystem?.components.QuickFilters) {
  const comp = componentsData.designSystem.components.QuickFilters;
  comp.examples = comp.examples.map(ex => {
    let code = ex.code || '';
    if (!code.includes('filters=')) {
      code = code.replace(/\s*\/>/, ' filters={[]} />');
    }
    return { ...ex, code };
  });
  console.log('   ✅ Fixed QuickFilters');
  totalFixed++;
}

// Fix Table
if (componentsData.designSystem?.components.Table) {
  const comp = componentsData.designSystem.components.Table;
  comp.examples = comp.examples.map(ex => {
    let code = ex.code || '';
    if (!code.includes('columns=')) {
      code = code.replace(/\s*\/>/, ' columns={[]} />');
    }
    if (!code.includes('data=')) {
      code = code.replace(/\s*\/>/, ' data={[]} />');
    }
    return { ...ex, code };
  });
  console.log('   ✅ Fixed Table');
  totalFixed++;
}

// Fix Tabs
if (componentsData.designSystem?.components.Tabs) {
  const comp = componentsData.designSystem.components.Tabs;
  comp.examples = comp.examples.map(ex => {
    let code = ex.code || '';
    if (!code.includes('tabs=')) {
      code = code.replace(/\s*\/>/, ' tabs={[]} />');
    }
    return { ...ex, code };
  });
  console.log('   ✅ Fixed Tabs');
  totalFixed++;
}

// Fix StackedBarChart
if (componentsData.designSystem?.components.StackedBarChart) {
  const comp = componentsData.designSystem.components.StackedBarChart;
  comp.examples = comp.examples.map(ex => {
    let code = ex.code || '';
    if (!code.includes('data=')) {
      code = code.replace(/\s*\/>/, ' data={[]} />');
    }
    return { ...ex, code };
  });
  console.log('   ✅ Fixed StackedBarChart');
  totalFixed++;
}

// Fix Tooltip - ensure it has children
if (componentsData.designSystem?.components.Tooltip) {
  const comp = componentsData.designSystem.components.Tooltip;
  comp.examples = comp.examples.map(ex => {
    let code = ex.code || '';
    // If self-closing, add children
    if (code.endsWith('/>')) {
      code = code.replace(/\s*\/>/, '>Tooltip content</Tooltip>');
    }
    return { ...ex, code };
  });
  console.log('   ✅ Fixed Tooltip');
  totalFixed++;
}

// Fix UploadButton
if (componentsData.designSystem?.components.UploadButton) {
  const comp = componentsData.designSystem.components.UploadButton;
  comp.examples = comp.examples.map(ex => {
    let code = ex.code || '';
    if (!code.includes('onUpload=')) {
      code = code.replace(/\s*\/>/, ' onUpload={() => {}} />');
    }
    return { ...ex, code };
  });
  console.log('   ✅ Fixed UploadButton');
  totalFixed++;
}

// Fix Card - ensure it has content
if (componentsData.designSystem?.components.Card) {
  const comp = componentsData.designSystem.components.Card;
  comp.examples = comp.examples.map(ex => {
    let code = ex.code || '';
    // If self-closing, add children
    if (code.endsWith('/>') && !code.includes('>Content</Card>')) {
      code = code.replace(/\s*\/>/, '>Card content</Card>');
    }
    return { ...ex, code };
  });
  console.log('   ✅ Fixed Card');
  totalFixed++;
}

// Fix Collapsible - ensure it has header
if (componentsData.designSystem?.components.Collapsible) {
  const comp = componentsData.designSystem.components.Collapsible;
  comp.examples = comp.examples.map(ex => {
    let code = ex.code || '';
    // Fix any regex issues
    code = code.replace(/\/[^\/\s]+\/[^>]*"/g, '');
    if (!code.includes('header=')) {
      code = code.replace(/\s*\/>/, ' header="Header" />');
    }
    return { ...ex, code };
  });
  console.log('   ✅ Fixed Collapsible');
  totalFixed++;
}

// Fix Footer
if (componentsData.designSystem?.components.Footer) {
  const comp = componentsData.designSystem.components.Footer;
  comp.examples = comp.examples.map(ex => {
    let code = ex.code || '';
    if (!code.includes('links=') && code.endsWith('/>')) {
      code = code.replace(/\s*\/>/, ' links={[]} />');
    }
    return { ...ex, code };
  });
  console.log('   ✅ Fixed Footer');
  totalFixed++;
}

// Fix NavigationPopover
if (componentsData.designSystem?.components.NavigationPopover) {
  const comp = componentsData.designSystem.components.NavigationPopover;
  comp.examples = comp.examples.map(ex => {
    let code = ex.code || '';
    if (!code.includes('items=')) {
      code = code.replace(/\s*\/>/, ' items={[]} />');
    }
    return { ...ex, code };
  });
  console.log('   ✅ Fixed NavigationPopover');
  totalFixed++;
}

// Fix Upload
if (componentsData.designSystem?.components.Upload) {
  const comp = componentsData.designSystem.components.Upload;
  comp.examples = comp.examples.map(ex => {
    let code = ex.code || '';
    if (!code.includes('onUpload=')) {
      code = code.replace(/\s*\/>/, ' onUpload={() => {}} />');
    }
    return { ...ex, code };
  });
  console.log('   ✅ Fixed Upload');
  totalFixed++;
}

// Fix UserProfile
if (componentsData.designSystem?.components.UserProfile) {
  const comp = componentsData.designSystem.components.UserProfile;
  comp.examples = comp.examples.map(ex => {
    let code = ex.code || '';
    if (!code.includes('user=') && !code.includes('name=')) {
      code = code.replace(/\s*\/>/, ' user={{name: "John Doe", email: "john@example.com"}} />');
    }
    return { ...ex, code };
  });
  console.log('   ✅ Fixed UserProfile');
  totalFixed++;
}

// Fix UserProfileDropdown
if (componentsData.designSystem?.components.UserProfileDropdown) {
  const comp = componentsData.designSystem.components.UserProfileDropdown;
  comp.examples = comp.examples.map(ex => {
    let code = ex.code || '';
    if (!code.includes('user=') && !code.includes('name=')) {
      code = code.replace(/\s*\/>/, ' user={{name: "John Doe", email: "john@example.com"}} />');
    }
    return { ...ex, code };
  });
  console.log('   ✅ Fixed UserProfileDropdown');
  totalFixed++;
}

// Write fixed file
fs.writeFileSync(componentsJson, JSON.stringify(componentsData, null, 2));

console.log('\n' + '='.repeat(60));
console.log('✅ REMAINING COMPONENTS FIXED');
console.log('='.repeat(60));
console.log(`\n📊 Summary:`);
console.log(`   - Fixed ${totalFixed} components`);
console.log('\n✨ All components should now render correctly!');

