# FT Design System - Legacy Declarative API Audit

> **Version:** 4.21.1
> **Date:** 2026-02-20
> **Purpose:** Document all deprecated declarative API code paths to inform future removal decisions.

---

## Summary

| Metric | Value |
|---|---|
| Components with deprecated props | 50 / 110 (45.5%) |
| Total unique deprecated props | 123 |
| Source files containing deprecated props | 53 |
| LOC in files with deprecated props | 18,706 (28.8% of 64,909 total) |
| Components with no composable equivalent yet | 18 |

---

## Heaviest Legacy Components

Components ranked by number of deprecated props. These represent the most complex migration paths.

| Rank | Component | Deprecated Props | Has Composable Sub-components |
|---|---|---|---|
| 1 | Card | 8 | Yes |
| 2 | Popconfirm | 7 | Yes (PopconfirmContent) |
| 3 | Table | 6 | Yes |
| 4 | List | 5 | Yes |
| 4 | Textarea | 5 | No |
| 4 | Footer | 5 | Yes |
| 7 | Alert | 4 | Yes |
| 7 | Collapsible | 4 | Yes |
| 7 | Result | 4 | No |
| 10 | Descriptions | 3 | Yes |
| 10 | Drawer | 3 | Yes |
| 10 | Dropdown | 3 | Yes |
| 10 | Modal | 3 | Yes |
| 10 | Tooltip | 3 | Yes |
| 10 | Switch | 3 | No |
| 10 | RadioGroup | 3 | Yes |
| 10 | Checkbox | 3 | Yes |
| 10 | Timeline | 3 | Yes |
| 10 | Badge | 3 | Yes |

---

## Full Deprecated Props Inventory (Alphabetical)

### Atoms

| Component | Deprecated Props |
|---|---|
| Badge | `color`, `showZero`, `size` |
| Checkbox | `description`, `error`, `label` |
| RadioGroup | `error`, `helperText`, `options` |
| Slider | `marks` |
| Statistic | `label`, `value` |
| Switch | `error`, `helperText`, `label` |
| Textarea | `error`, `helperText`, `label`, `labelMandatory`, `labelOptional` |

### Molecules

| Component | Deprecated Props |
|---|---|
| Anchor | `items`, `showInkInFixed` |
| Breadcrumb | `items`, `separator` |
| ButtonGroup | `buttons` |
| Cascader | `options` |
| Chicklet | `closable`, `showClose` |
| ColorPicker | `showText` |
| DatePicker | `label`, `showTime` |
| Descriptions | `extra`, `items`, `title` |
| Dropdown | `label`, `onSelect`, `options` |
| DropdownMenu | `options` |
| HoverCard | `children`, `content` |
| InputNumber | `prefix`, `suffix` |
| List | `dataSource`, `footer`, `grid`, `header`, `renderItem` |
| Mentions | `options` |
| Pagination | `showQuickJumper`, `showSizeChanger` |
| Popconfirm | `cancelText`, `children`, `description`, `icon`, `okText`, `okType`, `title` |
| ProgressBar | `showPercentage` |
| ProgressList | `items` |
| QuickFilters | `filters` |
| RadioSelector | `options` |
| SegmentedTabs | `items` |
| SimpleColumnLayout | *(entire component deprecated)* |
| StackedBarChart | `data` |
| Steps | `steps` |
| Timeline | `color`, `dot`, `label` |
| Tooltip | `heading`, `primaryActionText`, `secondaryActionText` |
| Tour | `steps` |
| Transfer | `dataSource`, `showSearch` |
| Tree | `showLine`, `treeData` |
| TreeSelect | `treeData` |

### Organisms

| Component | Deprecated Props |
|---|---|
| Alert | `action`, `icon`, `message`, `title` |
| Card | `actions`, `content`, `cover`, `extra`, `showArrowIcon`, `showEyebrow`, `showFooter`, `title` |
| Collapsible | `badges`, `extra`, `header`, `showArrow` |
| DataEntryTable | `columns`, `data` |
| Drawer | `footer`, `onClose`, `title` |
| Footer | `buttonCount`, `buttonTexts`, `buttonVariants`, `leftSideButton`, `onButtonClick` |
| Form | `help`, `label` |
| Modal | `footer`, `onClose`, `title` |
| NavigationPopover | `sections` |
| PageHeader | `items`, `onChange`, `variant` |
| Result | `extra`, `icon`, `subTitle`, `title` |
| Table | `columns`, `data`, `header`, `label`, `prefixIcon`, `suffixIcon` |
| Tabs | `showLine`, `tabs` |

---

## Components with NO Composable Equivalent

These 18 components have deprecated props but lack composable sub-component alternatives. They need composable sub-components created before their declarative APIs can be removed.

1. **Anchor** -- `items`, `showInkInFixed`
2. **ButtonGroup** -- `buttons`
3. **Cascader** -- `options`
4. **Chicklet** -- `closable`, `showClose`
5. **ColorPicker** -- `showText`
6. **Footer** -- `buttonCount`, `buttonTexts`, `buttonVariants`, `leftSideButton`, `onButtonClick`
7. **Mentions** -- `options`
8. **ProgressBar** -- `showPercentage`
9. **ProgressList** -- `items`
10. **QuickFilters** -- `filters`
11. **RadioSelector** -- `options`
12. **Result** -- `extra`, `icon`, `subTitle`, `title`
13. **SegmentedTabs** -- `items`
14. **SimpleColumnLayout** -- entire component deprecated
15. **StackedBarChart** -- `data`
16. **Tour** -- `steps`
17. **Transfer** -- `dataSource`, `showSearch`
18. **TreeSelect** -- `treeData`

---

## Recommended Removal Order

Remove least-used, simplest-to-migrate paths first. Components are ordered by complexity (fewest deprecated props first) and whether composable sub-components already exist.

### Tier 1: Quick Wins (1 deprecated prop, composable exists)
- DropdownMenu (`options`)
- Steps (`steps`)
- Slider (`marks`)
- Tree (`showLine`, `treeData`)

### Tier 2: Single-Prop, Need Composable Sub-components First
- ButtonGroup (`buttons`)
- Cascader (`options`)
- Mentions (`options`)
- ProgressBar (`showPercentage`)
- ProgressList (`items`)
- QuickFilters (`filters`)
- RadioSelector (`options`)
- SegmentedTabs (`items`)
- StackedBarChart (`data`)
- Tour (`steps`)
- TreeSelect (`treeData`)

### Tier 3: Multi-Prop, Composable Exists
- Statistic (`label`, `value`)
- Breadcrumb (`items`, `separator`)
- InputNumber (`prefix`, `suffix`)
- Pagination (`showQuickJumper`, `showSizeChanger`)
- Tabs (`showLine`, `tabs`)
- DataEntryTable (`columns`, `data`)
- Form (`help`, `label`)
- HoverCard (`children`, `content`)
- DatePicker (`label`, `showTime`)
- Badge (`color`, `showZero`, `size`)
- Checkbox (`description`, `error`, `label`)
- RadioGroup (`error`, `helperText`, `options`)
- Drawer (`footer`, `onClose`, `title`)
- Dropdown (`label`, `onSelect`, `options`)
- Modal (`footer`, `onClose`, `title`)
- Tooltip (`heading`, `primaryActionText`, `secondaryActionText`)
- Timeline (`color`, `dot`, `label`)

### Tier 4: Heavy Components (5+ deprecated props)
- Alert (4 props)
- Collapsible (4 props)
- Result (4 props, needs composable sub-components)
- Textarea (5 props, needs composable sub-components)
- Switch (3 props)
- List (5 props)
- Footer (5 props, needs composable sub-components)
- Table (6 props)
- Popconfirm (7 props)
- Card (8 props)

---

## Migration Guide Snippets

### Pattern: Prop-to-SubComponent Migration

**Before (declarative):**
```tsx
<Alert message="File uploaded" title="Success" icon="check" />
```

**After (composable):**
```tsx
<Alert>
  <AlertIcon name="check" />
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>File uploaded</AlertDescription>
</Alert>
```

### Pattern: Array-to-Children Migration

**Before (declarative):**
```tsx
<List dataSource={items} renderItem={(item) => <div>{item.name}</div>} />
```

**After (composable):**
```tsx
<List>
  <ListBody>
    {items.map(item => (
      <ListItem key={item.id}>
        <ListItemContent>
          <ListItemTitle>{item.name}</ListItemTitle>
        </ListItemContent>
      </ListItem>
    ))}
  </ListBody>
</List>
```

### Pattern: Config-to-Composition Migration

**Before (declarative):**
```tsx
<Tabs tabs={[{ label: 'Tab 1', children: <Content /> }]} />
```

**After (composable):**
```tsx
<Tabs>
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1"><Content /></TabsContent>
</Tabs>
```

---

## Detection Pattern

All hybrid components use a `displayName` check to detect composable vs declarative usage:

```tsx
const hasComposableChildren = React.Children.toArray(children).some(
  (child: any) => child?.type?.displayName?.startsWith('ComponentName')
);
```

When `hasComposableChildren` is true, the composable render path executes. Otherwise, the legacy declarative path runs. This pattern is consistent across all 50 hybrid components.

---

## Story Coverage

All legacy declarative stories have been renamed with "Legacy" prefix and marked `@deprecated` as part of the Phase 2 audit. Every component with a composable API now has:
- A `Default` story using the composable API
- Legacy stories preserved with `Legacy` prefix for backward compatibility testing

Components with no composable story coverage (declarative-only):
- Components listed in "NO Composable Equivalent" section above
