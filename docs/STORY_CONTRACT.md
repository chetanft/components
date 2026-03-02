# FT Design System - Story Contract

> **Version:** 5.0 (target)
> **Status:** Draft
> **Purpose:** Standardize Storybook story structure across all public components. Emulate shadcn-style display: fewer knobs, better defaults, clear examples.

Related docs:
- `docs/API_CONTRACT.md`
- `docs/LEGACY_API_AUDIT.md`

---

## Principles

1. **Fewer public knobs, better defaults.** The Default story should render a useful component with zero args.
2. **State shown as examples, not encoded as variants.** Show disabled/loading/error as separate stories, not variant options.
3. **Composable first.** Default and all canonical stories use the composable API.
4. **Decision-friendly.** A developer scanning stories should immediately understand what the component does and how to use it.

---

## Required Story Sections

Every public component MUST have these stories in this order:

### 1. `Default`
- Uses composable API only.
- Renders with zero or minimal args.
- Must be args-driven (Storybook controls work).
- This is what appears first in docs.

```tsx
export const Default: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
};
```

### 2. `Variants`
- Shows all `variant` values side by side.
- Render function, not args-driven.
- Clean grid or flex layout.

```tsx
export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="text">Text</Button>
    </div>
  ),
};
```

### 3. `Sizes`
- Shows all `size` values side by side.
- Render function.

```tsx
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};
```

### 4. `States`
- Shows disabled, loading, error states as distinct examples.
- NOT as variant values.

```tsx
export const States: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
    </div>
  ),
};
```

### 5. `Composed` (if applicable)
- Shows the composable sub-component API in a realistic usage.
- Only for components that have sub-components.

```tsx
export const Composed: Story = {
  render: () => (
    <Alert variant="success">
      <AlertIcon name="check-circle" />
      <AlertTitle>Upload complete</AlertTitle>
      <AlertDescription>Your file has been uploaded.</AlertDescription>
      <AlertAction>
        <Button variant="text" size="sm">View</Button>
      </AlertAction>
    </Alert>
  ),
};
```

### 6. `Accessibility` (if applicable)
- Keyboard navigation demo.
- Screen reader considerations.
- ARIA attribute showcase.

### 7. `Legacy` (temporary)
- Preserved ONLY for backward-compatibility testing.
- Prefixed with `Legacy` in name.
- Hidden from default docs navigation when possible.
- Will be removed in v5.

```tsx
/** @deprecated Use composable API instead */
export const LegacyDeclarative: Story = {
  args: {
    title: 'Success',
    message: 'File uploaded',
    icon: 'check',
  },
};
```

---

## Optional Stories

These are NOT required but may be added when relevant:

| Story Name | When to Include |
|---|---|
| `WithIcons` | Component has icon support |
| `WithGlass` | Component supports `glass` prop |
| `Responsive` | Layout changes at breakpoints |
| `Controlled` | Component has controlled open/value pattern |
| `InForm` | Component used within Form context |
| `CustomStyling` | Shows className/style override patterns |

---

## Naming Convention

| Rule | Example | Anti-Pattern |
|---|---|---|
| PascalCase story names | `WithIcons`, `Variants` | `with_icons`, `variants` |
| Descriptive, not cryptic | `DisabledState` | `Test3` |
| No random one-offs | `LargeWithIcon` | `MyCustomButton_v2` |
| Legacy prefix for deprecated | `LegacyDeclarative` | `OldAPI`, `DeclarativeUsage` |
| Group with common prefix | `WithLeadingIcon`, `WithTrailingIcon` | `IconLeft`, `RightIcon` |

---

## Args vs Render

| Use Args When | Use Render When |
|---|---|
| Single component with knobs | Multiple components shown together |
| Default story | Variants/Sizes/States galleries |
| Simple prop exploration | Complex layout or composition |
| Storybook controls should work | Static showcase, no interactivity needed |

---

## Story Meta Configuration

Every story file MUST include:

```tsx
const meta: Meta<typeof Component> = {
  title: 'Category/ComponentName',  // e.g., 'Atoms/Button', 'Molecules/Alert'
  component: Component,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'One-line description of what the component does.',
      },
    },
  },
  argTypes: {
    // Only expose canonical props (variant, size, children, etc.)
    // Do NOT expose deprecated props in argTypes
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'destructive'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};
```

### argTypes rules:
- Only expose props that are part of the canonical API contract.
- Do NOT add controls for deprecated/legacy props.
- Do NOT add controls for internal state props (`hover`, `focused`, etc.).
- Use `control: 'select'` for enums, `control: 'boolean'` for flags.

---

## Docs Page Display Order

When stories render on a component docs page, they appear in this order:

1. Default (with interactive controls)
2. Variants
3. Sizes
4. States
5. Composed
6. Optional stories (WithIcons, WithGlass, etc.)
7. Legacy (collapsed/hidden section at bottom)

---

## Anti-Patterns to Avoid

| Anti-Pattern | Why It's Bad | Fix |
|---|---|---|
| 30+ stories per component | Overwhelms developers, not decision-friendly | Consolidate into Variants/Sizes/States galleries |
| Args story that hardcodes JSX in render | Defeats the purpose of args-driven controls | Use either args OR render, not both |
| Default story using legacy API | New developers copy the wrong pattern | Default MUST use composable API |
| Internal state variants exposed (`hover`, `focused`) | These are CSS states, not component variants | Remove from public stories |
| Random story names (`Test`, `Example2`, `MyButton`) | Inconsistent, hard to navigate | Follow naming convention above |
| Duplicate stories showing same thing | Bloat without information | Remove duplicates, consolidate |

---

## Compliance Checklist

For each component, verify:

- [ ] Has `Default` story using composable API with args
- [ ] Has `Variants` story showing all variant values
- [ ] Has `Sizes` story (if component accepts `size`)
- [ ] Has `States` story showing disabled/loading/error
- [ ] Has `Composed` story (if component has sub-components)
- [ ] Legacy stories prefixed with `Legacy`
- [ ] No deprecated props in `argTypes`
- [ ] Story count is reasonable (< 15 for atoms, < 20 for complex organisms)
- [ ] Meta has `tags: ['autodocs']` and component description
- [ ] Naming follows PascalCase convention
