#!/usr/bin/env node

/**
 * Script to find all hardcoded design token values in FT Design System components
 * that should be using design tokens instead
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Design tokens from design-tokens.ts
const DESIGN_TOKENS = {
  colors: {
    // Primary colors
    '#434f64': 'primary700 / primary',
    '#5f697b': 'primary500 / secondary',
    '#838c9d': 'primary300 / tertiary',
    '#ced1d7': 'secondary300 / border.primary',
    '#f0f1f7': 'secondary100 / border.secondary',
    '#ffffff': 'tertiary0 / bg.primary / white',
    '#f8f8f9': 'tertiary100 / bg.secondary',
    
    // Status colors
    '#ff3533': 'danger500 / critical.default',
    '#ff3532': 'danger500 / critical.default',
    '#b80100': 'danger700 / critical.dark',
    '#ffeaea': 'danger100 / critical.light',
    '#ff6c19': 'warning500 / warning.default',
    '#dd6a00': 'warning700 / warning.dark',
    '#ffebdc': 'warning100 / warning.light',
    '#00c638': 'positive500 / positive.default',
    '#00c637': 'positive500 / positive.default',
    '#00763d': 'positive700 / positive.dark',
    '#dfffe8': 'positive100 / positive.light',
    '#1890ff': 'neutral500 / neutral.default',
    '#006ed3': 'neutral700 / neutral.dark',
    '#ecf6ff': 'neutral100 / neutral.light',
    
    // Additional common colors
    '#000000': 'black',
    '#121314': 'tertiary900 / black',
    '#1a2330': 'primary900',
    '#2c3547': 'primary800',
    '#49556a': 'primary600',
    '#6c7689': 'primary400',
    '#9aa3b2': 'primary200',
    '#c5cad3': 'primary100',
  },
  
  spacing: {
    '0px': 'x0',
    '4px': 'x1',
    '8px': 'x2',
    '12px': 'x3',
    '16px': 'x4',
    '20px': 'x5',
    '24px': 'x6',
    '28px': 'x7',
    '32px': 'x8',
    '36px': 'x9',
    '40px': 'x10',
    '44px': 'x11',
    '48px': 'x12',
    '52px': 'x13',
    '56px': 'x14',
    '60px': 'x15',
    '64px': 'x16',
    '80px': 'x20',
    '96px': 'x24',
  },
  
  borderRadius: {
    '0px': 'none',
    '4px': 'sm',
    '8px': 'md',
    '12px': 'lg',
    '16px': 'xl',
    '9999px': 'full',
    '50%': 'circle',
  },
  
  fontSize: {
    '12px': 'tablet.sm',
    '14px': 'desktop.sm / tablet.md',
    '16px': 'desktop.md',
    '18px': 'tablet.lg',
    '20px': 'desktop.lg',
    '21px': 'tablet.xl',
    '24px': 'desktop.xl',
    '26px': 'tablet.xxl',
    '28px': 'desktop.xxl',
  },
  
  lineHeight: {
    '1.2': 'tight',
    '1.4': 'normal',
    '1.6': 'relaxed',
  },
};

// Normalize hex color (handle 3-digit and 6-digit)
function normalizeHex(hex) {
  if (!hex) return null;
  hex = hex.toLowerCase();
  if (hex.length === 4 && hex.startsWith('#')) {
    // Convert #rgb to #rrggbb
    return '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }
  return hex;
}

// Extract hex colors from text
function extractHexColors(text) {
  const hexPattern = /#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/g;
  const matches = [];
  let match;
  while ((match = hexPattern.exec(text)) !== null) {
    const normalized = normalizeHex(match[0]);
    if (normalized) {
      matches.push({
        original: match[0],
        normalized,
        index: match.index,
        line: text.substring(0, match.index).split('\n').length,
      });
    }
  }
  return matches;
}

// Extract rgba colors
function extractRgbaColors(text) {
  const rgbaPattern = /rgba?\([^)]+\)/g;
  const matches = [];
  let match;
  while ((match = rgbaPattern.exec(text)) !== null) {
    matches.push({
      value: match[0],
      index: match.index,
      line: text.substring(0, match.index).split('\n').length,
    });
  }
  return matches;
}

// Extract px values (spacing, font sizes, etc.)
function extractPxValues(text) {
  const pxPattern = /\b(\d+(?:\.\d+)?)px\b/g;
  const matches = [];
  let match;
  while ((match = pxPattern.exec(text)) !== null) {
    const value = match[1];
    matches.push({
      value: `${value}px`,
      numeric: parseFloat(value),
      index: match.index,
      line: text.substring(0, match.index).split('\n').length,
      context: getContext(text, match.index, 50),
    });
  }
  return matches;
}

// Get context around a match
function getContext(text, index, chars = 50) {
  const start = Math.max(0, index - chars);
  const end = Math.min(text.length, index + chars);
  return text.substring(start, end).replace(/\n/g, ' ').trim();
}

// Check if a value matches a design token
function matchesToken(value, category) {
  const tokens = DESIGN_TOKENS[category];
  if (!tokens) return null;
  
  // Direct match
  if (tokens[value]) {
    return tokens[value];
  }
  
  // For colors, check normalized version
  if (category === 'colors') {
    const normalized = normalizeHex(value);
    if (normalized && tokens[normalized]) {
      return tokens[normalized];
    }
  }
  
  return null;
}

// Analyze a file
function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const relativePath = path.relative(process.cwd(), filePath);
  
  // Skip if it's a test file, story file, or non-component file
  if (
    relativePath.includes('.test.') ||
    relativePath.includes('.stories.') ||
    relativePath.includes('node_modules') ||
    relativePath.includes('dist') ||
    relativePath.includes('.md')
  ) {
    return null;
  }
  
  const issues = {
    file: relativePath,
    hexColors: [],
    rgbaColors: [],
    pxValues: [],
  };
  
  // Extract hex colors
  const hexColors = extractHexColors(content);
  hexColors.forEach(({ original, normalized, line }) => {
    const tokenMatch = matchesToken(normalized, 'colors');
    if (tokenMatch) {
      issues.hexColors.push({
        value: original,
        normalized,
        line,
        token: tokenMatch,
        shouldUse: `var(--color-${tokenMatch.split(' / ')[0].toLowerCase().replace(/\d+/g, '')})` || `designTokens.colors.${tokenMatch.split(' / ')[0]}`,
      });
    }
  });
  
  // Extract rgba colors (all should potentially use tokens)
  const rgbaColors = extractRgbaColors(content);
  rgbaColors.forEach(({ value, line }) => {
    issues.rgbaColors.push({
      value,
      line,
      note: 'Consider using design token with opacity',
    });
  });
  
  // Extract px values
  const pxValues = extractPxValues(content);
  pxValues.forEach(({ value, numeric, line, context }) => {
    // Check spacing
    const spacingMatch = matchesToken(value, 'spacing');
    if (spacingMatch) {
      issues.pxValues.push({
        value,
        line,
        category: 'spacing',
        token: spacingMatch,
        shouldUse: `var(--spacing-${spacingMatch})`,
        context,
      });
    }
    // Check border radius
    else if (matchesToken(value, 'borderRadius')) {
      const borderRadiusMatch = matchesToken(value, 'borderRadius');
      issues.pxValues.push({
        value,
        line,
        category: 'borderRadius',
        token: borderRadiusMatch,
        shouldUse: `var(--radius-${borderRadiusMatch})`,
        context,
      });
    }
    // Check font size
    else if (matchesToken(value, 'fontSize')) {
      const fontSizeMatch = matchesToken(value, 'fontSize');
      issues.pxValues.push({
        value,
        line,
        category: 'fontSize',
        token: fontSizeMatch,
        shouldUse: `designTokens.typography.fontSize.${fontSizeMatch}`,
        context,
      });
    }
    // Other px values (might be legitimate, but worth reviewing)
    else if (numeric <= 100) {
      issues.pxValues.push({
        value,
        line,
        category: 'other',
        note: 'Review if this should use a design token',
        context,
      });
    }
  });
  
  // Only return if there are issues
  if (
    issues.hexColors.length > 0 ||
    issues.rgbaColors.length > 0 ||
    issues.pxValues.length > 0
  ) {
    return issues;
  }
  
  return null;
}

// Main function
function main() {
  const componentsDir = path.join(__dirname, '..', 'src', 'components');
  
  console.log('🔍 Scanning components for hardcoded design token values...\n');
  
  // Find all TypeScript/TSX files
  const files = execSync(
    `find "${componentsDir}" -type f \\( -name "*.tsx" -o -name "*.ts" \\)`,
    { encoding: 'utf-8' }
  )
    .trim()
    .split('\n')
    .filter(Boolean);
  
  console.log(`Found ${files.length} component files to analyze\n`);
  
  const results = [];
  let totalIssues = 0;
  
  files.forEach((file) => {
    try {
      const issues = analyzeFile(file);
      if (issues) {
        const issueCount =
          issues.hexColors.length +
          issues.rgbaColors.length +
          issues.pxValues.length;
        if (issueCount > 0) {
          results.push(issues);
          totalIssues += issueCount;
        }
      }
    } catch (error) {
      console.error(`Error analyzing ${file}:`, error.message);
    }
  });
  
  // Generate report
  console.log('='.repeat(80));
  console.log('HARDCODED DESIGN TOKEN VALUES AUDIT REPORT');
  console.log('='.repeat(80));
  console.log(`\nTotal files with issues: ${results.length}`);
  console.log(`Total issues found: ${totalIssues}\n`);
  
  // Group by category
  const byCategory = {
    hexColors: [],
    rgbaColors: [],
    spacing: [],
    borderRadius: [],
    fontSize: [],
    other: [],
  };
  
  results.forEach((result) => {
    result.hexColors.forEach((issue) => {
      byCategory.hexColors.push({ ...issue, file: result.file });
    });
    result.rgbaColors.forEach((issue) => {
      byCategory.rgbaColors.push({ ...issue, file: result.file });
    });
    result.pxValues.forEach((issue) => {
      if (issue.category === 'spacing') {
        byCategory.spacing.push({ ...issue, file: result.file });
      } else if (issue.category === 'borderRadius') {
        byCategory.borderRadius.push({ ...issue, file: result.file });
      } else if (issue.category === 'fontSize') {
        byCategory.fontSize.push({ ...issue, file: result.file });
      } else {
        byCategory.other.push({ ...issue, file: result.file });
      }
    });
  });
  
  // Print summary
  console.log('\n📊 SUMMARY BY CATEGORY:');
  console.log('-'.repeat(80));
  console.log(`Hex Colors:     ${byCategory.hexColors.length} issues`);
  console.log(`RGBA Colors:    ${byCategory.rgbaColors.length} issues`);
  console.log(`Spacing:        ${byCategory.spacing.length} issues`);
  console.log(`Border Radius:  ${byCategory.borderRadius.length} issues`);
  console.log(`Font Size:      ${byCategory.fontSize.length} issues`);
  console.log(`Other PX:       ${byCategory.other.length} issues`);
  
  // Print detailed report
  console.log('\n\n📋 DETAILED REPORT:\n');
  
  results.forEach((result) => {
    const issueCount =
      result.hexColors.length +
      result.rgbaColors.length +
      result.pxValues.length;
    
    if (issueCount === 0) return;
    
    console.log(`\n${'='.repeat(80)}`);
    console.log(`📁 ${result.file}`);
    console.log(`${'='.repeat(80)}`);
    
    if (result.hexColors.length > 0) {
      console.log(`\n🎨 Hardcoded Hex Colors (${result.hexColors.length}):`);
      result.hexColors.forEach((issue) => {
        console.log(`   Line ${issue.line}: ${issue.value} → Use: ${issue.shouldUse}`);
      });
    }
    
    if (result.rgbaColors.length > 0) {
      console.log(`\n🎨 Hardcoded RGBA Colors (${result.rgbaColors.length}):`);
      result.rgbaColors.forEach((issue) => {
        console.log(`   Line ${issue.line}: ${issue.value}`);
        console.log(`   ${issue.note}`);
      });
    }
    
    if (result.pxValues.length > 0) {
      console.log(`\n📏 Hardcoded PX Values (${result.pxValues.length}):`);
      const grouped = {};
      result.pxValues.forEach((issue) => {
        const key = issue.category || 'other';
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(issue);
      });
      
      Object.entries(grouped).forEach(([category, issues]) => {
        console.log(`\n   ${category.toUpperCase()}:`);
        issues.forEach((issue) => {
          if (issue.shouldUse) {
            console.log(`   Line ${issue.line}: ${issue.value} → Use: ${issue.shouldUse}`);
          } else {
            console.log(`   Line ${issue.line}: ${issue.value} - ${issue.note}`);
          }
        });
      });
    }
  });
  
  // Save to file
  const reportPath = path.join(__dirname, '..', 'HARDCODED_TOKENS_AUDIT.md');
  let reportContent = `# Hardcoded Design Tokens Audit Report\n\n`;
  reportContent += `Generated: ${new Date().toISOString()}\n\n`;
  reportContent += `## Summary\n\n`;
  reportContent += `- Total files with issues: ${results.length}\n`;
  reportContent += `- Total issues found: ${totalIssues}\n\n`;
  reportContent += `### By Category\n\n`;
  reportContent += `- Hex Colors: ${byCategory.hexColors.length}\n`;
  reportContent += `- RGBA Colors: ${byCategory.rgbaColors.length}\n`;
  reportContent += `- Spacing: ${byCategory.spacing.length}\n`;
  reportContent += `- Border Radius: ${byCategory.borderRadius.length}\n`;
  reportContent += `- Font Size: ${byCategory.fontSize.length}\n`;
  reportContent += `- Other PX: ${byCategory.other.length}\n\n`;
  
  reportContent += `## Detailed Findings\n\n`;
  
  results.forEach((result) => {
    const issueCount =
      result.hexColors.length +
      result.rgbaColors.length +
      result.pxValues.length;
    
    if (issueCount === 0) return;
    
    reportContent += `### ${result.file}\n\n`;
    
    if (result.hexColors.length > 0) {
      reportContent += `#### Hardcoded Hex Colors (${result.hexColors.length})\n\n`;
      result.hexColors.forEach((issue) => {
        reportContent += `- **Line ${issue.line}**: \`${issue.value}\` → Use: \`${issue.shouldUse}\`\n`;
      });
      reportContent += `\n`;
    }
    
    if (result.rgbaColors.length > 0) {
      reportContent += `#### Hardcoded RGBA Colors (${result.rgbaColors.length})\n\n`;
      result.rgbaColors.forEach((issue) => {
        reportContent += `- **Line ${issue.line}**: \`${issue.value}\` - ${issue.note}\n`;
      });
      reportContent += `\n`;
    }
    
    if (result.pxValues.length > 0) {
      reportContent += `#### Hardcoded PX Values (${result.pxValues.length})\n\n`;
      const grouped = {};
      result.pxValues.forEach((issue) => {
        const key = issue.category || 'other';
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(issue);
      });
      
      Object.entries(grouped).forEach(([category, issues]) => {
        reportContent += `**${category.toUpperCase()}:**\n\n`;
        issues.forEach((issue) => {
          if (issue.shouldUse) {
            reportContent += `- **Line ${issue.line}**: \`${issue.value}\` → Use: \`${issue.shouldUse}\`\n`;
          } else {
            reportContent += `- **Line ${issue.line}**: \`${issue.value}\` - ${issue.note}\n`;
          }
        });
        reportContent += `\n`;
      });
    }
    
    reportContent += `---\n\n`;
  });
  
  fs.writeFileSync(reportPath, reportContent);
  console.log(`\n\n✅ Report saved to: ${reportPath}`);
}

main();

