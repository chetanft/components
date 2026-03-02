#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const shouldFailOnMatch = args.includes('--fail-on-match');
const targetRoots = args.filter((arg) => !arg.startsWith('--'));
const roots = targetRoots.length > 0 ? targetRoots : ['src', 'ft-docs'];

const allowedExt = new Set(['.tsx', '.jsx', '.mdx']);
const ignoreDirs = new Set(['node_modules', 'dist', '.next', 'coverage', '.git']);
const ignoreFileSuffixes = ['.test.tsx', '.spec.tsx'];
const ignorePathFragments = [
  `${path.sep}src${path.sep}components${path.sep}organisms${path.sep}Result${path.sep}Result.tsx`,
  `${path.sep}src${path.sep}components${path.sep}organisms${path.sep}Footer${path.sep}Footer.tsx`,
  `${path.sep}src${path.sep}components${path.sep}molecules${path.sep}Tour${path.sep}Tour.tsx`,
  `${path.sep}src${path.sep}components${path.sep}molecules${path.sep}Transfer${path.sep}Transfer.tsx`,
  `${path.sep}src${path.sep}components${path.sep}molecules${path.sep}TreeSelect${path.sep}TreeSelect.tsx`,
  `${path.sep}src${path.sep}components${path.sep}molecules${path.sep}Anchor${path.sep}Anchor.tsx`,
  `${path.sep}src${path.sep}components${path.sep}molecules${path.sep}Chicklet${path.sep}Chicklet.tsx`,
  `${path.sep}src${path.sep}components${path.sep}molecules${path.sep}ColorPicker${path.sep}ColorPicker.tsx`,
  `${path.sep}src${path.sep}components${path.sep}molecules${path.sep}SegmentedTabs${path.sep}SegmentedTabs.tsx`,
  `${path.sep}src${path.sep}components${path.sep}molecules${path.sep}StackedBarChart${path.sep}StackedBarChart.tsx`,
  `${path.sep}src${path.sep}components${path.sep}molecules${path.sep}SimpleColumnLayout${path.sep}SimpleColumnLayout.tsx`,
];

const patterns = [
  // Result deprecated props
  { key: 'Result.title', regex: /<Result\b[^>]*\btitle=/g },
  { key: 'Result.subTitle', regex: /<Result\b[^>]*\bsubTitle=/g },
  { key: 'Result.icon', regex: /<Result\b[^>]*\bicon=/g },
  { key: 'Result.extra', regex: /<Result\b[^>]*\bextra=/g },
  // Footer deprecated props
  { key: 'Footer.buttonCount', regex: /<Footer\b[^>]*\bbuttonCount=/g },
  { key: 'Footer.buttonTexts', regex: /<Footer\b[^>]*\bbuttonTexts=/g },
  { key: 'Footer.buttonVariants', regex: /<Footer\b[^>]*\bbuttonVariants=/g },
  { key: 'Footer.leftSideButton', regex: /<Footer\b[^>]*\bleftSideButton=/g },
  { key: 'Footer.onButtonClick', regex: /<Footer\b[^>]*\bonButtonClick=/g },
  // Tour deprecated props
  { key: 'Tour.steps', regex: /<Tour\b[^>]*\bsteps=/g },
  // Transfer deprecated props
  { key: 'Transfer.dataSource', regex: /<Transfer\b[^>]*\bdataSource=/g },
  { key: 'Transfer.showSearch', regex: /<Transfer\b[^>]*\bshowSearch=/g },
  // TreeSelect deprecated props
  { key: 'TreeSelect.treeData', regex: /<TreeSelect\b[^>]*\btreeData=/g },
  // Anchor deprecated props
  { key: 'Anchor.items', regex: /<Anchor\b[^>]*\bitems=/g },
  { key: 'Anchor.showInkInFixed', regex: /<Anchor\b[^>]*\bshowInkInFixed=/g },
  // Chicklet deprecated props
  { key: 'Chicklet.showClose', regex: /<Chicklet\b[^>]*\bshowClose=/g },
  { key: 'Chicklet.closable', regex: /<Chicklet\b[^>]*\bclosable=/g },
  // ColorPicker deprecated props
  { key: 'ColorPicker.showText', regex: /<ColorPicker\b[^>]*\bshowText/g },
  // SegmentedTabs deprecated props
  { key: 'SegmentedTabs.items', regex: /<SegmentedTabs\b[^>]*\bitems=/g },
  // StackedBarChart deprecated props
  { key: 'StackedBarChart.data', regex: /<StackedBarChart\b[^>]*\bdata=/g },
  // SimpleColumnLayout (any usage)
  { key: 'SimpleColumnLayout', regex: /<SimpleColumnLayout\b/g },
];

function toPosix(filePath) {
  return filePath.split(path.sep).join('/');
}

function shouldIgnoreFile(filePath) {
  if (!allowedExt.has(path.extname(filePath))) return true;
  if (ignoreFileSuffixes.some((suffix) => filePath.endsWith(suffix))) return true;
  return ignorePathFragments.some((fragment) => filePath.includes(fragment));
}

function walk(dirPath, out) {
  if (!fs.existsSync(dirPath)) return;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      if (!ignoreDirs.has(entry.name)) walk(fullPath, out);
      continue;
    }
    if (!shouldIgnoreFile(fullPath)) out.push(fullPath);
  }
}

function computeLine(content, index) {
  let line = 1;
  for (let i = 0; i < index; i += 1) {
    if (content.charCodeAt(i) === 10) line += 1;
  }
  return line;
}

function collectMatches(content) {
  const matches = [];
  for (const pattern of patterns) {
    const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
    let hit;
    while ((hit = regex.exec(content)) !== null) {
      matches.push({ key: pattern.key, index: hit.index });
    }
  }
  return matches.sort((a, b) => a.index - b.index);
}

const files = [];
for (const root of roots) walk(path.resolve(process.cwd(), root), files);

const report = [];
let totalMatches = 0;
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const matches = collectMatches(content);
  if (matches.length === 0) continue;

  totalMatches += matches.length;
  report.push({
    file: toPosix(path.relative(process.cwd(), file)),
    matches: matches.map((m) => ({ key: m.key, line: computeLine(content, m.index) })),
  });
}

const buckets = {};
for (const entry of report) {
  for (const hit of entry.matches) {
    buckets[hit.key] = (buckets[hit.key] || 0) + 1;
  }
}

console.log('');
console.log('Wave 8 Codemod Report (Blocked Set B)');
console.log(`Scanned files: ${files.length}`);
console.log(`Files with legacy matches: ${report.length}`);
console.log(`Total legacy matches: ${totalMatches}`);
console.log('');
console.log('Match counts by pattern:');
Object.keys(buckets)
  .sort((a, b) => buckets[b] - buckets[a])
  .forEach((key) => {
    console.log(`- ${key}: ${buckets[key]}`);
  });
console.log('');
console.log('File-level matches:');
for (const entry of report) {
  const summary = entry.matches.map((m) => `${m.key}@L${m.line}`).join(', ');
  console.log(`- ${entry.file}: ${summary}`);
}
console.log('');
console.log('This codemod is report-only for discovery, and Wave 8 is enforced via --fail-on-match in CI.');

if (shouldFailOnMatch && totalMatches > 0) {
  console.error(`\nWave 8 check failed: found ${totalMatches} legacy matches.`);
  process.exit(1);
}
