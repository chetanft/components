# FT Design System - Legacy Removal Execution Board

> Horizon: 10 weeks  
> Scope: remove legacy declarative APIs and normalize variant/story model.  
> Inputs: `docs/LEGACY_API_AUDIT.md`, `docs/LEGACY_MIGRATION_MATRIX.md`

## Success Metrics (Program-Level)

| Metric | Baseline | Target |
|---|---:|---:|
| Components with deprecated props | 50 | 0 |
| Deprecated prop count | 123 | 0 |
| Legacy usage in stories/docs | present | 0 in default docs |
| Components with canonical story contract | partial → **100%** | 100% |
| Components with variant contract compliance | unknown | 100% |

## Guardrails (Non-Negotiable)

1. No new legacy/declarative props.
2. No new state encoded as `variant` values.
3. Every component must separate:
   - `variant` (visual intent)
   - `size` (scale)
   - `state` (UI state)
   - behavior (`disabled`, `readOnly`, `interactive`, handlers)
4. `Default` story must demonstrate canonical API only.

## Weekly Plan

### Week 1 - Freeze + Contract

Objectives:
1. Freeze legacy growth.
2. Publish canonical API and story contract.

Deliverables:
1. `docs/API_CONTRACT.md` (variant/size/state/behavior rules). **DONE**
2. `docs/STORY_CONTRACT.md` (required story sections + naming). **DONE**
3. `docs/COMPONENT_CLASSIFICATION.md` (full 81-component classification). **DONE**
4. `docs/LEGACY_MIGRATION_MATRIX.md` (updated with classification column). **DONE**
5. CI gate to fail on new `@deprecated` prop additions.

Exit Criteria:
1. PR template updated.
2. CI guards active.
3. Team sign-off on contracts.

---

### Week 2 - Tooling + Baseline Scan

Objectives:
1. Make enforcement automatic.
2. Baseline all components against contracts.

Deliverables:
1. `check:legacy-props` script (fails on legacy prop usage in docs/stories).
2. `check:variant-contract` script (flags state-like variants).
3. `check:story-contract` script (ensures Default/Variants/Sizes/States pattern).
4. `docs/STORY_CONTRACT_COMPLIANCE.md` baseline report. **DONE**
5. Story contract fixes for Badge, Statistic, DropdownMenu, Tooltip, Breadcrumb, Card, Modal, Tabs. **DONE**
6. Story contract fixes for all remaining 49 components + 10 src/stories files. **DONE**
7. 100% story contract compliance (91/91 files). **DONE**

Exit Criteria:
1. All checks run in CI.
2. Baseline report generated and stored in docs. **DONE**
3. All story files compliant with story contract. **DONE**

---

### Week 3 - Wave 1 (Quick Wins)

Scope:
1. DropdownMenu, Steps, Slider, Tree, Statistic, Breadcrumb, InputNumber, Pagination.

Deliverables:
1. Remove legacy APIs from selected components (or hard deprecate with codemod complete).
2. Migrate all internal stories/docs/examples to canonical API.
3. Add codemods for `steps`, `dropdown options`, `pagination flags`.
4. Wave 1 story/doc cleanup completed in migration stream. **DONE**

Exit Criteria:
1. No legacy story usage for Wave 1 components.
2. No deprecation warnings from Wave 1 components in docs runtime.
3. Wave 1 scope validated in story/runtime checks. **DONE**

---

### Week 4 - Wave 2 (Medium Components)

Scope:
1. Tabs, Form, DatePicker, HoverCard, Badge, Checkbox, RadioGroup, Tooltip, Timeline.

Deliverables:
1. Canonical variants/states cleanup.
2. Codemods for tabs arrays, form label/help, tooltip action text props.
3. Migration guide section per component.
4. `codemod:wave2:report` + `codemod:wave2:check` implemented with zero matches. **DONE**

Exit Criteria:
1. Wave 2 components pass variant contract check.
2. Internal docs use only composable APIs.
3. Wave 2 scanner reports 0 legacy matches. **DONE**

---

### Week 5 - Wave 3 (Overlay + Container Components)

Scope:
1. Modal, Drawer, Collapsible, Alert, NavigationPopover, PageHeader.

Deliverables:
1. Remove `onClose`-style legacy handlers where replacement exists.
2. Ensure all composed header/body/footer/title patterns are default.
3. Update docs examples and playground args.
4. `codemod:wave3:report` + `codemod:wave3:check` implemented with zero matches. **DONE**

Exit Criteria:
1. Zero legacy handler usage in ft-docs for scope components.
2. Runtime warning scan clean for scope components.
3. Wave 3 scanner reports 0 legacy matches. **DONE**

---

### Week 6 - Wave 4 (Data-heavy Components)

Scope:
1. Table, DataEntryTable, List.

Deliverables:
1. Composable-first examples only in docs.
2. Codemods for table/list config arrays.
3. Variant/state simplification for data-heavy components.
4. `codemod:wave4:report` + `codemod:wave4:check` implemented with zero matches. **DONE**

Exit Criteria:
1. No default docs page uses declarative tables/lists.
2. Contract checks pass for all three components.
3. Wave 4 scanner reports 0 legacy matches. **DONE**

---

### Week 7 - Blocked Set A (Needs Sub-Components First)

Scope:
1. ButtonGroup, Cascader, Mentions, ProgressBar, ProgressList, QuickFilters, RadioSelector.

Deliverables:
1. Implement missing composable sub-components.
2. Add migration examples and codemod hints.
3. Add baseline scanner: `codemod:wave7:report` for blocked set A. **DONE**
4. Enforce zero legacy matches with `codemod:wave7:check`. **DONE**

Exit Criteria:
1. Each component has canonical composable API documented.
2. Legacy paths marked for removal in next major.
3. Wave 7 scanner reports 0 legacy matches and enforcement is active. **DONE**

---

### Week 8 - Blocked Set B (Needs Sub-Components First)

Scope:
1. Result, Footer, Tour, Transfer, TreeSelect, Anchor, Chicklet, ColorPicker, SegmentedTabs, StackedBarChart, SimpleColumnLayout replacement.

Deliverables:
1. Finish missing composable primitives.
2. Replace `SimpleColumnLayout` usages with `Table layout="simple"`.

Exit Criteria:
1. No blocked component remains without composable equivalent.
2. Migration matrix updated to `todo`/`in_progress` only, no `blocked`.

---

### Week 9 - Hardening + Consumer Migration

Objectives:
1. Migrate internal consumers.
2. Validate external migration tooling.

Deliverables:
1. Run codemods against `ft-docs` and showcase apps.
2. Publish `docs/migrations/v5-legacy-removal.md`.
3. Add smoke tests for migrated examples.

Exit Criteria:
1. Internal repos build without legacy props.
2. Migration doc reviewed and approved.

---

### Week 10 - Release Candidate + Major Cut

Objectives:
1. Final removal of legacy runtime paths.
2. Cut major version.

Deliverables:
1. Remove deprecated props/aliases from public types and runtime branches.
2. Remove `Legacy*` docs pages from default nav.
3. Publish v5 release notes.

Exit Criteria:
1. Deprecated prop count = 0.
2. CI checks all green.
3. v5 RC approved.

## Workstreams (Parallel Owners)

| Workstream | Responsibility |
|---|---|
| API Governance | Variant/state/behavior contract enforcement |
| Component Migration | Component-level code + tests + docs updates |
| Tooling/Codemods | Automated transforms and lint/CI checks |
| Docs/Storybook | Story contract compliance and discoverability |
| Release Management | v5 roadmap, changelog, comms |

## PR Template Requirements

Every migration PR must include:
1. Component(s) touched and matrix rows updated.
2. Before/after API examples.
3. Story updates proving canonical default.
4. Contract check output.
5. Backward-compatibility impact note.

## Daily/Weekly Tracking

Daily standup fields:
1. Components moved to `done`.
2. New blockers.
3. Contract check failures.

Weekly review:
1. Burn-down of deprecated props.
2. Story contract coverage percentage.
3. Variant contract compliance percentage.
