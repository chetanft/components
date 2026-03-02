#!/usr/bin/env node

/**
 * Hardcoded design token audit.
 *
 * Modes:
 * - Default: prints report, writes markdown, exits 0.
 * - CI strict: --ci (fails if any issue)
 * - CI baseline-aware: --ci --baseline <json> (fails on regressions only)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DESIGN_TOKENS = {
  colors: {
    '#434f64': 'primary700 / primary',
    '#5f697b': 'primary500 / secondary',
    '#838c9d': 'primary300 / tertiary',
    '#ced1d7': 'secondary300 / border.primary',
    '#f0f1f7': 'secondary100 / border.secondary',
    '#ffffff': 'tertiary0 / bg.primary / white',
    '#f8f8f9': 'tertiary100 / bg.secondary',
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
    '0px': 'x0', '4px': 'x1', '8px': 'x2', '12px': 'x3', '16px': 'x4',
    '20px': 'x5', '24px': 'x6', '28px': 'x7', '32px': 'x8', '36px': 'x9',
    '40px': 'x10', '44px': 'x11', '48px': 'x12', '52px': 'x13', '56px': 'x14',
    '60px': 'x15', '64px': 'x16', '80px': 'x20', '96px': 'x24',
  },
  borderRadius: {
    '0px': 'none', '4px': 'sm', '8px': 'md', '12px': 'lg', '16px': 'xl', '9999px': 'full', '50%': 'circle',
  },
  fontSize: {
    '12px': 'tablet.sm', '14px': 'desktop.sm / tablet.md', '16px': 'desktop.md',
    '18px': 'tablet.lg', '20px': 'desktop.lg', '21px': 'tablet.xl',
    '24px': 'desktop.xl', '26px': 'tablet.xxl', '28px': 'desktop.xxl',
  },
};

function parseArgs(argv) {
  const args = {
    ci: false,
    baseline: null,
    jsonOut: null,
    mdOut: path.join(process.cwd(), 'HARDCODED_TOKENS_AUDIT.md'),
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--ci') args.ci = true;
    else if (arg === '--baseline') args.baseline = argv[++i];
    else if (arg === '--json-out') args.jsonOut = argv[++i];
    else if (arg === '--md-out') args.mdOut = argv[++i];
  }

  return args;
}

function normalizeHex(hex) {
  if (!hex) return null;
  const value = hex.toLowerCase();
  if (value.length === 4 && value.startsWith('#')) {
    return `#${value[1]}${value[1]}${value[2]}${value[2]}${value[3]}${value[3]}`;
  }
  return value;
}

function getContext(text, index, chars = 50) {
  const start = Math.max(0, index - chars);
  const end = Math.min(text.length, index + chars);
  return text.substring(start, end).replace(/\n/g, ' ').trim();
}

function matchesToken(value, category) {
  const tokens = DESIGN_TOKENS[category];
  if (!tokens) return null;
  if (tokens[value]) return tokens[value];
  if (category === 'colors') {
    const normalized = normalizeHex(value);
    if (normalized && tokens[normalized]) return tokens[normalized];
  }
  return null;
}

function extractHexColors(text) {
  const lines = text.split('\n');
  const pattern = /#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/g;
  const matches = [];
  let match;
  while ((match = pattern.exec(text)) !== null) {
    const lineIndex = text.substring(0, match.index).split('\n').length - 1;
    const lineContent = lines[lineIndex] || '';
    if (lineContent.includes('getCssVar(')) {
      continue;
    }
    const normalized = normalizeHex(match[0]);
    if (normalized) {
      matches.push({ original: match[0], normalized, line: lineIndex + 1 });
    }
  }
  return matches;
}

function extractRgbaColors(text) {
  const pattern = /rgba?\([^)]+\)/g;
  const matches = [];
  let match;
  while ((match = pattern.exec(text)) !== null) {
    matches.push({ value: match[0], line: text.substring(0, match.index).split('\n').length });
  }
  return matches;
}

function extractPxValues(text) {
  const pattern = /\b(\d+(?:\.\d+)?)px\b/g;
  const matches = [];
  let match;
  while ((match = pattern.exec(text)) !== null) {
    const numeric = parseFloat(match[1]);
    // Skip 1px — standard CSS border width, not tokenizable
    if (numeric === 1) continue;
    matches.push({ value: `${numeric}px`, numeric, line: text.substring(0, match.index).split('\n').length, context: getContext(text, match.index) });
  }
  return matches;
}

function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const relativePath = path.relative(process.cwd(), filePath);

  if (
    relativePath.includes('.test.') ||
    relativePath.includes('.stories.') ||
    relativePath.includes('node_modules') ||
    relativePath.includes('dist') ||
    relativePath.includes('.md') ||
    relativePath.endsWith('Colors.tsx') ||
    relativePath.endsWith('.figma.tsx')
  ) {
    return null;
  }

  const issues = { file: relativePath, hexColors: [], rgbaColors: [], pxValues: [] };

  extractHexColors(content).forEach(({ original, normalized, line }) => {
    const tokenMatch = matchesToken(normalized, 'colors');
    if (tokenMatch) {
      issues.hexColors.push({
        value: original,
        normalized,
        line,
        token: tokenMatch,
        shouldUse: `var(--color-${tokenMatch.split(' / ')[0].toLowerCase().replace(/\d+/g, '')})`,
      });
    }
  });

  extractRgbaColors(content).forEach(({ value, line }) => {
    issues.rgbaColors.push({ value, line, note: 'Consider using design token with opacity' });
  });

  extractPxValues(content).forEach(({ value, numeric, line, context }) => {
    const spacingMatch = matchesToken(value, 'spacing');
    if (spacingMatch) {
      issues.pxValues.push({ value, line, category: 'spacing', token: spacingMatch, shouldUse: `var(--spacing-${spacingMatch})`, context });
      return;
    }

    const borderRadiusMatch = matchesToken(value, 'borderRadius');
    if (borderRadiusMatch) {
      issues.pxValues.push({ value, line, category: 'borderRadius', token: borderRadiusMatch, shouldUse: `var(--radius-${borderRadiusMatch})`, context });
      return;
    }

    const fontSizeMatch = matchesToken(value, 'fontSize');
    if (fontSizeMatch) {
      issues.pxValues.push({ value, line, category: 'fontSize', token: fontSizeMatch, shouldUse: `designTokens.typography.fontSize.${fontSizeMatch}`, context });
      return;
    }

    if (numeric <= 100) {
      issues.pxValues.push({ value, line, category: 'other', note: 'Review if this should use a design token', context });
    }
  });

  if (issues.hexColors.length || issues.rgbaColors.length || issues.pxValues.length) {
    return issues;
  }
  return null;
}

function summarize(results) {
  const categories = {
    hexColors: 0,
    rgbaColors: 0,
    spacing: 0,
    borderRadius: 0,
    fontSize: 0,
    other: 0,
  };

  const files = {};
  let totalIssues = 0;

  results.forEach((result) => {
    const fileSummary = {
      hexColors: result.hexColors.length,
      rgbaColors: result.rgbaColors.length,
      spacing: 0,
      borderRadius: 0,
      fontSize: 0,
      other: 0,
      totalIssues: 0,
    };

    categories.hexColors += result.hexColors.length;
    categories.rgbaColors += result.rgbaColors.length;

    result.pxValues.forEach((issue) => {
      if (issue.category === 'spacing') fileSummary.spacing += 1;
      else if (issue.category === 'borderRadius') fileSummary.borderRadius += 1;
      else if (issue.category === 'fontSize') fileSummary.fontSize += 1;
      else fileSummary.other += 1;
    });

    categories.spacing += fileSummary.spacing;
    categories.borderRadius += fileSummary.borderRadius;
    categories.fontSize += fileSummary.fontSize;
    categories.other += fileSummary.other;

    fileSummary.totalIssues =
      fileSummary.hexColors +
      fileSummary.rgbaColors +
      fileSummary.spacing +
      fileSummary.borderRadius +
      fileSummary.fontSize +
      fileSummary.other;

    totalIssues += fileSummary.totalIssues;
    files[result.file] = fileSummary;
  });

  return {
    totalFilesWithIssues: results.length,
    totalIssues,
    categories,
    files,
  };
}

function generateMarkdown(results, summary) {
  let out = '# Hardcoded Design Tokens Audit Report\n\n';
  out += `Generated: ${new Date().toISOString()}\n\n`;
  out += '## Summary\n\n';
  out += `- Total files with issues: ${summary.totalFilesWithIssues}\n`;
  out += `- Total issues found: ${summary.totalIssues}\n\n`;
  out += '### By Category\n\n';
  out += `- Hex Colors: ${summary.categories.hexColors}\n`;
  out += `- RGBA Colors: ${summary.categories.rgbaColors}\n`;
  out += `- Spacing: ${summary.categories.spacing}\n`;
  out += `- Border Radius: ${summary.categories.borderRadius}\n`;
  out += `- Font Size: ${summary.categories.fontSize}\n`;
  out += `- Other PX: ${summary.categories.other}\n\n`;

  out += '## Detailed Findings\n\n';
  results.forEach((result) => {
    out += `### ${result.file}\n\n`;

    if (result.hexColors.length) {
      out += `#### Hardcoded Hex Colors (${result.hexColors.length})\n\n`;
      result.hexColors.forEach((issue) => {
        out += `- **Line ${issue.line}**: \`${issue.value}\` -> Use: \`${issue.shouldUse}\`\n`;
      });
      out += '\n';
    }

    if (result.rgbaColors.length) {
      out += `#### Hardcoded RGBA Colors (${result.rgbaColors.length})\n\n`;
      result.rgbaColors.forEach((issue) => {
        out += `- **Line ${issue.line}**: \`${issue.value}\` - ${issue.note}\n`;
      });
      out += '\n';
    }

    if (result.pxValues.length) {
      out += `#### Hardcoded PX Values (${result.pxValues.length})\n\n`;
      result.pxValues.forEach((issue) => {
        if (issue.shouldUse) out += `- **Line ${issue.line}** [${issue.category}]: \`${issue.value}\` -> Use: \`${issue.shouldUse}\`\n`;
        else out += `- **Line ${issue.line}** [${issue.category}]: \`${issue.value}\` - ${issue.note}\n`;
      });
      out += '\n';
    }

    out += '---\n\n';
  });

  return out;
}

function readBaseline(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.summary || !parsed.summary.categories || !parsed.summary.files) {
      throw new Error('Invalid baseline schema');
    }
    return parsed;
  } catch (error) {
    console.error(`❌ Unable to read baseline at ${filePath}: ${error.message}`);
    process.exit(1);
  }
}

function compareWithBaseline(currentSummary, baselineSummary) {
  const regressions = [];
  const categoryKeys = ['hexColors', 'rgbaColors', 'spacing', 'borderRadius', 'fontSize', 'other'];

  categoryKeys.forEach((key) => {
    if ((currentSummary.categories[key] || 0) > (baselineSummary.categories[key] || 0)) {
      regressions.push(
        `Category regression: ${key} ${baselineSummary.categories[key] || 0} -> ${currentSummary.categories[key] || 0}`
      );
    }
  });

  Object.entries(currentSummary.files).forEach(([file, current]) => {
    const baseline = baselineSummary.files[file];
    if (!baseline && current.totalIssues > 0) {
      regressions.push(`New file with token issues: ${file} (${current.totalIssues})`);
      return;
    }
    if (!baseline) return;

    categoryKeys.forEach((key) => {
      if ((current[key] || 0) > (baseline[key] || 0)) {
        regressions.push(`File regression: ${file} ${key} ${baseline[key] || 0} -> ${current[key] || 0}`);
      }
    });
  });

  return regressions;
}

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const componentsDir = path.join(__dirname, '..', 'src', 'components');

  console.log('🔍 Scanning components for hardcoded design token values...\n');

  const files = execSync(`find "${componentsDir}" -type f \\( -name "*.tsx" -o -name "*.ts" \\)`, { encoding: 'utf8' })
    .trim()
    .split('\n')
    .filter(Boolean);

  console.log(`Found ${files.length} component files to analyze\n`);

  const results = files
    .map((file) => analyzeFile(file))
    .filter(Boolean)
    .sort((a, b) => a.file.localeCompare(b.file));

  const summary = summarize(results);
  const audit = {
    generatedAt: new Date().toISOString(),
    summary,
    results,
  };

  console.log('='.repeat(80));
  console.log('HARDCODED DESIGN TOKEN VALUES AUDIT REPORT');
  console.log('='.repeat(80));
  console.log(`\nTotal files with issues: ${summary.totalFilesWithIssues}`);
  console.log(`Total issues found: ${summary.totalIssues}\n`);
  console.log('📊 SUMMARY BY CATEGORY:');
  console.log('-'.repeat(80));
  console.log(`Hex Colors:     ${summary.categories.hexColors} issues`);
  console.log(`RGBA Colors:    ${summary.categories.rgbaColors} issues`);
  console.log(`Spacing:        ${summary.categories.spacing} issues`);
  console.log(`Border Radius:  ${summary.categories.borderRadius} issues`);
  console.log(`Font Size:      ${summary.categories.fontSize} issues`);
  console.log(`Other PX:       ${summary.categories.other} issues`);

  if (args.mdOut) {
    ensureDir(args.mdOut);
    fs.writeFileSync(args.mdOut, generateMarkdown(results, summary));
    console.log(`\n✅ Markdown report saved to: ${args.mdOut}`);
  }

  if (args.jsonOut) {
    ensureDir(args.jsonOut);
    fs.writeFileSync(args.jsonOut, `${JSON.stringify(audit, null, 2)}\n`);
    console.log(`✅ JSON report saved to: ${args.jsonOut}`);
  }

  if (args.ci) {
    if (args.baseline) {
      const baseline = readBaseline(args.baseline);
      const regressions = compareWithBaseline(summary, baseline.summary);
      if (regressions.length) {
        console.error('\n❌ Token audit regression against baseline:');
        regressions.forEach((line) => console.error(`- ${line}`));
        process.exit(1);
      }
      console.log('\n✅ No token-audit regressions against baseline.');
      return;
    }

    if (summary.totalIssues > 0) {
      console.error('\n❌ Token audit failed in strict CI mode: issues detected.');
      process.exit(1);
    }
    console.log('\n✅ Token audit passed in strict CI mode.');
  }
}

main();
