# Explorer Implementation Board

Purpose: Standardize Explorer behavior across all FT Design System components with:
- Correct variation modeling (independent vs dependent)
- Correct option visibility (no invalid combinations)
- Correct behavioral rendering (top alerts, right drawer, centered modal, anchored popups)

Status key:
- `todo`: not started
- `in_progress`: currently being implemented
- `done`: implemented + validated in docs
- `blocked`: waiting on API/design decision

## Contract (applies to every component)
- `ExplorerBase` story exists and is used by Explorer.
- Axes are explicitly declared (type/style/state/content/size/shape/etc).
- Dependent constraints are explicit (invalid combinations hidden or auto-corrected).
- Behavior wrapper is explicit (`inline`, `top-overlay`, `right-overlay`, `center-overlay`, `anchored`, `layout`, `chart`).
- Visual and interaction checks pass.

## Wave 1: Overlay + Anchored First
| Component | Behavior | Wrapper | Primary Axes | Key Dependent Rules | Status | Owner | Target Date |
|---|---|---|---|---|---|---|---|
| Alert | top-overlay | TopOverlayPreview | type, style, state, size, action, closable | `closable` needs stateful close handler | done | DS Core | 2026-02-21 |
| Notification | top-overlay | TopOverlayPreview | type, style, state, title/body/action | stack/queue preview uses overlay mode only | done | DS Core | 2026-02-21 |
| Popconfirm | anchored | AnchorPreview | type, placement, size, state | confirm/cancel actions required in interactive states | done | DS Core | 2026-02-21 |
| Tooltip | anchored | AnchorPreview | placement, trigger, size, state | interactive mode requires focusable trigger | done | DS Core | 2026-02-21 |
| Dropdown | anchored | AnchorPreview | size, state, searchable, disabled | searchable only with valid options payload | done | DS Core | 2026-02-21 |
| DropdownMenu | anchored | AnchorPreview | placement, trigger, density, state | nested items only when submenu data exists | done | DS Core | 2026-02-21 |
| TreeSelect | anchored | AnchorPreview | size, searchable, multi, state | checkbox model only in multi mode | done | DS Core | 2026-02-21 |
| DatePicker | anchored | AnchorPreview | mode, size, state | range mode requires dual-value snapshot | done | DS Core | 2026-02-21 |
| TimePicker | anchored | AnchorPreview | format, size, state | second granularity only for matching formats | done | DS Core | 2026-02-21 |
| HoverCard | anchored | AnchorPreview | placement, delay, trigger | hover/click trigger modes must be isolated | done | DS Core | 2026-02-21 |
| Mentions | anchored | AnchorPreview | trigger char, state, size | list appears only when trigger context exists | done | DS Core | 2026-02-21 |
| ColorPicker | anchored | AnchorPreview | format, alpha, presets | alpha controls only when `alpha=true` | done | DS Core | 2026-02-21 |

## Wave 2: Dialog + Panel + Form Organisms
| Component | Behavior | Wrapper | Primary Axes | Key Dependent Rules | Status | Owner | Target Date |
|---|---|---|---|---|---|---|---|
| Modal | center-overlay | CenterDialogPreview | size, state, footer-actions, type | confirm variants must render action row | done | DS Core | 2026-02-21 |
| Drawer | right-overlay | RightPanelPreview | side, size, state, closable | side changes geometry and animation path | done | DS Core | 2026-02-21 |
| Form | layout | LayoutCanvas | layout, validation mode, density, state | error/helper visibility depends on field state | done | DS Core | 2026-02-21 |
| Grid | layout | LayoutCanvas | columns, gap, responsive mode | responsive previews need constrained canvas widths | done | DS Core | 2026-02-21 |
| Result | inline | InlinePreview | type, state, actions | actions only when provided | done | DS Core | 2026-02-21 |
| Collapsible | layout | LayoutCanvas | mode, state, density | controlled and uncontrolled variants isolated | done | DS Core | 2026-02-21 |
| Tabs | layout | LayoutCanvas | variant, orientation, size, state | active tab and panel mapping must be synced | done | DS Core | 2026-02-21 |
| SimpleColumnLayout | layout | LayoutCanvas | column count, spacing, responsive | collapse behavior tied to breakpoint configs | done | DS Core | 2026-02-21 |
| AppHeader | layout | LayoutCanvas | mode, actions, branding, state | right actions shown only when configured | done | DS Core | 2026-02-21 |
| PageHeader | layout | LayoutCanvas | title mode, actions, tabs, breadcrumbs | tab content shown only when tabs exist | done | DS Core | 2026-02-21 |
| QuickFilters | layout | LayoutCanvas | filter type, count, state | chip actions only in interactive mode | done | DS Core | 2026-02-21 |

## Wave 3: Inputs and Selection Controls
| Component | Behavior | Wrapper | Primary Axes | Key Dependent Rules | Status | Owner | Target Date |
|---|---|---|---|---|---|---|---|
| Input | inline | InlinePreview | size, style, state, content mode | prefix/suffix and helper/error composition must be valid | done | DS Core | 2026-02-21 |
| Textarea | inline | InlinePreview | size, state, resize mode | counter appears only with `maxLength` | done | DS Core | 2026-02-21 |
| InputNumber | inline | InlinePreview | size, controls, state | stepper disabled in readOnly/disabled states | done | DS Core | 2026-02-21 |
| Checkbox | inline | InlinePreview | size, state | indeterminate requires controlled state sample | done | DS Core | 2026-02-21 |
| RadioGroup | inline | InlinePreview | size, orientation, state | only one checked in single-select model | done | DS Core | 2026-02-21 |
| Switch | inline | InlinePreview | size, state | loading/disabled block interactions | done | DS Core | 2026-02-21 |
| Toggle | inline | InlinePreview | size, state, pressed | icon-only requires explicit aria label | done | DS Core | 2026-02-21 |
| ToggleGroup | inline | InlinePreview | type(single/multi), size, state | single mode enforces one active selection | done | DS Core | 2026-02-21 |
| Label | inline | InlinePreview | size, required/optional mode | id/for association shown in paired examples | done | DS Core | 2026-02-21 |
| ReadOnly | inline | InlinePreview | density, text/value mode | no editable interaction states | done | DS Core | 2026-02-21 |
| RadioSelector | inline | InlinePreview | size, state | selected marker only in selected state | done | DS Core | 2026-02-21 |
| Cascader | anchored | AnchorPreview | size, searchable, state | child branches only when available | done | DS Core | 2026-02-21 |
| Slider | inline | InlinePreview | size, range mode, state | range mode uses dual thumb only | done | DS Core | 2026-02-21 |
| Rate | inline | InlinePreview | count, allowHalf, state | half-star logic only with compatible precision | done | DS Core | 2026-02-21 |

## Wave 4: Core UI Surfaces + Data + Navigation
| Component | Behavior | Wrapper | Primary Axes | Key Dependent Rules | Status | Owner | Target Date |
|---|---|---|---|---|---|---|---|
| Button | inline | InlinePreview | type, style, content, state, size, shape | icon-only and shape coupling validated | done | DS Core | 2026-02-21 |
| ButtonGroup | inline | InlinePreview | size, orientation, state | active item handling by mode | done | DS Core | 2026-02-21 |
| Badge | inline | InlinePreview | variant, size, icon/dot, state | icon/dot mutually constrained by mode | done | DS Core | 2026-02-21 |
| Avatar | inline | InlinePreview | size, source mode, state | initials fallback when image absent | done | DS Core | 2026-02-21 |
| Divider | inline | InlinePreview | orientation, labeled/unlabeled | vertical mode needs fixed-height container | done | DS Core | 2026-02-21 |
| Text | inline | InlinePreview | token, size, tone | semantic text tokens remain valid | done | DS Core | 2026-02-21 |
| Typography | inline | InlinePreview | token set, weight, tone | heading hierarchy preview integrity | done | DS Core | 2026-02-21 |
| Spacer | inline | InlinePreview | size, direction | axis changes dimension behavior | done | DS Core | 2026-02-21 |
| Spin | inline | InlinePreview | size, state | label only when provided | done | DS Core | 2026-02-21 |
| Statistic | inline | InlinePreview | trend, precision, size | trend icon only when enabled | done | DS Core | 2026-02-21 |
| SubText | inline | InlinePreview | size, truncation, tone | truncation examples require width constraints | done | DS Core | 2026-02-21 |
| Card | inline | InlinePreview | variant, section composition, state | section slots appear only when provided | done | DS Core | 2026-02-21 |
| Table | layout | LayoutCanvas | density, sortable, selectable, paginated | sort/selection/pagination shown only when enabled | done | DS Core | 2026-02-21 |
| List | layout | LayoutCanvas | density, bordered, action mode | action area visible only for interactive items | done | DS Core | 2026-02-21 |
| Descriptions | layout | LayoutCanvas | columns, bordered, size | spans validated against column count | done | DS Core | 2026-02-21 |
| Empty | inline | InlinePreview | variant, action mode | action only in actionable empty state | done | DS Core | 2026-02-21 |
| Breadcrumb | inline | InlinePreview | separator, maxItems, size | collapse shown only when overflowed | done | DS Core | 2026-02-21 |
| Pagination | inline | InlinePreview | mode, size, state | compact mode hides advanced controls | done | DS Core | 2026-02-21 |
| Anchor | layout | LayoutCanvas | orientation, active style | requires scroll-linked section container | done | DS Core | 2026-02-21 |
| Steps | inline | InlinePreview | size, orientation, status | clickable flow only in interactive mode | done | DS Core | 2026-02-21 |
| Timeline | layout | LayoutCanvas | mode, pending, density | alternate mode uses wide container | done | DS Core | 2026-02-21 |
| Tree | layout | LayoutCanvas | checkable, expandable, density | checked/expanded dependencies managed | done | DS Core | 2026-02-21 |
| Carousel | layout | LayoutCanvas | autoplay, controls, indicators | autoplay controls only when enabled | done | DS Core | 2026-02-21 |
| NavigationLauncher | anchored | AnchorPreview | trigger mode, state | overlay anchor required | done | DS Core | 2026-02-21 |
| NavigationPopover | anchored | AnchorPreview | placement, menu depth, state | nested levels only with nested data | done | DS Core | 2026-02-21 |
| Footer | layout | LayoutCanvas | variant, density, link groups | link group rendering depends on data | done | DS Core | 2026-02-21 |
| SegmentedTabs | inline | InlinePreview | size, style, state | selected state must map to one segment | done | DS Core | 2026-02-21 |

## Wave 5: File/Upload/Feedback/Media/Charts
| Component | Behavior | Wrapper | Primary Axes | Key Dependent Rules | Status | Owner | Target Date |
|---|---|---|---|---|---|---|---|
| Upload | layout | LayoutCanvas | mode, state, list type | drag/drop only in dropzone mode | done | DS Core | 2026-02-21 |
| UploadButton | inline | InlinePreview | size, state | disabled/loading suppress file interaction | done | DS Core | 2026-02-21 |
| UploadZone | inline | InlinePreview | state, drag-active, disabled | drag indicators only when drag enabled | done | DS Core | 2026-02-21 |
| UploadItem | inline | InlinePreview | status, progress, file type | retry/remove actions depend on status | done | DS Core | 2026-02-21 |
| UploadThumbnail | inline | InlinePreview | file type, state, size | preview only for previewable file types | done | DS Core | 2026-02-21 |
| FileThumbnail | inline | InlinePreview | file type, size | fallback icon when preview unavailable | done | DS Core | 2026-02-21 |
| FileValidationCard | inline | InlinePreview | validation status, severity | details area appears on invalid states | done | DS Core | 2026-02-21 |
| FileTypeIcon | inline | InlinePreview | file type, size | unknown type fallback icon | done | DS Core | 2026-02-21 |
| FileCard | inline | InlinePreview | variant, status, metadata mode | metadata sections only with data | done | DS Core | 2026-02-21 |
| Image | inline | InlinePreview | fit, ratio, controls, state | controls visible only when enabled | done | DS Core | 2026-02-21 |
| Watermark | layout | LayoutCanvas | type, placement, opacity | image/text watermark modes are distinct | done | DS Core | 2026-02-21 |
| Loader | inline | InlinePreview | mode, size, progress/state | determinate mode requires value | done | DS Core | 2026-02-21 |
| ProgressBar | inline | InlinePreview | size, status, value mode | indeterminate hides numeric value | done | DS Core | 2026-02-21 |
| ProgressList | layout | LayoutCanvas | orientation, status sequence | step status sequence must be valid | done | DS Core | 2026-02-21 |
| Chicklet | inline | InlinePreview | variant, removable, state | remove control only when removable | done | DS Core | 2026-02-21 |
| FloatButton | inline | InlinePreview | type, state, badge | badge shown only in badge mode | done | DS Core | 2026-02-21 |
| Tour | anchored | AnchorPreview | placement, step, controls | multi-step controls only when step count > 1 | done | DS Core | 2026-02-21 |
| BackTop | layout | LayoutCanvas | threshold, position, state | visibility requires simulated scroll | done | DS Core | 2026-02-21 |
| Affix | layout | LayoutCanvas | offset, position | sticky behavior needs scroll container | done | DS Core | 2026-02-21 |
| Calendar | inline | InlinePreview | mode, locale, size | range/calendar modes are isolated | done | DS Core | 2026-02-21 |
| Transfer | layout | LayoutCanvas | searchable, paged, state | list actions depend on selection mode | done | DS Core | 2026-02-21 |
| DataEntryTable | layout | LayoutCanvas | density, editable mode, state | editable controls only in editable mode | done | DS Core | 2026-02-21 |
| StackedBarChart | chart | ChartCanvas | theme, orientation, legend | stacked dataset required | done | DS Core | 2026-02-21 |
| AreaChart | chart | ChartCanvas | stacked, smooth, legend | stacked mode requires multiple series | done | DS Core | 2026-02-21 |
| LineChart | chart | ChartCanvas | curve, points, legend | points only when line displayed | done | DS Core | 2026-02-21 |
| PieChart | chart | ChartCanvas | donut, labels, legend | center label only in donut mode | done | DS Core | 2026-02-21 |
| RadarChart | chart | ChartCanvas | grid style, fill, legend | fill mode requires opacity config | done | DS Core | 2026-02-21 |
| RadialChart | chart | ChartCanvas | shape, start/end angle | partial arc requires bounded angles | done | DS Core | 2026-02-21 |

## Global Docs/Utility Stories (optional in Explorer board)
| Component | Behavior | Wrapper | Primary Axes | Key Dependent Rules | Status | Owner | Target Date |
|---|---|---|---|---|---|---|---|
| ColorSystem | layout | LayoutCanvas | theme, token group | token group controls rendered by scope | done | DS Core | 2026-02-21 |
| ThemeSystem | layout | LayoutCanvas | theme mode, density | tokens must reflect chosen mode | done | DS Core | 2026-02-21 |
| Logo | inline | InlinePreview | brand, size, mode | contrast mode depends on background | done | DS Core | 2026-02-21 |
| Icon | inline | InlinePreview | name, size, stroke mode | accessibility label/decorative mode split | done | DS Core | 2026-02-21 |
| Illustration | inline | InlinePreview | size, style, tone | some variants need fixed frame size | done | DS Core | 2026-02-21 |

## Execution Checklist (per component)
1. Add/normalize `ExplorerBase`.
2. Define axes and defaults.
3. Define dependent constraints.
4. Assign behavior wrapper.
5. Validate:
   - No impossible options shown
   - All valid combinations render
   - Behavior matches real usage (top alert/right drawer/etc)
6. Mark `Status` to `done`.

## Governance
- Keep this board updated in PRs that touch story explorer config.
- Required PR checklist line: “Explorer matrix/behavior reviewed for this component”.
