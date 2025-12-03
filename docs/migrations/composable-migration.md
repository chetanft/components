# Composable Components Migration Guide

## Overview

FT Design System has been refactored to support a **composable, LEGO-style architecture** inspired by Shadcn UI. All priority components now support both:

1. **Composable API** (recommended) - Maximum flexibility and control
2. **Declarative API** (deprecated) - Simpler but less flexible, maintained for backward compatibility

This guide helps you migrate from the declarative API to the composable API.

---

## Table Component

### Before (Declarative API - Deprecated)

```tsx
<Table 
  columns={columns} 
  data={data}
  selectable
  onSelectionChange={(selected) => console.log(selected)}
  onSort={(column, direction) => console.log(column, direction)}
/>
```

### After (Composable API - Recommended)

```tsx
<Table>
  <TableCaption>Monthly Sales Data</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead sortable sortDirection="asc" onSort={() => handleSort('name')}>
        Email
      </TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
      <TableCell>
        <Badge variant="success">Active</Badge>
      </TableCell>
    </TableRow>
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={3} className="text-right font-semibold">
        Total: $1,234.56
      </TableCell>
    </TableRow>
  </TableFooter>
</Table>
```

### Key Changes

- **TableHeader**: Use `<TableHeader>` with `<TableRow>` and `<TableHead>` instead of `columns` prop
- **TableBody**: Use `<TableBody>` with `<TableRow>` and `<TableCell>` instead of `data` prop
- **TableFooter**: New component for footer rows
- **TableCaption**: New component for accessible table descriptions
- **Full Control**: You can now nest any components inside cells (Badges, Buttons, Icons, etc.)

### Migration Steps

1. Replace `columns` prop with `<TableHeader>` containing `<TableRow>` and `<TableHead>` components
2. Replace `data` prop with `<TableBody>` containing `<TableRow>` and `<TableCell>` components
3. Add `<TableFooter>` if you need footer rows
4. Add `<TableCaption>` for accessibility

---

## Modal Component

### Before (Declarative API - Deprecated)

```tsx
const [open, setOpen] = useState(false);

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Confirm Action"
  footer={
    <>
      <Button onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
    </>
  }
>
  <p>Are you sure you want to proceed?</p>
</Modal>
```

### After (Composable API - Recommended)

```tsx
const [open, setOpen] = useState(false);

<Modal open={open} onOpenChange={setOpen}>
  <ModalTrigger>
    <Button>Open Modal</Button>
  </ModalTrigger>
  <ModalContent>
    <ModalHeader>
      <ModalTitle>Confirm Action</ModalTitle>
      <ModalDescription>
        This action cannot be undone.
      </ModalDescription>
      <ModalClose />
    </ModalHeader>
    <ModalBody>
      <p>Are you sure you want to proceed?</p>
    </ModalBody>
    <ModalFooter>
      <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
```

### Key Changes

- **ModalTrigger**: New component for trigger button (optional, can still use external button)
- **ModalContent**: Wraps all modal content
- **ModalHeader**: Contains title and description
- **ModalTitle**: Replaces `title` prop
- **ModalDescription**: New component for accessible descriptions
- **ModalBody**: Contains main content
- **ModalFooter**: Replaces `footer` prop
- **ModalClose**: New component for close button

### Migration Steps

1. Wrap modal content with `<ModalContent>`
2. Replace `title` prop with `<ModalTitle>` inside `<ModalHeader>`
3. Replace `footer` prop with `<ModalFooter>` containing your buttons
4. Add `<ModalBody>` wrapper around main content
5. Use `<ModalClose />` for close button (or keep `closable` prop)
6. Optionally use `<ModalTrigger>` for trigger button

---

## Drawer Component

### Before (Declarative API - Deprecated)

```tsx
const [open, setOpen] = useState(false);

<Drawer
  open={open}
  onClose={() => setOpen(false)}
  title="Settings"
  placement="right"
  width={400}
  footer={<Button onClick={() => setOpen(false)}>Close</Button>}
>
  <p>Drawer content goes here</p>
</Drawer>
```

### After (Composable API - Recommended)

```tsx
const [open, setOpen] = useState(false);

<Drawer open={open} onOpenChange={setOpen}>
  <DrawerTrigger>
    <Button>Open Drawer</Button>
  </DrawerTrigger>
  <DrawerContent placement="right" width={400}>
    <DrawerHeader>
      <DrawerTitle>Settings</DrawerTitle>
      <DrawerDescription>
        Configure your preferences
      </DrawerDescription>
      <DrawerClose />
    </DrawerHeader>
    <DrawerBody>
      <p>Drawer content goes here</p>
    </DrawerBody>
    <DrawerFooter>
      <Button onClick={() => setOpen(false)}>Close</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

### Key Changes

- **DrawerTrigger**: New component for trigger button
- **DrawerContent**: Wraps all drawer content, accepts `placement`, `width`, `height` props
- **DrawerHeader**: Contains title and description
- **DrawerTitle**: Replaces `title` prop
- **DrawerDescription**: New component for accessible descriptions
- **DrawerBody**: Contains main content
- **DrawerFooter**: Replaces `footer` prop
- **DrawerClose**: New component for close button

### Migration Steps

1. Move `placement`, `width`, `height` props to `<DrawerContent>`
2. Wrap drawer content with `<DrawerContent>`
3. Replace `title` prop with `<DrawerTitle>` inside `<DrawerHeader>`
4. Replace `footer` prop with `<DrawerFooter>`
5. Add `<DrawerBody>` wrapper around main content
6. Use `<DrawerClose />` for close button

---

## Button Component

### Before (Standard API)

```tsx
<Button variant="primary" icon="add" iconPosition="leading">
  Add Item
</Button>
```

### After (Composable API - Optional Enhancement)

```tsx
// Still works - no changes required!
<Button variant="primary" icon="add" iconPosition="leading">
  Add Item
</Button>

// Or use composable API for more control
<Button variant="primary">
  <ButtonIcon icon="add" />
  <ButtonText>Add Item</ButtonText>
</Button>

// With asChild for custom elements
<Button asChild>
  <a href="/about">Link Button</a>
</Button>
```

### Key Changes

- **ButtonIcon**: New composable sub-component for icons
- **ButtonText**: New composable sub-component for text
- **asChild**: New prop to merge props with child element
- **Default variant**: Now defaults to `primary` (no need to specify)

### Migration Steps

- **No migration required** - existing code continues to work
- Optionally refactor to use `<ButtonIcon>` and `<ButtonText>` for more control
- Use `asChild` when you need to wrap custom elements

---

## Badge Component

### Before (Standard API)

```tsx
<Badge variant="success" leadingIcon="check">Active</Badge>
```

### After (Composable API - Optional Enhancement)

```tsx
// Still works - no changes required!
<Badge variant="success" leadingIcon="check">Active</Badge>

// Or use composable API
<Badge variant="success">
  <BadgeIcon icon="check" />
  <BadgeText>Active</BadgeText>
</Badge>

// With asChild
<Badge variant="info" asChild>
  <span>Custom Badge</span>
</Badge>
```

### Key Changes

- **BadgeIcon**: New composable sub-component for icons
- **BadgeText**: New composable sub-component for text
- **asChild**: New prop to merge props with child element
- **Shadcn-style**: Simple API like `<Badge variant="success" size="sm">Active</Badge>`

### Migration Steps

- **No migration required** - existing code continues to work
- Optionally refactor to use `<BadgeIcon>` and `<BadgeText>` for more control
- Use `asChild` when you need to wrap custom elements

---

## Common Patterns

### Using `asChild` Prop

The `asChild` prop allows components to merge their props with a child element instead of rendering a wrapper:

```tsx
// Without asChild - renders a button wrapper
<Button className="custom-class">
  <a href="/about">Link</a>
</Button>
// Result: <button class="custom-class"><a>Link</a></button>

// With asChild - merges props with anchor
<Button asChild className="custom-class">
  <a href="/about">Link</a>
</Button>
// Result: <a href="/about" class="custom-class">Link</a>
```

### Composing Multiple Components

All composable components can be nested and combined:

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>
        <div className="flex items-center gap-2">
          <Icon name="user" />
          <span>User</span>
        </div>
      </TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>
        <Badge variant="success">
          <BadgeIcon icon="check" />
          <BadgeText>Active</BadgeText>
        </Badge>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### className Overrides

All components support `className` prop for custom styling:

```tsx
<Table className="my-custom-table">
  <TableHeader className="bg-gray-100">
    {/* ... */}
  </TableHeader>
</Table>
```

---

## Benefits of Composable API

1. **Maximum Flexibility**: Compose components exactly how you need them
2. **Better Type Safety**: TypeScript can better infer types with explicit components
3. **Easier Customization**: Override styles at any level with `className`
4. **AI-Friendly**: Clear component structure helps AI tools understand your code
5. **Future-Proof**: New features can be added without breaking existing code

---

## Backward Compatibility

- **All old APIs still work** - no breaking changes
- **Deprecation warnings** shown in development mode
- **Gradual migration** - migrate components one at a time
- **No rush** - old API will be supported for multiple versions

---

## FAQ

### Do I need to migrate immediately?

No. The declarative API is deprecated but still fully functional. Migrate when convenient.

### Will the old API be removed?

Not in the near future. We'll maintain backward compatibility for multiple versions.

### Can I mix old and new APIs?

Yes, but it's not recommended. Mixing APIs can lead to confusion and unexpected behavior.

### What if I find a bug?

Please report it! We're committed to maintaining both APIs during the transition period.

---

## Need Help?

- Check component JSDoc for detailed examples
- See Storybook stories for live examples
- Open an issue on GitHub for questions or bugs

