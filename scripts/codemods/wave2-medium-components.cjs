#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const shouldWrite = args.includes('--write');
const shouldFailOnMatch = args.includes('--fail-on-match');
const targetRoots = args.filter((arg) => !arg.startsWith('--'));
const roots = targetRoots.length > 0 ? targetRoots : ['src', 'ft-docs'];

const allowedExt = new Set(['.tsx', '.jsx', '.mdx']);
const ignoreDirs = new Set([
  'node_modules',
  'dist',
  '.next',
  'coverage',
  '.git',
]);

const ignoreFileSuffixes = ['.test.tsx', '.spec.tsx'];
const ignorePathFragments = [
  `${path.sep}src${path.sep}components${path.sep}atoms${path.sep}Badge${path.sep}Badge.tsx`,
  `${path.sep}src${path.sep}components${path.sep}organisms${path.sep}Tabs${path.sep}Tabs.tsx`,
  `${path.sep}src${path.sep}components${path.sep}organisms${path.sep}Form${path.sep}Form.tsx`,
  `${path.sep}src${path.sep}components${path.sep}molecules${path.sep}DatePicker${path.sep}DatePicker.tsx`,
  `${path.sep}src${path.sep}components${path.sep}molecules${path.sep}HoverCard${path.sep}HoverCard.tsx`,
  `${path.sep}src${path.sep}components${path.sep}atoms${path.sep}Checkbox${path.sep}Checkbox.tsx`,
  `${path.sep}src${path.sep}components${path.sep}atoms${path.sep}RadioGroup${path.sep}RadioGroup.tsx`,
  `${path.sep}src${path.sep}components${path.sep}molecules${path.sep}Tooltip${path.sep}Tooltip.tsx`,
  `${path.sep}src${path.sep}components${path.sep}molecules${path.sep}Timeline${path.sep}Timeline.tsx`,
];

const patterns = [
  { key: 'Tabs.tabs', regex: /<Tabs\b[^>]*\btabs=/g },
  { key: 'Tabs.showLine', regex: /<Tabs\b[^>]*\bshowLine=/g },
  { key: 'FormItem.label', regex: /<FormItem\b[^>]*\blabel=/g },
  { key: 'FormItem.help', regex: /<FormItem\b[^>]*\bhelp=/g },
  { key: 'DatePicker.label', regex: /<DatePicker\b[^>]*\blabel=/g },
  { key: 'DatePicker.showTime', regex: /<DatePicker\b[^>]*\bshowTime=/g },
  { key: 'HoverCard.content', regex: /<HoverCard\b[^>]*\bcontent=/g },
  { key: 'Badge.color', regex: /<Badge\b[^>]*\bcolor=/g },
  { key: 'Badge.showZero', regex: /<Badge\b[^>]*\bshowZero=/g },
  { key: 'Badge.size.default', regex: /<Badge\b[^>]*\bsize=(["'])default\1/g },
  { key: 'Badge.size.small', regex: /<Badge\b[^>]*\bsize=(["'])small\1/g },
  { key: 'Checkbox.label', regex: /<Checkbox\b[^>]*\b(?<!aria-)label=/g },
  { key: 'Checkbox.error', regex: /<Checkbox\b[^>]*\berror=/g },
  { key: 'Checkbox.description', regex: /<Checkbox\b[^>]*\bdescription=/g },
  { key: 'RadioGroup.options', regex: /<RadioGroup\b[^>]*\boptions=/g },
  { key: 'RadioGroup.error', regex: /<RadioGroup\b[^>]*\berror=/g },
  { key: 'RadioGroup.helperText', regex: /<RadioGroup\b[^>]*\bhelperText=/g },
  { key: 'Tooltip.heading', regex: /<Tooltip\b[^>]*\bheading=/g },
  { key: 'Tooltip.primaryActionText', regex: /<Tooltip\b[^>]*\bprimaryActionText=/g },
  { key: 'Tooltip.secondaryActionText', regex: /<Tooltip\b[^>]*\bsecondaryActionText=/g },
  { key: 'TimelineItem.color', regex: /<TimelineItem\b[^>]*\bcolor=/g },
  { key: 'TimelineItem.dot', regex: /<TimelineItem\b[^>]*\bdot=/g },
  { key: 'TimelineItem.label', regex: /<TimelineItem\b[^>]*\blabel=/g },
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
      if (!ignoreDirs.has(entry.name)) {
        walk(fullPath, out);
      }
      continue;
    }
    if (!shouldIgnoreFile(fullPath)) {
      out.push(fullPath);
    }
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

function applySafeTransforms(content) {
  let next = content;
  let edits = 0;

  const replacements = [
    [/\bsize=(["'])default\1/g, 'size="md"'],
    [/\bsize=(["'])small\1/g, 'size="sm"'],
    [/\bsize=\{"default"\}/g, 'size="md"'],
    [/\bsize=\{'default'\}/g, 'size="md"'],
    [/\bsize=\{"small"\}/g, 'size="sm"'],
    [/\bsize=\{'small'\}/g, 'size="sm"'],
  ];

  for (const [regex, replacement] of replacements) {
    const before = next;
    next = next.replace(regex, replacement);
    if (before !== next) {
      edits += 1;
    }
  }

  return { content: next, edits };
}

const files = [];
for (const root of roots) {
  walk(path.resolve(process.cwd(), root), files);
}

const report = [];
let totalMatches = 0;
let totalEditedFiles = 0;
let totalSafeEdits = 0;

for (const file of files) {
  const original = fs.readFileSync(file, 'utf8');
  const matches = collectMatches(original);
  if (matches.length === 0) continue;

  totalMatches += matches.length;
  const filePath = toPosix(path.relative(process.cwd(), file));
  const lineEntries = matches.map((m) => ({
    key: m.key,
    line: computeLine(original, m.index),
  }));
  report.push({ file: filePath, matches: lineEntries });

  if (shouldWrite) {
    const transformed = applySafeTransforms(original);
    if (transformed.edits > 0 && transformed.content !== original) {
      fs.writeFileSync(file, transformed.content, 'utf8');
      totalEditedFiles += 1;
      totalSafeEdits += transformed.edits;
    }
  }
}

const buckets = {};
for (const entry of report) {
  for (const hit of entry.matches) {
    buckets[hit.key] = (buckets[hit.key] || 0) + 1;
  }
}

console.log('');
console.log('Wave 2 Codemod Report (Tabs, Form, DatePicker, HoverCard, Badge, Checkbox, RadioGroup, Tooltip, Timeline)');
console.log(`Scanned files: ${files.length}`);
console.log(`Files with legacy matches: ${report.length}`);
console.log(`Total legacy matches: ${totalMatches}`);
if (shouldWrite) {
  console.log(`Files edited (safe transforms): ${totalEditedFiles}`);
  console.log(`Safe transform groups applied: ${totalSafeEdits}`);
}

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

if (!shouldWrite) {
  console.log('');
  console.log('Run with --write to apply safe transforms (Badge size aliases only).');
}

if (shouldFailOnMatch && totalMatches > 0) {
  console.error(`\nWave 2 check failed: found ${totalMatches} legacy matches.`);
  process.exit(1);
}
