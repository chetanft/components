# FT Design System - Rem Unit Policy

## Overview

The FT Design System adopts **rem units** as the primary unit for typography and spacing to ensure responsive scaling, accessibility compliance, and consistent behavior across screen sizes and user preferences.

## Policy Statement

### Typography: Rem-First Approach

**All typography sizes MUST use rem units** via CSS custom properties or utility classes:

- ✅ **Use rem tokens**: `var(--font-size-md-rem)` or `.text-md-rem`
- ✅ **Use rem utility classes**: `.text-xs-rem`, `.text-sm-rem`, `.text-md-rem`, etc.
- ❌ **Avoid**: Direct pixel values for font sizes (except in rare cases where pixel-perfect control is required)

### Spacing: Hybrid Approach

**Spacing uses a hybrid approach** - px tokens remain for pixel fidelity, with optional rem equivalents available:

- ✅ **Use px tokens for precise spacing**: `var(--spacing-x4)` (16px) for borders, icons, fixed layouts
- ✅ **Use rem tokens for typography-relative spacing**: `var(--spacing-x4-rem)` (1.143rem) for padding/margins that should scale with text
- ⚠️ **Decision guide**: Use px when pixel precision matters (borders, icons, grid alignment). Use rem when spacing should scale with typography (component padding, margins between text elements).

## Root Font-Size Scaling Strategy

### Current Implementation (Fixed Breakpoints)

The design system uses a **two-tier scaling approach**:

```css
/* Base: 14px for screens ≤1440px */
html {
  font-size: 14px;
}

/* Scaled: 16px for screens >1440px */
@media (min-width: 1441px) {
  html {
    font-size: 16px;
  }
}
```

### Rationale

- **14px base**: Optimized for modern desktop displays and maintains readability
- **16px at >1440px**: Better readability on larger displays and aligns with browser defaults
- **Accessibility**: Respects browser zoom and OS font scaling settings automatically

### Future Consideration: Fluid Scaling

For smoother transitions, consider implementing fluid scaling using `clamp()`:

```css
/* Example fluid scaling (not yet implemented) */
html {
  font-size: clamp(14px, 0.875rem + 0.5vw, 16px);
}
```

**Status**: Current fixed breakpoint approach is maintained for predictability. Fluid scaling can be evaluated in future iterations.

## Guardrails

### Minimum and Maximum Root Sizes

- **Minimum**: 14px (current base) - ensures readability on all devices
- **Maximum**: 16px (current at >1440px) - prevents excessive scaling
- **User Override**: Always respects browser zoom and OS accessibility settings

### Accessibility Compliance

- ✅ **WCAG 2.1 AA**: Text scales to 200% without loss of functionality
- ✅ **Browser Zoom**: All rem-based values scale proportionally
- ✅ **OS Font Scaling**: Respects system accessibility preferences

### Tailwind Integration

- ❌ **DO NOT** use Tailwind arbitrary values with FT tokens: `.text-[var(--font-size-md-rem)]`
- ✅ **DO** use utility classes: `.text-md-rem`
- ✅ **DO** use CSS variables directly: `font-size: var(--font-size-md-rem);`

**Reason**: Turbopack sometimes breaks CSS escaping inside Tailwind arbitrary values `[]`.

## Token Naming Conventions

### Typography Tokens

- **Rem tokens**: `--font-size-{size}-rem` (e.g., `--font-size-md-rem`)
- **Pixel tokens** (deprecated for typography): `--font-size-{size}` (e.g., `--font-size-md`)
- **Utility classes**: `.text-{size}-rem` (e.g., `.text-md-rem`)

### Spacing Tokens

- **Pixel tokens** (primary): `--spacing-x{N}` (e.g., `--spacing-x4` = 16px)
- **Rem tokens** (optional): `--spacing-x{N}-rem` (e.g., `--spacing-x4-rem` = 1.143rem)
- **Base tokens**: `--x{N}` (e.g., `--x4` = 16px)

## Migration Strategy

### For New Components

1. **Typography**: Always use rem tokens or rem utility classes
2. **Spacing**: Choose px or rem based on use case (see decision guide above)
3. **Borders/Shadows**: Use px for pixel precision

### For Existing Components

1. **Typography**: Migrate to rem tokens/classes (already in progress)
2. **Spacing**: Evaluate case-by-case; keep px where precision matters
3. **No breaking changes**: Both px and rem tokens remain available during transition

## Cross-Platform Considerations

### Web (Primary)

- Rem units work natively
- Root font-size controls scaling
- Browser zoom respected automatically

### Native Platforms (iOS/Android)

- **iOS**: Map rem to points (pt) using base size: `pt = rem * 14` (or `rem * 16` at >1440px)
- **Android**: Map rem to scaled pixels (sp) using base size: `sp = rem * 14` (or `rem * 16` at >1440px)
- **Documentation**: See `docs/PLATFORM_MAPPING.md` for detailed conversion logic

## Examples

### Typography (Rem)

```tsx
// ✅ Correct - Using rem utility class
<Typography variant="body-primary-regular" className="text-md-rem">
  This text scales with root font-size
</Typography>

// ✅ Correct - Using rem CSS variable
<div style={{ fontSize: 'var(--font-size-md-rem)' }}>
  This also scales
</div>

// ❌ Avoid - Direct pixel value
<div style={{ fontSize: '16px' }}>
  This doesn't scale with user preferences
</div>
```

### Spacing (Hybrid)

```tsx
// ✅ Correct - px for precise spacing (border)
<div style={{ borderWidth: 'var(--spacing-x1)' }}>  // 4px border
  Precise border
</div>

// ✅ Correct - rem for typography-relative spacing
<div style={{ padding: 'var(--spacing-x4-rem)' }}>  // 1.143rem padding
  Padding that scales with text
</div>

// ✅ Also valid - px for component padding (if precision needed)
<div style={{ padding: 'var(--spacing-x4)' }}>  // 16px padding
  Fixed padding
</div>
```

## Testing Checklist

- [ ] Typography scales correctly at breakpoints (≤1440px, >1440px)
- [ ] Browser zoom (50% to 200%) maintains layout integrity
- [ ] OS font scaling respected
- [ ] Visual regression tests pass at key breakpoints
- [ ] Components render correctly with rem tokens
- [ ] Cross-platform mapping verified (if applicable)

## References

- [Design Tokens Reference](./DESIGN_TOKENS_REFERENCE.md)
- [Design Tokens Guide](./DESIGN_TOKENS_GUIDE.md)
- [Platform Mapping Guide](./PLATFORM_MAPPING.md)
- [Rem Classes Issue](./FT_DESIGN_SYSTEM_REM_CLASSES_ISSUE.md)
