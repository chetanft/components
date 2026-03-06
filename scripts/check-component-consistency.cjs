#!/usr/bin/env node
'use strict';

/**
 * Component consistency checker with phase support.
 *
 * Phase 1 (report only):
 *   node scripts/check-component-consistency.cjs --json-out <file> --md-out <file>
 *
 * Phase 2 (baseline capture/update):
 *   node scripts/check-component-consistency.cjs --write-baseline <file> --json-out <file> --md-out <file>
 *
 * Phase 3 (CI regression gate):
 *   node scripts/check-component-consistency.cjs --ci --baseline <file> --json-out <file> --md-out <file>
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectRoot = path.join(__dirname, '..');
const SIZE_ORDER = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

function parseArgs(argv) {
  const args = {
    ci: false,
    baseline: null,
    writeBaseline: null,
    jsonOut: path.join(projectRoot, 'docs/audits/component-consistency-latest.json'),
    mdOut: path.join(projectRoot, 'docs/audits/component-consistency-latest.md'),
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--ci') args.ci = true;
    else if (arg === '--baseline') args.baseline = argv[++i];
    else if (arg === '--write-baseline') args.writeBaseline = argv[++i];
    else if (arg === '--json-out') args.jsonOut = argv[++i];
    else if (arg === '--md-out') args.mdOut = argv[++i];
  }

  return args;
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function listSourceFiles() {
  const componentsDir = path.join(projectRoot, 'src/components');
  const raw = execSync(`find "${componentsDir}" -type f \\( -name "*.ts" -o -name "*.tsx" \\)`, { encoding: 'utf8' })
    .trim()
    .split('\n')
    .filter(Boolean);

  return raw.filter((file) => {
    const rel = path.relative(projectRoot, file).replace(/\\/g, '/');
    return !(
      rel.includes('.stories.') ||
      rel.includes('.test.') ||
      rel.includes('.spec.') ||
      rel.includes('/__tests__/') ||
      rel.endsWith('.figma.tsx') ||
      rel.includes('/contexts/') ||
      rel.includes('/context/')
    );
  });
}

function normalizeName(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

function parseDocComponentHeadings(docPath) {
  if (!fs.existsSync(docPath)) return new Set();
  const content = fs.readFileSync(docPath, 'utf8');
  const headings = [...content.matchAll(/^###\s+(.+)$/gm)].map((m) => m[1].trim());
  const bullets = [...content.matchAll(/^\-\s+\*\*([^*]+)\*\*/gm)].map((m) => m[1].trim());

  const tokenSections = new Set([
    'Spacing Scale (Legacy `--x*`)',
    'Spacing Aliases (Canonical `--spacing-x*`)',
    'Half-Step Spacing',
    'Typography Tokens',
    'Border Radius Tokens',
    'Atoms',
    'Molecules',
    'Organisms',
    'Charts',
    'Templates',
  ]);

  const out = new Set();
  for (const heading of headings) {
    if (tokenSections.has(heading)) continue;
    out.add(normalizeName(heading));
  }

  for (const bullet of bullets) {
    out.add(normalizeName(bullet));
  }

  return out;
}

function extractSizeEntries(content) {
  const entries = new Map();

  // Object entries: md: { ... }
  const objectRe = /(xxs|xs|sm|md|lg|xl|xxl)\s*:\s*\{([\s\S]{0,600}?)\}/g;
  let m;
  while ((m = objectRe.exec(content)) !== null) {
    const size = m[1];
    const snippet = m[2];
    if (!entries.has(size)) entries.set(size, []);
    entries.get(size).push(snippet);
  }

  // String entries: md: "h-component-md text-md-rem"
  const stringRe = /(xxs|xs|sm|md|lg|xl|xxl)\s*:\s*['"]([^'"\n]{1,220})['"]/g;
  while ((m = stringRe.exec(content)) !== null) {
    const size = m[1];
    const snippet = m[2];
    if (!entries.has(size)) entries.set(size, []);
    entries.get(size).push(snippet);
  }

  return entries;
}

function parseNumericFromClassToken(token) {
  // Supports h-10, px-3.5 etc. (4px scale approximation)
  const v = Number(token);
  if (Number.isNaN(v)) return null;
  return v * 4;
}

function getSizeSignals(snippets) {
  const signals = {
    heightPx: [],
    iconPx: [],
    pxPaddingPx: [],
    pyPaddingPx: [],
  };

  for (const snippet of snippets) {
    const hComp = snippet.match(/h-component-(xxs|xs|sm|md|lg|xl|xxl)/);
    if (hComp) {
      // monotonic order only; use index as comparable score
      const idx = SIZE_ORDER.indexOf(hComp[1]);
      if (idx >= 0) signals.heightPx.push((idx + 1) * 1000);
    }

    const hTw = snippet.match(/\bh-(\d+(?:\.\d+)?)\b/);
    if (hTw) {
      const px = parseNumericFromClassToken(hTw[1]);
      if (px !== null) signals.heightPx.push(px);
    }

    const icon = snippet.match(/iconSize\s*:\s*(\d+)/);
    if (icon) signals.iconPx.push(Number(icon[1]));

    const pxPad = snippet.match(/\bpx-(\d+(?:\.5)?)\b/);
    if (pxPad) {
      const px = parseNumericFromClassToken(pxPad[1]);
      if (px !== null) signals.pxPaddingPx.push(px);
    }

    const pyPad = snippet.match(/\bpy-(\d+(?:\.5)?)\b/);
    if (pyPad) {
      const px = parseNumericFromClassToken(pyPad[1]);
      if (px !== null) signals.pyPaddingPx.push(px);
    }
  }

  return {
    heightPx: signals.heightPx.length ? Math.max(...signals.heightPx) : null,
    iconPx: signals.iconPx.length ? Math.max(...signals.iconPx) : null,
    pxPaddingPx: signals.pxPaddingPx.length ? Math.max(...signals.pxPaddingPx) : null,
    pyPaddingPx: signals.pyPaddingPx.length ? Math.max(...signals.pyPaddingPx) : null,
  };
}

function monotonicIssues(file, metricName, values) {
  const issues = [];
  for (let i = 1; i < values.length; i += 1) {
    const prev = values[i - 1];
    const next = values[i];
    if (next.value < prev.value) {
      issues.push({
        rule: 'size_monotonicity',
        severity: 'error',
        file,
        message: `${metricName} decreases from ${prev.size} (${prev.value}) to ${next.size} (${next.value})`,
      });
    }
  }
  return issues;
}

function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const rel = path.relative(projectRoot, filePath).replace(/\\/g, '/');
  const issues = [];

  const sizeEntries = extractSizeEntries(content);
  if (sizeEntries.size >= 3) {
    const metricSeries = {
      heightPx: [],
      iconPx: [],
      pxPaddingPx: [],
      pyPaddingPx: [],
    };

    for (const size of SIZE_ORDER) {
      const snippets = sizeEntries.get(size);
      if (!snippets || snippets.length === 0) continue;
      const signals = getSizeSignals(snippets);
      for (const key of Object.keys(metricSeries)) {
        const value = signals[key];
        if (typeof value === 'number') {
          metricSeries[key].push({ size, value });
        }
      }
    }

    for (const [metric, values] of Object.entries(metricSeries)) {
      if (values.length >= 3) {
        issues.push(...monotonicIssues(rel, metric, values));
      }
    }
  }

  // Rule: hardcoded visual literals likely bypassing token contract
  const hardcodedPx = [...content.matchAll(/\b(\d+(?:\.\d+)?)px\b/g)]
    .map((m) => Number(m[1]))
    .filter((n) => !Number.isNaN(n) && n !== 1);
  if (hardcodedPx.length > 0) {
    issues.push({
      rule: 'hardcoded_px_literal',
      severity: 'warn',
      file: rel,
      message: `${hardcodedPx.length} hardcoded px literal(s) found`,
    });
  }

  return issues;
}

function analyzeDocsCoverage(registry, docPath) {
  const issues = [];
  const docHeadings = parseDocComponentHeadings(docPath);
  const exported = (registry.components || []).map((c) => c.name);

  for (const name of exported) {
    if (!docHeadings.has(normalizeName(name))) {
      issues.push({
        rule: 'docs_coverage_missing_component',
        severity: 'error',
        file: path.relative(projectRoot, docPath),
        message: `Missing component heading for exported component: ${name}`,
      });
    }
  }

  return issues;
}

function summarize(allIssues) {
  const byRule = {};
  const bySeverity = { error: 0, warn: 0 };
  const byFile = {};

  for (const issue of allIssues) {
    byRule[issue.rule] = (byRule[issue.rule] || 0) + 1;
    bySeverity[issue.severity] = (bySeverity[issue.severity] || 0) + 1;

    if (!byFile[issue.file]) byFile[issue.file] = { total: 0, rules: {} };
    byFile[issue.file].total += 1;
    byFile[issue.file].rules[issue.rule] = (byFile[issue.file].rules[issue.rule] || 0) + 1;
  }

  return {
    totalIssues: allIssues.length,
    totalFilesWithIssues: Object.keys(byFile).length,
    byRule,
    bySeverity,
    byFile,
  };
}

function generateMarkdown(result) {
  const { generatedAt, summary, issues } = result;
  const lines = [];
  lines.push('# Component Consistency Report');
  lines.push('');
  lines.push(`Generated: ${generatedAt}`);
  lines.push('');
  lines.push('## Summary');
  lines.push('');
  lines.push(`- Total issues: **${summary.totalIssues}**`);
  lines.push(`- Files with issues: **${summary.totalFilesWithIssues}**`);
  lines.push(`- Errors: **${summary.bySeverity.error || 0}**`);
  lines.push(`- Warnings: **${summary.bySeverity.warn || 0}**`);
  lines.push('');
  lines.push('### Rule Breakdown');
  lines.push('');
  lines.push('| Rule | Count |');
  lines.push('|---|---:|');
  Object.entries(summary.byRule)
    .sort((a, b) => b[1] - a[1])
    .forEach(([rule, count]) => lines.push(`| \`${rule}\` | ${count} |`));
  lines.push('');

  if (issues.length > 0) {
    lines.push('## Findings');
    lines.push('');
    const grouped = {};
    for (const issue of issues) {
      if (!grouped[issue.file]) grouped[issue.file] = [];
      grouped[issue.file].push(issue);
    }

    Object.keys(grouped)
      .sort((a, b) => a.localeCompare(b))
      .forEach((file) => {
        lines.push(`### ${file}`);
        lines.push('');
        grouped[file].forEach((issue) => {
          lines.push(`- [${issue.severity.toUpperCase()}] \`${issue.rule}\`: ${issue.message}`);
        });
        lines.push('');
      });
  }

  return `${lines.join('\n').trim()}\n`;
}

function loadBaseline(filePath) {
  try {
    const parsed = readJson(filePath);
    if (!parsed.summary || !parsed.summary.byRule || !parsed.summary.byFile) {
      throw new Error('Invalid baseline schema');
    }
    return parsed;
  } catch (error) {
    console.error(`❌ Failed to read baseline ${filePath}: ${error.message}`);
    process.exit(1);
  }
}

function compareWithBaseline(current, baseline) {
  const regressions = [];

  const allRules = new Set([
    ...Object.keys(baseline.summary.byRule || {}),
    ...Object.keys(current.summary.byRule || {}),
  ]);

  for (const rule of allRules) {
    const baseCount = baseline.summary.byRule[rule] || 0;
    const currCount = current.summary.byRule[rule] || 0;
    if (currCount > baseCount) {
      regressions.push(`Rule regression: ${rule} ${baseCount} -> ${currCount}`);
    }
  }

  for (const [file, fileSummary] of Object.entries(current.summary.byFile || {})) {
    const baselineFile = baseline.summary.byFile[file];
    if (!baselineFile) {
      regressions.push(`New file with consistency issues: ${file} (${fileSummary.total})`);
      continue;
    }

    const allFileRules = new Set([
      ...Object.keys(baselineFile.rules || {}),
      ...Object.keys(fileSummary.rules || {}),
    ]);

    for (const rule of allFileRules) {
      const baseCount = baselineFile.rules[rule] || 0;
      const currCount = fileSummary.rules[rule] || 0;
      if (currCount > baseCount) {
        regressions.push(`File regression: ${file} ${rule} ${baseCount} -> ${currCount}`);
      }
    }
  }

  return regressions;
}

function run() {
  const args = parseArgs(process.argv.slice(2));
  const files = listSourceFiles();
  const registry = readJson(path.join(projectRoot, 'registry.json'));
  const docSpecPath = path.join(projectRoot, 'docs/component-design-specs.md');

  const issues = [];
  for (const file of files) {
    issues.push(...analyzeFile(file));
  }
  issues.push(...analyzeDocsCoverage(registry, docSpecPath));

  const result = {
    generatedAt: new Date().toISOString(),
    summary: summarize(issues),
    issues: issues.sort((a, b) => {
      if (a.file !== b.file) return a.file.localeCompare(b.file);
      if (a.rule !== b.rule) return a.rule.localeCompare(b.rule);
      return a.message.localeCompare(b.message);
    }),
  };

  ensureDir(args.jsonOut);
  fs.writeFileSync(args.jsonOut, `${JSON.stringify(result, null, 2)}\n`);

  ensureDir(args.mdOut);
  fs.writeFileSync(args.mdOut, generateMarkdown(result));

  console.log('Component consistency analysis complete.');
  console.log(`- JSON: ${path.relative(projectRoot, args.jsonOut)}`);
  console.log(`- MD:   ${path.relative(projectRoot, args.mdOut)}`);
  console.log(`- Issues: ${result.summary.totalIssues} (${result.summary.bySeverity.error || 0} errors, ${result.summary.bySeverity.warn || 0} warnings)`);

  if (args.writeBaseline) {
    const baselinePath = path.isAbsolute(args.writeBaseline)
      ? args.writeBaseline
      : path.join(projectRoot, args.writeBaseline);
    ensureDir(baselinePath);
    fs.writeFileSync(baselinePath, `${JSON.stringify(result, null, 2)}\n`);
    console.log(`- Baseline written: ${path.relative(projectRoot, baselinePath)}`);
  }

  if (args.ci) {
    if (!args.baseline) {
      console.error('❌ --ci requires --baseline <file>');
      process.exit(1);
    }

    const baselinePath = path.isAbsolute(args.baseline)
      ? args.baseline
      : path.join(projectRoot, args.baseline);

    const baseline = loadBaseline(baselinePath);
    const regressions = compareWithBaseline(result, baseline);
    if (regressions.length > 0) {
      console.error('\n❌ Component consistency regressions detected:');
      regressions.forEach((r) => console.error(`- ${r}`));
      process.exit(1);
    }

    console.log('\n✅ No component consistency regressions against baseline.');
  }
}

run();
