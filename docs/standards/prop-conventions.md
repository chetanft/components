# Prop Naming Conventions

To ensure consistency across the FT Design System, we follow these prop naming conventions.

## Size Prop

All components supporting multiple sizes should use the `size` prop with the following standard values:

```typescript
type ComponentSize = 'sm' | 'md' | 'lg';
```

- **sm**: Small / Compact
- **md**: Medium / Default / Standard
- **lg**: Large

Extended sizes (if needed): `xs`, `xl`, `xxl`.

**Do not use**: `small`, `medium`, `large`, `default` (as a value).

### Examples

```tsx
// ✅ Correct
<Button size="sm">Small Button</Button>
<Badge size="md">Default Badge</Badge>

// ❌ Incorrect
<Button size="small">Small Button</Button>
<Badge size="default">Default Badge</Badge>
```

## Event Handlers

- **onChange**: For single value changes (Input, Select, Toggle).
  - Signature: `(value: T) => void` or `(event: React.ChangeEvent) => void`
- **onSelectionChange**: For multiple selection changes (Table, Transfer).
  - Signature: `(selectedValues: T[]) => void`
- **onClick**: For user clicks (Button, Link).
  - Signature: `(event: React.MouseEvent) => void`

## Boolean Props

- Use positive naming (e.g., `visible`, `open`, `loading`).
- Avoid negative naming (e.g., `hide`, `noBorder`).
- Boolean props should default to `false` where possible.

## Variant Prop

Use `variant` for visual style variations.

- **Interactive**: `primary`, `secondary`, `tertiary`, `destructive`, `ghost`, `link`
- **Status**: `success`, `warning`, `error`, `info`, `default`
