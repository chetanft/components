#!/usr/bin/env node
/**
 * Fixture-based tests for explorer parser scripts.
 *
 * Covers:
 *   1. Last-export detection (regression for \Z bug)
 *   2. render vs render+args parsing
 *   3. ExplorerBase + args classification
 *   4. Missing export detection
 *   5. Aggregate-likely heuristic (analyzeStoryBody)
 *
 * Run: node scripts/__tests__/explorer-parsers.test.cjs
 */

const assert = require("assert");

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  \u2713 ${name}`);
  } catch (e) {
    failed++;
    console.log(`  \u2717 ${name}: ${e.message}`);
  }
}

// ---------------------------------------------------------------------------
// Inline copies of pure functions (no side effects)
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
  const exportFnRe = /export\s+function\s+(\w+)\s*\(/g;
  while ((m = exportFnRe.exec(source)) !== null) {
    if (!exports.has(m[1])) exports.set(m[1], { kind: "function", hasArgs: false, block: "" });
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
        scenarios.push({ id: sId, label: sLabel, story: sStory, hasArgs });
        j = sEnd;
      }
    }
    rows.push({ id: rowId, label: rowLabel, scenarios });
    i = rowEnd;
  }
  return rows;
}

// From generate-explorer-chip-preview-classification.cjs
function aggregateRiskScore(rowLabel, chipLabel, storyName) {
  const text = `${rowLabel} ${chipLabel} ${storyName}`.toLowerCase();
  const strong = [
    "allicons", "all variants", "all states", "all sizes",
    "usageexamples", "usage examples", "comparison", "themecomparison",
    "gallery", "variant gallery", "showcase", "variants", "states",
  ];
  const medium = ["examples", "demo", "list", "grid"];
  let score = 0;
  for (const token of strong) if (text.includes(token)) score += 2;
  for (const token of medium) if (text.includes(token)) score += 1;
  return score;
}

function isDocsOnly(source) {
  return /\bdocsOnly\s*:\s*true\b/.test(source);
}

function classifyChipPreview({ rowLabel, chipLabel, story, hasArgs, baseStory, exportInfo }) {
  if (!story && hasArgs && baseStory) {
    return { category: "custom-matrix-controlled", risk: "low", note: "No story ref; rendered via baseStory + per-chip args" };
  }
  if (!story) return { category: "Missing mapping", risk: "high", note: "No story reference" };
  if (!exportInfo) return { category: "Missing story export", risk: "high", note: "Story export not found" };

  const riskScore = aggregateRiskScore(rowLabel, chipLabel, story);
  const exportKind = exportInfo.kind;

  if (baseStory && story === baseStory && hasArgs) {
    return { category: "ExplorerBase + args", risk: "low", note: "Single preview via composed args" };
  }
  if (baseStory && story === baseStory && !hasArgs) {
    return { category: "ExplorerBase default", risk: "low", note: "Base preview without per-chip args" };
  }
  if (hasArgs) {
    return { category: "Direct story + args", risk: riskScore >= 2 ? "medium" : "low", note: "Single preview from args story" };
  }
  if (riskScore >= 2) {
    return { category: "Aggregate/gallery story (multi-preview risk)", risk: "high", note: `${exportKind} story looks aggregate` };
  }
  if (riskScore === 1) {
    return { category: "Direct story (review for aggregate behavior)", risk: "medium", note: `${exportKind} story; label/story name suggests group/demo` };
  }
  return { category: "Direct single story", risk: exportKind === "function" || exportKind === "render" ? "medium" : "low", note: `${exportKind} export` };
}

// From generate-explorer-aggregate-chip-audit.cjs
function analyzeStoryBody(block) {
  if (!block || block.length < 50) {
    return { isAggregate: false, tooShort: true, reasons: [] };
  }
  const reasons = [];
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
  if (
    /grid-cols/i.test(block) ||
    /flex\s+gap|flex\s.*gap|gap-\d/i.test(block) ||
    /space-y-\d|space-x-\d/i.test(block)
  ) {
    const siblingJsx = jsxTags.length;
    if (siblingJsx >= 3) {
      reasons.push(`Layout wrapper (grid/flex/space) with ${siblingJsx} JSX elements`);
    }
  }
  if (/\.map\s*\(/.test(block)) {
    reasons.push("Contains .map() iteration pattern");
  }
  return { isAggregate: reasons.length > 0, tooShort: false, reasons };
}

// ===========================================================================
// Test Suite 1: Last-export detection (regression for \Z bug)
// ===========================================================================
console.log("\n--- 1. Last-export detection ---");

test("source with 2 exports — both should be found", () => {
  const src = [
    'export const Alpha = {',
    '  args: { size: "sm" },',
    '};',
    '',
    'export const Beta = {',
    '  args: { size: "lg" },',
    '};',
  ].join("\n");
  const result = extractExports(src);
  assert.strictEqual(result.size, 2, `Expected 2 exports, got ${result.size}`);
  assert.ok(result.has("Alpha"), "Missing Alpha");
  assert.ok(result.has("Beta"), "Missing Beta");
});

test("source with 3 exports — last one must be found", () => {
  const src = [
    'export const First = {',
    '  args: { variant: "primary" },',
    '};',
    '',
    'export const Second = {',
    '  args: { variant: "secondary" },',
    '};',
    '',
    'export const Third = {',
    '  args: { variant: "ghost" },',
    '};',
  ].join("\n");
  const result = extractExports(src);
  assert.strictEqual(result.size, 3, `Expected 3 exports, got ${result.size}`);
  assert.ok(result.has("First"), "Missing First");
  assert.ok(result.has("Second"), "Missing Second");
  assert.ok(result.has("Third"), "Missing Third (last-export bug)");
});

test("last export with render: must detect kind=render", () => {
  const src = [
    'export const SimpleArgs = {',
    '  args: { label: "Click" },',
    '};',
    '',
    'export const CustomRender = {',
    '  render: () => <Button>Hi</Button>,',
    '};',
  ].join("\n");
  const result = extractExports(src);
  assert.ok(result.has("CustomRender"), "Missing CustomRender");
  assert.strictEqual(result.get("CustomRender").kind, "render", `Expected kind=render, got ${result.get("CustomRender").kind}`);
});

test("last export with args: must detect kind=args", () => {
  const src = [
    'export const RenderOnly = {',
    '  render: () => <Button />,',
    '};',
    '',
    'export const ArgsOnly = {',
    '  args: { disabled: true },',
    '};',
  ].join("\n");
  const result = extractExports(src);
  assert.ok(result.has("ArgsOnly"), "Missing ArgsOnly");
  assert.strictEqual(result.get("ArgsOnly").kind, "args", `Expected kind=args, got ${result.get("ArgsOnly").kind}`);
});

// ===========================================================================
// Test Suite 2: render vs render+args parsing
// ===========================================================================
console.log("\n--- 2. render vs render+args parsing ---");

test("export with only render: -> kind=render", () => {
  const src = [
    'export const OnlyRender = {',
    '  render: () => <div>Custom</div>,',
    '};',
  ].join("\n");
  const result = extractExports(src);
  assert.strictEqual(result.get("OnlyRender").kind, "render");
});

test("export with render: and args: -> kind=render+args", () => {
  const src = [
    'export const RenderAndArgs = {',
    '  args: { size: "md" },',
    '  render: (args) => <Button {...args} />,',
    '};',
  ].join("\n");
  const result = extractExports(src);
  assert.strictEqual(result.get("RenderAndArgs").kind, "render+args");
});

test("export with only args: -> kind=args", () => {
  const src = [
    'export const OnlyArgs = {',
    '  args: { color: "red", size: "lg" },',
    '};',
  ].join("\n");
  const result = extractExports(src);
  assert.strictEqual(result.get("OnlyArgs").kind, "args");
});

test("export with neither render nor args -> kind=unknown", () => {
  const src = [
    'export const Bare = {',
    '  decorators: [(Story) => <div><Story /></div>],',
    '};',
  ].join("\n");
  const result = extractExports(src);
  assert.strictEqual(result.get("Bare").kind, "unknown");
});

test("export function detected as kind=function", () => {
  const src = [
    'export function Playground() {',
    '  return <Button>Play</Button>;',
    '}',
  ].join("\n");
  const result = extractExports(src);
  assert.ok(result.has("Playground"), "Missing Playground export function");
  assert.strictEqual(result.get("Playground").kind, "function");
});

// ===========================================================================
// Test Suite 3: ExplorerBase + args classification
// ===========================================================================
console.log("\n--- 3. ExplorerBase + args classification ---");

test("ExplorerBase story with args classified as safe/connected-via-args", () => {
  const classification = classifyChipPreview({
    rowLabel: "Size",
    chipLabel: "Small",
    story: "ExplorerBase",
    hasArgs: true,
    baseStory: "ExplorerBase",
    exportInfo: { kind: "args", hasArgs: true, block: "" },
  });
  assert.strictEqual(classification.category, "ExplorerBase + args");
  assert.strictEqual(classification.risk, "low");
});

test("ExplorerBase story without args classified as ExplorerBase default", () => {
  const classification = classifyChipPreview({
    rowLabel: "Size",
    chipLabel: "Default",
    story: "ExplorerBase",
    hasArgs: false,
    baseStory: "ExplorerBase",
    exportInfo: { kind: "args", hasArgs: true, block: "" },
  });
  assert.strictEqual(classification.category, "ExplorerBase default");
  assert.strictEqual(classification.risk, "low");
});

test("chip with no story reference classified as Missing mapping", () => {
  const classification = classifyChipPreview({
    rowLabel: "Size",
    chipLabel: "Broken",
    story: undefined,
    hasArgs: false,
    baseStory: "ExplorerBase",
    exportInfo: null,
  });
  assert.strictEqual(classification.category, "Missing mapping");
  assert.strictEqual(classification.risk, "high");
});

test("chip referencing non-existent export classified as Missing story export", () => {
  const classification = classifyChipPreview({
    rowLabel: "Size",
    chipLabel: "Ghost",
    story: "NonExistent",
    hasArgs: false,
    baseStory: null,
    exportInfo: undefined,
  });
  assert.strictEqual(classification.category, "Missing story export");
  assert.strictEqual(classification.risk, "high");
});

// ===========================================================================
// Test Suite 4: Missing export detection via parseRows + extractExports
// ===========================================================================
console.log("\n--- 4. Missing export detection ---");

test("detect missing export when explorer references story C but only A and B exist", () => {
  const storySource = [
    'export const A = {',
    '  args: { label: "A" },',
    '};',
    '',
    'export const B = {',
    '  args: { label: "B" },',
    '};',
  ].join("\n");

  const explorerInner = `
    rows: [
      {
        id: "row1",
        label: "Row 1",
        scenarios: [
          { id: "s1", label: "Scenario A", story: "A" },
          { id: "s2", label: "Scenario C", story: "C" },
        ],
      },
    ],
  `;

  const exports = extractExports(storySource);
  const rows = parseRows(explorerInner);

  assert.strictEqual(rows.length, 1, "Should parse 1 row");
  assert.strictEqual(rows[0].scenarios.length, 2, "Should parse 2 scenarios");

  const scenarioC = rows[0].scenarios[1];
  assert.strictEqual(scenarioC.story, "C");

  const exportForC = exports.get("C");
  assert.strictEqual(exportForC, undefined, "Export C should not exist");
  assert.ok(exports.has("A"), "Export A should exist");
  assert.ok(exports.has("B"), "Export B should exist");
});

test("parseRows handles nested args in scenarios", () => {
  const explorerInner = `
    rows: [
      {
        id: "size",
        label: "Size",
        scenarios: [
          { id: "sm", label: "Small", story: "ExplorerBase", args: { size: "sm" } },
          { id: "lg", label: "Large", story: "ExplorerBase", args: { size: "lg" } },
        ],
      },
    ],
  `;
  const rows = parseRows(explorerInner);
  assert.strictEqual(rows.length, 1);
  assert.strictEqual(rows[0].scenarios.length, 2);
  assert.strictEqual(rows[0].scenarios[0].hasArgs, true, "Small scenario should have args");
  assert.strictEqual(rows[0].scenarios[1].hasArgs, true, "Large scenario should have args");
});

test("parseRows with no rows key returns empty array", () => {
  const rows = parseRows("baseStory: 'Default'");
  assert.strictEqual(rows.length, 0);
});

// ===========================================================================
// Test Suite 5: Aggregate-likely heuristic (analyzeStoryBody)
// ===========================================================================
console.log("\n--- 5. Aggregate-likely heuristic ---");

test("3+ instances of <Button flags as aggregate", () => {
  const block = `
    export const AllButtons = {
      render: () => (
        <div className="flex gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      ),
    };
  `;
  const result = analyzeStoryBody(block);
  assert.strictEqual(result.isAggregate, true, "Should flag as aggregate");
  assert.ok(
    result.reasons.some((r) => r.includes("<Button") && r.includes("3x")),
    `Expected reason about <Button 3x, got: ${result.reasons.join("; ")}`
  );
});

test(".map( pattern flags as aggregate", () => {
  const block = `
    export const Mapped = {
      render: () => (
        <div className="space-y-2">
          {items.map((item) => (
            <Card key={item.id} title={item.title} />
          ))}
        </div>
      ),
    };
  `;
  const result = analyzeStoryBody(block);
  assert.strictEqual(result.isAggregate, true, "Should flag .map() as aggregate");
  assert.ok(
    result.reasons.some((r) => r.includes(".map()")),
    `Expected .map() reason, got: ${result.reasons.join("; ")}`
  );
});

test("single <Button does NOT flag as aggregate", () => {
  const block = `
    export const SingleButton = {
      render: () => (
        <div className="p-4">
          <Button variant="primary">Click me</Button>
        </div>
      ),
    };
  `;
  const result = analyzeStoryBody(block);
  assert.strictEqual(result.isAggregate, false, "Single <Button should not flag");
});

test("short block (<50 chars) returns tooShort=true", () => {
  const block = '<Button>Hi</Button>';
  const result = analyzeStoryBody(block);
  assert.strictEqual(result.tooShort, true, "Short block should be flagged tooShort");
  assert.strictEqual(result.isAggregate, false);
});

test("empty/null block returns tooShort=true", () => {
  const result = analyzeStoryBody(null);
  assert.strictEqual(result.tooShort, true);
  assert.strictEqual(result.isAggregate, false);
});

test("grid-cols layout with 3+ JSX elements flags aggregate", () => {
  const block = `
    export const GridVariants = {
      render: () => (
        <div className="grid grid-cols-3 gap-4">
          <Avatar size="sm" />
          <Avatar size="md" />
          <Avatar size="lg" />
        </div>
      ),
    };
  `;
  const result = analyzeStoryBody(block);
  assert.strictEqual(result.isAggregate, true, "Grid layout with 3+ JSX should flag");
});

test("2 instances of same component does NOT flag (threshold is 3)", () => {
  const block = `
    export const TwoButtons = {
      render: () => (
        <div className="flex gap-4 items-center justify-start">
          <Button variant="primary">One</Button>
          <Button variant="secondary">Two</Button>
        </div>
      ),
    };
  `;
  const result = analyzeStoryBody(block);
  // 2x <Button should not trigger the 3+ threshold
  const buttonReason = result.reasons.find((r) => r.includes("<Button"));
  assert.strictEqual(buttonReason, undefined, "2x <Button should not trigger tag-count reason");
});

// ===========================================================================
// Test Suite 6: custom-matrix-controlled classification
// ===========================================================================
console.log("\n--- 6. custom-matrix-controlled classification ---");

test("chip with args but no story + baseStory -> custom-matrix-controlled", () => {
  const classification = classifyChipPreview({
    rowLabel: "Size",
    chipLabel: "SM",
    story: undefined,
    hasArgs: true,
    baseStory: "ExplorerBase",
    exportInfo: null,
  });
  assert.strictEqual(classification.category, "custom-matrix-controlled");
  assert.strictEqual(classification.risk, "low");
});

test("chip with args but no story and no baseStory -> Missing mapping", () => {
  const classification = classifyChipPreview({
    rowLabel: "Size",
    chipLabel: "SM",
    story: undefined,
    hasArgs: true,
    baseStory: null,
    exportInfo: null,
  });
  assert.strictEqual(classification.category, "Missing mapping");
  assert.strictEqual(classification.risk, "high");
});

test("chip with no story, no args, but baseStory -> Missing mapping", () => {
  const classification = classifyChipPreview({
    rowLabel: "Size",
    chipLabel: "SM",
    story: undefined,
    hasArgs: false,
    baseStory: "ExplorerBase",
    exportInfo: null,
  });
  assert.strictEqual(classification.category, "Missing mapping");
  assert.strictEqual(classification.risk, "high");
});

// ===========================================================================
// Test Suite 7: docsOnly detection
// ===========================================================================
console.log("\n--- 7. docsOnly detection ---");

test("source with docsOnly: true is detected", () => {
  const src = `const meta = {
    parameters: { docsOnly: true, layout: 'centered' },
  };`;
  assert.strictEqual(isDocsOnly(src), true);
});

test("source without docsOnly is not detected", () => {
  const src = `const meta = {
    parameters: { layout: 'centered', explorer: { mode: 'matrix' } },
  };`;
  assert.strictEqual(isDocsOnly(src), false);
});

test("source with docsOnly: false is not detected", () => {
  const src = `const meta = {
    parameters: { docsOnly: false },
  };`;
  assert.strictEqual(isDocsOnly(src), false);
});

// ===========================================================================
// Test Suite 8: parseRows handles scenarios without story key
// ===========================================================================
console.log("\n--- 8. parseRows with no-story scenarios ---");

test("scenario with args but no story key parses correctly", () => {
  const explorerInner = `
    rows: [
      {
        id: "size",
        label: "Size",
        scenarios: [
          { id: "sm", label: "SM", args: { size: "sm" } },
          { id: "md", label: "MD", args: { size: "md" } },
        ],
      },
    ],
  `;
  const rows = parseRows(explorerInner);
  assert.strictEqual(rows.length, 1);
  assert.strictEqual(rows[0].scenarios.length, 2);
  assert.strictEqual(rows[0].scenarios[0].story, undefined, "story should be undefined when not specified");
  assert.strictEqual(rows[0].scenarios[0].hasArgs, true);
});

// ===========================================================================
// Summary
// ===========================================================================
console.log("\n-------------------------------------------");
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log("-------------------------------------------\n");

process.exit(failed > 0 ? 1 : 0);
