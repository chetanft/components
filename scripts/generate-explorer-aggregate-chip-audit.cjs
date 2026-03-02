#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const glob = require("glob");

const ROOT = path.resolve(__dirname, "..");
const OUT_PATH = path.join(ROOT, "docs/EXPLORER_AGGREGATE_CHIP_AUDIT.md");
const STORY_GLOBS = [
  "src/components/**/*.stories.tsx",
  "src/stories/*.stories.tsx",
];

// ---------------------------------------------------------------------------
// Compound single-variant allowlist
// These are known compound components where multiple child elements in a
// single story still represent ONE variant (e.g. a footer with 3 buttons).
// Key format: "title::storyExportName"
// ---------------------------------------------------------------------------

const COMPOUND_ALLOWLIST = new Set([
  'Molecules/Breadcrumb::WithIcons',
  'Molecules/Breadcrumb::CustomSeparator',
  'Molecules/Calendar::EventCalendar',
  'Organisms/DataEntryTable::WithSelection',
  'Organisms/DataEntryTable::WithActions',
  'Organisms/Footer::ThreeButtons',
  'Organisms/Footer::FourButtons',
  'Organisms/Footer::WithLeftSide',
  'Organisms/Form::HorizontalLayout',
  'Organisms/Form::Default',
  'Organisms/Form::WithValidation',
  'Molecules/Mentions::CustomPrefix',
  'Molecules/Mentions::WithRichContent',
  'Molecules/ToggleGroup::Multiple',
  'Molecules/ToggleGroup::Outline',
  'Components/UploadZone::DifferentFileTypes',
]);

// ---------------------------------------------------------------------------
// Parsing helpers (standalone copies from generate-explorer-chip-audit.cjs)
// ---------------------------------------------------------------------------

function findMatching(source, start, openChar, closeChar) {
  let depth = 0;
  let inSingle = false;
  let inDouble = false;
  let inTemplate = false;
  let escaped = false;
  for (let i = start; i < source.length; i++) {
    const ch = source[i];
    if (escaped) { escaped = false; continue; }
    if (ch === "\\") { escaped = true; continue; }
    if (!inDouble && !inTemplate && ch === "'") { inSingle = !inSingle; continue; }
    if (!inSingle && !inTemplate && ch === '"') { inDouble = !inDouble; continue; }
    if (!inSingle && !inDouble && ch === "`") { inTemplate = !inTemplate; continue; }
    if (inSingle || inDouble || inTemplate) continue;
    if (ch === openChar) depth++;
    if (ch === closeChar) {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function extractBlock(source, key, openChar, closeChar) {
  const keyIdx = source.indexOf(key);
  if (keyIdx === -1) return null;
  const openIdx = source.indexOf(openChar, keyIdx);
  if (openIdx === -1) return null;
  const endIdx = findMatching(source, openIdx, openChar, closeChar);
  if (endIdx === -1) return null;
  return {
    body: source.slice(openIdx, endIdx + 1),
    inner: source.slice(openIdx + 1, endIdx),
  };
}

function extractTitle(source) {
  const m = source.match(/\btitle\s*:\s*['"]([^'"]+)['"]/);
  return m ? m[1] : null;
}

function componentNameFromTitle(title, relPath) {
  if (title) {
    const last = title.split("/").pop();
    if (last) return last;
  }
  return path.basename(relPath).replace(/\.stories\.tsx$/, "");
}

function extractExports(source) {
  const exports = new Map();
  const exportConstRe =
    /export\s+const\s+(\w+)\s*[:=][\s\S]*?(?=(?:\nexport\s+const|\nexport\s+function|\nexport\s+default|$))/g;
  let m;
  while ((m = exportConstRe.exec(source)) !== null) {
    const name = m[1];
    const block = m[0];
    const hasRender =
      /render\s*:\s*\(/.test(block) || /render\s*:\s*[\w(]/.test(block);
    const hasArgs = /\bargs\s*:/.test(block);
    let kind = "unknown";
    if (hasRender && hasArgs) kind = "render+args";
    else if (hasRender) kind = "render";
    else if (hasArgs) kind = "args";
    exports.set(name, { kind, hasArgs, block });
  }
  const exportFnRe = /export\s+function\s+(\w+)\s*\(/g;
  while ((m = exportFnRe.exec(source)) !== null) {
    if (!exports.has(m[1]))
      exports.set(m[1], { kind: "function", hasArgs: false, block: "" });
  }
  return exports;
}

function parseRows(explorerInner) {
  const rowsStart = explorerInner.indexOf("rows");
  if (rowsStart === -1) return [];
  const arrStart = explorerInner.indexOf("[", rowsStart);
  if (arrStart === -1) return [];
  const arrEnd = findMatching(explorerInner, arrStart, "[", "]");
  if (arrEnd === -1) return [];
  const rowsInner = explorerInner.slice(arrStart + 1, arrEnd);

  const rows = [];
  for (let i = 0; i < rowsInner.length; i++) {
    if (rowsInner[i] !== "{") continue;
    const rowEnd = findMatching(rowsInner, i, "{", "}");
    if (rowEnd === -1) break;
    const rowBlock = rowsInner.slice(i, rowEnd + 1);
    const rowId =
      (rowBlock.match(/\bid\s*:\s*['"]([^'"]+)['"]/) || [])[1] || "";
    const rowLabel =
      (rowBlock.match(/\blabel\s*:\s*['"]([^'"]+)['"]/) || [])[1] || rowId;

    const scenariosMatch = rowBlock.match(/scenarios\s*:\s*\[/);
    const scenarios = [];
    if (scenariosMatch) {
      const localStart = rowBlock.indexOf("[", scenariosMatch.index);
      const localEnd = findMatching(rowBlock, localStart, "[", "]");
      const scenariosInner = rowBlock.slice(localStart + 1, localEnd);
      for (let j = 0; j < scenariosInner.length; j++) {
        if (scenariosInner[j] !== "{") continue;
        const sEnd = findMatching(scenariosInner, j, "{", "}");
        if (sEnd === -1) break;
        const sBlock = scenariosInner.slice(j, sEnd + 1);
        const sId =
          (sBlock.match(/\bid\s*:\s*['"]([^'"]+)['"]/) || [])[1] || "";
        const sLabel =
          (sBlock.match(/\blabel\s*:\s*['"]([^'"]+)['"]/) || [])[1] || sId;
        const sStory =
          (sBlock.match(/\bstory\s*:\s*['"]([^'"]+)['"]/) || [])[1];
        const hasArgs = /\bargs\s*:\s*\{/.test(sBlock);
        scenarios.push({ id: sId, label: sLabel, story: sStory, hasArgs });
        j = sEnd;
      }
    }
    rows.push({ id: rowId, label: rowLabel, scenarios });
    i = rowEnd;
  }
  return rows;
}

// ---------------------------------------------------------------------------
// Aggregate detection logic
// ---------------------------------------------------------------------------

const AGGREGATE_LABEL_PATTERNS = [
  /^variants$/i,
  /^states$/i,
  /^usage\s*examples?$/i,
  /^gallery$/i,
  /^comparison$/i,
  /^all\b/i,
  /^overview$/i,
  /^demo$/i,
  /^examples$/i,
];

function matchesAggregateLabel(text) {
  return AGGREGATE_LABEL_PATTERNS.some((re) => re.test(text));
}

/**
 * Inspect the story export block for patterns indicating multiple rendered
 * instances of a component.
 *
 * Returns { isAggregate: boolean, reasons: string[] }
 */
function analyzeStoryBody(block) {
  if (!block || block.length < 50) {
    return { isAggregate: false, tooShort: true, reasons: [] };
  }

  const reasons = [];

  // 1. Multiple JSX instances of same component: look for <ComponentName
  //    appearing 3+ times. We look for any capitalised JSX tag.
  const jsxTags = block.match(/<[A-Z]\w*/g) || [];
  const tagCounts = {};
  for (const tag of jsxTags) {
    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
  }
  for (const [tag, count] of Object.entries(tagCounts)) {
    if (count >= 3) {
      reasons.push(`${tag} appears ${count}x in story body`);
    }
  }

  // 2. Grid/flex wrapper patterns with multiple children
  if (
    /grid-cols/i.test(block) ||
    /flex\s+gap|flex\s.*gap|gap-\d/i.test(block) ||
    /space-y-\d|space-x-\d/i.test(block)
  ) {
    // Count top-level sibling components inside the wrapper
    const siblingJsx = jsxTags.length;
    if (siblingJsx >= 3) {
      reasons.push(
        `Layout wrapper (grid/flex/space) with ${siblingJsx} JSX elements`
      );
    }
  }

  // 3. Section headings appearing 2+ times
  const sectionHeadings =
    block.match(/<(?:p|div|span|h[1-6])\s[^>]*(?:font-medium|font-semibold)[^>]*/g) || [];
  if (sectionHeadings.length >= 2) {
    reasons.push(
      `${sectionHeadings.length} section headings (font-medium/font-semibold) found`
    );
  }

  // 4. Map/iteration patterns
  if (/\.map\s*\(/.test(block)) {
    reasons.push("Contains .map() iteration pattern");
  }

  return { isAggregate: reasons.length > 0, tooShort: false, reasons };
}

/**
 * Classify a single chip/scenario.
 *
 * Returns { classification, reasons, risk }
 * classification: "single-preview-safe" | "aggregate-likely" | "manual-review"
 */
function classifyChip(scenario, rowIndex, rows, exports, baseStory) {
  // Skip rule 1: chips using ExplorerBase (or baseStory) as their story WITH args
  if (scenario.hasArgs) {
    return {
      classification: "single-preview-safe",
      reasons: ["Chip has inline args (ExplorerBase pattern)"],
      risk: "none",
    };
  }

  // Skip rule 2: first chip in first row pointing to a story without args
  if (rowIndex === 0 && !scenario.hasArgs) {
    const firstRow = rows[0];
    if (
      firstRow &&
      firstRow.scenarios.length > 0 &&
      firstRow.scenarios[0].id === scenario.id
    ) {
      return {
        classification: "single-preview-safe",
        reasons: ["First chip in first row (connected-via-first-row-story)"],
        risk: "none",
      };
    }
  }

  const storyName = scenario.story || "";
  const chipLabel = scenario.label || "";

  // Label heuristics
  const labelMatch =
    matchesAggregateLabel(chipLabel) || matchesAggregateLabel(storyName);

  // Body heuristics
  const exportInfo = storyName ? exports.get(storyName) : undefined;
  const bodyBlock = exportInfo ? exportInfo.block : "";
  const bodyAnalysis = analyzeStoryBody(bodyBlock);

  if (bodyAnalysis.tooShort && !exportInfo) {
    return {
      classification: "manual-review",
      reasons: ["Story export not found or body too short to analyze"],
      risk: "unknown",
    };
  }

  if (bodyAnalysis.tooShort && exportInfo) {
    return {
      classification: "manual-review",
      reasons: ["Story body too short to analyze (<50 chars)"],
      risk: "unknown",
    };
  }

  const allReasons = [];
  if (labelMatch) allReasons.push(`Label/story name matches aggregate pattern`);
  allReasons.push(...bodyAnalysis.reasons);

  if (labelMatch || bodyAnalysis.isAggregate) {
    return {
      classification: "aggregate-likely",
      reasons: allReasons,
      risk: "high",
    };
  }

  return {
    classification: "single-preview-safe",
    reasons: ["No aggregate patterns detected"],
    risk: "none",
  };
}

// ---------------------------------------------------------------------------
// Bucket assignment
// ---------------------------------------------------------------------------

/**
 * For aggregate-likely chips, assign to a remediation bucket.
 */
function assignBucket(chip, exports) {
  const storyName = chip.story || "";

  // Bucket C: standard doc stories that should be removed from explorer
  const bucketCPatterns = [/^Variants$/i, /^States$/i, /^AllVariants$/i];
  if (bucketCPatterns.some((re) => re.test(storyName))) {
    return "C";
  }

  // Bucket A: there's another single-variant story that could replace it
  // Look for a Default, Primary, or simple story alternative
  const alternatives = [];
  for (const [name, info] of exports.entries()) {
    if (name === storyName) continue;
    // Prefer stories with args or simple stories
    if (
      info.hasArgs ||
      /^Default$|^Primary$|^Basic$|^Simple$/i.test(name)
    ) {
      alternatives.push(name);
    }
  }

  if (alternatives.length > 0) {
    return "A";
  }

  // Bucket B: needs ExplorerBase + args migration
  return "B";
}

// ---------------------------------------------------------------------------
// File scanning
// ---------------------------------------------------------------------------

function isDocsOnly(source) {
  // Only check meta-level parameters (before export default), not individual stories
  const metaEnd = source.indexOf("export default meta");
  if (metaEnd === -1) return false;
  return /\bdocsOnly\s*:\s*true\b/.test(source.slice(0, metaEnd));
}

function scanFile(absPath) {
  const source = fs.readFileSync(absPath, "utf8");
  const relPath = path.relative(ROOT, absPath);
  if (isDocsOnly(source)) return null;
  const explorer = extractBlock(source, "explorer", "{", "}");
  if (!explorer) return null;

  const title = extractTitle(source);
  const component = componentNameFromTitle(title, relPath);
  const baseStory =
    (explorer.inner.match(/\bbaseStory\s*:\s*['"]([^'"]+)['"]/) || [])[1];
  const exports = extractExports(source);
  const rows = parseRows(explorer.inner);

  const chips = [];
  rows.forEach((row, rowIndex) => {
    row.scenarios.forEach((s) => {
      const result = classifyChip(s, rowIndex, rows, exports, baseStory);
      let bucket = null;
      let suggestedStory = null;

      // Check compound allowlist before bucket assignment
      const allowlistKey = title ? `${title}::${s.story || ""}` : null;
      if (
        result.classification === "aggregate-likely" &&
        allowlistKey &&
        COMPOUND_ALLOWLIST.has(allowlistKey)
      ) {
        result.classification = "compound-single-preview";
        result.risk = "none";
        result.reasons = ["Allowed compound component (multi-child = one variant)"];
      }

      if (result.classification === "aggregate-likely") {
        bucket = assignBucket(
          { story: s.story, label: s.label },
          exports
        );
        if (bucket === "A") {
          // Find a suggested replacement
          for (const [name, info] of exports.entries()) {
            if (name === s.story) continue;
            if (
              info.hasArgs ||
              /^Default$|^Primary$|^Basic$|^Simple$/i.test(name)
            ) {
              suggestedStory = name;
              break;
            }
          }
        }
      } else if (result.classification === "manual-review") {
        bucket = "D";
      }

      chips.push({
        rowIndex,
        rowLabel: row.label,
        chipId: s.id,
        chipLabel: s.label,
        story: s.story || "—",
        hasArgs: s.hasArgs,
        classification: result.classification,
        reasons: result.reasons,
        risk: result.risk,
        bucket,
        suggestedStory,
      });
    });
  });

  return {
    component,
    relPath,
    baseStory: baseStory || "—",
    rows,
    chips,
    exports,
  };
}

function dedupeByComponent(records) {
  const byName = new Map();
  for (const r of records) {
    const arr = byName.get(r.component) || [];
    arr.push(r);
    byName.set(r.component, arr);
  }
  const out = [];
  for (const arr of byName.values()) {
    arr.sort((a, b) => {
      const aCfg = a.rows.length > 0 ? 0 : 1;
      const bCfg = b.rows.length > 0 ? 0 : 1;
      if (aCfg !== bCfg) return aCfg - bCfg;
      const aPath = a.relPath.startsWith("src/components/") ? 0 : 1;
      const bPath = b.relPath.startsWith("src/components/") ? 0 : 1;
      if (aPath !== bPath) return aPath - bPath;
      return a.relPath.localeCompare(b.relPath);
    });
    out.push(arr[0]);
  }
  return out.sort((a, b) => a.component.localeCompare(b.component));
}

// ---------------------------------------------------------------------------
// Report generation
// ---------------------------------------------------------------------------

function buildDoc(records) {
  let totalChips = 0;
  let aggregateCount = 0;
  let manualCount = 0;
  let safeCount = 0;
  let compoundCount = 0;

  const bucketA = [];
  const bucketB = [];
  const bucketC = [];
  const bucketD = [];
  const compoundAllowed = [];

  for (const r of records) {
    for (const c of r.chips) {
      totalChips++;
      if (c.classification === "compound-single-preview") {
        compoundCount++;
        compoundAllowed.push({ ...c, component: r.component });
      } else if (c.classification === "aggregate-likely") {
        aggregateCount++;
        if (c.bucket === "A") bucketA.push({ ...c, component: r.component });
        else if (c.bucket === "B") bucketB.push({ ...c, component: r.component });
        else if (c.bucket === "C") bucketC.push({ ...c, component: r.component });
      } else if (c.classification === "manual-review") {
        manualCount++;
        bucketD.push({ ...c, component: r.component });
      } else {
        safeCount++;
      }
    }
  }

  const lines = [];
  lines.push("# Explorer Aggregate Chip Audit");
  lines.push("");
  lines.push(
    "Purpose: Detect explorer chips that likely render multi-variant previews instead of single-variant previews."
  );
  lines.push("");
  lines.push(
    `Summary: ${records.length} components scanned, ${totalChips} chips audited, ${aggregateCount} aggregate-likely, ${compoundCount} compound-allowed, ${manualCount} manual-review.`
  );
  lines.push("");

  // Remediation Buckets
  lines.push("## Remediation Buckets");
  lines.push("");

  // Bucket A
  lines.push("### Bucket A — Repoint to existing single-variant story");
  lines.push("");
  if (bucketA.length === 0) {
    lines.push("_No chips in this bucket._");
  } else {
    lines.push(
      "| Component | Row | Chip | Current Story | Suggested Story | Reason |"
    );
    lines.push("|---|---|---|---|---|---|");
    for (const c of bucketA) {
      lines.push(
        `| ${c.component} | ${c.rowLabel} | ${c.chipLabel} | ${c.story} | ${c.suggestedStory || "—"} | ${c.reasons.join("; ")} |`
      );
    }
  }
  lines.push("");

  // Bucket B
  lines.push("### Bucket B — Needs ExplorerBase + args migration");
  lines.push("");
  if (bucketB.length === 0) {
    lines.push("_No chips in this bucket._");
  } else {
    lines.push("| Component | Row | Chip | Current Story | Reason |");
    lines.push("|---|---|---|---|---|");
    for (const c of bucketB) {
      lines.push(
        `| ${c.component} | ${c.rowLabel} | ${c.chipLabel} | ${c.story} | ${c.reasons.join("; ")} |`
      );
    }
  }
  lines.push("");

  // Bucket C
  lines.push(
    "### Bucket C — Intentionally aggregate (remove from explorer or keep for docs)"
  );
  lines.push("");
  if (bucketC.length === 0) {
    lines.push("_No chips in this bucket._");
  } else {
    lines.push("| Component | Row | Chip | Current Story | Reason |");
    lines.push("|---|---|---|---|---|");
    for (const c of bucketC) {
      lines.push(
        `| ${c.component} | ${c.rowLabel} | ${c.chipLabel} | ${c.story} | ${c.reasons.join("; ")} |`
      );
    }
  }
  lines.push("");

  // Bucket D
  lines.push("### Bucket D — Manual review");
  lines.push("");
  if (bucketD.length === 0) {
    lines.push("_No chips in this bucket._");
  } else {
    lines.push("| Component | Row | Chip | Current Story | Reason |");
    lines.push("|---|---|---|---|---|");
    for (const c of bucketD) {
      lines.push(
        `| ${c.component} | ${c.rowLabel} | ${c.chipLabel} | ${c.story} | ${c.reasons.join("; ")} |`
      );
    }
  }
  lines.push("");

  // Compound Single-Preview (Allowed)
  lines.push("### Compound Single-Preview (Allowed)");
  lines.push("");
  if (compoundAllowed.length === 0) {
    lines.push("_No chips in this bucket._");
  } else {
    lines.push("| Component | Row | Chip | Story | Reason |");
    lines.push("|---|---|---|---|---|");
    for (const c of compoundAllowed) {
      lines.push(
        `| ${c.component} | ${c.rowLabel} | ${c.chipLabel} | ${c.story} | ${c.reasons.join("; ")} |`
      );
    }
  }
  lines.push("");

  // Full Chip Classification per component
  lines.push("## Full Chip Classification");
  lines.push("");

  for (const r of records) {
    lines.push(`### ${r.component}`);
    lines.push(`- Story file: \`${r.relPath}\``);
    lines.push(`- baseStory: ${r.baseStory}`);
    lines.push("");
    lines.push("| Row | Chip | Story | Classification | Reason | Risk |");
    lines.push("|---|---|---|---|---|---|");
    for (const c of r.chips) {
      lines.push(
        `| ${c.rowLabel} | ${c.chipLabel} | ${c.story} | ${c.classification} | ${c.reasons.join("; ")} | ${c.risk} |`
      );
    }
    lines.push("");
  }

  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const files = Array.from(
    new Set(
      STORY_GLOBS.flatMap((g) => glob.sync(g, { cwd: ROOT, absolute: true }))
    )
  );
  const scanned = files.map(scanFile).filter(Boolean);
  const withExplorer = scanned.filter((r) => r.rows.length > 0);
  const deduped = dedupeByComponent(withExplorer);
  const doc = buildDoc(deduped);
  fs.writeFileSync(OUT_PATH, doc, "utf8");

  // Print summary
  let totalChips = 0;
  let aggregateCount = 0;
  let compoundCount = 0;
  let manualCount = 0;
  for (const r of deduped) {
    for (const c of r.chips) {
      totalChips++;
      if (c.classification === "aggregate-likely") aggregateCount++;
      else if (c.classification === "compound-single-preview") compoundCount++;
      else if (c.classification === "manual-review") manualCount++;
    }
  }
  console.log(
    `Wrote ${path.relative(ROOT, OUT_PATH)}`
  );
  console.log(
    `Summary: ${deduped.length} components scanned, ${totalChips} chips audited, ${aggregateCount} aggregate-likely, ${compoundCount} compound-allowed, ${manualCount} manual-review.`
  );
}

main();
