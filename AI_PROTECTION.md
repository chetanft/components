# AI Protection in FT Design System

## What is AI Protection?

AI Protection is a feature that automatically filters out problematic CSS classes that AI coding assistants often generate, helping maintain design system consistency.

## The Problem

When AI tools (Cursor, Copilot, v0.dev, Bolt.new, etc.) generate UI code, they sometimes add classes that break your design:

```tsx
// ❌ AI might generate:
<Button className="h-12 bg-[#FF0000] rounded-xl p-8">
  Click me
</Button>
```

**Problems:**
- `h-12` - Overrides button height
- `bg-[#FF0000]` - Uses arbitrary colors
- `rounded-xl` - Changes border radius
- `p-8` - Overrides padding

## The Solution

Import from `ft-design-system/ai` to get AI-protected components:

```tsx
import { Button } from 'ft-design-system/ai';

// AI generates this:
<Button className="h-12 bg-[#FF0000] rounded-xl p-8 text-white">
  Click me
</Button>

// After AI protection:
// Keeps: text-white
// Removes: h-12, bg-[#FF0000], rounded-xl, p-8
```

## How It Works

The `withAIProtection` HOC wraps components and filters className props:

```typescript
// Filters these patterns:
- h-*, w-* (height/width)
- rounded-* (border radius)
- bg-[#...], text-[#...] (arbitrary colors)
- p-*, px-*, py-*, m-* (spacing)
```

## Usage

### Option 1: AI-Protected Components (Recommended for AI tools)

```tsx
import { Button, Input, Table } from 'ft-design-system/ai';
```

**60+ components with AI protection:**
- All atoms: Button, Input, Badge, Checkbox, Switch, etc.
- All molecules: DatePicker, Dropdown, Steps, etc.
- All organisms: Table, Tabs, Modal, Form, etc.
- Charts: BarChart, LineChart, PieChart, etc.

### Option 2: Standard Components

```tsx
import { Button, Input, Table } from 'ft-design-system';
```

Standard components without AI filtering. Use when:
- You're writing code manually (not with AI)
- You need full control over className
- You're an advanced user

### Option 3: Core/Unprotected

```tsx
import { Button } from 'ft-design-system/core';
```

Same as option 2 - alternative import path.

## Manual AI Protection

You can also use AI utilities directly:

```tsx
import { filterAIClasses, withAIProtection } from 'ft-design-system';

// Filter classes manually
const safeClasses = filterAIClasses("h-12 bg-[#FF0000] text-white");
// Returns: "text-white"

// Wrap your own components
const MyButton = withAIProtection(MyCustomButton);
```

## Comparison

| Import Path | AI Protected | Use When |
|-------------|-------------|----------|
| `ft-design-system/ai` | ✅ Yes | Using AI coding assistants |
| `ft-design-system` | ❌ No | Manual coding |
| `ft-design-system/core` | ❌ No | Advanced/manual coding |

## Does shadcn/ui have this?

**No.** shadcn/ui doesn't need AI protection because:
- Components are **copied into your project**
- You own and modify the code directly
- If AI breaks something, you fix the file

FT Design System is **imported from npm**, so you can't easily modify internals. AI protection provides runtime safety.

## Example: AI Tool Integration

### Cursor AI

Add to `.cursor/rules`:

```
When using FT Design System, import from ft-design-system/ai:
import { Button, Input, Table } from 'ft-design-system/ai';
```

### GitHub Copilot / v0.dev / Bolt.new

Just use the `/ai` import in your code - AI tools will learn from your pattern.

## Bundle Size

AI-protected components are actually **smaller**:

| Import | Size |
|--------|------|
| `ft-design-system` | 2.2MB |
| `ft-design-system/ai` | 1.7MB |
| Difference | **-500KB** |

Why smaller? Tree-shaking optimization when importing specific components.

## What Gets Filtered

See `src/lib/ai-utils.ts` for full list:

```typescript
- /\bh-\d+\b/          // h-4, h-12, etc.
- /\bw-\d+\b/          // w-4, w-full stays
- /\brounded-\w+/      // rounded-xl, rounded-lg
- /\bbg-\[#[0-9a-fA-F]+\]/ // bg-[#FF0000]
- /\btext-\[#[0-9a-fA-F]+\]/ // text-[#00FF00]
- /\bp[xy]?-\d+\b/     // p-4, px-8, py-2
```

## Need Help?

- See `AI_CONTEXT.md` for AI prompts
- Check `examples/ai-tool-integration.md` for detailed examples
- Review `src/lib/ai-utils.ts` for implementation details
