#!/usr/bin/env node

/**
 * Token Reference Generator
 * 
 * Parses src/styles/globals.css to extract all CSS custom properties
 * and generates a comprehensive DESIGN_TOKENS_REFERENCE.md file.
 */

const fs = require('fs');
const path = require('path');

const CSS_FILE = path.join(__dirname, '../src/styles/globals.css');
const OUTPUT_FILE = path.join(__dirname, '../docs/DESIGN_TOKENS_REFERENCE.md');

// Critical tokens to check for runtime validation
const CRITICAL_TOKENS = [
  '--primary',
  '--secondary',
  '--spacing-x4',
  '--radius-md',
  '--font-family-primary',
];

function parseCSSFile() {
  const cssContent = fs.readFileSync(CSS_FILE, 'utf-8');
  
  const tokens = {
    colors: {
      base: {},
      semantic: {},
      status: {},
      component: {},
    },
    spacing: {},
    typography: {},
    shadows: {},
    transitions: {},
    radius: {},
    breakpoints: {},
    grid: {},
    component: {},
    overlay: {},
  };

  // Extract tokens from :root
  const rootMatch = cssContent.match(/:root\s*\{([^}]+)\}/s);
  if (!rootMatch) {
    throw new Error('Could not find :root block in CSS file');
  }

  const rootContent = rootMatch[1];
  
  // Parse all CSS variables
  const varRegex = /--([^:]+):\s*([^;]+);/g;
  let match;
  
  while ((match = varRegex.exec(rootContent)) !== null) {
    const [, name, value] = match;
    const cleanValue = value.trim();
    
    // Categorize tokens
    if (name.startsWith('primary-') || name.startsWith('secondary-') || 
        name.startsWith('tertiary-') || name.startsWith('neutral-') ||
        name.startsWith('positive-') || name.startsWith('warning-') ||
        name.startsWith('danger-')) {
      // Base color scales
      const scale = name.split('-')[0];
      if (!tokens.colors.base[scale]) {
        tokens.colors.base[scale] = {};
      }
      tokens.colors.base[scale][name] = cleanValue;
    } else if (name === 'primary' || name === 'secondary' || name === 'tertiary' ||
               name.startsWith('border-') || name.startsWith('bg-')) {
      // Semantic colors
      tokens.colors.semantic[name] = cleanValue;
    } else if (name.startsWith('critical') || name.startsWith('warning') ||
               name.startsWith('positive') || name.startsWith('neutral')) {
      // Status colors
      tokens.colors.status[name] = cleanValue;
    } else if (name.startsWith('button-') || name.startsWith('badge-')) {
      // Component-specific colors
      if (!tokens.colors.component[name.split('-')[0]]) {
        tokens.colors.component[name.split('-')[0]] = {};
      }
      tokens.colors.component[name.split('-')[0]][name] = cleanValue;
    } else if (name.startsWith('spacing-') || (name.startsWith('x') && /^\d+$/.test(name.substring(1)))) {
      // Spacing tokens
      tokens.spacing[name] = cleanValue;
    } else if (name.startsWith('font-')) {
      // Typography tokens
      tokens.typography[name] = cleanValue;
    } else if (name.startsWith('shadow-')) {
      // Shadow tokens
      tokens.shadows[name] = cleanValue;
    } else if (name.startsWith('transition-')) {
      // Transition tokens
      tokens.transitions[name] = cleanValue;
    } else if (name.startsWith('radius-')) {
      // Border radius tokens
      tokens.radius[name] = cleanValue;
    } else if (name.startsWith('breakpoint-')) {
      // Breakpoint tokens
      tokens.breakpoints[name] = cleanValue;
    } else if (name.startsWith('grid-')) {
      // Grid tokens
      tokens.grid[name] = cleanValue;
    } else if (name.startsWith('component-')) {
      // Component system tokens
      tokens.component[name] = cleanValue;
    } else if (name.startsWith('overlay-')) {
      // Overlay tokens
      tokens.overlay[name] = cleanValue;
    } else if (name.startsWith('surface') || name.startsWith('input') ||
               name.startsWith('placeholder') || name.startsWith('helper') ||
               name.startsWith('border') || name.startsWith('focus')) {
      // Form system tokens
      if (!tokens.colors.component.form) {
        tokens.colors.component.form = {};
      }
      tokens.colors.component.form[name] = cleanValue;
    }
  }

  return tokens;
}

function generateMarkdown(tokens) {
  let md = `# FT Design System - Complete Token Reference

> **Auto-generated from** \`src/styles/globals.css\`  
> **Last updated:** ${new Date().toISOString().split('T')[0]}  
> **Total tokens:** ${Object.keys(tokens).reduce((sum, cat) => {
    const catTokens = tokens[cat];
    return sum + (typeof catTokens === 'object' ? Object.keys(catTokens).length : 0);
  }, 0)}

This document provides a comprehensive reference for all design tokens available in the FT Design System. All tokens are CSS custom properties that can be used in your stylesheets or accessed via JavaScript.

## Table of Contents

- [Colors](#colors)
  - [Base Color Scales](#base-color-scales)
  - [Semantic Colors](#semantic-colors)
  - [Status Colors](#status-colors)
  - [Component Colors](#component-colors)
- [Spacing](#spacing)
- [Typography](#typography)
- [Shadows](#shadows)
- [Transitions](#transitions)
- [Border Radius](#border-radius)
- [Breakpoints](#breakpoints)
- [Grid System](#grid-system)
- [Component System](#component-system)
- [Overlays](#overlays)
- [Usage Examples](#usage-examples)

---

## Colors

### Base Color Scales

FT Design System uses a hierarchical color system with base scales that support light, dark, and night modes.

`;

  // Base color scales
  Object.keys(tokens.colors.base).forEach(scale => {
    md += `#### ${scale.charAt(0).toUpperCase() + scale.slice(1)} Scale\n\n`;
    md += `| Token | Value | Description |\n`;
    md += `|-------|-------|------------|\n`;
    
    const scaleTokens = tokens.colors.base[scale];
    const sortedKeys = Object.keys(scaleTokens).sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)?.[0] || '0');
      const numB = parseInt(b.match(/\d+/)?.[0] || '0');
      return numB - numA; // Descending order (900 to 100)
    });
    
    sortedKeys.forEach(key => {
      const value = scaleTokens[key];
      const shade = key.match(/\d+/)?.[0] || '';
      const description = shade === '900' ? 'Darkest' : 
                         shade === '100' ? 'Lightest' :
                         shade === '700' ? 'Main brand color' : '';
      md += `| \`--${key}\` | \`${value}\` | ${description} |\n`;
    });
    md += '\n';
  });

  md += `### Semantic Colors\n\n`;
  md += `Semantic colors reference base color scales and adapt to theme (light/dark/night).\n\n`;
  md += `| Token | Value | Description |\n`;
  md += `|-------|-------|------------|\n`;
  
  Object.keys(tokens.colors.semantic).sort().forEach(key => {
    const value = tokens.colors.semantic[key];
    let description = '';
    if (key === 'primary') description = 'Main brand color (references --primary-700)';
    else if (key === 'secondary') description = 'Secondary text color';
    else if (key === 'tertiary') description = 'Muted/placeholder text';
    else if (key.startsWith('border-')) description = 'Border color';
    else if (key.startsWith('bg-')) description = 'Background color';
    
    md += `| \`--${key}\` | \`${value}\` | ${description} |\n`;
  });
  md += '\n';

  md += `### Status Colors\n\n`;
  md += `Status colors for alerts, badges, and feedback states.\n\n`;
  md += `| Token | Value | Description |\n`;
  md += `|-------|-------|------------|\n`;
  
  Object.keys(tokens.colors.status).sort().forEach(key => {
    const value = tokens.colors.status[key];
    let description = '';
    if (key.includes('critical')) description = 'Error/danger state';
    else if (key.includes('warning')) description = 'Warning state';
    else if (key.includes('positive')) description = 'Success state';
    else if (key.includes('neutral')) description = 'Info state';
    if (key.includes('-dark')) description += ' (darker variant)';
    else if (key.includes('-light')) description += ' (lighter variant)';
    
    md += `| \`--${key}\` | \`${value}\` | ${description} |\n`;
  });
  md += '\n';

  // Component colors
  md += `### Component Colors\n\n`;
  Object.keys(tokens.colors.component).forEach(component => {
    md += `#### ${component.charAt(0).toUpperCase() + component.slice(1)} Component\n\n`;
    md += `| Token | Value | Description |\n`;
    md += `|-------|-------|------------|\n`;
    
    const compTokens = tokens.colors.component[component];
    Object.keys(compTokens).sort().forEach(key => {
      const value = compTokens[key];
      md += `| \`--${key}\` | \`${value}\` | ${key.split('-').slice(1).join(' ')} |\n`;
    });
    md += '\n';
  });

  // Spacing
  md += `## Spacing\n\n`;
  md += `FT Design System uses an 8-point grid system (4px base unit). All spacing tokens follow the \`--spacing-x{N}\` pattern.\n\n`;
  md += `| Token | Value | Pixels | Use Case |\n`;
  md += `|-------|-------|--------|----------|\n`;
  
  const spacingKeys = Object.keys(tokens.spacing).sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)?.[0] || '0');
    const numB = parseInt(b.match(/\d+/)?.[0] || '0');
    return numA - numB;
  });
  
  spacingKeys.forEach(key => {
    const value = tokens.spacing[key];
    const num = parseInt(key.match(/\d+/)?.[0] || '0');
    const pixels = num * 4;
    let useCase = '';
    if (num === 0) useCase = 'No spacing';
    else if (num <= 2) useCase = 'Tight spacing';
    else if (num <= 4) useCase = 'Default spacing';
    else if (num <= 8) useCase = 'Loose spacing';
    else useCase = 'Extra large spacing';
    
    md += `| \`--${key}\` | \`${value}\` | ${pixels}px | ${useCase} |\n`;
  });
  md += '\n';

  // Typography
  md += `## Typography\n\n`;
  md += `| Token | Value | Description |\n`;
  md += `|-------|-------|------------|\n`;
  
  Object.keys(tokens.typography).sort().forEach(key => {
    const value = tokens.typography[key];
    let description = '';
    if (key.includes('font-family')) description = 'Primary font family';
    else if (key.includes('font-weight')) description = 'Font weight';
    else if (key.includes('font-size')) {
      const size = key.includes('rem') ? 'Responsive font size' : 'Fixed font size';
      description = size;
    }
    
    md += `| \`--${key}\` | \`${value}\` | ${description} |\n`;
  });
  md += '\n';

  // Shadows
  md += `## Shadows\n\n`;
  md += `| Token | Value | Use Case |\n`;
  md += `|-------|-------|----------|\n`;
  
  Object.keys(tokens.shadows).sort().forEach(key => {
    const value = tokens.shadows[key];
    const size = key.split('-')[1];
    md += `| \`--${key}\` | \`${value}\` | ${size === 'sm' ? 'Subtle elevation' : size === 'md' ? 'Default elevation' : size === 'lg' ? 'Prominent elevation' : 'Extra prominent'} |\n`;
  });
  md += '\n';

  // Transitions
  md += `## Transitions\n\n`;
  md += `| Token | Value | Use Case |\n`;
  md += `|-------|-------|----------|\n`;
  
  Object.keys(tokens.transitions).sort().forEach(key => {
    const value = tokens.transitions[key];
    const speed = key.split('-')[1];
    md += `| \`--${key}\` | \`${value}\` | ${speed === 'fast' ? 'Quick interactions' : speed === 'normal' ? 'Default transitions' : 'Smooth animations'} |\n`;
  });
  md += '\n';

  // Radius
  md += `## Border Radius\n\n`;
  md += `| Token | Value | Use Case |\n`;
  md += `|-------|-------|----------|\n`;
  
  Object.keys(tokens.radius).sort().forEach(key => {
    const value = tokens.radius[key];
    const size = key.split('-')[1];
    let useCase = '';
    if (size === 'none') useCase = 'Sharp corners';
    else if (size === 'sm') useCase = 'Small components';
    else if (size === 'md') useCase = 'Default components';
    else if (size === 'lg') useCase = 'Large components';
    else if (size === 'full') useCase = 'Pills/circles';
    
    md += `| \`--${key}\` | \`${value}\` | ${useCase} |\n`;
  });
  md += '\n';

  // Breakpoints
  md += `## Breakpoints\n\n`;
  md += `| Token | Value | Device |\n`;
  md += `|-------|-------|--------|\n`;
  
  Object.keys(tokens.breakpoints).sort().forEach(key => {
    const value = tokens.breakpoints[key];
    const size = key.split('-')[1];
    let device = '';
    if (size === 'xs') device = 'Mobile';
    else if (size === 'sm') device = 'Large mobile';
    else if (size === 'md') device = 'Tablet';
    else if (size === 'lg') device = 'Laptop';
    else if (size === 'xl') device = 'Desktop';
    else if (size === 'xxl') device = 'Ultra-wide';
    
    md += `| \`--${key}\` | \`${value}\` | ${device} |\n`;
  });
  md += '\n';

  // Grid
  md += `## Grid System\n\n`;
  md += `| Token | Value | Description |\n`;
  md += `|-------|-------|------------|\n`;
  
  Object.keys(tokens.grid).sort().forEach(key => {
    const value = tokens.grid[key];
    let description = key.replace('grid-', '').replace(/-/g, ' ');
    md += `| \`--${key}\` | \`${value}\` | ${description} |\n`;
  });
  md += '\n';

  // Component system
  md += `## Component System\n\n`;
  md += `Component-level tokens for consistent sizing and styling.\n\n`;
  md += `| Token | Value | Description |\n`;
  md += `|-------|-------|------------|\n`;
  
  Object.keys(tokens.component).sort().forEach(key => {
    const value = tokens.component[key];
    let description = key.replace('component-', '').replace(/-/g, ' ');
    md += `| \`--${key}\` | \`${value}\` | ${description} |\n`;
  });
  md += '\n';

  // Overlays
  md += `## Overlays\n\n`;
  md += `| Token | Value | Use Case |\n`;
  md += `|-------|-------|----------|\n`;
  
  Object.keys(tokens.overlay).sort().forEach(key => {
    const value = tokens.overlay[key];
    const type = key.split('-')[1];
    let useCase = '';
    if (type === 'strong') useCase = 'Modal backdrops';
    else if (type === 'medium') useCase = 'Dropdown overlays';
    else if (type === 'light') useCase = 'Subtle overlays';
    else if (type === 'control') useCase = 'Control backgrounds';
    
    md += `| \`--${key}\` | \`${value}\` | ${useCase} |\n`;
  });
  md += '\n';

  // Usage examples
  md += `## Usage Examples\n\n`;
  md += `### CSS Usage\n\n`;
  md += `\`\`\`css\n`;
  md += `.my-component {\n`;
  md += `  color: var(--primary);\n`;
  md += `  background-color: var(--bg-primary);\n`;
  md += `  padding: var(--spacing-x4);\n`;
  md += `  border-radius: var(--radius-md);\n`;
  md += `  box-shadow: var(--shadow-md);\n`;
  md += `}\n`;
  md += `\`\`\`\n\n`;

  md += `### JavaScript Usage\n\n`;
  md += `\`\`\`typescript\n`;
  md += `const primaryColor = getComputedStyle(document.documentElement)\n`;
  md += `  .getPropertyValue('--primary');\n`;
  md += `\`\`\`\n\n`;

  md += `### React Usage\n\n`;
  md += `\`\`\`tsx\n`;
  md += `const MyComponent = () => {\n`;
  md += `  return (\n`;
  md += `    <div style={{ color: 'var(--primary)' }}>\n`;
  md += `      Content\n`;
  md += `    </div>\n`;
  md += `  );\n`;
  md += `};\n`;
  md += `\`\`\`\n\n`;

  md += `## Critical Tokens for Validation\n\n`;
  md += `These tokens are checked during runtime validation to ensure CSS is loaded:\n\n`;
  md += `- \`--primary\`\n`;
  md += `- \`--secondary\`\n`;
  md += `- \`--spacing-x4\`\n`;
  md += `- \`--radius-md\`\n`;
  md += `- \`--font-family-primary\`\n\n`;

  md += `---\n\n`;
  md += `*This document is auto-generated. Do not edit manually.*\n`;

  return md;
}

// Main execution
try {
  console.log('📖 Parsing CSS file...');
  const tokens = parseCSSFile();
  
  console.log('📝 Generating markdown...');
  const markdown = generateMarkdown(tokens);
  
  console.log('💾 Writing to file...');
  fs.writeFileSync(OUTPUT_FILE, markdown, 'utf-8');
  
  console.log(`✅ Token reference generated: ${OUTPUT_FILE}`);
  console.log(`   Total tokens documented: ${Object.keys(tokens).reduce((sum, cat) => {
    const catTokens = tokens[cat];
    return sum + (typeof catTokens === 'object' ? Object.keys(catTokens).length : 0);
  }, 0)}`);
} catch (error) {
  console.error('❌ Error generating token reference:', error);
  process.exit(1);
}

