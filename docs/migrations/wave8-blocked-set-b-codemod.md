# Wave 8 Blocked Set B Codemod

Week 8 tracks the second set of blocked components that relied on declarative-only shapes or deprecated boolean props:

**Group 1 — Composable children migration:**
- `Footer` (`buttonCount`, `buttonTexts`, `buttonVariants`, `leftSideButton`, `onButtonClick`)
- `Tour` (`steps`)
- `Transfer` (`dataSource`, `showSearch`)
- `TreeSelect` (`treeData`)
- `SegmentedTabs` (`items`)
- `StackedBarChart` (`data`)

**Group 2 — New sub-components built + migration:**
- `Result` (`title`, `subTitle`, `icon`, `extra`) → use `ResultIcon`, `ResultTitle`, `ResultSubtitle`, `ResultExtra`
- `Anchor` (`items`, `showInkInFixed`) → use `AnchorLink` children

**Group 3 — Boolean prop normalization:**
- `Chicklet` (`showClose`, `closable`) → closability derived from `onClose` presence
- `ColorPicker` (`showText`) → text is always shown

**Group 4 — Whole-component deprecation:**
- `SimpleColumnLayout` → use `Table` directly

## Script

- `scripts/codemods/wave8-blocked-set-b-components.cjs`

## Run

```bash
npm run codemod:wave8:report
```

Optional enforcement:

```bash
npm run codemod:wave8:check
```

## Migration Examples

### Result
```tsx
// Before (deprecated)
<Result status="success" title="Done!" subTitle="All good." extra={<Button>OK</Button>} />

// After (composable)
<Result status="success">
  <ResultIcon><ResultStatusIcon status="success" /></ResultIcon>
  <ResultTitle>Done!</ResultTitle>
  <ResultSubtitle>All good.</ResultSubtitle>
  <ResultExtra><Button>OK</Button></ResultExtra>
</Result>
```

### Anchor
```tsx
// Before (deprecated)
<Anchor items={[{ href: '#s1', title: 'Section 1' }]} />

// After (composable)
<Anchor>
  <AnchorLink href="#s1" title="Section 1" />
</Anchor>
```

### Footer
```tsx
// Before (deprecated)
<Footer buttonCount={2} buttonTexts={['Cancel', 'Save']} />

// After (composable)
<Footer>
  <FooterButton variant="secondary">Cancel</FooterButton>
  <FooterButton variant="primary">Save</FooterButton>
</Footer>
```

### Chicklet
```tsx
// Before (deprecated)
<Chicklet label="Tag" closable />

// After
<Chicklet label="Tag" onClose={() => handleRemove()} />
```

### ColorPicker
```tsx
// Before (deprecated)
<ColorPicker showText defaultValue="#1677ff" />

// After (text always shown)
<ColorPicker defaultValue="#1677ff" />
```

### SimpleColumnLayout
```tsx
// Before (deprecated)
<SimpleColumnLayout rows={[...]} />

// After (use Table directly)
<Table>
  <TableHeader>
    <TableRow><TableHead>Label</TableHead><TableHead>Value</TableHead></TableRow>
  </TableHeader>
  <TableBody>
    <TableRow><TableCell>Name</TableCell><TableCell>John</TableCell></TableRow>
  </TableBody>
</Table>
```

## Notes

- Wave 8 has been migrated to composable usages across docs/stories/runtime call sites.
- `codemod:wave8:check` is now used as an enforcement gate (zero matches required).
- The scanner ignores component implementation files where internal usage may remain.
