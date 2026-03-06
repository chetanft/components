#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const COVERAGE_PATH = path.join(
  ROOT,
  "docs/reports/explorer-inspector-coverage.json"
);

function findBlock(source, key) {
  const idx = source.indexOf(`${key}:`);
  if (idx === -1) return null;
  const braceStart = source.indexOf("{", idx);
  if (braceStart === -1) return null;
  let depth = 1;
  let i = braceStart + 1;
  while (i < source.length && depth > 0) {
    if (source[i] === "{") depth++;
    else if (source[i] === "}") depth--;
    i++;
  }
  if (depth !== 0) return null;
  return { idx, braceStart, end: i - 1 };
}

function getIndentBefore(source, idx) {
  const lineStart = source.lastIndexOf("\n", idx) + 1;
  const line = source.slice(lineStart, idx);
  const m = line.match(/^\s*/);
  return m ? m[0] : "";
}

function main() {
  if (!fs.existsSync(COVERAGE_PATH)) {
    console.error(`Missing coverage report: ${path.relative(ROOT, COVERAGE_PATH)}`);
    process.exit(1);
  }

  const report = JSON.parse(fs.readFileSync(COVERAGE_PATH, "utf8"));
  const targets = report.records.filter((r) => !r.hasInspector).map((r) => r.file);
  let changed = 0;
  const skipped = [];

  for (const rel of targets) {
    const abs = path.join(ROOT, rel);
    if (!fs.existsSync(abs)) {
      skipped.push(`${rel} (missing file)`);
      continue;
    }

    const source = fs.readFileSync(abs, "utf8");
    const block = findBlock(source, "explorer");
    if (!block) {
      skipped.push(`${rel} (no explorer block)`);
      continue;
    }

    const blockContent = source.slice(block.braceStart + 1, block.end);
    if (/\binspector\s*:\s*\{/.test(blockContent)) {
      continue;
    }

    const baseIndent = getIndentBefore(source, block.idx);
    const childIndent = `${baseIndent}  `;
    const inspectorBlock =
      `\n${childIndent}inspector: {\n` +
      `${childIndent}  enabled: true,\n` +
      `${childIndent}  defaultMode: 'box-model' as const,\n` +
      `${childIndent}},`;

    const out =
      source.slice(0, block.braceStart + 1) +
      inspectorBlock +
      source.slice(block.braceStart + 1);

    fs.writeFileSync(abs, out);
    changed += 1;
  }

  console.log(`Added inspector defaults to ${changed} story files.`);
  if (skipped.length > 0) {
    console.log(`Skipped ${skipped.length} files:`);
    for (const item of skipped) console.log(`- ${item}`);
  }
}

main();

