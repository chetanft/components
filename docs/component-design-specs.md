# FT Design System - Component Design Specifications

> Auto-generated from `src/styles/globals.css` + `registry.json`.
> Version: 4.22.1 | Generated: 2026-03-12T08:12:13.957Z

---

## Purpose

This document is the source-generated design spec reference for token values and component coverage.
For variant-level drift and regression checks, use `npm run check:consistency` and the generated reports under `docs/audits/`.

## Workflow

1. Update component code/tokens.
2. Run `npm run sync:docs` (regenerates this file).
3. Run `npm run check:consistency` before commit/PR.
4. Run `npm run check:size-contract` before commit/PR for component size/variant updates.
5. Run `npm run check:spacing-structure:report` to detect structural spacing/layout issues.
6. Run `npm run check:spacing-structure` before commit/PR to enforce baseline-aware structural checks.
7. Use `npm run check:consistency:baseline` only when intentionally accepting debt changes.

## Table of Contents

- [Foundation Tokens](#foundation-tokens)
- [Component Coverage](#component-coverage)
- [Component Variant Token Matrix](#component-variant-token-matrix)
- [Consistency Gate Commands](#consistency-gate-commands)
- [Size Contract Gate Commands](#size-contract-gate-commands)
- [Structural Spacing Gate Commands](#structural-spacing-gate-commands)

## Foundation Tokens

### Spacing Scale (Legacy `--x*`)

| Token | Value |
|---|---|
| --x0 | 0px |
| --x1 | 4px |
| --x2 | 8px |
| --x3 | 12px |
| --x4 | 16px |
| --x5 | 20px |
| --x6 | 24px |
| --x7 | 28px |
| --x8 | 32px |
| --x9 | 36px |
| --x10 | 40px |
| --x11 | 44px |
| --x12 | 48px |
| --x13 | 52px |
| --x14 | 56px |
| --x15 | 60px |
| --x16 | 64px |
| --x20 | 80px |
| --x24 | 96px |
| --x38 | 152px |

### Spacing Aliases (Canonical `--spacing-x*`)

| Token | Resolved Value |
|---|---|
| --spacing-x0 | 0px |
| --spacing-x1 | 4px |
| --spacing-x2 | 8px |
| --spacing-x3 | 12px |
| --spacing-x4 | 16px |
| --spacing-x5 | 20px |
| --spacing-x6 | 24px |
| --spacing-x7 | 28px |
| --spacing-x8 | 32px |
| --spacing-x9 | 36px |
| --spacing-x10 | 40px |
| --spacing-x11 | 44px |
| --spacing-x12 | 48px |
| --spacing-x13 | 52px |
| --spacing-x14 | 56px |
| --spacing-x15 | 60px |
| --spacing-x16 | 64px |
| --spacing-x20 | 80px |
| --spacing-x24 | 96px |
| --spacing-x38 | 152px |

### Half-Step Spacing

| Token | Value |
|---|---|
| --spacing-x1-5 | 6px |
| --spacing-x2-5 | 10px |
| --spacing-x3-5 | 14px |

### Typography Tokens

| Token | px | rem |
|---|---|---|
| --font-size-3_5xl-rem | 40px | 2.5rem |
| --font-size-3xl-rem | 36px | 2.571rem |
| --font-size-4xl-rem | 48px | 3.429rem |
| --font-size-5xl-rem | 72px | 4.5rem |
| --font-size-lg-rem | 20px | 1.429rem |
| --font-size-md-rem | 16px | 1.143rem |
| --font-size-sm-rem | 14px | 1rem |
| --font-size-xl-rem | 24px | 1.714rem |
| --font-size-xs-rem | 12px | 0.857rem |
| --font-size-xxl-rem | 28px | 2rem |
| --font-size-xxs-rem | 10px | 0.714rem |

### Border Radius Tokens

| Token | Value |
|---|---|
| --radius-2xl | 20px |
| --radius-2xs | 2px |
| --radius-3xl | 24px |
| --radius-4xl | 28px |
| --radius-full | 9999px |
| --radius-lg | 12px |
| --radius-md | 8px |
| --radius-none | 0px |
| --radius-sm | 4px |
| --radius-smd | 6px |
| --radius-xl | 16px |

## Component Coverage

- Total: **125**
- Atoms: **26**
- Molecules: **57**
- Organisms: **24**
- Charts: **16**
- Templates: **2**

### Atoms

- **Avatar** (sub: 2)
- **Badge** (sub: 5)
- **Button** (sub: 3)
- **Checkbox** (sub: 6)
- **Chip**
- **Colors**
- **Divider**
- **FigmaBadge**
- **Icons**
- **Illustration**
- **Input** (sub: 8)
- **Label**
- **Logos**
- **RadioGroup** (sub: 5)
- **ReadOnly**
- **Select**
- **Skeleton** (sub: 2)
- **Spacer**
- **Spin**
- **Statistic** (sub: 2)
- **SubText**
- **Switch** (sub: 6)
- **Text**
- **Textarea** (sub: 6)
- **Toggle**
- **Typography**

### Molecules

- **Affix**
- **Alert** (sub: 6)
- **Anchor**
- **BackTop**
- **Breadcrumb** (sub: 5)
- **ButtonGroup**
- **Calendar**
- **Carousel**
- **Cascader**
- **Chicklet**
- **ColorPicker**
- **Content**
- **DatePicker** (sub: 4)
- **Descriptions** (sub: 5)
- **Dropdown** (sub: 3)
- **DropdownMenu** (sub: 6)
- **Empty**
- **FileValidationCard**
- **FilterDateRange**
- **FilterDropdown**
- **FilterSearch**
- **FloatButton**
- **HoverCard** (sub: 3)
- **Image**
- **InputNumber** (sub: 7)
- **List** (sub: 9)
- **Loader**
- **Mentions**
- **Message**
- **Notification**
- **PageHeaderFilters** (sub: 1)
- **Pagination** (sub: 9)
- **PercentageOfChargeInput**
- **Popconfirm** (sub: 8)
- **ProgressBar**
- **ProgressList**
- **RadioSelector**
- **Rate** (sub: 3)
- **SegmentedTabs**
- **Select** (sub: 9)
- **SimpleColumnLayout**
- **Slider** (sub: 5)
- **StackedBarChart**
- **Steps** (sub: 2)
- **ThemeSwitch**
- **Timeline** (sub: 3)
- **TimePicker**
- **ToggleGroup**
- **Tooltip** (sub: 6)
- **Tour**
- **Transfer**
- **Tree** (sub: 7)
- **TreeSelect**
- **UploadButton**
- **UploadItem**
- **UploadThumbnail**
- **Watermark**

### Organisms

- **AppHeader**
- **Card** (sub: 8)
- **Collapsible** (sub: 8)
- **DataEntryTable** (sub: 15)
- **DisplayBlock**
- **Drawer** (sub: 9)
- **FileCard**
- **FileThumbnail**
- **FileTypeIcon**
- **Footer**
- **Form** (sub: 6)
- **Grid**
- **Modal** (sub: 9)
- **NavigationMenu**
- **NavigationPopover**
- **PageHeader** (sub: 2)
- **QuickFilters**
- **Result** (sub: 4)
- **Table** (sub: 13)
- **Tabs** (sub: 4)
- **Upload** (sub: 3)
- **UploadZone**
- **UserProfile**
- **UserProfileDropdown**

### Charts

- **AreaChart**
- **BarChart**
- **BubbleChart**
- **BulletChart**
- **DoughnutChart**
- **DualAxesChart**
- **GaugeChart**
- **HorizontalBarChart**
- **LineChart**
- **PieChart**
- **PolarAreaChart**
- **RadarChart**
- **RadialChart**
- **ScatterChart**
- **StackedBarChart**
- **WaterfallChart**

### Templates

- **Blocks**
- **ListingLayout**

## Component Variant Token Matrix

> Auto-detected from source variant/config objects (`cva variants` and `*Styles/*Variants/*Map` patterns).
> This is best-effort static extraction and may omit runtime-computed classes.

Coverage: **125 / 125 components listed**
- Manual-override: **84**
- Variant-detected: **23**
- Fallback-default: **1**
- No-token-match: **17**
- Missing-path: **0**

### Affix (molecules)

Status: `no-token-match`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/Affix/Affix.tsx | base | default | _none detected_ |

### Alert (molecules)

Status: `variant-detected`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/Alert/Alert.tsx | variant | danger | `--critical`, `--critical-light` |
| src/components/molecules/Alert/Alert.tsx | variant | info | `--neutral`, `--neutral-dark`, `--neutral-light` |
| src/components/molecules/Alert/Alert.tsx | variant | success | `--positive`, `--positive-dark`, `--positive-light` |
| src/components/molecules/Alert/Alert.tsx | variant | warning | `--warning`, `--warning-dark`, `--warning-light` |

### Anchor (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/Anchor/Anchor.tsx | base | default | `--border-primary`, `--primary`, `--primary-bg-subtle`, `--spacing-x1`, `--spacing-x2`, `--spacing-x4`, `--text-secondary` |

### AppHeader (organisms)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/organisms/AppHeader/AppHeader.tsx | size | mobile | `--bg-secondary`, `--border-primary`, `--spacing-x3`, `--spacing-x4` |
| src/components/organisms/AppHeader/AppHeader.tsx | size | desktop | `--bg-secondary`, `--border-primary`, `--spacing-x4`, `--spacing-x5` |

### AreaChart (charts)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/charts/AreaChart.tsx | base | default | `--color-bg-primary` |

### Avatar (atoms)

Status: `variant-detected`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/atoms/Avatar/Avatar.tsx | size | lg | `--spacing-x12`, `text-md-rem` |
| src/components/atoms/Avatar/Avatar.tsx | size | md | `--spacing-x10`, `text-sm-rem` |
| src/components/atoms/Avatar/Avatar.tsx | size | sm | `--spacing-x8`, `text-sm-rem` |
| src/components/atoms/Avatar/Avatar.tsx | size | xl | `--spacing-x14`, `text-md-rem` |
| src/components/atoms/Avatar/Avatar.tsx | size | xs | `--spacing-x6`, `text-xs-rem` |
| src/components/atoms/Avatar/Avatar.tsx | size | xxl | `--spacing-x16`, `text-lg-rem` |
| src/components/atoms/Avatar/Avatar.tsx | size | xxs | `--spacing-x4`, `text-xs-rem` |

### BackTop (molecules)

Status: `no-token-match`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/BackTop/BackTop.tsx | base | default | _none detected_ |

### Badge (atoms)

Status: `variant-detected`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/atoms/Badge/Badge.tsx | fontSize | lg | `text-md-rem` |
| src/components/atoms/Badge/Badge.tsx | fontSize | md | `text-sm-rem` |
| src/components/atoms/Badge/Badge.tsx | fontSize | sm | `text-sm-rem` |
| src/components/atoms/Badge/Badge.tsx | fontSize | xs | `text-xs-rem` |
| src/components/atoms/Badge/Badge.tsx | sizeStyles | lg | `--spacing-x0-5`, `--spacing-x1-5`, `--spacing-x2-5`, `text-md-rem` |
| src/components/atoms/Badge/Badge.tsx | sizeStyles | md | `--spacing-x0-5`, `--spacing-x1`, `--spacing-x2`, `text-sm-rem` |
| src/components/atoms/Badge/Badge.tsx | sizeStyles | sm | `--spacing-x1`, `--spacing-x1-5`, `text-sm-rem` |
| src/components/atoms/Badge/Badge.tsx | sizeStyles | xs | `--spacing-x0-5`, `--spacing-x1`, `text-xs-rem` |
| src/components/atoms/Badge/BadgeDot.tsx | color | danger | `--danger` |
| src/components/atoms/Badge/BadgeDot.tsx | color | default | `--neutral` |
| src/components/atoms/Badge/BadgeDot.tsx | color | primary | `--primary` |
| src/components/atoms/Badge/BadgeDot.tsx | color | success | `--positive` |
| src/components/atoms/Badge/BadgeDot.tsx | color | warning | `--warning` |
| src/components/atoms/Badge/BadgeStatus.tsx | statusDot | default | `--neutral` |
| src/components/atoms/Badge/BadgeStatus.tsx | statusDot | error | `--danger` |
| src/components/atoms/Badge/BadgeStatus.tsx | statusDot | processing | `--primary` |
| src/components/atoms/Badge/BadgeStatus.tsx | statusDot | success | `--positive` |
| src/components/atoms/Badge/BadgeStatus.tsx | statusDot | warning | `--warning` |

### BarChart (charts)

Status: `no-token-match`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/charts/BarChart.tsx | base | default | _none detected_ |

### Blocks (templates)

Status: `fallback-default`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/templates/Blocks/DashboardBlock.tsx | base | default | `--bg-primary`, `--bg-secondary`, `--border-primary`, `--border-secondary`, `--critical`, `--font-size-lg-rem`, `--font-size-md-rem`, `--font-size-sm-rem`, `--font-size-xl-rem`, `--font-size-xs-rem`, `--primary`, `--radius-lg`, `--radius-md`, `--secondary`, `--shadow-lg`, `--shadow-md`, `--shadow-sm`, `--spacing-x1`, `--spacing-x1-5`, `--spacing-x10`, `--spacing-x12`, `--spacing-x14`, `--spacing-x15`, `--spacing-x2`, `--spacing-x2-5`, `--spacing-x3`, `--spacing-x3-5`, `--spacing-x4`, `--spacing-x5`, `--spacing-x6`, `--spacing-x8`, `--spacing-x9`, `--tertiary` |

### Breadcrumb (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/Breadcrumb/Breadcrumb.tsx | base | default | `--color-neutral`, `--color-primary`, `--color-tertiary`, `--radius-md`, `--radius-sm`, `--spacing-x2`, `--spacing-x3`, `--transition-fast` |

### BubbleChart (charts)

Status: `no-token-match`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/charts/BubbleChart.tsx | base | default | _none detected_ |

### BulletChart (charts)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/charts/BulletChart.tsx | base | default | `--color-border-primary`, `--color-border-secondary`, `--color-neutral-light` |

### Button (atoms)

Status: `variant-detected`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/atoms/Button/Button.tsx | buttonSizing | lg | `--spacing-x4`, `--spacing-x5`, `text-md-rem` |
| src/components/atoms/Button/Button.tsx | buttonSizing | md | `--spacing-x3`, `--spacing-x4`, `text-sm-rem` |
| src/components/atoms/Button/Button.tsx | buttonSizing | sm | `--spacing-x2`, `--spacing-x3`, `text-sm-rem` |
| src/components/atoms/Button/Button.tsx | buttonSizing | xl | `--spacing-x5`, `--spacing-x6`, `text-md-rem` |
| src/components/atoms/Button/Button.tsx | buttonSizing | xs | `--spacing-x1`, `--spacing-x2`, `text-xs-rem` |
| src/components/atoms/Button/Button.tsx | buttonSizing | xxl | `--spacing-x6`, `--spacing-x7`, `text-lg-rem` |
| src/components/atoms/Button/Button.tsx | buttonSizing | xxs | `--spacing-x0-5`, `--spacing-x1-5`, `text-xs-rem` |
| src/components/atoms/Button/Button.tsx | variant | dashed | `--border-primary`, `--button-secondary-bg`, `--button-secondary-border`, `--button-secondary-text`, `--primary`, `--tertiary` |
| src/components/atoms/Button/Button.tsx | variant | destructive | `--button-destructive-bg`, `--button-destructive-border`, `--button-destructive-hover-bg`, `--button-destructive-text`, `--critical` |
| src/components/atoms/Button/Button.tsx | variant | ghost | `--button-primary-bg`, `--button-primary-text`, `--primary`, `--tertiary` |
| src/components/atoms/Button/Button.tsx | variant | link | `--border-primary`, `--neutral`, `--neutral-dark`, `--spacing-x2` |
| src/components/atoms/Button/Button.tsx | variant | primary | `--button-primary-bg`, `--button-primary-border`, `--button-primary-hover-bg`, `--button-primary-text`, `--tertiary` |
| src/components/atoms/Button/Button.tsx | variant | secondary | `--border-primary`, `--button-secondary-bg`, `--button-secondary-border`, `--button-secondary-hover-bg`, `--button-secondary-hover-border`, `--button-secondary-text`, `--glass-hover`, `--primary`, `--tertiary` |
| src/components/atoms/Button/Button.tsx | variant | text | `--button-text-bg`, `--button-text-border`, `--button-text-hover-bg`, `--button-text-text`, `--glass-hover`, `--primary`, `--tertiary` |

### ButtonGroup (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/ButtonGroup/ButtonGroup.tsx | base | default | `--spacing-x2` |

### Calendar (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/Calendar/Calendar.tsx | base | default | `--bg-primary`, `--bg-secondary`, `--border-primary`, `--border-secondary`, `--font-size-sm-rem`, `--primary`, `--radius-md`, `--radius-sm`, `--spacing-x1`, `--spacing-x2`, `--spacing-x20`, `--spacing-x3`, `--spacing-x4`, `--spacing-x6`, `--tertiary` |

### Card (organisms)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/organisms/Card/Card.tsx | section | header | `--bg-primary`, `--border-primary`, `--radius-md`, `--spacing-x5` |
| src/components/organisms/Card/Card.tsx | section | body | `--bg-primary`, `--spacing-x5` |
| src/components/organisms/Card/Card.tsx | section | footer | `--bg-primary`, `--border-primary`, `--spacing-x3`, `--spacing-x5` |

### Carousel (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/Carousel/Carousel.tsx | base | default | `--color-bg-primary`, `--color-border-primary`, `--color-border-secondary`, `--color-neutral`, `--color-primary`, `--glass-hover`, `--glass-selected`, `--spacing-x1`, `--spacing-x10`, `--spacing-x2`, `--spacing-x6` |

### Cascader (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/Cascader/Cascader.tsx | base | default | `--bg-primary`, `--bg-secondary`, `--border-primary`, `--border-secondary`, `--color-primary`, `--color-tertiary`, `--font-size-md-rem`, `--primary`, `--spacing-x1`, `--spacing-x10`, `--spacing-x16`, `--spacing-x2`, `--spacing-x20`, `--spacing-x3`, `--spacing-x4`, `--tertiary` |

### Checkbox (atoms)

Status: `variant-detected`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/atoms/Checkbox/CheckboxError.tsx | size | md | `--spacing-x2-5`, `--spacing-x5`, `text-sm-rem` |
| src/components/atoms/Checkbox/CheckboxError.tsx | size | sm | `--spacing-x2`, `--spacing-x4`, `text-sm-rem` |
| src/components/atoms/Checkbox/CheckboxHelper.tsx | size | md | `--spacing-x2-5`, `--spacing-x5`, `text-sm-rem` |
| src/components/atoms/Checkbox/CheckboxHelper.tsx | size | sm | `--spacing-x2`, `--spacing-x4`, `text-sm-rem` |
| src/components/atoms/Checkbox/CheckboxInput.tsx | size | md | `--spacing-x2-5`, `text-sm-rem` |
| src/components/atoms/Checkbox/CheckboxInput.tsx | size | sm | `--spacing-x2`, `text-sm-rem` |

### Chicklet (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/Chicklet/Chicklet.tsx | base | default | `--border-primary`, `--border-secondary`, `--primary`, `--spacing-x0-5`, `--spacing-x1`, `--spacing-x2`, `--spacing-x3` |

### Chip (atoms)

Status: `variant-detected`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/atoms/Chip/Chip.tsx | size | lg | `--spacing-x2`, `--spacing-x4` |
| src/components/atoms/Chip/Chip.tsx | size | md | `--spacing-x1-5`, `--spacing-x3`, `text-sm-rem` |
| src/components/atoms/Chip/Chip.tsx | size | sm | `--spacing-x0-5`, `--spacing-x1`, `--spacing-x2`, `text-xs-rem` |

### Collapsible (organisms)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/organisms/Collapsible/Collapse.tsx | base | default | `--bg-primary`, `--bg-secondary`, `--border-primary`, `--border-secondary`, `--primary`, `--spacing-x10`, `--spacing-x2`, `--spacing-x3`, `--spacing-x4` |

### ColorPicker (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/ColorPicker/ColorPicker.tsx | base | default | `--border-primary`, `--border-secondary`, `--color-bg-primary`, `--color-bg-secondary`, `--primary`, `--spacing-x1`, `--spacing-x2`, `--spacing-x3`, `--text-secondary` |

### Colors (atoms)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/atoms/Colors/Colors.tsx | base | default | `--bg-primary`, `--bg-secondary`, `--overlay-control-text`, `--primary`, `--spacing-x1`, `--spacing-x3`, `--spacing-x4`, `--spacing-x6`, `--spacing-x8`, `text-3_5xl-rem`, `text-xxs-rem` |

### Content (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/Content/Content.tsx | base | default | `--spacing-x1` |

### DataEntryTable (organisms)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/organisms/DataEntryTable/DataEntryTableBody.tsx | base | default | `--bg-primary`, `--bg-secondary`, `--border-primary`, `--border-secondary`, `--component-height-md`, `--critical`, `--critical-light`, `--font-size-md`, `--primary`, `--radius-md`, `--radius-none`, `--radius-sm`, `--secondary`, `--spacing-x0`, `--spacing-x1`, `--spacing-x12`, `--spacing-x2`, `--spacing-x20`, `--spacing-x3`, `--spacing-x5`, `--spacing-x6`, `--spacing-x8`, `--tertiary` |

### DatePicker (molecules)

Status: `variant-detected`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/DatePicker/Calendar.tsx | inRange | false | _none detected_ |
| src/components/molecules/DatePicker/Calendar.tsx | inRange | true | `--color-border-primary` |
| src/components/molecules/DatePicker/Calendar.tsx | open | false | `--color-primary` |
| src/components/molecules/DatePicker/Calendar.tsx | open | true | `--color-primary` |
| src/components/molecules/DatePicker/Calendar.tsx | range | false | `--spacing-x4` |
| src/components/molecules/DatePicker/Calendar.tsx | range | false | _none detected_ |
| src/components/molecules/DatePicker/Calendar.tsx | range | true | `--spacing-x4` |
| src/components/molecules/DatePicker/Calendar.tsx | range | true | _none detected_ |
| src/components/molecules/DatePicker/Calendar.tsx | selected | false | `--bg-primary`, `--border-secondary`, `--primary` |
| src/components/molecules/DatePicker/Calendar.tsx | selected | true | `--bg-primary`, `--primary` |
| src/components/molecules/DatePicker/Calendar.tsx | type | default | `--bg-primary`, `--border-primary`, `--primary` |
| src/components/molecules/DatePicker/Calendar.tsx | type | disabled | `--bg-primary`, `--border-secondary` |
| src/components/molecules/DatePicker/Calendar.tsx | type | hover | `--border-primary`, `--primary` |
| src/components/molecules/DatePicker/Calendar.tsx | type | rangeEnd | `--border-secondary`, `--primary` |
| src/components/molecules/DatePicker/Calendar.tsx | type | rangeSelected | `--border-primary`, `--primary` |
| src/components/molecules/DatePicker/Calendar.tsx | type | rangeStart | `--border-secondary`, `--primary` |
| src/components/molecules/DatePicker/Calendar.tsx | type | selected | `--border-secondary`, `--primary` |
| src/components/molecules/DatePicker/Calendar.tsx | year | false | _none detected_ |
| src/components/molecules/DatePicker/Calendar.tsx | year | true | _none detected_ |
| src/components/molecules/DatePicker/DatePicker.tsx | horizontalPadding | lg | `--spacing-x5` |
| src/components/molecules/DatePicker/DatePicker.tsx | horizontalPadding | md | `--spacing-x4` |
| src/components/molecules/DatePicker/DatePicker.tsx | horizontalPadding | sm | `--spacing-x3` |
| src/components/molecules/DatePicker/DatePicker.tsx | horizontalPadding | xl | `--spacing-x6` |
| src/components/molecules/DatePicker/DatePicker.tsx | horizontalPadding | xs | `--spacing-x2` |
| src/components/molecules/DatePicker/DatePicker.tsx | horizontalPadding | xxl | `--spacing-x7` |
| src/components/molecules/DatePicker/DatePicker.tsx | horizontalPadding | xxs | `--spacing-x1-5` |
| src/components/molecules/DatePicker/DatePicker.tsx | rangeHorizontalPadding | lg | `--spacing-x4`, `--spacing-x5` |
| src/components/molecules/DatePicker/DatePicker.tsx | rangeHorizontalPadding | md | `--spacing-x3`, `--spacing-x4` |
| src/components/molecules/DatePicker/DatePicker.tsx | rangeHorizontalPadding | sm | `--spacing-x2`, `--spacing-x3` |
| src/components/molecules/DatePicker/DatePicker.tsx | rangeHorizontalPadding | xl | `--spacing-x5`, `--spacing-x6` |
| src/components/molecules/DatePicker/DatePicker.tsx | rangeHorizontalPadding | xs | `--spacing-x1-5`, `--spacing-x2` |
| src/components/molecules/DatePicker/DatePicker.tsx | rangeHorizontalPadding | xxl | `--spacing-x6`, `--spacing-x7` |
| src/components/molecules/DatePicker/DatePicker.tsx | rangeHorizontalPadding | xxs | `--spacing-x1`, `--spacing-x1-5` |
| src/components/molecules/DatePicker/DatePicker.tsx | size | l | `text-md-rem` |
| src/components/molecules/DatePicker/DatePicker.tsx | size | lg | `text-md-rem` |
| src/components/molecules/DatePicker/DatePicker.tsx | size | md | `text-sm-rem` |
| src/components/molecules/DatePicker/DatePicker.tsx | size | sm | `text-sm-rem` |
| src/components/molecules/DatePicker/DatePicker.tsx | size | xl | `text-md-rem` |
| src/components/molecules/DatePicker/DatePicker.tsx | size | xs | `text-xs-rem` |
| src/components/molecules/DatePicker/DatePicker.tsx | size | xxl | `text-lg-rem` |
| src/components/molecules/DatePicker/DatePicker.tsx | size | xxs | `text-xs-rem` |
| src/components/molecules/DatePicker/DatePicker.tsx | state | default | `--color-primary` |
| src/components/molecules/DatePicker/DatePicker.tsx | state | default | `--primary` |
| src/components/molecules/DatePicker/DatePicker.tsx | state | disabled | _none detected_ |
| src/components/molecules/DatePicker/DatePicker.tsx | state | filled | _none detected_ |
| src/components/molecules/DatePicker/DatePicker.tsx | state | filled | `--primary` |
| src/components/molecules/DatePicker/DatePicker.tsx | state | focused | _none detected_ |
| src/components/molecules/DatePicker/DatePicker.tsx | state | focused | `--primary` |
| src/components/molecules/DatePicker/DatePicker.tsx | state | hover | `--color-primary` |
| src/components/molecules/DatePicker/DatePicker.tsx | state | hover | `--primary` |
| src/components/molecules/DatePicker/DatePicker.tsx | state | prefilled | _none detected_ |
| src/components/molecules/DatePicker/DatePicker.tsx | state | prefilled | `--primary` |
| src/components/molecules/DatePicker/DatePicker.tsx | state | typing | _none detected_ |
| src/components/molecules/DatePicker/DatePicker.tsx | state | typing | `--primary` |
| src/components/molecules/DatePicker/DatePicker.tsx | verticalPadding | lg | `--spacing-x4` |
| src/components/molecules/DatePicker/DatePicker.tsx | verticalPadding | md | `--spacing-x3` |
| src/components/molecules/DatePicker/DatePicker.tsx | verticalPadding | sm | `--spacing-x2` |
| src/components/molecules/DatePicker/DatePicker.tsx | verticalPadding | xl | `--spacing-x5` |
| src/components/molecules/DatePicker/DatePicker.tsx | verticalPadding | xs | `--spacing-x1` |
| src/components/molecules/DatePicker/DatePicker.tsx | verticalPadding | xxl | `--spacing-x6` |
| src/components/molecules/DatePicker/DatePicker.tsx | verticalPadding | xxs | `--spacing-x0-5` |

### Descriptions (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/Descriptions/Descriptions.tsx | base | default | `--color-border-secondary`, `--color-primary`, `--color-secondary`, `--primary-500`, `--radius-md`, `--spacing-x2`, `--spacing-x3`, `--spacing-x4` |

### DisplayBlock (organisms)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/organisms/DisplayBlock/DisplayBlock.tsx | base | default | `--color-bg-primary`, `--spacing-x0`, `--spacing-x1`, `--spacing-x5` |

### Divider (atoms)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/atoms/Divider/Divider.tsx | base | default | `--bg-primary`, `--border-primary`, `--border-secondary`, `--spacing-x0-5`, `--spacing-x2`, `--spacing-x4` |

### DoughnutChart (charts)

Status: `no-token-match`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/charts/DoughnutChart.tsx | base | default | _none detected_ |

### Drawer (organisms)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/organisms/Drawer/DrawerContent.tsx | section | header | `--bg-primary`, `--border-primary`, `--spacing-x4`, `--spacing-x6` |
| src/components/organisms/Drawer/DrawerContent.tsx | section | body | `--bg-primary`, `--spacing-x4`, `--spacing-x6` |
| src/components/organisms/Drawer/DrawerContent.tsx | section | footer | `--bg-primary`, `--border-primary`, `--spacing-x4`, `--spacing-x6` |

### Dropdown (molecules)

Status: `variant-detected`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/Dropdown/Dropdown.styles.ts | size | lg | `text-md-rem` |
| src/components/molecules/Dropdown/Dropdown.styles.ts | size | md | `text-sm-rem` |
| src/components/molecules/Dropdown/Dropdown.styles.ts | size | sm | `text-sm-rem` |
| src/components/molecules/Dropdown/Dropdown.styles.ts | size | xl | `text-md-rem` |
| src/components/molecules/Dropdown/Dropdown.styles.ts | size | xs | `text-xs-rem` |
| src/components/molecules/Dropdown/Dropdown.styles.ts | size | xxl | `text-lg-rem` |
| src/components/molecules/Dropdown/Dropdown.styles.ts | size | xxs | `text-xs-rem` |
| src/components/molecules/Dropdown/Dropdown.styles.ts | sizeStyles | lg | `--spacing-x4`, `--spacing-x5`, `text-md-rem` |
| src/components/molecules/Dropdown/Dropdown.styles.ts | sizeStyles | md | `--spacing-x3`, `--spacing-x4`, `text-sm-rem` |
| src/components/molecules/Dropdown/Dropdown.styles.ts | sizeStyles | sm | `--spacing-x2`, `--spacing-x3`, `text-sm-rem` |
| src/components/molecules/Dropdown/Dropdown.styles.ts | sizeStyles | xl | `--spacing-x5`, `--spacing-x6`, `text-md-rem` |
| src/components/molecules/Dropdown/Dropdown.styles.ts | sizeStyles | xs | `--spacing-x1`, `--spacing-x2`, `text-xs-rem` |
| src/components/molecules/Dropdown/Dropdown.styles.ts | sizeStyles | xxl | `--spacing-x6`, `--spacing-x7`, `text-lg-rem` |
| src/components/molecules/Dropdown/Dropdown.styles.ts | sizeStyles | xxs | `--spacing-x0-5`, `--spacing-x1-5`, `text-xs-rem` |
| src/components/molecules/Dropdown/Dropdown.styles.ts | state | default | `--border-primary`, `--primary` |
| src/components/molecules/Dropdown/Dropdown.styles.ts | state | disabled | _none detected_ |
| src/components/molecules/Dropdown/Dropdown.styles.ts | state | error | _none detected_ |
| src/components/molecules/Dropdown/Dropdown.styles.ts | type | groups | _none detected_ |
| src/components/molecules/Dropdown/Dropdown.styles.ts | type | normal | _none detected_ |
| src/components/molecules/Dropdown/Dropdown.styles.ts | type | search | _none detected_ |
| src/components/molecules/Dropdown/Dropdown.tsx | size | lg | `text-md-rem` |
| src/components/molecules/Dropdown/Dropdown.tsx | size | md | `text-sm-rem` |
| src/components/molecules/Dropdown/Dropdown.tsx | size | sm | `text-sm-rem` |
| src/components/molecules/Dropdown/Dropdown.tsx | size | xl | `text-md-rem` |
| src/components/molecules/Dropdown/Dropdown.tsx | size | xs | `text-xs-rem` |
| src/components/molecules/Dropdown/Dropdown.tsx | size | xxl | `text-lg-rem` |
| src/components/molecules/Dropdown/Dropdown.tsx | size | xxs | `text-xs-rem` |
| src/components/molecules/Dropdown/Dropdown.tsx | state | default | `--border-primary`, `--primary` |
| src/components/molecules/Dropdown/Dropdown.tsx | state | disabled | _none detected_ |
| src/components/molecules/Dropdown/Dropdown.tsx | state | error | _none detected_ |
| src/components/molecules/Dropdown/Dropdown.tsx | type | groups | _none detected_ |
| src/components/molecules/Dropdown/Dropdown.tsx | type | normal | _none detected_ |
| src/components/molecules/Dropdown/Dropdown.tsx | type | search | _none detected_ |

### DropdownMenu (molecules)

Status: `variant-detected`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/DropdownMenu/DropdownMenu.tsx | property | default | `--spacing-x1`, `--spacing-x10` |
| src/components/molecules/DropdownMenu/DropdownMenu.tsx | property | disabled-info | `--spacing-x1`, `--spacing-x10` |
| src/components/molecules/DropdownMenu/DropdownMenu.tsx | property | groups | `--spacing-x1`, `--spacing-x10`, `--spacing-x3` |
| src/components/molecules/DropdownMenu/DropdownMenu.tsx | property | search | `--spacing-x10`, `--spacing-x4` |
| src/components/molecules/DropdownMenu/DropdownMenu.tsx | property | search-segmented | `--spacing-x10`, `--spacing-x4` |
| src/components/molecules/DropdownMenu/DropdownMenuItem.tsx | prefix | checkbox | _none detected_ |
| src/components/molecules/DropdownMenu/DropdownMenuItem.tsx | prefix | icon | _none detected_ |
| src/components/molecules/DropdownMenu/DropdownMenuItem.tsx | prefix | none | _none detected_ |
| src/components/molecules/DropdownMenu/DropdownMenuItem.tsx | prefix | radio | _none detected_ |
| src/components/molecules/DropdownMenu/DropdownMenuItem.tsx | state | default | `--color-bg-primary` |
| src/components/molecules/DropdownMenu/DropdownMenuItem.tsx | state | disabled | `--color-bg-primary` |
| src/components/molecules/DropdownMenu/DropdownMenuItem.tsx | state | focused | `--color-border-primary` |
| src/components/molecules/DropdownMenu/DropdownMenuItem.tsx | state | hover | `--color-border-secondary` |
| src/components/molecules/DropdownMenu/DropdownMenuItem.tsx | state | info | `--color-bg-primary`, `--color-border-primary` |
| src/components/molecules/DropdownMenu/DropdownMenuItem.tsx | state | selected | `--color-bg-secondary` |
| src/components/molecules/DropdownMenu/DropdownMenuItem.tsx | suffix | false | _none detected_ |
| src/components/molecules/DropdownMenu/DropdownMenuItem.tsx | suffix | true | _none detected_ |

### DualAxesChart (charts)

Status: `no-token-match`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/charts/DualAxesChart.tsx | base | default | _none detected_ |

### Empty (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/Empty/Empty.tsx | base | default | `--bg-primary`, `--border-primary`, `--border-secondary`, `--critical`, `--critical-light`, `--spacing-x16`, `--spacing-x4`, `--spacing-x6`, `--spacing-x8`, `--tertiary` |

### FigmaBadge (atoms)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/atoms/FigmaBadge/FigmaBadge.tsx | base | default | `--color-warning`, `--color-warning-light`, `--radius-sm`, `--spacing-x0-5`, `--spacing-x1`, `--spacing-x2`, `text-xxs-rem` |

### FileCard (organisms)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/organisms/FileCard/FileCard.tsx | base | default | `--bg-secondary`, `--color-critical`, `--critical`, `--glass-hover`, `--positive`, `--primary`, `--radius-md`, `--secondary`, `--spacing-x1`, `--spacing-x10`, `--spacing-x2`, `--spacing-x3`, `--spacing-x5`, `--spacing-x7` |

### FileThumbnail (organisms)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/organisms/FileThumbnail/FileThumbnail.tsx | base | default | `--overlay-control-text`, `--overlay-strong`, `--secondary`, `--spacing-x1`, `--spacing-x2`, `--spacing-x20`, `--spacing-x4`, `--spacing-x5`, `text-sm-rem` |

### FileTypeIcon (organisms)

Status: `variant-detected`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/organisms/FileTypeIcon/FileTypeIcon.tsx | size | lg | `--spacing-x12`, `text-md-rem` |
| src/components/organisms/FileTypeIcon/FileTypeIcon.tsx | size | md | `--spacing-x10`, `text-sm-rem` |
| src/components/organisms/FileTypeIcon/FileTypeIcon.tsx | size | sm | `--spacing-x8`, `text-sm-rem` |
| src/components/organisms/FileTypeIcon/FileTypeIcon.tsx | size | xl | `--spacing-x14`, `text-md-rem` |
| src/components/organisms/FileTypeIcon/FileTypeIcon.tsx | size | xs | `--spacing-x5`, `--spacing-x6`, `text-xs-rem` |
| src/components/organisms/FileTypeIcon/FileTypeIcon.tsx | size | xxl | `--spacing-x13`, `--spacing-x16`, `text-lg-rem` |
| src/components/organisms/FileTypeIcon/FileTypeIcon.tsx | size | xxs | `text-xs-rem` |
| src/components/organisms/FileTypeIcon/FileTypeIcon.tsx | textSizes | lg | `text-md-rem` |
| src/components/organisms/FileTypeIcon/FileTypeIcon.tsx | textSizes | md | `text-sm-rem` |
| src/components/organisms/FileTypeIcon/FileTypeIcon.tsx | textSizes | sm | `text-sm-rem` |
| src/components/organisms/FileTypeIcon/FileTypeIcon.tsx | textSizes | xl | `text-md-rem` |
| src/components/organisms/FileTypeIcon/FileTypeIcon.tsx | textSizes | xs | `text-xs-rem` |
| src/components/organisms/FileTypeIcon/FileTypeIcon.tsx | textSizes | xxl | `text-lg-rem` |
| src/components/organisms/FileTypeIcon/FileTypeIcon.tsx | textSizes | xxs | `text-xs-rem` |

### FileValidationCard (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/FileValidationCard/FileValidationCard.tsx | base | default | `--bg-primary`, `--bg-secondary`, `--border-secondary`, `--color-neutral`, `--color-neutral-light`, `--critical`, `--critical-light`, `--primary`, `--radius-md`, `--radius-sm`, `--secondary`, `--spacing-x1`, `--spacing-x2`, `--spacing-x3`, `--spacing-x4`, `--spacing-x5`, `--spacing-x6`, `--spacing-x8` |

### FilterDateRange (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/FilterDateRange/FilterDateRange.tsx | base | default | `--bg-secondary`, `--spacing-x10`, `--spacing-x2` |

### FilterDropdown (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/FilterDropdown/FilterDropdown.tsx | base | default | `--bg-secondary`, `--spacing-x10`, `--spacing-x2` |

### FilterSearch (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/FilterSearch/FilterSearch.tsx | base | default | `--spacing-x10`, `--spacing-x2` |

### FloatButton (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/FloatButton/FloatButton.tsx | base | default | `--button-primary-bg`, `--button-primary-border`, `--button-primary-hover-bg`, `--button-primary-text`, `--button-secondary-bg`, `--button-secondary-border`, `--button-secondary-hover-bg`, `--button-secondary-hover-border`, `--button-secondary-text`, `--color-bg-primary`, `--danger`, `--primary`, `--spacing-x0-5`, `--spacing-x1-5`, `--spacing-x10`, `--spacing-x3`, `--spacing-x4`, `--spacing-x6`, `text-xxs-rem` |

### Footer (organisms)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/organisms/Footer/Footer.tsx | base | default | `--spacing-x4`, `--spacing-x5` |

### Form (organisms)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/organisms/Form/Form.tsx | base | default | `--bg-primary`, `--border-secondary`, `--radius-md`, `--secondary`, `--spacing-x1`, `--spacing-x2`, `--spacing-x4` |

### GaugeChart (charts)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/charts/GaugeChart.tsx | base | default | `--color-primary`, `--color-secondary` |

### Grid (organisms)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/organisms/Grid/Grid.tsx | base | default | `--spacing-x1`, `--spacing-x12` |

### HorizontalBarChart (charts)

Status: `no-token-match`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/charts/HorizontalBarChart.tsx | base | default | _none detected_ |

### HoverCard (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/HoverCard/HoverCardContent.tsx | base | default | `--color-bg-primary`, `--color-border-secondary`, `--radius-md`, `--shadow-xl`, `--spacing-x2`, `--spacing-x4` |

### Icons (atoms)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/atoms/Icons/AddTrip.tsx | base | default | `--bg-primary`, `--border-primary`, `--critical`, `--primary`, `--secondary`, `--tertiary` |

### Illustration (atoms)

Status: `variant-detected`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/atoms/Illustration/Illustration.tsx | rounded | lg | `--radius-2xl` |
| src/components/atoms/Illustration/Illustration.tsx | rounded | md | `--radius-xl` |
| src/components/atoms/Illustration/Illustration.tsx | rounded | none | _none detected_ |
| src/components/atoms/Illustration/Illustration.tsx | rounded | sm | `--radius-lg` |

### Image (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/Image/Image.tsx | base | default | `--color-bg-secondary`, `--color-tertiary`, `--overlay-control-bg`, `--overlay-control-bg-hover`, `--overlay-control-divider`, `--overlay-control-text`, `--overlay-strong`, `--spacing-x15`, `--spacing-x2`, `--spacing-x4` |

### Input (atoms)

Status: `variant-detected`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/atoms/Input/Input.tsx | iconPadding | lg | `--spacing-x12` |
| src/components/atoms/Input/Input.tsx | iconPadding | md | `--spacing-x11` |
| src/components/atoms/Input/Input.tsx | iconPadding | sm | `--spacing-x9` |
| src/components/atoms/Input/Input.tsx | iconPadding | xl | `--spacing-x14` |
| src/components/atoms/Input/Input.tsx | iconPadding | xs | `--spacing-x7` |
| src/components/atoms/Input/Input.tsx | iconPadding | xxl | `--spacing-x16` |
| src/components/atoms/Input/Input.tsx | iconPadding | xxs | `--spacing-x6` |
| src/components/atoms/Input/InputField.tsx | iconPadding | lg | `--spacing-x12` |
| src/components/atoms/Input/InputField.tsx | iconPadding | md | `--spacing-x11` |
| src/components/atoms/Input/InputField.tsx | iconPadding | sm | `--spacing-x9` |
| src/components/atoms/Input/InputField.tsx | iconPadding | xl | `--spacing-x14` |
| src/components/atoms/Input/InputField.tsx | iconPadding | xs | `--spacing-x7` |
| src/components/atoms/Input/InputField.tsx | iconPadding | xxl | `--spacing-x16` |
| src/components/atoms/Input/InputField.tsx | iconPadding | xxs | `--spacing-x6` |

### InputNumber (molecules)

Status: `variant-detected`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/InputNumber/InputNumberField.tsx | size | lg | `--spacing-x5`, `text-md-rem` |
| src/components/molecules/InputNumber/InputNumberField.tsx | size | md | `--spacing-x4`, `text-sm-rem` |
| src/components/molecules/InputNumber/InputNumberField.tsx | size | sm | `--spacing-x3`, `text-sm-rem` |
| src/components/molecules/InputNumber/InputNumberField.tsx | size | xl | `--spacing-x6`, `text-md-rem` |
| src/components/molecules/InputNumber/InputNumberField.tsx | size | xs | `--spacing-x2`, `text-xs-rem` |
| src/components/molecules/InputNumber/InputNumberField.tsx | size | xxl | `--spacing-x7`, `text-lg-rem` |
| src/components/molecules/InputNumber/InputNumberField.tsx | size | xxs | `--spacing-x1-5`, `text-xs-rem` |

### Label (atoms)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/atoms/Label/Label.tsx | base | default | `--critical`, `--font-size-sm-rem`, `--font-size-xs-rem`, `--primary`, `--spacing-x1`, `--spacing-x4`, `--tertiary` |

### LineChart (charts)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/charts/LineChart.tsx | base | default | `--color-bg-primary` |

### List (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/List/ListHeader.tsx | section | header | `--bg-primary`, `--border-primary`, `--spacing-x3`, `--spacing-x4` |
| src/components/molecules/List/ListBody.tsx | section | body | `--bg-primary`, `--spacing-x2`, `--spacing-x3`, `--spacing-x4` |
| src/components/molecules/List/ListFooter.tsx | section | footer | `--bg-primary`, `--border-primary`, `--spacing-x3`, `--spacing-x4` |

### ListingLayout (templates)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/templates/ListingLayout/ListingLayout.tsx | base | default | `--bg-primary`, `--border-secondary`, `--radius-3xl`, `--radius-4xl`, `--shadow-sm`, `--spacing-x1`, `--spacing-x10`, `--spacing-x12`, `--spacing-x2`, `--spacing-x3`, `--spacing-x4`, `--spacing-x5`, `--spacing-x6`, `--spacing-x8` |

### Loader (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/Loader/Loader.tsx | base | default | `--border-primary`, `--primary`, `--spacing-x2`, `--spacing-x5` |

### Logos (atoms)

Status: `no-token-match`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/atoms/Logos/BirlaPivotLogo.tsx | base | default | _none detected_ |

### Mentions (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/Mentions/Mentions.tsx | base | default | `--color-bg-primary`, `--color-border-primary`, `--color-critical`, `--color-neutral-light`, `--color-primary`, `--color-tertiary`, `--color-warning`, `--font-size-sm-rem`, `--radius-md`, `--spacing-x10`, `--spacing-x2`, `--spacing-x3`, `--spacing-x4` |

### Message (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/Message/Message.tsx | base | default | `--bg-primary`, `--border-primary`, `--critical`, `--critical-light`, `--neutral`, `--neutral-light`, `--positive`, `--positive-light`, `--primary`, `--radius-md`, `--spacing-x1`, `--spacing-x2`, `--spacing-x3`, `--spacing-x4`, `--tertiary`, `--warning`, `--warning-light` |

### Modal (organisms)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/organisms/Modal/ModalContent.tsx | section | header | `--bg-primary`, `--border-primary`, `--spacing-x4`, `--spacing-x6` |
| src/components/organisms/Modal/ModalContent.tsx | section | body | `--bg-primary`, `--spacing-x4`, `--spacing-x6` |
| src/components/organisms/Modal/ModalContent.tsx | section | footer | `--bg-primary`, `--border-primary`, `--spacing-x4`, `--spacing-x6` |

### NavigationMenu (organisms)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/organisms/NavigationMenu/NavigationMenu.tsx | base | default | `--color-bg-primary`, `--color-bg-secondary`, `--color-border-primary`, `--color-neutral`, `--color-neutral-light`, `--color-primary`, `--color-tertiary`, `--font-size-lg-rem`, `--font-size-md-rem`, `--font-size-sm-rem`, `--radius-md`, `--radius-xl`, `--shadow-lg`, `--spacing-x1`, `--spacing-x12`, `--spacing-x2`, `--spacing-x3`, `--spacing-x4`, `--spacing-x5`, `--spacing-x6`, `--spacing-x8`, `--spacing-x9` |

### NavigationPopover (organisms)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/organisms/NavigationPopover/NavigationLauncher.tsx | base | default | `--bg-primary`, `--bg-secondary`, `--border-primary`, `--border-secondary`, `--font-size-md-rem`, `--neutral`, `--primary`, `--spacing-x1`, `--spacing-x10`, `--spacing-x2`, `--spacing-x2-5`, `--spacing-x3`, `--spacing-x4`, `--spacing-x5`, `--spacing-x6`, `--spacing-x9`, `--tertiary`, `text-md-rem` |

### Notification (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/Notification/Notification.tsx | base | default | `--spacing-x2`, `--spacing-x4` |

### PageHeader (organisms)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/organisms/PageHeader/PageHeader.tsx | base | default | `--bg-primary`, `--bg-secondary`, `--border-secondary`, `--primary`, `--radius-lg`, `--radius-md`, `--secondary`, `--spacing-x1`, `--spacing-x10`, `--spacing-x11`, `--spacing-x2`, `--spacing-x3`, `--spacing-x4`, `--spacing-x5`, `--spacing-x6`, `--spacing-x7`, `--tertiary`, `text-md-rem`, `text-sm-rem`, `text-xl-rem` |

### PageHeaderFilters (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/PageHeaderFilters/PageHeaderFilters.tsx | base | default | `--spacing-x2`, `--spacing-x3`, `--spacing-x5` |

### Pagination (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/Pagination/PaginationItem.tsx | type | page | `--bg-primary`, `--border-primary`, `--radius-md`, `--spacing-x1`, `--spacing-x2` |
| src/components/molecules/Pagination/PaginationQuickJumper.tsx | type | quick-jumper | `--bg-primary`, `--border-primary`, `--radius-md`, `--spacing-x1-5`, `--spacing-x2` |

### PercentageOfChargeInput (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/PercentageOfChargeInput/PercentageOfChargeInput.tsx | base | default | `--bg-primary`, `--bg-secondary`, `--border-primary`, `--critical`, `--font-size-lg-rem`, `--font-size-md-rem`, `--font-size-sm-rem`, `--font-size-xs-rem`, `--primary`, `--radius-md`, `--secondary`, `--shadow-md`, `--spacing-x1-5`, `--spacing-x10`, `--spacing-x12`, `--spacing-x14`, `--spacing-x16`, `--spacing-x2`, `--spacing-x2-5`, `--spacing-x3`, `--spacing-x4`, `--spacing-x5`, `--spacing-x6`, `--spacing-x8`, `--spacing-x9`, `--tertiary` |

### PieChart (charts)

Status: `no-token-match`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/charts/PieChart.tsx | base | default | _none detected_ |

### PolarAreaChart (charts)

Status: `no-token-match`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/charts/PolarAreaChart.tsx | base | default | _none detected_ |

### Popconfirm (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/Popconfirm/PopconfirmActions.tsx | base | default | `--color-bg-primary`, `--color-border-secondary`, `--color-warning`, `--radius-md`, `--shadow-lg`, `--spacing-x0-5`, `--spacing-x1-5`, `--spacing-x10`, `--spacing-x2`, `--spacing-x4`, `--spacing-x5` |

### ProgressBar (molecules)

Status: `variant-detected`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/ProgressBar/ProgressBar.tsx | size | lg | `--spacing-x3`, `text-md-rem` |
| src/components/molecules/ProgressBar/ProgressBar.tsx | size | md | `--spacing-x2`, `text-sm-rem` |
| src/components/molecules/ProgressBar/ProgressBar.tsx | size | sm | `--spacing-x1`, `text-sm-rem` |

### ProgressList (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/ProgressList/ProgressList.tsx | base | default | `--border-primary`, `--border-secondary`, `--color-bg-primary`, `--critical`, `--critical-light`, `--glass-hover`, `--primary`, `--secondary`, `--spacing-x0-5`, `--spacing-x1`, `--spacing-x10`, `--spacing-x2`, `--spacing-x4`, `--spacing-x5`, `--spacing-x6`, `--spacing-x7`, `--tertiary`, `text-sm-rem`, `text-xxs-rem` |

### QuickFilters (organisms)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/organisms/QuickFilters/QuickFilters.tsx | base | default | `--color-bg-primary`, `--color-bg-secondary`, `--color-border-primary`, `--color-border-secondary`, `--color-critical`, `--color-neutral`, `--color-positive`, `--color-primary`, `--color-warning`, `--glass-selected`, `--radius-full`, `--radius-md`, `--spacing-x1`, `--spacing-x2`, `--spacing-x5`, `--spacing-x6` |

### RadarChart (charts)

Status: `no-token-match`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/charts/RadarChart.tsx | base | default | _none detected_ |

### RadialChart (charts)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/charts/RadialChart.tsx | base | default | `--spacing-x6` |

### RadioGroup (atoms)

Status: `variant-detected`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/atoms/RadioGroup/RadioItem.tsx | size | md | `--radio-gap`, `--spacing-x4`, `text-sm-rem` |
| src/components/atoms/RadioGroup/RadioItem.tsx | size | sm | `--spacing-x1-5`, `--spacing-x3`, `text-sm-rem` |
| src/components/atoms/RadioGroup/RadioItemInput.tsx | size | md | `--radio-size`, `text-sm-rem` |
| src/components/atoms/RadioGroup/RadioItemInput.tsx | size | sm | `--spacing-x4`, `text-sm-rem` |

### RadioSelector (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/RadioSelector/RadioSelector.tsx | base | default | `--bg-secondary`, `--border-primary`, `--border-secondary`, `--primary`, `--secondary-300`, `--shadow-sm`, `--spacing-x0-5`, `--spacing-x3`, `--spacing-x4`, `--spacing-x5`, `--tertiary` |

### Rate (molecules)

Status: `variant-detected`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/Rate/Rate.tsx | size | lg | `--spacing-x2`, `text-md-rem` |
| src/components/molecules/Rate/Rate.tsx | size | md | `--spacing-x1-5`, `text-sm-rem` |
| src/components/molecules/Rate/Rate.tsx | size | sm | `--spacing-x1`, `text-sm-rem` |
| src/components/molecules/Rate/Rate.tsx | size | xl | `--spacing-x2-5`, `text-md-rem` |

### ReadOnly (atoms)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/atoms/ReadOnly/ReadOnly.tsx | base | default | `--secondary`, `--spacing-x0-5`, `--spacing-x1`, `--spacing-x2`, `--spacing-x2-5`, `--spacing-x4` |

### Result (organisms)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/organisms/Result/Result.tsx | status | success|error|info|warning | `--critical`, `--neutral`, `--positive`, `--spacing-x12`, `--spacing-x8`, `--warning` |
| src/components/organisms/Result/Result.tsx | status | 404|403|500 | `--critical`, `--spacing-x16`, `--tertiary`, `text-5xl-rem` |

### ScatterChart (charts)

Status: `no-token-match`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/charts/ScatterChart.tsx | base | default | _none detected_ |

### SegmentedTabs (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/SegmentedTabs/SegmentedTabs.tsx | base | default | `--bg-primary`, `--bg-secondary`, `--color-divider`, `--primary`, `--secondary`, `--shadow-sm`, `--spacing-x1`, `--spacing-x2`, `--spacing-x4`, `--spacing-x6`, `--spacing-x8`, `text-sm-rem` |

### Select (atoms)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/atoms/Select/Select.tsx | base | default | `--bg-primary`, `--bg-secondary`, `--border-primary`, `--border-secondary`, `--primary`, `--radix-select-trigger-height`, `--radix-select-trigger-width`, `--spacing-x1`, `--spacing-x1-5`, `--spacing-x2`, `--spacing-x3`, `--spacing-x8`, `--tertiary`, `text-sm-rem` |

### Select (molecules)

Status: `variant-detected`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/Select/SelectTrigger.tsx | size | lg | `--spacing-x4`, `--spacing-x5`, `text-md-rem` |
| src/components/molecules/Select/SelectTrigger.tsx | size | md | `--spacing-x3`, `--spacing-x4`, `text-sm-rem` |
| src/components/molecules/Select/SelectTrigger.tsx | size | sm | `--spacing-x2`, `--spacing-x3`, `text-sm-rem` |
| src/components/molecules/Select/SelectTrigger.tsx | size | xl | `--spacing-x5`, `--spacing-x6`, `text-md-rem` |
| src/components/molecules/Select/SelectTrigger.tsx | size | xs | `--spacing-x1`, `--spacing-x2`, `text-xs-rem` |
| src/components/molecules/Select/SelectTrigger.tsx | size | xxl | `--spacing-x6`, `--spacing-x7`, `text-lg-rem` |
| src/components/molecules/Select/SelectTrigger.tsx | size | xxs | `--spacing-x0-5`, `--spacing-x1-5`, `text-xs-rem` |
| src/components/molecules/Select/SelectValue.tsx | fontSize | lg | `text-md-rem` |
| src/components/molecules/Select/SelectValue.tsx | fontSize | md | `text-sm-rem` |
| src/components/molecules/Select/SelectValue.tsx | fontSize | sm | `text-sm-rem` |
| src/components/molecules/Select/SelectValue.tsx | fontSize | xl | `text-md-rem` |
| src/components/molecules/Select/SelectValue.tsx | fontSize | xs | `text-xs-rem` |
| src/components/molecules/Select/SelectValue.tsx | fontSize | xxl | `text-lg-rem` |
| src/components/molecules/Select/SelectValue.tsx | fontSize | xxs | `text-xs-rem` |

### SimpleColumnLayout (molecules)

Status: `no-token-match`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/SimpleColumnLayout/SimpleColumnLayout.tsx | base | default | _none detected_ |

### Skeleton (atoms)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/atoms/Skeleton/Skeleton.tsx | base | default | `--color-bg-secondary`, `--radius-md`, `--spacing-x2` |

### Slider (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/Slider/Slider.tsx | base | default | `--bg-primary`, `--border-secondary`, `--font-size-sm-rem`, `--primary`, `--spacing-x1`, `--spacing-x2`, `--spacing-x4`, `--tertiary` |

### Spacer (atoms)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/atoms/Spacer/Spacer.tsx | base | default | `--spacing-x1`, `--spacing-x10`, `--spacing-x11`, `--spacing-x12`, `--spacing-x2`, `--spacing-x3`, `--spacing-x4`, `--spacing-x5`, `--spacing-x6`, `--spacing-x7`, `--spacing-x8`, `--spacing-x9` |

### Spin (atoms)

Status: `variant-detected`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/atoms/Spin/Spin.tsx | size | lg | `--spacing-x4`, `text-md-rem` |
| src/components/atoms/Spin/Spin.tsx | size | md | `--spacing-x3`, `text-sm-rem` |
| src/components/atoms/Spin/Spin.tsx | size | sm | `--spacing-x2`, `text-sm-rem` |
| src/components/atoms/Spin/Spin.tsx | size | xl | `--spacing-x6`, `text-md-rem` |

### StackedBarChart (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/StackedBarChart/StackedBarChart.tsx | base | default | `--primary`, `--radius-2xs`, `--radius-smd`, `--secondary`, `--spacing-x2`, `--spacing-x3`, `--spacing-x4`, `--spacing-x5`, `text-xs-rem`, `text-xxs-rem` |

### StackedBarChart (charts)

Status: `no-token-match`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/charts/StackedBarChart.tsx | base | default | _none detected_ |

### Statistic (atoms)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/atoms/Statistic/Statistic.tsx | base | default | `--spacing-x1`, `--spacing-x2` |

### Steps (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/Steps/StepContent.tsx | base | default | `--primary`, `--radius-md`, `--spacing-x2`, `--spacing-x3`, `--spacing-x5`, `--tertiary`, `text-lg-rem`, `text-md-rem` |

### SubText (atoms)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/atoms/SubText/SubText.tsx | base | default | `--secondary`, `--spacing-x2`, `--spacing-x2-5`, `--spacing-x4` |

### Switch (atoms)

Status: `variant-detected`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/atoms/Switch/SwitchInput.tsx | size | md | `--spacing-x2`, `--spacing-x5`, `text-sm-rem` |
| src/components/atoms/Switch/SwitchInput.tsx | size | sm | `--spacing-x1-5`, `--spacing-x4`, `text-sm-rem` |

### Table (organisms)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/organisms/Table/TableCell.tsx | cell | header | `--bg-secondary`, `--border-primary`, `--spacing-x2`, `--spacing-x4` |
| src/components/organisms/Table/TableCell.tsx | cell | body | `--bg-primary`, `--border-secondary`, `--spacing-x2`, `--spacing-x4` |

### Tabs (organisms)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/organisms/Tabs/Tabs.tsx | type | segmented | `--bg-primary`, `--border-primary`, `--radius-sm`, `--spacing-x1`, `--spacing-x2` |
| src/components/organisms/Tabs/Tabs.tsx | type | line | `--bg-primary`, `--border-primary`, `--spacing-x2`, `--spacing-x3` |

### Text (atoms)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/atoms/Text/Text.tsx | base | default | `--color-primary`, `--spacing-x1`, `--spacing-x2`, `--spacing-x3`, `--spacing-x4` |

### Textarea (atoms)

Status: `variant-detected`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/atoms/Textarea/TextareaField.tsx | size | lg | `--spacing-x16`, `--spacing-x4`, `--spacing-x5`, `text-md-rem` |
| src/components/atoms/Textarea/TextareaField.tsx | size | md | `--spacing-x3`, `--spacing-x4`, `text-sm-rem` |
| src/components/atoms/Textarea/TextareaField.tsx | size | sm | `--spacing-x12`, `--spacing-x2`, `--spacing-x3`, `text-sm-rem` |
| src/components/atoms/Textarea/TextareaField.tsx | size | xl | `--spacing-x5`, `--spacing-x6`, `text-md-rem` |
| src/components/atoms/Textarea/TextareaField.tsx | size | xs | `--spacing-x1`, `--spacing-x10`, `--spacing-x2`, `text-xs-rem` |
| src/components/atoms/Textarea/TextareaField.tsx | size | xxl | `--spacing-x20`, `--spacing-x6`, `--spacing-x7`, `text-lg-rem` |
| src/components/atoms/Textarea/TextareaField.tsx | size | xxs | `--spacing-x0-5`, `--spacing-x1-5`, `--spacing-x8`, `text-xs-rem` |

### ThemeSwitch (molecules)

Status: `no-token-match`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/ThemeSwitch/ThemeSwitch.tsx | base | default | _none detected_ |

### Timeline (molecules)

Status: `variant-detected`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/Timeline/TimelineDot.tsx | dotBg | danger | `--color-critical` |
| src/components/molecules/Timeline/TimelineDot.tsx | dotBg | neutral | `--color-neutral` |
| src/components/molecules/Timeline/TimelineDot.tsx | dotBg | primary | `--color-primary` |
| src/components/molecules/Timeline/TimelineDot.tsx | dotBg | success | `--color-positive` |
| src/components/molecules/Timeline/TimelineDot.tsx | dotBg | warning | `--color-warning` |
| src/components/molecules/Timeline/TimelineDot.tsx | iconRing | danger | `--color-critical` |
| src/components/molecules/Timeline/TimelineDot.tsx | iconRing | neutral | `--color-neutral` |
| src/components/molecules/Timeline/TimelineDot.tsx | iconRing | primary | `--color-primary` |
| src/components/molecules/Timeline/TimelineDot.tsx | iconRing | success | `--color-positive` |
| src/components/molecules/Timeline/TimelineDot.tsx | iconRing | warning | `--color-warning` |

### TimePicker (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/TimePicker/TimePicker.tsx | base | default | `--color-bg-primary`, `--color-bg-secondary`, `--color-border-primary`, `--color-border-secondary`, `--color-primary`, `--color-tertiary`, `--primary`, `--radius-md`, `--shadow-lg`, `--spacing-x1`, `--spacing-x1-5`, `--spacing-x10`, `--spacing-x14`, `--spacing-x2`, `--spacing-x3`, `--spacing-x8` |

### Toggle (atoms)

Status: `variant-detected`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/atoms/Toggle/Toggle.tsx | size | lg | `--spacing-x12`, `--spacing-x5`, `text-md-rem` |
| src/components/atoms/Toggle/Toggle.tsx | size | md | `--spacing-x10`, `--spacing-x4`, `text-sm-rem` |
| src/components/atoms/Toggle/Toggle.tsx | size | sm | `--spacing-x3`, `--spacing-x8`, `text-sm-rem` |
| src/components/atoms/Toggle/Toggle.tsx | variant | default | `--color-bg-secondary`, `--color-primary`, `--color-secondary` |
| src/components/atoms/Toggle/Toggle.tsx | variant | outline | `--color-bg-secondary`, `--color-border-primary`, `--color-primary`, `--color-secondary` |

### ToggleGroup (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/ToggleGroup/ToggleGroup.tsx | base | default | `--color-bg-primary`, `--radius-md` |

### Tooltip (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/Tooltip/TooltipContent.tsx | placement | top|bottom|left|right | `--bg-primary`, `--border-primary`, `--radius-md`, `--spacing-x1`, `--spacing-x2` |

### Tour (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/Tour/Tour.tsx | base | default | `--color-bg-primary`, `--neutral-200`, `--overlay-medium`, `--primary`, `--spacing-x1`, `--spacing-x2`, `--spacing-x4`, `--text-primary`, `--text-secondary`, `--text-tertiary` |

### Transfer (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/Transfer/Transfer.tsx | base | default | `--border-primary`, `--color-bg-primary`, `--color-bg-secondary`, `--spacing-x10`, `--spacing-x15`, `--spacing-x2`, `--spacing-x2-5`, `--spacing-x20`, `--spacing-x3`, `--spacing-x4`, `--surface-hover`, `--text-tertiary` |

### Tree (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/Tree/TreeNode.tsx | base | default | `--color-bg-secondary`, `--color-border-primary`, `--color-border-secondary`, `--color-primary`, `--color-primary-light`, `--color-secondary`, `--color-tertiary`, `--glass-hover`, `--glass-selected`, `--spacing-x1`, `--spacing-x2`, `--spacing-x3`, `--spacing-x6` |

### TreeSelect (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/TreeSelect/TreeSelect.tsx | base | default | `--color-bg-primary`, `--color-border-secondary`, `--color-tertiary`, `--primary`, `--radius-md`, `--shadow-lg`, `--spacing-x1`, `--spacing-x10`, `--spacing-x15`, `--spacing-x2`, `--spacing-x20`, `--spacing-x3`, `--spacing-x4`, `--spacing-x8` |

### Typography (atoms)

Status: `variant-detected`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/atoms/Typography/Typography.tsx | color | danger | `--critical` |
| src/components/atoms/Typography/Typography.tsx | color | muted | `--tertiary` |
| src/components/atoms/Typography/Typography.tsx | color | primary | `--primary` |
| src/components/atoms/Typography/Typography.tsx | color | success | `--positive` |
| src/components/atoms/Typography/Typography.tsx | color | tertiary | `--tertiary` |
| src/components/atoms/Typography/Typography.tsx | color | warning | `--warning` |

### Upload (organisms)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/organisms/Upload/Upload.tsx | base | default | `--spacing-x10`, `--spacing-x4`, `--spacing-x8` |

### UploadButton (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/UploadButton/UploadButton.tsx | base | default | `--border-primary`, `--primary`, `--radius-md`, `--spacing-x10`, `--spacing-x2`, `--spacing-x3`, `--spacing-x4`, `--spacing-x5` |

### UploadItem (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/UploadItem/UploadItem.tsx | base | default | `--bg-primary`, `--bg-secondary`, `--border-secondary`, `--critical`, `--neutral`, `--primary`, `--radius-md`, `--radius-sm`, `--secondary`, `--spacing-x1`, `--spacing-x2`, `--spacing-x3`, `--spacing-x4`, `--spacing-x5`, `--warning` |

### UploadThumbnail (molecules)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/UploadThumbnail/UploadThumbnail.tsx | base | default | `--color-bg-secondary`, `--color-border-primary`, `--color-critical`, `--color-critical-light`, `--color-primary`, `--color-secondary`, `--radius-full`, `--radius-md`, `--spacing-x1`, `--spacing-x2`, `--spacing-x20`, `--spacing-x3`, `--spacing-x5` |

### UploadZone (organisms)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/organisms/UploadZone/UploadZone.tsx | base | default | `--bg-secondary`, `--border-primary`, `--neutral`, `--primary`, `--radius-md`, `--secondary`, `--spacing-x1`, `--spacing-x3`, `--spacing-x4`, `--spacing-x5`, `--spacing-x8`, `--tertiary` |

### UserProfile (organisms)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/organisms/UserProfile/UserProfile.tsx | base | default | `--bg-primary`, `--spacing-x10`, `--spacing-x2`, `--spacing-x2-5`, `--spacing-x3` |

### UserProfileDropdown (organisms)

Status: `manual-override`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/organisms/UserProfileDropdown/UserProfileDropdown.tsx | base | default | `--bg-primary`, `--bg-secondary`, `--border-primary`, `--border-secondary`, `--critical`, `--font-size-md-rem`, `--primary`, `--shadow-lg`, `--spacing-x0-5`, `--spacing-x1`, `--spacing-x14`, `--spacing-x2`, `--spacing-x2-5`, `--spacing-x3`, `--spacing-x4`, `--spacing-x5`, `--spacing-x7`, `--spacing-x8`, `--spacing-x9`, `text-md-rem` |

### WaterfallChart (charts)

Status: `no-token-match`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/charts/WaterfallChart.tsx | base | default | _none detected_ |

### Watermark (molecules)

Status: `no-token-match`

| Source | Dimension | Variant | Tokens |
|---|---|---|---|
| src/components/molecules/Watermark/Watermark.tsx | base | default | _none detected_ |

## Consistency Gate Commands

- `npm run check:consistency:report` -> Phase 1 report-only (never fails).
- `npm run check:consistency:baseline` -> Phase 2 baseline capture/update.
- `npm run check:consistency` -> Phase 3 CI regression gate against baseline.

## Size Contract Gate Commands

- `npm run check:size-contract` -> CI gate for canonical component size/variant token contracts.

## Structural Spacing Gate Commands

- `npm run check:spacing-structure:report` -> report-only structural spacing audit (missing direct padding, spacer-in-flex-col).
- `npm run check:spacing-structure` -> CI regression gate against `docs/audits/spacing-structure-baseline-2026-03-03.json`.
