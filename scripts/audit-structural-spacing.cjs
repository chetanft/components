#!/usr/bin/env node
"use strict";

/**
 * Structural spacing audit.
 *
 * Detects structural issues that token-literal audits cannot catch:
 * 1) Containers with border/background but no direct padding utilities
 * 2) Spacer usage inside flex-col contexts (potential spacer-as-padding anti-pattern)
 *
 * Modes:
 * - Default: prints + writes markdown/json, exits 0.
 * - CI strict: --ci (fails if any issue)
 * - CI baseline-aware: --ci --baseline <json> (fails on regressions only)
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function parseArgs(argv) {
  const args = {
    ci: false,
    baseline: null,
    jsonOut: path.join(process.cwd(), "docs/audits/spacing-structure-latest.json"),
    mdOut: path.join(process.cwd(), "docs/audits/spacing-structure-latest.md"),
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--ci") args.ci = true;
    else if (arg === "--baseline") args.baseline = argv[++i];
    else if (arg === "--json-out") args.jsonOut = argv[++i];
    else if (arg === "--md-out") args.mdOut = argv[++i];
  }

  return args;
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function shouldSkip(relativePath) {
  return (
    relativePath.includes("node_modules") ||
    relativePath.includes("dist") ||
    relativePath.includes(".stories.") ||
    relativePath.includes(".test.") ||
    relativePath.includes(".spec.")
  );
}

function classLooksBorderOrBg(classStr) {
  return /\bborder(?:-[a-z0-9-]+)?\b|\bbg-\[var\(--|\bbg-[a-z0-9-]+\b/i.test(classStr);
}

function classHasDirectPadding(classStr) {
  return /\bp(?:x|y|t|r|b|l)?-\[var\(--spacing-x[0-9-]+\)\]|\bp(?:x|y|t|r|b|l)?-x[0-9-]+\b/i.test(classStr);
}

function classHasFlexCol(classStr) {
  return /\bflex\b/.test(classStr) && /\bflex-col\b/.test(classStr);
}

function lineAt(text, index) {
  return text.slice(0, index).split("\n").length;
}

function readClassTokens(content) {
  const results = [];

  // className="..."
  const plain = /className\s*=\s*["']([^"']+)["']/g;
  let m;
  while ((m = plain.exec(content)) !== null) {
    results.push({ classes: m[1], index: m.index, source: "className" });
  }

  // className={cn("...", "...")}
  const cnCall = /className\s*=\s*\{cn\(([\s\S]*?)\)\}/g;
  while ((m = cnCall.exec(content)) !== null) {
    const chunk = m[1];
    const q = /["']([^"']+)["']/g;
    let qMatch;
    while ((qMatch = q.exec(chunk)) !== null) {
      results.push({ classes: qMatch[1], index: m.index + qMatch.index, source: "cn" });
    }
  }

  return results;
}

function analyzeFile(absPath, rootDir) {
  const relativePath = path.relative(rootDir, absPath);
  if (shouldSkip(relativePath)) return null;

  const content = fs.readFileSync(absPath, "utf8");
  const findings = {
    file: relativePath.replace(/\\/g, "/"),
    missingDirectPadding: [],
    spacerInFlexCol: [],
  };

  const classes = readClassTokens(content);
  for (const entry of classes) {
    if (classLooksBorderOrBg(entry.classes) && !classHasDirectPadding(entry.classes)) {
      findings.missingDirectPadding.push({
        line: lineAt(content, entry.index),
        classes: entry.classes,
        note: "Container has border/background utility but no direct padding utility.",
      });
    }
  }

  // Detect flex-col class context locations
  const flexColLines = new Set();
  for (const entry of classes) {
    if (classHasFlexCol(entry.classes)) {
      flexColLines.add(lineAt(content, entry.index));
    }
  }

  // Spacer usage lines
  const spacerRegex = /<Spacer\b[\s\S]*?\/>/g;
  let s;
  while ((s = spacerRegex.exec(content)) !== null) {
    const spacerLine = lineAt(content, s.index);
    // Heuristic: if spacer appears within ~20 lines after a flex-col declaration, flag
    const nearFlexCol = [...flexColLines].some((l) => Math.abs(l - spacerLine) <= 20);
    if (nearFlexCol) {
      findings.spacerInFlexCol.push({
        line: spacerLine,
        snippet: s[0].replace(/\s+/g, " ").trim(),
        note: "Spacer used inside/near flex-col context; review if direct container padding/gap is preferable.",
      });
    }
  }

  const total =
    findings.missingDirectPadding.length +
    findings.spacerInFlexCol.length;
  if (total === 0) return null;
  return findings;
}

function summarize(results) {
  const summary = {
    filesWithIssues: results.length,
    totalIssues: 0,
    categories: {
      missingDirectPadding: 0,
      spacerInFlexCol: 0,
    },
    files: {},
  };

  for (const r of results) {
    const fileSummary = {
      missingDirectPadding: r.missingDirectPadding.length,
      spacerInFlexCol: r.spacerInFlexCol.length,
      totalIssues: r.missingDirectPadding.length + r.spacerInFlexCol.length,
    };
    summary.categories.missingDirectPadding += fileSummary.missingDirectPadding;
    summary.categories.spacerInFlexCol += fileSummary.spacerInFlexCol;
    summary.totalIssues += fileSummary.totalIssues;
    summary.files[r.file] = fileSummary;
  }

  return summary;
}

function generateMarkdown(results, summary) {
  const lines = [];
  lines.push("# Structural Spacing Audit Report");
  lines.push("");
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push(`- Files with issues: ${summary.filesWithIssues}`);
  lines.push(`- Total issues: ${summary.totalIssues}`);
  lines.push(`- Missing direct padding: ${summary.categories.missingDirectPadding}`);
  lines.push(`- Spacer in flex-col context: ${summary.categories.spacerInFlexCol}`);
  lines.push("");
  lines.push("## Findings");
  lines.push("");

  for (const r of results) {
    lines.push(`### ${r.file}`);
    lines.push("");
    if (r.missingDirectPadding.length) {
      lines.push(`#### Missing Direct Padding (${r.missingDirectPadding.length})`);
      lines.push("");
      for (const item of r.missingDirectPadding) {
        lines.push(`- Line ${item.line}: \`${item.classes}\``);
      }
      lines.push("");
    }
    if (r.spacerInFlexCol.length) {
      lines.push(`#### Spacer In Flex-Col (${r.spacerInFlexCol.length})`);
      lines.push("");
      for (const item of r.spacerInFlexCol) {
        lines.push(`- Line ${item.line}: \`${item.snippet}\``);
      }
      lines.push("");
    }
    lines.push("---");
    lines.push("");
  }

  return `${lines.join("\n").trim()}\n`;
}

function readBaseline(filePath) {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.summary || !parsed.summary.categories || !parsed.summary.files) {
      throw new Error("Invalid baseline schema");
    }
    return parsed;
  } catch (error) {
    console.error(`❌ Unable to read baseline at ${filePath}: ${error.message}`);
    process.exit(1);
  }
}

function compareWithBaseline(currentSummary, baselineSummary) {
  const regressions = [];
  const keys = ["missingDirectPadding", "spacerInFlexCol"];

  for (const key of keys) {
    const before = baselineSummary.categories[key] || 0;
    const after = currentSummary.categories[key] || 0;
    if (after > before) {
      regressions.push(`Category regression: ${key} ${before} -> ${after}`);
    }
  }

  for (const [file, current] of Object.entries(currentSummary.files)) {
    const baseline = baselineSummary.files[file];
    if (!baseline && current.totalIssues > 0) {
      regressions.push(`New file with structural spacing issues: ${file} (${current.totalIssues})`);
      continue;
    }
    if (!baseline) continue;

    for (const key of keys) {
      const before = baseline[key] || 0;
      const after = current[key] || 0;
      if (after > before) {
        regressions.push(`File regression: ${file} ${key} ${before} -> ${after}`);
      }
    }
  }

  return regressions;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const root = process.cwd();
  const componentsDir = path.join(root, "src", "components");

  const files = execSync(`find "${componentsDir}" -type f \\( -name "*.tsx" -o -name "*.ts" \\)`, {
    encoding: "utf8",
  })
    .trim()
    .split("\n")
    .filter(Boolean);

  const results = files
    .map((file) => analyzeFile(file, root))
    .filter(Boolean)
    .sort((a, b) => a.file.localeCompare(b.file));

  const summary = summarize(results);
  const report = {
    generatedAt: new Date().toISOString(),
    summary,
    results,
  };

  ensureDir(args.jsonOut);
  ensureDir(args.mdOut);
  fs.writeFileSync(args.jsonOut, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(args.mdOut, generateMarkdown(results, summary));

  console.log("Structural spacing audit:");
  console.log(`- Files with issues: ${summary.filesWithIssues}`);
  console.log(`- Total issues: ${summary.totalIssues}`);
  console.log(`- Missing direct padding: ${summary.categories.missingDirectPadding}`);
  console.log(`- Spacer in flex-col: ${summary.categories.spacerInFlexCol}`);
  console.log(`- JSON: ${path.relative(root, args.jsonOut)}`);
  console.log(`- Markdown: ${path.relative(root, args.mdOut)}`);

  if (!args.ci) return;

  if (args.baseline) {
    const baseline = readBaseline(args.baseline);
    const regressions = compareWithBaseline(summary, baseline.summary);
    if (regressions.length) {
      console.error("\n❌ Structural spacing audit regression against baseline:");
      regressions.forEach((line) => console.error(`- ${line}`));
      process.exit(1);
    }
    console.log("\n✅ No structural spacing regressions against baseline.");
    return;
  }

  if (summary.totalIssues > 0) {
    console.error("\n❌ Structural spacing audit failed in strict CI mode.");
    process.exit(1);
  }
  console.log("\n✅ Structural spacing audit passed in strict CI mode.");
}

main();

