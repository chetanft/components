# v5 Legacy API Removal Guide

This guide covers all deprecated props and APIs removed across Waves 1–8 of the FT Design System legacy cleanup. For each wave, every removed prop is listed with the composable replacement and before/after code examples.

---

## Wave 1 — Core Atoms (8 components)

These components had their legacy declarative props removed in favor of composable children or simplified APIs.

### Button
| Removed Prop | Replacement |
|---|---|
| `type` | Use `variant` instead |

### Input
| Removed Prop | Replacement |
|---|---|
| `addonBefore` / `addonAfter` | Use `InputAddon` composable children |

### Select
| Removed Prop | Replacement |
|---|---|
| `options` | Use `SelectOption` composable children |

---

## Wave 2 — Medium Components

### Tabs
| Removed Prop | Replacement |
|---|---|
| `items` | Use `TabItem` composable children |

### Form
| Removed Prop | Replacement |
|---|---|
| `fields` | Use `FormItem` composable children |

### Badge
| Removed Prop | Replacement |
|---|---|
| `size` (string aliases) | Use standard size values |

### Tooltip
| Removed Prop | Replacement |
|---|---|
| `title` / `content` | Use `TooltipTitle` / `TooltipContent` composable children |

### Timeline
| Removed Prop | Replacement |
|---|---|
| `items` | Use `TimelineItem` composable children |

---

## Wave 3 — Overlay & Container Components

### Modal
| Removed Prop | Replacement |
|---|---|
| `title` / `footer` | Use `ModalHeader` / `ModalFooter` composable children |

### Drawer
| Removed Prop | Replacement |
|---|---|
| `title` / `footer` | Use `DrawerHeader` / `DrawerFooter` composable children |

### Collapsible
| Removed Prop | Replacement |
|---|---|
| `title` / `header` | Use `CollapsibleTrigger` / `CollapsibleHeader` composable children |

### Alert
| Removed Prop | Replacement |
|---|---|
| `message` / `description` | Use `AlertTitle` / `AlertDescription` composable children |

### NavigationPopover
| Removed Prop | Replacement |
|---|---|
| `items` | Use composable children |

### PageHeader
| Removed Prop | Replacement |
|---|---|
| `title` / `subTitle` / `extra` / `breadcrumb` | Use composable sub-components |

---

## Wave 4 — Data-Heavy Components

### Table
| Removed Prop | Replacement |
|---|---|
| `columns` / `dataSource` | Use `TableHeader` / `TableBody` / `TableRow` / `TableCell` composable children |

### DataEntryTable
| Removed Prop | Replacement |
|---|---|
| `columns` / `dataSource` | Use composable table structure |

### List
| Removed Prop | Replacement |
|---|---|
| `dataSource` / `renderItem` | Use `ListItem` composable children |

---

## Wave 7 — Blocked Set A

### ButtonGroup
| Removed Prop | Replacement |
|---|---|
| `buttons` | Use `Button` composable children |

### Cascader
| Removed Prop | Replacement |
|---|---|
| `options` | Use `CascaderOption` composable children |

### Mentions
| Removed Prop | Replacement |
|---|---|
| `options` | Use `MentionOption` composable children |

### ProgressBar
| Removed Prop | Replacement |
|---|---|
| `showPercentage` | Percentage is always shown or derived automatically |

### ProgressList
| Removed Prop | Replacement |
|---|---|
| `items` | Use `ProgressListItem` composable children |

### QuickFilters
| Removed Prop | Replacement |
|---|---|
| `filters` | Use `QuickFilterItem` composable children |

### RadioSelector
| Removed Prop | Replacement |
|---|---|
| `options` | Use `RadioSelectorOption` composable children |

---

## Wave 8 — Blocked Set B

### Result
| Removed Prop | Replacement |
|---|---|
| `title` | `<ResultTitle>` |
| `subTitle` | `<ResultSubtitle>` |
| `icon` | `<ResultIcon>` |
| `extra` | `<ResultExtra>` |

```tsx
// Before
<Result status="success" title="Done!" subTitle="All good." extra={<Button>OK</Button>} />

// After
<Result status="success">
  <ResultIcon><ResultStatusIcon status="success" /></ResultIcon>
  <ResultTitle>Done!</ResultTitle>
  <ResultSubtitle>All good.</ResultSubtitle>
  <ResultExtra><Button>OK</Button></ResultExtra>
</Result>
```

### Footer
| Removed Prop | Replacement |
|---|---|
| `buttonCount` | Use `FooterButton` children |
| `buttonTexts` | Use `FooterButton` children with text content |
| `buttonVariants` | Use `variant` prop on each `FooterButton` |
| `leftSideButton` | Use `leftSide` prop on `FooterButton` |
| `onButtonClick` | Use `onClick` on each `FooterButton` |

```tsx
// Before
<Footer buttonCount={2} buttonTexts={['Cancel', 'Save']} buttonVariants={['secondary', 'primary']} />

// After
<Footer>
  <FooterButton variant="secondary">Cancel</FooterButton>
  <FooterButton variant="primary">Save</FooterButton>
</Footer>
```

### Tour
| Removed Prop | Replacement |
|---|---|
| `steps` | Use `TourStep` composable children |

```tsx
// Before
<Tour open steps={[{ title: 'Welcome', description: 'Hello!' }]} />

// After
<Tour open>
  <TourStep title="Welcome">Hello!</TourStep>
</Tour>
```

### Transfer
| Removed Prop | Replacement |
|---|---|
| `dataSource` | Use `TransferItem` composable children |
| `showSearch` | Removed (search always available or use CSS) |

```tsx
// Before
<Transfer dataSource={[{ key: '1', title: 'Item 1' }]} />

// After
<Transfer>
  <TransferItem id="1" title="Item 1" />
</Transfer>
```

### TreeSelect
| Removed Prop | Replacement |
|---|---|
| `treeData` | Use `TreeNode` composable children |

```tsx
// Before
<TreeSelect treeData={[{ key: 'node1', title: 'Node 1', children: [...] }]} />

// After
<TreeSelect>
  <TreeNode key="node1" title="Node 1">
    <TreeNode key="child1" title="Child 1" />
  </TreeNode>
</TreeSelect>
```

### Anchor
| Removed Prop | Replacement |
|---|---|
| `items` | Use `AnchorLink` composable children |
| `showInkInFixed` | Removed (use custom styling) |

```tsx
// Before
<Anchor items={[{ href: '#s1', title: 'Section 1' }]} />

// After
<Anchor>
  <AnchorLink href="#s1" title="Section 1" />
</Anchor>
```

### SegmentedTabs
| Removed Prop | Replacement |
|---|---|
| `items` | Use `SegmentedTabItem` composable children |

```tsx
// Before
<SegmentedTabs items={[{ label: 'Tab 1', value: 'tab1' }]} />

// After
<SegmentedTabs>
  <SegmentedTabItem value="tab1">Tab 1</SegmentedTabItem>
</SegmentedTabs>
```

### StackedBarChart
| Removed Prop | Replacement |
|---|---|
| `data` | Use `StackedBarChartBar` / `StackedBarChartSegment` composable children |

```tsx
// Before
<StackedBarChart data={[{ label: 'A', segments: [{ label: 's1', value: 10, color: '#f00' }] }]} />

// After
<StackedBarChart>
  <StackedBarChartBar label="A">
    <StackedBarChartSegment label="s1" value={10} color="#f00" />
  </StackedBarChartBar>
</StackedBarChart>
```

### Chicklet
| Removed Prop | Replacement |
|---|---|
| `showClose` | Derived from `onClose` presence |
| `closable` | Derived from `onClose` presence |

```tsx
// Before
<Chicklet label="Tag" closable />

// After
<Chicklet label="Tag" onClose={() => handleRemove()} />
```

### ColorPicker
| Removed Prop | Replacement |
|---|---|
| `showText` | Text is always shown |

```tsx
// Before
<ColorPicker showText defaultValue="#1677ff" />

// After
<ColorPicker defaultValue="#1677ff" />
```

### SimpleColumnLayout (Deprecated)

The entire `SimpleColumnLayout` component is deprecated. Use `Table` directly:

```tsx
// Before
<SimpleColumnLayout rows={[{ left: { title: 'Name' }, right: { title: 'John' } }]} />

// After
<Table>
  <TableHeader>
    <TableRow><TableHead>Label</TableHead><TableHead>Value</TableHead></TableRow>
  </TableHeader>
  <TableBody>
    <TableRow><TableCell>Name</TableCell><TableCell>John</TableCell></TableRow>
  </TableBody>
</Table>
```

---

## CI Enforcement

All waves are enforced in CI via:

```bash
npm run check:legacy-waves
```

This runs all wave scanners with `--fail-on-match`, ensuring zero deprecated API usage across the codebase.

Individual wave reports:
```bash
npm run codemod:wave2:report
npm run codemod:wave3:report
npm run codemod:wave4:report
npm run codemod:wave7:report
npm run codemod:wave8:report
```
