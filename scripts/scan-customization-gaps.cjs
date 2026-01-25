#!/usr/bin/env node

/**
 * Customization Gap Scanner
 * 
 * Scans components for hard-coded lists/labels/options that should be customizable
 * but aren't exposed via props, slots, or context.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const COMPONENTS_DIR = path.join(__dirname, '..', 'src/components');
const OUTPUT_JSON = path.join(__dirname, '..', 'CUSTOMIZATION_GAP_SCAN_RESULTS.json');
const OUTPUT_MD = path.join(__dirname, '..', 'CUSTOMIZATION_GAP_SCAN_REPORT.md');

// Gap categories
const GAP_TYPES = {
  PRESET_LIST: 'preset-list',
  FORMAT_OPTIONS: 'format-options',
  INTERNAL_STATE_UI: 'internal-state-ui',
  UI_TEXT_LITERALS: 'ui-text-literals',
  DROPDOWN_OPTIONS: 'dropdown-options',
};

// Priority mapping (component name → priority)
const PRIORITY_MAP = {
  // High priority - frequently used components
  Button: 'high',
  Input: 'high',
  Select: 'high',
  DatePicker: 'high',
  Calendar: 'high',
  ColorPicker: 'high',
  Dropdown: 'high',
  Table: 'high',
  Modal: 'high',
  Drawer: 'high',
  Form: 'high',
  // Medium priority
  Pagination: 'medium',
  Steps: 'medium',
  Timeline: 'medium',
  Tree: 'medium',
  Transfer: 'medium',
  // Low priority - already customizable or internal
  Blocks: 'low', // Template-specific demo data
};

// Files/patterns to exclude
const EXCLUDE_PATTERNS = [
  /\.test\./,
  /\.stories\./,
  /\.spec\./,
  /node_modules/,
  /dist/,
  /\.d\.ts$/,
  /index\.ts$/, // Usually just exports
  /src\/components\/templates\//, // Template/demo-only components
];

const INTERNAL_COMPONENT_PATHS = [
  path.join('src', 'components', 'molecules', 'DatePicker', 'Calendar.tsx'),
];

// Patterns for detecting hard-coded arrays
const ARRAY_PATTERNS = {
  // const ARRAY_NAME = [...]
  constantArray: /const\s+([A-Z_][A-Z0-9_]*)\s*=\s*\[[\s\S]{0,1000}?\];/g,
  // const name = [...] (lowercase, but likely a constant)
  lowercaseArray: /const\s+([a-z][a-zA-Z0-9_]*)\s*=\s*\[[\s\S]{0,1000}?\];/g,
  // export const ARRAY = [...]
  exportedArray: /export\s+const\s+([A-Z_][A-Z0-9_]*)\s*=\s*\[[\s\S]{0,1000}?\];/g,
};

// Patterns for option lists in code
const OPTION_PATTERNS = [
  /options\s*[:=]\s*\[/g,
  /presets\s*[:=]\s*\[/g,
  /quickSelect\s*[:=]\s*\[/g,
  /labels\s*[:=]\s*\[/g,
  /defaultColors\s*[:=]\s*\[/g,
  /dropdownPresets\s*[:=]\s*\[/g,
];

// Patterns for UI text literals
const JSX_TEXT_PATTERNS = [
  /<[^>]+>['"]([A-Za-z][^'"]{3,})['"]<\/[^>]+>/g,
  /(\w+)=['"]([A-Za-z][^'"]{3,})['"]/g,
];

// Color array pattern
const COLOR_ARRAY_PATTERN = /\[[\s\S]*?(#[0-9A-Fa-f]{3,6})[\s\S]*?\]/gi;

/**
 * Check if file should be excluded
 */
function shouldExclude(filePath) {
  const relativePath = path.relative(process.cwd(), filePath);
  return EXCLUDE_PATTERNS.some(pattern => pattern.test(relativePath));
}

/**
 * Extract component name from file path
 */
function extractComponentName(filePath) {
  const fileName = path.basename(filePath, path.extname(filePath));
  // Remove common suffixes
  return fileName
    .replace(/\.stories$/, '')
    .replace(/\.test$/, '')
    .replace(/\.spec$/, '');
}

/**
 * Check if array name indicates it's a local variable (not a constant)
 */
function isLocalVariable(arrayName, context) {
  const name = arrayName.toLowerCase();
  
  // Common local variable patterns
  const localPatterns = [
    /^(updated|prev|next|current|temp|tmp|result|data|items|list|arr|arr_|values|items_|new_|old_)/,
    /^[a-z][a-z0-9_]*$/, // lowercase with underscores (likely local)
  ];
  
  // If it's UPPER_CASE, it's likely a constant
  if (arrayName === arrayName.toUpperCase() && arrayName.includes('_')) {
    return false;
  }
  
  // If it's PascalCase, it's likely a constant
  if (/^[A-Z][a-zA-Z0-9]*$/.test(arrayName) && arrayName[0] === arrayName[0].toUpperCase()) {
    return false;
  }
  
  // Check context - if it's inside a function body and lowercase, likely local
  if (name.match(/^(updated|prev|next|current|temp|tmp|result)$/)) {
    return true;
  }
  
  return false;
}

function isInComment(content, index) {
  const before = content.slice(0, index);
  const lastBlockStart = before.lastIndexOf('/*');
  const lastBlockEnd = before.lastIndexOf('*/');
  if (lastBlockStart > lastBlockEnd) {
    return true;
  }
  const lastLineBreak = before.lastIndexOf('\n');
  const lastLineComment = before.lastIndexOf('//');
  return lastLineComment > lastLineBreak;
}

/**
 * Extract hard-coded arrays from content
 */
function extractHardCodedArrays(content, filePath) {
  const arrays = [];
  const lines = content.split('\n');
  
  // Pattern 1: Constant arrays (UPPER_CASE or DEFAULT_*)
  let match;
  for (const pattern of Object.values(ARRAY_PATTERNS)) {
    pattern.lastIndex = 0;
    while ((match = pattern.exec(content)) !== null) {
      if (isInComment(content, match.index)) {
        continue;
      }
      const arrayName = match[1];
      const arrayContent = match[0];
      const lineNumber = content.substring(0, match.index).split('\n').length;
      const context = getContext(content, match.index, 200);
      
      // Skip if it's a local variable
      if (isLocalVariable(arrayName, context)) {
        continue;
      }
      
      // Skip if it's inside a function body and looks like a local variable
      const beforeMatch = content.substring(Math.max(0, match.index - 100), match.index);
      if (beforeMatch.includes('function') || beforeMatch.includes('=>') || beforeMatch.includes('const ') && !beforeMatch.includes('export')) {
        // Check if it's really a constant (UPPER_CASE or DEFAULT_*)
        if (!arrayName.match(/^[A-Z_][A-Z0-9_]*$/) && !arrayName.startsWith('DEFAULT_')) {
          continue;
        }
      }
      
      // Extract array values (simplified)
      const valueMatch = arrayContent.match(/\[([\s\S]*?)\]/);
      let values = [];
      if (valueMatch) {
        // Try to extract string values
        const stringValues = valueMatch[1].match(/['"]([^'"]+)['"]/g);
        if (stringValues) {
          values = stringValues.map(v => v.replace(/['"]/g, ''));
        }
        // Try to extract hex colors
        const colorValues = valueMatch[1].match(/#[0-9A-Fa-f]{3,6}/gi);
        if (colorValues) {
          values = values.concat(colorValues);
        }
        // Try to extract object values { label: ..., value: ... }
        const objectValues = valueMatch[1].match(/\{[^}]*label[^}]*\}/gi);
        if (objectValues && values.length === 0) {
          values = objectValues.slice(0, 5); // Limit object examples
        }
      }
      
      arrays.push({
        name: arrayName,
        fullMatch: arrayContent,
        line: lineNumber,
        values: values.slice(0, 10), // Limit to first 10 values
        context: context,
      });
    }
  }
  
  return arrays;
}

/**
 * Get context around a match
 */
function getContext(content, index, chars = 100) {
  const start = Math.max(0, index - chars);
  const end = Math.min(content.length, index + chars);
  return content.substring(start, end).replace(/\n/g, ' ').trim();
}

/**
 * Extract props interface from component file
 */
function extractPropsInterface(content, componentName) {
  const props = [];
  
  // Pattern 1: export interface ComponentNameProps { ... }
  const interfacePattern = new RegExp(
    `export\\s+interface\\s+${componentName}Props\\s*\\{([\\s\\S]*?)\\}`,
    'm'
  );
  
  // Also try without "Props" suffix
  const interfacePattern2 = new RegExp(
    `export\\s+interface\\s+${componentName}\\s*\\{([\\s\\S]*?)\\}`,
    'm'
  );
  
  // Try BaseChartProps for chart components
  const baseChartPattern = /export\s+interface\s+BaseChartProps\s*\{([\s\S]*?)\}/m;
  
  // Try generic ComponentProps
  const genericPattern = /export\s+interface\s+(\w+)Props\s*\{([\s\S]*?)\}/m;
  
  let propsContent = null;
  let match = content.match(interfacePattern);
  if (!match) {
    match = content.match(interfacePattern2);
  }
  if (!match && componentName.includes('Chart')) {
    match = content.match(baseChartPattern);
  }
  if (!match) {
    // Try to find any Props interface
    const allMatches = content.matchAll(/export\s+interface\s+(\w+Props)\s*\{([\s\S]*?)\}/g);
    for (const m of allMatches) {
      if (m[1].includes(componentName) || componentName.includes(m[1].replace('Props', ''))) {
        propsContent = m[2];
        break;
      }
    }
  } else {
    propsContent = match[1];
  }
  
  if (!propsContent) {
    return props;
  }
  
  // Extract prop names (simple regex - prop name followed by ? or :)
  const propPattern = /(\w+)\s*[?:]/g;
  while ((match = propPattern.exec(propsContent)) !== null) {
    props.push(match[1]);
  }
  
  return props;
}

/**
 * Check if array name matches a prop (semantic matching)
 */
function checkPropMatch(arrayName, props) {
  // Direct match
  const normalizedArrayName = arrayName
    .toLowerCase()
    .replace(/_/g, '')
    .replace(/default/g, '')
    .replace(/const/g, '');
  
  for (const prop of props) {
    const normalizedProp = prop.toLowerCase();
    
    // Exact match
    if (normalizedProp === normalizedArrayName) {
      return true;
    }
    
    // Contains match
    if (normalizedArrayName.includes(normalizedProp) || normalizedProp.includes(normalizedArrayName)) {
      return true;
    }
    
    // Semantic matches
    const semanticMatches = {
      'presets': ['preset', 'presets', 'options'],
      'options': ['option', 'options', 'items', 'choices'],
      'colors': ['color', 'colors', 'palette'],
      'labels': ['label', 'labels', 'text'],
      'weekdays': ['weekday', 'weekdays', 'daylabels'],
      'months': ['month', 'months', 'monthlabels'],
      'quickselect': ['quickselect', 'quickselectoptions', 'quick'],
    };
    
    for (const [key, variants] of Object.entries(semanticMatches)) {
      if (normalizedArrayName.includes(key)) {
        if (variants.some(v => normalizedProp.includes(v))) {
          return true;
        }
      }
    }
  }
  
  return false;
}

/**
 * Check for context providers
 */
function checkContext(content) {
  const contextPattern = /createContext|useContext|Context\.Provider/gi;
  return contextPattern.test(content);
}

/**
 * Check for composable/slot API
 */
function checkSlots(content) {
  const slotPatterns = [
    /asChild/gi,
    /children.*React\.ReactNode/gi,
    /ComponentHeader|ComponentFooter|ComponentBody/gi,
  ];
  return slotPatterns.some(pattern => pattern.test(content));
}

/**
 * Categorize gap type
 */
function categorizeGap(array, content) {
  const name = array.name.toLowerCase();
  const values = array.values.join(' ').toLowerCase();
  
  // Preset lists
  if (name.includes('preset') || name.includes('quickselect') || name.includes('option')) {
    return GAP_TYPES.PRESET_LIST;
  }
  
  // Format options (weekdays, months, labels)
  if (name.includes('weekday') || name.includes('month') || name.includes('label') || 
      name.includes('format') || values.includes('sun') || values.includes('mon')) {
    return GAP_TYPES.FORMAT_OPTIONS;
  }
  
  // Color palettes
  if (name.includes('color') || array.fullMatch.match(/#[0-9A-Fa-f]{3,6}/gi)) {
    return GAP_TYPES.INTERNAL_STATE_UI;
  }
  
  // Dropdown options
  if (name.includes('dropdown') || name.includes('select')) {
    return GAP_TYPES.DROPDOWN_OPTIONS;
  }
  
  // Default to internal-state-ui
  return GAP_TYPES.INTERNAL_STATE_UI;
}

/**
 * Determine priority
 */
function prioritizeGap(componentName, gapType) {
  // Check priority map
  if (PRIORITY_MAP[componentName]) {
    return PRIORITY_MAP[componentName];
  }
  
  // High priority for format-options (i18n needs)
  if (gapType === GAP_TYPES.FORMAT_OPTIONS) {
    return 'high';
  }
  
  // High priority for preset-list in common components
  if (gapType === GAP_TYPES.PRESET_LIST) {
    return 'medium';
  }
  
  return 'medium';
}

/**
 * Generate recommendation
 */
function generateRecommendation(gap, componentName, props) {
  const arrayName = gap.name;
  const normalizedName = arrayName
    .toLowerCase()
    .replace(/^default_?/, '')
    .replace(/_/g, '');
  
  // Suggest prop name
  let propName = normalizedName;
  if (propName.endsWith('s')) {
    propName = propName.slice(0, -1) + 's'; // Keep plural
  }
  
  // Convert to camelCase
  propName = propName.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
  
  const recommendation = {
    fix: `Add optional ${propName} prop`,
    defaultBehavior: `Use ${arrayName} when ${propName} prop not provided`,
    example: `${propName}?: ${getTypeSuggestion(gap)}`,
    tests: [
      `Test custom ${propName}`,
      `Test default ${propName} when prop not provided`,
      `Test edge cases (empty array, null, undefined)`,
    ],
    stories: [`Custom${capitalize(propName)} story`],
    docs: `Add JSDoc comment with @default value`,
  };
  
  return recommendation;
}

/**
 * Get type suggestion based on gap
 */
function getTypeSuggestion(gap) {
  if (gap.values.some(v => v.startsWith('#'))) {
    return 'string[]';
  }
  if (gap.values.some(v => typeof v === 'string' && v.includes('label'))) {
    return 'Array<{ label: string; value: string }>';
  }
  return 'string[]';
}

/**
 * Capitalize first letter
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Check if array is used in render/affects UI
 */
function affectsUI(content, arrayName) {
  // Check if array is used in JSX or render logic
  const usagePatterns = [
    new RegExp(`${arrayName}\\s*\\[`, 'g'),
    new RegExp(`${arrayName}\\.map`, 'g'),
    new RegExp(`${arrayName}\\.forEach`, 'g'),
    new RegExp(`${arrayName}\\.filter`, 'g'),
    new RegExp(`\\.map\\(.*${arrayName}`, 'g'),
  ];
  
  return usagePatterns.some(pattern => pattern.test(content));
}

/**
 * Scan a single component file
 */
function scanComponent(filePath) {
  if (shouldExclude(filePath)) {
    return null;
  }
  
  const content = fs.readFileSync(filePath, 'utf-8');
  let componentName = extractComponentName(filePath);
  const relativePath = path.relative(process.cwd(), filePath);
  if (INTERNAL_COMPONENT_PATHS.some(p => relativePath.endsWith(p))) {
    return null;
  }
  if (relativePath.includes(path.join('src', 'components', 'templates'))) {
    return null;
  }
  
  // Special handling for chartConfig.ts - check BaseChartProps
  if (filePath.includes('chartConfig.ts')) {
    componentName = 'BaseChart';
    // Also check BaseChart.tsx for props
    const baseChartPath = filePath.replace('chartConfig.ts', 'BaseChart.tsx');
    if (fs.existsSync(baseChartPath)) {
      const baseChartContent = fs.readFileSync(baseChartPath, 'utf-8');
      const baseChartProps = extractPropsInterface(baseChartContent, 'BaseChart');
      // Use BaseChart props for chartConfig.ts
      const arrays = extractHardCodedArrays(content, filePath);
      if (arrays.length === 0) {
        return null;
      }
      const hasContext = checkContext(content);
      const hasSlots = checkSlots(content);
      const gaps = [];
      for (const array of arrays) {
        if (array.name === 'defaultColors') {
          if (!checkPropMatch(array.name, baseChartProps)) {
            if (affectsUI(content, array.name) || filePath.includes('chartConfig')) {
              const gapType = categorizeGap(array, content);
              const priority = prioritizeGap(componentName, gapType);
              const recommendation = generateRecommendation(array, componentName, baseChartProps);
              gaps.push({
                component: 'Chart Components',
                file: relativePath,
                line: array.line,
                type: gapType,
                priority,
                hardCodedValue: {
                  name: array.name,
                  value: array.values,
                  context: array.context,
                },
                publicAPI: {
                  props: baseChartProps,
                  slots: hasSlots,
                  context: hasContext,
                },
                gap: `No prop to customize ${array.name.toLowerCase()}`,
                recommendation,
              });
            }
          }
        }
      }
      return gaps.length > 0 ? { component: 'Chart Components', gaps } : null;
    }
  }
  
  // Extract hard-coded arrays
  const arrays = extractHardCodedArrays(content, filePath);
  
  if (arrays.length === 0) {
    return null;
  }
  
  // Extract props interface
  const props = extractPropsInterface(content, componentName);
  
  // Check for context and slots
  const hasContext = checkContext(content);
  const hasSlots = checkSlots(content);
  
  // Find gaps
  const gaps = [];
  
  for (const array of arrays) {
    // Skip if it's a test/story constant
    if (array.name.includes('TEST') || array.name.includes('STORY') || array.name.includes('MOCK')) {
      continue;
    }
    
    // Skip empty arrays (likely local variables)
    if (array.values.length === 0 && !array.name.match(/^[A-Z_][A-Z0-9_]*$/)) {
      continue;
    }
    
    // Skip if it's already a prop
    if (checkPropMatch(array.name, props)) {
      continue;
    }
    
    // Check if it affects UI
    if (!affectsUI(content, array.name)) {
      continue;
    }
    
    // Skip if it's clearly a local variable (not exported, lowercase, used immediately)
    if (isLocalVariable(array.name, array.context)) {
      continue;
    }
    
    // Categorize
    const gapType = categorizeGap(array, content);
    
    // Determine priority
    const priority = prioritizeGap(componentName, gapType);
    
    // Generate recommendation
    const recommendation = generateRecommendation(array, componentName, props);
    
    gaps.push({
      component: componentName,
      file: relativePath,
      line: array.line,
      type: gapType,
      priority,
      hardCodedValue: {
        name: array.name,
        value: array.values,
        context: array.context,
      },
      publicAPI: {
        props,
        slots: hasSlots,
        context: hasContext,
      },
      gap: `No prop to customize ${array.name.toLowerCase()}`,
      recommendation,
    });
  }
  
  return gaps.length > 0 ? { component: componentName, gaps } : null;
}

/**
 * Main scanning function
 */
function main() {
  console.log('🔍 Scanning components for customization gaps...\n');
  
  // Find all component files
  const files = execSync(
    `find "${COMPONENTS_DIR}" -type f \\( -name "*.tsx" -o -name "*.ts" \\)`,
    { encoding: 'utf-8' }
  )
    .trim()
    .split('\n')
    .filter(Boolean);
  
  console.log(`Found ${files.length} component files to analyze\n`);
  
  const allGaps = [];
  const componentGaps = {};
  
  // Scan each file
  for (const file of files) {
    try {
      const result = scanComponent(file);
      if (result && result.gaps.length > 0) {
        componentGaps[result.component] = result.gaps;
        allGaps.push(...result.gaps);
      }
    } catch (error) {
      console.error(`Error scanning ${file}:`, error.message);
    }
  }
  
  // Generate summary
  const summary = {
    totalGaps: allGaps.length,
    byType: {},
    byPriority: {},
  };
  
  for (const gap of allGaps) {
    summary.byType[gap.type] = (summary.byType[gap.type] || 0) + 1;
    summary.byPriority[gap.priority] = (summary.byPriority[gap.priority] || 0) + 1;
  }
  
  // Generate JSON output
  const jsonOutput = {
    generated: new Date().toISOString(),
    summary,
    gaps: allGaps,
  };
  
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(jsonOutput, null, 2));
  console.log(`✅ JSON report saved to: ${OUTPUT_JSON}`);
  
  // Generate markdown report
  generateMarkdownReport(jsonOutput);
  console.log(`✅ Markdown report saved to: ${OUTPUT_MD}`);
  
  // Print summary
  console.log('\n' + '='.repeat(80));
  console.log('📊 SCAN SUMMARY');
  console.log('='.repeat(80));
  console.log(`\nTotal gaps found: ${summary.totalGaps}`);
  console.log(`\nBy Type:`);
  for (const [type, count] of Object.entries(summary.byType)) {
    console.log(`  ${type}: ${count}`);
  }
  console.log(`\nBy Priority:`);
  for (const [priority, count] of Object.entries(summary.byPriority)) {
    console.log(`  ${priority}: ${count}`);
  }
  console.log(`\n📋 Detailed reports:`);
  console.log(`  - JSON: ${OUTPUT_JSON}`);
  console.log(`  - Markdown: ${OUTPUT_MD}`);
  console.log('');
}

/**
 * Generate markdown report
 */
function generateMarkdownReport(data) {
  let md = `# Customization Gap Scan Report\n\n`;
  md += `**Generated**: ${data.generated}\n\n`;
  md += `## Executive Summary\n\n`;
  md += `Total gaps found: **${data.summary.totalGaps}**\n\n`;
  
  md += `### Breakdown by Type\n\n`;
  for (const [type, count] of Object.entries(data.summary.byType)) {
    md += `- **${type}**: ${count}\n`;
  }
  
  md += `\n### Breakdown by Priority\n\n`;
  for (const [priority, count] of Object.entries(data.summary.byPriority)) {
    md += `- **${priority}**: ${count}\n`;
  }
  
  md += `\n---\n\n## Detailed Findings\n\n`;
  
  // Group by component
  const byComponent = {};
  for (const gap of data.gaps) {
    if (!byComponent[gap.component]) {
      byComponent[gap.component] = [];
    }
    byComponent[gap.component].push(gap);
  }
  
  // Sort by priority (high first)
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  
  for (const [component, gaps] of Object.entries(byComponent)) {
    gaps.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    
    md += `### ${component}\n\n`;
    
    for (const gap of gaps) {
      md += `**File**: \`${gap.file}\`  \n`;
      md += `**Line**: ${gap.line}  \n`;
      md += `**Type**: \`${gap.type}\`  \n`;
      md += `**Priority**: \`${gap.priority}\`  \n\n`;
      
      md += `**Hard-coded value**:\n`;
      md += `\`\`\`typescript\n`;
      md += `const ${gap.hardCodedValue.name} = ${JSON.stringify(gap.hardCodedValue.value.slice(0, 5), null, 2)}${gap.hardCodedValue.value.length > 5 ? '...' : ''};\n`;
      md += `\`\`\`\n\n`;
      
      md += `**Public API**:\n`;
      md += `- Props: ${gap.publicAPI.props.length > 0 ? gap.publicAPI.props.join(', ') : 'None'}\n`;
      md += `- Slots: ${gap.publicAPI.slots ? 'Yes' : 'No'}\n`;
      md += `- Context: ${gap.publicAPI.context ? 'Yes' : 'No'}\n\n`;
      
      md += `**Gap**: ${gap.gap}\n\n`;
      
      md += `**Recommendation**:\n`;
      md += `- Fix: ${gap.recommendation.fix}\n`;
      md += `- Default behavior: ${gap.recommendation.defaultBehavior}\n`;
      md += `- Example: \`${gap.recommendation.example}\`\n`;
      md += `- Tests: ${gap.recommendation.tests.join(', ')}\n`;
      md += `- Stories: ${gap.recommendation.stories.join(', ')}\n`;
      md += `- Docs: ${gap.recommendation.docs}\n\n`;
      
      md += `---\n\n`;
    }
  }
  
  fs.writeFileSync(OUTPUT_MD, md);
}

// Run scanner
main();
