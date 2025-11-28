# Design Token Replacement Quick Reference

Quick lookup guide for replacing hardcoded values with FT Design System tokens.

---

## 🎨 Color Replacements

### Primary Colors
```typescript
'#434f64' → 'var(--color-primary)'
'#5f697b' → 'var(--color-secondary)'
'#838c9d' → 'var(--color-tertiary)'
```

### Border Colors
```typescript
'#ced1d7' → 'var(--color-border-primary)'
'#f0f1f7' → 'var(--color-border-secondary)'
```

### Background Colors
```typescript
'#ffffff' → 'var(--color-bg-primary)'
'#f8f8f9' → 'var(--color-bg-secondary)'
```

### Status Colors
```typescript
'#ff3533' → 'var(--color-critical)'
'#ff3532' → 'var(--color-critical)'        // Variant
'#b80100' → 'var(--color-critical-dark)'
'#ffeaea' → 'var(--color-critical-light)'

'#ff6c19' → 'var(--color-warning)'
'#dd6a00' → 'var(--color-warning-dark)'
'#ffebdc' → 'var(--color-warning-light)'

'#00c638' → 'var(--color-positive)'
'#00c637' → 'var(--color-positive)'        // Variant
'#00763d' → 'var(--color-positive-dark)'
'#dfffe8' → 'var(--color-positive-light)'

'#1890ff' → 'var(--color-neutral)'
'#006ed3' → 'var(--color-neutral-dark)'
'#ecf6ff' → 'var(--color-neutral-light)'
'#ECF6FF' → 'var(--color-neutral-light)' // Uppercase variant
```

### Special Colors
```typescript
'#000000' → 'var(--color-black)'           // If token exists
'#121314' → 'var(--color-black)'            // Dark variant
```

---

## 📏 Spacing Replacements

### Standard Spacing Scale (8-point grid)
```typescript
'0px'   → 'var(--spacing-x0)'
'4px'   → 'var(--spacing-x1)'
'8px'   → 'var(--spacing-x2)'
'12px'  → 'var(--spacing-x3)'
'16px'  → 'var(--spacing-x4)'
'20px'  → 'var(--spacing-x5)'
'24px'  → 'var(--spacing-x6)'
'28px'  → 'var(--spacing-x7)'
'32px'  → 'var(--spacing-x8)'
'36px'  → 'var(--spacing-x9)'
'40px'  → 'var(--spacing-x10)'
'44px'  → 'var(--spacing-x11)'
'48px'  → 'var(--spacing-x12)'
'52px'  → 'var(--spacing-x13)'
'56px'  → 'var(--spacing-x14)'
'60px'  → 'var(--spacing-x15)'
'64px'  → 'var(--spacing-x16)'
'80px'  → 'var(--spacing-x20)'
'96px'  → 'var(--spacing-x24)'
```

### Usage in Tailwind Classes
```tsx
// Instead of:
className="p-[4px] m-[8px] gap-[12px]"

// Use:
className="p-[var(--spacing-x1)] m-[var(--spacing-x2)] gap-[var(--spacing-x3)]"
```

### Usage in Inline Styles
```tsx
// Instead of:
style={{ padding: '16px', margin: '8px' }}

// Use:
style={{ padding: 'var(--spacing-x4)', margin: 'var(--spacing-x2)' }}
```

---

## 📝 Typography Replacements

### Font Sizes
```typescript
// Desktop
'14px' → 'var(--font-size-sm)' or designTokens.typography.fontSize.desktop.sm
'16px' → 'var(--font-size-md)' or designTokens.typography.fontSize.desktop.md
'20px' → designTokens.typography.fontSize.desktop.lg
'24px' → designTokens.typography.fontSize.desktop.xl
'28px' → designTokens.typography.fontSize.desktop.xxl

// Tablet
'12px' → designTokens.typography.fontSize.tablet.sm
'14px' → designTokens.typography.fontSize.tablet.md
'18px' → designTokens.typography.fontSize.tablet.lg
'21px' → designTokens.typography.fontSize.tablet.xl
'26px' → designTokens.typography.fontSize.tablet.xxl
```

### Font Weights
```typescript
'400' → designTokens.typography.fontWeight.regular
'500' → designTokens.typography.fontWeight.medium
'600' → designTokens.typography.fontWeight.semibold
```

### Line Heights
```typescript
'1.2' → designTokens.typography.lineHeight.tight
'1.4' → designTokens.typography.lineHeight.normal
'1.6' → designTokens.typography.lineHeight.relaxed
```

### Usage Examples
```tsx
// In Tailwind classes
className="text-[var(--font-size-sm)]"

// In inline styles
style={{ fontSize: designTokens.typography.fontSize.desktop.sm }}

// In CSS
.my-class {
  font-size: var(--font-size-sm);
}
```

---

## 🔲 Border Radius Replacements

```typescript
'0px'     → 'var(--radius-none)'
'4px'     → 'var(--radius-sm)'
'8px'     → 'var(--radius-md)'
'12px'    → 'var(--radius-lg)'
'16px'    → 'var(--radius-xl)'
'9999px'  → 'var(--radius-full)'
'50%'     → 'var(--radius-circle)'
```

### Usage
```tsx
// Tailwind
className="rounded-[var(--radius-md)]"

// Inline styles
style={{ borderRadius: 'var(--radius-md)' }}
```

---

## 🌈 RGBA Color Replacements

### Common Patterns
```typescript
// Black with opacity
'rgba(0,0,0,0.1)' → Use design token with opacity: 'var(--color-primary) / 0.1'
'rgba(0,0,0,0.15)' → 'var(--color-primary) / 0.15'
'rgba(0,0,0,0.16)' → 'var(--color-primary) / 0.16'
'rgba(0,0,0,0.25)' → 'var(--color-primary) / 0.25'
'rgba(0,0,0,0.5)' → 'var(--color-primary) / 0.5'

// Primary color with opacity
'rgba(67,79,100,0.8)' → 'var(--color-primary) / 0.8'  // #434f64
'rgba(206,209,215,1)' → 'var(--color-border-primary)'  // #ced1d7 (no opacity needed)
```

### Usage in Tailwind
```tsx
// Instead of:
className="bg-[rgba(0,0,0,0.1)]"

// Use:
className="bg-[var(--color-primary)/0.1]"
```

### Usage in CSS
```css
/* Instead of: */
background-color: rgba(0, 0, 0, 0.1);

/* Use: */
background-color: rgb(from var(--color-primary) r g b / 0.1);
/* Or with modern CSS: */
background-color: var(--color-primary);
opacity: 0.1;
```

---

## 🔍 Common Patterns to Find

### Regex Patterns for Search

**Hex Colors:**
```regex
#[0-9a-fA-F]{3,6}
```

**RGBA Colors:**
```regex
rgba?\([^)]+\)
```

**PX Values:**
```regex
\b\d+px\b
```

**Common Hardcoded Colors:**
```regex
#(838c9d|434f64|ff3533|1890ff|ffffff|f0f1f7|ced1d7)
```

---

## 📋 Component-Specific Notes

### RadioGroup
- Multiple instances of `#ced1d7`, `#434f64`, `#f0f1f7`
- Many spacing values need replacement

### QuickFilters
- Many status colors: `#FF3533`, `#FF6C19`, `#00C638`, `#1890FF`
- Border colors: `#F0F1F7`, `#CED1D7`

### NavigationMenu
- Largest file by issue count (100+ spacing issues)
- Consider breaking into smaller fixes

### Calendar/DatePicker
- Many spacing values
- Review 30px values (may need new token for calendar cells)

---

## 📐 Layout & Width Tokens

### Breakpoints
| Token | Value | Use Case |
| --- | --- | --- |
| `var(--breakpoint-xxl)` | 1600px | Ultra-wide layouts |
| `var(--breakpoint-xl)` | 1440px | Desktop container max |
| `var(--breakpoint-lg)` | 1280px | Large laptops |
| `var(--breakpoint-md)` | 1024px | Tablets/large screens |
| `var(--breakpoint-sm)` | 768px | Small tablets |
| `var(--breakpoint-xs)` | 480px | Compact phones |

### 24-Column Grid System

| Viewport | Columns | Margin | Gutter |
| --- | --- | --- | --- |
| >1440px | `var(--grid-desktop-columns)` = 24 | `var(--grid-desktop-margin)` = 20px | `var(--grid-desktop-gutter)` = 20px |
| ≤1440px | `var(--grid-laptop-columns)` = 24 | `var(--grid-laptop-margin)` = 16px | `var(--grid-laptop-gutter)` = 16px |
| ≤768px  | `var(--grid-mobile-columns)` = 4  | `var(--grid-mobile-margin)` = 16px | `var(--grid-mobile-gutter)` = 16px |

Runtime variables (`--grid-columns`, `--grid-gutter`, `--grid-margin`, `--container-max-width`) switch automatically at the breakpoints above.

### Utility Classes
- `.ft-container` → Constrains width to `var(--container-max-width)` and applies the correct horizontal padding.
- `.ft-grid` → Sets `grid-template-columns: repeat(var(--grid-columns), minmax(0, 1fr))` with the current gutter.

### Usage Examples
```tsx
<section className="ft-container">
  <div className="ft-grid">
    <article style={{ gridColumn: 'span 8' }}>...</article>
  </div>
</section>
```

```tsx
const drawerStyle = {
  maxWidth: 'var(--container-max-width)',
  paddingInline: 'var(--grid-margin)',
};
```

💡 For fixed sizes, compose from the spacing scale instead of raw numbers:
```tsx
style={{ maxWidth: 'calc(var(--spacing-x10) * 15)' }} // ≈ 600px
```

---

## ✅ Checklist for Each Fix

- [ ] Identify all hardcoded values in component
- [ ] Map each value to appropriate design token
- [ ] Replace in code (colors, spacing, typography, etc.)
- [ ] Test in light mode
- [ ] Test in dark mode
- [ ] Test responsive behavior
- [ ] Verify no visual regressions
- [ ] Update tests if needed
- [ ] Commit with clear message

---

## 🚨 Special Cases

### Non-Standard Values
Values like `1px`, `2px`, `6px`, `10px` may be:
- Intentional (borders, shadows)
- Need new tokens if frequently used
- Should be reviewed case-by-case

### Chart Components
Chart-specific px values (dimensions, positioning) may be intentional and not need tokens.

### Layout Calculations
Some px values may be part of layout calculations and should be reviewed before changing.

---

## 📚 Resources

- **Design Tokens File:** `src/tokens/design-tokens.ts`
- **CSS Variables:** Defined in `src/tokens/design-tokens.ts` (`cssVariables`)
- **Audit Report:** `HARDCODED_TOKENS_AUDIT.md`
- **Fix Plan:** `HARDCODED_TOKENS_FIX_PLAN.md`

---

**Last Updated:** 2025-11-26
