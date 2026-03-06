#!/usr/bin/env node
/**
 * CI Explorer Checks
 *
 * Runs all explorer validation checks and fails if any docs are stale.
 *
 * Steps:
 *   1. Run check-explorer-contract.cjs — fail if any contracts are invalid
 *   2. Run all 4 generator scripts to regenerate docs
 *   3. Check git diff on the generated doc files — fail if any are stale
 *   4. Parse the chip audit summary and fail if error chips > 0
 *   5. Print a summary
 *
 * Usage: node scripts/ci-explorer-checks.cjs
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

const TRACKED_DOCS = [
  "docs/EXPLORER_CHIP_CONNECTION_AUDIT.md",
  "docs/EXPLORER_CHIP_PREVIEW_CLASSIFICATION.md",
  "docs/EXPLORER_AGGREGATE_CHIP_AUDIT.md",
  "docs/EXPLORER_COMPONENT_VARIANT_MATRIX.md",
  "docs/EXPLORER_VARIANT_TAXONOMY_AUDIT.md",
  "docs/EXPLORER_QUALITY_TRIAGE.md",
  "docs/EXPLORER_VARIANT_CONTRACTS.md",
  "docs/EXPLORER_TREND_SNAPSHOT.md",
  "docs/reports/explorer-inspector-coverage.json",
  "docs/reports/explorer-inspector-coverage.md",
  "docs/reports/explorer-inspector-validation.json",
  "docs/reports/explorer-inspector-validation.md",
  "docs/reports/explorer-inspector-baseline.json",
];

const GENERATOR_SCRIPTS = [
  "scripts/generate-explorer-chip-audit.cjs",
  "scripts/generate-explorer-chip-preview-classification.cjs",
  "scripts/generate-explorer-aggregate-chip-audit.cjs",
  "scripts/generate-explorer-variant-matrix.cjs",
  "scripts/generate-explorer-taxonomy-audit.cjs",
  "scripts/generate-explorer-quality-triage.cjs",
  "scripts/generate-explorer-variant-contracts.cjs",
  "scripts/generate-explorer-trend-snapshot.cjs",
  "scripts/generate-explorer-inspector-coverage.cjs",
];

let failed = false;
const results = {
  contractCheck: null,
  duplicateStoryLint: null,
  storyTaxonomy: null,
  inspectorSpec: null,
  inspectorRegression: null,
  generators: [],
  staleDocs: [],
  errorChips: null,
};

function run(cmd, opts = {}) {
  return execSync(cmd, {
    cwd: ROOT,
    encoding: "utf8",
    stdio: opts.capture ? "pipe" : "inherit",
    ...opts,
  });
}

function separator(title) {
  console.log("");
  console.log("=".repeat(60));
  console.log(`  ${title}`);
  console.log("=".repeat(60));
  console.log("");
}

// ---------------------------------------------------------------------------
// Step 1: Explorer contract validation
// ---------------------------------------------------------------------------
separator("Step 1/9: Explorer contract validation");

try {
  run("node scripts/check-explorer-contract.cjs");
  results.contractCheck = "pass";
  console.log("Contract check passed.");
} catch (err) {
  results.contractCheck = "FAIL";
  failed = true;
  console.error("Contract check FAILED.");
}

// ---------------------------------------------------------------------------
// Step 2: Duplicate story explorer lint
// ---------------------------------------------------------------------------
separator("Step 2/9: Duplicate story explorer lint");

try {
  run("node scripts/check-duplicate-story-explorer.cjs");
  results.duplicateStoryLint = "pass";
  console.log("Duplicate story lint passed.");
} catch (err) {
  results.duplicateStoryLint = "FAIL";
  failed = true;
  console.error("Duplicate story lint FAILED.");
}

// ---------------------------------------------------------------------------
// Step 3: Story taxonomy checks (strict)
// ---------------------------------------------------------------------------
separator("Step 3/9: Story taxonomy checks");

try {
  run("node scripts/ci-story-taxonomy-checks.cjs --strict", { capture: true });
  results.storyTaxonomy = "pass";
  console.log("Story taxonomy checks passed.");
} catch (err) {
  results.storyTaxonomy = "FAIL";
  failed = true;
  console.error("Story taxonomy checks FAILED.");
}

// ---------------------------------------------------------------------------
// Step 4: Inspector spec validation (strict)
// ---------------------------------------------------------------------------
separator("Step 4/9: Inspector spec validation");

try {
  run("node scripts/check-explorer-inspector-spec.cjs --strict");
  results.inspectorSpec = "pass";
  console.log("Inspector spec validation passed.");
} catch (err) {
  results.inspectorSpec = "FAIL";
  failed = true;
  console.error("Inspector spec validation FAILED.");
}

// ---------------------------------------------------------------------------
// Step 5: Regenerate all explorer docs
// ---------------------------------------------------------------------------
separator("Step 5/9: Regenerate explorer docs");

for (const script of GENERATOR_SCRIPTS) {
  const label = path.basename(script);
  try {
    run(`node ${script}`);
    results.generators.push({ script: label, status: "pass" });
  } catch (err) {
    results.generators.push({ script: label, status: "FAIL" });
    failed = true;
    console.error(`Generator ${label} FAILED.`);
  }
}

// ---------------------------------------------------------------------------
// Step 6: Inspector regression checks
// ---------------------------------------------------------------------------
separator("Step 6/9: Inspector regression checks");

try {
  run("node scripts/check-explorer-inspector-regression.cjs");
  results.inspectorRegression = "pass";
  console.log("Inspector regression checks passed.");
} catch (err) {
  results.inspectorRegression = "FAIL";
  failed = true;
  console.error("Inspector regression checks FAILED.");
}

// ---------------------------------------------------------------------------
// Step 7: Check for stale docs via git diff
// ---------------------------------------------------------------------------
separator("Step 7/9: Check for stale docs (git diff)");

for (const docPath of TRACKED_DOCS) {
  const absPath = path.join(ROOT, docPath);
  if (!fs.existsSync(absPath)) {
    console.error(`  STALE: ${docPath} does not exist (generator may have failed)`);
    results.staleDocs.push(docPath);
    failed = true;
    continue;
  }

  try {
    run(`git diff --exit-code -- "${docPath}"`, { capture: true });
    console.log(`  OK: ${docPath}`);
  } catch (err) {
    console.error(`  STALE: ${docPath} has uncommitted changes after regeneration`);
    results.staleDocs.push(docPath);
    failed = true;
  }
}

if (results.staleDocs.length === 0) {
  console.log("All tracked docs are up to date.");
} else {
  console.error("");
  console.error(
    `${results.staleDocs.length} doc(s) are stale. Run the generator scripts and commit the results.`
  );
}

// ---------------------------------------------------------------------------
// Step 8: Parse chip audit summary and fail if error chips > 0
// ---------------------------------------------------------------------------
separator("Step 8/9: Check chip audit for error chips");

const chipAuditPath = path.join(ROOT, "docs/EXPLORER_CHIP_CONNECTION_AUDIT.md");

if (fs.existsSync(chipAuditPath)) {
  const auditContent = fs.readFileSync(chipAuditPath, "utf8");
  // The summary line looks like:
  //   Summary: N components with explorer config, N chips audited, N error chips, N warning chips.
  const summaryMatch = auditContent.match(
    /(\d+)\s+error\s+chips/i
  );
  if (summaryMatch) {
    const errorChipCount = parseInt(summaryMatch[1], 10);
    results.errorChips = errorChipCount;
    if (errorChipCount > 0) {
      console.error(
        `Chip audit reports ${errorChipCount} error chip(s). These must be resolved.`
      );
      failed = true;
    } else {
      console.log("Chip audit: 0 error chips.");
    }
  } else {
    console.warn(
      "Could not parse error chip count from EXPLORER_CHIP_CONNECTION_AUDIT.md — skipping this check."
    );
    results.errorChips = "parse-error";
  }
} else {
  console.warn(
    "EXPLORER_CHIP_CONNECTION_AUDIT.md not found — skipping error chip check."
  );
  results.errorChips = "missing";
}

// ---------------------------------------------------------------------------
// Step 6: Summary
// ---------------------------------------------------------------------------
separator("Step 9/9: Summary");

console.log(`  Contract check:       ${results.contractCheck}`);
console.log(`  Duplicate story lint: ${results.duplicateStoryLint}`);
console.log(`  Story taxonomy:       ${results.storyTaxonomy}`);
console.log(`  Inspector spec:       ${results.inspectorSpec}`);
console.log(`  Inspector regression: ${results.inspectorRegression}`);
for (const g of results.generators) {
  console.log(`  Generator ${g.script}: ${g.status}`);
}
console.log(
  `  Stale docs:       ${results.staleDocs.length === 0 ? "none" : results.staleDocs.join(", ")}`
);
console.log(
  `  Error chips:      ${typeof results.errorChips === "number" ? results.errorChips : results.errorChips}`
);
console.log("");

if (failed) {
  console.error("CI explorer checks FAILED.");
  process.exit(1);
} else {
  console.log("CI explorer checks PASSED.");
}
