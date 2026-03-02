#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const shouldFailOnMatch = args.includes('--fail-on-match');
const roots = args.filter((arg) => !arg.startsWith('--'));
const targetRoots = roots.length > 0 ? roots : ['src', 'ft-docs'];

const allowedExt = new Set(['.tsx', '.jsx', '.mdx']);
const ignoreDirs = new Set(['node_modules', 'dist', '.next', 'coverage', '.git']);
const ignoreFileSuffixes = ['.test.tsx', '.spec.tsx'];
const ignorePathFragments = [
  `${path.sep}src${path.sep}components${path.sep}organisms${path.sep}Table${path.sep}Table.tsx`,
  `${path.sep}src${path.sep}components${path.sep}organisms${path.sep}DataEntryTable${path.sep}DataEntryTable.tsx`,
  `${path.sep}src${path.sep}components${path.sep}molecules${path.sep}List${path.sep}List.tsx`,
];

const patterns = [
  { key: 'Table.columns', regex: /<Table\b[^>]*\bcolumns=/g },
  { key: 'Table.data', regex: /<Table\b[^>]*\bdata=/g },
  { key: 'Table.header', regex: /<Table\b[^>]*\bheader=/g },
  { key: 'Table.label', regex: /<Table\b[^>]*\blabel=/g },
  { key: 'Table.prefixIcon', regex: /<Table\b[^>]*\bprefixIcon=/g },
  { key: 'Table.suffixIcon', regex: /<Table\b[^>]*\bsuffixIcon=/g },
  { key: 'DataEntryTable.columns', regex: /<DataEntryTable\b[^>]*\bcolumns=/g },
  { key: 'DataEntryTable.data', regex: /<DataEntryTable\b[^>]*\bdata=/g },
  { key: 'List.dataSource', regex: /<List\b[^>]*\bdataSource=/g },
  { key: 'List.renderItem', regex: /<List\b[^>]*\brenderItem=/g },
  { key: 'List.grid', regex: /<List\b[^>]*\bgrid=/g },
  { key: 'List.header', regex: /<List\b[^>]*\bheader=/g },
  { key: 'List.footer', regex: /<List\b[^>]*\bfooter=/g },
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
for (const root of targetRoots) walk(path.resolve(process.cwd(), root), files);

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
for (const item of report) {
  for (const match of item.matches) {
    buckets[match.key] = (buckets[match.key] || 0) + 1;
  }
}

console.log('');
console.log('Wave 4 Codemod Report (Table, DataEntryTable, List)');
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
  console.error(`\nWave 4 check failed: found ${totalMatches} legacy matches.`);
  process.exit(1);
}
