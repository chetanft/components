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
  `${path.sep}src${path.sep}components${path.sep}organisms${path.sep}Modal${path.sep}Modal.tsx`,
  `${path.sep}src${path.sep}components${path.sep}organisms${path.sep}Drawer${path.sep}Drawer.tsx`,
  `${path.sep}src${path.sep}components${path.sep}organisms${path.sep}Collapsible${path.sep}Collapsible.tsx`,
  `${path.sep}src${path.sep}components${path.sep}molecules${path.sep}Alert${path.sep}Alert.tsx`,
  `${path.sep}src${path.sep}components${path.sep}organisms${path.sep}NavigationPopover${path.sep}NavigationPopover.tsx`,
  `${path.sep}src${path.sep}components${path.sep}organisms${path.sep}PageHeader${path.sep}PageHeader.tsx`,
  `${path.sep}src${path.sep}components${path.sep}organisms${path.sep}PageHeader${path.sep}PageHeaderTabs.tsx`,
];

const patterns = [
  { key: 'Modal.onClose', regex: /<Modal\b[^>]*\bonClose=/g },
  { key: 'Modal.title', regex: /<Modal\b[^>]*\btitle=/g },
  { key: 'Modal.footer', regex: /<Modal\b[^>]*\bfooter=/g },
  { key: 'Drawer.onClose', regex: /<Drawer\b[^>]*\bonClose=/g },
  { key: 'Drawer.title', regex: /<Drawer\b[^>]*\btitle=/g },
  { key: 'Drawer.footer', regex: /<Drawer\b[^>]*\bfooter=/g },
  { key: 'Collapsible.header', regex: /<Collapsible\b[^>]*\bheader=/g },
  { key: 'Collapsible.extra', regex: /<Collapsible\b[^>]*\bextra=/g },
  { key: 'Collapsible.showArrow', regex: /<Collapsible\b[^>]*\bshowArrow=/g },
  { key: 'Collapsible.badges', regex: /<Collapsible\b[^>]*\bbadges=/g },
  { key: 'Alert.message', regex: /<Alert\b[^>]*\bmessage=/g },
  { key: 'Alert.title', regex: /<Alert\b[^>]*\btitle=/g },
  { key: 'Alert.icon', regex: /<Alert\b[^>]*\bicon=/g },
  { key: 'Alert.action', regex: /<Alert\b[^>]*\baction=/g },
  { key: 'NavigationPopover.sections', regex: /<NavigationPopover\b[^>]*\bsections=/g },
  { key: 'PageHeader.items', regex: /<PageHeader\b[^>]*\bitems=/g },
  { key: 'PageHeaderTabs.onChange', regex: /<PageHeader(?:\.Tabs)?\b[^>]*\bonChange=/g },
  { key: 'PageHeaderTabs.variant', regex: /<PageHeader(?:\.Tabs)?\b[^>]*\bvariant=/g },
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
  const original = fs.readFileSync(file, 'utf8');
  const matches = collectMatches(original);
  if (matches.length === 0) continue;

  totalMatches += matches.length;
  const filePath = toPosix(path.relative(process.cwd(), file));
  const lineEntries = matches.map((m) => ({ key: m.key, line: computeLine(original, m.index) }));
  report.push({ file: filePath, matches: lineEntries });
}

const buckets = {};
for (const entry of report) {
  for (const hit of entry.matches) {
    buckets[hit.key] = (buckets[hit.key] || 0) + 1;
  }
}

console.log('');
console.log('Wave 3 Codemod Report (Modal, Drawer, Collapsible, Alert, NavigationPopover, PageHeader)');
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
console.log('This codemod is report-only. Migrate matches to composable API manually.');

if (shouldFailOnMatch && totalMatches > 0) {
  console.error(`\nWave 3 check failed: found ${totalMatches} legacy matches.`);
  process.exit(1);
}
