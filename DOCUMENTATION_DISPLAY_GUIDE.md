# Documentation Display Quick Reference

## General Rules

### ✅ **ALWAYS SHOW (MD Size)**
- **Semantic Variants**: Different meanings or purposes
  - Examples: primary, secondary, tertiary, danger, success, warning, neutral
- **Structural Variants**: Different layouts or compositions
  - Examples: horizontal, vertical, with icon, without label
- **Content Variants**: Different data states
  - Examples: empty, filled, with value, with error

### ❌ **NEVER SHOW INDIVIDUALLY**
- **Size Variants**: XS, SM, LG, XL, XXL (show in consolidated "Sizes" demo only)
- **Interactive States**: hover, focus, active, pressed, clicked
- **Loading States**: (show in "States" demo if needed)

### ⚠️ **SHOW SELECTIVELY**
- **Disabled State**: Only if it's significantly different from normal state
- **Error State**: Important for form components
- **Empty/Filled States**: Important for input-like components

---

## Component-by-Component Quick Reference

| Component | Show These Variants (MD size only) | Hide These | Special Notes |
|-----------|-----------------------------------|------------|---------------|
| **Avatar** | Default, Placeholder | XXS, XS, SM, LG, XL, XXL | Keep "AllSizes" demo |
| **Badge** | Normal, Danger, Success, Warning, Neutral, WithIcons, Interactive | Individual size variants | Combine "WithLeadingIcon" + "WithTrailingIcon" into one "WithIcons" demo |
| **Button** | Primary, Secondary, Tertiary, Destructive, Text, Link, WithLeadingIcon, WithTrailingIcon, IconOnly | XS, SM, LG, XL, XXL, Hover, Clicked, Pressed | Keep "Sizes", "States", "IconPositions", "CircularButtons" demos |
| **Checkbox** | Default, Checked, Indeterminate, WithDescription, Error, Disabled, DisabledChecked | Small (unless semantic) | |
| **DatePicker** | Default, WithValue, WithError, Disabled | XXS, XS, SM, LG, XL, XXL | Keep "AllSizes" demo |
| **Divider** | Horizontal, Vertical | N/A | |
| **Dropdown** | Default, WithValue, Error, Disabled | XXS, XS, SM, LG, XL, XXL | Keep "Sizes" demo |
| **Input** | Default, Error, Disabled, Filled, Warning, Success | XXS, XS, SM, LG, XL, XXL, Hover, Focused, Typing | Keep "Sizes", "Variants", "States" demos |
| **Label** | Default, WithSuffixIcon, Optional, OptionalWithIcon, Mandatory, MandatoryWithIcon, CustomIcon, LongText | N/A | All are semantic variants |
| **RadioGroup** | Default, Horizontal, Controlled | Individual size variants | |
| **Switch** | Checked, Unchecked, DisabledChecked, DisabledUnchecked, WithoutLabel | Size variants | |
| **Tabs** | Primary, Secondary, Tertiary | Selected, Hover, Active, Size variants | Keep "FigmaVariants" demo |

---

## Story File Patterns

### ✅ **Good Pattern: Args-Based Stories**
```typescript
// Individual semantic variants - SHOW THESE
export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md', // Always MD
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md', // Always MD
    children: 'Button',
  },
};
```

### ✅ **Good Pattern: Consolidated Demos**
```typescript
// Show all sizes in one demo - SHOW THIS
export function Sizes() {
  return (
    <div className="flex items-center gap-4">
      <Button variant="primary" size="xs">XS</Button>
      <Button variant="primary" size="sm">SM</Button>
      <Button variant="primary" size="md">MD</Button>
      <Button variant="primary" size="lg">LG</Button>
      <Button variant="primary" size="xl">XL</Button>
      <Button variant="primary" size="xxl">XXL</Button>
    </div>
  );
}

// Show all states in one demo - SHOW THIS
export function States() {
  return (
    <div className="flex gap-4">
      <Button variant="primary" size="md">Normal</Button>
      <Button variant="primary" size="md" disabled>Disabled</Button>
    </div>
  );
}
```

### ❌ **Bad Pattern: Function-Based Individual Variants**
```typescript
// Individual variants as functions - REMOVE THESE
export function VariantsPrimary() {
  return (
    <div className="p-6">
      <Button variant="primary" size="md">Primary</Button>
    </div>
  );
}

export function VariantsSecondary() {
  return (
    <div className="p-6">
      <Button variant="secondary" size="md">Secondary</Button>
    </div>
  );
}
```

### ❌ **Bad Pattern: Individual Size Variants**
```typescript
// Don't show individual sizes - REMOVE THESE
export const ExtraSmall: Story = {
  args: {
    variant: 'primary',
    size: 'xs',
    children: 'Button',
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    children: 'Button',
  },
};

// Instead, use one "Sizes" demo showing all sizes together
```

---

## Conversion Examples

### Example 1: Badge Component

#### ❌ BEFORE (With Syntax Errors)
```typescript
// Function-based - causes syntax errors
export function VariantsNormal() {
  return (
    <div className="p-6">
      <Badge variant="normal">Normal</Badge>
    </div>
  );
}

export function VariantsDanger() {
  return (
    <div className="p-6">
      <Badge variant="danger">Error</Badge>
    </div>
  );
}
```

#### ✅ AFTER (No Syntax Errors)
```typescript
// Args-based - works perfectly
export const Normal: Story = {
  args: {
    variant: 'normal',
    children: 'Normal',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Error',
  },
};
```

### Example 2: Button Component

#### ❌ BEFORE (Shows Too Many Variants)
```typescript
// Individual size stories - DON'T SHOW
export const ExtraSmall: Story = {
  args: { variant: 'primary', size: 'xs', children: 'Button' },
};

export const Small: Story = {
  args: { variant: 'primary', size: 'sm', children: 'Button' },
};

export const Medium: Story = {
  args: { variant: 'primary', size: 'md', children: 'Button' },
};

// ... more sizes

// Function-based variant stories - SYNTAX ERRORS
export function VariantsPrimary() {
  return <Button variant="primary">Primary</Button>;
}
```

#### ✅ AFTER (Clean and Working)
```typescript
// Show only semantic variants at MD size
export const Primary: Story = {
  args: { variant: 'primary', size: 'md', children: 'Primary' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', size: 'md', children: 'Secondary' },
};

export const Destructive: Story = {
  args: { variant: 'destructive', size: 'md', children: 'Destructive' },
};

// Consolidated size demo
export function Sizes() {
  return (
    <div className="flex items-center gap-4">
      <Button variant="primary" size="xs">XS</Button>
      <Button variant="primary" size="sm">SM</Button>
      <Button variant="primary" size="md">MD</Button>
      <Button variant="primary" size="lg">LG</Button>
      <Button variant="primary" size="xl">XL</Button>
      <Button variant="primary" size="xxl">XXL</Button>
    </div>
  );
}
```

---

## Documentation Generator Logic Update Needed

The file `/ft-docs/src/lib/component-metadata.ts` needs updates to:

1. **Filter out size-only variants** from individual display
2. **Recognize consolidated demos** (Sizes, States, etc.) and show them
3. **Prioritize args-based stories** over function-based stories
4. **Skip function-based individual variants** (VariantsPrimary, VariantsSecondary, etc.)

This is partially implemented but needs refinement to fully support the new strategy.

---

## Checklist for Each Component

When updating a component's stories file:

- [ ] Remove individual function-based variant stories (VariantsPrimary, VariantsSecondary, etc.)
- [ ] Ensure all semantic variants use args-based stories
- [ ] All stories use size: 'md' (unless showing sizes demo)
- [ ] Create one "Sizes" demo if component has multiple sizes
- [ ] Create one "States" demo if component has multiple states (disabled, error, etc.)
- [ ] Remove individual size variant stories (XS, SM, LG, etc.)
- [ ] Test in documentation site to verify no syntax errors
- [ ] Verify only meaningful variants are shown

---

## Expected Result

### Before (Current State)
```
Button
├── Examples
│   ├── Primary ✅ (works)
│   ├── Secondary ✅ (works)
│   ├── Variants Primary ❌ (syntax error)
│   ├── Variants Secondary ❌ (syntax error)
│   ├── Variants Tertiary ❌ (syntax error)
│   ├── Variants Destructive ❌ (syntax error)
│   ├── Variants Text ❌ (syntax error)
│   ├── Variants Link ❌ (syntax error)
│   ├── Sizes ❌ (syntax error)
│   ├── States ❌ (syntax error)
│   ├── Icon Positions ❌ (syntax error)
│   └── Circular Buttons ❌ (syntax error)
```

### After (Fixed State)
```
Button
├── Examples
│   ├── Primary ✅ (MD size, args-based)
│   ├── Secondary ✅ (MD size, args-based)
│   ├── Tertiary ✅ (MD size, args-based)
│   ├── Destructive ✅ (MD size, args-based)
│   ├── Text ✅ (MD size, args-based)
│   ├── Link ✅ (MD size, args-based)
│   ├── With Leading Icon ✅ (MD size, args-based)
│   ├── With Trailing Icon ✅ (MD size, args-based)
│   ├── Icon Only ✅ (MD size, args-based)
│   ├── Sizes ✅ (function-based, shows all sizes)
│   ├── States ✅ (function-based, shows normal + disabled)
│   ├── Icon Positions ✅ (function-based, shows all positions)
│   └── Circular Buttons ✅ (function-based, special showcase)
```

**Key Differences:**
- No "Variants Primary", "Variants Secondary" etc. (duplicates removed)
- No individual size stories (XS, SM, LG, etc.)
- All remaining stories work without syntax errors
- Only meaningful semantic variants shown at MD size
- Consolidated demos (Sizes, States, etc.) show multiple variants together
