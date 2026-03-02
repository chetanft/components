# Explorer Aggregate Chip Audit

Purpose: Detect explorer chips that likely render multi-variant previews instead of single-variant previews.

Summary: 97 components scanned, 633 chips audited, 1 aggregate-likely, 10 compound-allowed, 0 manual-review.

## Remediation Buckets

### Bucket A — Repoint to existing single-variant story

_No chips in this bucket._

### Bucket B — Needs ExplorerBase + args migration

| Component | Row | Chip | Current Story | Reason |
|---|---|---|---|---|
| Form | State | Default | ExplorerBase | <FormItem appears 3x in story body |

### Bucket C — Intentionally aggregate (remove from explorer or keep for docs)

_No chips in this bucket._

### Bucket D — Manual review

_No chips in this bucket._

### Compound Single-Preview (Allowed)

| Component | Row | Chip | Story | Reason |
|---|---|---|---|---|
| Breadcrumb | Type | Icons | WithIcons | Allowed compound component (multi-child = one variant) |
| Breadcrumb | Type | Custom Separator | CustomSeparator | Allowed compound component (multi-child = one variant) |
| Calendar | Type | EventCalendar | EventCalendar | Allowed compound component (multi-child = one variant) |
| DataEntryTable | Type | WithSelection | WithSelection | Allowed compound component (multi-child = one variant) |
| DataEntryTable | Type | WithActions | WithActions | Allowed compound component (multi-child = one variant) |
| Mentions | Type | Custom Prefix (#) | CustomPrefix | Allowed compound component (multi-child = one variant) |
| Mentions | Type | Rich Content | WithRichContent | Allowed compound component (multi-child = one variant) |
| ToggleGroup | Type | Multiple | Multiple | Allowed compound component (multi-child = one variant) |
| ToggleGroup | Type | Outline | Outline | Allowed compound component (multi-child = one variant) |
| UploadZone | Type | Different File Types | DifferentFileTypes | Allowed compound component (multi-child = one variant) |

## Full Chip Classification

### Affix
- Story file: `src/components/molecules/Affix/Affix.stories.tsx`
- baseStory: —

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Basic | Basic | single-preview-safe | First chip in first row (connected-via-first-row-story) | none |
| Type | Bottom | Bottom | single-preview-safe | No aggregate patterns detected | none |

### Alert
- Story file: `src/components/molecules/Alert/Alert.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default (Info) | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Success | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Warning | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Danger | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Behavior | Action | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Behavior | Closable | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Behavior | Complete | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Dismissible | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Actionable | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### Anchor
- Story file: `src/components/molecules/Anchor/Anchor.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Vertical | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Horizontal | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### AppHeader
- Story file: `src/stories/AppHeader.stories.tsx`
- baseStory: —

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Branding | Tata Motors | Default | single-preview-safe | First chip in first row (connected-via-first-row-story) | none |
| Branding | FreightTiger | WithFTCompany | single-preview-safe | No aggregate patterns detected | none |
| State | Theme On | Default | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Theme Off | Default | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### AreaChart
- Story file: `src/stories/AreaChart.stories.tsx`
- baseStory: —

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Basic | Basic | single-preview-safe | First chip in first row (connected-via-first-row-story) | none |
| Type | Linear | Linear | single-preview-safe | No aggregate patterns detected | none |
| Type | Step | Step | single-preview-safe | No aggregate patterns detected | none |
| Type | Stacked | Stacked | single-preview-safe | No aggregate patterns detected | none |
| Type | Gradient | Gradient | single-preview-safe | No aggregate patterns detected | none |
| Type | WithAxes | WithAxes | single-preview-safe | No aggregate patterns detected | none |

### Avatar
- Story file: `src/components/atoms/Avatar/Avatar.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Fallback | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Group | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | XXS | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | XS | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | SM | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | MD | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | LG | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | XL | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | XXL | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### BackTop
- Story file: `src/components/molecules/BackTop/BackTop.stories.tsx`
- baseStory: —

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Basic | Basic | single-preview-safe | First chip in first row (connected-via-first-row-story) | none |
| Type | CustomContent | CustomContent | single-preview-safe | No aggregate patterns detected | none |

### Badge
- Story file: `src/components/atoms/Badge/Badge.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Composed | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Text Only | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Custom Icon | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Success | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Error | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Warning | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Info | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Neutral | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Danger | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | XS | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | SM | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | MD | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | LG | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### Breadcrumb
- Story file: `src/components/molecules/Breadcrumb/Breadcrumb.stories.tsx`
- baseStory: —

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | Default | single-preview-safe | First chip in first row (connected-via-first-row-story) | none |
| Type | Icons | WithIcons | compound-single-preview | Allowed compound component (multi-child = one variant) | none |
| Type | Custom Separator | CustomSeparator | compound-single-preview | Allowed compound component (multi-child = one variant) | none |

### Button
- Story file: `src/components/atoms/Button/Button.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Style | Primary | — | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Outline | — | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Danger | — | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Text | — | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Link | — | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Content | Leading Icon | — | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Content | Trailing Icon | — | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Content | Icon Only | — | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Content | Label Only | — | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Default | — | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Disabled | — | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Loading | — | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | XXS | — | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | XS | — | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | SM | — | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | MD | — | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | LG | — | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | XL | — | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | XXL | — | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Shape | Default | — | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Shape | Rounded | — | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### ButtonGroup
- Story file: `src/components/molecules/ButtonGroup/ButtonGroup.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Equal Width | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | With Icons | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Wrapped | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### Calendar
- Story file: `src/components/molecules/Calendar/Calendar.stories.tsx`
- baseStory: —

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | Default | single-preview-safe | First chip in first row (connected-via-first-row-story) | none |
| Type | YearMode | YearMode | single-preview-safe | No aggregate patterns detected | none |
| Type | Fullscreen | Fullscreen | single-preview-safe | No aggregate patterns detected | none |
| Type | EventCalendar | EventCalendar | compound-single-preview | Allowed compound component (multi-child = one variant) | none |
| State | Default | Default | single-preview-safe | No aggregate patterns detected | none |
| State | DisabledDates | DisabledDates | single-preview-safe | No aggregate patterns detected | none |
| State | ValidRange | ValidRange | single-preview-safe | No aggregate patterns detected | none |
| State | Controlled | Controlled | single-preview-safe | No aggregate patterns detected | none |

### Card
- Story file: `src/components/organisms/Card/Card.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Basic | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Advanced | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Composable | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Elevated | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Outlined | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Content | Footer | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Content | No Footer | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Content | No Eyebrow | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### Carousel
- Story file: `src/components/molecules/Carousel/Carousel.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Autoplay | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Fade Effect | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Image Gallery | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Behavior | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Behavior | Without Arrows | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Behavior | Dot Positions | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Behavior | Custom Dots | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### Cascader
- Story file: `src/components/molecules/Cascader/Cascader.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Size | XXS | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | XS | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | SM | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | MD | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | LG | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | XL | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | XXL | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Disabled | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### Checkbox
- Story file: `src/components/atoms/Checkbox/Checkbox.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Content | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Content | Helper Text | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Content | Indeterminate | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | SM | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | MD | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Unchecked | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Checked | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Error | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Disabled | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### Chicklet
- Story file: `src/components/molecules/Chicklet/Chicklet.stories.tsx`
- baseStory: —

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Style | Default | Default | single-preview-safe | First chip in first row (connected-via-first-row-story) | none |
| Style | Rounded | Rounded | single-preview-safe | No aggregate patterns detected | none |
| Style | Bordered | Bordered | single-preview-safe | No aggregate patterns detected | none |
| Style | Rounded Bordered | RoundedBordered | single-preview-safe | No aggregate patterns detected | none |
| State | Default | Default | single-preview-safe | No aggregate patterns detected | none |
| State | Closable | Closable | single-preview-safe | No aggregate patterns detected | none |
| State | Disabled | Disabled | single-preview-safe | No aggregate patterns detected | none |
| State | Closable Disabled | ClosableDisabled | single-preview-safe | No aggregate patterns detected | none |

### Collapsible
- Story file: `src/components/organisms/Collapsible/Collapsible.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Primary | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Secondary | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Tertiary | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Collapsed | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Expanded | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Extra | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Controlled | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### Color System
- Story file: `src/stories/ColorSystem.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Theme | Light Mode | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Theme | Dark Mode | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Theme | Night Mode | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### ColorPicker
- Story file: `src/components/molecules/ColorPicker/ColorPicker.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | With Presets | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Disabled | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### DataEntryTable
- Story file: `src/components/organisms/DataEntryTable/DataEntryTable.stories.tsx`
- baseStory: —

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | Default | single-preview-safe | First chip in first row (connected-via-first-row-story) | none |
| Type | WithSelection | WithSelection | compound-single-preview | Allowed compound component (multi-child = one variant) | none |
| Type | WithActions | WithActions | compound-single-preview | Allowed compound component (multi-child = one variant) | none |
| Type | WithMultipleCellTypes | WithMultipleCellTypes | single-preview-safe | No aggregate patterns detected | none |

### DatePicker
- Story file: `src/components/molecules/DatePicker/DatePicker.stories.tsx`
- baseStory: —

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | Default | single-preview-safe | First chip in first row (connected-via-first-row-story) | none |
| Type | Range | Default | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Custom Quick Select | Default | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | XXS | Default | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | XS | Default | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | SM | Default | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | MD | Default | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | LG | Default | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | XL | Default | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | XXL | Default | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Default | Default | single-preview-safe | No aggregate patterns detected | none |
| State | With Value | Default | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Error | Default | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Disabled | Default | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### Descriptions
- Story file: `src/components/molecules/Descriptions/Descriptions.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | With Badge | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Vertical | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### Divider
- Story file: `src/components/atoms/Divider/Divider.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Dashed | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Vertical | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | With Label | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Primary | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Secondary | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Tertiary | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### Drawer
- Story file: `src/components/organisms/Drawer/Drawer.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Placement | Right (Default) | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Placement | Left | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Placement | Top | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Placement | Bottom | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Content | Basic | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Content | Form | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### Dropdown
- Story file: `src/components/molecules/Dropdown/Dropdown.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Searchable | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Grouped | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | With Label | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Error | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Disabled | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### DropdownMenu
- Story file: `src/components/molecules/DropdownMenu/DropdownMenu.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | With Search | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | With Labels | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### Empty
- Story file: `src/components/molecules/Empty/Empty.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Simple | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | No Data | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Error | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Content | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Content | With Description | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Content | With Actions | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### FileCard
- Story file: `src/stories/FileCard.stories.tsx`
- baseStory: —

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | Default | single-preview-safe | First chip in first row (connected-via-first-row-story) | none |
| Type | CSV | CSV | single-preview-safe | No aggregate patterns detected | none |
| State | Default | Default | single-preview-safe | No aggregate patterns detected | none |
| State | Uploading | Uploading | single-preview-safe | No aggregate patterns detected | none |
| State | Validating | Validating | single-preview-safe | No aggregate patterns detected | none |
| State | Processed | Processed | single-preview-safe | No aggregate patterns detected | none |
| State | Failed | Failed | single-preview-safe | No aggregate patterns detected | none |

### FileThumbnail
- Story file: `src/stories/FileThumbnail.stories.tsx`
- baseStory: —

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | Default | single-preview-safe | First chip in first row (connected-via-first-row-story) | none |
| Type | With Image | WithImage | single-preview-safe | No aggregate patterns detected | none |
| Type | PDF File | PDFFile | single-preview-safe | No aggregate patterns detected | none |
| Type | Excel File | ExcelFile | single-preview-safe | No aggregate patterns detected | none |
| Type | Image Preview | ImagePreview | single-preview-safe | No aggregate patterns detected | none |

### FileTypeIcon
- Story file: `src/stories/FileTypeIcon.stories.tsx`
- baseStory: —

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | ExplorerBase | single-preview-safe | First chip in first row (connected-via-first-row-story) | none |
| Type | XLSX | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | PDF | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | DOC | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | DOCX | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | PNG | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | JPEG | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | JPG | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | CSV | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Error Variant | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | XXS | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | XS | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | SM | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | MD | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | LG | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | XL | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | XXL | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### FileValidationCard
- Story file: `src/stories/FileValidationCard.stories.tsx`
- baseStory: —

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | Default | single-preview-safe | First chip in first row (connected-via-first-row-story) | none |
| Type | Success | Success | single-preview-safe | No aggregate patterns detected | none |
| Type | Failed | Failed | single-preview-safe | No aggregate patterns detected | none |
| Type | Partial | Partial | single-preview-safe | No aggregate patterns detected | none |
| Type | CSV | CSV | single-preview-safe | No aggregate patterns detected | none |

### FloatButton
- Story file: `src/components/molecules/FloatButton/FloatButton.stories.tsx`
- baseStory: —

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Basic | Basic | single-preview-safe | First chip in first row (connected-via-first-row-story) | none |
| Type | WithType | WithType | single-preview-safe | No aggregate patterns detected | none |
| Type | Group | Group | single-preview-safe | No aggregate patterns detected | none |

### Footer
- Story file: `src/components/organisms/Footer/Footer.stories.tsx`
- baseStory: —

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | ExplorerBase | single-preview-safe | First chip in first row (connected-via-first-row-story) | none |
| Type | Two Buttons | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Three Buttons | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Four Buttons | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | With Left Side | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Custom Buttons | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### Form
- Story file: `src/components/organisms/Form/Form.stories.tsx`
- baseStory: —

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Layout | Vertical | ExplorerBase | single-preview-safe | First chip in first row (connected-via-first-row-story) | none |
| Layout | Horizontal | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Default | ExplorerBase | aggregate-likely | <FormItem appears 3x in story body | high |
| State | With Validation | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### Grid
- Story file: `src/components/organisms/Grid/Grid.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Basic Grid | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Gutter | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Offset | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Flex Layout | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Layout | Vertical Align | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Layout | Justify | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### HoverCard
- Story file: `src/components/molecules/HoverCard/HoverCard.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Content | User Card | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Behavior | Top | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Behavior | Bottom | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Behavior | Left | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Behavior | Right | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Disabled Trigger | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### Icon
- Story file: `src/components/atoms/Icons/Icon.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Navigation | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Action | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Status | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | 12 | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | 16 | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | 24 | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | 32 | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | 48 | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Colors | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Brand | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### Illustration
- Story file: `src/components/atoms/Illustration/Illustration.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Overview | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Insights | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Workspace | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Reports | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | SM | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | MD | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | LG | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | XL | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Content | Single Preview | ExplorerBase | single-preview-safe | No aggregate patterns detected | none |

### Image
- Story file: `src/components/molecules/Image/Image.stories.tsx`
- baseStory: —

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | Default | single-preview-safe | First chip in first row (connected-via-first-row-story) | none |
| Type | With Preview | WithPreview | single-preview-safe | No aggregate patterns detected | none |
| Type | With Fallback | WithFallback | single-preview-safe | No aggregate patterns detected | none |
| State | Default | Default | single-preview-safe | No aggregate patterns detected | none |
| State | Error State | ErrorState | single-preview-safe | No aggregate patterns detected | none |

### Input
- Story file: `src/stories/Input.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Style | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Filled | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Outlined | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Content | Basic | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Content | With Icons | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Error | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Warning | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Success | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Disabled | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### InputNumber
- Story file: `src/components/molecules/InputNumber/InputNumber.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | With Prefix | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | With Suffix | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Disabled | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Error | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### Label
- Story file: `src/stories/Label.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Mandatory | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Optional | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Content | Basic | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Content | With Icon | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Content | Form Example | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### LineChart
- Story file: `src/stories/LineChart.stories.tsx`
- baseStory: —

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Basic | Basic | single-preview-safe | First chip in first row (connected-via-first-row-story) | none |
| Type | Multiple | Multiple | single-preview-safe | No aggregate patterns detected | none |
| Type | Linear | Linear | single-preview-safe | No aggregate patterns detected | none |
| Type | Step | Step | single-preview-safe | No aggregate patterns detected | none |
| Type | WithDots | WithDots | single-preview-safe | No aggregate patterns detected | none |
| Type | WithLabels | WithLabels | single-preview-safe | No aggregate patterns detected | none |

### List
- Story file: `src/components/molecules/List/List.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | With Icons | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | With Actions | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### Loader
- Story file: `src/components/molecules/Loader/Loader.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Static | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Without Logo | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Small Logo | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Full Width | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Content | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Content | No Progress Bar | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Content | Custom Progress Bar | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### Logo
- Story file: `src/components/atoms/Logos/Logo.stories.tsx`
- baseStory: —

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Brand | Default (FT) | Default | single-preview-safe | First chip in first row (connected-via-first-row-story) | none |
| Brand | FT White | FTWhite | single-preview-safe | No aggregate patterns detected | none |
| Brand | Tata Motors | TataMotors | single-preview-safe | No aggregate patterns detected | none |
| Size | Default | Default | single-preview-safe | No aggregate patterns detected | none |
| Size | Custom Size | CustomSize | single-preview-safe | No aggregate patterns detected | none |
| Size | Large | TataMotorsLarge | single-preview-safe | No aggregate patterns detected | none |

### Mentions
- Story file: `src/components/molecules/Mentions/Mentions.stories.tsx`
- baseStory: —

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default (@) | Default | single-preview-safe | First chip in first row (connected-via-first-row-story) | none |
| Type | Custom Prefix (#) | CustomPrefix | compound-single-preview | Allowed compound component (multi-child = one variant) | none |
| Type | Rich Content | WithRichContent | compound-single-preview | Allowed compound component (multi-child = one variant) | none |

### Modal
- Story file: `src/components/organisms/Modal/Modal.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Basic | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Footer | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | Small | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | Medium | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | Large | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | Extra Large | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | Full | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### Multi-Theme Demo
- Story file: `src/stories/ThemeSystem.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Theme Mode | Interactive Demo | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Theme Mode | Light | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Theme Mode | Dark | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Theme Mode | Night | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Comparison | Side-by-Side | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### NavigationLauncher
- Story file: `src/stories/NavigationLauncher.stories.tsx`
- baseStory: —

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | DefaultLauncher | DefaultLauncher | single-preview-safe | First chip in first row (connected-via-first-row-story) | none |
| Type | CustomTrigger | CustomTrigger | single-preview-safe | No aggregate patterns detected | none |
| Type | AppHeaderIntegration | AppHeaderIntegration | single-preview-safe | No aggregate patterns detected | none |

### NavigationPopover
- Story file: `src/stories/NavigationPopover.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Insights | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Workspace | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Reports | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | SubMenuVariant | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | ServiceHealth | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | MetricsWithoutHero | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | HeroTopPlacement | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### Notification
- Story file: `src/components/molecules/Notification/Notification.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Content | Interactive Demo | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Success | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Info | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Warning | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Danger | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Behavior | Closable | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Behavior | With Icon | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Behavior | Auto Dismiss | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### PageHeader
- Story file: `src/components/organisms/PageHeader/PageHeader.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Minimal | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Content | Basic | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Content | With Tabs | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Content | Segmented Tabs | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Content | With Filters | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Tabs Interactive | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | With Actions | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### Pagination
- Story file: `src/components/molecules/Pagination/Pagination.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Size Changer | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Quick Jumper | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Compact | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### PieChart
- Story file: `src/stories/PieChart.stories.tsx`
- baseStory: —

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Basic | Basic | single-preview-safe | First chip in first row (connected-via-first-row-story) | none |
| Type | WithLabels | WithLabels | single-preview-safe | No aggregate patterns detected | none |
| Type | Donut | Donut | single-preview-safe | No aggregate patterns detected | none |
| Type | DonutWithText | DonutWithText | single-preview-safe | No aggregate patterns detected | none |
| Type | Stacked | Stacked | single-preview-safe | No aggregate patterns detected | none |
| Type | WithLegend | WithLegend | single-preview-safe | No aggregate patterns detected | none |

### Popconfirm
- Story file: `src/components/molecules/Popconfirm/Popconfirm.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Icon | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Placement | Top | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Placement | Bottom | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Placement | Left | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Placement | Right | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Danger | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Warning | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Disabled | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### Progress
- Story file: `src/components/molecules/ProgressBar/ProgressBar.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Line | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Circle | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Dashboard | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Steps | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Primary | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Success | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Warning | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Danger | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Active | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Not Started | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | In Progress | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Completed | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### ProgressList
- Story file: `src/components/molecules/ProgressList/ProgressList.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Time | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Icons | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Badges | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Normal | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Success | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Warning | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Danger | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Collapsible | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### QuickFilters
- Story file: `src/components/organisms/QuickFilters/QuickFilters.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Filter Type | Single Filters | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Filter Type | Multi-option | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Selected | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Mixed Selection | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### RadarChart
- Story file: `src/stories/RadarChart.stories.tsx`
- baseStory: —

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Basic | Basic | single-preview-safe | First chip in first row (connected-via-first-row-story) | none |
| Type | WithDots | WithDots | single-preview-safe | No aggregate patterns detected | none |
| Type | LinesOnly | LinesOnly | single-preview-safe | No aggregate patterns detected | none |
| Type | Multiple | Multiple | single-preview-safe | No aggregate patterns detected | none |
| Type | WithLegend | WithLegend | single-preview-safe | No aggregate patterns detected | none |
| Grid | Basic | Basic | single-preview-safe | No aggregate patterns detected | none |
| Grid | GridCircle | GridCircle | single-preview-safe | No aggregate patterns detected | none |
| Grid | GridFilled | GridFilled | single-preview-safe | No aggregate patterns detected | none |

### RadialChart
- Story file: `src/stories/RadialChart.stories.tsx`
- baseStory: —

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Basic | Basic | single-preview-safe | First chip in first row (connected-via-first-row-story) | none |
| Type | WithLabel | WithLabel | single-preview-safe | No aggregate patterns detected | none |
| Type | WithGrid | WithGrid | single-preview-safe | No aggregate patterns detected | none |
| Type | WithText | WithText | single-preview-safe | No aggregate patterns detected | none |
| Type | DifferentShape | DifferentShape | single-preview-safe | No aggregate patterns detected | none |
| Type | Stacked | Stacked | single-preview-safe | No aggregate patterns detected | none |

### RadioGroup
- Story file: `src/components/atoms/RadioGroup/RadioGroup.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Layout | Vertical | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Layout | Horizontal | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | SM | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | MD | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Error | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### RadioSelector
- Story file: `src/components/molecules/RadioSelector/RadioSelector.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | With Icons | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Without Radio | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Disabled | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Controlled | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### Rate
- Story file: `src/components/molecules/Rate/Rate.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Half Stars | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | With Tooltips | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Disabled | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### ReadOnly
- Story file: `src/stories/ReadOnly.stories.tsx`
- baseStory: —

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Vertical | VerticalBasic | single-preview-safe | First chip in first row (connected-via-first-row-story) | none |
| Type | Horizontal | HorizontalBasic | single-preview-safe | No aggregate patterns detected | none |
| Content | Basic | VerticalBasic | single-preview-safe | No aggregate patterns detected | none |
| Content | With Icon | VerticalWithIcon | single-preview-safe | No aggregate patterns detected | none |

### Result
- Story file: `src/components/organisms/Result/Result.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Success | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Error | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Info | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Warning | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | 404 | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | 403 | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | 500 | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | With Actions | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | With Details | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Custom Icon | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### SegmentedTabs
- Story file: `src/components/molecules/SegmentedTabs/SegmentedTabs.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Icons | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Icon Only | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Controlled | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### SimpleColumnLayout
- Story file: `src/components/molecules/SimpleColumnLayout/SimpleColumnLayout.stories.tsx`
- baseStory: —

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | Default | single-preview-safe | First chip in first row (connected-via-first-row-story) | none |

### Slider
- Story file: `src/components/molecules/Slider/Slider.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Single | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Range | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Labels | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### Spacer
- Story file: `src/components/atoms/Spacer/Spacer.stories.tsx`
- baseStory: —

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | Default | single-preview-safe | First chip in first row (connected-via-first-row-story) | none |
| Type | Horizontal | Horizontal | single-preview-safe | No aggregate patterns detected | none |

### Spin
- Story file: `src/components/atoms/Spin/Spin.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | WithTip | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | WithContent | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Delayed | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### StackedBarChart
- Story file: `src/components/molecules/StackedBarChart/StackedBarChart.stories.tsx`
- baseStory: —

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | Default | single-preview-safe | First chip in first row (connected-via-first-row-story) | none |

### Statistic
- Story file: `src/components/atoms/Statistic/Statistic.stories.tsx`
- baseStory: —

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | ExplorerBase | single-preview-safe | First chip in first row (connected-via-first-row-story) | none |
| Type | Label On Top | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### Steps
- Story file: `src/components/molecules/Steps/Steps.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Vertical | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Dot Style | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### SubText
- Story file: `src/components/atoms/SubText/SubText.stories.tsx`
- baseStory: —

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | Default | single-preview-safe | First chip in first row (connected-via-first-row-story) | none |
| Type | WithIcon | WithIcon | single-preview-safe | No aggregate patterns detected | none |

### Switch
- Story file: `src/components/atoms/Switch/Switch.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Content | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Content | Helper Text | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Content | Icon Only | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | SM | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | MD | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Off | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | On | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Disabled | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Error | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### Table
- Story file: `src/stories/Table.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Sortable | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | With Footer | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### Tabs
- Story file: `src/components/organisms/Tabs/Tabs.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Style | Primary | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Secondary | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Tertiary | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Content | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Content | Badges | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### Text
- Story file: `src/components/atoms/Text/Text.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Size | SM | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | MD | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | LG | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | XL | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | XX | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Content | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Content | Sub Text | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Content | Leading Icon | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Content | Trailing Icon | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### Textarea
- Story file: `src/components/atoms/Textarea/Textarea.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Size | XXS | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | XS | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | SM | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | MD | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | LG | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | XL | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | XXL | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Error | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Disabled | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### Timeline
- Story file: `src/components/molecules/Timeline/Timeline.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Alternate | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Custom Content | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### TimePicker
- Story file: `src/components/molecules/TimePicker/TimePicker.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Format | Default (24h) | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Format | 12-Hour | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Format | Without Seconds | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Format | 12h No Seconds | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | XXS | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | XS | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | SM | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | MD | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | LG | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | XL | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Size | XXL | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Error | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Warning | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Success | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Disabled | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Behavior | Controlled | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Behavior | Step Interval | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Behavior | Disabled Hours | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Behavior | Labels | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Behavior | Form | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### Toggle
- Story file: `src/components/atoms/Toggle/Toggle.stories.tsx`
- baseStory: —

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | ExplorerBase | single-preview-safe | First chip in first row (connected-via-first-row-story) | none |
| Type | With Icon | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Icon Only | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Outline | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Default | ExplorerBase | single-preview-safe | No aggregate patterns detected | none |
| State | Pressed | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Disabled | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### ToggleGroup
- Story file: `src/components/molecules/ToggleGroup/ToggleGroup.stories.tsx`
- baseStory: —

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Single | Single | single-preview-safe | First chip in first row (connected-via-first-row-story) | none |
| Type | Multiple | Multiple | compound-single-preview | Allowed compound component (multi-child = one variant) | none |
| Type | Outline | Outline | compound-single-preview | Allowed compound component (multi-child = one variant) | none |

### Tooltip
- Story file: `src/components/molecules/Tooltip/Tooltip.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Content | Basic | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Content | Title | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Content | Arrow | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Content | Composed | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Light | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Dark | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### Tour
- Story file: `src/components/molecules/Tour/Tour.stories.tsx`
- baseStory: —

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | Default | single-preview-safe | First chip in first row (connected-via-first-row-story) | none |

### Transfer
- Story file: `src/components/molecules/Transfer/Transfer.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | One Way | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### Tree
- Story file: `src/components/molecules/Tree/Tree.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Icons | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Checkboxes | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Directory | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Selection | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### TreeSelect
- Story file: `src/components/molecules/TreeSelect/TreeSelect.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Single Select | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Multi Check | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Error | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Disabled | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### Typography
- Story file: `src/components/atoms/Typography/Typography.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Style | Title Primary | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Title Secondary | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Display Primary | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Button | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Body Primary Semibold | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Body Primary Medium | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Body Primary Regular | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Body Primary Italic | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Body Secondary Semibold | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Body Secondary Medium | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Style | Body Secondary Regular | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Tone | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Tone | Secondary | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Tone | Muted | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Tone | Danger | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Tone | Success | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Tone | Warning | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### Upload
- Story file: `src/components/organisms/Upload/Upload.stories.tsx`
- baseStory: ExplorerBase

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Button Upload | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Thumbnail | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| Type | Custom Trigger | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Default | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | With Validation | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |
| State | Single File Only | ExplorerBase | single-preview-safe | Chip has inline args (ExplorerBase pattern) | none |

### UploadButton
- Story file: `src/stories/UploadButton.stories.tsx`
- baseStory: —

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | Default | single-preview-safe | First chip in first row (connected-via-first-row-story) | none |
| Type | Hover | Hover | single-preview-safe | No aggregate patterns detected | none |
| Type | Multiple Files | MultipleFiles | single-preview-safe | No aggregate patterns detected | none |
| State | Default | Default | single-preview-safe | No aggregate patterns detected | none |
| State | Disabled | Disabled | single-preview-safe | No aggregate patterns detected | none |

### UploadItem
- Story file: `src/components/molecules/UploadItem/UploadItem.stories.tsx`
- baseStory: —

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | Default | single-preview-safe | First chip in first row (connected-via-first-row-story) | none |
| Type | Text Type | TextType | single-preview-safe | No aggregate patterns detected | none |
| State | Default | Default | single-preview-safe | No aggregate patterns detected | none |
| State | Uploading | Uploading | single-preview-safe | No aggregate patterns detected | none |
| State | Uploaded | Uploaded | single-preview-safe | No aggregate patterns detected | none |
| State | Saved | Saved | single-preview-safe | No aggregate patterns detected | none |
| State | Error | Error | single-preview-safe | No aggregate patterns detected | none |

### UploadThumbnail
- Story file: `src/components/molecules/UploadThumbnail/UploadThumbnail.stories.tsx`
- baseStory: —

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | Default | single-preview-safe | First chip in first row (connected-via-first-row-story) | none |
| Type | With Preview | WithPreview | single-preview-safe | No aggregate patterns detected | none |
| State | Default | Default | single-preview-safe | No aggregate patterns detected | none |
| State | Disabled | Disabled | single-preview-safe | No aggregate patterns detected | none |
| State | Hover State | HoverState | single-preview-safe | No aggregate patterns detected | none |

### UploadZone
- Story file: `src/stories/UploadZone.stories.tsx`
- baseStory: —

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Default | Default | single-preview-safe | First chip in first row (connected-via-first-row-story) | none |
| Type | Multiple Files | MultipleFiles | single-preview-safe | No aggregate patterns detected | none |
| Type | Different File Types | DifferentFileTypes | compound-single-preview | Allowed compound component (multi-child = one variant) | none |
| State | Default | Default | single-preview-safe | No aggregate patterns detected | none |
| State | Disabled | Disabled | single-preview-safe | No aggregate patterns detected | none |

### Watermark
- Story file: `src/components/molecules/Watermark/Watermark.stories.tsx`
- baseStory: —

| Row | Chip | Story | Classification | Reason | Risk |
|---|---|---|---|---|---|
| Type | Basic | Basic | single-preview-safe | First chip in first row (connected-via-first-row-story) | none |
| Type | Multi Line | MultiLine | single-preview-safe | No aggregate patterns detected | none |
| Type | Custom Style | CustomStyle | single-preview-safe | No aggregate patterns detected | none |
