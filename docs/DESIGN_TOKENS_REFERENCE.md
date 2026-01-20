# FT Design System - Complete Token Reference

> **Auto-generated from** `src/styles/globals.css`  
> **Last updated:** 2026-01-20  
> **Total tokens:** 121

This document provides a comprehensive reference for all design tokens available in the FT Design System. All tokens are CSS custom properties that can be used in your stylesheets or accessed via JavaScript.

## Table of Contents

- [Colors](#colors)
  - [Base Color Scales](#base-color-scales)
  - [Semantic Colors](#semantic-colors)
  - [Status Colors](#status-colors)
  - [Component Colors](#component-colors)
- [Spacing](#spacing)
- [Typography](#typography)
- [Shadows](#shadows)
- [Transitions](#transitions)
- [Border Radius](#border-radius)
- [Breakpoints](#breakpoints)
- [Grid System](#grid-system)
- [Component System](#component-system)
- [Overlays](#overlays)
- [Usage Examples](#usage-examples)

---

## Colors

### Base Color Scales

FT Design System uses a hierarchical color system with base scales that support light, dark, and night modes.

#### Primary Scale

| Token | Value | Description |
|-------|-------|------------|
| `--primary-900` | `#1a2330` | Darkest |
| `--primary-800` | `#2c3547` |  |
| `--primary-700` | `#434f64` | Main brand color |
| `--primary-600` | `#49556a` |  |
| `--primary-500` | `#5f697b` |  |
| `--primary-400` | `#6c7689` |  |
| `--primary-300` | `#838c9d` |  |
| `--primary-200` | `#9aa3b2` |  |
| `--primary-100` | `#c5cad3` | Lightest |

#### Secondary Scale

| Token | Value | Description |
|-------|-------|------------|
| `--secondary-900` | `#1e1f22` | Darkest |
| `--secondary-800` | `#303236` |  |
| `--secondary-700` | `#4a4d52` | Main brand color |
| `--secondary-600` | `#6c6f75` |  |
| `--secondary-500` | `#979ba2` |  |
| `--secondary-400` | `#b6bac0` |  |
| `--secondary-300` | `#ced1d7` |  |
| `--secondary-200` | `#ebecef` |  |
| `--secondary-100` | `#f0f1f7` | Lightest |

#### Tertiary Scale

| Token | Value | Description |
|-------|-------|------------|
| `--tertiary-900` | `#121314` | Darkest |
| `--tertiary-800` | `#1c1d1f` |  |
| `--tertiary-700` | `#2a2b2e` | Main brand color |
| `--tertiary-600` | `#3a3c3f` |  |
| `--tertiary-500` | `#57595d` |  |
| `--tertiary-400` | `#a9aaae` |  |
| `--tertiary-300` | `#e1e2e4` |  |
| `--tertiary-200` | `#f4f4f6` |  |
| `--tertiary-100` | `#f8f8f9` | Lightest |
| `--tertiary-0` | `#ffffff` |  |

#### Neutral Scale

| Token | Value | Description |
|-------|-------|------------|
| `--neutral-900` | `#002966` | Darkest |
| `--neutral-800` | `#0040a0` |  |
| `--neutral-700` | `#006dd3` | Main brand color |
| `--neutral-600` | `#007fff` |  |
| `--neutral-500` | `#1890ff` |  |
| `--neutral-400` | `#4da6ff` |  |
| `--neutral-300` | `#80c1ff` |  |
| `--neutral-200` | `#b3d9ff` |  |
| `--neutral-100` | `#ecf6ff` | Lightest |
| `--neutral-dark` | `var(--neutral-700)` |  |
| `--neutral-light` | `var(--neutral-100)` |  |

#### Positive Scale

| Token | Value | Description |
|-------|-------|------------|
| `--positive-900` | `#004d26` | Darkest |
| `--positive-800` | `#006633` |  |
| `--positive-700` | `#00753d` | Main brand color |
| `--positive-600` | `#00994d` |  |
| `--positive-500` | `#00c637` |  |
| `--positive-400` | `#1aff66` |  |
| `--positive-300` | `#4dff88` |  |
| `--positive-200` | `#99ffcc` |  |
| `--positive-100` | `#deffe7` | Lightest |
| `--positive-dark` | `var(--positive-700)` |  |
| `--positive-light` | `var(--positive-100)` |  |

#### Warning Scale

| Token | Value | Description |
|-------|-------|------------|
| `--warning-900` | `#7a2f00` | Darkest |
| `--warning-800` | `#993d00` |  |
| `--warning-700` | `#dd6a00` | Main brand color |
| `--warning-600` | `#f57c00` |  |
| `--warning-500` | `#ff6c19` |  |
| `--warning-400` | `#ff944d` |  |
| `--warning-300` | `#ffb366` |  |
| `--warning-200` | `#ffcc99` |  |
| `--warning-100` | `#ffedbc` | Lightest |
| `--warning-dark` | `var(--warning-700)` |  |
| `--warning-light` | `var(--warning-100)` |  |

#### Danger Scale

| Token | Value | Description |
|-------|-------|------------|
| `--danger-900` | `#800000` | Darkest |
| `--danger-800` | `#990000` |  |
| `--danger-700` | `#b70100` | Main brand color |
| `--danger-600` | `#d11a1a` |  |
| `--danger-500` | `#ff3532` |  |
| `--danger-400` | `#ff6666` |  |
| `--danger-300` | `#ff9999` |  |
| `--danger-200` | `#ffcccc` |  |
| `--danger-100` | `#ffeafa` | Lightest |

### Semantic Colors

Semantic colors reference base color scales and adapt to theme (light/dark/night).

| Token | Value | Description |
|-------|-------|------------|
| `--bg-primary` | `var(--tertiary-0)` | Background color |
| `--bg-secondary` | `var(--tertiary-100)` | Background color |
| `--border-alt` | `#ced1d7` | Border color |
| `--border-disabled` | `#f0f1f7` | Border color |
| `--border-hover` | `#434f64` | Border color |
| `--border-primary` | `var(--secondary-300)` | Border color |
| `--border-secondary` | `var(--secondary-100)` | Border color |
| `--primary` | `var(--primary-700)` | Main brand color (references --primary-700) |
| `--secondary` | `var(--primary-500)` | Secondary text color |
| `--tertiary` | `var(--primary-300)` | Muted/placeholder text |

### Status Colors

Status colors for alerts, badges, and feedback states.

| Token | Value | Description |
|-------|-------|------------|
| `--critical` | `var(--danger-500)` | Error/danger state |
| `--critical-dark` | `var(--danger-700)` | Error/danger state (darker variant) |
| `--critical-light` | `var(--danger-100)` | Error/danger state (lighter variant) |
| `--neutral` | `var(--neutral-500)` | Info state |
| `--positive` | `var(--positive-500)` | Success state |
| `--warning` | `var(--warning-500)` | Warning state |

### Component Colors

#### Button Component

| Token | Value | Description |
|-------|-------|------------|
| `--button-destructive-bg` | `#ff3532` | destructive bg |
| `--button-destructive-border` | `#ff3532` | destructive border |
| `--button-destructive-hover-bg` | `#b70100` | destructive hover bg |
| `--button-destructive-text` | `#ffffff` | destructive text |
| `--button-primary-bg` | `var(--primary-900)` | primary bg |
| `--button-primary-border` | `var(--primary-900)` | primary border |
| `--button-primary-hover-bg` | `var(--primary-800)` | primary hover bg |
| `--button-primary-text` | `#ffffff` | primary text |
| `--button-secondary-bg` | `#ffffff` | secondary bg |
| `--button-secondary-border` | `#ced1d7` | secondary border |
| `--button-secondary-hover-bg` | `#f0f1f7` | secondary hover bg |
| `--button-secondary-hover-border` | `#838c9d` | secondary hover border |
| `--button-secondary-text` | `#434f64` | secondary text |
| `--button-text-bg` | `transparent` | text bg |
| `--button-text-border` | `transparent` | text border |
| `--button-text-hover-bg` | `#f0f1f7` | text hover bg |
| `--button-text-text` | `#434f64` | text text |

#### Badge Component

| Token | Value | Description |
|-------|-------|------------|
| `--badge-border-radius` | `4px` | border radius |
| `--badge-danger-bg` | `#ffe9e9` | danger bg |
| `--badge-danger-border` | `#ff3532` | danger border |
| `--badge-danger-hover-bg` | `#ffafad` | danger hover bg |
| `--badge-danger-hover-border` | `#b70100` | danger hover border |
| `--badge-danger-hover-text` | `#b70100` | danger hover text |
| `--badge-danger-text` | `#ff3532` | danger text |
| `--badge-font-size` | `12px` | font size |
| `--badge-font-weight` | `500` | font weight |
| `--badge-neutral-bg` | `#ecf6ff` | neutral bg |
| `--badge-neutral-border` | `#1890ff` | neutral border |
| `--badge-neutral-hover-bg` | `#ecf6ff` | neutral hover bg |
| `--badge-neutral-hover-border` | `#1890ff` | neutral hover border |
| `--badge-neutral-text` | `#1890ff` | neutral text |
| `--badge-normal-bg` | `#f0f1f7` | normal bg |
| `--badge-normal-border` | `#ced1d7` | normal border |
| `--badge-normal-hover-bg` | `#ced1d7` | normal hover bg |
| `--badge-normal-hover-border` | `#838c9d` | normal hover border |
| `--badge-normal-text` | `#434f64` | normal text |
| `--badge-success-bg` | `#deffe7` | success bg |
| `--badge-success-border` | `#00753d` | success border |
| `--badge-success-hover-bg` | `#99e8af` | success hover bg |
| `--badge-success-hover-border` | `#00753d` | success hover border |
| `--badge-success-text` | `#00753d` | success text |
| `--badge-warning-bg` | `#ffebdc` | warning bg |
| `--badge-warning-border` | `#ff6c19` | warning border |
| `--badge-warning-hover-bg` | `#ffc4a3` | warning hover bg |
| `--badge-warning-hover-border` | `#ff6c19` | warning hover border |
| `--badge-warning-text` | `#ff6c19` | warning text |

#### Form Component

| Token | Value | Description |
|-------|-------|------------|
| `--border` | `#ced1d7` |  |
| `--focus` | `#434f64` |  |
| `--focus-ring` | `#434f64` | ring |
| `--helper` | `#838c9d` |  |
| `--input` | `#434f64` |  |
| `--input-disabled` | `#ced1d7` | disabled |
| `--input-muted` | `#838c9d` | muted |
| `--placeholder` | `#838c9d` |  |
| `--surface` | `#ffffff` |  |
| `--surface-alt` | `#f8f8f9` | alt |
| `--surface-hover` | `#f0f1f7` | hover |

## Spacing

FT Design System uses an 8-point grid system (4px base unit). All spacing tokens follow the `--spacing-x{N}` pattern.

| Token | Value | Pixels | Use Case |
|-------|-------|--------|----------|
| `--x0` | `0px` | 0px | No spacing |
| `--spacing-x0` | `var(--x0)` | 0px | No spacing |
| `--x1` | `4px` | 4px | Tight spacing |
| `--spacing-x1` | `var(--x1)` | 4px | Tight spacing |
| `--x2` | `8px` | 8px | Tight spacing |
| `--spacing-x2` | `var(--x2)` | 8px | Tight spacing |
| `--x3` | `12px` | 12px | Default spacing |
| `--spacing-x3` | `var(--x3)` | 12px | Default spacing |
| `--x4` | `16px` | 16px | Default spacing |
| `--spacing-x4` | `var(--x4)` | 16px | Default spacing |
| `--x5` | `20px` | 20px | Loose spacing |
| `--spacing-x5` | `var(--x5)` | 20px | Loose spacing |
| `--x6` | `24px` | 24px | Loose spacing |
| `--spacing-x6` | `var(--x6)` | 24px | Loose spacing |
| `--x7` | `28px` | 28px | Loose spacing |
| `--spacing-x7` | `var(--x7)` | 28px | Loose spacing |
| `--x8` | `32px` | 32px | Loose spacing |
| `--spacing-x8` | `var(--x8)` | 32px | Loose spacing |
| `--x9` | `36px` | 36px | Extra large spacing |
| `--spacing-x9` | `var(--x9)` | 36px | Extra large spacing |
| `--x10` | `40px` | 40px | Extra large spacing |
| `--spacing-x10` | `var(--x10)` | 40px | Extra large spacing |
| `--x11` | `44px` | 44px | Extra large spacing |
| `--spacing-x11` | `var(--x11)` | 44px | Extra large spacing |
| `--x12` | `48px` | 48px | Extra large spacing |
| `--spacing-x12` | `var(--x12)` | 48px | Extra large spacing |
| `--x13` | `52px` | 52px | Extra large spacing |
| `--spacing-x13` | `var(--x13)` | 52px | Extra large spacing |
| `--x14` | `56px` | 56px | Extra large spacing |
| `--spacing-x14` | `var(--x14)` | 56px | Extra large spacing |
| `--x15` | `60px` | 60px | Extra large spacing |
| `--spacing-x15` | `var(--x15)` | 60px | Extra large spacing |
| `--x16` | `64px` | 64px | Extra large spacing |
| `--spacing-x16` | `var(--x16)` | 64px | Extra large spacing |
| `--x20` | `80px` | 80px | Extra large spacing |
| `--spacing-x20` | `var(--x20)` | 80px | Extra large spacing |
| `--x24` | `96px` | 96px | Extra large spacing |
| `--spacing-x24` | `var(--x24)` | 96px | Extra large spacing |
| `--x38` | `152px` | 152px | Extra large spacing |
| `--spacing-x38` | `var(--x38)` | 152px | Extra large spacing |

#### Rem-Based Spacing Tokens (Responsive)

Rem-based spacing tokens scale with the root font-size. Use these for spacing that should scale with typography (padding, margins between text elements).

| Token | Rem Value | Base (14px) | Scaled (16px) | Use Case |
|-------|----------|-------------|---------------|----------|
| `--spacing-x0-rem` | `0rem` | 0px | 0px | No spacing |
| `--spacing-x1-rem` | `0.286rem` | 4px | 4.57px | Tight spacing (scalable) |
| `--spacing-x2-rem` | `0.571rem` | 8px | 9.14px | Tight spacing (scalable) |
| `--spacing-x3-rem` | `0.857rem` | 12px | 13.71px | Default spacing (scalable) |
| `--spacing-x4-rem` | `1.143rem` | 16px | 18.29px | Default spacing (scalable) |
| `--spacing-x5-rem` | `1.429rem` | 20px | 22.86px | Loose spacing (scalable) |
| `--spacing-x6-rem` | `1.714rem` | 24px | 27.43px | Loose spacing (scalable) |
| `--spacing-x7-rem` | `2rem` | 28px | 32px | Loose spacing (scalable) |
| `--spacing-x8-rem` | `2.286rem` | 32px | 36.57px | Extra large spacing (scalable) |
| `--spacing-x9-rem` | `2.571rem` | 36px | 41.14px | Extra large spacing (scalable) |
| `--spacing-x10-rem` | `2.857rem` | 40px | 45.71px | Extra large spacing (scalable) |
| `--spacing-x11-rem` | `3.143rem` | 44px | 50.29px | Extra large spacing (scalable) |
| `--spacing-x12-rem` | `3.429rem` | 48px | 54.86px | Extra large spacing (scalable) |
| `--spacing-x13-rem` | `3.714rem` | 52px | 59.43px | Extra large spacing (scalable) |
| `--spacing-x14-rem` | `4rem` | 56px | 64px | Extra large spacing (scalable) |
| `--spacing-x15-rem` | `4.286rem` | 60px | 68.57px | Extra large spacing (scalable) |
| `--spacing-x16-rem` | `4.571rem` | 64px | 73.14px | Extra large spacing (scalable) |
| `--spacing-x20-rem` | `5.714rem` | 80px | 91.43px | Extra large spacing (scalable) |
| `--spacing-x24-rem` | `6.857rem` | 96px | 109.71px | Extra large spacing (scalable) |
| `--spacing-x38-rem` | `10.857rem` | 152px | 173.71px | Extra large spacing (scalable) |

**When to use rem vs px spacing:**
- **Use px tokens** (`--spacing-x4`) for precise spacing: borders, icons, grid alignment
- **Use rem tokens** (`--spacing-x4-rem`) for typography-relative spacing: component padding, margins between text elements

## Typography

| Token | Value | Description |
|-------|-------|------------|
| `--font-family-primary` | `'Inter', sans-serif` | Primary font family |
| `--font-size-lg` | `20px` | Fixed font size |
| `--font-size-lg-rem` | `1.429rem` | Responsive font size |
| `--font-size-md` | `16px` | Fixed font size |
| `--font-size-md-rem` | `1.143rem` | Responsive font size |
| `--font-size-sm` | `14px` | Fixed font size |
| `--font-size-sm-rem` | `1rem` | Responsive font size |
| `--font-size-xl` | `24px` | Fixed font size |
| `--font-size-xl-rem` | `1.714rem` | Responsive font size |
| `--font-size-xs` | `12px` | Fixed font size |
| `--font-size-xs-rem` | `0.857rem` | Responsive font size |
| `--font-size-xxl` | `28px` | Fixed font size |
| `--font-size-xxl-rem` | `2rem` | Responsive font size |
| `--font-weight-medium` | `500` | Font weight |
| `--font-weight-regular` | `400` | Font weight |
| `--font-weight-semibold` | `600` | Font weight |

## Shadows

| Token | Value | Use Case |
|-------|-------|----------|
| `--shadow-lg` | `0 10px 15px -3px rgba(67, 79, 100, 0.1)` | Prominent elevation |
| `--shadow-md` | `0 4px 6px -1px rgba(67, 79, 100, 0.1)` | Default elevation |
| `--shadow-sm` | `0 1px 2px 0 rgba(67, 79, 100, 0.05)` | Subtle elevation |
| `--shadow-xl` | `0 20px 25px -5px rgba(67, 79, 100, 0.1)` | Extra prominent |

## Transitions

| Token | Value | Use Case |
|-------|-------|----------|
| `--transition-fast` | `150ms` | Quick interactions |
| `--transition-normal` | `200ms` | Default transitions |
| `--transition-slow` | `300ms` | Smooth animations |

## Border Radius

| Token | Value | Use Case |
|-------|-------|----------|
| `--radius-full` | `9999px` | Pills/circles |
| `--radius-lg` | `12px` | Large components |
| `--radius-md` | `8px` | Default components |
| `--radius-none` | `0px` | Sharp corners |
| `--radius-sm` | `4px` | Small components |
| `--radius-xl` | `16px` |  |

## Breakpoints

| Token | Value | Device |
|-------|-------|--------|
| `--breakpoint-lg` | `1280px` | Laptop |
| `--breakpoint-md` | `1024px` | Tablet |
| `--breakpoint-sm` | `768px` | Large mobile |
| `--breakpoint-xl` | `1440px` | Desktop |
| `--breakpoint-xs` | `480px` | Mobile |
| `--breakpoint-xxl` | `1600px` | Ultra-wide |

## Grid System

| Token | Value | Description |
|-------|-------|------------|
| `--grid-columns` | `var(--grid-desktop-columns)` | columns |
| `--grid-desktop-columns` | `24` | desktop columns |
| `--grid-desktop-gutter` | `var(--x5)` | desktop gutter |
| `--grid-desktop-margin` | `var(--x5)` | desktop margin |
| `--grid-gutter` | `var(--grid-desktop-gutter)` | gutter |
| `--grid-laptop-columns` | `24` | laptop columns |
| `--grid-laptop-gutter` | `var(--x4)` | laptop gutter |
| `--grid-laptop-margin` | `var(--x4)` | laptop margin |
| `--grid-margin` | `var(--grid-desktop-margin)` | margin |
| `--grid-mobile-columns` | `4` | mobile columns |
| `--grid-mobile-gutter` | `var(--x4)` | mobile gutter |
| `--grid-mobile-margin` | `var(--x4)` | mobile margin |

## Component System

Component-level tokens for consistent sizing and styling.

| Token | Value | Description |
|-------|-------|------------|
| `--component-border-color` | `var(--border-primary)` | border color |
| `--component-border-focus` | `var(--primary)` | border focus |
| `--component-border-radius` | `8px` | border radius |
| `--component-border-width` | `2px` | border width |
| `--component-font-size-lg` | `16px` | font size lg |
| `--component-font-size-md` | `14px` | font size md |
| `--component-font-size-sm` | `14px` | font size sm |
| `--component-font-size-xl` | `18px` | font size xl |
| `--component-font-weight` | `500` | font weight |
| `--component-gap-lg` | `16px` | gap lg |
| `--component-gap-md` | `12px` | gap md |
| `--component-gap-sm` | `8px` | gap sm |
| `--component-height-lg` | `48px` | height lg |
| `--component-height-md` | `40px` | height md |
| `--component-height-sm` | `36px` | height sm |
| `--component-height-xl` | `64px` | height xl |
| `--component-height-xxs` | `16px` | height xxs |
| `--component-padding-lg` | `16px 20px` | padding lg |
| `--component-padding-md` | `12px 16px` | padding md |
| `--component-padding-sm` | `8px 12px` | padding sm |
| `--component-padding-xl` | `20px 24px` | padding xl |
| `--component-padding-xxs` | `2px 6px` | padding xxs |
| `--component-transition` | `all 200ms ease-in-out` | transition |

## Overlays

| Token | Value | Use Case |
|-------|-------|----------|
| `--overlay-control-bg` | `rgba(255, 255, 255, 0.12)` | Control backgrounds |
| `--overlay-control-bg-hover` | `rgba(255, 255, 255, 0.24)` | Control backgrounds |
| `--overlay-control-divider` | `rgba(255, 255, 255, 0.3)` | Control backgrounds |
| `--overlay-control-text` | `#ffffff` | Control backgrounds |
| `--overlay-light` | `rgba(12, 18, 28, 0.2)` | Subtle overlays |
| `--overlay-medium` | `rgba(12, 18, 28, 0.45)` | Dropdown overlays |
| `--overlay-strong` | `rgba(12, 18, 28, 0.65)` | Modal backdrops |

## Usage Examples

### CSS Usage

```css
.my-component {
  color: var(--primary);
  background-color: var(--bg-primary);
  padding: var(--spacing-x4);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}
```

### JavaScript Usage

```typescript
const primaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--primary');
```

### React Usage

```tsx
const MyComponent = () => {
  return (
    <div style={{ color: 'var(--primary)' }}>
      Content
    </div>
  );
};
```

## Critical Tokens for Validation

These tokens are checked during runtime validation to ensure CSS is loaded:

- `--primary`
- `--secondary`
- `--spacing-x4`
- `--radius-md`
- `--font-family-primary`

---

*This document is auto-generated. Do not edit manually.*
