# Explorer Chip Connection Audit

Purpose: Verify that explorer chips are connected to the matrix preview correctly under the current `ExplorerMatrix` behavior.

Connection rules audited:
- `connected-via-args`: chip contributes `scenario.args` (works across rows)
- `connected-via-selected-story-args`: chip points to a story export with `args` (or `render` + `args`); matrix now merges those args
- `connected-via-first-row-story`: first-row chip selects base story when no `baseStory` is configured
- `story-only-nonfirst (not connected in matrix)`: chip points to a story in a non-first row without args (preview will not change)
- `story-only-ignored (baseStory fixed)`: `baseStory` is configured and chip points to a different story without args

Summary: 97 components with explorer config, 633 chips audited, 0 error chips, 0 warning chips.

## Affix
- Story file: `src/components/molecules/Affix/Affix.stories.tsx`
- baseStory: `—`
- Rows: 1
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Basic | Basic | No | render+args | connected-via-selected-story-args | OK |
| Type | Bottom | Bottom | No | render+args | connected-via-selected-story-args | OK |

## Alert
- Story file: `src/components/molecules/Alert/Alert.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 3
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default (Info) | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Success | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Warning | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Danger | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Behavior | Action | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Behavior | Closable | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Behavior | Complete | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Dismissible | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Actionable | ExplorerBase | Yes | render+args | connected-via-args | OK |

## Anchor
- Story file: `src/components/molecules/Anchor/Anchor.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Vertical | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Horizontal | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |

## AppHeader
- Story file: `src/stories/AppHeader.stories.tsx`
- baseStory: `—`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Branding | Tata Motors | Default | No | args | connected-via-selected-story-args | OK |
| Branding | FreightTiger | WithFTCompany | No | args | connected-via-selected-story-args | OK |
| State | Theme On | Default | Yes | args | connected-via-args | OK |
| State | Theme Off | Default | Yes | args | connected-via-args | OK |

## AreaChart
- Story file: `src/stories/AreaChart.stories.tsx`
- baseStory: `—`
- Rows: 1
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Basic | Basic | No | args | connected-via-selected-story-args | OK |
| Type | Linear | Linear | No | args | connected-via-selected-story-args | OK |
| Type | Step | Step | No | args | connected-via-selected-story-args | OK |
| Type | Stacked | Stacked | No | args | connected-via-selected-story-args | OK |
| Type | Gradient | Gradient | No | args | connected-via-selected-story-args | OK |
| Type | WithAxes | WithAxes | No | args | connected-via-selected-story-args | OK |

## Avatar
- Story file: `src/components/atoms/Avatar/Avatar.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Fallback | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Group | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | XXS | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | XS | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | SM | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | MD | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | LG | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | XL | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | XXL | ExplorerBase | Yes | render+args | connected-via-args | OK |

## BackTop
- Story file: `src/components/molecules/BackTop/BackTop.stories.tsx`
- baseStory: `—`
- Rows: 1
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Basic | Basic | No | render | connected-via-first-row-story | OK |
| Type | CustomContent | CustomContent | No | render | connected-via-first-row-story | OK |

## Badge
- Story file: `src/components/atoms/Badge/Badge.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 3
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Composed | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Text Only | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Custom Icon | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Style | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Style | Success | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Style | Error | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Style | Warning | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Style | Info | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Style | Neutral | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Style | Danger | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | XS | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | SM | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | MD | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | LG | ExplorerBase | Yes | render+args | connected-via-args | OK |

## Breadcrumb
- Story file: `src/components/molecules/Breadcrumb/Breadcrumb.stories.tsx`
- baseStory: `—`
- Rows: 1
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | Default | No | render | connected-via-first-row-story | OK |
| Type | Icons | WithIcons | No | render | connected-via-first-row-story | OK |
| Type | Custom Separator | CustomSeparator | No | render | connected-via-first-row-story | OK |

## Button
- Story file: `src/components/atoms/Button/Button.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 5
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Style | Primary | — | Yes | — | connected-via-args | OK |
| Style | Outline | — | Yes | — | connected-via-args | OK |
| Style | Danger | — | Yes | — | connected-via-args | OK |
| Style | Text | — | Yes | — | connected-via-args | OK |
| Style | Link | — | Yes | — | connected-via-args | OK |
| Content | Leading Icon | — | Yes | — | connected-via-args | OK |
| Content | Trailing Icon | — | Yes | — | connected-via-args | OK |
| Content | Icon Only | — | Yes | — | connected-via-args | OK |
| Content | Label Only | — | Yes | — | connected-via-args | OK |
| State | Default | — | Yes | — | connected-via-args | OK |
| State | Disabled | — | Yes | — | connected-via-args | OK |
| State | Loading | — | Yes | — | connected-via-args | OK |
| Size | XXS | — | Yes | — | connected-via-args | OK |
| Size | XS | — | Yes | — | connected-via-args | OK |
| Size | SM | — | Yes | — | connected-via-args | OK |
| Size | MD | — | Yes | — | connected-via-args | OK |
| Size | LG | — | Yes | — | connected-via-args | OK |
| Size | XL | — | Yes | — | connected-via-args | OK |
| Size | XXL | — | Yes | — | connected-via-args | OK |
| Shape | Default | — | Yes | — | connected-via-args | OK |
| Shape | Rounded | — | Yes | — | connected-via-args | OK |

## ButtonGroup
- Story file: `src/components/molecules/ButtonGroup/ButtonGroup.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Equal Width | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | With Icons | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Wrapped | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |

## Calendar
- Story file: `src/components/molecules/Calendar/Calendar.stories.tsx`
- baseStory: `—`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | Default | No | args | connected-via-selected-story-args | OK |
| Type | YearMode | YearMode | No | args | connected-via-selected-story-args | OK |
| Type | Fullscreen | Fullscreen | No | render+args | connected-via-selected-story-args | OK |
| Type | EventCalendar | EventCalendar | No | render+args | connected-via-selected-story-args | OK |
| State | Default | Default | No | args | connected-via-selected-story-args | OK |
| State | DisabledDates | DisabledDates | No | render+args | connected-via-selected-story-args | OK |
| State | ValidRange | ValidRange | No | render+args | connected-via-selected-story-args | OK |
| State | Controlled | Controlled | No | render+args | connected-via-selected-story-args | OK |

## Card
- Story file: `src/components/organisms/Card/Card.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 3
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Basic | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Advanced | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Composable | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Style | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Style | Elevated | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Style | Outlined | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Content | Footer | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Content | No Footer | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Content | No Eyebrow | ExplorerBase | Yes | render+args | connected-via-args | OK |

## Carousel
- Story file: `src/components/molecules/Carousel/Carousel.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Autoplay | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Fade Effect | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Image Gallery | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Behavior | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Behavior | Without Arrows | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Behavior | Dot Positions | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Behavior | Custom Dots | ExplorerBase | Yes | render+args | connected-via-args | OK |

## Cascader
- Story file: `src/components/molecules/Cascader/Cascader.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Size | XXS | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | XS | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | SM | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | MD | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | LG | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | XL | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | XXL | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Disabled | ExplorerBase | Yes | render+args | connected-via-args | OK |

## Checkbox
- Story file: `src/components/atoms/Checkbox/Checkbox.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 3
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Content | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Content | Helper Text | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Content | Indeterminate | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | SM | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | MD | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Unchecked | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Checked | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Error | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Disabled | ExplorerBase | Yes | render+args | connected-via-args | OK |

## Chicklet
- Story file: `src/components/molecules/Chicklet/Chicklet.stories.tsx`
- baseStory: `—`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Style | Default | Default | No | args | connected-via-selected-story-args | OK |
| Style | Rounded | Rounded | No | args | connected-via-selected-story-args | OK |
| Style | Bordered | Bordered | No | args | connected-via-selected-story-args | OK |
| Style | Rounded Bordered | RoundedBordered | No | args | connected-via-selected-story-args | OK |
| State | Default | Default | No | args | connected-via-selected-story-args | OK |
| State | Closable | Closable | No | args | connected-via-selected-story-args | OK |
| State | Disabled | Disabled | No | args | connected-via-selected-story-args | OK |
| State | Closable Disabled | ClosableDisabled | No | args | connected-via-selected-story-args | OK |

## Collapsible
- Story file: `src/components/organisms/Collapsible/Collapsible.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Primary | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Secondary | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Tertiary | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Collapsed | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Expanded | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Extra | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Controlled | ExplorerBase | Yes | render+args | connected-via-args | OK |

## Color System
- Story file: `src/stories/ColorSystem.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 1
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Theme | Light Mode | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Theme | Dark Mode | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Theme | Night Mode | ExplorerBase | Yes | render+args | connected-via-args | OK |

## ColorPicker
- Story file: `src/components/molecules/ColorPicker/ColorPicker.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | With Presets | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Disabled | ExplorerBase | Yes | render+args | connected-via-args | OK |

## DataEntryTable
- Story file: `src/components/organisms/DataEntryTable/DataEntryTable.stories.tsx`
- baseStory: `—`
- Rows: 1
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | Default | No | render | connected-via-first-row-story | OK |
| Type | WithSelection | WithSelection | No | render | connected-via-first-row-story | OK |
| Type | WithActions | WithActions | No | render | connected-via-first-row-story | OK |
| Type | WithMultipleCellTypes | WithMultipleCellTypes | No | render | connected-via-first-row-story | OK |

## DatePicker
- Story file: `src/components/molecules/DatePicker/DatePicker.stories.tsx`
- baseStory: `—`
- Rows: 3
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | Default | No | args | connected-via-selected-story-args | OK |
| Type | Range | Default | Yes | args | connected-via-args | OK |
| Type | Custom Quick Select | Default | Yes | args | connected-via-args | OK |
| Size | XXS | Default | Yes | args | connected-via-args | OK |
| Size | XS | Default | Yes | args | connected-via-args | OK |
| Size | SM | Default | Yes | args | connected-via-args | OK |
| Size | MD | Default | Yes | args | connected-via-args | OK |
| Size | LG | Default | Yes | args | connected-via-args | OK |
| Size | XL | Default | Yes | args | connected-via-args | OK |
| Size | XXL | Default | Yes | args | connected-via-args | OK |
| State | Default | Default | No | args | connected-via-selected-story-args | OK |
| State | With Value | Default | Yes | args | connected-via-args | OK |
| State | Error | Default | Yes | args | connected-via-args | OK |
| State | Disabled | Default | Yes | args | connected-via-args | OK |

## Descriptions
- Story file: `src/components/molecules/Descriptions/Descriptions.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | With Badge | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Vertical | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |

## Divider
- Story file: `src/components/atoms/Divider/Divider.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Dashed | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Vertical | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | With Label | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Style | Primary | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Style | Secondary | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Style | Tertiary | ExplorerBase | Yes | render+args | connected-via-args | OK |

## Drawer
- Story file: `src/components/organisms/Drawer/Drawer.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Placement | Right (Default) | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Placement | Left | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Placement | Top | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Placement | Bottom | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Content | Basic | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Content | Form | ExplorerBase | Yes | render+args | connected-via-args | OK |

## Dropdown
- Story file: `src/components/molecules/Dropdown/Dropdown.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Searchable | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Grouped | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | With Label | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Error | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Disabled | ExplorerBase | Yes | render+args | connected-via-args | OK |

## DropdownMenu
- Story file: `src/components/molecules/DropdownMenu/DropdownMenu.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | With Search | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | With Labels | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |

## Empty
- Story file: `src/components/molecules/Empty/Empty.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Simple | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | No Data | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Error | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Content | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Content | With Description | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Content | With Actions | ExplorerBase | Yes | render+args | connected-via-args | OK |

## FileCard
- Story file: `src/stories/FileCard.stories.tsx`
- baseStory: `—`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | Default | No | args | connected-via-selected-story-args | OK |
| Type | CSV | CSV | No | args | connected-via-selected-story-args | OK |
| State | Default | Default | No | args | connected-via-selected-story-args | OK |
| State | Uploading | Uploading | No | args | connected-via-selected-story-args | OK |
| State | Validating | Validating | No | args | connected-via-selected-story-args | OK |
| State | Processed | Processed | No | args | connected-via-selected-story-args | OK |
| State | Failed | Failed | No | args | connected-via-selected-story-args | OK |

## FileThumbnail
- Story file: `src/stories/FileThumbnail.stories.tsx`
- baseStory: `—`
- Rows: 1
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | Default | No | args | connected-via-selected-story-args | OK |
| Type | With Image | WithImage | No | args | connected-via-selected-story-args | OK |
| Type | PDF File | PDFFile | No | args | connected-via-selected-story-args | OK |
| Type | Excel File | ExcelFile | No | args | connected-via-selected-story-args | OK |
| Type | Image Preview | ImagePreview | No | args | connected-via-selected-story-args | OK |

## FileTypeIcon
- Story file: `src/stories/FileTypeIcon.stories.tsx`
- baseStory: `—`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | No | args | connected-via-selected-story-args | OK |
| Type | XLSX | ExplorerBase | Yes | args | connected-via-args | OK |
| Type | PDF | ExplorerBase | Yes | args | connected-via-args | OK |
| Type | DOC | ExplorerBase | Yes | args | connected-via-args | OK |
| Type | DOCX | ExplorerBase | Yes | args | connected-via-args | OK |
| Type | PNG | ExplorerBase | Yes | args | connected-via-args | OK |
| Type | JPEG | ExplorerBase | Yes | args | connected-via-args | OK |
| Type | JPG | ExplorerBase | Yes | args | connected-via-args | OK |
| Type | CSV | ExplorerBase | Yes | args | connected-via-args | OK |
| Type | Error Variant | ExplorerBase | Yes | args | connected-via-args | OK |
| Size | XXS | ExplorerBase | Yes | args | connected-via-args | OK |
| Size | XS | ExplorerBase | Yes | args | connected-via-args | OK |
| Size | SM | ExplorerBase | Yes | args | connected-via-args | OK |
| Size | MD | ExplorerBase | Yes | args | connected-via-args | OK |
| Size | LG | ExplorerBase | Yes | args | connected-via-args | OK |
| Size | XL | ExplorerBase | Yes | args | connected-via-args | OK |
| Size | XXL | ExplorerBase | Yes | args | connected-via-args | OK |

## FileValidationCard
- Story file: `src/stories/FileValidationCard.stories.tsx`
- baseStory: `—`
- Rows: 1
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | Default | No | args | connected-via-selected-story-args | OK |
| Type | Success | Success | No | args | connected-via-selected-story-args | OK |
| Type | Failed | Failed | No | args | connected-via-selected-story-args | OK |
| Type | Partial | Partial | No | args | connected-via-selected-story-args | OK |
| Type | CSV | CSV | No | args | connected-via-selected-story-args | OK |

## FloatButton
- Story file: `src/components/molecules/FloatButton/FloatButton.stories.tsx`
- baseStory: `—`
- Rows: 1
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Basic | Basic | No | render | connected-via-first-row-story | OK |
| Type | WithType | WithType | No | render | connected-via-first-row-story | OK |
| Type | Group | Group | No | render | connected-via-first-row-story | OK |

## Footer
- Story file: `src/components/organisms/Footer/Footer.stories.tsx`
- baseStory: `—`
- Rows: 1
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | No | render+args | connected-via-selected-story-args | OK |
| Type | Two Buttons | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Three Buttons | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Four Buttons | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | With Left Side | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Custom Buttons | ExplorerBase | Yes | render+args | connected-via-args | OK |

## Form
- Story file: `src/components/organisms/Form/Form.stories.tsx`
- baseStory: `—`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Layout | Vertical | ExplorerBase | No | render+args | connected-via-selected-story-args | OK |
| Layout | Horizontal | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Default | ExplorerBase | No | render+args | connected-via-selected-story-args | OK |
| State | With Validation | ExplorerBase | Yes | render+args | connected-via-args | OK |

## Grid
- Story file: `src/components/organisms/Grid/Grid.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Basic Grid | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Gutter | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Offset | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Flex Layout | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Layout | Vertical Align | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Layout | Justify | ExplorerBase | Yes | render+args | connected-via-args | OK |

## HoverCard
- Story file: `src/components/molecules/HoverCard/HoverCard.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 3
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Content | User Card | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Behavior | Top | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Behavior | Bottom | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Behavior | Left | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Behavior | Right | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Disabled Trigger | ExplorerBase | Yes | render+args | connected-via-args | OK |

## Icon
- Story file: `src/components/atoms/Icons/Icon.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 3
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | args | connected-via-args | OK |
| Type | Navigation | ExplorerBase | Yes | args | connected-via-args | OK |
| Type | Action | ExplorerBase | Yes | args | connected-via-args | OK |
| Type | Status | ExplorerBase | Yes | args | connected-via-args | OK |
| Size | 12 | ExplorerBase | Yes | args | connected-via-args | OK |
| Size | 16 | ExplorerBase | Yes | args | connected-via-args | OK |
| Size | 24 | ExplorerBase | Yes | args | connected-via-args | OK |
| Size | 32 | ExplorerBase | Yes | args | connected-via-args | OK |
| Size | 48 | ExplorerBase | Yes | args | connected-via-args | OK |
| Style | Colors | ExplorerBase | Yes | args | connected-via-args | OK |
| Style | Brand | ExplorerBase | Yes | args | connected-via-args | OK |

## Illustration
- Story file: `src/components/atoms/Illustration/Illustration.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 3
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Overview | ExplorerBase | Yes | args | connected-via-args | OK |
| Type | Insights | ExplorerBase | Yes | args | connected-via-args | OK |
| Type | Workspace | ExplorerBase | Yes | args | connected-via-args | OK |
| Type | Reports | ExplorerBase | Yes | args | connected-via-args | OK |
| Size | SM | ExplorerBase | Yes | args | connected-via-args | OK |
| Size | MD | ExplorerBase | Yes | args | connected-via-args | OK |
| Size | LG | ExplorerBase | Yes | args | connected-via-args | OK |
| Size | XL | ExplorerBase | Yes | args | connected-via-args | OK |
| Content | Single Preview | ExplorerBase | No | args | connected-via-selected-story-args | OK |

## Image
- Story file: `src/components/molecules/Image/Image.stories.tsx`
- baseStory: `—`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | Default | No | args | connected-via-selected-story-args | OK |
| Type | With Preview | WithPreview | No | args | connected-via-selected-story-args | OK |
| Type | With Fallback | WithFallback | No | args | connected-via-selected-story-args | OK |
| State | Default | Default | No | args | connected-via-selected-story-args | OK |
| State | Error State | ErrorState | No | args | connected-via-selected-story-args | OK |

## Input
- Story file: `src/stories/Input.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 3
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Style | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Style | Filled | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Style | Outlined | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Content | Basic | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Content | With Icons | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Error | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Warning | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Success | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Disabled | ExplorerBase | Yes | render+args | connected-via-args | OK |

## InputNumber
- Story file: `src/components/molecules/InputNumber/InputNumber.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | With Prefix | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | With Suffix | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Disabled | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Error | ExplorerBase | Yes | render+args | connected-via-args | OK |

## Label
- Story file: `src/stories/Label.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Mandatory | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Optional | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Content | Basic | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Content | With Icon | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Content | Form Example | ExplorerBase | Yes | render+args | connected-via-args | OK |

## LineChart
- Story file: `src/stories/LineChart.stories.tsx`
- baseStory: `—`
- Rows: 1
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Basic | Basic | No | args | connected-via-selected-story-args | OK |
| Type | Multiple | Multiple | No | args | connected-via-selected-story-args | OK |
| Type | Linear | Linear | No | args | connected-via-selected-story-args | OK |
| Type | Step | Step | No | args | connected-via-selected-story-args | OK |
| Type | WithDots | WithDots | No | args | connected-via-selected-story-args | OK |
| Type | WithLabels | WithLabels | No | args | connected-via-selected-story-args | OK |

## List
- Story file: `src/components/molecules/List/List.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | With Icons | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | With Actions | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |

## Loader
- Story file: `src/components/molecules/Loader/Loader.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Static | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Without Logo | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Small Logo | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Full Width | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Content | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Content | No Progress Bar | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Content | Custom Progress Bar | ExplorerBase | Yes | render+args | connected-via-args | OK |

## Logo
- Story file: `src/components/atoms/Logos/Logo.stories.tsx`
- baseStory: `—`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Brand | Default (FT) | Default | No | args | connected-via-selected-story-args | OK |
| Brand | FT White | FTWhite | No | args | connected-via-selected-story-args | OK |
| Brand | Tata Motors | TataMotors | No | args | connected-via-selected-story-args | OK |
| Size | Default | Default | No | args | connected-via-selected-story-args | OK |
| Size | Custom Size | CustomSize | No | args | connected-via-selected-story-args | OK |
| Size | Large | TataMotorsLarge | No | args | connected-via-selected-story-args | OK |

## Mentions
- Story file: `src/components/molecules/Mentions/Mentions.stories.tsx`
- baseStory: `—`
- Rows: 1
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default (@) | Default | No | render | connected-via-first-row-story | OK |
| Type | Custom Prefix (#) | CustomPrefix | No | render | connected-via-first-row-story | OK |
| Type | Rich Content | WithRichContent | No | render | connected-via-first-row-story | OK |

## Modal
- Story file: `src/components/organisms/Modal/Modal.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Basic | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Footer | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | Small | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | Medium | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | Large | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | Extra Large | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | Full | ExplorerBase | Yes | render+args | connected-via-args | OK |

## Multi-Theme Demo
- Story file: `src/stories/ThemeSystem.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Theme Mode | Interactive Demo | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Theme Mode | Light | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Theme Mode | Dark | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Theme Mode | Night | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Comparison | Side-by-Side | ExplorerBase | Yes | render+args | connected-via-args | OK |

## NavigationLauncher
- Story file: `src/stories/NavigationLauncher.stories.tsx`
- baseStory: `—`
- Rows: 1
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | DefaultLauncher | DefaultLauncher | No | render | connected-via-first-row-story | OK |
| Type | CustomTrigger | CustomTrigger | No | render | connected-via-first-row-story | OK |
| Type | AppHeaderIntegration | AppHeaderIntegration | No | render | connected-via-first-row-story | OK |

## NavigationPopover
- Story file: `src/stories/NavigationPopover.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Insights | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Workspace | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Reports | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | SubMenuVariant | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | ServiceHealth | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | MetricsWithoutHero | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | HeroTopPlacement | ExplorerBase | Yes | render+args | connected-via-args | OK |

## Notification
- Story file: `src/components/molecules/Notification/Notification.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 3
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Content | Interactive Demo | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Success | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Info | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Warning | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Danger | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Behavior | Closable | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Behavior | With Icon | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Behavior | Auto Dismiss | ExplorerBase | Yes | render+args | connected-via-args | OK |

## PageHeader
- Story file: `src/components/organisms/PageHeader/PageHeader.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 3
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Minimal | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Content | Basic | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Content | With Tabs | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Content | Segmented Tabs | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Content | With Filters | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Tabs Interactive | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | With Actions | ExplorerBase | Yes | render+args | connected-via-args | OK |

## Pagination
- Story file: `src/components/molecules/Pagination/Pagination.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Size Changer | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Quick Jumper | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Style | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Style | Compact | ExplorerBase | Yes | render+args | connected-via-args | OK |

## PieChart
- Story file: `src/stories/PieChart.stories.tsx`
- baseStory: `—`
- Rows: 1
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Basic | Basic | No | args | connected-via-selected-story-args | OK |
| Type | WithLabels | WithLabels | No | args | connected-via-selected-story-args | OK |
| Type | Donut | Donut | No | args | connected-via-selected-story-args | OK |
| Type | DonutWithText | DonutWithText | No | args | connected-via-selected-story-args | OK |
| Type | Stacked | Stacked | No | args | connected-via-selected-story-args | OK |
| Type | WithLegend | WithLegend | No | args | connected-via-selected-story-args | OK |

## Popconfirm
- Story file: `src/components/molecules/Popconfirm/Popconfirm.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 3
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Icon | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Placement | Top | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Placement | Bottom | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Placement | Left | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Placement | Right | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Danger | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Warning | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Disabled | ExplorerBase | Yes | render+args | connected-via-args | OK |

## Progress
- Story file: `src/components/molecules/ProgressBar/ProgressBar.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 3
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Line | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Circle | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Dashboard | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Steps | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Style | Primary | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Style | Success | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Style | Warning | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Style | Danger | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Style | Active | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Not Started | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | In Progress | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Completed | ExplorerBase | Yes | render+args | connected-via-args | OK |

## ProgressList
- Story file: `src/components/molecules/ProgressList/ProgressList.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 3
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Time | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Icons | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Badges | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Style | Normal | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Style | Success | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Style | Warning | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Style | Danger | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Collapsible | ExplorerBase | Yes | render+args | connected-via-args | OK |

## QuickFilters
- Story file: `src/components/organisms/QuickFilters/QuickFilters.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Filter Type | Single Filters | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Filter Type | Multi-option | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Selected | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Mixed Selection | ExplorerBase | Yes | render+args | connected-via-args | OK |

## RadarChart
- Story file: `src/stories/RadarChart.stories.tsx`
- baseStory: `—`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Basic | Basic | No | args | connected-via-selected-story-args | OK |
| Type | WithDots | WithDots | No | args | connected-via-selected-story-args | OK |
| Type | LinesOnly | LinesOnly | No | args | connected-via-selected-story-args | OK |
| Type | Multiple | Multiple | No | args | connected-via-selected-story-args | OK |
| Type | WithLegend | WithLegend | No | args | connected-via-selected-story-args | OK |
| Grid | Basic | Basic | No | args | connected-via-selected-story-args | OK |
| Grid | GridCircle | GridCircle | No | args | connected-via-selected-story-args | OK |
| Grid | GridFilled | GridFilled | No | args | connected-via-selected-story-args | OK |

## RadialChart
- Story file: `src/stories/RadialChart.stories.tsx`
- baseStory: `—`
- Rows: 1
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Basic | Basic | No | args | connected-via-selected-story-args | OK |
| Type | WithLabel | WithLabel | No | args | connected-via-selected-story-args | OK |
| Type | WithGrid | WithGrid | No | args | connected-via-selected-story-args | OK |
| Type | WithText | WithText | No | args | connected-via-selected-story-args | OK |
| Type | DifferentShape | DifferentShape | No | args | connected-via-selected-story-args | OK |
| Type | Stacked | Stacked | No | args | connected-via-selected-story-args | OK |

## RadioGroup
- Story file: `src/components/atoms/RadioGroup/RadioGroup.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 3
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Layout | Vertical | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Layout | Horizontal | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | SM | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | MD | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Error | ExplorerBase | Yes | render+args | connected-via-args | OK |

## RadioSelector
- Story file: `src/components/molecules/RadioSelector/RadioSelector.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | With Icons | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Without Radio | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Disabled | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Controlled | ExplorerBase | Yes | render+args | connected-via-args | OK |

## Rate
- Story file: `src/components/molecules/Rate/Rate.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Half Stars | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | With Tooltips | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Disabled | ExplorerBase | Yes | render+args | connected-via-args | OK |

## ReadOnly
- Story file: `src/stories/ReadOnly.stories.tsx`
- baseStory: `—`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Vertical | VerticalBasic | No | args | connected-via-selected-story-args | OK |
| Type | Horizontal | HorizontalBasic | No | args | connected-via-selected-story-args | OK |
| Content | Basic | VerticalBasic | No | args | connected-via-selected-story-args | OK |
| Content | With Icon | VerticalWithIcon | No | args | connected-via-selected-story-args | OK |

## Result
- Story file: `src/components/organisms/Result/Result.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Success | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Error | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Info | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Warning | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | 404 | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | 403 | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | 500 | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | With Actions | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | With Details | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Custom Icon | ExplorerBase | Yes | render+args | connected-via-args | OK |

## SegmentedTabs
- Story file: `src/components/molecules/SegmentedTabs/SegmentedTabs.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Icons | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Icon Only | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Controlled | ExplorerBase | Yes | render+args | connected-via-args | OK |

## SimpleColumnLayout
- Story file: `src/components/molecules/SimpleColumnLayout/SimpleColumnLayout.stories.tsx`
- baseStory: `—`
- Rows: 1
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | Default | No | render | connected-via-first-row-story | OK |

## Slider
- Story file: `src/components/molecules/Slider/Slider.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Single | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Range | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Labels | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |

## Spacer
- Story file: `src/components/atoms/Spacer/Spacer.stories.tsx`
- baseStory: `—`
- Rows: 1
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | Default | No | render+args | connected-via-selected-story-args | OK |
| Type | Horizontal | Horizontal | No | render+args | connected-via-selected-story-args | OK |

## Spin
- Story file: `src/components/atoms/Spin/Spin.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | WithTip | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | WithContent | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Delayed | ExplorerBase | Yes | render+args | connected-via-args | OK |

## StackedBarChart
- Story file: `src/components/molecules/StackedBarChart/StackedBarChart.stories.tsx`
- baseStory: `—`
- Rows: 1
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | Default | No | render | connected-via-first-row-story | OK |

## Statistic
- Story file: `src/components/atoms/Statistic/Statistic.stories.tsx`
- baseStory: `—`
- Rows: 1
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | No | render+args | connected-via-selected-story-args | OK |
| Type | Label On Top | ExplorerBase | Yes | render+args | connected-via-args | OK |

## Steps
- Story file: `src/components/molecules/Steps/Steps.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Vertical | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Dot Style | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |

## SubText
- Story file: `src/components/atoms/SubText/SubText.stories.tsx`
- baseStory: `—`
- Rows: 1
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | Default | No | args | connected-via-selected-story-args | OK |
| Type | WithIcon | WithIcon | No | args | connected-via-selected-story-args | OK |

## Switch
- Story file: `src/components/atoms/Switch/Switch.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 3
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Content | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Content | Helper Text | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Content | Icon Only | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | SM | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | MD | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Off | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | On | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Disabled | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Error | ExplorerBase | Yes | render+args | connected-via-args | OK |

## Table
- Story file: `src/stories/Table.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Sortable | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | With Footer | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |

## Tabs
- Story file: `src/components/organisms/Tabs/Tabs.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Style | Primary | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Style | Secondary | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Style | Tertiary | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Content | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Content | Badges | ExplorerBase | Yes | render+args | connected-via-args | OK |

## Text
- Story file: `src/components/atoms/Text/Text.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Size | SM | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | MD | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | LG | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | XL | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | XX | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Content | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Content | Sub Text | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Content | Leading Icon | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Content | Trailing Icon | ExplorerBase | Yes | render+args | connected-via-args | OK |

## Textarea
- Story file: `src/components/atoms/Textarea/Textarea.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Size | XXS | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | XS | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | SM | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | MD | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | LG | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | XL | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | XXL | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Error | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Disabled | ExplorerBase | Yes | render+args | connected-via-args | OK |

## Timeline
- Story file: `src/components/molecules/Timeline/Timeline.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Alternate | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Custom Content | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |

## TimePicker
- Story file: `src/components/molecules/TimePicker/TimePicker.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 4
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Format | Default (24h) | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Format | 12-Hour | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Format | Without Seconds | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Format | 12h No Seconds | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | XXS | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | XS | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | SM | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | MD | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | LG | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | XL | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Size | XXL | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Error | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Warning | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Success | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Disabled | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Behavior | Controlled | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Behavior | Step Interval | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Behavior | Disabled Hours | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Behavior | Labels | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Behavior | Form | ExplorerBase | Yes | render+args | connected-via-args | OK |

## Toggle
- Story file: `src/components/atoms/Toggle/Toggle.stories.tsx`
- baseStory: `—`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | No | args | connected-via-selected-story-args | OK |
| Type | With Icon | ExplorerBase | Yes | args | connected-via-args | OK |
| Type | Icon Only | ExplorerBase | Yes | args | connected-via-args | OK |
| Type | Outline | ExplorerBase | Yes | args | connected-via-args | OK |
| State | Default | ExplorerBase | No | args | connected-via-selected-story-args | OK |
| State | Pressed | ExplorerBase | Yes | args | connected-via-args | OK |
| State | Disabled | ExplorerBase | Yes | args | connected-via-args | OK |

## ToggleGroup
- Story file: `src/components/molecules/ToggleGroup/ToggleGroup.stories.tsx`
- baseStory: `—`
- Rows: 1
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Single | Single | No | args | connected-via-selected-story-args | OK |
| Type | Multiple | Multiple | No | args | connected-via-selected-story-args | OK |
| Type | Outline | Outline | No | args | connected-via-selected-story-args | OK |

## Tooltip
- Story file: `src/components/molecules/Tooltip/Tooltip.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Content | Basic | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Content | Title | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Content | Arrow | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Content | Composed | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Style | Light | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Style | Dark | ExplorerBase | Yes | render+args | connected-via-args | OK |

## Tour
- Story file: `src/components/molecules/Tour/Tour.stories.tsx`
- baseStory: `—`
- Rows: 1
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | Default | No | render | connected-via-first-row-story | OK |

## Transfer
- Story file: `src/components/molecules/Transfer/Transfer.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | One Way | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |

## Tree
- Story file: `src/components/molecules/Tree/Tree.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Icons | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Checkboxes | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Directory | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Selection | ExplorerBase | Yes | render+args | connected-via-args | OK |

## TreeSelect
- Story file: `src/components/molecules/TreeSelect/TreeSelect.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Single Select | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Multi Check | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Error | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Disabled | ExplorerBase | Yes | render+args | connected-via-args | OK |

## Typography
- Story file: `src/components/atoms/Typography/Typography.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Style | Title Primary | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Style | Title Secondary | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Style | Display Primary | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Style | Button | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Style | Body Primary Semibold | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Style | Body Primary Medium | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Style | Body Primary Regular | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Style | Body Primary Italic | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Style | Body Secondary Semibold | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Style | Body Secondary Medium | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Style | Body Secondary Regular | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Tone | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Tone | Secondary | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Tone | Muted | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Tone | Danger | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Tone | Success | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Tone | Warning | ExplorerBase | Yes | render+args | connected-via-args | OK |

## Upload
- Story file: `src/components/organisms/Upload/Upload.stories.tsx`
- baseStory: `ExplorerBase`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Button Upload | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Thumbnail | ExplorerBase | Yes | render+args | connected-via-args | OK |
| Type | Custom Trigger | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Default | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | With Validation | ExplorerBase | Yes | render+args | connected-via-args | OK |
| State | Single File Only | ExplorerBase | Yes | render+args | connected-via-args | OK |

## UploadButton
- Story file: `src/stories/UploadButton.stories.tsx`
- baseStory: `—`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | Default | No | args | connected-via-selected-story-args | OK |
| Type | Hover | Hover | No | args | connected-via-selected-story-args | OK |
| Type | Multiple Files | MultipleFiles | No | args | connected-via-selected-story-args | OK |
| State | Default | Default | No | args | connected-via-selected-story-args | OK |
| State | Disabled | Disabled | No | args | connected-via-selected-story-args | OK |

## UploadItem
- Story file: `src/components/molecules/UploadItem/UploadItem.stories.tsx`
- baseStory: `—`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | Default | No | args | connected-via-selected-story-args | OK |
| Type | Text Type | TextType | No | args | connected-via-selected-story-args | OK |
| State | Default | Default | No | args | connected-via-selected-story-args | OK |
| State | Uploading | Uploading | No | args | connected-via-selected-story-args | OK |
| State | Uploaded | Uploaded | No | args | connected-via-selected-story-args | OK |
| State | Saved | Saved | No | args | connected-via-selected-story-args | OK |
| State | Error | Error | No | args | connected-via-selected-story-args | OK |

## UploadThumbnail
- Story file: `src/components/molecules/UploadThumbnail/UploadThumbnail.stories.tsx`
- baseStory: `—`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | Default | No | args | connected-via-selected-story-args | OK |
| Type | With Preview | WithPreview | No | args | connected-via-selected-story-args | OK |
| State | Default | Default | No | args | connected-via-selected-story-args | OK |
| State | Disabled | Disabled | No | args | connected-via-selected-story-args | OK |
| State | Hover State | HoverState | No | args | connected-via-selected-story-args | OK |

## UploadZone
- Story file: `src/stories/UploadZone.stories.tsx`
- baseStory: `—`
- Rows: 2
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Default | Default | No | args | connected-via-selected-story-args | OK |
| Type | Multiple Files | MultipleFiles | No | args | connected-via-selected-story-args | OK |
| Type | Different File Types | DifferentFileTypes | No | args | connected-via-selected-story-args | OK |
| State | Default | Default | No | args | connected-via-selected-story-args | OK |
| State | Disabled | Disabled | No | args | connected-via-selected-story-args | OK |

## Watermark
- Story file: `src/components/molecules/Watermark/Watermark.stories.tsx`
- baseStory: `—`
- Rows: 1
- Chip issues: 0 error, 0 warning

| Row | Chip | Story | Args | Export Kind | Connection | Status |
|---|---|---|---|---|---|---|
| Type | Basic | Basic | No | render+args | connected-via-selected-story-args | OK |
| Type | Multi Line | MultiLine | No | render+args | connected-via-selected-story-args | OK |
| Type | Custom Style | CustomStyle | No | render+args | connected-via-selected-story-args | OK |
