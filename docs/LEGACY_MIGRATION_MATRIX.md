# FT Design System - Legacy Migration Matrix

> Version baseline: `4.21.1`
> Source of truth: `docs/LEGACY_API_AUDIT.md`, `docs/COMPONENT_CLASSIFICATION.md`
> Goal: remove all declarative legacy APIs with controlled major-version rollout.

## Usage

Status values:
- `todo` - not started
- `in_progress` - migration active
- `blocked` - waiting for composable primitives/codemod
- `done` - migrated and legacy path removed

Risk values:
- `L` low
- `M` medium
- `H` high

## Atoms

| Component | Class | Legacy Props | Target Composable API | Migration Action | Codemod Feasibility | Risk | Status |
|---|---|---|---|---|---|---|---|
| Badge | normalize | `color`, `showZero`, `size` | `Badge`, `BadgeDot`, `BadgeCount`, `BadgeStatus`, `BadgeIcon`, `BadgeText` | Remove `'danger'`/`'normal'` from variant. Remove `'default'`/`'small'` from size. Remove `color` prop. Remove `(Badge as any).Ribbon`. | High | M | todo |
| Checkbox | migrate | `description`, `error`, `label` | `Checkbox`, `CheckboxInput`, `CheckboxLabel`, `CheckboxError`, `CheckboxHelper` | Replace declarative props with sub-components. Change `error` from `boolean` to `string`. | Medium | M | todo |
| RadioGroup | migrate | `error`, `helperText`, `options` | `RadioGroup`, `RadioItem`, `RadioGroupError`, `RadioGroupHelper` | Convert `options` arrays to children. Change `error` from `boolean` to `string`. Remove `onValueChange` alias. | Medium | M | todo |
| Slider | migrate | `marks` | `SliderTrack`, `SliderRange`, `SliderThumb`, `SliderLabel` | Replace mark config with composed labels/markers | Low | L | todo |
| Statistic | migrate | `label`, `value` | `Statistic`, `StatisticTitle`, `StatisticValue` | Map props to sub-components. Lowercase `labelPlacement` values (`'Below'` -> `'below'`). | High | L | todo |
| Switch | migrate | `error`, `helperText`, `label` | `Switch`, `SwitchInput`, `SwitchLabel`, `SwitchError`, `SwitchHelper` | Replace declarative props with composition. Change `error` from `boolean` to `string`. | Medium | M | todo |
| Textarea | migrate | `error`, `helperText`, `label`, `labelMandatory`, `labelOptional` | `Textarea`, `TextareaLabel`, `TextareaField`, `TextareaError`, `TextareaHelper` | Introduce/normalize composable usage; remove mandatory/optional label props | Medium | H | todo |

## Molecules

| Component | Class | Legacy Props | Target Composable API | Migration Action | Codemod Feasibility | Risk | Status |
|---|---|---|---|---|---|---|---|
| Anchor | migrate | `items`, `showInkInFixed` | `Anchor` + `AnchorLink` | Build sub-components first, then migrate `items` config | Low | M | blocked |
| Breadcrumb | migrate | `items`, `separator` | `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbSeparator` | Convert `items` array into composed children | Medium | M | todo |
| ButtonGroup | migrate | `buttons` | `ButtonGroup`, `ButtonGroupItem` | Convert button config array to children | High | M | blocked |
| Cascader | migrate | `options` | `Cascader` + `CascaderOption` | Promote children composition as default and remove config API | Medium | M | blocked |
| Chicklet | normalize | `closable`, `showClose` | `Chicklet` with explicit close composition | Replace flag props with explicit close action component | Low | M | blocked |
| ColorPicker | normalize | `showText` | `ColorPicker` composed content slots | Replace flag with explicit label/content composition | Low | L | blocked |
| DatePicker | normalize | `label`, `showTime` | DatePicker composable fields/label | Default size `'m'` -> `'md'`. Remove `'m'`/`'l'` aliases. `error` from `boolean` to `string`. Remove internal states from cva. | Medium | M | todo |
| Descriptions | migrate | `extra`, `items`, `title` | `DescriptionsTitle`, `DescriptionsExtra`, `DescriptionsItem` | Convert config + top-level props to explicit children | Medium | M | todo |
| Dropdown | migrate | `label`, `onSelect`, `options` | `DropdownTrigger`, `DropdownContent` | Replace `onSelect` with `onChange`; rename `state` prop, split to `disabled`/`error` | Medium | H | todo |
| DropdownMenu | migrate | `options` | `DropdownMenuList`, `DropdownMenuItem` | Convert option arrays to menu item children | High | M | todo |
| HoverCard | normalize | `content` | `HoverCardTrigger`, `HoverCardContent` | `content` prop -> explicit `HoverCardContent` composition | Medium | M | todo |
| InputNumber | normalize | `prefix`, `suffix` | `InputNumberPrefix`, `InputNumberSuffix` | Replace prop adornments with composable nodes | Medium | M | todo |
| List | migrate | `dataSource`, `footer`, `grid`, `header`, `renderItem` | `ListHeader`, `ListBody`, `ListItem`, `ListFooter` | Convert config-based rendering to explicit list composition | Low | H | todo |
| Mentions | migrate | `options` | `Mentions` + `MentionOption` | Add sub-component API first; then remove options prop | Low | M | blocked |
| Pagination | normalize | `showQuickJumper`, `showSizeChanger` | explicit composition | Replace flags with explicit rendered controls | Medium | M | todo |
| Popconfirm | migrate | `cancelText`, `description`, `icon`, `okText`, `okType`, `title` | `PopconfirmTrigger`, `PopconfirmContent` | Migrate to structured content/actions composition | Low | H | todo |
| ProgressBar | normalize | `showPercentage` | `ProgressBar` + `ProgressBarLabel` | Replace flag with explicit percentage renderer | Low | L | blocked |
| ProgressList | normalize | `items` | `ProgressListItem` | Convert items arrays to children | Medium | M | blocked |
| QuickFilters | migrate | `filters` | `QuickFilter`, `FilterOption` | Replace config array with explicit child composition. Fix null-rendering sub-components. | Medium | M | blocked |
| RadioSelector | normalize | `options` | `RadioSelectorOption` children | Convert options arrays to children | Medium | M | blocked |
| SegmentedTabs | normalize | `items` | `SegmentedTabItem` children | Convert items array to children | High | M | blocked |
| SimpleColumnLayout | replace | entire component deprecated | `Table layout="simple"` | Replace all imports/usages with table simple layout | High | M | blocked |
| StackedBarChart | migrate | `data` | `StackedBarChartBar`, `StackedBarChartSegment` | Convert data arrays to bar/segment composition | Medium | M | blocked |
| Steps | migrate | `steps` | `StepItem` children | Convert steps arrays to explicit children | High | L | todo |
| Timeline | normalize | `color`, `dot`, `label` | `TimelineItem` composition | Move item visual config into child components | Medium | M | todo |
| Tooltip | migrate | `heading`, `primaryActionText`, `secondaryActionText` | `TooltipTitle`, `TooltipDescription` | Convert text props to composed content. Rename `color` to `variant`. | Medium | M | todo |
| Tour | migrate | `steps` | `TourStep` children | Convert steps arrays to children; build sub-component | Medium | M | blocked |
| Transfer | migrate | `dataSource`, `showSearch` | `TransferItem` children | Add child composition; migrate config usage | Low | H | blocked |
| Tree | migrate | `showLine`, `treeData` | `TreeNode` children | Convert treeData to node composition | Low | M | todo |
| TreeSelect | migrate | `treeData` | TreeSelect with child nodes | Build composable API first; then migrate | Low | M | blocked |

## Organisms

| Component | Class | Legacy Props | Target Composable API | Migration Action | Codemod Feasibility | Risk | Status |
|---|---|---|---|---|---|---|---|
| Alert | normalize | `action`, `icon`, `message`, `title` | `AlertIcon`, `AlertTitle`, `AlertDescription`, `AlertAction` | Replace declarative props with composed children | Medium | M | todo |
| Card | migrate | `actions`, `content`, `cover`, `extra`, `showArrowIcon`, `showEyebrow`, `showFooter`, `title` | `CardHeader`, `CardTitle`, `CardBody`, `CardFooter`, `CardActions`, `CardImage` | Remove `(Card as any).Meta` static attachments. Remove `'default'`/`'small'` size aliases. | Low | H | todo |
| Collapsible | normalize | `badges`, `extra`, `header`, `showArrow` | `CollapsibleTrigger`, `CollapsibleHeader`, `CollapsibleTitle`, `CollapsibleContent` | Clarify controlled/uncontrolled contract. Replace config/header props. | Medium | M | todo |
| DataEntryTable | normalize | `columns`, `data` | composable `DataEntryTableHeader/Body/Row/Cell` | Remove `console.log` debug statement. Convert declarative tables to composition. | Medium | H | todo |
| Drawer | normalize | `footer`, `onClose`, `title` | `DrawerHeader`, `DrawerTitle`, `DrawerBody`, `DrawerFooter`, `onOpenChange` | Remove `onClose`, keep `onOpenChange`. Fix swallowed props in composable mode. | High | M | todo |
| Footer | normalize | `buttonCount`, `buttonTexts`, `buttonVariants`, `leftSideButton`, `onButtonClick` | `Footer` with explicit `FooterButton` children | Fix `gap-[366px]` magic value. Fix composable detection. | Low | H | blocked |
| Form | migrate | `help`, `label` | `FormLabel`, `FormControl`, `FormError`, `FormHelper` | Fix React Hooks violation in `FormItem`. Fix disconnected `useForm`. | Medium | H | todo |
| Modal | normalize | `footer`, `onClose`, `title` | `ModalHeader`, `ModalTitle`, `ModalBody`, `ModalFooter`, `onOpenChange` | Remove `onClose`, keep `onOpenChange`. Fix swallowed props in composable mode. | High | M | todo |
| NavigationPopover | normalize | `sections` | `NavigationSection` children composition | Remove `DEFAULT_SECTIONS` fallback mock data. Fix null-rendering sub-components. | Medium | M | todo |
| PageHeader | keep | `items`, `onChange`, `variant` | Composable-only API | Replace `(PageHeaderBase as any)` with typed namespace. | Medium | M | todo |
| Result | migrate | `extra`, `icon`, `subTitle`, `title` | `ResultTitle`, `ResultSubtitle`, `ResultExtra` | Build sub-components first (referenced but not implemented). | Low | H | blocked |
| Table | normalize | `columns`, `data`, `header`, `label`, `prefixIcon`, `suffixIcon` | `TableHeader`, `TableBody`, `TableRow`, `TableCell` | Remove `reorderable` prop (unimplemented). Fix `loading=true` returning null. | Medium | H | todo |
| Tabs | normalize | `showLine`, `tabs` | `TabsList`, `TabsTrigger`, `TabsContent` | Rename `type` to `variant`. Fix integer-only `activeTab`. | High | M | todo |

## Cross-Cutting Tasks

| Task | Description | Owner | Status |
|---|---|---|---|
| API Contract | Define canonical variant/size/state/behavior rules | — | done |
| Story Contract | Define required story sections and naming conventions | — | done |
| Component Classification | Classify all 81 components as keep/normalize/migrate/replace | — | done |
| Migration Matrix | Map old prop -> new prop/pattern for every component | — | done |
| Codemod Pack | Build codemods for `tabs`, `steps`, `dropdown options`, `form label/help`, `modal/drawer onClose->onOpenChange` | TBD | todo |
| Story Enforcement | Ensure all `Default` stories use composable APIs; keep `Legacy*` stories isolated | TBD | in_progress |
| Lint Guard | Add lint check to ban deprecated props in `src/stories` and `ft-docs` | TBD | todo |
| Docs Contract | Every migration PR must include before/after docs snippet | TBD | todo |
| Major Release Gate | No `@deprecated` runtime paths in source before v5 | TBD | todo |
