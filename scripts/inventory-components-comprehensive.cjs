#!/usr/bin/env node

/**
 * Comprehensive Component Inventory System
 * 
 * Builds a complete inventory of all components with:
 * - Public API extraction (props, slots, context)
 * - Hard-coded UI element detection
 * - Gap analysis (hard-coded elements without API coverage)
 * - Verification (prop usage, defaults, story consistency)
 * - Per-component checklists
 * - Prioritized fix backlog
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const COMPONENTS_DIR = path.join(__dirname, '..', 'src/components');
const OUTPUT_JSON = path.join(__dirname, '..', 'COMPONENT_INVENTORY.json');
const OUTPUT_REPORT = path.join(__dirname, '..', 'COMPONENT_INVENTORY_REPORT.md');
const OUTPUT_BACKLOG = path.join(__dirname, '..', 'COMPONENT_FIX_BACKLOG.md');

// Priority mapping
const PRIORITY_MAP = {
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
  Pagination: 'medium',
  Steps: 'medium',
  Timeline: 'medium',
  Tree: 'medium',
  Transfer: 'medium',
  Blocks: 'low',
};

// Gap types
const GAP_TYPES = {
  PRESET_LIST: 'preset-list',
  FORMAT_OPTIONS: 'format-options',
  INTERNAL_STATE_UI: 'internal-state-ui',
  UI_TEXT_LITERALS: 'ui-text-literals',
  DROPDOWN_OPTIONS: 'dropdown-options',
};

// Files to exclude
const EXCLUDE_PATTERNS = [
  /\.test\./,
  /\.stories\./,
  /\.spec\./,
  /node_modules/,
  /dist/,
  /\.d\.ts$/,
];

/**
 * Get component category from path
 */
function getComponentType(filePath) {
  const relativePath = path.relative(COMPONENTS_DIR, filePath);
  if (relativePath.startsWith('atoms/')) return 'atom';
  if (relativePath.startsWith('molecules/')) return 'molecule';
  if (relativePath.startsWith('organisms/')) return 'organism';
  if (relativePath.startsWith('templates/')) return 'template';
  if (relativePath.startsWith('charts/')) return 'chart';
  return 'atom';
}

/**
 * Discover all components
 */
function discoverComponents() {
  const components = [];
  
  function scanDirectory(dirPath, depth = 0) {
    if (depth > 5) return;
    
    if (!fs.existsSync(dirPath)) return;
    
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    const dirName = path.basename(dirPath);
    const isChartsDir = dirName === 'charts' || dirPath.includes('/charts/');
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      
      if (entry.isDirectory()) {
        scanDirectory(fullPath, depth + 1);
      } else if (entry.isFile() && entry.name.endsWith('.tsx') && !shouldExclude(fullPath)) {
        // Check if it's a main component file
        const componentName = path.basename(entry.name, '.tsx');
        const parentDirName = path.basename(path.dirname(fullPath));
        
        // For charts directory, each .tsx file ending in Chart is a component
        if (isChartsDir) {
          if (componentName === 'BaseChart' || componentName === 'chartConfig' || componentName === 'index') {
            continue;
          }
          // Chart component (LineChart, BarChart, etc.)
          if (componentName.endsWith('Chart')) {
            const category = 'chart';
            const relativePath = path.relative(process.cwd(), fullPath);
            const dir = path.dirname(fullPath);
            const files = fs.readdirSync(dir);
            // Check for stories in charts dir or src/stories
            const storiesFile = files.find(f => f === `${componentName}.stories.tsx`) ||
              (fs.existsSync(path.join(process.cwd(), 'src/stories')) ? 
                fs.readdirSync(path.join(process.cwd(), 'src/stories')).find(f => f === `${componentName}.stories.tsx`) : null);
            const testFile = files.find(f => f === `${componentName}.test.tsx`);
            
            components.push({
              name: componentName,
              category,
              path: path.relative(process.cwd(), dir),
              mainFile: relativePath,
              storiesFile: storiesFile ? (storiesFile.includes('src/stories') ? storiesFile : path.join(path.relative(process.cwd(), dir), storiesFile)) : undefined,
              testFile: testFile ? path.join(path.relative(process.cwd(), dir), testFile) : undefined,
            });
          }
        } else {
          // Regular component - name matches directory or is index
          if (componentName === parentDirName || componentName === 'index') {
            const category = getComponentType(fullPath);
            const relativePath = path.relative(process.cwd(), fullPath);
            
            // Find associated files
            const dir = path.dirname(fullPath);
            const files = fs.readdirSync(dir);
            const storiesFile = files.find(f => f.endsWith('.stories.tsx'));
            const testFile = files.find(f => f.endsWith('.test.tsx') || f.endsWith('.spec.tsx'));
            
            components.push({
              name: dirName,
              category,
              path: path.relative(process.cwd(), dir),
              mainFile: relativePath,
              storiesFile: storiesFile ? path.join(path.relative(process.cwd(), dir), storiesFile) : undefined,
              testFile: testFile ? path.join(path.relative(process.cwd(), dir), testFile) : undefined,
            });
          }
        }
      }
    }
  }
  
  // Scan each category
  ['atoms', 'molecules', 'organisms', 'templates'].forEach(category => {
    const categoryPath = path.join(COMPONENTS_DIR, category);
    scanDirectory(categoryPath);
  });
  
  // Handle charts directory separately (flat structure)
  const chartsPath = path.join(COMPONENTS_DIR, 'charts');
  if (fs.existsSync(chartsPath)) {
    scanDirectory(chartsPath);
  }
  
  return components;
}

/**
 * Check if file should be excluded
 */
function shouldExclude(filePath) {
  const relativePath = path.relative(process.cwd(), filePath);
  return EXCLUDE_PATTERNS.some(pattern => pattern.test(relativePath));
}

/**
 * Extract props interface with detailed information
 */
function extractPropsInterface(content, componentName) {
  const props = [];
  
  // Try multiple patterns - handle multi-line interfaces with extends
  const patterns = [
    // Pattern with extends clause
    new RegExp(`export\\s+interface\\s+${componentName}Props[^{]*\\{([\\s\\S]*?)^\\}`, 'm'),
    new RegExp(`export\\s+interface\\s+${componentName}[^{]*\\{([\\s\\S]*?)^\\}`, 'm'),
    // Pattern without extends (simple)
    new RegExp(`export\\s+interface\\s+${componentName}Props\\s*\\{([\\s\\S]*?)\\}`),
    new RegExp(`export\\s+interface\\s+${componentName}\\s*\\{([\\s\\S]*?)\\}`),
    /export\s+interface\s+BaseChartProps\s*\{([\s\S]*?)\}/,
  ];
  
  let propsContent = null;
  let interfaceMatch = null;
  
  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) {
      propsContent = match[1];
      interfaceMatch = match[0];
      break;
    }
  }
  
  // Try generic Props interface
  if (!propsContent) {
    const allMatches = content.matchAll(/export\s+interface\s+(\w+Props)[^{]*\{([\s\S]*?)^\}/gm);
    for (const m of allMatches) {
      if (m[1].includes(componentName) || componentName.includes(m[1].replace('Props', ''))) {
        propsContent = m[2];
        interfaceMatch = m[0];
        break;
      }
    }
  }
  
  if (!propsContent) {
    return props;
  }
  
  // Extract props with JSDoc - handle multi-line props
  // Match JSDoc (may span multiple lines) followed by prop definition
  const propPattern = /(\/\*\*[\s\S]*?\*\/)?\s*(\w+)\??\s*:\s*([^;]+);/g;
  let match;
  
  while ((match = propPattern.exec(propsContent)) !== null) {
    const jsdoc = match[1] || '';
    const propName = match[2];
    let propType = match[3].trim();
    let isOptional = match[0].includes('?:');
    
    // Skip internal/inherited props
    if (['children', 'className', 'style', 'ref', 'key', 'asChild'].includes(propName)) {
      continue;
    }
    
    // Clean up prop type (remove newlines, normalize whitespace)
    propType = propType.replace(/\s+/g, ' ').trim();
    
    // Extract JSDoc info
    let description = '';
    let defaultValue = undefined;
    let isRequired = false;
    
    if (jsdoc) {
      const jsdocContent = jsdoc.replace(/\/\*\*|\*\//g, '').replace(/\*\s*/g, '');
      const descLines = jsdocContent.split('\n')
        .map(l => l.trim())
        .filter(l => l && !l.startsWith('@') && l.length > 0);
      if (descLines.length > 0) {
        description = descLines[0];
      }
      
      // Extract @default (may span multiple lines)
      const defaultMatch = jsdocContent.match(/@default\s+([^\n@]+)/);
      if (defaultMatch) {
        defaultValue = defaultMatch[1].trim();
      }
      
      // Check @required
      if (jsdocContent.includes('@required')) {
        isRequired = true;
      }
    }
    
    // Find line number relative to start of interface
    const beforeMatch = propsContent.substring(0, match.index);
    const lineNumber = beforeMatch.split('\n').length;
    
    // Treat unions with undefined/null as optional to avoid false "required" flags
    if (!isOptional && (propType.includes('undefined') || propType.includes('null'))) {
      isOptional = true;
    }

    props.push({
      name: propName,
      type: propType,
      required: isRequired || !isOptional,
      defaultValue: defaultValue,
      description: description || `The ${propName} prop`,
      line: lineNumber,
    });
  }
  
  return props;
}

/**
 * Extract implementation defaults
 */
function extractImplementationDefaults(content, props, componentName) {
  const defaults = {};

  // Find the component declaration to avoid picking defaults from sub-components
  const componentDecl = new RegExp(`(?:const|export\\s+const|export\\s+function)\\s+${componentName}\\b`);
  const declMatch = content.search(componentDecl);

  let params = null;
  if (declMatch !== -1) {
    // Find the first object destructuring block after the component declaration
    const afterDecl = content.slice(declMatch);
    const parenIndex = afterDecl.indexOf('(');
    if (parenIndex !== -1) {
      const afterParen = afterDecl.slice(parenIndex + 1);
      const braceIndex = afterParen.indexOf('{');
      if (braceIndex !== -1) {
        let depth = 0;
        let start = null;
        for (let i = braceIndex; i < afterParen.length; i++) {
          const ch = afterParen[i];
          if (ch === '{') {
            if (depth === 0) start = i;
            depth++;
          } else if (ch === '}') {
            depth--;
            if (depth === 0 && start !== null) {
              params = afterParen.slice(start + 1, i);
              break;
            }
          }
        }
      }
    }
  }

  // Fallback to previous pattern if not found
  if (!params) {
    const functionPattern = new RegExp(
      `(?:const|export\\s+const|export\\s+function)\\s+${componentName}\\b[\\s\\S]*?\\(([^)]*\\{[\\s\\S]*?\\})`,
      'm'
    );
    const match = content.match(functionPattern);
    if (match) {
      const paramMatch = match[1].match(/\{([\s\S]*?)\}/);
      if (paramMatch) {
        params = paramMatch[1];
      }
    }
  }

  if (params) {
    for (const prop of props) {
      // Only treat explicit defaults (prop = value or prop: alias = value) as defaults
      const propDefaultPattern = new RegExp(`${prop.name}\\s*=\\s*([^,}]+)`, 'g');
      const propAliasDefaultPattern = new RegExp(`${prop.name}\\s*:\\s*\\w+\\s*=\\s*([^,}]+)`, 'g');
      const directMatch = propDefaultPattern.exec(params);
      const aliasMatch = propAliasDefaultPattern.exec(params);
      const propMatch = directMatch || aliasMatch;
      if (propMatch) {
        const defaultValue = propMatch[1].trim();
        defaults[prop.name] = defaultValue
          .replace(/^['"]|['"]$/g, '')
          .replace(/^\(|\)$/g, '')
          .trim();
      }
    }
  }

  return defaults;
}

/**
 * Detect composable/slot patterns
 */
function detectSlots(content, componentName) {
  const slots = [];
  
  // Detect sub-component exports
  const subComponentPattern = /export\s+(?:const|function)\s+(\w+)(?:Header|Body|Footer|Title|Description|Content|Trigger|Close)/g;
  let match;
  while ((match = subComponentPattern.exec(content)) !== null) {
    slots.push({
      name: match[1],
      asChild: content.includes(`asChild`) && content.includes(match[1]),
      type: 'sub-component',
    });
  }
  
  // Detect asChild prop
  if (content.includes('asChild') && content.includes('Slot')) {
    slots.push({
      name: 'children',
      asChild: true,
      type: 'children-pattern',
    });
  }
  
  return slots;
}

/**
 * Detect context providers
 */
function detectContext(content) {
  const hasContext = /createContext|useContext|Context\.Provider/.test(content);
  if (!hasContext) return null;
  
  // Try to extract context name
  const contextMatch = content.match(/(\w+)Context\s*=\s*createContext/);
  return {
    name: contextMatch ? contextMatch[1] : 'Unknown',
    hasProvider: content.includes('Provider'),
  };
}

/**
 * Extract hard-coded UI elements
 */
function extractHardCodedElements(content) {
  const elements = [];
  const lines = content.split('\n');
  
  // Pattern 1: Constant arrays
  const arrayPattern = /const\s+([A-Z_][A-Z0-9_]*)\s*=\s*\[[\s\S]{0,1000}?\];/g;
  let match;
  while ((match = arrayPattern.exec(content)) !== null) {
    const arrayName = match[1];
    const arrayContent = match[0];
    const lineNumber = content.substring(0, match.index).split('\n').length;
    
    // Skip test/mock constants
    if (arrayName.includes('TEST') || arrayName.includes('MOCK') || arrayName.includes('STORY')) {
      continue;
    }
    
    // Extract values
    const valueMatch = arrayContent.match(/\[([\s\S]*?)\]/);
    let values = [];
    if (valueMatch) {
      const stringValues = valueMatch[1].match(/['"]([^'"]+)['"]/g);
      if (stringValues) {
        values = stringValues.map(v => v.replace(/['"]/g, '')).slice(0, 10);
      }
    }
    
    // Check if it affects UI
    const affectsUI = new RegExp(`${arrayName}\\s*\\[|${arrayName}\\.map|${arrayName}\\.forEach`).test(content);
    
    elements.push({
      type: 'array',
      name: arrayName,
      value: values,
      line: lineNumber,
      context: getContext(content, match.index, 100),
      affectsUI,
    });
  }
  
  // Pattern 2: Inline string literals in JSX (simplified - look for common patterns)
  const jsxTextPattern = /<[^>]+>['"]([A-Za-z][^'"]{3,})['"]<\/[^>]+>/g;
  while ((match = jsxTextPattern.exec(content)) !== null) {
    const text = match[1];
    // Skip common non-customizable text
    if (['Loading', 'Submit', 'Cancel', 'Close', 'Save', 'Delete', 'Edit'].includes(text)) {
      continue;
    }
    
    const lineNumber = content.substring(0, match.index).split('\n').length;
    elements.push({
      type: 'string-literal',
      value: text,
      line: lineNumber,
      context: getContext(content, match.index, 50),
      affectsUI: true,
    });
  }
  
  return elements;
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
 * Check if hard-coded element has API coverage
 */
function checkAPICoverage(element, props, slots, context) {
  const elementName = element.name || '';
  const normalizedName = elementName.toLowerCase().replace(/_/g, '').replace(/default/g, '');
  
  // Check props
  for (const prop of props) {
    const normalizedProp = prop.name.toLowerCase();
    if (normalizedName.includes(normalizedProp) || normalizedProp.includes(normalizedName)) {
      return { covered: true, via: 'prop', propName: prop.name };
    }
  }
  
  // Check slots
  if (slots.length > 0 && element.type === 'string-literal') {
    return { covered: true, via: 'slot' };
  }
  
  // Check context
  if (context) {
    return { covered: true, via: 'context' };
  }
  
  return { covered: false };
}

/**
 * Categorize gap
 */
function categorizeGap(element) {
  const name = (element.name || '').toLowerCase();
  
  if (name.includes('preset') || name.includes('quickselect') || name.includes('option')) {
    return GAP_TYPES.PRESET_LIST;
  }
  if (name.includes('weekday') || name.includes('month') || name.includes('label') || name.includes('format')) {
    return GAP_TYPES.FORMAT_OPTIONS;
  }
  if (name.includes('color') || element.value?.some(v => typeof v === 'string' && v.startsWith('#'))) {
    return GAP_TYPES.INTERNAL_STATE_UI;
  }
  if (element.type === 'string-literal') {
    return GAP_TYPES.UI_TEXT_LITERALS;
  }
  
  return GAP_TYPES.INTERNAL_STATE_UI;
}

/**
 * Determine priority
 */
function determinePriority(componentName, gapType) {
  if (PRIORITY_MAP[componentName]) {
    return PRIORITY_MAP[componentName];
  }
  if (gapType === GAP_TYPES.FORMAT_OPTIONS) {
    return 'high';
  }
  return 'medium';
}

/**
 * Verify prop usage
 */
function verifyPropUsage(content, props) {
  const used = [];
  const unused = [];
  
  // Extract component function body (after props destructuring)
  const functionMatch = content.match(/(?:const|export\s+const|export\s+function)\s+\w+\s*[=:]\s*(?:React\.FC|React\.Component|forwardRef)?\s*\([^)]*\{([^}]+)\}[^)]*\)\s*=>\s*\{([\s\S]*)\}/);
  const componentBody = functionMatch ? functionMatch[2] : content;
  
  for (const prop of props) {
    // Skip common props that are always used
    if (['children', 'className', 'style', 'ref'].includes(prop.name)) {
      used.push(prop.name);
      continue;
    }
    
    // Check if prop is used in component body
    // Look for propName in various contexts (but not in the interface definition)
    const propNameRegex = new RegExp(`\\b${prop.name}\\b`, 'g');
    
    // Count occurrences
    const allMatches = content.match(propNameRegex) || [];
    
    // If prop appears more than once (definition + usage), it's likely used
    // Also check for common usage patterns
    const usagePatterns = [
      new RegExp(`${prop.name}\\s*[:=]`, 'g'), // In destructuring or assignment
      new RegExp(`\\{${prop.name}\\}`, 'g'), // In JSX {propName}
      new RegExp(`${prop.name}\\s*\\?`, 'g'), // Conditional propName?
      new RegExp(`${prop.name}\\.`, 'g'), // Property access propName.
      new RegExp(`\\(${prop.name}\\)`, 'g'), // Function call (propName)
      new RegExp(`<[^>]+\\s+${prop.name}=`, 'g'), // Passed to component <Comp propName=
    ];
    
    let isUsed = false;
    for (const pattern of usagePatterns) {
      if (pattern.test(componentBody)) {
        isUsed = true;
        break;
      }
    }
    
    // If prop appears multiple times, likely used
    if (allMatches.length > 2) {
      isUsed = true;
    }
    
    if (isUsed) {
      used.push(prop.name);
    } else {
      unused.push(prop.name);
    }
  }
  
  return { used, unused };
}

/**
 * Verify default values match
 */
function verifyDefaults(props, implementationDefaults) {
  const mismatches = [];
  
  for (const prop of props) {
    if (prop.defaultValue && implementationDefaults[prop.name]) {
      const jsdocDefault = prop.defaultValue.replace(/['"]/g, '').trim();
      const implDefault = implementationDefaults[prop.name].replace(/['"]/g, '').trim();
      
      // Simple comparison (could be enhanced)
      // Skip comparison when implementation default is a named constant
      if (/^[A-Z0-9_]+$/.test(implDefault)) {
        continue;
      }
      if (jsdocDefault !== implDefault && !jsdocDefault.includes(implDefault) && !implDefault.includes(jsdocDefault)) {
        mismatches.push({
          prop: prop.name,
          jsdoc: jsdocDefault,
          implementation: implDefault,
        });
      }
    }
  }
  
  return mismatches.length === 0;
}

/**
 * Parse story file for consistency check
 */
function parseStories(storiesFile, componentProps) {
  if (!storiesFile || !fs.existsSync(storiesFile)) {
    return { consistent: true, issues: [] };
  }
  
  const content = fs.readFileSync(storiesFile, 'utf-8');
  const issues = [];
  
  // Extract args from stories (both object and function formats)
  const storyArgs = [];
  
  // Pattern 1: args: { prop: value }
  const argsPattern = /args:\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/g;
  let match;
  while ((match = argsPattern.exec(content)) !== null) {
    const argsContent = match[1];
    // Extract prop: value pairs
    const propMatches = argsContent.matchAll(/(\w+):\s*([^,}]+)/g);
    for (const propMatch of propMatches) {
      storyArgs.push({
        name: propMatch[1],
        value: propMatch[2].trim(),
      });
    }
  }
  
  // Pattern 2: Function component props <Component prop={value} />
  const functionPattern = /export\s+function\s+\w+\(\)\s*\{[\s\S]*?<Component[^>]+>/g;
  const functionMatches = content.matchAll(functionPattern);
  for (const funcMatch of functionMatches) {
    const jsxContent = funcMatch[0];
    const propMatches = jsxContent.matchAll(/(\w+)=\{([^}]+)\}|\1="([^"]+)"/g);
    for (const propMatch of propMatches) {
      storyArgs.push({
        name: propMatch[1],
        value: (propMatch[2] || propMatch[3] || '').trim(),
      });
    }
  }
  
  // Check if story args match component props (basic check)
  const storyPropNames = new Set(storyArgs.map(a => a.name));
  const componentPropNames = new Set(componentProps.map(p => p.name));
  
  // Note: argTypes are optional; do not flag missing argTypes.
  // Note: do not require Default story to include required props because
  // composable APIs and runtime defaults make this check noisy.
  
  return {
    consistent: issues.length === 0,
    issues,
    storyArgs: Array.from(storyPropNames),
  };
}

/**
 * Generate gap with suggested fix
 */
function generateGap(element, componentName, props) {
  const gapType = categorizeGap(element);
  const priority = determinePriority(componentName, gapType);
  
  const arrayName = element.name || 'element';
  const normalizedName = arrayName
    .toLowerCase()
    .replace(/^default_?/, '')
    .replace(/_/g, '');
  
  let propName = normalizedName;
  if (propName.endsWith('s')) {
    propName = propName.slice(0, -1) + 's';
  }
  propName = propName.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
  
  return {
    type: gapType,
    priority,
    hardCodedElement: element,
    suggestedFix: {
      type: 'prop',
      propName: propName,
      example: `${propName}?: ${element.type === 'array' ? 'string[]' : 'string'}`,
    },
  };
}

/**
 * Process a single component
 */
function processComponent(component) {
  try {
    const content = fs.readFileSync(component.mainFile, 'utf-8');
    const componentName = component.name;
    
    // Extract public API
    const props = extractPropsInterface(content, componentName);
    const implementationDefaults = extractImplementationDefaults(content, props, componentName);
    const slots = detectSlots(content, componentName);
    const context = detectContext(content);
    
    // Extract hard-coded elements
    const hardCodedElements = extractHardCodedElements(content);
    
    // Find gaps
    const gaps = [];
    if (component.category !== 'template') {
      for (const element of hardCodedElements) {
        if (!element.affectsUI) continue;

        const coverage = checkAPICoverage(element, props, slots, context);
        if (!coverage.covered) {
          gaps.push(generateGap(element, componentName, props));
        }
      }
    }
    
    // Verification
    const propUsage = verifyPropUsage(content, props);
    const defaultsMatch = verifyDefaults(props, implementationDefaults);
    const storyCheck = component.storiesFile ? parseStories(component.storiesFile, props) : { consistent: true, issues: [] };
    
    // Checklist
    const checklist = {
      propsImplemented: props.length > 0,
      propsUsed: propUsage.unused.length === 0,
      customizationGaps: gaps,
      docStoryConsistent: defaultsMatch && storyCheck.consistent,
    };
    
    return {
      name: componentName,
      category: component.category,
      path: component.path,
      mainFile: component.mainFile,
      storiesFile: component.storiesFile,
      testFile: component.testFile,
      publicAPI: {
        props,
        slots,
        context,
      },
      hardCodedElements,
      gaps,
      verification: {
        propsUsed: propUsage.used,
        propsUnused: propUsage.unused,
        defaultMatches: defaultsMatch,
        storyConsistent: storyCheck.consistent,
        storyIssues: storyCheck.issues,
      },
      checklist,
    };
  } catch (error) {
    console.error(`Error processing ${component.name}:`, error.message);
    return null;
  }
}

/**
 * Generate markdown report
 */
function generateMarkdownReport(inventory) {
  let md = `# Component Inventory Report\n\n`;
  md += `**Generated**: ${inventory.generated}\n\n`;
  md += `## Summary\n\n`;
  md += `- Total components: **${inventory.summary.totalComponents}**\n`;
  md += `- Components with gaps: **${inventory.summary.gaps.total}**\n`;
  md += `- Props unused: **${inventory.summary.verification.propsUnused}**\n`;
  md += `- Default mismatches: **${inventory.summary.verification.defaultMismatches}**\n`;
  md += `- Story inconsistencies: **${inventory.summary.verification.storyInconsistencies}**\n\n`;
  
  md += `### By Category\n\n`;
  for (const [category, count] of Object.entries(inventory.summary.byCategory)) {
    md += `- **${category}**: ${count}\n`;
  }
  
  md += `\n---\n\n## Components\n\n`;
  
  for (const component of inventory.components) {
    md += `### ${component.name} (${component.category})\n\n`;
    md += `**Path**: \`${component.path}\`\n\n`;
    
    md += `#### Public API\n\n`;
    md += `- **Props**: ${component.publicAPI.props.length}`;
    if (component.publicAPI.props.length > 0) {
      const required = component.publicAPI.props.filter(p => p.required).length;
      const optional = component.publicAPI.props.filter(p => !p.required).length;
      md += ` (${required} required, ${optional} optional)`;
    }
    md += `\n`;
    md += `- **Slots**: ${component.publicAPI.slots.length}\n`;
    md += `- **Context**: ${component.publicAPI.context ? 'Yes' : 'No'}\n\n`;
    
    md += `#### Checklist\n\n`;
    md += `- Props implemented: ${component.checklist.propsImplemented ? '✅' : '❌'}\n`;
    md += `- Props used: ${component.checklist.propsUsed ? '✅' : '❌'}`;
    if (component.verification.propsUnused.length > 0) {
      md += ` (Unused: ${component.verification.propsUnused.join(', ')})`;
    }
    md += `\n`;
    md += `- Customization gaps: ${component.checklist.customizationGaps.length === 0 ? '✅' : `❌ (${component.checklist.customizationGaps.length})`}\n`;
    md += `- Doc/story consistent: ${component.checklist.docStoryConsistent ? '✅' : '❌'}\n\n`;
    
    if (component.gaps.length > 0) {
      md += `#### Gaps\n\n`;
      for (const gap of component.gaps) {
        md += `- **${gap.type}** (${gap.priority}): ${gap.hardCodedElement.name || 'unnamed'}\n`;
        md += `  - Suggested fix: \`${gap.suggestedFix.example}\`\n`;
      }
      md += `\n`;
    }
    
    if (component.verification.propsUnused.length > 0) {
      md += `#### Verification Issues\n\n`;
      md += `- Unused props: ${component.verification.propsUnused.join(', ')}\n`;
    }
    
    if (!component.verification.defaultMatches) {
      md += `- Default value mismatches detected\n`;
    }
    
    if (component.verification.storyIssues.length > 0) {
      md += `- Story issues: ${component.verification.storyIssues.join(', ')}\n`;
    }
    
    md += `\n---\n\n`;
  }
  
  return md;
}

/**
 * Generate prioritized backlog
 */
function generateBacklog(inventory) {
  let md = `# Component Fix Backlog\n\n`;
  md += `**Generated**: ${inventory.generated}\n\n`;
  
  // Group gaps by priority
  const byPriority = { high: [], medium: [], low: [] };
  
  for (const component of inventory.components) {
    for (const gap of component.gaps) {
      byPriority[gap.priority].push({
        component: component.name,
        category: component.category,
        path: component.path,
        gap,
      });
    }
  }
  
  for (const [priority, gaps] of Object.entries(byPriority)) {
    if (gaps.length === 0) continue;
    
    md += `## ${priority.toUpperCase()} Priority (${gaps.length} gaps)\n\n`;
    
    // Group by gap type
    const byType = {};
    for (const item of gaps) {
      if (!byType[item.gap.type]) {
        byType[item.gap.type] = [];
      }
      byType[item.gap.type].push(item);
    }
    
    for (const [type, items] of Object.entries(byType)) {
      md += `### ${type} (${items.length})\n\n`;
      
      for (const item of items) {
        md += `- **${item.component}** (${item.category})\n`;
        md += `  - Element: ${item.gap.hardCodedElement.name || 'unnamed'}\n`;
        md += `  - Fix: Add \`${item.gap.suggestedFix.example}\` prop\n`;
        md += `  - File: \`${item.path || 'unknown'}\`\n\n`;
      }
    }
    
    md += `\n`;
  }
  
  return md;
}

/**
 * Main function
 */
function main() {
  console.log('🔍 Discovering components...\n');
  
  const components = discoverComponents();
  console.log(`Found ${components.length} components\n`);
  
  console.log('📊 Processing components...\n');
  
  const inventory = {
    generated: new Date().toISOString(),
    summary: {
      totalComponents: components.length,
      byCategory: {},
      gaps: {
        total: 0,
        byType: {},
        byPriority: {},
      },
      verification: {
        propsUnused: 0,
        defaultMismatches: 0,
        storyInconsistencies: 0,
      },
    },
    components: [],
  };
  
  // Process each component
  for (const component of components) {
    const result = processComponent(component);
    if (result) {
      inventory.components.push(result);
      
      // Update summary
      inventory.summary.byCategory[result.category] = (inventory.summary.byCategory[result.category] || 0) + 1;
      inventory.summary.gaps.total += result.gaps.length;
      
      for (const gap of result.gaps) {
        inventory.summary.gaps.byType[gap.type] = (inventory.summary.gaps.byType[gap.type] || 0) + 1;
        inventory.summary.gaps.byPriority[gap.priority] = (inventory.summary.gaps.byPriority[gap.priority] || 0) + 1;
      }
      
      if (result.verification.propsUnused.length > 0) {
        inventory.summary.verification.propsUnused += result.verification.propsUnused.length;
      }
      if (!result.verification.defaultMatches) {
        inventory.summary.verification.defaultMismatches++;
      }
      if (!result.verification.storyConsistent) {
        inventory.summary.verification.storyInconsistencies++;
      }
    }
  }
  
  // Generate outputs
  console.log('📝 Generating reports...\n');
  
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(inventory, null, 2));
  console.log(`✅ JSON inventory saved to: ${OUTPUT_JSON}`);
  
  const report = generateMarkdownReport(inventory);
  fs.writeFileSync(OUTPUT_REPORT, report);
  console.log(`✅ Markdown report saved to: ${OUTPUT_REPORT}`);
  
  const backlog = generateBacklog(inventory);
  fs.writeFileSync(OUTPUT_BACKLOG, backlog);
  console.log(`✅ Fix backlog saved to: ${OUTPUT_BACKLOG}`);
  
  // Print summary
  console.log('\n' + '='.repeat(80));
  console.log('📊 INVENTORY SUMMARY');
  console.log('='.repeat(80));
  console.log(`\nTotal components: ${inventory.summary.totalComponents}`);
  console.log(`\nBy Category:`);
  for (const [category, count] of Object.entries(inventory.summary.byCategory)) {
    console.log(`  ${category}: ${count}`);
  }
  console.log(`\nGaps:`);
  console.log(`  Total: ${inventory.summary.gaps.total}`);
  console.log(`  By Type:`);
  for (const [type, count] of Object.entries(inventory.summary.gaps.byType)) {
    console.log(`    ${type}: ${count}`);
  }
  console.log(`  By Priority:`);
  for (const [priority, count] of Object.entries(inventory.summary.gaps.byPriority)) {
    console.log(`    ${priority}: ${count}`);
  }
  console.log(`\nVerification:`);
  console.log(`  Unused props: ${inventory.summary.verification.propsUnused}`);
  console.log(`  Default mismatches: ${inventory.summary.verification.defaultMismatches}`);
  console.log(`  Story inconsistencies: ${inventory.summary.verification.storyInconsistencies}`);
  console.log('');
}

main();
