/**
 * Component Variant Display Order Configuration
 * 
 * This file defines the order in which variants should be displayed for each component.
 * 
 * Pattern A (Standard): Default/Primary first → Interactive → Semantic Variants → Special Features → Sizes → States
 * Pattern B (Interactive-First): Interactive → Default → Checked/On → Other States
 */

// Components that should show Interactive Demo FIRST (Pattern B)
export const interactiveFirstComponents = [
  'Checkbox',
  'RadioGroup',
  'RadioSelector',
  'Switch',
  'Collapsible',
  'NavigationPopover',
  'UserProfileDropdown',
];

// Variant display order for each component
// Lower index = higher priority (shown first)
export const componentVariantOrder: Record<string, string[]> = {
  // ============ ATOMS ============
  
  Avatar: [
    'Default',
    'Interactive',
    'Interactive Demo',
    'Placeholder',
    'Sizes',
    'All Sizes',
  ],

  Badge: [
    'Normal',
    'Danger',
    'Success',
    'Warning',
    'Neutral',
    'With Leading Icon',
    'With Trailing Icon',
    'With Both Icons',
    'With Icons',
    'Interactive',
    'Interactive Badge',
  ],

  Button: [
    'Primary',
    'Interactive',
    'Interactive Demo',
    'Secondary',
    'Tertiary',
    'Destructive',
    'Text',
    'Link',
    'With Leading Icon',
    'With Trailing Icon',
    'Icon Only',
    'Sizes',
    'All Sizes',
    'States',
    'Circular',
    'Circular Buttons',
  ],

  Checkbox: [
    'Interactive',
    'Interactive Demo',
    'Default',
    'Checked',
    'Indeterminate',
    'With Description',
    'Error',
    'Disabled',
    'Disabled Checked',
    'Small',
  ],

  Divider: [
    'Primary',
    'Secondary',
    'Tertiary',
    'Horizontal',
    'Vertical',
  ],

  Illustration: [
    'Default',
    'Interactive',
    'Interactive Demo',
    'All Types',
    'Sizes',
  ],

  Input: [
    'Default',
    'Interactive',
    'Interactive Demo',
    'Filled',
    'Error',
    'Warning',
    'Success',
    'Disabled',
    'Sizes',
    'All Sizes',
    'States',
    'Label Variants',
  ],

  Label: [
    'Default',
    'With Suffix Icon',
    'Optional',
    'Optional With Icon',
    'Mandatory',
    'Mandatory With Icon',
    'Custom Icon',
    'Long Text',
  ],

  Logos: [
    'Default',
    'All Logos',
    'Sizes',
  ],

  RadioGroup: [
    'Interactive',
    'Interactive Demo',
    'Default',
    'Horizontal',
    'With Disabled',
    'With Description',
  ],

  ReadOnly: [
    'Default',
    'With Label',
    'Different Types',
  ],

  Spacer: [
    'Default',
    'All Sizes',
    'Sizes',
  ],

  Statistic: [
    'Default',
    'Trend Up',
    'Trend Down',
    'Different Formats',
  ],

  SubText: [
    'Default',
    'Info',
    'Warning',
    'Error',
    'Success',
  ],

  Switch: [
    'Interactive',
    'Interactive Demo',
    'Unchecked',
    'Checked',
    'Disabled Unchecked',
    'Disabled Checked',
    'Without Label',
  ],

  Text: [
    'Default',
    'Sizes',
    'Weights',
  ],

  Typography: [
    'Headings',
    'Body Text',
    'Labels',
    'Code',
  ],

  Textarea: [
    'Default',
    'Interactive',
    'Interactive Demo',
    'Filled',
    'Error',
    'Disabled',
    'Sizes',
  ],

  // ============ MOLECULES ============

  Alert: [
    'Default',
    'Interactive',
    'Interactive Demo',
    'Info',
    'Success',
    'Warning',
    'Error',
    'With Actions',
  ],

  Breadcrumb: [
    'Default',
    'Interactive',
    'Interactive Demo',
    'With Separator',
    'Collapsed',
  ],

  ButtonGroup: [
    'Horizontal',
    'Interactive',
    'Interactive Demo',
    'Vertical',
    'Mixed Variants',
    'Icon Buttons',
  ],

  Chicklet: [
    'Default',
    'Interactive',
    'Interactive Demo',
    'With Icon',
    'Different Variants',
    'Removable',
  ],

  DatePicker: [
    'Default',
    'Interactive',
    'Interactive Demo',
    'With Value',
    'Range',
    'Range Interactive',
    'Range interactive',
    'With Error',
    'Disabled',
    'Sizes',
    'All Sizes',
  ],

  Dropdown: [
    'Default',
    'Interactive',
    'Interactive Demo',
    'Search Interactive',
    'Search interactive',
    'Segmented Tab Interactive',
    'Segemneted tab Interactive',
    'With Value',
    'Error',
    'Disabled',
    'Sizes',
    'All Sizes',
    'States',
  ],

  FileValidationCard: [
    'Success',
    'Interactive',
    'Interactive Demo',
    'Error',
    'Warning',
  ],

  Notification: [
    'Default',
    'Interactive',
    'Interactive Demo',
    'Info',
    'Success',
    'Warning',
    'Error',
  ],

  Pagination: [
    'Default',
    'Interactive',
    'Interactive Demo',
    'Different Pages',
    'Sizes',
  ],

  ProgressBar: [
    'Default',
    'Interactive',
    'Interactive Demo',
    'Empty',
    'Complete',
    'Success',
    'Error',
  ],

  ProgressList: [
    'Default',
    'Interactive',
    'Interactive Demo',
    'Vertical',
    'Horizontal',
  ],

  RadioSelector: [
    'Interactive',
    'Interactive Demo',
    'Default',
    'Selected',
    'Disabled',
    'With Description',
  ],

  SegmentedTabs: [
    'Default',
    'Interactive',
    'Interactive Demo',
    'With Icons',
    'Different Counts',
  ],

  SimpleColumnLayout: [
    'Two Columns',
    'Interactive',
    'Interactive Demo',
    'Three Columns',
    'Four Columns',
  ],

  Steps: [
    'Horizontal',
    'Interactive',
    'Interactive Demo',
    'Vertical',
    'Step States',
  ],

  Tooltip: [
    'Top',
    'Interactive',
    'Interactive Demo',
    'Right',
    'Bottom',
    'Left',
    'With Arrow',
    'Without Arrow',
  ],

  UploadButton: [
    'Default',
    'Interactive',
    'Interactive Demo',
    'With File',
    'Error',
  ],

  UploadItem: [
    'Default',
    'Interactive',
    'Interactive Demo',
    'Uploading',
    'Success',
    'Error',
    'File Types',
  ],

  UploadThumbnail: [
    'Image',
    'Interactive',
    'Interactive Demo',
    'With Progress',
    'Success',
    'Error',
    'File Types',
  ],

  // ============ ORGANISMS ============

  AppHeader: [
    'Default',
    'Interactive',
    'Interactive Demo',
    'With Navigation',
    'With User Profile',
    'Full Featured',
  ],

  Card: [
    'Default',
    'Interactive',
    'Interactive Demo',
    'With Header',
    'With Footer',
    'With Image',
    'Interactive Card',
  ],

  Collapsible: [
    'Interactive',
    'Interactive Demo',
    'Expanded',
    'Collapsed',
  ],

  Drawer: [
    'Default',
    'Interactive',
    'Interactive Demo',
    'From Left',
    'From Right',
    'From Top',
    'From Bottom',
  ],

  FileCard: [
    'Default',
    'Interactive',
    'Interactive Demo',
    'With Actions',
    'File Types',
  ],

  FileThumbnail: [
    'Image',
    'Interactive',
    'Interactive Demo',
    'PDF',
    'Document',
    'With Overlay',
  ],

  FileTypeIcon: [
    'Default',
    'Interactive',
    'Interactive Demo',
    'All File Types',
    'Sizes',
  ],

  Footer: [
    'Default',
    'Interactive',
    'Interactive Demo',
    'Multiple Columns',
    'With Social Links',
  ],

  Modal: [
    'Default',
    'Interactive',
    'Interactive Demo',
    'With Header',
    'With Footer',
    'Sizes',
  ],

  NavigationMenu: [
    'Default',
    'Interactive',
    'Interactive Demo',
    'With Nested Items',
    'Collapsed',
  ],

  NavigationPopover: [
    'Interactive',
    'Interactive Demo',
    'Closed',
    'Open',
    'With Multiple Items',
  ],

  QuickFilters: [
    'Default',
    'Interactive',
    'Interactive Demo',
    'With Selected',
    'Multiple Active',
  ],

  Table: [
    'Default',
    'Interactive',
    'Interactive Demo',
    'With Sorting',
    'With Selection',
    'With Pagination',
    'Full Featured',
  ],

  Tabs: [
    'Primary',
    'Interactive',
    'Interactive Demo',
    'Secondary',
    'Tertiary',
    'With Icons',
    'Overflow',
  ],

  Upload: [
    'Default',
    'Interactive',
    'Interactive Demo',
    'With Files',
    'Uploading',
    'Error',
  ],

  UploadZone: [
    'Default',
    'Interactive',
    'Interactive Demo',
    'Drag Active',
    'With Files',
    'Error',
  ],

  UserProfile: [
    'Default',
    'Interactive',
    'Interactive Demo',
    'With Extended Info',
  ],

  UserProfileDropdown: [
    'Interactive',
    'Interactive Demo',
    'Closed',
    'Open',
  ],

  // ============ CHARTS ============

  AreaChart: [
    'Default',
    'Interactive',
    'Interactive Demo',
    'With Grid',
    'Stacked',
  ],

  BarChart: [
    'Default',
    'Interactive',
    'Interactive Demo',
    'Horizontal',
    'Stacked',
  ],

  LineChart: [
    'Default',
    'Interactive',
    'Interactive Demo',
    'With Grid',
    'Multiple Lines',
  ],

  PieChart: [
    'Default',
    'Interactive',
    'Interactive Demo',
    'With Labels',
    'Doughnut',
  ],

  RadarChart: [
    'Default',
    'Interactive',
    'Interactive Demo',
  ],

  RadialChart: [
    'Default',
    'Interactive',
    'Interactive Demo',
  ],

  // Calendar (part of DatePicker molecule)
  Calendar: [
    'Default',
    'Interactive',
    'Interactive Demo',
    'With Value',
    'Range',
    'Disabled',
  ],
};

/**
 * Get the sort priority for a variant name
 * Lower number = higher priority (shown first)
 */
export function getVariantPriority(componentName: string, variantName: string): number {
  const order = componentVariantOrder[componentName];
  
  if (!order) {
    // Fallback for components not in the config
    // Interactive demos should come second for most components
    const isInteractiveFirst = interactiveFirstComponents.includes(componentName);
    
    if (isInteractiveFirst) {
      if (variantName.toLowerCase().includes('interactive')) return 0;
      if (variantName.toLowerCase() === 'default') return 1;
    } else {
      if (variantName.toLowerCase() === 'default' || variantName.toLowerCase() === 'primary') return 0;
      if (variantName.toLowerCase().includes('interactive')) return 1;
    }
    
    // Default priority for unknown variants
    return 1000;
  }
  
  // Find the variant in the order array (case-insensitive match)
  const normalizedVariantName = variantName.toLowerCase().trim();
  const index = order.findIndex(v => v.toLowerCase().trim() === normalizedVariantName);
  
  if (index !== -1) {
    return index;
  }
  
  // Check for partial matches (e.g., "Interactive Demo" matches "Interactive")
  for (let i = 0; i < order.length; i++) {
    const orderVariant = order[i].toLowerCase().trim();
    if (normalizedVariantName.includes(orderVariant) || orderVariant.includes(normalizedVariantName)) {
      return i + 0.5; // Slightly lower priority than exact match
    }
  }
  
  // Unknown variants go to the end
  return 1000;
}

/**
 * Sort examples based on component-specific variant order
 */
export function sortExamplesByDisplayOrder(
  componentName: string,
  examples: Array<{ name: string; code: string }>
): Array<{ name: string; code: string }> {
  return [...examples].sort((a, b) => {
    const priorityA = getVariantPriority(componentName, a.name);
    const priorityB = getVariantPriority(componentName, b.name);
    return priorityA - priorityB;
  });
}

