#!/usr/bin/env node

/**
 * FT Design System Registry Generator
 * 
 * Generates a machine-readable registry of all components for:
 * - AI tools to discover and use components
 * - CLI to add individual components
 * - Documentation auto-generation
 */

const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const componentsDir = path.join(projectRoot, 'src/components');
const outputPath = path.join(projectRoot, 'registry.json');

// Component categories with their paths
const categories = {
  atoms: path.join(componentsDir, 'atoms'),
  molecules: path.join(componentsDir, 'molecules'),
  organisms: path.join(componentsDir, 'organisms'),
  charts: path.join(componentsDir, 'charts'),
  templates: path.join(componentsDir, 'templates'),
};

// Components that require specific peer dependencies
const peerDependencies = {
  DatePicker: ['date-fns'],
  Calendar: ['date-fns'],
  TimePicker: ['date-fns'],
  Select: ['@radix-ui/react-select'],
  Checkbox: ['@radix-ui/react-checkbox'],
  Switch: ['@radix-ui/react-switch'],
  RadioGroup: ['@radix-ui/react-radio-group'],
  Dropdown: ['@radix-ui/react-dropdown-menu'],
  DropdownMenu: ['@radix-ui/react-dropdown-menu'],
  Tooltip: ['@radix-ui/react-tooltip'],
  Modal: ['@radix-ui/react-dialog'],
  Drawer: ['@radix-ui/react-dialog'],
  Popconfirm: ['@radix-ui/react-popover'],
  HoverCard: ['@radix-ui/react-hover-card'],
  // Chart components
  AreaChart: ['chart.js', 'react-chartjs-2'],
  BarChart: ['chart.js', 'react-chartjs-2'],
  LineChart: ['chart.js', 'react-chartjs-2'],
  PieChart: ['chart.js', 'react-chartjs-2'],
  DoughnutChart: ['chart.js', 'react-chartjs-2'],
  RadarChart: ['chart.js', 'react-chartjs-2'],
  ScatterChart: ['chart.js', 'react-chartjs-2'],
  BubbleChart: ['chart.js', 'react-chartjs-2'],
  PolarAreaChart: ['chart.js', 'react-chartjs-2'],
  RadialChart: ['chart.js', 'react-chartjs-2'],
  GaugeChart: ['chart.js', 'react-chartjs-2'],
  WaterfallChart: ['chart.js', 'react-chartjs-2'],
  StackedBarChart: ['chart.js', 'react-chartjs-2'],
  HorizontalBarChart: ['chart.js', 'react-chartjs-2'],
  DualAxesChart: ['chart.js', 'react-chartjs-2'],
  BulletChart: ['chart.js', 'react-chartjs-2'],
};

// Internal dependencies (components that depend on other components)
const internalDependencies = {
  AppHeader: ['Button', 'Icon', 'UserProfile', 'Logo'],
  UserProfileDropdown: ['UserProfile', 'Dropdown', 'Button', 'Icon'],
  Table: ['Checkbox', 'Icon', 'Pagination'],
  DataEntryTable: ['Input', 'Checkbox', 'Dropdown', 'Icon'],
  Form: ['Input', 'Checkbox', 'RadioGroup', 'Select', 'Switch', 'Textarea'],
  PageHeader: ['Button', 'Icon', 'Breadcrumb', 'Tabs'],
  Modal: ['Button', 'Icon'],
  Drawer: ['Button', 'Icon'],
  Alert: ['Button', 'Icon'],
  Notification: ['Button', 'Icon'],
  Upload: ['Button', 'Icon', 'ProgressBar'],
  UploadZone: ['Icon', 'Button'],
  FileCard: ['Icon', 'Badge', 'Button'],
  Steps: ['Icon'],
  Pagination: ['Button', 'Icon', 'Select'],
  DatePicker: ['Button', 'Icon', 'Input'],
  TimePicker: ['Input', 'Icon'],
  Cascader: ['Input', 'Icon'],
  TreeSelect: ['Input', 'Icon', 'Checkbox'],
  Transfer: ['Checkbox', 'Button', 'Input'],
  ColorPicker: ['Input', 'Button'],
  InputNumber: ['Input', 'Button', 'Icon'],
  Rate: ['Icon'],
  Slider: ['Input'],
  Tooltip: ['Icon'],
  Popconfirm: ['Button', 'Icon'],
  Card: ['Button', 'Icon'],
  Collapsible: ['Icon'],
  Tabs: ['Icon'],
  List: ['Icon'],
  Descriptions: ['Icon'],
  Result: ['Button', 'Icon'],
  Empty: ['Icon'],
  Spin: ['Icon'],
  Skeleton: [],
  Avatar: ['Icon'],
  Badge: ['Icon'],
  Button: ['Icon', 'Spin'],
  Input: ['Icon'],
  Textarea: ['Icon'],
  Checkbox: ['Icon'],
  RadioGroup: ['Icon'],
  Select: ['Icon'],
  Switch: [],
  Toggle: [],
  Divider: [],
  Spacer: [],
  Typography: [],
  Text: [],
  SubText: [],
  Statistic: ['Icon'],
  Icon: [],
  Logo: [],
};

/**
 * Scan a directory for components
 */
function scanComponentDirectory(dirPath, category) {
  const components = [];
  
  if (!fs.existsSync(dirPath)) {
    return components;
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const componentDir = path.join(dirPath, entry.name);
      const indexFile = path.join(componentDir, 'index.ts');
      const mainFile = path.join(componentDir, `${entry.name}.tsx`);
      
      // Check if it's a valid component directory
      if (fs.existsSync(indexFile) || fs.existsSync(mainFile)) {
        const componentName = entry.name;
        
        // Get all files in the component directory
        const files = getComponentFiles(componentDir, entry.name);
        
        // Detect sub-components
        const subComponents = detectSubComponents(componentDir, componentName);
        
        // Get component description from JSDoc if available
        const description = extractDescription(mainFile, componentName);
        
        components.push({
          name: componentName,
          category,
          path: `src/components/${category}/${componentName}`,
          files,
          subComponents,
          description,
          dependencies: {
            internal: internalDependencies[componentName] || [],
            peer: peerDependencies[componentName] || [],
          },
        });
      }
    } else if (entry.name.endsWith('.tsx') && !entry.name.includes('.stories.') && !entry.name.includes('.test.')) {
      // Handle chart components which are direct files
      if (category === 'charts') {
        const componentName = entry.name.replace('.tsx', '');
        if (componentName !== 'BaseChart' && componentName !== 'chartConfig') {
          components.push({
            name: componentName,
            category,
            path: `src/components/${category}`,
            files: [entry.name],
            subComponents: [],
            description: `Chart component for data visualization`,
            dependencies: {
              internal: [],
              peer: peerDependencies[componentName] || ['chart.js', 'react-chartjs-2'],
            },
          });
        }
      }
    }
  }
  
  return components;
}

/**
 * Get all files for a component
 */
function getComponentFiles(componentDir, componentName) {
  const files = [];
  
  function scanDir(dir, relativePath = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relPath = relativePath ? `${relativePath}/${entry.name}` : entry.name;
      
      if (entry.isDirectory()) {
        // Skip assets directories for now
        if (entry.name !== 'assets' && entry.name !== '__tests__') {
          scanDir(fullPath, relPath);
        }
      } else if (
        entry.name.endsWith('.tsx') || 
        entry.name.endsWith('.ts')
      ) {
        // Skip test and story files
        if (!entry.name.includes('.test.') && 
            !entry.name.includes('.spec.') && 
            !entry.name.includes('.stories.') &&
            !entry.name.includes('.figma.')) {
          files.push(relPath);
        }
      }
    }
  }
  
  scanDir(componentDir);
  return files;
}

/**
 * Detect sub-components in a component directory
 */
function detectSubComponents(componentDir, componentName) {
  const subComponents = [];
  
  try {
    const entries = fs.readdirSync(componentDir);
    
    for (const entry of entries) {
      if (entry.endsWith('.tsx') && 
          !entry.includes('.stories.') && 
          !entry.includes('.test.') &&
          !entry.includes('.figma.') &&
          entry !== `${componentName}.tsx` &&
          entry !== 'index.ts') {
        const subName = entry.replace('.tsx', '');
        // Only include if it starts with the component name or is a context
        if (subName.startsWith(componentName) || subName.includes('Context')) {
          subComponents.push(subName);
        }
      }
    }
  } catch (e) {
    // Ignore errors
  }
  
  return subComponents;
}

/**
 * Extract description from JSDoc comment
 */
function extractDescription(filePath, componentName) {
  try {
    if (!fs.existsSync(filePath)) {
      return `${componentName} component from FT Design System`;
    }
    
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Look for JSDoc @description or first line after /**
    const jsdocMatch = content.match(/\/\*\*[\s\S]*?\*\//);
    if (jsdocMatch) {
      const jsdoc = jsdocMatch[0];
      // Extract description - first meaningful line after /**
      const lines = jsdoc.split('\n');
      for (const line of lines) {
        const cleaned = line.replace(/^\s*\*\s*/, '').trim();
        if (cleaned && 
            !cleaned.startsWith('@') && 
            !cleaned.startsWith('/**') && 
            !cleaned.startsWith('*/') &&
            cleaned.length > 10) {
          return cleaned;
        }
      }
    }
    
    return `${componentName} component from FT Design System`;
  } catch (e) {
    return `${componentName} component from FT Design System`;
  }
}

/**
 * Generate the registry
 */
function generateRegistry() {
  console.log('🔍 Scanning components...');
  
  const allComponents = [];
  
  for (const [category, dirPath] of Object.entries(categories)) {
    console.log(`  📁 Scanning ${category}...`);
    const components = scanComponentDirectory(dirPath, category);
    allComponents.push(...components);
    console.log(`     Found ${components.length} components`);
  }
  
  // Sort components alphabetically
  allComponents.sort((a, b) => a.name.localeCompare(b.name));
  
  // Read package.json for version
  const packageJson = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf-8'));
  
  const registry = {
    $schema: 'https://ft-design-system.dev/registry-schema.json',
    name: 'ft-design-system',
    version: packageJson.version,
    description: packageJson.description,
    repository: packageJson.repository?.url || 'https://github.com/chetanft/components',
    license: packageJson.license,
    generatedAt: new Date().toISOString(),
    
    // Core dependencies required by all components
    coreDependencies: {
      peer: ['react', 'react-dom'],
      required: ['clsx', 'tailwind-merge', 'class-variance-authority'],
      optional: ['lucide-react'],
    },
    
    // CSS and Tailwind requirements
    styling: {
      cssImport: 'ft-design-system/styles.css',
      tailwindContentPath: './node_modules/ft-design-system/dist/**/*.{js,jsx}',
      tailwindPreset: 'ft-design-system/tailwind-preset',
    },
    
    // Import paths
    imports: {
      default: 'ft-design-system',
      core: 'ft-design-system/core',
      styles: 'ft-design-system/styles.css',
    },
    
    // Component count summary
    summary: {
      total: allComponents.length,
      atoms: allComponents.filter(c => c.category === 'atoms').length,
      molecules: allComponents.filter(c => c.category === 'molecules').length,
      organisms: allComponents.filter(c => c.category === 'organisms').length,
      charts: allComponents.filter(c => c.category === 'charts').length,
      templates: allComponents.filter(c => c.category === 'templates').length,
    },
    
    // All components
    components: allComponents,
    
    // Quick lookup map
    componentIndex: allComponents.reduce((acc, comp) => {
      acc[comp.name.toLowerCase()] = comp.name;
      return acc;
    }, {}),
  };
  
  // Write registry
  fs.writeFileSync(outputPath, JSON.stringify(registry, null, 2));
  console.log(`\n✅ Registry generated: ${outputPath}`);
  console.log(`   Total components: ${allComponents.length}`);
  
  // Also write a minimal version for AI context
  const minimalRegistry = {
    name: 'ft-design-system',
    version: packageJson.version,
    import: 'ft-design-system',
    cssImport: 'ft-design-system/styles.css',
    components: allComponents.map(c => ({
      name: c.name,
      category: c.category,
      description: c.description,
      subComponents: c.subComponents,
    })),
  };
  
  const minimalPath = path.join(projectRoot, 'registry.min.json');
  fs.writeFileSync(minimalPath, JSON.stringify(minimalRegistry, null, 2));
  console.log(`   Minimal registry: ${minimalPath}`);
  
  return registry;
}

// Run if called directly
if (require.main === module) {
  generateRegistry();
}

module.exports = { generateRegistry };
