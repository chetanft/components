#!/usr/bin/env node
/**
 * Fix multiple component issues:
 * - ProgressBar: Add variants
 * - RadioSelector: Add proper examples
 * - SegmentedTabs: Add icons to icon-only variant
 * - Steps: Add StepsItem to registry, fix clipping
 * - Tooltip: Fix design
 * - UploadItem: Add variants
 */

const fs = require('fs');
const path = require('path');

const componentsJson = path.join(__dirname, 'src/data/components.json');
const registryFile = path.join(__dirname, 'src/registry.tsx');

console.log('🔧 Fixing multiple component issues...\n');

let componentsData = JSON.parse(fs.readFileSync(componentsJson, 'utf-8'));
let registryContent = fs.readFileSync(registryFile, 'utf-8');

// Fix ProgressBar - add variants
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
      name: "Large",
      code: "<ProgressBar value={50} size=\"lg\" />"
    },
    {
      name: "With Percentage",
      code: "<ProgressBar value={50} showPercentage={true} />"
    }
  ];
  console.log('   ✅ Fixed ProgressBar (added variants)');
}

// Fix RadioSelector - add proper examples
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

// Fix SegmentedTabs - add icons to icon-only variant
if (componentsData.designSystem?.components.SegmentedTabs) {
  const comp = componentsData.designSystem.components.SegmentedTabs;
  comp.examples = comp.examples.map(ex => {
    let code = ex.code || '';
    // If it's icon-only variant, add icon components
    if (ex.name.includes('Icon Only') || code.includes('variant=\"icon-only\"')) {
      // Note: Can't use JSX components directly in react-live, so we'll use icon names as strings
      // The component should handle string icon names
      code = code.replace(
        /items=\{\[([^\]]+)\]\}/,
        'items={[{label: "Copy", value: "copy", icon: "copy"}, {label: "Check", value: "check", icon: "check"}]}'
      );
    }
    return { ...ex, code };
  });
  console.log('   ✅ Fixed SegmentedTabs (added icons to icon-only variant)');
}

// Fix Steps - remove StepsItem example or fix it
if (componentsData.designSystem?.components.Steps) {
  const comp = componentsData.designSystem.components.Steps;
  comp.examples = comp.examples.map(ex => {
    let code = ex.code || '';
    // Remove StepsItem example or convert it
    if (ex.name.includes('Item Only') && code.includes('StepsItem')) {
      // Replace with a simple Steps example
      code = "<Steps currentStep={1} device=\"desktop\" steps={[{label: \"Step 1\"}, {label: \"Step 2\"}]} />";
    }
    // Fix clipping issue - ensure proper container
    if (ex.name.includes('Completed')) {
      code = code.replace(/<Steps/, '<div className="w-full max-w-md"><Steps');
      code = code.replace(/\/>$/, ' /></div>');
    }
    return { ...ex, code };
  });
  console.log('   ✅ Fixed Steps (removed StepsItem, fixed clipping)');
}

// Fix Tooltip - ensure proper examples
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

// Fix UploadItem - add variants
if (componentsData.designSystem?.components.UploadItem) {
  const comp = componentsData.designSystem.components.UploadItem;
  comp.examples = [
    {
      name: "Basic",
      code: "<UploadItem file={{name: \"test.txt\", type: \"text/plain\", size: 1024}} />"
    },
    {
      name: "Uploading",
      code: "<UploadItem file={{name: \"test.txt\", type: \"text/plain\", size: 1024}} state=\"uploading\" progress={50} />"
    },
    {
      name: "Success",
      code: "<UploadItem file={{name: \"test.txt\", type: \"text/plain\", size: 1024}} state=\"success\" />"
    },
    {
      name: "Error",
      code: "<UploadItem file={{name: \"test.txt\", type: \"text/plain\", size: 1024}} state=\"error\" />"
    }
  ];
  console.log('   ✅ Fixed UploadItem (added variants)');
}

// Add StepsItem to registry
if (!registryContent.includes('StepsItem')) {
  // Add import
  registryContent = registryContent.replace(
    /import \{([^}]+Steps[^}]*)\} from/,
    (match, imports) => {
      if (!imports.includes('StepsItem')) {
        return match.replace('Steps', 'Steps, StepsItem');
      }
      return match;
    }
  );
  
  // Add to registry object
  registryContent = registryContent.replace(
    /(\s+Steps,)/,
    '$1\n    StepsItem,'
  );
  
  fs.writeFileSync(registryFile, registryContent);
  console.log('   ✅ Added StepsItem to registry');
}

// Write fixed file
fs.writeFileSync(componentsJson, JSON.stringify(componentsData, null, 2));

console.log('\n' + '='.repeat(60));
console.log('✅ ALL COMPONENT ISSUES FIXED');
console.log('='.repeat(60));
console.log('\n✨ All components should now work correctly!');

