# Explorer Standards

Purpose: Define one enforceable standard for Explorer behavior across all FT Design System components.

## 1. Required Explorer Contract
Every component participating in Explorer must provide:
- `ExplorerBase` story (single render entrypoint for Explorer)
- `explorer.mode` (`matrix`, `playground`, or `both`; default `matrix`)
- `explorer.rows` (axes with scenarios)
- `explorer.defaultRowId` and `explorer.defaultScenarioId`
- `explorer.previewMode` (`inline` or `positioned`)
- Optional `explorer.positionedPreview` when behavior needs overlay simulation

If `ExplorerBase` is missing, Explorer is considered non-compliant for that component.

## 2. Axis Modeling Rules
Use normalized axis naming:
- `type`: structural component mode (`default`, `range`, `directory`, etc.)
- `style`: visual treatment (`primary`, `secondary`, `outline`, `ghost`, etc.)
- `size`: component scale (`xs`, `sm`, `md`, `lg`, `xl`)
- `state`: interaction state (`default`, `disabled`, `loading`, `error`)
- `content`: text/icon composition mode
- `shape`: geometric variant (only if component API supports shape)
- `behavior`: interaction mode (`closable`, `trigger`, `toggle`)
- `placement`: positional variant (`left`, `right`, `top`, `bottom`)
- `layout`: spatial arrangement (`vertical`, `horizontal`, `grid`)
- `tone`: textual/color semantics (`primary`, `secondary`, `danger`, `success`)
- Other standard axes: `theme`, `data`, `format`, `brand` (see section 12)

Rules:
- Independent axes: combine freely.
- Dependent axes: must declare constraints in scenario args/logic.
- Invalid combinations must never render silently; either hide option or auto-correct.
- Scenario chip labels must represent a single scenario only.
- Disallowed chip labels: bundled labels using `/` or `+` (for example `Default/Filled/Outlined`, `Error + Disabled`) and vague aggregate labels like `All States`.
- Also disallowed: vague single-word or gallery labels such as `Variants`, `States`, `Sizes`, `Variant Showcase`, `State Showcase`, `Size Showcase`, `Type Showcase`, `Item States`.

## 3. Behavior-to-Preview Mapping
Use wrapper by component behavior:
- `inline` -> `InlinePreview`
- `top-overlay` -> `TopOverlayPreview` (alerts/notifications)
- `right-overlay` -> `RightPanelPreview` (drawer/panel)
- `center-overlay` -> `CenterDialogPreview` (modal/dialog)
- `anchored` -> `AnchorPreview` (dropdown/tooltip/popover/select/date pickers)
- `layout` -> `LayoutCanvas` (table/form/tabs/grid)
- `chart` -> `ChartCanvas`

Never render overlays as plain inline previews if the real component behavior is positional.

## 4. Explorer UX Rules
- Show only controls relevant to selected component.
- Selected options must be visibly active.
- One composed preview result is rendered at a time.
- No duplicate state controls in multiple rows.
- Control labels must match design language (not internal prop names).
- Preferred chip wording for comparison stories:
- `Variant Comparison`, `State Comparison`, `Size Comparison`, `Type Comparison`, `Placement Comparison`, or explicit singular names (`Primary`, `Disabled`, `SM`).

## 5. Story/Code Requirements
- Explorer must use composable API where that is the current DS standard.
- No deprecated declarative APIs in new Explorer stories.
- Runtime warnings in explorer paths are treated as bugs.
- No hook rule violations in story render paths.

## 6. Accessibility Requirements
- Icon-only cases must have `aria-label`.
- Keyboard interactions must work in overlay previews (open/close/focus/escape).
- Disabled states must be non-interactive and visibly disabled.

## 7. Validation Checklist (per component)
Before marking `done` in board:
1. `ExplorerBase` exists and renders with merged args.
2. All intended combinations render correctly.
3. Invalid combinations are blocked/hidden.
4. Behavior wrapper matches real component behavior.
5. No hydration/runtime/deprecation warnings in explorer flow.
6. Type check passes.

## 8. PR Governance
Every PR that changes stories/components affecting Explorer must include:
- Updated explorer config (if axes/behavior changed)
- Updated `docs/EXPLORER_IMPLEMENTATION_BOARD.md` status
- Statement: `Explorer matrix/behavior reviewed`

## 9. Non-Goals
- Explorer does not replace full docs examples.
- Explorer does not auto-generate constraints from arbitrary argTypes without review.

## 10. Allowed Compound-Component Exceptions

These components are allowed to have "aggregate-looking" explorer chips because their child elements constitute one semantic variant:

| Component | Chip(s) | Reason |
|---|---|---|
| Breadcrumb | Icons, Custom Separator | BreadcrumbItem × 3 = one breadcrumb |
| Calendar | EventCalendar | .map() events = one calendar |
| DataEntryTable | WithSelection, WithActions | Table rows/cells = one table |
| Footer | ThreeButtons, FourButtons, WithLeftSide | FooterButton × N = one footer variant |
| Form | HorizontalLayout, Default, WithValidation | FormItem × N = one form |
| Mentions | CustomPrefix, WithRichContent | MentionOption × 3 = one mentions field |
| ToggleGroup | Multiple, Outline | Toggle × 3 = one toggle group |
| UploadZone | DifferentFileTypes | .map() files = one upload zone |

Rule: Multi-child render is acceptable if the chip still represents **one semantic variant of one component**.

## 11. Explorer vs Docs-Demo Policy

- **Explorer chips** = interactive variant matrix. Each chip shows a single-variant preview. Chips should be backed by real API scenarios.
- **Docs/list stories** = aggregate examples, tutorials, side-by-side comparisons, "Usage Examples" demos. These are for documentation only and should NOT be wired as explorer chips.
- Stories like `Variants`, `States`, `Dashboard`, `UsageExamples`, `AllLogos`, `ImageGallery` belong in docs/list view only.
- If a story renders 3+ independent instances of the same component in different configurations, it's a docs demo, not an explorer chip target.

### 11a. Source of Truth Hierarchy

1. **Component source** (`.tsx`, types) = implementation truth
2. **Canonical stories** (`src/components/**/*.stories.tsx`) = supported variant contract documentation and explorer source
3. **Docs stories** (`src/stories/*.stories.tsx`) = educational docs only; never the explorer source

### 11b. Explorer Eligibility Rules

Explorer may only use:
- `ExplorerBase + args` (baseStory pattern)
- `custom-matrix-controlled` (args without story, rendered via baseStory)
- Direct single-variant stories (single preview, one scenario)
- Explicitly allowlisted compound single-preview chips (section 10)

Explorer may **not** use:
- Demos/comparisons/tutorials/galleries (`UsageExamples`, `Comparison`, `AllIcons`, `Variants`, etc.)
- Stories from `src/stories/` that duplicate a component in `src/components/`

### 11c. Story Categories

**Canonical variant stories** (explorer-eligible):
- Single-variant renders: `Default`, `Error`, `Disabled`, `SizeSM`, `Outlined`, `WithLabel`
- Located in `src/components/**/*.stories.tsx`

**Docs-only stories** (explorer-ineligible):
- Aggregates/galleries: `UsageExamples`, `Comparison`, `Showcase`, `AllIcons`, `KitchenSink`
- Located in `src/stories/*.stories.tsx` (duplicate docs files)

### 11d. Docs-Only Marking Convention

Stories that are docs-only must be marked using **both** mechanisms:

1. **Metadata flag**: `parameters.docsOnly = true` in the story meta
2. **Naming convention**: prefix with `Docs` (e.g., `DocsVariants`, `DocsStates`, `DocsSizes`, `DocsComparison`)

All 41 canonical story files with aggregate exports have been renamed via codemod (`scripts/codemods/rename-docs-exports.cjs`):
- `Variants` → `DocsVariants`
- `States` → `DocsStates`
- `Sizes` → `DocsSizes`

Scripts and CI enforce that docs-only stories do not appear in explorer validation.

## 12. Explorer Row Taxonomy

Standard row axis names (in priority order):

| Row Name | Purpose | Examples |
|---|---|---|
| Type | Structural component mode | Default, WithIcons, DirectoryTree |
| Style | Visual treatment | Primary, Secondary, Outline, Ghost |
| Size | Dimensional scale | XS, SM, MD, LG, XL |
| State | Interactive/validation state | Default, Disabled, Error, Loading |
| Shape | Geometric variant | Round, Square, Circle |
| Content | Content composition | Icon Only, With Helper, With Badge |
| Behavior | Interaction mode | Closable, Trigger, Toggle |
| Placement | Positional variant | Left, Right, Top, Bottom |
| Theme | Visual theme | Light, Dark, Night, Glass |
| Layout | Spatial arrangement | Vertical, Horizontal, Grid |
| Data | Dataset preset | Basic, Multiple, Stacked |
| Format | Display format | 12h, 24h, Date, DateTime |
| Tone | Textual semantics | Default, Error, Success |

Rules:
- One row = one axis
- One chip = one scenario
- No merged/bundled chips
- No aggregate demo chips unless in the allowed compound list above
- Row labels should use standard names from this taxonomy
- Prefer `ExplorerBase + args` over direct story references for non-first rows

## 13. Duplicate Story Rule

**Policy**: Docs-level stories in `src/stories/` that duplicate a canonical component story in `src/components/` must NOT have explorer config.

- Explorer config must live only in the canonical `src/components/` story file.
- Duplicate docs stories must use `parameters.docsOnly = true` instead of explorer config.
- CI enforces this via `scripts/check-duplicate-story-explorer.cjs`.

Known duplicate docs stories (explorer disabled):
- `src/stories/Card.stories.tsx`
- `src/stories/Icon.stories.tsx` (explorer config needs migration to canonical `src/components/atoms/Icons/Icon.stories.tsx`)
- `src/stories/RadioSelector.stories.tsx`
- `src/stories/Upload.stories.tsx`
- `src/stories/DataEntryTable.stories.tsx` (no explorer)
- `src/stories/Footer.stories.tsx` (no explorer)
- `src/stories/ProgressList.stories.tsx` (no explorer)
- `src/stories/SegmentedTabs.stories.tsx` (no explorer)

## 14. How to Read Explorer Reports

### 14a. Report Directory

| Report | Generated By | Purpose |
|---|---|---|
| `EXPLORER_CHIP_CONNECTION_AUDIT.md` | `generate-explorer-chip-audit.cjs` | Runtime correctness: do all chip story references resolve? |
| `EXPLORER_CHIP_PREVIEW_CLASSIFICATION.md` | `generate-explorer-chip-preview-classification.cjs` | Preview production mechanism: how is each chip's preview created? |
| `EXPLORER_AGGREGATE_CHIP_AUDIT.md` | `generate-explorer-aggregate-chip-audit.cjs` | Multi-preview risk: which chips might render aggregate galleries? |
| `EXPLORER_VARIANT_TAXONOMY_AUDIT.md` | `generate-explorer-taxonomy-audit.cjs` | Naming/row quality: do rows follow standard taxonomy? |
| `EXPLORER_VARIANT_CONTRACTS.md` | `generate-explorer-variant-contracts.cjs` | API coverage: do explorer rows cover the component's prop surface? |
| `EXPLORER_COMPONENT_VARIANT_MATRIX.md` | `generate-explorer-variant-matrix.cjs` | Full variant matrix per component |
| `EXPLORER_QUALITY_TRIAGE.md` | `generate-explorer-quality-triage.cjs` | Per-component health grade (V1–V4) with category grouping |
| `EXPLORER_TREND_SNAPSHOT.md` | `generate-explorer-trend-snapshot.cjs` | Single-page health dashboard with score |

### 14b. Key Metrics (must align across reports)

| Metric | Where to find it | Current steady-state |
|---|---|---|
| Component count | All report summaries | 97 (deduped) |
| Chip count | Chip audit + classification + trend snapshot | ~633 |
| Error chips | Chip audit, trend snapshot | 0 |
| Warning chips | Trend snapshot | 0 |
| Non-standard rows | Taxonomy audit | 0 |
| Aggregate-likely chips | Aggregate audit, trend snapshot | 0 |
| V1 (clean) components | Quality triage | 97 |
| V2–V4 components | Quality triage | 0 |
| Health score | Trend snapshot | 100/100 |

If any metric drifts from steady-state after a PR, regenerate all docs via `node scripts/ci-explorer-checks.cjs` and fix before merging.

### 14c. Classification Categories

| Category | Meaning | Risk |
|---|---|---|
| `ExplorerBase + args` | Chip rendered via baseStory with merged args | Safest — single preview guaranteed |
| `custom-matrix-controlled` | Args without explicit story ref, rendered via baseStory (e.g., Button) | Safe — same mechanism as above |
| `Direct single story` | Chip points to a standalone story export | Low — verify story renders one preview |
| `Direct story + args` | Story with additional args override | Low — same as above with arg merge |
| `Aggregate/gallery story` | Multi-preview render, flagged as high-risk | High — must be moved to docs-only or refactored |
| `Missing mapping` | No story ref and no baseStory pattern | Error — must be fixed |
| `Compound-allowed` | Multi-child render explicitly allowlisted (section 10) | Accepted — one semantic variant |

### 14d. Reading the Quality Triage

Components are graded V1–V4:

| Grade | Meaning | Action |
|---|---|---|
| V1 | Clean — standard rows, no issues | None |
| V2 | Taxonomy issue — non-standard row names or labels | Rename rows to standard taxonomy (section 12) |
| V3 | Needs migration — missing ExplorerBase or args pattern | Add ExplorerBase + convert chips to args |
| V4 | Remove aggregate — chips point to gallery/aggregate stories | Refactor to single-preview or move to docs-only |

### 14e. Reading the Variant Contracts

The contracts report measures **API prop coverage**: what percentage of a component's typed prop values are represented as explorer chips.

- **Coverage = Covered / Total** where Total = number of distinct prop values across size, variant, orientation, etc.
- Components showing `—` have no typed enum props detected (coverage not applicable).
- Low coverage (< 50%) means the explorer doesn't demonstrate the component's full API surface.
- 100% coverage means every typed prop value has a corresponding explorer chip.

### 14f. CI Pipeline

The CI script (`scripts/ci-explorer-checks.cjs`) runs 7 steps:

1. **Contract check** — `check-explorer-contract.cjs` validates ExplorerBase + row structure
2. **Duplicate story lint** — `check-duplicate-story-explorer.cjs` ensures no `src/stories/` duplicates have explorer config
3. **Story taxonomy checks** — `ci-story-taxonomy-checks.cjs` validates naming conventions (advisory, non-blocking)
4. **Regenerate all 8 docs** — runs all generators listed in 14a
5. **Stale docs check** — `git diff` on all 8 tracked docs to verify they match generated output
6. **Error chip check** — scans chip audit for error-level chips
7. **Summary** — reports pass/fail for all steps

All 8 generated docs are tracked for staleness. If any doc differs from its generated output, CI fails.

## 15. List View Contract

The component docs page displays stories in **list view** (default) and **explorer view** (overlay). The list view groups stories into two sections:

### 15a. List View Sections

1. **Canonical Variants** (top section) — single-scenario stories representing real API-backed variants
2. **Usage Examples** (bottom section, below divider) — `Docs*`-prefixed aggregate/tutorial/comparison stories

The list view automatically:
- Filters out `ExplorerBase` exports (internal explorer entrypoint, never shown)
- Separates `Docs*`-prefixed stories into the "Usage Examples" section
- Strips the `Docs` prefix for display (e.g., `DocsVariants` renders as "Variants")
- Shows an `example` badge on docs-only stories
- Limits canonical stories to 5 initially with expand button

### 15b. Story Classification Rules

| Classification | Name Pattern | Location | List View | Explorer |
|---|---|---|---|---|
| Canonical | `Default`, `WithIcon`, `Disabled`, `SizeSM` | `src/components/**` | Variants section | Eligible |
| Docs-only | `DocsVariants`, `DocsStates`, `DocsSizes` | Either | Examples section | Ineligible |
| Internal | `ExplorerBase` | `src/components/**` | Hidden | Base render |

### 15c. Naming Convention

**Canonical stories** — use descriptive PascalCase names matching the variant they demonstrate:
- `Default`, `Primary`, `Secondary`, `Destructive`
- `WithIcon`, `WithHelper`, `WithLabel`
- `Disabled`, `Loading`, `Error`
- `SizeSM`, `SizeLG`, `SizeXL`

**Docs-only stories** — MUST use the `Docs` prefix:
- `DocsVariants` — multi-instance variant gallery
- `DocsStates` — multi-instance state gallery
- `DocsSizes` — multi-instance size gallery
- `DocsInteractiveDemo` — interactive playground
- `DocsDashboard` — complex usage showcase
- `DocsComparison` — side-by-side comparison

### 15d. When to Use Docs Prefix

A story should be `Docs`-prefixed if ANY of these apply:
- Renders **multiple instances** of the primary component in different configurations
- Is a **tutorial/usage example** showing integration patterns
- Is a **gallery/showcase** of all variants/icons/illustrations
- Matches a **known aggregate name** (Variants, States, Sizes, AllIcons, etc.)
- Is a **Figma reference** story (e.g., `DocsFigmaNotStarted`)

A story should NOT be `Docs`-prefixed if:
- It renders **one instance** of the component (even with compound children)
- It represents a **single API variant** (e.g., one Footer with 3 buttons = one variant)
- It is referenced by explorer scenarios

### 15e. CI Enforcement

The story taxonomy CI script (`scripts/ci-story-taxonomy-checks.cjs`) validates:

1. **No aggregate names without Docs prefix** — names like `Variants`, `States`, `AllIcons` must be `Docs`-prefixed
2. **ExplorerBase consistency** — ExplorerBase exports must have matching explorer config
3. **No Docs stories in explorer** — `Docs`-prefixed stories must not be referenced in explorer scenarios
4. **Audit staleness** — `LIST_STORY_NORMALIZATION_AUDIT.md` must match generated output

Currently advisory (exit 0 with warnings). Use `--strict` flag to fail on warnings.

### 15f. List View Audit

The normalization audit (`scripts/generate-list-story-normalization-audit.cjs`) classifies every story export:

| Bucket | Meaning | Action |
|---|---|---|
| A | Canonical — explorer-backed or single-scenario | None |
| B | Needs Docs rename — aggregate without prefix | Rename to `Docs*` |
| C | Already Docs — has prefix or `docsOnly: true` | None |
| D | Needs split — aggregate hiding canonical coverage | Split into canonical + docs |
| E | Review — not in explorer, may duplicate coverage | Manual triage |
| F | Internal — ExplorerBase | Hidden from list view |

Report: `docs/LIST_STORY_NORMALIZATION_AUDIT.md`

### 15g. Codemod

Bulk rename tool: `scripts/codemods/rename-list-stories-to-docs.cjs`

- Renames aggregate-named and multi-instance story exports to `Docs*` prefix
- Safe: never touches `Default`, `ExplorerBase`, or explorer-referenced stories
- Supports `--dry-run` and `--file <path>` flags
