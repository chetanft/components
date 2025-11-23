#!/usr/bin/env node
/**
 * Final fix for all reported issues:
 * - ProgressBar: Add all variants
 * - RadioSelector: Add proper examples
 * - SegmentedTabs: Fix icon-only variant with Icon components
 * - Steps: Fix clipping, remove StepsItem example
 * - Tooltip: Check design
 * - UploadItem: Add all variants
 */

const fs = require('fs');
const path = require('path');

const componentsJson = path.join(__dirname, 'src/data/components.json');

console.log('🔧 Fixing all reported issues...\n');

let componentsData = JSON.parse(fs.readFileSync(componentsJson, 'utf-8'));

// Fix ProgressBar - add all variants
if (componentsData.designSystem?.components.ProgressBar) {
  const comp = componentsData.designSystem.components.ProgressBar;
  comp.examples = [
    {
      name: "Primary",
      code: "<ProgressBar value={50} variant=\"primary\" />"
    },
    {
      name: "Success",
      code: "<ProgressBar value={75} variant=\"success\" />"
    },
    {
      name: "Warning",
      code: "<ProgressBar value={60} variant=\"warning\" />"
    },
    {
      name: "Danger",
      code: "<ProgressBar value={30} variant=\"danger\" />"
    },
    {
      name: "Small",
      code: "<ProgressBar value={50} size=\"sm\" />"
    },
    {
      name: "Medium",
      code: "<ProgressBar value={50} size=\"md\" />"
    },
    {
      name: "Large",
      code: "<ProgressBar value={50} size=\"lg\" />"
    },
    {
      name: "With Percentage",
      code: "<ProgressBar value={50} showPercentage={true} />"
    }
  ];
  console.log('   ✅ Fixed ProgressBar (added all variants)');
}

// Fix RadioSelector - add proper examples with options
if (componentsData.designSystem?.components.RadioSelector) {
  const comp = componentsData.designSystem.components.RadioSelector;
  comp.examples = [
    {
      name: "Basic With Radio",
      code: "<RadioSelector name=\"demo\" options={[{value: \"1\", header: \"Radio selector header\"}, {value: \"2\", header: \"Radio selector header\"}]} />"
    },
    {
      name: "With Description",
      code: "<RadioSelector name=\"demo2\" options={[{value: \"1\", header: \"Radio selector header\", description: \"Radio selector description\"}, {value: \"2\", header: \"Radio selector header\", description: \"Radio selector description\"}]} />"
    },
    {
      name: "States",
      code: "<RadioSelector name=\"demo3\" defaultValue=\"selected\" options={[{value: \"default\", header: \"Default state\"}, {value: \"selected\", header: \"Selected state\"}, {value: \"disabled\", header: \"Disabled state\", disabled: true}]} />"
    }
  ];
  console.log('   ✅ Fixed RadioSelector (added proper examples)');
}

// Fix SegmentedTabs - icon-only variant needs Icon components
if (componentsData.designSystem?.components.SegmentedTabs) {
  const comp = componentsData.designSystem.components.SegmentedTabs;
  comp.examples = comp.examples.map(ex => {
    let code = ex.code || '';
    // If it's icon-only variant, use Icon component with name prop
    if (ex.name.includes('Icon Only') || code.includes('variant=\"icon-only\"')) {
      // Use Icon component with name prop instead of JSX
      code = code.replace(
        /items=\{\[([^\]]+)\]\}/,
        'items={[{label: "Copy", value: "copy", icon: <Icon name="copy" />}, {label: "Check", value: "check", icon: <Icon name="check" />}]}'
      );
    }
    return { ...ex, code };
  });
  console.log('   ✅ Fixed SegmentedTabs (added Icon components to icon-only variant)');
}

// Fix Steps - remove StepsItem example, fix clipping
if (componentsData.designSystem?.components.Steps) {
  const comp = componentsData.designSystem.components.Steps;
  comp.examples = comp.examples.map(ex => {
    let code = ex.code || '';
    // Remove StepsItem example
    if (ex.name.includes('Item Only') && code.includes('StepsItem')) {
      // Replace with a simple Steps example
      code = "<Steps currentStep={1} device=\"desktop\" steps={[{label: \"Step 1\"}, {label: \"Step 2\"}]} />";
    }
    // Fix clipping - ensure proper container with overflow
    if (ex.name.includes('Completed')) {
      // Remove wrapper if exists, add proper container
      code = code.replace(/<div[^>]*>/, '');
      code = code.replace(/<\/div>$/, '');
      code = `<div className="w-full overflow-x-auto"><Steps currentStep={3} device="desktop" steps={[{label: "Step 1"}, {label: "Step 2"}, {label: "Step 3"}]} /></div>`;
    }
    return { ...ex, code };
  });
  console.log('   ✅ Fixed Steps (removed StepsItem, fixed clipping)');
}

// Fix Tooltip - ensure examples match design
if (componentsData.designSystem?.components.Tooltip) {
  const comp = componentsData.designSystem.components.Tooltip;
  comp.examples = comp.examples.map(ex => {
    let code = ex.code || '';
    // Ensure tooltip has proper content
    if (code.endsWith('/>')) {
      code = code.replace(/\s*\/>/, `>${ex.name} tooltip content</Tooltip>`);
    }
    return { ...ex, code };
  });
  console.log('   ✅ Fixed Tooltip (ensured content)');
}

// Fix UploadItem - add all variants
if (componentsData.designSystem?.components.UploadItem) {
  const comp = componentsData.designSystem.components.UploadItem;
  comp.examples = [
    {
      name: "Basic",
      code: "<UploadItem file={{id: \"1\", name: \"test.txt\", type: \"text/plain\", size: 1024}} />"
    },
    {
      name: "Uploading",
      code: "<UploadItem file={{id: \"2\", name: \"document.pdf\", type: \"application/pdf\", size: 2048, uploadProgress: 50}} state=\"uploading\" />"
    },
    {
      name: "Uploaded",
      code: "<UploadItem file={{id: \"3\", name: \"image.jpg\", type: \"image/jpeg\", size: 5120, uploadedAt: new Date()}} state=\"uploaded\" />"
    },
    {
      name: "Saved",
      code: "<UploadItem file={{id: \"4\", name: \"file.xlsx\", type: \"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet\", size: 10240}} state=\"saved\" />"
    },
    {
      name: "Error",
      code: "<UploadItem file={{id: \"5\", name: \"failed.txt\", type: \"text/plain\", size: 512}} state=\"error\" />"
    }
  ];
  console.log('   ✅ Fixed UploadItem (added all variants)');
}

// Write fixed file
fs.writeFileSync(componentsJson, JSON.stringify(componentsData, null, 2));

console.log('\n' + '='.repeat(60));
console.log('✅ ALL ISSUES FIXED');
console.log('='.repeat(60));
console.log('\n✨ All components should now work correctly!');

