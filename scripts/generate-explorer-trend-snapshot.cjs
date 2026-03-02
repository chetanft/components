#!/usr/bin/env node
/**
 * generate-explorer-trend-snapshot.cjs
 *
 * Parses explorer audit reports and generates a compact health snapshot
 * at docs/EXPLORER_TREND_SNAPSHOT.md.
 */

const fs = require('fs');
const path = require('path');

const DOCS = path.join(__dirname, '..', 'docs');
const OUT = path.join(DOCS, 'EXPLORER_TREND_SNAPSHOT.md');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function readFile(name) {
  const p = path.join(DOCS, name);
  if (!fs.existsSync(p)) return null;
  return fs.readFileSync(p, 'utf-8');
}

function num(match) {
  return match ? parseInt(match[1], 10) : 0;
}

// ---------------------------------------------------------------------------
// 1. Chip Connection Audit
// ---------------------------------------------------------------------------

const chipAudit = readFile('EXPLORER_CHIP_CONNECTION_AUDIT.md');
let totalComponents = 0;
let totalChips = 0;
let errorChips = 0;
let warningChips = 0;

if (chipAudit) {
  // Summary: 97 components with explorer config, 604 chips audited, 0 error chips, 0 warning chips.
  const m = chipAudit.match(
    /Summary:\s*(\d+)\s*components.*?,\s*(\d+)\s*chips\s*audited,\s*(\d+)\s*error\s*chips?,\s*(\d+)\s*warning\s*chips?/i
  );
  if (m) {
    totalComponents = parseInt(m[1], 10);
    totalChips = parseInt(m[2], 10);
    errorChips = parseInt(m[3], 10);
    warningChips = parseInt(m[4], 10);
  }
}

// ---------------------------------------------------------------------------
// 2. Aggregate Chip Audit
// ---------------------------------------------------------------------------

const aggAudit = readFile('EXPLORER_AGGREGATE_CHIP_AUDIT.md');
let aggregateLikely = 0;
let compoundAllowed = 0;

if (aggAudit) {
  // Summary: 97 components scanned, 604 chips audited, 0 aggregate-likely, 16 compound-allowed, 0 manual-review.
  const m = aggAudit.match(
    /(\d+)\s*aggregate-likely/i
  );
  aggregateLikely = num(m);

  const m2 = aggAudit.match(
    /(\d+)\s*compound-allowed/i
  );
  compoundAllowed = num(m2);
}

// ---------------------------------------------------------------------------
// 3. Variant Taxonomy Audit
// ---------------------------------------------------------------------------

const taxAudit = readFile('EXPLORER_VARIANT_TAXONOMY_AUDIT.md');
let missingArgsInBaseStory = 0;
let nonStandardRows = 0;
let mixedRows = 0;
let aggregateLabels = 0;
let duplicateChips = 0;

if (taxAudit) {
  // Parse the Issues by Type table
  // | non-standard-row | 13 | info |
  const nsm = taxAudit.match(/\|\s*non-standard-row\s*\|\s*(\d+)/i);
  nonStandardRows = num(nsm);

  const mm = taxAudit.match(/\|\s*mixed-row\s*\|\s*(\d+)/i);
  mixedRows = num(mm);

  const am = taxAudit.match(/\|\s*aggregate-label\s*\|\s*(\d+)/i);
  aggregateLabels = num(am);

  const mabs = taxAudit.match(/\|\s*missing-args-in-baseStory\s*\|\s*(\d+)/i);
  missingArgsInBaseStory = num(mabs);

  const dc = taxAudit.match(/\|\s*duplicate-chip\s*\|\s*(\d+)/i);
  duplicateChips = num(dc);
}

// ---------------------------------------------------------------------------
// 4. Quality Triage (optional)
// ---------------------------------------------------------------------------

const triageAudit = readFile('EXPLORER_QUALITY_TRIAGE.md');
let v1Clean = 0;
let v2Taxonomy = 0;
let v3NeedsMigration = 0;
let v4RemoveAggregate = 0;

if (triageAudit) {
  // Look for V1/V2/V3/V4 counts in various formats
  const v1m = triageAudit.match(/V1[^|]*\|\s*(\d+)/i) || triageAudit.match(/V1\s*\(clean\)\s*[:\-]\s*(\d+)/i) || triageAudit.match(/V1:\s*(\d+)/);
  v1Clean = num(v1m);

  const v2m = triageAudit.match(/V2[^|]*\|\s*(\d+)/i) || triageAudit.match(/V2\s*\(taxonomy\)\s*[:\-]\s*(\d+)/i) || triageAudit.match(/V2:\s*(\d+)/);
  v2Taxonomy = num(v2m);

  const v3m = triageAudit.match(/V3[^|]*\|\s*(\d+)/i) || triageAudit.match(/V3\s*\(needs migration\)\s*[:\-]\s*(\d+)/i) || triageAudit.match(/V3:\s*(\d+)/);
  v3NeedsMigration = num(v3m);

  const v4m = triageAudit.match(/V4[^|]*\|\s*(\d+)/i) || triageAudit.match(/V4\s*\(remove aggregate\)\s*[:\-]\s*(\d+)/i) || triageAudit.match(/V4:\s*(\d+)/);
  v4RemoveAggregate = num(v4m);
}

// ---------------------------------------------------------------------------
// 5. Health Score
// ---------------------------------------------------------------------------

let score = 100;
score -= errorChips * 5;
score -= aggregateLikely * 2;
score -= warningChips * 1;
score -= mixedRows * 1;
score -= aggregateLabels * 1;
score -= duplicateChips * 1;
score -= missingArgsInBaseStory * 5;
score = Math.max(0, Math.min(100, score));

let status;
if (score >= 95) {
  status = 'Excellent — explorer is production-ready';
} else if (score >= 80) {
  status = 'Good — minor taxonomy cleanup remaining';
} else if (score >= 60) {
  status = 'Fair — wiring issues need attention';
} else {
  status = 'Needs work — significant issues remaining';
}

// ---------------------------------------------------------------------------
// 6. Generate output
// ---------------------------------------------------------------------------

const now = new Date();
const timestamp = now.toISOString().replace('T', ' ').slice(0, 16);

const triageSection = triageAudit
  ? `| V1 (clean) | ${v1Clean} |
| V2 (taxonomy) | ${v2Taxonomy} |
| V3 (needs migration) | ${v3NeedsMigration} |
| V4 (remove aggregate) | ${v4RemoveAggregate} |`
  : `| V1 (clean) | — |
| V2 (taxonomy) | — |
| V3 (needs migration) | — |
| V4 (remove aggregate) | — |`;

const md = `# Explorer Health Snapshot

Generated: ${timestamp}

## Metrics

| Metric | Count |
|---|---|
| Total components | ${totalComponents} |
| Total chips | ${totalChips} |
| Error chips | ${errorChips} |
| Warning chips | ${warningChips} |
| Aggregate-likely | ${aggregateLikely} |
| Compound-allowed | ${compoundAllowed} |
| Missing-args-in-baseStory | ${missingArgsInBaseStory} |
| Non-standard rows | ${nonStandardRows} |
| Mixed rows | ${mixedRows} |
| Aggregate labels | ${aggregateLabels} |
| Duplicate chips | ${duplicateChips} |
${triageSection}

## Health Score

Score: ${score}/100

## Status

${status}
`;

fs.writeFileSync(OUT, md, 'utf-8');
console.log(`Snapshot written to ${path.relative(process.cwd(), OUT)}`);
console.log(`Health score: ${score}/100 — ${status}`);
