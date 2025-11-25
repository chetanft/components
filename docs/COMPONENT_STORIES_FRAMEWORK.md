# Component Stories Framework

## Purpose
This document defines the standard structure and patterns for all component stories in Storybook to ensure consistency, prevent regressions, and make documentation predictable.

## Core Principles

1. **One Story = One Preview Section**: Each story should show ONE aspect of the component (one variant, all sizes together, one state, etc.)
2. **Separate, Not Combined**: Never combine multiple aspects (variants + sizes + states) in a single story
3. **Function Components**: **ALL stories MUST be exported as functions** (Storybook 7+ supports this best, and it's the preferred pattern)
4. **Consistent Naming**: Follow naming conventions strictly
5. **Complete Coverage**: Every component property (variants, sizes, states, features) must have dedicated stories
6. **Standard Props**: Variant stories use `size="md"`, Sizes story uses `variant="primary"`

---

## ⚠️ Critical Rules (Must Follow)

### Rule 1: Variant Stories Always Use `size="md"`
```typescript
// ✅ Correct
export function VariantsPrimary() {
  return <ComponentName variant="primary" size="md">Primary</ComponentName>;
}

// ❌ Wrong - missing size="md"
export function VariantsPrimary() {
  return <ComponentName variant="primary">Primary</ComponentName>;
}
```

### Rule 2: Sizes Story Always Uses `variant="primary"`
```typescript
// ✅ Correct
export function Sizes() {
  return (
    <div>
      <ComponentName variant="primary" size="xs" />
      <ComponentName variant="primary" size="sm" />
      {/* ... */}
    </div>
  );
}

// ❌ Wrong - using different variant
export function Sizes() {
  return (
    <div>
      <ComponentName variant="secondary" size="xs" />
      {/* ... */}
    </div>
  );
}
```

**Exception**: If component doesn't have "primary" variant, use the first/default variant.

### Rule 3: All Stories Must Be Functions
```typescript
// ✅ Correct - Function export
export function VariantsPrimary() {
  return <ComponentName variant="primary" size="md" />;
}

// ❌ Wrong - Story type with render
export const VariantsPrimary: Story = {
  render: () => <ComponentName variant="primary" size="md" />,
};
```

---

## Standard Story Structure

### 1. File Header (Required)
```typescript
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Design System/ComponentName', // or 'Atoms/ComponentName', 'Molecules/ComponentName', etc.
  component: ComponentName,
  parameters: {
    layout: 'centered', // or 'padded' based on component needs
  },
  tags: ['autodocs'],
  argTypes: {
    // Define all component props with controls
  },
};

export default meta;
type Story = StoryObj<typeof meta>;
```

### 2. Default Story (Required)
```typescript
export const Default: Story = {
  args: {
    // Most common/default props
  },
};
```

### 3. Variant Stories (If component has variants)
**Pattern**: One story per variant type
```typescript
export function VariantsPrimary() {
  return (
    <div className="p-6">
      <ComponentName variant="primary" size="md">Primary</ComponentName>
    </div>
  );
}

export function VariantsSecondary() {
  return (
    <div className="p-6">
      <ComponentName variant="secondary" size="md">Secondary</ComponentName>
    </div>
  );
}

// Continue for all variants: VariantsTertiary, VariantsDestructive, VariantsText, VariantsLink, etc.
```

**Rules**:
- Use `Variants{VariantName}` naming (e.g., `VariantsPrimary`, `VariantsDanger`)
- Each variant gets its own story
- **ALWAYS use `size="md"` for variant stories** (unless the story is specifically about sizes)
- Show only that variant in the preview

### 4. Sizes Story (If component has sizes)
**Pattern**: All sizes in ONE story
```typescript
export function Sizes() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-4">
        <ComponentName variant="primary" size="xs">XS (24px)</ComponentName>
        <ComponentName variant="primary" size="sm">SM (32px)</ComponentName>
        <ComponentName variant="primary" size="md">MD (40px)</ComponentName>
        <ComponentName variant="primary" size="lg">LG (48px)</ComponentName>
        <ComponentName variant="primary" size="xl">XL (56px)</ComponentName>
        <ComponentName variant="primary" size="xxl">XXL (64px)</ComponentName>
      </div>
    </div>
  );
}
```

**Rules**:
- **ALWAYS use `variant="primary"` for sizes story** (unless component doesn't have "primary" variant, then use the first/default variant)
- Show ALL available sizes together
- Include size labels with pixel values if applicable
- Use horizontal flex layout

### 5. State Stories (If component has states)
**Pattern**: One story per state type
```typescript
export function States() {
  return (
    <div className="p-6">
      <div className="flex gap-4">
        <ComponentName variant="primary" size="md">Normal</ComponentName>
        <ComponentName variant="primary" size="md" disabled>Disabled</ComponentName>
      </div>
    </div>
  );
}

// Or separate stories if states are complex:
export function NormalState() { ... }
export function DisabledState() { ... }
export function ErrorState() { ... }
export function LoadingState() { ... }
```

**Rules**:
- Group related states together (Normal + Disabled)
- Or separate if states are complex enough
- Use consistent variant/size

### 6. Feature Stories (Component-specific features)
**Pattern**: One story per feature
```typescript
// Icons
export function WithIcons() {
  return (
    <div className="p-6">
      <div className="flex gap-4">
        <ComponentName icon="add" iconPosition="leading">With Icon</ComponentName>
        <ComponentName icon="edit" iconPosition="trailing">With Icon</ComponentName>
      </div>
    </div>
  );
}

// Interactive
export function Interactive() {
  return (
    <div className="p-6">
      <ComponentName interaction={true}>Interactive</ComponentName>
    </div>
  );
}

// With Title/Heading
export function WithTitle() {
  return (
    <div className="p-6">
      <ComponentName title="Title" message="Message" />
    </div>
  );
}
```

**Rules**:
- One feature per story
- Use descriptive names: `WithIcons`, `WithTitle`, `Closable`, `Interactive`, etc.

---

## Component-Specific Patterns

### Buttons
**Required Stories**:
1. `VariantsPrimary`, `VariantsSecondary`, `VariantsTertiary`, `VariantsDestructive`, `VariantsText`, `VariantsLink`
2. `Sizes` (all sizes together)
3. `States` (Normal + Disabled)
4. `IconPositions` (Leading + Trailing + Only)

### Badges
**Required Stories**:
1. `VariantsNormal`, `VariantsDanger`, `VariantsSuccess`, `VariantsWarning`, `VariantsNeutral`
2. `WithIcons` (Leading + Trailing + Both)
3. `Interactive`

### Form Components (Input, Checkbox, RadioGroup, Switch)
**Required Stories**:
1. `NormalStates` (Unchecked/Checked, Off/On, etc.)
2. `Sizes` (if applicable)
3. `ErrorState` or `WithError`
4. `DisabledStates`
5. `WithDescriptions` (if applicable)

### Alerts
**Required Stories**:
1. `VariantsInfo`, `VariantsSuccess`, `VariantsWarning`, `VariantsDanger`
2. `WithTitle`
3. `Closable`

### Tabs
**Required Stories**:
1. `VariantsPrimary`, `VariantsSecondary`, `VariantsTertiary`

### Tables
**Required Stories**:
1. `VariantsPrimary`, `VariantsSecondary`

---

## Code Style Rules

### ✅ REQUIRED: Use Function Components
```typescript
export function VariantsPrimary() {
  return (
    <div className="p-6">
      <ComponentName variant="primary" size="md">Primary</ComponentName>
    </div>
  );
}
```

**Rule**: **ALL stories MUST be exported as functions**. This is the standard for Storybook 7+ and ensures best compatibility.

### ❌ DON'T: Use Story Type with Render (Only if function components don't work)
```typescript
// Only use this if function components don't work in your Storybook version
export const VariantsPrimary: Story = {
  render: () => (
    <div className="p-6">
      <ComponentName variant="primary" size="md">Primary</ComponentName>
    </div>
  ),
};
```

**Note**: Function components are the standard. Only use Story type pattern if you encounter compatibility issues.

### ✅ DO: Import Component at Top
```typescript
import { ComponentName } from './ComponentName';
```

### ✅ DO: Use Consistent Padding
```typescript
<div className="p-6">  // Standard padding for all stories
```

### ✅ DO: Use Standard Props
```typescript
// Variant stories: ALWAYS use size="md"
<ComponentName variant="primary" size="md">Primary</ComponentName>

// Sizes story: ALWAYS use variant="primary" (or first/default variant if no primary)
<ComponentName variant="primary" size="xs">XS</ComponentName>
```

### ✅ DO: Use Descriptive Labels
```typescript
<ComponentName size="xs">XS (24px)</ComponentName>  // Include pixel values
```

---

## Naming Conventions

### Story Names
- **Variants**: `Variants{VariantName}` (e.g., `VariantsPrimary`, `VariantsDanger`)
- **Sizes**: `Sizes` (always singular, shows all sizes)
- **States**: `States` or `{StateName}State` (e.g., `NormalState`, `DisabledState`)
- **Features**: `With{Feature}` (e.g., `WithIcons`, `WithTitle`, `Closable`)

### Function Names
- Use PascalCase: `VariantsPrimary`, `WithIcons`, `Sizes`
- Be descriptive: `WithLeadingIcon` not `LeadingIcon`

---

## Checklist for New Component Stories

When creating stories for a new component, ensure:

- [ ] Component is imported at the top
- [ ] Meta configuration is complete with all argTypes
- [ ] Default story exists
- [ ] All variants have separate stories (`Variants{VariantName}`)
- [ ] Sizes story exists (if component has sizes) showing ALL sizes together
- [ ] State stories exist (Normal, Disabled, Error, etc.)
- [ ] Feature stories exist (Icons, Interactive, etc.)
- [ ] **ALL stories exported as functions** (`export function StoryName()`)
- [ ] Variant stories use `size="md"`
- [ ] Sizes story uses `variant="primary"` (or first/default variant)
- [ ] All stories have consistent padding (`p-6`)
- [ ] No combined stories (variants + sizes + states together)
- [ ] Story names follow naming conventions

---

## Common Mistakes to Avoid

### ❌ Mistake 1: Combining Multiple Aspects
```typescript
// WRONG: Combining variants + sizes + states
export function Variants() {
  return (
    <div>
      <h3>Variants</h3>
      <ComponentName variant="primary" />
      <ComponentName variant="secondary" />
      <h3>Sizes</h3>
      <ComponentName size="sm" />
      <ComponentName size="md" />
    </div>
  );
}
```

### ✅ Correct: Separate Stories
```typescript
export function VariantsPrimary() { ... }
export function VariantsSecondary() { ... }
export function Sizes() { ... }
```

### ❌ Mistake 2: Missing Sizes Story
```typescript
// WRONG: Sizes shown only in variant stories
export function VariantsPrimary() {
  return (
    <div>
      <ComponentName variant="primary" size="sm" />
      <ComponentName variant="primary" size="md" />
    </div>
  );
}
```

### ✅ Correct: Dedicated Sizes Story
```typescript
export function VariantsPrimary() {
  return <ComponentName variant="primary" size="md">Primary</ComponentName>;
}

export function Sizes() {
  return (
    <div>
      <ComponentName variant="primary" size="xs" />
      <ComponentName variant="primary" size="sm" />
      // ... all sizes
    </div>
  );
}
```

### ❌ Mistake 3: Using Render Functions
```typescript
// WRONG: Using render function
export const VariantsPrimary: Story = {
  render: () => <ComponentName variant="primary" />
};
```

### ✅ Correct: Using Function Component
```typescript
export function VariantsPrimary() {
  return <ComponentName variant="primary" />;
}
```

---

## Examples

### Complete Example: Button Component
```typescript
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Design System/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { /* ... */ },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: { variant: 'primary', size: 'md', children: 'Button' },
};

// Variants - ONE per variant
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

// ... VariantsTertiary, VariantsDestructive, VariantsText, VariantsLink

// Sizes - ALL sizes together
export function Sizes() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-4">
        <Button variant="primary" size="xs">XS (24px)</Button>
        <Button variant="primary" size="sm">SM (32px)</Button>
        <Button variant="primary" size="md">MD (40px)</Button>
        <Button variant="primary" size="lg">LG (48px)</Button>
        <Button variant="primary" size="xl">XL (56px)</Button>
        <Button variant="primary" size="xxl">XXL (64px)</Button>
      </div>
    </div>
  );
}

// States - Normal + Disabled together
export function States() {
  return (
    <div className="p-6">
      <div className="flex gap-4">
        <Button variant="primary" size="md">Normal</Button>
        <Button variant="primary" size="md" disabled>Disabled</Button>
      </div>
    </div>
  );
}

// Features - Icons
export function IconPositions() {
  return (
    <div className="p-6">
      <div className="flex gap-4">
        <Button variant="primary" size="md" icon="add" iconPosition="leading">Leading</Button>
        <Button variant="primary" size="md" icon="send" iconPosition="trailing">Trailing</Button>
        <Button variant="secondary" size="md" icon="edit" iconPosition="only" />
      </div>
    </div>
  );
}
```

---

## Review Process

Before submitting component stories:

1. **Check Structure**: Follow the standard structure above
2. **Check Naming**: All names follow conventions
3. **Check Completeness**: All variants, sizes, states, features have stories
4. **Check Separation**: No combined stories
5. **Check Code Style**: Function components, consistent padding
6. **Test in Storybook**: Verify all stories render correctly

---

## Updates to This Framework

When updating this framework:
1. Update this document
2. Update all existing component stories to match
3. Document the change reason
4. Update the checklist

---

## Troubleshooting

### Issue: Stories Not Showing in Storybook

**Problem**: Function components not appearing in Storybook sidebar

**Solution 1**: Ensure function is exported correctly
```typescript
// ✅ Correct
export function Sizes() { ... }

// ❌ Wrong - missing export
function Sizes() { ... }
```

**Solution 2**: If function components don't work, use Story type
```typescript
export const Sizes: Story = {
  render: () => (
    <div className="p-6">
      {/* content */}
    </div>
  ),
};
```

**Solution 3**: Check Storybook version - CSF3 supports function components natively

### Issue: Sizes Story Missing

**Checklist**:
1. Is `Sizes` function exported? (`export function Sizes()`)
2. Is it in the same file as other stories?
3. Does it show all sizes together?
4. Is it using one default variant?

**Quick Fix**: Add this story if missing
```typescript
export function Sizes() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-4">
        {/* All sizes here */}
      </div>
    </div>
  );
}
```

### Issue: Combined Stories Showing Multiple Aspects

**Problem**: One story showing variants + sizes + states

**Solution**: Split into separate stories following the framework

---

**Last Updated**: [Current Date]
**Version**: 1.0

