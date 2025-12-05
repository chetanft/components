# Migration Guide: Declarative to Composable API

## Overview

FT Design System v4.x introduces a composable API pattern inspired by Shadcn/ui and Radix UI. This guide helps migrate from the legacy declarative API to the new composable pattern.

## Why Migrate?

1. **Flexibility** - Compose components exactly how you need them
2. **Tree-shaking** - Only import what you use
3. **Accessibility** - Better control over ARIA attributes
4. **Type Safety** - Improved TypeScript inference
5. **Maintainability** - Smaller, focused sub-components

## General Pattern

### Before (Declarative - Deprecated)
```tsx
<Component
  title="Title"
  description="Description"
  actions={[<Button>Action</Button>]}
/>
```

### After (Composable - Recommended)
```tsx
<Component>
  <ComponentHeader>
    <ComponentTitle>Title</ComponentTitle>
    <ComponentDescription>Description</ComponentDescription>
  </ComponentHeader>
  <ComponentContent>
    {/* content */}
  </ComponentContent>
  <ComponentFooter>
    <ComponentActions>
      <Button>Action</Button>
    </ComponentActions>
  </ComponentFooter>
</Component>
```

---

## Component Migration Examples

### Card

#### Before
```tsx
<Card
  title="Card Title"
  description="Card description"
  content={<p>Main content</p>}
  cover={<img src="/image.jpg" alt="Cover" />}
  actions={[
    <Button key="1">Action 1</Button>,
    <Button key="2">Action 2</Button>
  ]}
/>
```

#### After
```tsx
<Card bordered hoverable>
  <CardImage src="/image.jpg" alt="Cover" aspectRatio="16/9" />
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardBody>
    <p>Main content</p>
  </CardBody>
  <CardFooter>
    <CardActions>
      <Button>Action 1</Button>
      <Button>Action 2</Button>
    </CardActions>
  </CardFooter>
</Card>
```

---

### Table with Selection

#### Before
```tsx
<Table
  columns={columns}
  data={data}
  selectable
  onSelectionChange={(selectedIds) => setSelected(selectedIds)}
  striped
  bordered
/>
```

#### After
```tsx
<TableSelectionProvider
  selectedRows={selected}
  onSelectionChange={setSelected}
  allRowIds={data.map(row => row.id)}
>
  <Table striped bordered>
    <TableHeader>
      <TableRow>
        <TableHead><TableSelectAll /></TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Email</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.map(row => (
        <TableRow key={row.id}>
          <TableCell><TableRowSelect rowId={row.id} /></TableCell>
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.email}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableSelectionProvider>
```

---

### Modal

#### Before
```tsx
<Modal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  footer={
    <div className="flex gap-2">
      <Button onClick={() => setIsOpen(false)}>Cancel</Button>
      <Button variant="primary">Save</Button>
    </div>
  }
>
  <p>Modal content</p>
</Modal>
```

#### After
```tsx
<Modal open={isOpen} onOpenChange={setIsOpen}>
  <ModalTrigger asChild>
    <Button>Open Modal</Button>
  </ModalTrigger>
  <ModalContent>
    <ModalHeader>
      <ModalTitle>Modal Title</ModalTitle>
      <ModalClose />
    </ModalHeader>
    <ModalBody>
      <p>Modal content</p>
    </ModalBody>
    <ModalFooter>
      <Button onClick={() => setIsOpen(false)}>Cancel</Button>
      <Button variant="primary">Save</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
```

---

### Dropdown

#### Before
```tsx
<Dropdown
  options={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ]}
  value={selected}
  onChange={setSelected}
  placeholder="Select an option"
  label="Choose option"
/>
```

#### After
```tsx
<Dropdown value={selected} onChange={setSelected}>
  <DropdownTrigger>
    <Button variant="secondary">
      {selected || 'Select an option'}
      <Icon name="chevron-down" />
    </Button>
  </DropdownTrigger>
  <DropdownContent>
    <DropdownItem value="1">Option 1</DropdownItem>
    <DropdownItem value="2">Option 2</DropdownItem>
    <DropdownItem value="3">Option 3</DropdownItem>
  </DropdownContent>
</Dropdown>
```

---

### Pagination

#### Before
```tsx
<Pagination
  current={page}
  total={100}
  pageSize={10}
  onChange={setPage}
  showSizeChanger
  showQuickJumper
/>
```

#### After
```tsx
<Pagination
  current={page}
  total={100}
  pageSize={pageSize}
  onChange={setPage}
>
  <PaginationList>
    <PaginationPrevious />
    <PaginationItem page={1} />
    <PaginationEllipsis />
    <PaginationItem page={page} />
    <PaginationEllipsis />
    <PaginationItem page={10} />
    <PaginationNext />
  </PaginationList>
  <PaginationSizeChanger options={[10, 20, 50]} />
  <PaginationQuickJumper />
</Pagination>
```

---

### Button with Icon

#### Before
```tsx
<Button
  icon="add"
  iconPosition="leading"
  loading={isLoading}
>
  Add Item
</Button>
```

#### After
```tsx
<Button>
  {isLoading ? (
    <ButtonSpinner />
  ) : (
    <ButtonIcon name="add" />
  )}
  <ButtonText>Add Item</ButtonText>
</Button>
```

---

### RadioGroup

#### Before
```tsx
<RadioGroup
  options={[
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
    { value: 'c', label: 'Option C' },
  ]}
  value={selected}
  onChange={setSelected}
/>
```

#### After
```tsx
<RadioGroup value={selected} onValueChange={setSelected}>
  <RadioItem value="a">
    <RadioItemInput />
    <RadioItemLabel>Option A</RadioItemLabel>
  </RadioItem>
  <RadioItem value="b">
    <RadioItemInput />
    <RadioItemLabel>Option B</RadioItemLabel>
  </RadioItem>
  <RadioItem value="c">
    <RadioItemInput />
    <RadioItemLabel>Option C</RadioItemLabel>
  </RadioItem>
</RadioGroup>
```

---

## Using asChild Pattern

The asChild prop allows you to merge component props onto a custom child element:

```tsx
// Without asChild - renders a button
<Button>Click me</Button>

// With asChild - renders custom element with Button styles
<Button asChild>
  <a href="/link">Click me</a>
</Button>
```

This works with all composable sub-components:

```tsx
<ModalTrigger asChild>
  <CustomButton />  {/* Gets trigger behavior */}
</ModalTrigger>

<CardBody asChild>
  <section>  {/* Becomes the card body */}
    Content
  </section>
</CardBody>
```

---

## Event Handler Changes

| Old Handler | New Handler | Components |
|-------------|-------------|------------|
| onChange (for selection) | onValueChange | Select, RadioGroup |
| onSelect | onValueChange | Dropdown |
| onClose | onOpenChange(false) | Modal, Drawer |

---

## Deprecation Timeline

| Version | Status |
|---------|--------|
| v4.14 | Deprecation warnings in development mode |
| v4.15 | Documentation updated, migration guide published |
| v4.16 | Console warnings in all environments |
| v5.0 | Deprecated props removed |

---

## Tips for Migration

1. Start with new components - Use composable API for new features
2. Migrate incrementally - Update one component at a time
3. Check console warnings - Deprecation warnings show migration hints
4. Use TypeScript - Type errors will guide you to correct patterns
5. Reference Storybook - Examples show correct composable patterns

---

## Need Help?

- Check the component documentation at /docs/components
- View Storybook examples
- File an issue on GitHub
