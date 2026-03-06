#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");
const OUT_JSON = path.join(ROOT, "docs/reports/explorer-inspector-coverage.json");
const OUT_MD = path.join(ROOT, "docs/reports/explorer-inspector-coverage.md");

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

function extractBlock(source, key) {
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
  return source.slice(braceStart + 1, i - 1);
}

function collect() {
  const files = walk(SRC).filter((f) => f.endsWith(".stories.tsx"));
  const records = [];

  for (const file of files) {
    const source = fs.readFileSync(file, "utf8");
    const rel = path.relative(ROOT, file).replace(/\\/g, "/");
    const explorerBlock = extractBlock(source, "explorer");
    if (!explorerBlock) continue;

    const hasInspector = /\binspector\s*:\s*\{/.test(explorerBlock);
    const hasHints = /\bspacingHints\s*:\s*\{/.test(explorerBlock);
    const defaultMode = (explorerBlock.match(/defaultMode\s*:\s*['"]([^'"]+)['"]/i) || [])[1] || null;
    const boxModelSupported =
      hasInspector &&
      (defaultMode === "box-model" || defaultMode === "both" || defaultMode === "token-spacing" || defaultMode === "off");
    const tokenSpacingCoverage = hasInspector && (hasHints || defaultMode === "token-spacing" || defaultMode === "both")
      ? "exact-or-configured"
      : "inferred-fallback";

    records.push({
      file: rel,
      hasInspector,
      hasHints,
      defaultMode,
      boxModelSupported,
      tokenSpacingCoverage,
    });
  }

  const summary = {
    totalExplorerStories: records.length,
    withInspector: records.filter((r) => r.hasInspector).length,
    withHints: records.filter((r) => r.hasHints).length,
    boxModelSupported: records.filter((r) => r.boxModelSupported).length,
    tokenExactOrConfigured: records.filter((r) => r.tokenSpacingCoverage === "exact-or-configured").length,
  };

  return { generatedAt: new Date().toISOString(), summary, records: records.sort((a, b) => a.file.localeCompare(b.file)) };
}

function toMarkdown(report) {
  const lines = [];
  lines.push("# Explorer Inspector Coverage");
  lines.push("");
  lines.push(`Generated: ${report.generatedAt}`);
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push(`- Explorer-enabled stories: **${report.summary.totalExplorerStories}**`);
  lines.push(`- With inspector config: **${report.summary.withInspector}**`);
  lines.push(`- With spacing hints: **${report.summary.withHints}**`);
  lines.push(`- Box-model supported: **${report.summary.boxModelSupported}**`);
  lines.push(`- Token overlay exact/configured: **${report.summary.tokenExactOrConfigured}**`);
  lines.push("");
  lines.push("## Per Story");
  lines.push("");
  lines.push("| Story file | Inspector | Hints | Default Mode | Box Model | Token Spacing |");
  lines.push("|---|---:|---:|---|---:|---|");
  for (const r of report.records) {
    lines.push(`| ${r.file} | ${r.hasInspector ? "Yes" : "No"} | ${r.hasHints ? "Yes" : "No"} | ${r.defaultMode || "-"} | ${r.boxModelSupported ? "Yes" : "No"} | ${r.tokenSpacingCoverage} |`);
  }
  lines.push("");
  return `${lines.join("\n")}\n`;
}

function main() {
  const report = collect();
  fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true });
  fs.writeFileSync(OUT_JSON, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(OUT_MD, toMarkdown(report));

  console.log(`Wrote ${path.relative(ROOT, OUT_JSON)}`);
  console.log(`Wrote ${path.relative(ROOT, OUT_MD)}`);
  console.log(`Explorer stories: ${report.summary.totalExplorerStories}`);
  console.log(`Inspector configs: ${report.summary.withInspector}`);
}

main();
