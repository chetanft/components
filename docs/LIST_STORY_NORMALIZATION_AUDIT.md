# List Story Normalization Audit

> Generated 2026-03-03

## Summary

| Metric | Count |
|--------|-------|
| Total story files | 129 |
| Total story exports | 595 |
| A: Canonical (ok) | 219 |
| B: Needs Docs rename | 0 |
| C: Already Docs (ok) | 249 |
| D: Needs split | 0 |
| E: Duplicate candidate | 63 |
| F: Internal (hide) | 64 |

## Bucket Legend

- **A**: Canonical — explorer-backed or single-scenario. No action needed.
- **B**: Docs-only rename needed — aggregate/demo story without `Docs` prefix. Rename to `Docs*`.
- **C**: Already docs-only — has `Docs` prefix or `docsOnly: true`. No rename needed.
- **D**: Split needed — aggregate story hiding canonical coverage. Split into canonical + docs gallery.
- **E**: Duplicate candidate — story not in explorer, may duplicate explorer coverage. Review.
- **F**: Internal — `ExplorerBase`. Should be hidden from list view.

## Action Board

97 components need attention out of 129 total.

### Molecules/Loader
`src/components/molecules/Loader/Loader.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Static` | **E**: Review | Story not referenced by explorer — review for duplication |
| `WithoutLogo` | **E**: Review | Story not referenced by explorer — review for duplication |
| `NoProgressBar` | **E**: Review | Story not referenced by explorer — review for duplication |
| `CustomProgressBar` | **E**: Review | Story not referenced by explorer — review for duplication |
| `CustomLogo` | **E**: Review | Story not referenced by explorer — review for duplication |
| `SmallLogo` | **E**: Review | Story not referenced by explorer — review for duplication |
| `FullWidth` | **E**: Review | Story not referenced by explorer — review for duplication |
| *1 canonical stories* | **A**: OK | — |

### Organisms/Modal
`src/components/organisms/Modal/Modal.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Small` | **E**: Review | Story not referenced by explorer — review for duplication |
| `Medium` | **E**: Review | Story not referenced by explorer — review for duplication |
| `Large` | **E**: Review | Story not referenced by explorer — review for duplication |
| `ExtraLarge` | **E**: Review | Story not referenced by explorer — review for duplication |
| `Full` | **E**: Review | Story not referenced by explorer — review for duplication |
| `BasicModal` | **E**: Review | Story not referenced by explorer — review for duplication |
| `WithFooter` | **E**: Review | Story not referenced by explorer — review for duplication |
| `DocsSizes` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| *1 canonical stories* | **A**: OK | — |

### Components/Input
`src/stories/Input.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `WithError` | **E**: Review | Story not referenced by explorer — review for duplication |
| `WithIcons` | **E**: Review | Story not referenced by explorer — review for duplication |
| `WithSuccess` | **E**: Review | Story not referenced by explorer — review for duplication |
| `WithWarning` | **E**: Review | Story not referenced by explorer — review for duplication |
| `Filled` | **E**: Review | Story not referenced by explorer — review for duplication |
| `Outlined` | **E**: Review | Story not referenced by explorer — review for duplication |
| `Disabled` | **E**: Review | Story not referenced by explorer — review for duplication |
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsStates` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| *1 canonical stories* | **A**: OK | — |

### Molecules/ProgressList
`src/components/molecules/ProgressList/ProgressList.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `WithTime` | **E**: Review | Story not referenced by explorer — review for duplication |
| `WithIcons` | **E**: Review | Story not referenced by explorer — review for duplication |
| `WithBadges` | **E**: Review | Story not referenced by explorer — review for duplication |
| `WithDivider` | **E**: Review | Story not referenced by explorer — review for duplication |
| `Collapsible` | **E**: Review | Story not referenced by explorer — review for duplication |
| *1 canonical stories* | **A**: OK | — |

### Components/Charts/LineChart
`src/stories/LineChart.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `Interactive` | **E**: Review | Args-only story not in explorer — may duplicate explorer coverage |
| `CustomDots` | **E**: Review | Args-only story not in explorer — may duplicate explorer coverage |
| `CustomDotColors` | **E**: Review | Args-only story not in explorer — may duplicate explorer coverage |
| `CustomLabel` | **E**: Review | Args-only story not in explorer — may duplicate explorer coverage |
| `CustomDefaultColors` | **E**: Review | Args-only story not in explorer — may duplicate explorer coverage |
| *6 canonical stories* | **A**: OK | — |

### Components/Charts/PieChart
`src/stories/PieChart.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `SeparatorNone` | **E**: Review | Args-only story not in explorer — may duplicate explorer coverage |
| `CustomLabel` | **E**: Review | Args-only story not in explorer — may duplicate explorer coverage |
| `LabelList` | **E**: Review | Args-only story not in explorer — may duplicate explorer coverage |
| `DonutActive` | **E**: Review | Args-only story not in explorer — may duplicate explorer coverage |
| `Interactive` | **E**: Review | Args-only story not in explorer — may duplicate explorer coverage |
| *6 canonical stories* | **A**: OK | — |

### Molecules/RadioSelector
`src/components/molecules/RadioSelector/RadioSelector.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `WithIcons` | **E**: Review | Story not referenced by explorer — review for duplication |
| `WithoutRadio` | **E**: Review | Story not referenced by explorer — review for duplication |
| `WithDisabled` | **E**: Review | Story not referenced by explorer — review for duplication |
| `Controlled` | **E**: Review | Story not referenced by explorer — review for duplication |
| *1 canonical stories* | **A**: OK | — |

### Components/Charts/RadarChart
`src/stories/RadarChart.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `CustomLabel` | **E**: Review | Args-only story not in explorer — may duplicate explorer coverage |
| `GridCustom` | **E**: Review | Args-only story not in explorer — may duplicate explorer coverage |
| `GridNone` | **E**: Review | Args-only story not in explorer — may duplicate explorer coverage |
| `GridCircleNoLines` | **E**: Review | Args-only story not in explorer — may duplicate explorer coverage |
| *7 canonical stories* | **A**: OK | — |

### UI Components/QuickFilters
`src/components/organisms/QuickFilters/QuickFilters.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `MultiOptionFilters` | **E**: Review | Story not referenced by explorer — review for duplication |
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsStates` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `SelectedState` | **E**: Review | Story not referenced by explorer — review for duplication |
| `MixedSelection` | **E**: Review | Story not referenced by explorer — review for duplication |
| *1 canonical stories* | **A**: OK | — |

### Components/Charts/AreaChart
`src/stories/AreaChart.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `Interactive` | **E**: Review | Args-only story not in explorer — may duplicate explorer coverage |
| `WithLegend` | **E**: Review | Args-only story not in explorer — may duplicate explorer coverage |
| `StackedExpanded` | **E**: Review | Args-only story not in explorer — may duplicate explorer coverage |
| *6 canonical stories* | **A**: OK | — |

### Theme System/Multi-Theme Demo
`src/stories/ThemeSystem.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `DocsInteractiveDemo` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `LightTheme` | **E**: Review | Story not referenced by explorer — review for duplication |
| `DarkTheme` | **E**: Review | Story not referenced by explorer — review for duplication |
| `NightTheme` | **E**: Review | Story not referenced by explorer — review for duplication |
| `DocsThemeComparison` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Molecules/InputNumber
`src/components/molecules/InputNumber/InputNumber.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `WithPrefix` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `WithSuffix` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsStates` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DisabledState` | **E**: Review | Story not referenced by explorer — review for duplication |
| `ErrorState` | **E**: Review | Story not referenced by explorer — review for duplication |

### Molecules/UploadItem
`src/components/molecules/UploadItem/UploadItem.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `TextUploading` | **E**: Review | Args-only story not in explorer — may duplicate explorer coverage |
| `TextError` | **E**: Review | Args-only story not in explorer — may duplicate explorer coverage |
| *6 canonical stories* | **A**: OK | — |

### Molecules/Chicklet
`src/components/molecules/Chicklet/Chicklet.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `Colored` | **E**: Review | Args-only story not in explorer — may duplicate explorer coverage |
| *7 canonical stories* | **A**: OK | — |

### Molecules/UploadThumbnail
`src/components/molecules/UploadThumbnail/UploadThumbnail.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `WithPreviewNoName` | **E**: Review | Args-only story not in explorer — may duplicate explorer coverage |
| *4 canonical stories* | **A**: OK | — |

### Organisms/FileCard
`src/stories/FileCard.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `PartiallyProcessed` | **E**: Review | Args-only story not in explorer — may duplicate explorer coverage |
| *6 canonical stories* | **A**: OK | — |

### Organisms/FileThumbnail
`src/stories/FileThumbnail.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `WithoutFileName` | **E**: Review | Args-only story not in explorer — may duplicate explorer coverage |
| *5 canonical stories* | **A**: OK | — |

### Components/Charts/RadialChart
`src/stories/RadialChart.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `CustomLabel` | **E**: Review | Args-only story not in explorer — may duplicate explorer coverage |
| *6 canonical stories* | **A**: OK | — |

### Atoms/ReadOnly
`src/stories/ReadOnly.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `HorizontalWithIcon` | **E**: Review | Args-only story not in explorer — may duplicate explorer coverage |
| *3 canonical stories* | **A**: OK | — |

### Atoms/Avatar
`src/components/atoms/Avatar/Avatar.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsWithFallback` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Atoms/Badge
`src/components/atoms/Badge/Badge.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Design System/Button
`src/components/atoms/Button/Button.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsWithTrailingIcon` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsIconOnly` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsTextOnly` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsShapeDefault` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsShapeRounded` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |

### Atoms/Checkbox
`src/components/atoms/Checkbox/Checkbox.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `WithHelper` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `WithError` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `Indeterminate` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Atoms/Divider
`src/components/atoms/Divider/Divider.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Components/Icon
`src/components/atoms/Icons/Icon.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `DocsIconAlignment` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsAllIcons` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| *1 canonical stories* | **A**: OK | — |

### Atoms/Illustration
`src/components/atoms/Illustration/Illustration.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsOverview` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Atoms/Input/Custom Icons
`src/components/atoms/Input/InputCustomIcons.stories.tsx` | Explorer: No

| Story | Bucket | Action |
|-------|--------|--------|
| `DocsCustomLeadingIcon` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsCustomTrailingIcon` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsCustomIconSizing` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsCustomIconStyling` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsMixedIcons` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Atoms/Logo
`src/components/atoms/Logos/Logo.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `FT` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `TataMotors` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `CustomSize` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `TataMotorsLarge` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `FTWhite` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `MDCLabs` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `ShakthiLogistics` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `Gati` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `BirlaPivot` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `Diageo` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DiageoWhite` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `JSWOne` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `Shadowfax` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsAllLogos` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Atoms/RadioGroup
`src/components/atoms/RadioGroup/RadioGroup.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsHorizontal` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Atoms/Select
`src/components/atoms/Select/Select.stories.tsx` | Explorer: No

| Story | Bucket | Action |
|-------|--------|--------|
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsWithScroll` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Atoms/Skeleton
`src/components/atoms/Skeleton/Skeleton.stories.tsx` | Explorer: No

| Story | Bucket | Action |
|-------|--------|--------|
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Atoms/Spacer
`src/components/atoms/Spacer/Spacer.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `DocsAllSizes` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| *2 canonical stories* | **A**: OK | — |

### Atoms/Spin
`src/components/atoms/Spin/Spin.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsSizes` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Atoms/Statistic
`src/components/atoms/Statistic/Statistic.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Atoms/SubText
`src/components/atoms/SubText/SubText.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `WithIcon` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsAllVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Atoms/Switch
`src/components/atoms/Switch/Switch.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Atoms/Text
`src/components/atoms/Text/Text.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsSmall` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Atoms/Textarea
`src/components/atoms/Textarea/Textarea.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsStates` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Atoms/Toggle
`src/components/atoms/Toggle/Toggle.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Atoms/Typography
`src/components/atoms/Typography/Typography.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Molecules/Alert
`src/components/molecules/Alert/Alert.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `WithAction` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `Closable` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsComplete` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Molecules/Anchor
`src/components/molecules/Anchor/Anchor.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Molecules/ButtonGroup
`src/components/molecules/ButtonGroup/ButtonGroup.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsEqualWidth` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Molecules/Calendar
`src/components/molecules/Calendar/Calendar.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `Controlled` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `YearMode` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DecadeMode` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `Fullscreen` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DisabledDates` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `ValidRange` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `CustomHeader` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `EventCalendar` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsMonthSelectionWithSummary` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Molecules/Carousel
`src/components/molecules/Carousel/Carousel.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `Autoplay` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `FadeEffect` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `WithoutArrows` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsDotPositions` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Molecules/Cascader
`src/components/molecules/Cascader/Cascader.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Molecules/ColorPicker
`src/components/molecules/ColorPicker/ColorPicker.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Molecules/DatePicker
`src/components/molecules/DatePicker/DatePicker.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Molecules/Descriptions
`src/components/molecules/Descriptions/Descriptions.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `WithBadge` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Molecules/Dropdown
`src/components/molecules/Dropdown/Dropdown.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsWithLabel` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Molecules/DropdownMenu
`src/components/molecules/DropdownMenu/DropdownMenu.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `WithSearch` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsWithLabels` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Molecules/Empty
`src/components/molecules/Empty/Empty.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsWithDescription` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Molecules/HoverCard
`src/components/molecules/HoverCard/HoverCard.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Molecules/Image
`src/components/molecules/Image/Image.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `WithPreview` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `PreviewWithDifferentSource` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `WithFallback` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `ErrorState` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsCustomPlaceholder` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Molecules/List
`src/components/molecules/List/List.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsWithIcons` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsWithActions` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsStates` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Molecules/Notification
`src/components/molecules/Notification/Notification.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Molecules/Pagination
`src/components/molecules/Pagination/Pagination.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsWithSizeChanger` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsWithQuickJumper` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsStates` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Molecules/Popconfirm
`src/components/molecules/Popconfirm/Popconfirm.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsWithIcon` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Molecules/Progress
`src/components/molecules/ProgressBar/ProgressBar.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `LineProgress` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsPrimaryVariant` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Molecules/Rate
`src/components/molecules/Rate/Rate.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `WithHalfStars` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `WithTooltips` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `CustomCharacter` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `Disabled` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Molecules/SegmentedTabs
`src/components/molecules/SegmentedTabs/SegmentedTabs.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsWithIcons` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Molecules/Slider
`src/components/molecules/Slider/Slider.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `Range` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsWithLabels` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsStates` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Molecules/Steps
`src/components/molecules/Steps/Steps.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsVertical` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Molecules/TimePicker
`src/components/molecules/TimePicker/TimePicker.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `Controlled` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `TwelveHourFormat` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `WithoutSeconds` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `TwelveHourWithoutSeconds` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsSizes` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Molecules/Timeline
`src/components/molecules/Timeline/Timeline.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsAlternate` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Molecules/Tooltip
`src/components/molecules/Tooltip/Tooltip.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `WithTitle` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `WithArrow` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Molecules/Transfer
`src/components/molecules/Transfer/Transfer.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Molecules/Tree
`src/components/molecules/Tree/Tree.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsStates` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsWithIcons` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Molecules/TreeSelect
`src/components/molecules/TreeSelect/TreeSelect.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsStates` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsMultiCheck` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Organisms/Card
`src/components/organisms/Card/Card.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Basic` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `Advanced` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `NoFooter` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `NoEyebrow` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsComposable` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Organisms/Collapsible
`src/components/organisms/Collapsible/Collapsible.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Organisms/Drawer
`src/components/organisms/Drawer/Drawer.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Organisms/GridDrawer
`src/components/organisms/Drawer/GridDrawer.stories.tsx` | Explorer: No

| Story | Bucket | Action |
|-------|--------|--------|
| `DocsAllSizes` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| *6 canonical stories* | **A**: OK | — |

### Organisms/Footer
`src/components/organisms/Footer/Footer.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Organisms/Form
`src/components/organisms/Form/Form.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Organisms/Grid
`src/components/organisms/Grid/Grid.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `DocsBasicGrid` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Design System/Organisms/PageHeader
`src/components/organisms/PageHeader/PageHeader.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsWithTabs` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Organisms/Result
`src/components/organisms/Result/Result.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Organisms/Table/Composable API
`src/components/organisms/Table/TableComposable.stories.tsx` | Explorer: No

| Story | Bucket | Action |
|-------|--------|--------|
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsStates` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| *3 canonical stories* | **A**: OK | — |

### Organisms/Tabs
`src/components/organisms/Tabs/Tabs.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Organisms/Upload
`src/components/organisms/Upload/Upload.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `ButtonUpload` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `WithCustomTrigger` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsWithCustomList` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Organisms/AppHeader
`src/stories/AppHeader.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `WithFTCompany` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `OperationsManager` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Components/Card
`src/stories/Card.stories.tsx` | Explorer: No

| Story | Bucket | Action |
|-------|--------|--------|
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Design System/Colors/Color System
`src/stories/ColorSystem.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `DocsLightMode` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Stories/DataEntryTable
`src/stories/DataEntryTable.stories.tsx` | Explorer: No

| Story | Bucket | Action |
|-------|--------|--------|
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Components/FileTypeIcon
`src/stories/FileTypeIcon.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsAllFileTypes` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### UI/Icon
`src/stories/Icon.stories.tsx` | Explorer: No

| Story | Bucket | Action |
|-------|--------|--------|
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsSizes` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Atoms/Label
`src/stories/Label.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsWithSuffixIcon` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsInteractiveDemo` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Organisms/NavigationPopover
`src/stories/NavigationPopover.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `DocsOverview` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Stories/ProgressList
`src/stories/ProgressList.stories.tsx` | Explorer: No

| Story | Bucket | Action |
|-------|--------|--------|
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `WithTime` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `FourSteps` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Stories/RadioSelector
`src/stories/RadioSelector.stories.tsx` | Explorer: No

| Story | Bucket | Action |
|-------|--------|--------|
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `WithSelection` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `ThreeOptions` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `PlanSelector` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Stories/SegmentedTabs
`src/stories/SegmentedTabs.stories.tsx` | Explorer: No

| Story | Bucket | Action |
|-------|--------|--------|
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `TwoTabs` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `FourTabs` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### UI Components/Table
`src/stories/Table.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `ExplorerBase` | **F**: Hide | ExplorerBase (internal, hide from list) |
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `WithSorting` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsWithFooter` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Organisms/Table/Atomic Components
`src/stories/TableAtomic.stories.tsx` | Explorer: No

| Story | Bucket | Action |
|-------|--------|--------|
| `DocsTableCellVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Stories/Upload
`src/stories/Upload.stories.tsx` | Explorer: No

| Story | Bucket | Action |
|-------|--------|--------|
| `DragAndDrop` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `ButtonUpload` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `ThumbnailUpload` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `WithCallbacks` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `SingleFile` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsVariants` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Patterns/Upload Flow
`src/stories/UploadFlow.stories.tsx` | Explorer: No

| Story | Bucket | Action |
|-------|--------|--------|
| `UploadZoneDemo` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsFileTypeIcons` | **C**: OK | Already Docs-prefixed or docsOnly marked |

### Components/UploadZone
`src/stories/UploadZone.stories.tsx` | Explorer: Yes

| Story | Bucket | Action |
|-------|--------|--------|
| `Default` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `MultipleFiles` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `Disabled` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DifferentFileTypes` | **C**: OK | Already Docs-prefixed or docsOnly marked |
| `DocsInteractiveDemo` | **C**: OK | Already Docs-prefixed or docsOnly marked |

## Quick-Action: Rename to Docs* (Bucket B)

These stories need `Docs` prefix added:

None found.

## Review: Duplicate Candidates (Bucket E)

| Component | Story | Reason | File |
|-----------|-------|--------|------|
| Chicklet | `Colored` | Args-only story not in explorer — may duplicate explorer coverage | `src/components/molecules/Chicklet/Chicklet.stories.tsx` |
| InputNumber | `DisabledState` | Story not referenced by explorer — review for duplication | `src/components/molecules/InputNumber/InputNumber.stories.tsx` |
| InputNumber | `ErrorState` | Story not referenced by explorer — review for duplication | `src/components/molecules/InputNumber/InputNumber.stories.tsx` |
| Loader | `Static` | Story not referenced by explorer — review for duplication | `src/components/molecules/Loader/Loader.stories.tsx` |
| Loader | `WithoutLogo` | Story not referenced by explorer — review for duplication | `src/components/molecules/Loader/Loader.stories.tsx` |
| Loader | `NoProgressBar` | Story not referenced by explorer — review for duplication | `src/components/molecules/Loader/Loader.stories.tsx` |
| Loader | `CustomProgressBar` | Story not referenced by explorer — review for duplication | `src/components/molecules/Loader/Loader.stories.tsx` |
| Loader | `CustomLogo` | Story not referenced by explorer — review for duplication | `src/components/molecules/Loader/Loader.stories.tsx` |
| Loader | `SmallLogo` | Story not referenced by explorer — review for duplication | `src/components/molecules/Loader/Loader.stories.tsx` |
| Loader | `FullWidth` | Story not referenced by explorer — review for duplication | `src/components/molecules/Loader/Loader.stories.tsx` |
| ProgressList | `WithTime` | Story not referenced by explorer — review for duplication | `src/components/molecules/ProgressList/ProgressList.stories.tsx` |
| ProgressList | `WithIcons` | Story not referenced by explorer — review for duplication | `src/components/molecules/ProgressList/ProgressList.stories.tsx` |
| ProgressList | `WithBadges` | Story not referenced by explorer — review for duplication | `src/components/molecules/ProgressList/ProgressList.stories.tsx` |
| ProgressList | `WithDivider` | Story not referenced by explorer — review for duplication | `src/components/molecules/ProgressList/ProgressList.stories.tsx` |
| ProgressList | `Collapsible` | Story not referenced by explorer — review for duplication | `src/components/molecules/ProgressList/ProgressList.stories.tsx` |
| RadioSelector | `WithIcons` | Story not referenced by explorer — review for duplication | `src/components/molecules/RadioSelector/RadioSelector.stories.tsx` |
| RadioSelector | `WithoutRadio` | Story not referenced by explorer — review for duplication | `src/components/molecules/RadioSelector/RadioSelector.stories.tsx` |
| RadioSelector | `WithDisabled` | Story not referenced by explorer — review for duplication | `src/components/molecules/RadioSelector/RadioSelector.stories.tsx` |
| RadioSelector | `Controlled` | Story not referenced by explorer — review for duplication | `src/components/molecules/RadioSelector/RadioSelector.stories.tsx` |
| UploadItem | `TextUploading` | Args-only story not in explorer — may duplicate explorer coverage | `src/components/molecules/UploadItem/UploadItem.stories.tsx` |
| UploadItem | `TextError` | Args-only story not in explorer — may duplicate explorer coverage | `src/components/molecules/UploadItem/UploadItem.stories.tsx` |
| UploadThumbnail | `WithPreviewNoName` | Args-only story not in explorer — may duplicate explorer coverage | `src/components/molecules/UploadThumbnail/UploadThumbnail.stories.tsx` |
| Modal | `Small` | Story not referenced by explorer — review for duplication | `src/components/organisms/Modal/Modal.stories.tsx` |
| Modal | `Medium` | Story not referenced by explorer — review for duplication | `src/components/organisms/Modal/Modal.stories.tsx` |
| Modal | `Large` | Story not referenced by explorer — review for duplication | `src/components/organisms/Modal/Modal.stories.tsx` |
| Modal | `ExtraLarge` | Story not referenced by explorer — review for duplication | `src/components/organisms/Modal/Modal.stories.tsx` |
| Modal | `Full` | Story not referenced by explorer — review for duplication | `src/components/organisms/Modal/Modal.stories.tsx` |
| Modal | `BasicModal` | Story not referenced by explorer — review for duplication | `src/components/organisms/Modal/Modal.stories.tsx` |
| Modal | `WithFooter` | Story not referenced by explorer — review for duplication | `src/components/organisms/Modal/Modal.stories.tsx` |
| QuickFilters | `MultiOptionFilters` | Story not referenced by explorer — review for duplication | `src/components/organisms/QuickFilters/QuickFilters.stories.tsx` |
| QuickFilters | `SelectedState` | Story not referenced by explorer — review for duplication | `src/components/organisms/QuickFilters/QuickFilters.stories.tsx` |
| QuickFilters | `MixedSelection` | Story not referenced by explorer — review for duplication | `src/components/organisms/QuickFilters/QuickFilters.stories.tsx` |
| AreaChart | `Interactive` | Args-only story not in explorer — may duplicate explorer coverage | `src/stories/AreaChart.stories.tsx` |
| AreaChart | `WithLegend` | Args-only story not in explorer — may duplicate explorer coverage | `src/stories/AreaChart.stories.tsx` |
| AreaChart | `StackedExpanded` | Args-only story not in explorer — may duplicate explorer coverage | `src/stories/AreaChart.stories.tsx` |
| FileCard | `PartiallyProcessed` | Args-only story not in explorer — may duplicate explorer coverage | `src/stories/FileCard.stories.tsx` |
| FileThumbnail | `WithoutFileName` | Args-only story not in explorer — may duplicate explorer coverage | `src/stories/FileThumbnail.stories.tsx` |
| Input | `WithError` | Story not referenced by explorer — review for duplication | `src/stories/Input.stories.tsx` |
| Input | `WithIcons` | Story not referenced by explorer — review for duplication | `src/stories/Input.stories.tsx` |
| Input | `WithSuccess` | Story not referenced by explorer — review for duplication | `src/stories/Input.stories.tsx` |
| Input | `WithWarning` | Story not referenced by explorer — review for duplication | `src/stories/Input.stories.tsx` |
| Input | `Filled` | Story not referenced by explorer — review for duplication | `src/stories/Input.stories.tsx` |
| Input | `Outlined` | Story not referenced by explorer — review for duplication | `src/stories/Input.stories.tsx` |
| Input | `Disabled` | Story not referenced by explorer — review for duplication | `src/stories/Input.stories.tsx` |
| LineChart | `Interactive` | Args-only story not in explorer — may duplicate explorer coverage | `src/stories/LineChart.stories.tsx` |
| LineChart | `CustomDots` | Args-only story not in explorer — may duplicate explorer coverage | `src/stories/LineChart.stories.tsx` |
| LineChart | `CustomDotColors` | Args-only story not in explorer — may duplicate explorer coverage | `src/stories/LineChart.stories.tsx` |
| LineChart | `CustomLabel` | Args-only story not in explorer — may duplicate explorer coverage | `src/stories/LineChart.stories.tsx` |
| LineChart | `CustomDefaultColors` | Args-only story not in explorer — may duplicate explorer coverage | `src/stories/LineChart.stories.tsx` |
| PieChart | `SeparatorNone` | Args-only story not in explorer — may duplicate explorer coverage | `src/stories/PieChart.stories.tsx` |
| PieChart | `CustomLabel` | Args-only story not in explorer — may duplicate explorer coverage | `src/stories/PieChart.stories.tsx` |
| PieChart | `LabelList` | Args-only story not in explorer — may duplicate explorer coverage | `src/stories/PieChart.stories.tsx` |
| PieChart | `DonutActive` | Args-only story not in explorer — may duplicate explorer coverage | `src/stories/PieChart.stories.tsx` |
| PieChart | `Interactive` | Args-only story not in explorer — may duplicate explorer coverage | `src/stories/PieChart.stories.tsx` |
| RadarChart | `CustomLabel` | Args-only story not in explorer — may duplicate explorer coverage | `src/stories/RadarChart.stories.tsx` |
| RadarChart | `GridCustom` | Args-only story not in explorer — may duplicate explorer coverage | `src/stories/RadarChart.stories.tsx` |
| RadarChart | `GridNone` | Args-only story not in explorer — may duplicate explorer coverage | `src/stories/RadarChart.stories.tsx` |
| RadarChart | `GridCircleNoLines` | Args-only story not in explorer — may duplicate explorer coverage | `src/stories/RadarChart.stories.tsx` |
| RadialChart | `CustomLabel` | Args-only story not in explorer — may duplicate explorer coverage | `src/stories/RadialChart.stories.tsx` |
| ReadOnly | `HorizontalWithIcon` | Args-only story not in explorer — may duplicate explorer coverage | `src/stories/ReadOnly.stories.tsx` |
| Multi-Theme Demo | `LightTheme` | Story not referenced by explorer — review for duplication | `src/stories/ThemeSystem.stories.tsx` |
| Multi-Theme Demo | `DarkTheme` | Story not referenced by explorer — review for duplication | `src/stories/ThemeSystem.stories.tsx` |
| Multi-Theme Demo | `NightTheme` | Story not referenced by explorer — review for duplication | `src/stories/ThemeSystem.stories.tsx` |

## Internal: Hide from List View (Bucket F)

64 ExplorerBase exports found across components.
These should be filtered from the list view in examples-section.tsx.
