# Explorer Component Variant Matrix

Source of truth: generated from current story files (`parameters.explorer` rows/scenarios).

Correctness check meaning:
- `Configured`: has `explorer` + `defaultRowId` + `defaultScenarioId`
- `Partial config`: has `explorer` but missing required default IDs
- `Not configured`: no `explorer` block

Summary: 105 component rows, 97 configured, 3 partial, 5 not configured.
Deduping: reduced 107 story files to 105 component rows using priority (configured > partial > not configured, `src/components` > `src/stories`).
Duplicate component-name groups collapsed: 2.

| Component | Type Variants | Style Variants | State Variants | Size Variants | Shape Variants | Content Variants | Other Axes | Correctness Check | Notes | Story File |
|---|---|---|---|---|---|---|---|---|---|---|
| Affix | Basic, Bottom | — | — | — | — | — | — | Configured | no ExplorerBase export | src/components/molecules/Affix/Affix.stories.tsx |
| Alert | Default (Info), Success, Warning, Danger | — | Dismissible, Actionable | — | — | — | Behavior: Action, Closable, Complete | Configured | — | src/components/molecules/Alert/Alert.stories.tsx |
| Anchor | Vertical, Horizontal | — | Default | — | — | — | — | Configured | — | src/components/molecules/Anchor/Anchor.stories.tsx |
| AppHeader | — | — | Theme On, Theme Off, Glass On, Glass Off, Expanded, Collapsed | — | — | — | Branding: Tata Motors, FreightTiger | Configured | no ExplorerBase export | src/stories/AppHeader.stories.tsx |
| AreaChart | Basic, Linear, Step, Stacked, Gradient, WithAxes | — | — | — | — | — | — | Configured | no ExplorerBase export | src/stories/AreaChart.stories.tsx |
| Avatar | Default, Fallback, Group | — | — | XXS, XS, SM, MD, LG, XL, XXL | — | — | — | Configured | — | src/components/atoms/Avatar/Avatar.stories.tsx |
| BackTop | Basic, CustomContent | — | — | — | — | — | — | Configured | no ExplorerBase export | src/components/molecules/BackTop/BackTop.stories.tsx |
| Badge | — | Default, Success, Error, Warning, Info, Neutral, Danger | — | XS, SM, MD, LG | — | Default, With Icon, Text Only | — | Configured | — | src/components/atoms/Badge/Badge.stories.tsx |
| Breadcrumb | Default, Icons, Custom Separator | — | — | — | — | — | — | Configured | no ExplorerBase export | src/components/molecules/Breadcrumb/Breadcrumb.stories.tsx |
| Button | — | Primary, Outline, Danger, Text, Link | Default, Disabled, Loading | XXS, XS, SM, MD, LG, XL, XXL | Default, Rounded | Leading Icon, Trailing Icon, Icon Only, Label Only | — | Configured | — | src/components/atoms/Button/Button.stories.tsx |
| ButtonGroup | Default, Equal Width, With Icons, Wrapped | — | Default | — | — | — | — | Configured | — | src/components/molecules/ButtonGroup/ButtonGroup.stories.tsx |
| Calendar | Default, YearMode, Fullscreen, EventCalendar | — | Default, DisabledDates, ValidRange, Controlled | — | — | — | — | Configured | no ExplorerBase export; deduped; dropped: src/components/molecules/DatePicker/DatePickerCalendar.stories.tsx | src/components/molecules/Calendar/Calendar.stories.tsx |
| Card | Basic, Advanced, Composable | Default, Elevated, Outlined | — | — | — | Footer, No Footer, No Eyebrow | — | Configured | — | src/components/organisms/Card/Card.stories.tsx |
| Carousel | Default, Autoplay, Fade Effect, Image Gallery | — | — | — | — | — | Behavior: Default, Without Arrows, Dot Positions, Custom Dots | Configured | — | src/components/molecules/Carousel/Carousel.stories.tsx |
| Cascader | — | — | Default, Disabled | XXS, XS, SM, MD, LG, XL, XXL | — | — | — | Configured | — | src/components/molecules/Cascader/Cascader.stories.tsx |
| Checkbox | — | — | Unchecked, Checked, Error, Disabled | SM, MD | — | Default, Accept terms and conditions, Helper Text, Newsletter subscription, Indeterminate, Select all items | — | Configured | — | src/components/atoms/Checkbox/Checkbox.stories.tsx |
| Chicklet | — | Default, Rounded, Bordered, Rounded Bordered | Default, Closable, Disabled, Closable Disabled | — | — | — | — | Configured | no ExplorerBase export | src/components/molecules/Chicklet/Chicklet.stories.tsx |
| Chip | — | — | Unselected, Selected, Disabled | Small, Medium, Large | — | — | Variant: Outlined, Filled | Partial config | — | src/components/atoms/Chip/Chip.stories.tsx |
| Collapsible | Primary, Secondary, Tertiary | — | Collapsed, Expanded, Extra, Controlled | — | — | — | — | Configured | — | src/components/organisms/Collapsible/Collapsible.stories.tsx |
| Color System | — | — | — | — | — | — | Theme: Light Mode, Dark Mode, Night Mode | Configured | — | src/stories/ColorSystem.stories.tsx |
| ColorPicker | Default, With Presets | — | Default, Disabled | — | — | — | — | Configured | — | src/components/molecules/ColorPicker/ColorPicker.stories.tsx |
| Composable API | — | — | — | — | — | — | — | Partial config | no ExplorerBase export; deduped; dropped: src/components/molecules/Select/SelectComposable.stories.tsx | src/components/organisms/Table/TableComposable.stories.tsx |
| Custom Icons | — | — | — | — | — | — | — | Not configured | — | src/components/atoms/Input/InputCustomIcons.stories.tsx |
| DataEntryTable | Default, WithSelection, WithActions, WithMultipleCellTypes | — | — | — | — | — | — | Configured | no ExplorerBase export | src/components/organisms/DataEntryTable/DataEntryTable.stories.tsx |
| DatePicker | Default, Range, Custom Quick Select, Last 7 days, Last 30 days | — | Default, With Value, Error, Disabled | XXS, XS, SM, MD, LG, XL, XXL | — | — | — | Configured | no ExplorerBase export | src/components/molecules/DatePicker/DatePicker.stories.tsx |
| Descriptions | Default, With Badge, Vertical | — | Default | — | — | — | — | Configured | — | src/components/molecules/Descriptions/Descriptions.stories.tsx |
| Divider | Default, Dashed, Vertical, With Label | Primary, Secondary, Tertiary | — | — | — | — | — | Configured | — | src/components/atoms/Divider/Divider.stories.tsx |
| Drawer | — | — | — | — | — | Basic, Form | Placement: Right (Default), Left, Top, Bottom | Configured | — | src/components/organisms/Drawer/Drawer.stories.tsx |
| Dropdown | Default, Searchable, Grouped, With Label | — | Default, Error, Disabled | — | — | — | — | Configured | — | src/components/molecules/Dropdown/Dropdown.stories.tsx |
| DropdownMenu | Default, With Search, With Labels | — | Default | — | — | — | — | Configured | — | src/components/molecules/DropdownMenu/DropdownMenu.stories.tsx |
| Empty | Default, Simple, No Data, Error | — | — | — | — | Default, With Description, With Actions | — | Configured | — | src/components/molecules/Empty/Empty.stories.tsx |
| FileCard | Default, CSV | — | Default, Uploading, Validating, Processed, Failed | — | — | — | — | Configured | no ExplorerBase export | src/stories/FileCard.stories.tsx |
| FileThumbnail | Default, With Image, PDF File, Excel File, Image Preview | — | — | — | — | — | — | Configured | no ExplorerBase export | src/stories/FileThumbnail.stories.tsx |
| FileTypeIcon | Default, XLSX, PDF, DOC, DOCX, PNG, JPEG, JPG, CSV, Error Variant | — | — | XXS, XS, SM, MD, LG, XL, XXL | — | — | — | Configured | — | src/stories/FileTypeIcon.stories.tsx |
| FileValidationCard | Default, Success, Failed, Partial, CSV | — | — | — | — | — | — | Configured | no ExplorerBase export | src/stories/FileValidationCard.stories.tsx |
| FloatButton | Basic, WithType, Group | — | — | — | — | — | — | Configured | no ExplorerBase export | src/components/molecules/FloatButton/FloatButton.stories.tsx |
| Footer | Default, Two Buttons, Three Buttons, Four Buttons, With Left Side, Custom Buttons | — | — | — | — | — | — | Configured | — | src/components/organisms/Footer/Footer.stories.tsx |
| Form | — | — | Default, With Validation | — | — | — | Layout: Vertical, Horizontal | Configured | — | src/components/organisms/Form/Form.stories.tsx |
| FormulaTokenDisplay | — | — | — | — | — | — | — | Not configured | — | src/stories/FormulaBuilderSubComponents.stories.tsx |
| Grid | Basic Grid, Gutter, Offset, Flex Layout | — | — | — | — | — | Layout: Vertical Align, Justify | Configured | — | src/components/organisms/Grid/Grid.stories.tsx |
| GridDrawer | — | — | — | — | — | — | — | Not configured | — | src/components/organisms/Drawer/GridDrawer.stories.tsx |
| HoverCard | — | — | Default, Disabled Trigger | — | — | User Card | Behavior: Top, Bottom, Left, Right | Configured | — | src/components/molecules/HoverCard/HoverCard.stories.tsx |
| Icon | Default, Navigation, Action, Status | Colors, Brand | — | 12, 16, 24, 32, 48 | — | — | — | Configured | — | src/components/atoms/Icons/Icon.stories.tsx |
| Illustration | Overview, Insights, Workspace, Reports | — | — | SM, MD, LG, XL | — | Single Preview | — | Configured | — | src/components/atoms/Illustration/Illustration.stories.tsx |
| Image | Default, With Preview, With Fallback | — | Default, Error State | — | — | — | — | Configured | no ExplorerBase export | src/components/molecules/Image/Image.stories.tsx |
| Input | — | Default, Filled, Outlined | Default, Error, Warning, Success, Disabled | — | — | Basic, With Icons | — | Configured | — | src/stories/Input.stories.tsx |
| InputNumber | Default, With Prefix, With Suffix | — | Default, Disabled, Error | — | — | — | — | Configured | — | src/components/molecules/InputNumber/InputNumber.stories.tsx |
| Label | Default, Mandatory, Optional | — | — | — | — | Basic, With Icon, Form Example | — | Configured | — | src/stories/Label.stories.tsx |
| LineChart | Basic, Multiple, Linear, Step, WithDots, WithLabels | — | — | — | — | — | — | Configured | no ExplorerBase export | src/stories/LineChart.stories.tsx |
| List | Default, With Icons, With Actions | — | Default | — | — | — | — | Configured | — | src/components/molecules/List/List.stories.tsx |
| Loader | Default, Static, Without Logo, Small Logo, Full Width | — | — | — | — | Default, No Progress Bar, Custom Progress Bar | — | Configured | — | src/components/molecules/Loader/Loader.stories.tsx |
| Logo | — | — | — | Default, Custom Size, Large | — | — | Brand: Default (FT), FT White, Tata Motors, Courier: Gati, Delhivery, DHL, KGC, Avikam, Safexpress, Bluedart, TVS, Criticalog, MEC, OM Logistics, Apollo Tyres | Configured | no ExplorerBase export | src/components/atoms/Logos/Logo.stories.tsx |
| Mentions | Default (@), Custom Prefix (#), Rich Content | — | — | — | — | — | — | Configured | no ExplorerBase export | src/components/molecules/Mentions/Mentions.stories.tsx |
| Modal | Basic, Footer | — | — | Small, Medium, Large, Extra Large, Full | — | — | — | Configured | — | src/components/organisms/Modal/Modal.stories.tsx |
| Multi-Theme Demo | — | — | — | — | — | — | Theme Mode: Interactive Demo, Light, Dark, Night, Origin UI, Comparison: Side-by-Side | Configured | — | src/stories/ThemeSystem.stories.tsx |
| NavigationLauncher | DefaultLauncher, CustomTrigger, AppHeaderIntegration | — | — | — | — | — | — | Configured | no ExplorerBase export | src/stories/NavigationLauncher.stories.tsx |
| NavigationPopover | Insights, Workspace, Reports, SubMenuVariant, ServiceHealth | — | MetricsWithoutHero, HeroTopPlacement | — | — | — | — | Configured | — | src/stories/NavigationPopover.stories.tsx |
| Notification | Success, Info, Warning, Danger | — | — | — | — | Interactive Demo | Behavior: Closable, With Icon, Auto Dismiss | Configured | — | src/components/molecules/Notification/Notification.stories.tsx |
| PageHeader | Default, Minimal | — | Default, Tabs Interactive, With Actions | — | — | Basic, With Tabs, Segmented Tabs, With Filters | — | Configured | — | src/components/organisms/PageHeader/PageHeader.stories.tsx |
| Pagination | Default, Size Changer, Quick Jumper | Default, Compact | — | — | — | — | — | Configured | — | src/components/molecules/Pagination/Pagination.stories.tsx |
| PieChart | Basic, WithLabels, Donut, DonutWithText, Stacked, WithLegend | — | — | — | — | — | — | Configured | no ExplorerBase export | src/stories/PieChart.stories.tsx |
| Popconfirm | Default, Icon | — | Danger, Warning, Disabled | — | — | — | Placement: Top, Bottom, Left, Right | Configured | — | src/components/molecules/Popconfirm/Popconfirm.stories.tsx |
| Progress | Default, Line, Circle, Dashboard, Steps | Primary, Success, Warning, Danger, Active | Not Started, In Progress, Completed | — | — | — | — | Configured | — | src/components/molecules/ProgressBar/ProgressBar.stories.tsx |
| ProgressList | Default, Time, Icons, Badges | Normal, Success, Warning, Danger | Default, Collapsible | — | — | — | — | Configured | — | src/components/molecules/ProgressList/ProgressList.stories.tsx |
| QuickFilters | Single Filters, Multi-option | — | Default, Selected, Mixed Selection | — | — | — | — | Configured | — | src/components/organisms/QuickFilters/QuickFilters.stories.tsx |
| RadarChart | Basic, Glow, WithDots, LinesOnly, Multiple, WithLegend | — | — | — | — | — | Grid: Basic, GridCircle, GridFilled | Configured | no ExplorerBase export | src/stories/RadarChart.stories.tsx |
| RadialChart | Basic, WithLabel, WithGrid, WithText, DifferentShape, Stacked | — | — | — | — | — | — | Configured | no ExplorerBase export | src/stories/RadialChart.stories.tsx |
| RadioGroup | — | — | Default, Error | SM, MD | — | — | Layout: Vertical, Horizontal | Configured | — | src/components/atoms/RadioGroup/RadioGroup.stories.tsx |
| RadioSelector | Default, With Icons, Without Radio | — | Default, Disabled, Controlled | — | — | — | — | Configured | — | src/components/molecules/RadioSelector/RadioSelector.stories.tsx |
| Rate | Default, Half Stars, With Tooltips | — | Default, Disabled | — | — | — | — | Configured | — | src/components/molecules/Rate/Rate.stories.tsx |
| ReadOnly | Vertical, Horizontal | — | — | — | — | Basic, With Icon | — | Configured | no ExplorerBase export | src/stories/ReadOnly.stories.tsx |
| Result | Success, Error, Info, Warning, 404, 403, 500 | — | Default, With Actions, With Details, Custom Icon | — | — | — | — | Configured | — | src/components/organisms/Result/Result.stories.tsx |
| SegmentedTabs | Default, Icons, Icon Only | — | Default, Controlled | — | — | — | — | Configured | — | src/components/molecules/SegmentedTabs/SegmentedTabs.stories.tsx |
| Select | — | — | — | — | — | — | — | Not configured | — | src/components/atoms/Select/Select.stories.tsx |
| SimpleColumnLayout | Default | — | — | — | — | — | — | Configured | no ExplorerBase export | src/components/molecules/SimpleColumnLayout/SimpleColumnLayout.stories.tsx |
| Skeleton | — | — | — | — | — | — | — | Not configured | — | src/components/atoms/Skeleton/Skeleton.stories.tsx |
| Slider | Single, Range, Labels | — | Default | — | — | — | — | Configured | — | src/components/molecules/Slider/Slider.stories.tsx |
| Spacer | Default, Horizontal | — | — | — | — | — | — | Configured | no ExplorerBase export | src/components/atoms/Spacer/Spacer.stories.tsx |
| Spin | Default, WithTip, WithContent | — | Default, Delayed | — | — | — | — | Configured | — | src/components/atoms/Spin/Spin.stories.tsx |
| StackedBarChart | Default | — | — | — | — | — | — | Configured | no ExplorerBase export | src/components/molecules/StackedBarChart/StackedBarChart.stories.tsx |
| Statistic | Default, Label On Top | — | — | — | — | — | — | Configured | — | src/components/atoms/Statistic/Statistic.stories.tsx |
| Steps | Default, Vertical, Dot Style | — | Default | — | — | — | — | Configured | — | src/components/molecules/Steps/Steps.stories.tsx |
| SubText | Default, WithIcon | — | — | — | — | — | — | Configured | no ExplorerBase export | src/components/atoms/SubText/SubText.stories.tsx |
| Switch | — | — | Off, On, Disabled, Error | SM, MD | — | Default, Helper Text, Icon Only | — | Configured | — | src/components/atoms/Switch/Switch.stories.tsx |
| Table | Default, Sortable, With Footer | — | Default | — | — | — | — | Configured | — | src/stories/Table.stories.tsx |
| Tabs | — | Primary, Secondary, Tertiary | — | — | — | Default, Badges | — | Configured | — | src/components/organisms/Tabs/Tabs.stories.tsx |
| Text | — | — | — | SM, MD, LG, XL, XX | — | Default, Sub Text, Leading Icon, Trailing Icon | — | Configured | — | src/components/atoms/Text/Text.stories.tsx |
| Textarea | — | — | Default, Error, Disabled | XXS, XS, SM, MD, LG, XL, XXL | — | — | — | Configured | — | src/components/atoms/Textarea/Textarea.stories.tsx |
| Timeline | Default, Alternate, Custom Content | — | Default | — | — | — | — | Configured | — | src/components/molecules/Timeline/Timeline.stories.tsx |
| TimePicker | — | — | Default, Error, Warning, Success, Disabled | XXS, XS, SM, MD, LG, XL, XXL | — | — | Format: Default (24h), 12-Hour, Without Seconds, 12h No Seconds, Behavior: Controlled, Step Interval, Disabled Hours, Labels, Form | Configured | — | src/components/molecules/TimePicker/TimePicker.stories.tsx |
| Toggle | Default, With Icon, Icon Only, Outline | — | Default, Pressed, Disabled | — | — | — | — | Configured | — | src/components/atoms/Toggle/Toggle.stories.tsx |
| ToggleGroup | Single, Multiple, Outline | — | — | — | — | — | — | Configured | no ExplorerBase export | src/components/molecules/ToggleGroup/ToggleGroup.stories.tsx |
| Tooltip | — | Light, Dark | — | — | — | Basic, Title, Arrow, Composed | — | Configured | — | src/components/molecules/Tooltip/Tooltip.stories.tsx |
| Tour | Default | — | — | — | — | — | — | Configured | no ExplorerBase export | src/components/molecules/Tour/Tour.stories.tsx |
| Transfer | Default, One Way | — | Default | — | — | — | — | Configured | — | src/components/molecules/Transfer/Transfer.stories.tsx |
| Tree | Default, Icons, Checkboxes, Directory | — | Default, Selection | — | — | — | — | Configured | — | src/components/molecules/Tree/Tree.stories.tsx |
| TreeSelect | Single Select, Multi Check | — | Default, Error, Disabled | — | — | — | — | Configured | — | src/components/molecules/TreeSelect/TreeSelect.stories.tsx |
| Typography | — | Title Primary, Title Secondary, Display Primary, Button, Body Primary Semibold, Body Primary Medium, Body Primary Regular, Body Primary Italic, Body Secondary Semibold, Body Secondary Medium, Body Secondary Regular | — | — | — | — | Tone: Default, Secondary, Muted, Danger, Success, Warning | Configured | — | src/components/atoms/Typography/Typography.stories.tsx |
| Upload | Default, Button Upload, Thumbnail, Custom Trigger | — | Default, With Validation, Single File Only | — | — | — | — | Configured | — | src/components/organisms/Upload/Upload.stories.tsx |
| UploadButton | Default, Hover, Multiple Files | — | Default, Disabled | — | — | — | — | Configured | no ExplorerBase export | src/stories/UploadButton.stories.tsx |
| UploadItem | Default, Text Type | — | Default, Uploading, Uploaded, Saved, Error | — | — | — | — | Configured | no ExplorerBase export | src/components/molecules/UploadItem/UploadItem.stories.tsx |
| UploadThumbnail | Default, With Preview | — | Default, Disabled, Hover State | — | — | — | — | Configured | no ExplorerBase export | src/components/molecules/UploadThumbnail/UploadThumbnail.stories.tsx |
| UploadZone | Default, Multiple Files, Different File Types | — | Default, Disabled | — | — | — | — | Configured | no ExplorerBase export | src/stories/UploadZone.stories.tsx |
| UserProfile | — | — | — | — | — | — | — | Partial config | no ExplorerBase export | src/stories/UserProfile.stories.tsx |
| Watermark | Basic, Multi Line, Custom Style | — | — | — | — | — | — | Configured | no ExplorerBase export | src/components/molecules/Watermark/Watermark.stories.tsx |
