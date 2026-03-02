# Explorer Chip Preview Classification

Purpose: classify each explorer chip by how its preview is produced and whether it is likely to render a single variant or a multi-variant aggregate/gallery.

Categories used:
- `ExplorerBase + args`: safest, single preview assembled from a stable base story
- `custom-matrix-controlled`: no story ref; rendered via baseStory + per-chip args (e.g. Button matrix)
- `Direct single story`: chip points to a standalone story export
- `Aggregate/gallery story (multi-preview risk)`: chip likely renders multiple variants/examples in one preview
- `Missing story export`: chip points to a non-existent story export

Components scanned (deduped): 97
Chips scanned: 633

## Summary

| Category | Count |
|---|---:|
| ExplorerBase + args | 422 |
| Direct single story | 142 |
| Direct story + args | 43 |
| custom-matrix-controlled | 21 |
| Direct story (review for aggregate behavior) | 4 |
| ExplorerBase default | 1 |

| Explorer Mode | Count |
|---|---:|
| baseStory | 59 |
| direct | 38 |

High-risk chips (aggregate/gallery or missing export): 0

## High-Risk Chips

| Component | Row | Chip | Story | Export | Category | Note |
|---|---|---|---|---|---|---|

## Component Breakdown

## Affix
- Story file: `src/components/molecules/Affix/Affix.stories.tsx`
- baseStory: `—`
- explorer_mode: `direct`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Basic | Basic | No | render | Direct single story | medium | direct | — | no |
| Type | Bottom | Bottom | No | render | Direct single story | medium | direct | — | no |

## Alert
- Story file: `src/components/molecules/Alert/Alert.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default (Info) | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Success | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Warning | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Danger | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Behavior | Action | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Behavior | Closable | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Behavior | Complete | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Dismissible | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Actionable | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## Anchor
- Story file: `src/components/molecules/Anchor/Anchor.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Vertical | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Horizontal | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## AppHeader
- Story file: `src/stories/AppHeader.stories.tsx`
- baseStory: `—`
- explorer_mode: `direct`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Branding | Tata Motors | Default | No | args | Direct single story | low | direct | — | no |
| Branding | FreightTiger | WithFTCompany | No | args | Direct single story | low | direct | — | no |
| State | Theme On | Default | Yes | args | Direct story + args | low | direct | — | no |
| State | Theme Off | Default | Yes | args | Direct story + args | low | direct | — | no |

## AreaChart
- Story file: `src/stories/AreaChart.stories.tsx`
- baseStory: `—`
- explorer_mode: `direct`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Basic | Basic | No | args | Direct single story | low | direct | — | no |
| Type | Linear | Linear | No | args | Direct single story | low | direct | — | no |
| Type | Step | Step | No | args | Direct single story | low | direct | — | no |
| Type | Stacked | Stacked | No | args | Direct single story | low | direct | — | no |
| Type | Gradient | Gradient | No | args | Direct single story | low | direct | — | no |
| Type | WithAxes | WithAxes | No | args | Direct single story | low | direct | — | no |

## Avatar
- Story file: `src/components/atoms/Avatar/Avatar.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Fallback | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Group | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | XXS | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | XS | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | SM | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | MD | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | LG | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | XL | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | XXL | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## BackTop
- Story file: `src/components/molecules/BackTop/BackTop.stories.tsx`
- baseStory: `—`
- explorer_mode: `direct`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Basic | Basic | No | render | Direct single story | medium | direct | — | no |
| Type | CustomContent | CustomContent | No | render | Direct single story | medium | direct | — | no |

## Badge
- Story file: `src/components/atoms/Badge/Badge.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Composed | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Text Only | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Custom Icon | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Success | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Error | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Warning | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Info | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Neutral | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Danger | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | XS | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | SM | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | MD | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | LG | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## Breadcrumb
- Story file: `src/components/molecules/Breadcrumb/Breadcrumb.stories.tsx`
- baseStory: `—`
- explorer_mode: `direct`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | Default | No | render | Direct single story | medium | direct | — | no |
| Type | Icons | WithIcons | No | render | Direct single story | medium | direct | — | yes |
| Type | Custom Separator | CustomSeparator | No | render | Direct single story | medium | direct | — | yes |

## Button
- Story file: `src/components/atoms/Button/Button.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Style | Primary | — | Yes | — | custom-matrix-controlled | low | baseStory | ExplorerBase | no |
| Style | Outline | — | Yes | — | custom-matrix-controlled | low | baseStory | ExplorerBase | no |
| Style | Danger | — | Yes | — | custom-matrix-controlled | low | baseStory | ExplorerBase | no |
| Style | Text | — | Yes | — | custom-matrix-controlled | low | baseStory | ExplorerBase | no |
| Style | Link | — | Yes | — | custom-matrix-controlled | low | baseStory | ExplorerBase | no |
| Content | Leading Icon | — | Yes | — | custom-matrix-controlled | low | baseStory | ExplorerBase | no |
| Content | Trailing Icon | — | Yes | — | custom-matrix-controlled | low | baseStory | ExplorerBase | no |
| Content | Icon Only | — | Yes | — | custom-matrix-controlled | low | baseStory | ExplorerBase | no |
| Content | Label Only | — | Yes | — | custom-matrix-controlled | low | baseStory | ExplorerBase | no |
| State | Default | — | Yes | — | custom-matrix-controlled | low | baseStory | ExplorerBase | no |
| State | Disabled | — | Yes | — | custom-matrix-controlled | low | baseStory | ExplorerBase | no |
| State | Loading | — | Yes | — | custom-matrix-controlled | low | baseStory | ExplorerBase | no |
| Size | XXS | — | Yes | — | custom-matrix-controlled | low | baseStory | ExplorerBase | no |
| Size | XS | — | Yes | — | custom-matrix-controlled | low | baseStory | ExplorerBase | no |
| Size | SM | — | Yes | — | custom-matrix-controlled | low | baseStory | ExplorerBase | no |
| Size | MD | — | Yes | — | custom-matrix-controlled | low | baseStory | ExplorerBase | no |
| Size | LG | — | Yes | — | custom-matrix-controlled | low | baseStory | ExplorerBase | no |
| Size | XL | — | Yes | — | custom-matrix-controlled | low | baseStory | ExplorerBase | no |
| Size | XXL | — | Yes | — | custom-matrix-controlled | low | baseStory | ExplorerBase | no |
| Shape | Default | — | Yes | — | custom-matrix-controlled | low | baseStory | ExplorerBase | no |
| Shape | Rounded | — | Yes | — | custom-matrix-controlled | low | baseStory | ExplorerBase | no |

## ButtonGroup
- Story file: `src/components/molecules/ButtonGroup/ButtonGroup.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Equal Width | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | With Icons | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Wrapped | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## Calendar
- Story file: `src/components/molecules/Calendar/Calendar.stories.tsx`
- baseStory: `—`
- explorer_mode: `direct`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | Default | No | args | Direct single story | low | direct | — | no |
| Type | YearMode | YearMode | No | args | Direct single story | low | direct | — | no |
| Type | Fullscreen | Fullscreen | No | render+args | Direct single story | low | direct | — | no |
| Type | EventCalendar | EventCalendar | No | render+args | Direct single story | low | direct | — | yes |
| State | Default | Default | No | args | Direct single story | low | direct | — | no |
| State | DisabledDates | DisabledDates | No | render+args | Direct single story | low | direct | — | no |
| State | ValidRange | ValidRange | No | render+args | Direct single story | low | direct | — | no |
| State | Controlled | Controlled | No | render+args | Direct single story | low | direct | — | no |

## Card
- Story file: `src/components/organisms/Card/Card.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Basic | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Advanced | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Composable | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Elevated | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Outlined | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Content | Footer | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Content | No Footer | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Content | No Eyebrow | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## Carousel
- Story file: `src/components/molecules/Carousel/Carousel.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Autoplay | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Fade Effect | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Image Gallery | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Behavior | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Behavior | Without Arrows | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Behavior | Dot Positions | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Behavior | Custom Dots | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## Cascader
- Story file: `src/components/molecules/Cascader/Cascader.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Size | XXS | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | XS | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | SM | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | MD | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | LG | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | XL | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | XXL | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Disabled | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## Checkbox
- Story file: `src/components/atoms/Checkbox/Checkbox.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Content | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Content | Helper Text | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Content | Indeterminate | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | SM | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | MD | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Unchecked | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Checked | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Error | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Disabled | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## Chicklet
- Story file: `src/components/molecules/Chicklet/Chicklet.stories.tsx`
- baseStory: `—`
- explorer_mode: `direct`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Style | Default | Default | No | args | Direct single story | low | direct | — | no |
| Style | Rounded | Rounded | No | args | Direct single story | low | direct | — | no |
| Style | Bordered | Bordered | No | args | Direct single story | low | direct | — | no |
| Style | Rounded Bordered | RoundedBordered | No | args | Direct single story | low | direct | — | no |
| State | Default | Default | No | args | Direct single story | low | direct | — | no |
| State | Closable | Closable | No | args | Direct single story | low | direct | — | no |
| State | Disabled | Disabled | No | args | Direct single story | low | direct | — | no |
| State | Closable Disabled | ClosableDisabled | No | args | Direct single story | low | direct | — | no |

## Collapsible
- Story file: `src/components/organisms/Collapsible/Collapsible.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Primary | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Secondary | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Tertiary | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Collapsed | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Expanded | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Extra | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Controlled | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## Color System
- Story file: `src/stories/ColorSystem.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Theme | Light Mode | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Theme | Dark Mode | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Theme | Night Mode | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## ColorPicker
- Story file: `src/components/molecules/ColorPicker/ColorPicker.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | With Presets | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Disabled | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## DataEntryTable
- Story file: `src/components/organisms/DataEntryTable/DataEntryTable.stories.tsx`
- baseStory: `—`
- explorer_mode: `direct`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | Default | No | render | Direct single story | medium | direct | — | no |
| Type | WithSelection | WithSelection | No | render | Direct single story | medium | direct | — | yes |
| Type | WithActions | WithActions | No | render | Direct single story | medium | direct | — | yes |
| Type | WithMultipleCellTypes | WithMultipleCellTypes | No | render | Direct single story | medium | direct | — | no |

## DatePicker
- Story file: `src/components/molecules/DatePicker/DatePicker.stories.tsx`
- baseStory: `—`
- explorer_mode: `direct`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | Default | No | args | Direct single story | low | direct | — | no |
| Type | Range | Default | Yes | args | Direct story + args | low | direct | — | no |
| Type | Custom Quick Select | Default | Yes | args | Direct story + args | low | direct | — | no |
| Size | XXS | Default | Yes | args | Direct story + args | low | direct | — | no |
| Size | XS | Default | Yes | args | Direct story + args | low | direct | — | no |
| Size | SM | Default | Yes | args | Direct story + args | low | direct | — | no |
| Size | MD | Default | Yes | args | Direct story + args | low | direct | — | no |
| Size | LG | Default | Yes | args | Direct story + args | low | direct | — | no |
| Size | XL | Default | Yes | args | Direct story + args | low | direct | — | no |
| Size | XXL | Default | Yes | args | Direct story + args | low | direct | — | no |
| State | Default | Default | No | args | Direct single story | low | direct | — | no |
| State | With Value | Default | Yes | args | Direct story + args | low | direct | — | no |
| State | Error | Default | Yes | args | Direct story + args | low | direct | — | no |
| State | Disabled | Default | Yes | args | Direct story + args | low | direct | — | no |

## Descriptions
- Story file: `src/components/molecules/Descriptions/Descriptions.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | With Badge | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Vertical | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## Divider
- Story file: `src/components/atoms/Divider/Divider.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Dashed | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Vertical | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | With Label | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Primary | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Secondary | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Tertiary | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## Drawer
- Story file: `src/components/organisms/Drawer/Drawer.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Placement | Right (Default) | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Placement | Left | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Placement | Top | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Placement | Bottom | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Content | Basic | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Content | Form | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## Dropdown
- Story file: `src/components/molecules/Dropdown/Dropdown.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Searchable | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Grouped | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | With Label | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Error | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Disabled | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## DropdownMenu
- Story file: `src/components/molecules/DropdownMenu/DropdownMenu.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | With Search | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | With Labels | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## Empty
- Story file: `src/components/molecules/Empty/Empty.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Simple | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | No Data | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Error | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Content | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Content | With Description | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Content | With Actions | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## FileCard
- Story file: `src/stories/FileCard.stories.tsx`
- baseStory: `—`
- explorer_mode: `direct`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | Default | No | args | Direct single story | low | direct | — | no |
| Type | CSV | CSV | No | args | Direct single story | low | direct | — | no |
| State | Default | Default | No | args | Direct single story | low | direct | — | no |
| State | Uploading | Uploading | No | args | Direct single story | low | direct | — | no |
| State | Validating | Validating | No | args | Direct single story | low | direct | — | no |
| State | Processed | Processed | No | args | Direct single story | low | direct | — | no |
| State | Failed | Failed | No | args | Direct single story | low | direct | — | no |

## FileThumbnail
- Story file: `src/stories/FileThumbnail.stories.tsx`
- baseStory: `—`
- explorer_mode: `direct`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | Default | No | args | Direct single story | low | direct | — | no |
| Type | With Image | WithImage | No | args | Direct single story | low | direct | — | no |
| Type | PDF File | PDFFile | No | args | Direct single story | low | direct | — | no |
| Type | Excel File | ExcelFile | No | args | Direct single story | low | direct | — | no |
| Type | Image Preview | ImagePreview | No | args | Direct single story | low | direct | — | no |

## FileTypeIcon
- Story file: `src/stories/FileTypeIcon.stories.tsx`
- baseStory: `—`
- explorer_mode: `direct`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | No | args | Direct single story | low | direct | — | no |
| Type | XLSX | ExplorerBase | Yes | args | Direct story + args | low | direct | — | no |
| Type | PDF | ExplorerBase | Yes | args | Direct story + args | low | direct | — | no |
| Type | DOC | ExplorerBase | Yes | args | Direct story + args | low | direct | — | no |
| Type | DOCX | ExplorerBase | Yes | args | Direct story + args | low | direct | — | no |
| Type | PNG | ExplorerBase | Yes | args | Direct story + args | low | direct | — | no |
| Type | JPEG | ExplorerBase | Yes | args | Direct story + args | low | direct | — | no |
| Type | JPG | ExplorerBase | Yes | args | Direct story + args | low | direct | — | no |
| Type | CSV | ExplorerBase | Yes | args | Direct story + args | low | direct | — | no |
| Type | Error Variant | ExplorerBase | Yes | args | Direct story + args | low | direct | — | no |
| Size | XXS | ExplorerBase | Yes | args | Direct story + args | low | direct | — | no |
| Size | XS | ExplorerBase | Yes | args | Direct story + args | low | direct | — | no |
| Size | SM | ExplorerBase | Yes | args | Direct story + args | low | direct | — | no |
| Size | MD | ExplorerBase | Yes | args | Direct story + args | low | direct | — | no |
| Size | LG | ExplorerBase | Yes | args | Direct story + args | low | direct | — | no |
| Size | XL | ExplorerBase | Yes | args | Direct story + args | low | direct | — | no |
| Size | XXL | ExplorerBase | Yes | args | Direct story + args | low | direct | — | no |

## FileValidationCard
- Story file: `src/stories/FileValidationCard.stories.tsx`
- baseStory: `—`
- explorer_mode: `direct`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | Default | No | args | Direct single story | low | direct | — | no |
| Type | Success | Success | No | args | Direct single story | low | direct | — | no |
| Type | Failed | Failed | No | args | Direct single story | low | direct | — | no |
| Type | Partial | Partial | No | args | Direct single story | low | direct | — | no |
| Type | CSV | CSV | No | args | Direct single story | low | direct | — | no |

## FloatButton
- Story file: `src/components/molecules/FloatButton/FloatButton.stories.tsx`
- baseStory: `—`
- explorer_mode: `direct`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Basic | Basic | No | render | Direct single story | medium | direct | — | no |
| Type | WithType | WithType | No | render | Direct single story | medium | direct | — | no |
| Type | Group | Group | No | render | Direct single story | medium | direct | — | no |

## Footer
- Story file: `src/components/organisms/Footer/Footer.stories.tsx`
- baseStory: `—`
- explorer_mode: `direct`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | No | render+args | Direct single story | low | direct | — | no |
| Type | Two Buttons | ExplorerBase | Yes | render+args | Direct story + args | low | direct | — | no |
| Type | Three Buttons | ExplorerBase | Yes | render+args | Direct story + args | low | direct | — | no |
| Type | Four Buttons | ExplorerBase | Yes | render+args | Direct story + args | low | direct | — | no |
| Type | With Left Side | ExplorerBase | Yes | render+args | Direct story + args | low | direct | — | no |
| Type | Custom Buttons | ExplorerBase | Yes | render+args | Direct story + args | low | direct | — | no |

## Form
- Story file: `src/components/organisms/Form/Form.stories.tsx`
- baseStory: `—`
- explorer_mode: `direct`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Layout | Vertical | ExplorerBase | No | render+args | Direct single story | low | direct | — | no |
| Layout | Horizontal | ExplorerBase | Yes | render+args | Direct story + args | low | direct | — | no |
| State | Default | ExplorerBase | No | render+args | Direct single story | low | direct | — | no |
| State | With Validation | ExplorerBase | Yes | render+args | Direct story + args | low | direct | — | no |

## Grid
- Story file: `src/components/organisms/Grid/Grid.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Basic Grid | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Gutter | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Offset | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Flex Layout | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Layout | Vertical Align | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Layout | Justify | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## HoverCard
- Story file: `src/components/molecules/HoverCard/HoverCard.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Content | User Card | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Behavior | Top | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Behavior | Bottom | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Behavior | Left | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Behavior | Right | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Disabled Trigger | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## Icon
- Story file: `src/components/atoms/Icons/Icon.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Navigation | ExplorerBase | Yes | args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Action | ExplorerBase | Yes | args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Status | ExplorerBase | Yes | args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | 12 | ExplorerBase | Yes | args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | 16 | ExplorerBase | Yes | args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | 24 | ExplorerBase | Yes | args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | 32 | ExplorerBase | Yes | args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | 48 | ExplorerBase | Yes | args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Colors | ExplorerBase | Yes | args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Brand | ExplorerBase | Yes | args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## Illustration
- Story file: `src/components/atoms/Illustration/Illustration.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Overview | ExplorerBase | Yes | args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Insights | ExplorerBase | Yes | args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Workspace | ExplorerBase | Yes | args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Reports | ExplorerBase | Yes | args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | SM | ExplorerBase | Yes | args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | MD | ExplorerBase | Yes | args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | LG | ExplorerBase | Yes | args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | XL | ExplorerBase | Yes | args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Content | Single Preview | ExplorerBase | No | args | ExplorerBase default | low | baseStory | ExplorerBase | no |

## Image
- Story file: `src/components/molecules/Image/Image.stories.tsx`
- baseStory: `—`
- explorer_mode: `direct`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | Default | No | args | Direct single story | low | direct | — | no |
| Type | With Preview | WithPreview | No | args | Direct single story | low | direct | — | no |
| Type | With Fallback | WithFallback | No | args | Direct single story | low | direct | — | no |
| State | Default | Default | No | args | Direct single story | low | direct | — | no |
| State | Error State | ErrorState | No | args | Direct single story | low | direct | — | no |

## Input
- Story file: `src/stories/Input.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Style | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Filled | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Outlined | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Content | Basic | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Content | With Icons | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Error | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Warning | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Success | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Disabled | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## InputNumber
- Story file: `src/components/molecules/InputNumber/InputNumber.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | With Prefix | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | With Suffix | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Disabled | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Error | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## Label
- Story file: `src/stories/Label.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Mandatory | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Optional | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Content | Basic | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Content | With Icon | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Content | Form Example | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## LineChart
- Story file: `src/stories/LineChart.stories.tsx`
- baseStory: `—`
- explorer_mode: `direct`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Basic | Basic | No | args | Direct single story | low | direct | — | no |
| Type | Multiple | Multiple | No | args | Direct single story | low | direct | — | no |
| Type | Linear | Linear | No | args | Direct single story | low | direct | — | no |
| Type | Step | Step | No | args | Direct single story | low | direct | — | no |
| Type | WithDots | WithDots | No | args | Direct single story | low | direct | — | no |
| Type | WithLabels | WithLabels | No | args | Direct single story | low | direct | — | no |

## List
- Story file: `src/components/molecules/List/List.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | With Icons | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | With Actions | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## Loader
- Story file: `src/components/molecules/Loader/Loader.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Static | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Without Logo | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Small Logo | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Full Width | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Content | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Content | No Progress Bar | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Content | Custom Progress Bar | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## Logo
- Story file: `src/components/atoms/Logos/Logo.stories.tsx`
- baseStory: `—`
- explorer_mode: `direct`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Brand | Default (FT) | Default | No | args | Direct single story | low | direct | — | no |
| Brand | FT White | FTWhite | No | args | Direct single story | low | direct | — | no |
| Brand | Tata Motors | TataMotors | No | args | Direct single story | low | direct | — | no |
| Size | Default | Default | No | args | Direct single story | low | direct | — | no |
| Size | Custom Size | CustomSize | No | args | Direct single story | low | direct | — | no |
| Size | Large | TataMotorsLarge | No | args | Direct single story | low | direct | — | no |

## Mentions
- Story file: `src/components/molecules/Mentions/Mentions.stories.tsx`
- baseStory: `—`
- explorer_mode: `direct`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default (@) | Default | No | render | Direct single story | medium | direct | — | no |
| Type | Custom Prefix (#) | CustomPrefix | No | render | Direct single story | medium | direct | — | yes |
| Type | Rich Content | WithRichContent | No | render | Direct single story | medium | direct | — | yes |

## Modal
- Story file: `src/components/organisms/Modal/Modal.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Basic | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Footer | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | Small | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | Medium | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | Large | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | Extra Large | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | Full | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## Multi-Theme Demo
- Story file: `src/stories/ThemeSystem.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Theme Mode | Interactive Demo | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Theme Mode | Light | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Theme Mode | Dark | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Theme Mode | Night | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Comparison | Side-by-Side | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## NavigationLauncher
- Story file: `src/stories/NavigationLauncher.stories.tsx`
- baseStory: `—`
- explorer_mode: `direct`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | DefaultLauncher | DefaultLauncher | No | render | Direct single story | medium | direct | — | no |
| Type | CustomTrigger | CustomTrigger | No | render | Direct single story | medium | direct | — | no |
| Type | AppHeaderIntegration | AppHeaderIntegration | No | render | Direct single story | medium | direct | — | no |

## NavigationPopover
- Story file: `src/stories/NavigationPopover.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Insights | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Workspace | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Reports | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | SubMenuVariant | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | ServiceHealth | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | MetricsWithoutHero | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | HeroTopPlacement | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## Notification
- Story file: `src/components/molecules/Notification/Notification.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Content | Interactive Demo | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Success | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Info | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Warning | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Danger | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Behavior | Closable | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Behavior | With Icon | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Behavior | Auto Dismiss | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## PageHeader
- Story file: `src/components/organisms/PageHeader/PageHeader.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Minimal | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Content | Basic | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Content | With Tabs | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Content | Segmented Tabs | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Content | With Filters | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Tabs Interactive | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | With Actions | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## Pagination
- Story file: `src/components/molecules/Pagination/Pagination.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Size Changer | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Quick Jumper | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Compact | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## PieChart
- Story file: `src/stories/PieChart.stories.tsx`
- baseStory: `—`
- explorer_mode: `direct`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Basic | Basic | No | args | Direct single story | low | direct | — | no |
| Type | WithLabels | WithLabels | No | args | Direct single story | low | direct | — | no |
| Type | Donut | Donut | No | args | Direct single story | low | direct | — | no |
| Type | DonutWithText | DonutWithText | No | args | Direct single story | low | direct | — | no |
| Type | Stacked | Stacked | No | args | Direct single story | low | direct | — | no |
| Type | WithLegend | WithLegend | No | args | Direct single story | low | direct | — | no |

## Popconfirm
- Story file: `src/components/molecules/Popconfirm/Popconfirm.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Icon | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Placement | Top | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Placement | Bottom | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Placement | Left | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Placement | Right | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Danger | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Warning | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Disabled | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## Progress
- Story file: `src/components/molecules/ProgressBar/ProgressBar.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Line | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Circle | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Dashboard | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Steps | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Primary | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Success | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Warning | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Danger | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Active | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Not Started | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | In Progress | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Completed | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## ProgressList
- Story file: `src/components/molecules/ProgressList/ProgressList.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Time | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Icons | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Badges | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Normal | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Success | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Warning | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Danger | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Collapsible | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## QuickFilters
- Story file: `src/components/organisms/QuickFilters/QuickFilters.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Filter Type | Single Filters | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Filter Type | Multi-option | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Selected | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Mixed Selection | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## RadarChart
- Story file: `src/stories/RadarChart.stories.tsx`
- baseStory: `—`
- explorer_mode: `direct`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Basic | Basic | No | args | Direct single story | low | direct | — | no |
| Type | WithDots | WithDots | No | args | Direct single story | low | direct | — | no |
| Type | LinesOnly | LinesOnly | No | args | Direct single story | low | direct | — | no |
| Type | Multiple | Multiple | No | args | Direct single story | low | direct | — | no |
| Type | WithLegend | WithLegend | No | args | Direct single story | low | direct | — | no |
| Grid | Basic | Basic | No | args | Direct story (review for aggregate behavior) | medium | direct | — | no |
| Grid | GridCircle | GridCircle | No | args | Direct story (review for aggregate behavior) | medium | direct | — | no |
| Grid | GridFilled | GridFilled | No | args | Direct story (review for aggregate behavior) | medium | direct | — | no |

## RadialChart
- Story file: `src/stories/RadialChart.stories.tsx`
- baseStory: `—`
- explorer_mode: `direct`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Basic | Basic | No | args | Direct single story | low | direct | — | no |
| Type | WithLabel | WithLabel | No | args | Direct single story | low | direct | — | no |
| Type | WithGrid | WithGrid | No | args | Direct story (review for aggregate behavior) | medium | direct | — | no |
| Type | WithText | WithText | No | args | Direct single story | low | direct | — | no |
| Type | DifferentShape | DifferentShape | No | args | Direct single story | low | direct | — | no |
| Type | Stacked | Stacked | No | args | Direct single story | low | direct | — | no |

## RadioGroup
- Story file: `src/components/atoms/RadioGroup/RadioGroup.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Layout | Vertical | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Layout | Horizontal | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | SM | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | MD | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Error | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## RadioSelector
- Story file: `src/components/molecules/RadioSelector/RadioSelector.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | With Icons | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Without Radio | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Disabled | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Controlled | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## Rate
- Story file: `src/components/molecules/Rate/Rate.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Half Stars | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | With Tooltips | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Disabled | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## ReadOnly
- Story file: `src/stories/ReadOnly.stories.tsx`
- baseStory: `—`
- explorer_mode: `direct`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Vertical | VerticalBasic | No | args | Direct single story | low | direct | — | no |
| Type | Horizontal | HorizontalBasic | No | args | Direct single story | low | direct | — | no |
| Content | Basic | VerticalBasic | No | args | Direct single story | low | direct | — | no |
| Content | With Icon | VerticalWithIcon | No | args | Direct single story | low | direct | — | no |

## Result
- Story file: `src/components/organisms/Result/Result.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Success | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Error | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Info | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Warning | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | 404 | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | 403 | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | 500 | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | With Actions | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | With Details | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Custom Icon | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## SegmentedTabs
- Story file: `src/components/molecules/SegmentedTabs/SegmentedTabs.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Icons | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Icon Only | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Controlled | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## SimpleColumnLayout
- Story file: `src/components/molecules/SimpleColumnLayout/SimpleColumnLayout.stories.tsx`
- baseStory: `—`
- explorer_mode: `direct`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | Default | No | render | Direct single story | medium | direct | — | no |

## Slider
- Story file: `src/components/molecules/Slider/Slider.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Single | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Range | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Labels | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## Spacer
- Story file: `src/components/atoms/Spacer/Spacer.stories.tsx`
- baseStory: `—`
- explorer_mode: `direct`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | Default | No | render+args | Direct single story | low | direct | — | no |
| Type | Horizontal | Horizontal | No | render+args | Direct single story | low | direct | — | no |

## Spin
- Story file: `src/components/atoms/Spin/Spin.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | WithTip | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | WithContent | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Delayed | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## StackedBarChart
- Story file: `src/components/molecules/StackedBarChart/StackedBarChart.stories.tsx`
- baseStory: `—`
- explorer_mode: `direct`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | Default | No | render | Direct single story | medium | direct | — | no |

## Statistic
- Story file: `src/components/atoms/Statistic/Statistic.stories.tsx`
- baseStory: `—`
- explorer_mode: `direct`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | No | render+args | Direct single story | low | direct | — | no |
| Type | Label On Top | ExplorerBase | Yes | render+args | Direct story + args | low | direct | — | no |

## Steps
- Story file: `src/components/molecules/Steps/Steps.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Vertical | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Dot Style | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## SubText
- Story file: `src/components/atoms/SubText/SubText.stories.tsx`
- baseStory: `—`
- explorer_mode: `direct`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | Default | No | args | Direct single story | low | direct | — | no |
| Type | WithIcon | WithIcon | No | args | Direct single story | low | direct | — | no |

## Switch
- Story file: `src/components/atoms/Switch/Switch.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Content | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Content | Helper Text | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Content | Icon Only | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | SM | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | MD | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Off | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | On | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Disabled | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Error | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## Table
- Story file: `src/stories/Table.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Sortable | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | With Footer | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## Tabs
- Story file: `src/components/organisms/Tabs/Tabs.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Style | Primary | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Secondary | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Tertiary | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Content | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Content | Badges | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## Text
- Story file: `src/components/atoms/Text/Text.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Size | SM | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | MD | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | LG | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | XL | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | XX | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Content | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Content | Sub Text | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Content | Leading Icon | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Content | Trailing Icon | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## Textarea
- Story file: `src/components/atoms/Textarea/Textarea.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Size | XXS | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | XS | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | SM | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | MD | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | LG | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | XL | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | XXL | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Error | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Disabled | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## Timeline
- Story file: `src/components/molecules/Timeline/Timeline.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Alternate | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Custom Content | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## TimePicker
- Story file: `src/components/molecules/TimePicker/TimePicker.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Format | Default (24h) | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Format | 12-Hour | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Format | Without Seconds | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Format | 12h No Seconds | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | XXS | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | XS | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | SM | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | MD | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | LG | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | XL | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Size | XXL | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Error | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Warning | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Success | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Disabled | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Behavior | Controlled | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Behavior | Step Interval | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Behavior | Disabled Hours | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Behavior | Labels | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Behavior | Form | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## Toggle
- Story file: `src/components/atoms/Toggle/Toggle.stories.tsx`
- baseStory: `—`
- explorer_mode: `direct`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | No | args | Direct single story | low | direct | — | no |
| Type | With Icon | ExplorerBase | Yes | args | Direct story + args | low | direct | — | no |
| Type | Icon Only | ExplorerBase | Yes | args | Direct story + args | low | direct | — | no |
| Type | Outline | ExplorerBase | Yes | args | Direct story + args | low | direct | — | no |
| State | Default | ExplorerBase | No | args | Direct single story | low | direct | — | no |
| State | Pressed | ExplorerBase | Yes | args | Direct story + args | low | direct | — | no |
| State | Disabled | ExplorerBase | Yes | args | Direct story + args | low | direct | — | no |

## ToggleGroup
- Story file: `src/components/molecules/ToggleGroup/ToggleGroup.stories.tsx`
- baseStory: `—`
- explorer_mode: `direct`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Single | Single | No | args | Direct single story | low | direct | — | no |
| Type | Multiple | Multiple | No | args | Direct single story | low | direct | — | yes |
| Type | Outline | Outline | No | args | Direct single story | low | direct | — | yes |

## Tooltip
- Story file: `src/components/molecules/Tooltip/Tooltip.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Content | Basic | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Content | Title | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Content | Arrow | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Content | Composed | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Light | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Dark | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## Tour
- Story file: `src/components/molecules/Tour/Tour.stories.tsx`
- baseStory: `—`
- explorer_mode: `direct`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | Default | No | render | Direct single story | medium | direct | — | no |

## Transfer
- Story file: `src/components/molecules/Transfer/Transfer.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | One Way | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## Tree
- Story file: `src/components/molecules/Tree/Tree.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Icons | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Checkboxes | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Directory | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Selection | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## TreeSelect
- Story file: `src/components/molecules/TreeSelect/TreeSelect.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Single Select | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Multi Check | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Error | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Disabled | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## Typography
- Story file: `src/components/atoms/Typography/Typography.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Style | Title Primary | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Title Secondary | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Display Primary | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Button | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Body Primary Semibold | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Body Primary Medium | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Body Primary Regular | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Body Primary Italic | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Body Secondary Semibold | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Body Secondary Medium | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Style | Body Secondary Regular | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Tone | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Tone | Secondary | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Tone | Muted | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Tone | Danger | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Tone | Success | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Tone | Warning | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## Upload
- Story file: `src/components/organisms/Upload/Upload.stories.tsx`
- baseStory: `ExplorerBase`
- explorer_mode: `baseStory`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Button Upload | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Thumbnail | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| Type | Custom Trigger | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Default | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | With Validation | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |
| State | Single File Only | ExplorerBase | Yes | render+args | ExplorerBase + args | low | baseStory | ExplorerBase | no |

## UploadButton
- Story file: `src/stories/UploadButton.stories.tsx`
- baseStory: `—`
- explorer_mode: `direct`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | Default | No | args | Direct single story | low | direct | — | no |
| Type | Hover | Hover | No | args | Direct single story | low | direct | — | no |
| Type | Multiple Files | MultipleFiles | No | args | Direct single story | low | direct | — | no |
| State | Default | Default | No | args | Direct single story | low | direct | — | no |
| State | Disabled | Disabled | No | args | Direct single story | low | direct | — | no |

## UploadItem
- Story file: `src/components/molecules/UploadItem/UploadItem.stories.tsx`
- baseStory: `—`
- explorer_mode: `direct`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | Default | No | args | Direct single story | low | direct | — | no |
| Type | Text Type | TextType | No | args | Direct single story | low | direct | — | no |
| State | Default | Default | No | args | Direct single story | low | direct | — | no |
| State | Uploading | Uploading | No | args | Direct single story | low | direct | — | no |
| State | Uploaded | Uploaded | No | args | Direct single story | low | direct | — | no |
| State | Saved | Saved | No | args | Direct single story | low | direct | — | no |
| State | Error | Error | No | args | Direct single story | low | direct | — | no |

## UploadThumbnail
- Story file: `src/components/molecules/UploadThumbnail/UploadThumbnail.stories.tsx`
- baseStory: `—`
- explorer_mode: `direct`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | Default | No | args | Direct single story | low | direct | — | no |
| Type | With Preview | WithPreview | No | args | Direct single story | low | direct | — | no |
| State | Default | Default | No | args | Direct single story | low | direct | — | no |
| State | Disabled | Disabled | No | args | Direct single story | low | direct | — | no |
| State | Hover State | HoverState | No | args | Direct single story | low | direct | — | no |

## UploadZone
- Story file: `src/stories/UploadZone.stories.tsx`
- baseStory: `—`
- explorer_mode: `direct`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Default | Default | No | args | Direct single story | low | direct | — | no |
| Type | Multiple Files | MultipleFiles | No | args | Direct single story | low | direct | — | no |
| Type | Different File Types | DifferentFileTypes | No | args | Direct single story | low | direct | — | yes |
| State | Default | Default | No | args | Direct single story | low | direct | — | no |
| State | Disabled | Disabled | No | args | Direct single story | low | direct | — | no |

## Watermark
- Story file: `src/components/molecules/Watermark/Watermark.stories.tsx`
- baseStory: `—`
- explorer_mode: `direct`

| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |
|---|---|---|---|---|---|---|---|---|---|
| Type | Basic | Basic | No | render | Direct single story | medium | direct | — | no |
| Type | Multi Line | MultiLine | No | render | Direct single story | medium | direct | — | no |
| Type | Custom Style | CustomStyle | No | render | Direct single story | medium | direct | — | no |
