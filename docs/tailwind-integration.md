# Tailwind Integration Guide - FT Design System

The FT Design System tokens are already fully integrated with Tailwind CSS. All design tokens are exposed as Tailwind utilities via CSS variables.

## Available Utilities

### Colors

#### Semantic Colors
```tsx
// Text colors
className="text-primary text-secondary text-tertiary"

// Backgrounds
className="bg-bg-primary bg-bg-secondary"

// Borders
className="border-border-primary border-border-secondary"
```

#### Color Scales
All color families with full shade ranges (100-900):
```tsx
className="bg-primary-500 text-danger-700 border-neutral-300"
// Available: primary, secondary, tertiary, neutral, positive, warning, danger
```

#### Status Colors
```tsx
className="bg-critical text-warning border-positive"
// With variants: critical-dark, critical-light, etc.
```

### Spacing (8-point grid)

```tsx
// Padding
className="p-x2 px-x4 py-x3"
// 0, x1(4px), x2(8px), x3(12px), x4(16px), x5(20px), x6(24px), x7(28px), x8(32px), x10, x12, x16, x20, x24

// Margin
className="m-x4 mx-x6 my-x2"

// Gap
className="gap-x2 gap-x4 gap-x8"
```

### Border Radius

```tsx
className="rounded-sm rounded-md rounded-lg rounded-xl"
// sm(4px), md(8px), lg(12px), xl(16px)

// Special shapes
className="rounded-pill rounded-full rounded-circle"
```

### Typography

```tsx
// Font sizes
className="text-xs text-sm text-md text-lg text-xl text-xxl"
// xs(12px), sm(14px), md(16px), lg(20px), xl(24px), xxl(28px)

// Font weights
className="font-regular font-medium font-semibold font-bold"
```

### Shadows

```tsx
className="shadow-sm shadow-md shadow-lg shadow-xl"
```

### Component Dimensions

For consistent component sizing:
```tsx
// Heights
className="h-component-xs h-component-sm h-component-md h-component-lg"
// xxs(16px), xs(24px), sm(32px), md(40px), lg(48px), xl(56px), xxl(64px)

// Matching widths, paddings
className="w-component-md p-component-sm gap-component-md"
```

## CSS Variable Access

For dynamic values or complex scenarios, use CSS variables directly:

```tsx
// Colors
className="bg-[var(--primary)] text-[var(--critical)]"

// Component-specific
className="bg-[var(--button-primary-bg)] text-[var(--button-primary-text)]"

// Spacing
className="p-[var(--space-4)] gap-[var(--space-2)]"
```

## Dark Mode

All tokens support dark mode via CSS variables. Use the standard Tailwind dark mode classes:

```tsx
className="bg-bg-primary dark:bg-surface-dark text-primary dark:text-input-dark"
```

## Best Practices

### ✅ DO
- Use semantic color names: `text-primary`, `bg-bg-secondary`
- Use spacing tokens: `p-x4`, `gap-x2`
- Use component utilities: `h-component-md`
- Combine with standard Tailwind: `flex items-center gap-x2`

### ❌ DON'T
- Use hardcoded values: `p-[16px]` → use `p-x4`
- Use non-token colors: `bg-blue-500` → use `bg-primary-500`
- Break the 8-point grid: `p-[13px]` → use token values

## Migration Example

```tsx
// ❌ Before (inline styles)
<div style={{ 
  padding: '16px',
  backgroundColor: '#ffffff',
  borderRadius: '8px' 
}}>

// ✅ After (Tailwind utilities)
<div className="p-x4 bg-bg-primary rounded-md">
```

## Related Files

- **Token Config**: `tailwind.config.js` - Full token definitions
- **CSS Variables**: Global styles define all CSS variables
- **Component Usage**: See component source for usage patterns
