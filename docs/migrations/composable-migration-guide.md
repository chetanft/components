# Composable API Migration Guide

This guide helps migrate components from declarative APIs (variant props, boolean flags, data arrays) to composable APIs (LEGO-style composition).

---

## Migration Principles

1. **Backward Compatibility**: Support both APIs during transition (mark old as deprecated)
2. **Gradual Migration**: Migrate one component at a time
3. **Documentation**: Update JSDoc, stories, and examples
4. **Testing**: Ensure all tests pass with new API

---

## Common Migration Patterns

### Pattern 1: Variant Props → Composition

**Before**:
```tsx
<Badge variant="success">Active</Badge>
```

**After**:
```tsx
<Badge>
  <BadgeIcon icon="check" />
  <BadgeText>Active</BadgeText>
</Badge>
```

**Steps**:
1. Create sub-components (`BadgeIcon`, `BadgeText`)
2. Remove `variant` prop from main component
3. Use CSS classes for styling instead
4. Update all usages

---

### Pattern 2: Boolean Flags → Conditional Rendering

**Before**:
```tsx
<Alert showIcon={true} closable={true} />
```

**After**:
```tsx
<Alert>
  {hasIcon && <AlertIcon />}
  <AlertTitle>Title</AlertTitle>
  {isClosable && <AlertClose />}
</Alert>
```

**Steps**:
1. Create sub-components for optional elements
2. Remove boolean flags
3. Use conditional rendering in parent
4. Update all usages

---

### Pattern 3: Data Arrays → Children Composition

**Before**:
```tsx
<Table columns={columns} data={data} />
```

**After**:
```tsx
<Table>
  <Table.Header>
    <Table.Row>
      {columns.map(col => (
        <Table.HeaderCell key={col.key}>{col.title}</Table.HeaderCell>
      ))}
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {data.map(row => (
      <Table.Row key={row.id}>
        {columns.map(col => (
          <Table.Cell key={col.key}>{row[col.key]}</Table.Cell>
        ))}
      </Table.Row>
    ))}
  </Table.Body>
</Table>
```

**Steps**:
1. Create sub-components (`Table.Header`, `Table.Body`, `Table.Row`, `Table.Cell`)
2. Remove `columns` and `data` props
3. Move data iteration to parent
4. Update all usages

---

### Pattern 4: Layout Logic → Parent Control

**Before**:
```tsx
<ButtonGroup>
  <Button>Save</Button>
  <Button>Cancel</Button>
</ButtonGroup>
// ButtonGroup adds flexbox and gap internally
```

**After**:
```tsx
<div className="flex gap-4">
  <Button>Save</Button>
  <Button>Cancel</Button>
</div>
```

**Steps**:
1. Remove layout logic from component
2. Let parent control spacing/layout
3. Component focuses on its own structure
4. Update all usages

---

## Component-Specific Migrations

### Table Component

**Migration Steps**:
1. ✅ Create `Table.Header`, `Table.Body`, `Table.Row`, `Table.Cell`, `Table.HeaderCell` sub-components
2. ⬜ Deprecate `columns` and `data` props
3. ⬜ Remove `variant` prop
4. ⬜ Remove boolean flags (`sortable`, `selectable`)
5. ⬜ Update Storybook stories
6. ⬜ Update all usages in codebase
7. ⬜ Remove deprecated props in next major version

**Example Migration**:
```tsx
// Old API (deprecated)
<Table 
  columns={[
    { key: 'name', title: 'Name' },
    { key: 'email', title: 'Email' }
  ]}
  data={users}
  variant="primary"
/>

// New API (composable)
<Table>
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>Name</Table.HeaderCell>
      <Table.HeaderCell>Email</Table.HeaderCell>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {users.map(user => (
      <Table.Row key={user.id}>
        <Table.Cell>{user.name}</Table.Cell>
        <Table.Cell>{user.email}</Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
</Table>
```

---

### Alert Component

**Migration Steps**:
1. ✅ Composable API already exists
2. ⬜ Mark deprecated props with `@deprecated` JSDoc
3. ⬜ Add migration examples in JSDoc
4. ⬜ Update Storybook to prioritize composable examples
5. ⬜ Plan removal of deprecated props in next major version

**Example Migration**:
```tsx
// Old API (deprecated)
<Alert 
  variant="info"
  title="Information"
  message="This is a message"
  icon="info"
  closable={true}
/>

// New API (composable)
<Alert variant="info">
  <AlertIcon />
  <AlertTitle>Information</AlertTitle>
  <AlertDescription>This is a message</AlertDescription>
  <AlertClose />
</Alert>
```

---

## Migration Checklist

For each component migration:

- [ ] Review current API and identify issues
- [ ] Design composable API structure
- [ ] Create sub-components if needed
- [ ] Implement composable API
- [ ] Mark old props as deprecated
- [ ] Add JSDoc with `@deprecated` and migration examples
- [ ] Update Storybook stories (add composable examples, mark old as deprecated)
- [ ] Update tests
- [ ] Update all usages in codebase
- [ ] Document in migration guide
- [ ] Update progress tracking

---

## Best Practices

1. **Use TypeScript**: Leverage TypeScript for type safety during migration
2. **Incremental**: Support both APIs during transition period
3. **Documentation**: Always update JSDoc and examples
4. **Testing**: Write tests for both old and new APIs
5. **Communication**: Notify team of breaking changes

---

## Related Documents

- [Composable Audit Rubric](../standards/composable-audit-rubric.md)
- [Component Guidelines](../../CONTRIBUTING.md)
- [FT Design Tokens Reference](../../DESIGN_TOKENS_REFERENCE.md)

