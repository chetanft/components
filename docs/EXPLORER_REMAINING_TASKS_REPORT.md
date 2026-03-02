# Explorer Remaining Tasks Report

Last updated: 2026-02-23 (post Phase 5.3 + Phase 7 reconciliation).

## Current Status — All Migrations Complete

| Metric | Value |
|---|---|
| Total components with explorer config | 97 |
| Total chip scenarios | ~633 |
| Error chips | 0 |
| Warning chips | 0 |
| Aggregate-likely chips | 0 |
| Non-standard rows | 0 |
| V1 (clean) components | 97 |
| V2–V4 components | 0 |
| Health score | 100/100 |
| API prop coverage | 122/170 (72%) |

## Completed Migrations (Summary)

All 97 components now use the `ExplorerBase + args` pattern with standardized taxonomy:

- **Phase A** (chip wiring): All `story-only-nonfirst` issues resolved — every component uses `baseStory: 'ExplorerBase'` with args-driven chips.
- **Phase B** (missing exports): All `missing-story-export` issues resolved — chips repointed to `ExplorerBase` + args or removed if not API-backed.
- **Phase C** (documentation sync): All 8 generated docs regenerated and verified fresh.
- **Phase 4.3** (taxonomy normalization): All rows use standard names (Type, Style, Size, State, etc.). Zero non-standard rows.
- **Phase 5.3** (docs-only rename): 41 story files had aggregate exports renamed (`Variants` → `DocsVariants`, `States` → `DocsStates`, `Sizes` → `DocsSizes`).
- **Coverage expansion**: Typography, Text, Avatar, Badge, Card, Pagination, ProgressList, Cascader, TimePicker, DatePicker expanded to cover more API prop values.

## Remaining Opportunities (Non-Blocking)

These are optional improvements, not blockers:

### API Coverage Gaps (72% → higher)

Components with low or 0% prop coverage that could benefit from expanded explorer rows:

| Component | Current Coverage | Opportunity |
|---|---|---|
| FileTypeIcon | 0/9 (0%) | Add file type chips |
| FileCard | 0/4 (0%) | Add variant/status chips |
| Chicklet | 0/2 (0%) | Add style chips |
| Card | 3/6 (50%) | Add size chips |
| Badge | 11/20 (55%) | Add remaining size combinations |

These are tracked in `EXPLORER_VARIANT_CONTRACTS.md` and can be addressed incrementally per PR.

## Commands

```bash
# Full CI verification (6-step pipeline)
node scripts/ci-explorer-checks.cjs

# Individual generators
node scripts/generate-explorer-chip-audit.cjs
node scripts/generate-explorer-chip-preview-classification.cjs
node scripts/generate-explorer-aggregate-chip-audit.cjs
node scripts/generate-explorer-variant-matrix.cjs
node scripts/generate-explorer-taxonomy-audit.cjs
node scripts/generate-explorer-quality-triage.cjs
node scripts/generate-explorer-variant-contracts.cjs
node scripts/generate-explorer-trend-snapshot.cjs

# Contract + lint checks
node scripts/check-explorer-contract.cjs
node scripts/check-story-visibility.cjs
```
