#!/usr/bin/env node
/**
 * CI Story Taxonomy Checks
 *
 * Validates story naming and taxonomy conventions across the repo.
 * Currently advisory (warnings only) — will become blocking after baseline cleanup.
 *
 * Checks:
 *   1. No aggregate names without Docs prefix (Variants, States, Sizes, etc.)
 *   2. ExplorerBase exports only in files with explorer config
 *   3. Docs-prefixed stories should not appear in explorer scenario refs
 *   4. LIST_STORY_NORMALIZATION_AUDIT.md is not stale
 *
 * Usage: node scripts/ci-story-taxonomy-checks.cjs [--strict]
 */
const fs = require("fs");
const path = require("path");
const glob = require("glob");
const { execSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const STRICT = process.argv.includes("--strict");

const STORY_GLOBS = [
  "src/components/**/*.stories.tsx",
  "src/stories/*.stories.tsx",
];

// Aggregate names that must be Docs-prefixed
const AGGREGATE_NAMES_RE = /^(Variants|States|Sizes|AllVariants|AllTypes|AllSizes|AllStates|UsageExamples|AllIcons|AllLogos|GraphicVariants|FooterVariants|ThemeComparison|VariantShowcase|TypeShowcase|AllVariations|Overview|Dashboard|Journey|InteractiveDemo|Comparison|Demo|Gallery|Showcase)$/;

let warnings = 0;
let errors = 0;

function warn(msg) {
  console.log(`  ⚠ ${msg}`);
  warnings++;
}

function error(msg) {
  console.log(`  ✗ ${msg}`);
  errors++;
}

function pass(msg) {
  console.log(`  ✓ ${msg}`);
}

// ─── Check 1: Aggregate names without Docs prefix ──────────────────────────

function checkAggregateNames() {
  console.log("\n── Check 1: Aggregate names without Docs prefix ──");

  const allFiles = [];
  for (const g of STORY_GLOBS) {
    allFiles.push(...glob.sync(g, { cwd: ROOT }));
  }

  let violations = 0;
  for (const relPath of allFiles.sort()) {
    const fullPath = path.join(ROOT, relPath);
    const source = fs.readFileSync(fullPath, "utf8");

    const exportRe = /export\s+(?:const|function)\s+(\w+)/g;
    let m;
    while ((m = exportRe.exec(source)) !== null) {
      const name = m[1];
      if (name === "default") continue;
      if (/^Docs[A-Z]/.test(name)) continue; // Already prefixed
      if (AGGREGATE_NAMES_RE.test(name)) {
        warn(`${relPath}: "${name}" is an aggregate name — rename to "Docs${name}"`);
        violations++;
      }
    }
  }

  if (violations === 0) {
    pass("No aggregate names without Docs prefix found");
  } else {
    warn(`${violations} aggregate names need Docs prefix`);
  }
}

// ─── Check 2: ExplorerBase without explorer config ──────────────────────────

function checkExplorerBase() {
  console.log("\n── Check 2: ExplorerBase consistency ──");

  const allFiles = [];
  for (const g of STORY_GLOBS) {
    allFiles.push(...glob.sync(g, { cwd: ROOT }));
  }

  let violations = 0;
  for (const relPath of allFiles.sort()) {
    const fullPath = path.join(ROOT, relPath);
    const source = fs.readFileSync(fullPath, "utf8");

    const hasExplorerBase = /export\s+(?:const|function)\s+ExplorerBase\b/.test(source);
    const hasExplorerConfig = /explorer\s*:\s*\{/.test(source) && /rows\s*:\s*\[/.test(source);

    if (hasExplorerBase && !hasExplorerConfig) {
      warn(`${relPath}: has ExplorerBase export but no explorer config`);
      violations++;
    }
  }

  if (violations === 0) {
    pass("All ExplorerBase exports have matching explorer config");
  }
}

// ─── Check 3: Docs stories in explorer scenarios ────────────────────────────

function checkDocsInExplorer() {
  console.log("\n── Check 3: Docs-prefixed stories not in explorer scenarios ──");

  const allFiles = [];
  for (const g of STORY_GLOBS) {
    allFiles.push(...glob.sync(g, { cwd: ROOT }));
  }

  let violations = 0;
  for (const relPath of allFiles.sort()) {
    const fullPath = path.join(ROOT, relPath);
    const source = fs.readFileSync(fullPath, "utf8");

    // Find all story references in explorer scenarios
    const storyRefRe = /story\s*:\s*['"](\w+)['"]/g;
    let m;
    while ((m = storyRefRe.exec(source)) !== null) {
      const storyName = m[1];
      if (/^Docs[A-Z]/.test(storyName)) {
        error(`${relPath}: explorer scenario references Docs story "${storyName}" — Docs stories must not be in explorer`);
        violations++;
      }
    }
  }

  if (violations === 0) {
    pass("No Docs-prefixed stories referenced in explorer scenarios");
  }
}

// ─── Check 4: Audit doc staleness ───────────────────────────────────────────

function checkAuditStaleness() {
  console.log("\n── Check 4: LIST_STORY_NORMALIZATION_AUDIT.md staleness ──");

  const auditPath = "docs/LIST_STORY_NORMALIZATION_AUDIT.md";

  try {
    // Regenerate
    execSync("node scripts/generate-list-story-normalization-audit.cjs", {
      cwd: ROOT,
      encoding: "utf8",
      stdio: "pipe",
    });

    // Check diff
    try {
      const diff = execSync(`git diff --stat -- ${auditPath}`, {
        cwd: ROOT,
        encoding: "utf8",
        stdio: "pipe",
      });

      if (diff.trim()) {
        warn(`${auditPath} is stale — regenerate with: node scripts/generate-list-story-normalization-audit.cjs`);
      } else {
        pass("LIST_STORY_NORMALIZATION_AUDIT.md is up to date");
      }
    } catch {
      // File might be untracked
      pass("LIST_STORY_NORMALIZATION_AUDIT.md generated (untracked)");
    }
  } catch (e) {
    error(`Failed to regenerate audit: ${e.message}`);
  }
}

// ─── Main ───────────────────────────────────────────────────────────────────

console.log("Story Taxonomy Checks");
console.log("=====================");

checkAggregateNames();
checkExplorerBase();
checkDocsInExplorer();
checkAuditStaleness();

console.log("\n── Summary ──");
console.log(`  Warnings: ${warnings}`);
console.log(`  Errors: ${errors}`);

if (errors > 0) {
  console.log("\n✗ Story taxonomy checks failed (errors found)");
  process.exit(1);
} else if (STRICT && warnings > 0) {
  console.log("\n✗ Story taxonomy checks failed (strict mode, warnings present)");
  process.exit(1);
} else if (warnings > 0) {
  console.log("\n⚠ Story taxonomy checks passed with warnings (advisory)");
  process.exit(0);
} else {
  console.log("\n✓ All story taxonomy checks passed");
  process.exit(0);
}
