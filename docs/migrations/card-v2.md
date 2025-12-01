# Card Component Migration Guide (v2)

This guide outlines the changes in the Card component API and how to migrate your existing code.

## Key Changes

1. **Size Prop Standardization**: `size` values `default` and `small` are deprecated.
   - `default` -> `md` (Standard padding)
   - `small` -> `sm` (Compact padding)

   **IMPORTANT**: The behavior of `default` and `small` has been corrected.
   - Previously: `default` = Compact, `small` = Standard (Inverted logic)
   - Now: `md` (default) = Standard, `sm` = Compact

   If you were relying on `size="default"` for compact cards, migrate to `size="sm"`.
   If you were relying on `size="small"` for standard cards, migrate to `size="md"`.

2. **Legacy Props**: `title`, `content`, `extra` are deprecated in favor of the new composable API (`headerTitle`, `bodySections`, etc.) or children.

## Migration Examples

### 1. Size Prop

**Before:**
```tsx
// Compact card (was default)
<Card size="default">Content</Card>

// Standard card (was small)
<Card size="small">Content</Card>
```

**After:**
```tsx
// Compact card
<Card size="sm">Content</Card>

// Standard card
<Card size="md">Content</Card>
```
