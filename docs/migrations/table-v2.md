# Table Component Migration Guide (v2)

This guide outlines the changes in the Table component API and how to migrate your existing code.

## Key Changes

1. **Column Header**: `title` and `label` props are deprecated. Use `header` instead.
2. **Render Function**: `render` prop is deprecated. Use `cell` instead.
3. **Render Signature**: `cell` function receives `(row, context)` instead of `(value, row, index)`.
4. **Data Access**: Added `accessorKey` for explicit data access (optional).

## Migration Examples

### 1. Basic Column Definition

**Before:**
```typescript
{
  key: 'name',
  title: 'Name', // or label: 'Name'
  type: 'text'
}
```

**After:**
```typescript
{
  key: 'name',
  header: 'Name',
  type: 'text'
}
```

### 2. Custom Cell Rendering

**Before:**
```typescript
{
  key: 'status',
  title: 'Status',
  render: (value, row, index) => (
    <Badge>{value}</Badge>
  )
}
```

**After:**
```typescript
{
  key: 'status',
  header: 'Status',
  cell: (row, { value }) => (
    <Badge>{value}</Badge>
  )
}
```

### 3. Accessing Row Data

**Before:**
```typescript
{
  key: 'actions',
  render: (_, row) => (
    <Button onClick={() => handleDelete(row.id)}>Delete</Button>
  )
}
```

**After:**
```typescript
{
  key: 'actions',
  header: 'Actions',
  cell: (row) => (
    <Button onClick={() => handleDelete(row.id)}>Delete</Button>
  )
}
```

## TypeScript Interface

The `TableColumn` interface has been updated:

Note: table-related shared types now live in `src/components/organisms/Table/TableTypes.ts` for internal imports. Public exports are still available from `Table`.

```typescript
export interface TableColumn<T = any> {
  key: string;
  header?: string | React.ReactNode; // New
  cell?: (row: T, context: CellContext<T>) => React.ReactNode; // New
  accessorKey?: string; // New
  
  // Deprecated
  title?: string;
  label?: string;
  render?: (value: any, row: T, index: number) => React.ReactNode;
  
  // ... existing props
}
```

## Backward Compatibility

The Table component currently supports both the old and new APIs. However, console warnings may be logged when using deprecated props. We recommend migrating to the new API as soon as possible.
