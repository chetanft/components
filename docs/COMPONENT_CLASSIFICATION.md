# FT Design System - Component Classification

> **Version:** 4.21.1 baseline
> **Purpose:** Phase 2 deliverable — categorize every component for the v5 migration.
> **Source:** Deep inventory of all atoms, molecules, and organisms.

Related docs:
- `docs/API_CONTRACT.md`
- `docs/LEGACY_API_AUDIT.md`
- `docs/LEGACY_MIGRATION_MATRIX.md`

---

## Classification Key

| Category | Meaning | Action Required |
|---|---|---|
| `keep` | Already follows canonical API contract | No changes needed |
| `normalize` | Small naming/type/value cleanup | Rename props, remove aliases, fix types — no structural change |
| `migrate` | Has deprecated declarative props needing composable replacement | Remove legacy props, ensure composable API works |
| `replace` | Entire component is deprecated or fundamentally broken | Remove or rewrite from scratch |

---

## Summary

| Category | Atoms | Molecules | Organisms | Total |
|---|---|---|---|---|
| `keep` | 6 | 4 | 2 | **12** |
| `normalize` | 5 | 12 | 16 | **33** |
| `migrate` | 8 | 18 | 4 | **30** |
| `replace` | 2 | 1 | 3 | **6** |
| **Total** | 21 | 35 | 25 | **81** |

---

## Atoms (21 components)

### keep (6)

| Component | Notes |
|---|---|
| Button | Clean API. Extended sizes (xxs/xxl) permitted by design spec. |
| Icon | Numeric default size (16) is intentional for icons. |
| Logos | Utility component, no variant/size system needed. |
| Select | Thin Radix wrapper, composable by design. |
| Spin | Clean API, canonical size scale. |
| Toggle | Clean API, canonical size scale. |

### normalize (5)

| Component | Issues to Fix |
|---|---|
| Badge | Remove `'danger'`/`'normal'` from variant type. Remove `'default'`/`'small'` from size type. Remove `color` prop. Remove `(Badge as any).Ribbon` static attachment. |
| Divider | Rename `type` prop to `variant`. |
| Illustration | Consider renaming `variant` to `name` (selects content, not visual style). |
| Spacer | Intentional token-based sizing (`x1`-`x12`), but document the exception to canonical scale. |
| Typography | Remove `'danger'` from `color` prop values, replace with `'error'`. |

### migrate (8)

| Component | Legacy Props to Remove | Composable API Status |
|---|---|---|
| Avatar | `src`, `icon`, `alt` (declarative) | Exists (`AvatarImage`, `AvatarFallback`). Fix: remove `(AvatarBase as any)` static attachment. |
| Checkbox | `label`, `error`, `description` | Exists (`CheckboxInput`, `CheckboxLabel`, `CheckboxError`, `CheckboxHelper`). Fix: change `error` from `boolean` to `string`. |
| Input | `label`, `labelMandatory`, `labelOptional`, `labelSuffixIcon`, `labelIcon`, `helperText` | Exists (`InputLabel`, `InputField`, `InputError`, `InputHelper`). Fix: add `@deprecated` tags to declarative props. |
| RadioGroup | `options`, `error`, `helperText` | Exists (`RadioItem`, `RadioGroupError`, `RadioGroupHelper`). Fix: change `error` from `boolean` to `string`. Remove `onValueChange` alias. |
| Skeleton | `variant`, `width`, `height` (declarative) | Exists (`SkeletonText`, `SkeletonImage`). Fix: add `@deprecated` tags. |
| Statistic | `label`, `value` | Exists (`StatisticTitle`, `StatisticValue`). Fix: lowercase `labelPlacement` values (`'Below'` -> `'below'`). |
| Switch | `label`, `error`, `helperText` | Exists (`SwitchInput`, `SwitchLabel`, `SwitchError`, `SwitchHelper`). Fix: change `error` from `boolean` to `string`. |
| Textarea | `label`, `labelMandatory`, `labelOptional`, `error`, `helperText` | Exists (`TextareaLabel`, `TextareaField`, `TextareaError`, `TextareaHelper`). |

### replace (2)

| Component | Reason |
|---|---|
| SubText | No `children` prop — text is hardcoded `"Sub text"`. `icon` uses `'Yes'/'No'` string instead of boolean. Not reusable. |
| Text | No `children` prop — text is hardcoded. `size` includes non-standard `'xx'` alias. Default size is `'sm'` not `'md'`. Not reusable. |

---

## Molecules (35 components)

### keep (4)

| Component | Notes |
|---|---|
| Empty | Clean composable API, no legacy props. |
| FloatButton | Clean API, no legacy issues. |
| Image | Clean API with composable preview. |
| Rate | Clean API, no legacy issues. |

### normalize (12)

| Component | Issues to Fix |
|---|---|
| Chicklet | `closable`/`showClose` flag props — replace with explicit close composition. Blocked: needs sub-component first. |
| ColorPicker | `showText` flag — replace with explicit label composition. |
| DatePicker | Default size `'m'` -> `'md'`. Remove `'m'`/`'l'` aliases. `error` from `boolean` to `string`. Remove internal states from `state` cva (`focused`, `hover`, `typing`, `prefilled`). |
| HoverCard | `content` prop -> explicit `HoverCardContent` composition. |
| InputNumber | `prefix`/`suffix` props -> composable adornments. |
| Pagination | `showQuickJumper`/`showSizeChanger` flags -> explicit composition. |
| ProgressBar | `showPercentage` flag -> explicit label composition. Blocked: needs sub-component. |
| ProgressList | `items` array -> `ProgressListItem` children. Blocked: needs sub-component. |
| RadioSelector | `options` array -> `RadioSelectorOption` children. Blocked: needs sub-component. |
| SegmentedTabs | `items` array -> `SegmentedTabItem` children. Blocked: needs sub-component. |
| Slider | `marks` -> composed labels. |
| Timeline | `color`/`dot`/`label` -> `TimelineItem` composition. |

### migrate (18)

| Component | Legacy Props to Remove | Composable API Status |
|---|---|---|
| Anchor | `items`, `showInkInFixed` | **Blocked** — needs `AnchorLink` sub-component. |
| Breadcrumb | `items`, `separator` | Exists (`BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbSeparator`). |
| ButtonGroup | `buttons` | **Blocked** — needs `ButtonGroupItem` sub-component. |
| Cascader | `options` | **Blocked** — needs `CascaderOption` sub-component. |
| Descriptions | `extra`, `items`, `title` | Exists (`DescriptionsTitle`, `DescriptionsExtra`, `DescriptionsItem`). |
| Dropdown | `label`, `onSelect`, `options` | Exists (`DropdownTrigger`, `DropdownContent`). Fix: rename `state` prop, split to `disabled`/`error`. |
| DropdownMenu | `options` | Exists (`DropdownMenuList`, `DropdownMenuItem`). |
| List | `dataSource`, `footer`, `grid`, `header`, `renderItem` | Exists (`ListHeader`, `ListBody`, `ListItem`, `ListFooter`). |
| Mentions | `options` | **Blocked** — needs `MentionOption` sub-component. |
| Popconfirm | `cancelText`, `description`, `icon`, `okText`, `okType`, `title` | Exists (`PopconfirmTrigger`, `PopconfirmContent`). |
| QuickFilters | `filters` | Exists (`QuickFilter`, `FilterOption`). Fix: null-rendering data carriers. |
| SimpleColumnLayout | Entire component deprecated | **Replace** with `Table layout="simple"`. |
| StackedBarChart | `data` | **Blocked** — needs sub-component API. |
| Steps | `steps` | Exists (`StepItem`). |
| Tooltip | `heading`, `primaryActionText`, `secondaryActionText` | Exists (`TooltipTitle`, `TooltipDescription`). Fix: rename `color` to `variant`. |
| Tour | `steps` | **Blocked** — needs `TourStep` sub-component. |
| Transfer | `dataSource`, `showSearch` | **Blocked** — needs `TransferItem` sub-component. |
| TreeSelect | `treeData` | **Blocked** — needs composable node API. |

### replace (1)

| Component | Reason |
|---|---|
| SimpleColumnLayout | Entire component deprecated — replace with `Table layout="simple"`. |

---

## Organisms (25 components)

### keep (2)

| Component | Notes |
|---|---|
| FileThumbnail | Clean monolithic component, no legacy issues. |
| PageHeader | Composable-only API, no legacy path. Fix: replace `(PageHeaderBase as any)` with typed namespace. |

### normalize (16)

| Component | Issues to Fix |
|---|---|
| AppHeader | Fix PascalCase size value `'Default'`. Fix PascalCase device values. |
| Collapsible | Deprecated props exist but composable API works. Clarify controlled/uncontrolled contract. |
| DataEntryTable | Remove `console.log` debug statement. Add silent-fail warning for missing columns/data. |
| DisplayBlock | Fix PascalCase string values (`"True"/"False"` -> boolean, `"1"/"2"/"3"` -> number). |
| Drawer | Both `onClose` and `onOpenChange` exist — remove `onClose`. Fix swallowed props in composable mode. |
| FileCard | Normalize kebab-case variant values. |
| FileTypeIcon | Remove hardcoded Figma asset URLs (7-day expiry). |
| Footer | Fix `gap-[366px]` magic value. Fix composable detection (uses `children.count` not `displayName`). |
| Grid | Fix ignored responsive breakpoint props. |
| Modal | Both `onClose` and `onOpenChange` exist — remove `onClose`. Fix swallowed props in composable mode. |
| NavigationPopover | Remove `DEFAULT_SECTIONS` fallback mock data. Fix null-rendering sub-components. |
| QuickFilters | Fix `'normal'` -> `'default'` in `FilterType`. Fix null-rendering sub-components. |
| Table | Remove `reorderable` prop (unimplemented). Fix `loading=true` returning null. |
| Tabs | Rename `type` to `variant`. Fix integer-only `activeTab`. |
| UploadZone | Remove `'hover'` from `state` prop (CSS state, not public). Fix `'button'`/`'thumbnail'` returning null. |
| UserProfile | Remove hardcoded default user data. Fix misleading `companyName: boolean`. |

### migrate (4)

| Component | Legacy Props to Remove | Composable API Status |
|---|---|---|
| Card | `title`, `content`, `actions`, `cover`, `extra`, `showEyebrow`, `showFooter`, `showArrowIcon` | Exists but fragile detection. Fix: remove `(Card as any).Meta` static attachments. Remove `'default'`/`'small'` size aliases. |
| Form | `label`, `help` on Form.Item | Exists (`FormLabel`, `FormControl`, `FormError`, `FormHelper`). Fix: React Hooks violation in `FormItem`. Fix disconnected `useForm`. |
| Result | `title`, `subTitle`, `icon`, `extra` | **Blocked** — composable sub-components (`ResultTitle`, `ResultSubtitle`) referenced but not implemented. |
| Upload | Children ignored despite composable JSDoc | **Blocked** — composable API (`UploadTrigger`, `UploadList`) documented but not functional. |

### replace (3)

| Component | Reason |
|---|---|
| Collapse | Legacy Ant Design shim calling deprecated Collapsible props internally. |
| NavigationMenu | Fully hardcoded product-specific navigation, not a reusable design system component. |
| UserProfileDropdown | Hardcoded menu items, hardcoded default user data, returns null on close. |

---

## Blocked Components (Need Sub-Components First)

These 12 components cannot be migrated until composable sub-components are built:

| Component | Missing Sub-Components |
|---|---|
| Anchor | `AnchorLink` |
| ButtonGroup | `ButtonGroupItem` |
| Cascader | `CascaderOption` |
| Mentions | `MentionOption` |
| ProgressBar | `ProgressBarLabel` |
| ProgressList | `ProgressListItem` |
| RadioSelector | `RadioSelectorOption` |
| Result | `ResultTitle`, `ResultSubtitle`, `ResultExtra` |
| StackedBarChart | `StackedBarChartBar`, `StackedBarChartSegment` |
| Tour | `TourStep` |
| Transfer | `TransferItem` |
| TreeSelect | Composable node API |
| Upload | Fix `UploadTrigger`/`UploadList` (documented but non-functional) |

---

## Priority Actions

### Immediate (Week 2-3)
1. **normalize** Badge, Divider, Typography, DatePicker — small type/naming fixes with zero breaking changes.
2. **migrate** Statistic, Steps, DropdownMenu, Breadcrumb — composable API already exists, just remove legacy path.

### Near-term (Week 4-5)
3. **migrate** Switch, Checkbox, RadioGroup — change `error: boolean` to `error: string`, remove declarative props.
4. **normalize** Drawer, Modal — remove `onClose`, keep `onOpenChange`.
5. **normalize** Tooltip — rename `color` to `variant`.

### Medium-term (Week 6-7)
6. **migrate** Card, Table, Form, List — heavy components with most deprecated props.
7. **Build missing sub-components** for blocked set.

### Long-term (Week 8-10)
8. **replace** SubText, Text, Collapse, NavigationMenu, UserProfileDropdown, SimpleColumnLayout.
9. Cut v5 major release.
