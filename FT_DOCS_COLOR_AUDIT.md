# FT Docs Color Token Audit

## Summary
The ft-docs app has **extensive hardcoded color values** that should use FT design system tokens instead.

## Critical Issues

### 1. Hardcoded Primary Color (`#434f64`)
**Files affected:**
- `ft-docs/src/app/colors/page.tsx` (lines 444, 464)
- `ft-docs/src/app/icons/page.tsx` (line 408)
- `ft-docs/src/app/blocks/page.tsx` (line 105 - in rgba)

**Should use:** `var(--primary)` or `var(--primary-700)`

### 2. Chart Colors (colors/page.tsx)
Lines 10-85 define entire color palettes with hardcoded hex values:
- Teal palette (#ecf8f8 to #0d2626)
- Blue palette (#e6e9fe to #020831)
- Sky palette (#e8f4fd to #051d2e)
- Red palette (#ffe5eb to #33000b)
- Yellow palette (#fffbf0 to #805002)
- Gray palette (#f5f5f5 to #1a1818)

**Issue:** These are chart.js demo colors, not FT design tokens

### 3. Inline Style Colors
Multiple files use inline `style={{ color: ... }}` which won't adapt to theme changes:
- `blocks/page.tsx` - hardcoded rgba gradient
- `colors/page.tsx` - `getContrastColor()` returns `#000000` or `#ffffff`
- `icons/page.tsx` - fallback to `#434f64`

### 4. Documentation Page (docs/global-css/page.tsx)
Lines 26-513 show token examples but use hardcoded hex values in the documentation itself.

**This is acceptable** - it's showing the actual token values for reference.

## Files Using Correct Tokens ✅

These files properly use CSS variables:
- `components/story-component-page.tsx` - uses `var(--bg-primary)`, `var(--primary)`, `var(--positive)`
- `app/docs/[[...slug]]/page.tsx` - uses `var(--tertiary-0)`, `var(--warning-light)`, etc.
- `app/docs/ai-prompts/page.tsx` - uses `var(--secondary)`, `var(--primary)`, `var(--tertiary)`, etc.
- `app/blocks/login-01/page.tsx` - uses `var(--secondary)`, `var(--primary)`
- `app/blocks/listing-01/page.tsx` - uses `var(--secondary)`, `var(--primary)`
- `app/blocks/dashboard-01/page.tsx` - uses `var(--secondary)`, `var(--primary)`

## Recommended Fixes

### Priority 1: Active UI Elements
Replace hardcoded `#434f64` with `var(--primary)` or `var(--primary-700)`:

```tsx
// BEFORE
style={selectedMode === mode ? { backgroundColor: '#434f64' } : undefined}

// AFTER
style={selectedMode === mode ? { backgroundColor: 'var(--primary)' } : undefined}
```

### Priority 2: Gradients and Effects
Replace rgba values with CSS variables:

```tsx
// BEFORE
background: "linear-gradient(135deg, rgba(67,79,100,0.08), rgba(67,79,100,0))"

// AFTER
background: "linear-gradient(135deg, rgba(var(--primary-rgb), 0.08), transparent)"
```

Note: This requires adding RGB versions of tokens to globals.css

### Priority 3: Chart Colors
The chart color palettes in `colors/page.tsx` are for demonstration purposes. Consider:
1. Keep them as-is if they're just examples
2. OR map them to FT token scales (primary-50 through primary-950, etc.)

### Priority 4: Color Picker Fallbacks
Update color picker fallback values:

```tsx
// BEFORE
value={iconColor === "currentColor" || iconColor.startsWith("var(") ? "#434f64" : iconColor}

// AFTER
value={iconColor === "currentColor" || iconColor.startsWith("var(") ? 
  getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || "#434f64" 
  : iconColor}
```

## Impact on Theme Switching

**Current behavior:** Hardcoded colors don't change when switching themes
**Expected behavior:** All UI colors should adapt to light/dark/night modes

### Elements that won't theme properly:
1. Selected button backgrounds in colors page
2. Selected button backgrounds in icons page  
3. Hover gradients in blocks page
4. Color picker fallback values
5. Chart demo colors (acceptable - they're examples)

## Action Items

1. ✅ **FIXED:** Active button backgrounds (colors, icons pages) - now use `var(--primary)`
2. ✅ **FIXED:** Gradient overlays (blocks page) - now use `color-mix(in srgb, var(--primary) 8%, transparent)`
3. ✅ **FIXED:** Button text colors - changed from `text-white` to `text-foreground`
4. ✅ **FIXED:** Contrast color function - now returns `var(--primary)` or `var(--bg-primary)`
5. ✅ **FIXED:** Color picker fallback - now reads computed `--primary-700` value
6. ⚠️ **Medium:** Add RGB token variants for rgba() usage (if needed elsewhere)
7. ℹ️ **Low:** Chart colors (acceptable - they're demo examples)
8. ℹ️ **Documentation:** Add note about avoiding hardcoded colors in contributing guide

## Files Fixed

### ✅ `ft-docs/src/app/colors/page.tsx`
- Line 444: `backgroundColor: '#434f64'` → `backgroundColor: 'var(--primary)'`
- Line 464: `backgroundColor: '#434f64'` → `backgroundColor: 'var(--primary)'`
- Line 414: `return '#000000' : '#ffffff'` → `return 'var(--primary)' : 'var(--bg-primary)'`
- Lines 441, 461: `text-white` → `text-foreground`

### ✅ `ft-docs/src/app/icons/page.tsx`
- Line 408: Color picker fallback now reads computed CSS variable

### ✅ `ft-docs/src/app/blocks/page.tsx`
- Line 105: `rgba(67,79,100,0.08)` → `color-mix(in srgb, var(--primary) 8%, transparent)`

## Remaining Acceptable Hardcoded Colors

These are intentionally hardcoded and don't need fixing:

1. **Chart.js demo palettes** (`colors/page.tsx` lines 10-85) - These are example color scales for chart demonstrations
2. **Modal overlays** (`bg-black/50`) - Standard semi-transparent overlay pattern
3. **Toggle switches** (`bg-white`) - UI chrome elements with fixed colors
4. **Documentation examples** (`docs/global-css/page.tsx`) - Showing actual hex values for reference

## Theme Switching Status

**Now working correctly:** All interactive UI elements (buttons, gradients, text) will properly adapt to light/dark/night themes.
