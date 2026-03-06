#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");
const OUT_JSON = path.join(ROOT, "docs/reports/explorer-inspector-validation.json");
const OUT_MD = path.join(ROOT, "docs/reports/explorer-inspector-validation.md");
const STRICT = process.argv.includes("--strict");

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

function extractObject(source, key) {
  const idx = source.indexOf(`${key}:`);
  if (idx === -1) return null;
  const start = source.indexOf("{", idx);
  if (start === -1) return null;
  let depth = 1;
  let i = start + 1;
  while (i < source.length && depth > 0) {
    if (source[i] === "{") depth++;
    else if (source[i] === "}") depth--;
    i++;
  }
  if (depth !== 0) return null;
  return source.slice(start + 1, i - 1);
}

function validate(file, source) {
  const issues = [];
  const explorer = extractObject(source, "explorer");
  if (!explorer) return { file, issues };

  const inspector = extractObject(explorer, "inspector");
  if (!inspector) {
    issues.push({ level: "error", message: "Missing explorer.inspector block" });
    return { file, issues };
  }

  const mode = (inspector.match(/defaultMode\s*:\s*['"]([^'"]+)['"]/) || [])[1] || null;
  const validModes = new Set(["off", "box-model", "token-spacing", "both"]);
  if (!mode || !validModes.has(mode)) {
    issues.push({ level: "error", message: "defaultMode must be one of off|box-model|token-spacing|both" });
  }

  const hints = extractObject(inspector, "spacingHints");
  if (hints) {
    const tokenMatches = [...hints.matchAll(/([A-Za-z0-9_]+)\s*:\s*['"]([^'"]+)['"]/g)];
    for (const [, key, value] of tokenMatches) {
      if (!/^x\d+$/.test(value)) {
        issues.push({ level: "error", message: `spacingHints.${key} must be x-token format (got "${value}")` });
      }
    }
  } else if (mode === "token-spacing" || mode === "both") {
    issues.push({ level: "warn", message: "token-spacing mode without spacingHints (will use inferred fallback)" });
  }

  const anchors = extractObject(inspector, "anchors");
  if (anchors) {
    const allowed = new Set(["root", "content", "icon", "label", "prefix", "suffix"]);
    const anchorMatches = [...anchors.matchAll(/([A-Za-z0-9_]+)\s*:/g)];
    for (const [, key] of anchorMatches) {
      if (!allowed.has(key)) {
        issues.push({ level: "error", message: `anchors.${key} is not a supported anchor id` });
      }
    }
  }

  return { file, issues };
}

function toMarkdown(report) {
  const lines = [];
  lines.push("# Explorer Inspector Spec Validation");
  lines.push("");
  lines.push(`Generated: ${report.generatedAt}`);
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push(`- Files checked: **${report.summary.checked}**`);
  lines.push(`- Errors: **${report.summary.errors}**`);
  lines.push(`- Warnings: **${report.summary.warnings}**`);
  lines.push("");
  lines.push("## Findings");
  lines.push("");
  lines.push("| File | Level | Message |");
  lines.push("|---|---|---|");
  if (report.findings.length === 0) {
    lines.push("| - | - | No issues |");
  } else {
    for (const finding of report.findings) {
      lines.push(`| ${finding.file} | ${finding.level} | ${finding.message} |`);
    }
  }
  lines.push("");
  return `${lines.join("\n")}\n`;
}

function main() {
  const files = walk(SRC).filter((f) => f.endsWith(".stories.tsx"));
  const findings = [];
  let checked = 0;

  for (const file of files) {
    const source = fs.readFileSync(file, "utf8");
    if (!source.includes("explorer:")) continue;
    checked += 1;
    const rel = path.relative(ROOT, file).replace(/\\/g, "/");
    const result = validate(rel, source);
    for (const issue of result.issues) findings.push({ file: rel, ...issue });
  }

  const summary = {
    checked,
    errors: findings.filter((f) => f.level === "error").length,
    warnings: findings.filter((f) => f.level === "warn").length,
  };

  const report = {
    generatedAt: new Date().toISOString(),
    summary,
    findings,
  };

  fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true });
  fs.writeFileSync(OUT_JSON, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(OUT_MD, toMarkdown(report));

  console.log(`Wrote ${path.relative(ROOT, OUT_JSON)}`);
  console.log(`Wrote ${path.relative(ROOT, OUT_MD)}`);
  console.log(`Checked: ${checked}, errors: ${summary.errors}, warnings: ${summary.warnings}`);

  if (summary.errors > 0 || (STRICT && summary.warnings > 0)) {
    process.exit(1);
  }
}

main();

