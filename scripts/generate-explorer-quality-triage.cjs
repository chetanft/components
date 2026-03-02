#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const glob = require("glob");

const ROOT = path.resolve(__dirname, "..");
const OUT_PATH = path.join(ROOT, "docs/EXPLORER_QUALITY_TRIAGE.md");
const STORY_GLOBS = ["src/components/**/*.stories.tsx", "src/stories/*.stories.tsx"];

// ---------------------------------------------------------------------------
// Standard taxonomy (from generate-explorer-taxonomy-audit.cjs)
// ---------------------------------------------------------------------------
const STANDARD_ROW_NAMES = new Set([
  "Type", "Style", "Size", "State", "Shape", "Content",
  "Behavior", "Placement", "Theme", "Layout", "Data", "Format", "Tone", "Brand",
  "Branding", "Filter Type", "Comparison", "Grid",
]);

const ROW_ALIASES = {
  "States": "State",
  "Theme Mode": "Theme",
  "Filter Type": "Behavior",
};

const AGGREGATE_PATTERNS = [
  /^Variants$/i, /^States$/i, /^Usage Examples$/i, /^All\s/i,
  /^Gallery$/i, /^Comparison$/i, /^Overview$/i, /^Demo$/i,
  /^Examples$/i, /^Variant Showcase$/i, /^State Showcase$/i,
  /^Size Showcase$/i, /^Type Showcase$/i, /^Item States$/i, /^Sizes$/i,
];

// Compound components that legitimately use aggregate-style names
const COMPOUND_ALLOWLIST = new Set([
  "NavigationPopover", // "Overview" is a menu section name, not an aggregate
]);

// ---------------------------------------------------------------------------
// Family classification
// ---------------------------------------------------------------------------
const FAMILY_MAP = {
  "Input/Forms": new Set([
    "Input", "Textarea", "InputNumber", "Dropdown", "DatePicker",
    "TimePicker", "TreeSelect", "Cascader", "Form", "Mentions", "Label",
    "ColorPicker", "DropdownMenu",
  ]),
  "Selection Controls": new Set([
    "Checkbox", "Switch", "RadioGroup", "RadioSelector", "Toggle",
    "ToggleGroup", "Transfer", "Rate",
  ]),
  "Feedback/Overlays": new Set([
    "Alert", "Notification", "Tooltip", "Popconfirm", "Modal", "Drawer",
    "Tour", "HoverCard",
  ]),
  "Navigation/Layout": new Set([
    "Tabs", "PageHeader", "NavigationPopover", "AppHeader", "Breadcrumb",
    "Steps", "Anchor", "BackTop", "Affix", "SegmentedTabs",
    "NavigationLauncher", "Pagination", "FloatButton", "Footer",
    "SimpleColumnLayout", "Grid", "QuickFilters",
  ]),
  "Data Display": new Set([
    "Table", "Card", "Result", "Statistic", "ProgressBar", "Progress",
    "ProgressList", "Timeline", "Descriptions", "List", "Collapsible",
    "Tree", "Empty", "Skeleton", "Spin", "Badge", "Typography", "SubText",
    "Chicklet", "Text", "Divider", "DataEntryTable",
  ]),
  "Media/Files": new Set([
    "Image", "Upload", "UploadZone", "UploadButton", "FileCard",
    "FileThumbnail", "FileTypeIcon", "FileValidationCard", "Carousel",
    "UploadItem", "UploadThumbnail",
  ]),
  "Charts": new Set([
    "AreaChart", "LineChart", "PieChart", "RadarChart", "RadialChart",
    "StackedBarChart",
  ]),
};

function getFamily(componentName) {
  for (const [family, members] of Object.entries(FAMILY_MAP)) {
    if (members.has(componentName)) return family;
  }
  return "Other";
}

// ---------------------------------------------------------------------------
// Parsing helpers (reused from generate-explorer-taxonomy-audit.cjs)
// ---------------------------------------------------------------------------
function findMatching(source, start, openChar, closeChar) {
  let depth = 0;
  let inSingle = false, inDouble = false, inTemplate = false, escaped = false;
  for (let i = start; i < source.length; i++) {
    const ch = source[i];
    if (escaped) { escaped = false; continue; }
    if (ch === "\\") { escaped = true; continue; }
    if (!inDouble && !inTemplate && ch === "'") { inSingle = !inSingle; continue; }
    if (!inSingle && !inTemplate && ch === '"') { inDouble = !inDouble; continue; }
    if (!inSingle && !inDouble && ch === "`") { inTemplate = !inTemplate; continue; }
    if (inSingle || inDouble || inTemplate) continue;
    if (ch === openChar) depth++;
    if (ch === closeChar) { depth--; if (depth === 0) return i; }
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
  return { body: source.slice(openIdx, endIdx + 1), inner: source.slice(openIdx + 1, endIdx) };
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
  const exportConstRe = /export\s+const\s+(\w+)\s*[:=][\s\S]*?(?=(?:\nexport\s+const|\nexport\s+function|\nexport\s+default|$))/g;
  let m;
  while ((m = exportConstRe.exec(source)) !== null) {
    const name = m[1];
    const block = m[0];
    const hasRender = /render\s*:\s*\(/.test(block) || /render\s*:\s*[\w(]/.test(block);
    const hasArgs = /\bargs\s*:/.test(block);
    let kind = "unknown";
    if (hasRender && hasArgs) kind = "render+args";
    else if (hasRender) kind = "render";
    else if (hasArgs) kind = "args";
    exports.set(name, { kind, hasArgs, block });
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
    const rowId = (rowBlock.match(/\bid\s*:\s*['"]([^'"]+)['"]/) || [])[1] || "";
    const rowLabel = (rowBlock.match(/\blabel\s*:\s*['"]([^'"]+)['"]/) || [])[1] || rowId;

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
        const sId = (sBlock.match(/\bid\s*:\s*['"]([^'"]+)['"]/) || [])[1] || "";
        const sLabel = (sBlock.match(/\blabel\s*:\s*['"]([^'"]+)['"]/) || [])[1] || sId;
        const sStory = (sBlock.match(/\bstory\s*:\s*['"]([^'"]+)['"]/) || [])[1];
        const hasArgs = /\bargs\s*:\s*\{/.test(sBlock);

        let argsFingerprint = "";
        if (hasArgs) {
          const argsIdx = sBlock.indexOf("args");
          const argsOpen = sBlock.indexOf("{", argsIdx);
          if (argsOpen !== -1) {
            const argsClose = findMatching(sBlock, argsOpen, "{", "}");
            if (argsClose !== -1) {
              argsFingerprint = sBlock.slice(argsOpen, argsClose + 1).replace(/\s+/g, " ").trim();
            }
          }
        }

        scenarios.push({ id: sId, label: sLabel, story: sStory, hasArgs, argsFingerprint });
        j = sEnd;
      }
    }
    rows.push({ id: rowId, label: rowLabel, scenarios });
    i = rowEnd;
  }
  return rows;
}

// ---------------------------------------------------------------------------
// Taxonomy checks
// ---------------------------------------------------------------------------
function isStandardRow(label) {
  return STANDARD_ROW_NAMES.has(label) || !!ROW_ALIASES[label];
}

function isMixedRow(label) {
  return /[&/]/.test(label);
}

function isAggregateLabel(label) {
  return AGGREGATE_PATTERNS.some((p) => p.test(label));
}

// ---------------------------------------------------------------------------
// Analyze a single component
// ---------------------------------------------------------------------------
function isDocsOnly(source) {
  // Only check meta-level parameters (before export default), not individual stories
  const metaEnd = source.indexOf("export default meta");
  if (metaEnd === -1) return false;
  return /\bdocsOnly\s*:\s*true\b/.test(source.slice(0, metaEnd));
}

function analyzeComponent(absPath) {
  const source = fs.readFileSync(absPath, "utf8");
  if (isDocsOnly(source)) return null;
  const relPath = path.relative(ROOT, absPath);
  const explorer = extractBlock(source, "explorer", "{", "}");
  if (!explorer) return null;

  const title = extractTitle(source);
  const component = componentNameFromTitle(title, relPath);
  const baseStory = (explorer.inner.match(/\bbaseStory\s*:\s*['"]([^'"]+)['"]/) || [])[1] || null;
  const rows = parseRows(explorer.inner);
  if (rows.length === 0) return null;

  const storyExports = extractExports(source);

  // Gather taxonomy issues
  const nonStandardRows = [];
  const mixedRows = [];
  const aggregateLabels = [];
  const duplicateChips = [];
  let allChipsUseArgs = true;
  let allChipsUseDirectStoryRefs = false;
  const directStoryRefs = new Set();

  for (const row of rows) {
    if (!isStandardRow(row.label)) nonStandardRows.push(row.label);
    if (isMixedRow(row.label)) mixedRows.push(row.label);

    const seen = new Map();
    for (const s of row.scenarios) {
      // Aggregate label check — skip if chip has args (renders a specific variant)
      if (isAggregateLabel(s.label) && !s.hasArgs && !COMPOUND_ALLOWLIST.has(component)) {
        aggregateLabels.push({ row: row.label, chip: s.label, story: s.story });
      }

      // Duplicate check
      const fingerprint = `${s.story || ""}::${s.argsFingerprint}`;
      if (seen.has(fingerprint)) {
        duplicateChips.push({ row: row.label, chip: s.label, dupOf: seen.get(fingerprint) });
      } else {
        seen.set(fingerprint, s.label);
      }

      // Args-based check
      if (!s.hasArgs && !baseStory) {
        allChipsUseArgs = false;
      }

      // Direct story ref (not baseStory pattern)
      if (s.story && s.story !== baseStory) {
        directStoryRefs.add(s.story);
      }
      if (!baseStory && s.story) {
        directStoryRefs.add(s.story);
      }
    }
  }

  // Check if all chips use args-based stories (even without baseStory)
  let allArgsBasedStories = true;
  if (!baseStory) {
    for (const row of rows) {
      for (const s of row.scenarios) {
        if (s.story) {
          const exp = storyExports.get(s.story);
          if (exp && !exp.hasArgs && !s.hasArgs) {
            allArgsBasedStories = false;
          }
        }
        // If chip has inline args, it's args-based
      }
    }
  }

  // Wiring issues: missing exports, missing args
  let hasMissingExport = false;
  let hasMissingArgs = false;
  for (const row of rows) {
    for (const s of row.scenarios) {
      if (s.story && s.story !== (baseStory || "")) {
        const exp = storyExports.get(s.story);
        if (!exp) hasMissingExport = true;
      }
      if (baseStory && s.story && s.story !== baseStory && !s.hasArgs) {
        hasMissingArgs = true;
      }
    }
  }

  const hasTaxonomyIssues = nonStandardRows.length > 0 || aggregateLabels.length > 0 ||
    duplicateChips.length > 0 || mixedRows.length > 0;
  const wiringWorks = !hasMissingExport && !hasMissingArgs;

  return {
    component,
    relPath,
    baseStory,
    rows,
    nonStandardRows,
    mixedRows,
    aggregateLabels,
    duplicateChips,
    directStoryRefs: Array.from(directStoryRefs),
    hasTaxonomyIssues,
    wiringWorks,
    allChipsUseArgs,
    allArgsBasedStories,
    storyExports,
  };
}

// ---------------------------------------------------------------------------
// Classify into quality buckets
// Priority: V4 > V3 > V2 > V1
// ---------------------------------------------------------------------------
function classify(rec) {
  // V4: Has aggregate story labels not in compound allowlist
  if (rec.aggregateLabels.length > 0) {
    return "V4";
  }

  // V3: Has 2+ rows, no baseStory, uses direct story refs, would benefit from ExplorerBase
  if (rec.rows.length >= 2 && !rec.baseStory && !rec.allArgsBasedStories) {
    return "V3";
  }

  // V2: Wiring works, but has taxonomy issues
  if (rec.wiringWorks && rec.hasTaxonomyIssues) {
    return "V2";
  }

  // V1: Clean
  return "V1";
}

// ---------------------------------------------------------------------------
// Dedup by component name (prefer src/components over src/stories)
// ---------------------------------------------------------------------------
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
// Build report
// ---------------------------------------------------------------------------
function buildReport(records) {
  // Classify each
  for (const r of records) {
    r.bucket = classify(r);
    r.family = getFamily(r.component);
  }

  const counts = { V1: 0, V2: 0, V3: 0, V4: 0 };
  for (const r of records) counts[r.bucket]++;

  const lines = [];
  lines.push("# Explorer Variant Quality Triage");
  lines.push("");
  lines.push(`Summary: ${records.length} components classified. V1: ${counts.V1}, V2: ${counts.V2}, V3: ${counts.V3}, V4: ${counts.V4}.`);
  lines.push("");

  // Priority order for cleanup by family
  lines.push("## Priority Order for Cleanup");
  lines.push("");

  const familyOrder = [
    "Input/Forms", "Selection Controls", "Feedback/Overlays",
    "Navigation/Layout", "Data Display", "Media/Files", "Charts", "Other",
  ];

  for (const family of familyOrder) {
    const members = records.filter((r) => r.family === family);
    if (members.length === 0) continue;
    lines.push(`### ${family}`);
    // Sort: V4 first, then V3, V2, V1
    const bucketOrder = { V4: 0, V3: 1, V2: 2, V1: 3 };
    members.sort((a, b) => (bucketOrder[a.bucket] - bucketOrder[b.bucket]) || a.component.localeCompare(b.component));
    for (const m of members) {
      const icon = m.bucket === "V1" ? "OK" : m.bucket === "V2" ? "taxonomy" : m.bucket === "V3" ? "migrate" : "remove";
      lines.push(`- **${m.component}** - ${m.bucket} (${icon})`);
    }
    lines.push("");
  }

  // Bucket V1
  lines.push("## Bucket V1 -- Clean (no action needed)");
  lines.push("");
  lines.push("| Component | Rows | Chips | baseStory |");
  lines.push("|---|---|---|---|");
  const v1 = records.filter((r) => r.bucket === "V1").sort((a, b) => a.component.localeCompare(b.component));
  for (const r of v1) {
    const totalChips = r.rows.reduce((s, row) => s + row.scenarios.length, 0);
    lines.push(`| ${r.component} | ${r.rows.length} | ${totalChips} | ${r.baseStory || "--"} |`);
  }
  lines.push("");

  // Bucket V2
  lines.push("## Bucket V2 -- Taxonomy cleanup needed");
  lines.push("");
  lines.push("| Component | Issues | Details |");
  lines.push("|---|---|---|");
  const v2 = records.filter((r) => r.bucket === "V2").sort((a, b) => a.component.localeCompare(b.component));
  for (const r of v2) {
    const issueList = [];
    if (r.nonStandardRows.length > 0) issueList.push(`non-standard rows: ${r.nonStandardRows.join(", ")}`);
    if (r.mixedRows.length > 0) issueList.push(`mixed rows: ${r.mixedRows.join(", ")}`);
    if (r.duplicateChips.length > 0) issueList.push(`duplicate chips: ${r.duplicateChips.map((d) => d.chip).join(", ")}`);
    lines.push(`| ${r.component} | ${issueList.length} | ${issueList.join("; ")} |`);
  }
  lines.push("");

  // Bucket V3
  lines.push("## Bucket V3 -- Needs ExplorerBase + args migration");
  lines.push("");
  lines.push("| Component | Rows | Direct Story Refs | Why migrate |");
  lines.push("|---|---|---|---|");
  const v3 = records.filter((r) => r.bucket === "V3").sort((a, b) => a.component.localeCompare(b.component));
  for (const r of v3) {
    const why = `${r.rows.length} rows with direct story refs; cross-row composition would benefit from ExplorerBase + args`;
    lines.push(`| ${r.component} | ${r.rows.length} | ${r.directStoryRefs.join(", ")} | ${why} |`);
  }
  lines.push("");

  // Bucket V4
  lines.push("## Bucket V4 -- Remove aggregate chips from explorer");
  lines.push("");
  lines.push("| Component | Chip | Story | Reason |");
  lines.push("|---|---|---|---|");
  const v4 = records.filter((r) => r.bucket === "V4").sort((a, b) => a.component.localeCompare(b.component));
  for (const r of v4) {
    for (const agg of r.aggregateLabels) {
      lines.push(`| ${r.component} | ${agg.chip} | ${agg.story || "--"} | Aggregate label matches pattern; should be split or removed |`);
    }
  }
  lines.push("");

  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main() {
  const files = Array.from(
    new Set(STORY_GLOBS.flatMap((g) => glob.sync(g, { cwd: ROOT, absolute: true })))
  );
  const scanned = files.map(analyzeComponent).filter(Boolean);
  const deduped = dedupeByComponent(scanned);
  const report = buildReport(deduped);
  fs.writeFileSync(OUT_PATH, report, "utf8");

  // Print summary
  const counts = { V1: 0, V2: 0, V3: 0, V4: 0 };
  for (const r of deduped) counts[r.bucket]++;
  console.log(`Wrote ${path.relative(ROOT, OUT_PATH)}`);
  console.log(`Summary: ${deduped.length} components classified. V1: ${counts.V1}, V2: ${counts.V2}, V3: ${counts.V3}, V4: ${counts.V4}.`);
}

main();
