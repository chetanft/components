# Modal Size Presets Migration Guide

## Overview

Modal component now supports size presets for consistent, predictable sizing. The manual `width` prop is still supported for custom cases.

---

## Breaking Changes

None - `width` prop still works, size presets are additive.

---

## New Size Prop

### Available Sizes

| Size | Width | Use Case |
|------|-------|----------|
| `sm` | 400px | Confirmations, alerts |
| `md` | 520px | **Default** - Forms, dialogs |
| `lg` | 720px | Detailed forms |
| `xl` | 960px | Complex workflows |
| `full` | 90vw | Full-screen experience |

**Default**: If neither `size` nor `width` is specified, Modal uses `md` (520px).

---

## Usage Examples

### Before (Manual Width)

```tsx
<Modal
  isOpen={isOpen}
  onClose={onClose}
  width="400px"  // Manual width
>
  Content
</Modal>
```

### After (Size Presets)

```tsx
<Modal
  isOpen={isOpen}
  onClose={onClose}
  size="sm"  // Preset size
>
  Content
</Modal>
```

### All Sizes

```tsx
// Small - Quick confirmations
<Modal size="sm" isOpen={isOpen} onClose={onClose}>
  Are you sure you want to delete this item?
</Modal>

// Medium (Default) - Standard forms
<Modal size="md" isOpen={isOpen} onClose={onClose}>
  <Form />
</Modal>

// Large - Detailed forms
<Modal size="lg" isOpen={isOpen} onClose={onClose}>
  <DetailedForm />
</Modal>

// Extra Large - Complex workflows
<Modal size="xl" isOpen={isOpen} onClose={onClose}>
  <MultiStepWizard />
</Modal>

// Full - Immersive experience
<Modal size="full" isOpen={isOpen} onClose={onClose}>
  <FullScreenEditor />
</Modal>
```

---

## Width Override

The `width` prop still works and **overrides** the size preset:

```tsx
// Size preset
<Modal size="md">  // 520px

// Width override takes precedence
<Modal size="md" width="600px">  // 600px (not 520px)

// Custom width without size
<Modal width="450px">  // 450px
```

**When to use width**:
- Need exact pixel value
- Have specific design requirements
- Size presets don't fit your use case

---

## Updated Type Definition

```typescript
interface ModalProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';  // NEW
  width?: string;  // Existing, still supported
  // ... other props
}
```

---

## Migration Steps

### Step 1: Identify Modal Widths

Find all modals with custom widths:

```bash
grep -r "Modal.*width=" .
```

### Step 2: Map to Size Presets

Replace common widths with presets:

```tsx
// 400-450px → size="sm"
<Modal width="400px" /> → <Modal size="sm" />

// 500-550px → size="md"
<Modal width="520px" /> → <Modal size="md" />

// 700-750px → size="lg"
<Modal width="720px" /> → <Modal size="lg" />

// 900-1000px → size="xl"
<Modal width="960px" /> → <Modal size="xl" />
```

### Step 3: Keep Custom Widths

For non-standard sizes, keep `width` prop:

```tsx
// Non-standard width - keep as is
<Modal width="635px" />  // No equivalent preset
```

### Step 4: Update References

```tsx
// Before
const showModal = () => (
  <Modal width="500px" />
);

// After
const showModal = () => (
  <Modal size="md" />
);
```

---

## Benefits of Size Presets

### 1. Consistency
All modals use standard sizes, creating visual harmony.

### 2. Responsive
Presets are mobile-aware (full size automatically adjusts).

### 3. Maintenance
Update all "md" modals by changing one token value.

### 4. Readability
```tsx
<Modal size="lg">  // Clear intent
vs
<Modal width="720px">  // Why 720?
```

---

## Best Practices

### ✅ DO

```tsx
// Use size presets for standard cases
<Modal size="md">

// Use descriptive size for context
<Modal size="sm">  // Small confirmation

// Override when truly needed
<Modal size="md" width="custom-value">
```

### ❌ DON'T

```tsx
// Don't use width for standard sizes
<Modal width="520px">  // Use size="md"

// Don't mix unnecessarily
<Modal size="md" width="520px">  // Redundant
```

---

## Responsive Behavior

All size presets are responsive:

```tsx
<Modal size="full">
  // Desktop: 90vw
  // Mobile: Adapts to screen
</Modal>
```

**Mobile**: Modals automatically adjust to screen size with appropriate padding.

---

## Timeline

- **v2.x**: Size presets available, width still supported
- **Future**: No plans to deprecate width (flexibility needed)

---

## Visual Reference

See `Modal.stories.tsx` → `Sizes` story for visual examples of all size presets.

---

## Testing Checklist

After migration:

- [ ] Modal opens at correct size
- [ ] Responsive behavior works on mobile
- [ ] Custom widths still function if used
- [ ] No visual regressions
- [ ] Animation/transitions still smooth

---

## Complete Example

```tsx
import { Modal, Button } from '@ft-ds/components';
import { useState } from 'react';

function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>

      <Modal
        size="md"  // ✅ Use size preset
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Edit Profile"
      >
        <form>
          {/* Form content */}
        </form>
      </Modal>
    </>
  );
}
```

---

## Need Help?

- See Modal.stories.tsx for examples
- Check Modal.test.tsx for size preset tests
- Review implementation_plan.md for design decisions
