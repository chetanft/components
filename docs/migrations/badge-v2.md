# Badge Variant Migration Guide

## Overview

Badge component variants have been standardized to align with status component conventions. The `normal` and `danger` variants are deprecated in favor of `default` and `error`.

---

## Breaking Changes

None - all changes are backward compatible with deprecation warnings.

---

## Variant Name Changes

### Old → New Mapping

| Old (Deprecated) | New (Standard) | Notes |
|------------------|----------------|-------|
| `normal` | `default` | Default/neutral state |
| `danger` | `error` | Error/destructive state |
| `success` | `success` | ✅ No change |
| `warning` | `warning` | ✅ No change |
| `neutral` | `neutral` | ✅ No change |
| - | `info` | ✨ NEW - informational state |

---

## Migration Examples

### Simple Replacement

**Before**:
```tsx
<Badge variant="normal">Label</Badge>
<Badge variant="danger">Error</Badge>
```

**After**:
```tsx
<Badge variant="default">Label</Badge>
<Badge variant="error">Error</Badge>
```

### With Conditional Logic

**Before**:
```tsx
<Badge variant={hasError ? 'danger' : 'normal'}>
  Status
</Badge>
```

**After**:
```tsx
<Badge variant={hasError ? 'error' : 'default'}>
  Status
</Badge>
```

### New Info Variant

```tsx
// NEW: For informational messages
<Badge variant="info">Beta</Badge>
<Badge variant="info">New Feature</Badge>
```

---

## Updated Type Definition

```typescript
interface BadgeProps {
  /**
   * Badge variant for semantic coloring.
   * @default 'default'
   */
  variant?: 
    | 'default'  // NEW (replaces 'normal')
    | 'error'    // NEW (replaces 'danger')
    | 'success'
    | 'warning'
    | 'info'     // NEW
    | 'neutral'
    | 'normal'   // DEPRECATED
    | 'danger';  // DEPRECATED
}
```

---

## Migration Steps

### Step 1: Find All Badge Usage

```bash
# Search your codebase
grep -r "variant=\"normal\"" .
grep -r "variant=\"danger\"" .
grep -r "variant='normal'" .
grep -r "variant='danger'" .
```

### Step 2: Replace Deprecated Variants

**Find and Replace**:
- `variant="normal"` → `variant="default"`
- `variant='normal'` → `variant='default'`
- `variant="danger"` → `variant="error"`
- `variant='danger'` → `variant='error'`

### Step 3: Update Dynamic Variants

```tsx
// Before
const getVariant = (status) => {
  if (status === 'failed') return 'danger';
  if (status === 'pending') return 'normal';
  return 'success';
};

// After
const getVariant = (status) => {
  if (status === 'failed') return 'error';
  if (status === 'pending') return 'default';
  return 'success';
};
```

### Step 4: Test

- Verify badges still render correctly
- Check console for deprecation warnings
- Confirm colors match expectations

---

## Deprecation Warnings

When using deprecated variants, you'll see console warnings:

```
Badge: `variant="normal"` is deprecated. Use `variant="default"` instead.
Badge: `variant="danger"` is deprecated. Use `variant="error"` instead.
```

These warnings help identify code that needs updating.

---

## Visual Changes

**None** - The colors remain identical:
- `normal` and `default` use the same styles
- `danger` and `error` use the same styles

This is purely an API standardization with no visual impact.

---

## Why This Change?

### Consistency Across Components

**Status Components** now use standardized variants:
- Alert: `default`, `success`, `warning`, `error`, `info`
- Badge: `default`, `success`, `warning`, `error`, `info`
- Notification: `default`, `success`, `warning`, `error`, `info`

### Industry Standards

Aligns with common design system conventions:
- Material UI uses `error` (not `danger`)
- Chakra UI uses `error` (not `danger`)
- Ant Design uses `default` (not `normal`)

---

## Timeline

- **v2.x**: `normal` and `danger` deprecated, both work
- **v3.0.0**: `normal` and `danger` removed

---

## Complete Example

```tsx
import { Badge } from '@ft-ds/components';

// ✅ Recommended (new standard names)
<Badge variant="default">Default</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="neutral">Neutral</Badge>

// ⚠️ Deprecated (still works, shows warning)
<Badge variant="normal">Normal</Badge>
<Badge variant="danger">Danger</Badge>
```

---

## Need Help?

- Check Badge.stories.tsx for visual examples
- Review [Variant Name Standardization](../implementation_plan.md#variant-name-standardization)
- Contact the design system team for questions
