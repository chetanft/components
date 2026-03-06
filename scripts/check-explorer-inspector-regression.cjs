#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const BASELINE_PATH = path.join(ROOT, "docs/reports/explorer-inspector-baseline.json");
const CURRENT_PATH = path.join(ROOT, "docs/reports/explorer-inspector-coverage.json");

if (!fs.existsSync(CURRENT_PATH)) {
  console.error("Missing current coverage report. Run generate:explorer-inspector-coverage first.");
  process.exit(1);
}

const current = JSON.parse(fs.readFileSync(CURRENT_PATH, "utf8"));

if (process.argv.includes("--write-baseline")) {
  const baseline = {
    generatedAt: new Date().toISOString(),
    summary: current.summary,
  };
  fs.writeFileSync(BASELINE_PATH, `${JSON.stringify(baseline, null, 2)}\n`);
  console.log(`Wrote baseline: ${path.relative(ROOT, BASELINE_PATH)}`);
  process.exit(0);
}

if (!fs.existsSync(BASELINE_PATH)) {
  console.error("Missing inspector baseline. Create one with: node scripts/check-explorer-inspector-regression.cjs --write-baseline");
  process.exit(1);
}

const baseline = JSON.parse(fs.readFileSync(BASELINE_PATH, "utf8"));
const failures = [];

function assertNoDrop(key, label) {
  const before = Number(baseline.summary?.[key] || 0);
  const after = Number(current.summary?.[key] || 0);
  if (after < before) {
    failures.push(`${label} regressed: baseline=${before}, current=${after}`);
  }
}

assertNoDrop("withInspector", "Inspector coverage");
assertNoDrop("boxModelSupported", "Box-model support");
assertNoDrop("tokenExactOrConfigured", "Token spacing exact/configured coverage");

if (failures.length > 0) {
  console.error("Explorer inspector regression check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  console.error("Update stories/config or intentionally refresh baseline with --write-baseline.");
  process.exit(1);
}

console.log("Explorer inspector regression check passed.");

