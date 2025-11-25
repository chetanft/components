# Component Stories Quick Reference

## 🎯 One-Page Cheat Sheet

### Story Structure Template
```typescript
// 1. Imports
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

// 2. Meta Configuration
const meta: Meta<typeof ComponentName> = {
  title: 'Design System/ComponentName',
  component: ComponentName,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { /* all props */ },
};
export default meta;
type Story = StoryObj<typeof meta>;

// 3. Default Story
export const Default: Story = { args: { /* default props */ } };

// 4. Variant Stories (ONE per variant) - ALWAYS use size="md"
export function VariantsPrimary() {
  return <div className="p-6"><ComponentName variant="primary" size="md" /></div>;
}

// 5. Sizes Story (ALL sizes together) - ALWAYS use variant="primary"
export function Sizes() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-4">
        <ComponentName variant="primary" size="xs" />
        <ComponentName variant="primary" size="sm" />
        {/* ... all sizes */}
      </div>
    </div>
  );
}

// 6. State Stories
export function States() {
  return (
    <div className="p-6">
      <div className="flex gap-4">
        <ComponentName variant="primary" size="md" />
        <ComponentName variant="primary" size="md" disabled />
      </div>
    </div>
  );
}
```

---

## ✅ Checklist

- [ ] Component imported
- [ ] Meta configured
- [ ] Default story exists
- [ ] **All variants** have separate stories (`Variants{VariantName}`)
- [ ] **Sizes story** exists showing ALL sizes together
- [ ] **State stories** exist (Normal, Disabled, Error, etc.)
- [ ] **Feature stories** exist (WithIcons, WithTitle, etc.)
- [ ] **ALL stories exported as functions** (`export function`)
- [ ] Variant stories use `size="md"`
- [ ] Sizes story uses `variant="primary"`
- [ ] Consistent padding (`p-6`)
- [ ] **NO combined stories**

---

## 🚫 Common Mistakes

| ❌ Wrong | ✅ Correct |
|----------|-----------|
| `Variants` story showing all variants together | `VariantsPrimary`, `VariantsSecondary`, etc. (separate) |
| Sizes shown only in variant stories | Dedicated `Sizes` story with ALL sizes |
| Combined: variants + sizes + states | Separate stories for each aspect |
| `render: () => JSX` or `const Story: Story = {}` | `export function StoryName() { return JSX }` |
| Variant story without `size="md"` | Always use `size="md"` in variant stories |
| Sizes story without `variant="primary"` | Always use `variant="primary"` in sizes story |
| Missing sizes story | Always include `Sizes` story if component has sizes |

---

## 📋 Required Stories by Component Type

### Buttons
- `VariantsPrimary`, `VariantsSecondary`, `VariantsTertiary`, `VariantsDestructive`, `VariantsText`, `VariantsLink`
- `Sizes` (all sizes)
- `States` (Normal + Disabled)
- `IconPositions` (Leading + Trailing + Only)

### Badges
- `VariantsNormal`, `VariantsDanger`, `VariantsSuccess`, `VariantsWarning`, `VariantsNeutral`
- `WithIcons`
- `Interactive`

### Form Components
- `NormalStates`
- `Sizes` (if applicable)
- `ErrorState`
- `DisabledStates`
- `WithDescriptions` (if applicable)

### Alerts
- `VariantsInfo`, `VariantsSuccess`, `VariantsWarning`, `VariantsDanger`
- `WithTitle`
- `Closable`

---

## 🎨 Naming Rules

| Type | Pattern | Example |
|------|---------|---------|
| Variants | `Variants{VariantName}` | `VariantsPrimary`, `VariantsDanger` |
| Sizes | `Sizes` | `Sizes` |
| States | `States` or `{State}State` | `States`, `DisabledState` |
| Features | `With{Feature}` | `WithIcons`, `WithTitle`, `Closable` |

---

## 🔍 Verification Steps

Before submitting:
1. Open Storybook
2. Check sidebar - all stories visible?
3. Click each story - does it render?
4. Check `Sizes` story - shows ALL sizes?
5. Check variant stories - ONE variant per story?
6. No combined stories?

---

**See full framework**: `docs/COMPONENT_STORIES_FRAMEWORK.md`

