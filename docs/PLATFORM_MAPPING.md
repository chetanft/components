# FT Design System - Cross-Platform Unit Mapping

## Overview

This document defines how FT Design System tokens map across different platforms (Web, iOS, Android) to ensure consistent visual appearance and behavior.

## Design Token Source of Truth

The **canonical source** for all design tokens is the CSS custom properties defined in `src/styles/globals.css`. For programmatic access, tokens are also available in `src/tokens/design-tokens.ts`.

### Token Format

- **Web**: CSS custom properties (e.g., `var(--font-size-md-rem)`)
- **Native**: JSON export or design tokens package (future consideration)

## Root Font-Size Scaling

The design system uses a responsive root font-size:

- **Base**: `14px` (screens ≤1440px)
- **Scaled**: `16px` (screens >1440px)

This scaling affects all rem-based values across platforms.

## Web Platform (Primary)

### Implementation

Rem units work natively in CSS:

```css
/* Typography - uses rem */
font-size: var(--font-size-md-rem); /* 1.143rem = 16px at base, scales to 18.29px at >1440px */

/* Spacing - uses px (precise) or rem (scalable) */
padding: var(--spacing-x4);        /* 16px - fixed */
padding: var(--spacing-x4-rem);     /* 1.143rem - scales with root */
```

### Browser Zoom & Accessibility

- ✅ **Browser zoom**: All rem values scale proportionally
- ✅ **OS font scaling**: Respected automatically
- ✅ **WCAG 2.1 AA**: Text scales to 200% without loss of functionality

### Root Font-Size Control

```css
html {
  font-size: 14px; /* Base */
}

@media (min-width: 1441px) {
  html {
    font-size: 16px; /* Scaled */
  }
}
```

## iOS Platform (Native)

### Unit System

iOS uses **points (pt)** as the base unit. Points are resolution-independent and scale with device pixel ratio.

### Conversion Formula

```swift
// Base conversion (14px base)
let baseFontSize: CGFloat = 14.0

// For screens >1440px equivalent (use 16px base)
let scaledFontSize: CGFloat = 16.0

// Rem to Points conversion
func remToPoints(_ rem: Double, useScaled: Bool = false) -> CGFloat {
    let base = useScaled ? 16.0 : 14.0
    return CGFloat(rem * base)
}
```

### Typography Mapping

| CSS Token | Rem Value | Base (14px) | Scaled (16px) | Swift Usage |
|----------|-----------|-------------|---------------|-------------|
| `--font-size-xs-rem` | 0.857rem | 12pt | 13.71pt | `remToPoints(0.857)` |
| `--font-size-sm-rem` | 1rem | 14pt | 16pt | `remToPoints(1.0)` |
| `--font-size-md-rem` | 1.143rem | 16pt | 18.29pt | `remToPoints(1.143)` |
| `--font-size-lg-rem` | 1.429rem | 20pt | 22.86pt | `remToPoints(1.429)` |
| `--font-size-xl-rem` | 1.714rem | 24pt | 27.43pt | `remToPoints(1.714)` |
| `--font-size-xxl-rem` | 2rem | 28pt | 32pt | `remToPoints(2.0)` |

### Spacing Mapping

| CSS Token (px) | Pixel Value | Base (14px) | Scaled (16px) | Swift Usage |
|----------------|-------------|-------------|---------------|-------------|
| `--spacing-x1` | 4px | 4pt | 4pt | `4.0` (use px for precision) |
| `--spacing-x2` | 8px | 8pt | 8pt | `8.0` |
| `--spacing-x4` | 16px | 16pt | 16pt | `16.0` |

| CSS Token (rem) | Rem Value | Base (14px) | Scaled (16px) | Swift Usage |
|-----------------|-----------|-------------|---------------|-------------|
| `--spacing-x1-rem` | 0.286rem | 4pt | 4.57pt | `remToPoints(0.286)` |
| `--spacing-x4-rem` | 1.143rem | 16pt | 18.29pt | `remToPoints(1.143)` |

### Implementation Example

```swift
import SwiftUI

struct FTDesignTokens {
    static let baseFontSize: CGFloat = 14.0
    static let scaledFontSize: CGFloat = 16.0
    
    // Typography
    static func fontSize(_ size: FontSize, scaled: Bool = false) -> CGFloat {
        let remValues: [FontSize: Double] = [
            .xs: 0.857,
            .sm: 1.0,
            .md: 1.143,
            .lg: 1.429,
            .xl: 1.714,
            .xxl: 2.0
        ]
        let base = scaled ? scaledFontSize : baseFontSize
        return CGFloat(remValues[size] ?? 1.0) * base
    }
    
    // Spacing (px - precise)
    static let spacingX1: CGFloat = 4.0
    static let spacingX2: CGFloat = 8.0
    static let spacingX4: CGFloat = 16.0
    
    // Spacing (rem - scalable)
    static func spacingRem(_ size: SpacingSize, scaled: Bool = false) -> CGFloat {
        let remValues: [SpacingSize: Double] = [
            .x1: 0.286,
            .x2: 0.571,
            .x4: 1.143
            // ... etc
        ]
        let base = scaled ? scaledFontSize : baseFontSize
        return CGFloat(remValues[size] ?? 0.0) * base
    }
}

enum FontSize {
    case xs, sm, md, lg, xl, xxl
}

enum SpacingSize {
    case x1, x2, x4, x5, x6 // ... etc
}
```

### Screen Size Detection

```swift
// Determine if device should use scaled (16px) or base (14px) sizing
func shouldUseScaledSizing() -> Bool {
    let screenWidth = UIScreen.main.bounds.width
    // Convert points to pixels (accounting for scale)
    let pixelWidth = screenWidth * UIScreen.main.scale
    // Use scaled sizing for screens wider than 1440px equivalent
    return pixelWidth > 1440
}
```

## Android Platform (Native)

### Unit System

Android uses **scaled pixels (sp)** for text and **density-independent pixels (dp)** for spacing.

### Conversion Formula

```kotlin
// Base conversion (14px base)
val baseFontSize: Float = 14f

// For screens >1440px equivalent (use 16px base)
val scaledFontSize: Float = 16f

// Rem to Scaled Pixels (sp) conversion
fun remToSp(rem: Double, useScaled: Boolean = false): Float {
    val base = if (useScaled) 16f else 14f
    return (rem * base).toFloat()
}

// Rem to Density-Independent Pixels (dp) conversion
fun remToDp(rem: Double, useScaled: Boolean = false): Float {
    val base = if (useScaled) 16f else 14f
    return (rem * base).toFloat()
}
```

### Typography Mapping

| CSS Token | Rem Value | Base (14px) | Scaled (16px) | Android Usage |
|-----------|-----------|-------------|---------------|---------------|
| `--font-size-xs-rem` | 0.857rem | 12sp | 13.71sp | `remToSp(0.857)` |
| `--font-size-sm-rem` | 1rem | 14sp | 16sp | `remToSp(1.0)` |
| `--font-size-md-rem` | 1.143rem | 16sp | 18.29sp | `remToSp(1.143)` |
| `--font-size-lg-rem` | 1.429rem | 20sp | 22.86sp | `remToSp(1.429)` |
| `--font-size-xl-rem` | 1.714rem | 24sp | 27.43sp | `remToSp(1.714)` |
| `--font-size-xxl-rem` | 2rem | 28sp | 32sp | `remToSp(2.0)` |

### Spacing Mapping

| CSS Token (px) | Pixel Value | Base (14px) | Scaled (16px) | Android Usage |
|----------------|-------------|-------------|---------------|---------------|
| `--spacing-x1` | 4px | 4dp | 4dp | `4f` (use dp for precision) |
| `--spacing-x2` | 8px | 8dp | 8dp | `8f` |
| `--spacing-x4` | 16px | 16dp | 16dp | `16f` |

| CSS Token (rem) | Rem Value | Base (14px) | Scaled (16px) | Android Usage |
|-----------------|-----------|-------------|---------------|---------------|
| `--spacing-x1-rem` | 0.286rem | 4dp | 4.57dp | `remToDp(0.286)` |
| `--spacing-x4-rem` | 1.143rem | 16dp | 18.29dp | `remToDp(1.143)` |

### Implementation Example

```kotlin
object FTDesignTokens {
    const val BASE_FONT_SIZE = 14f
    const val SCALED_FONT_SIZE = 16f
    
    // Typography (sp - scales with user font size preference)
    fun fontSize(size: FontSize, scaled: Boolean = false): Float {
        val remValues = mapOf(
            FontSize.XS to 0.857,
            FontSize.SM to 1.0,
            FontSize.MD to 1.143,
            FontSize.LG to 1.429,
            FontSize.XL to 1.714,
            FontSize.XXL to 2.0
        )
        val base = if (scaled) SCALED_FONT_SIZE else BASE_FONT_SIZE
        return (remValues[size] ?: 1.0).toFloat() * base
    }
    
    // Spacing (dp - density-independent)
    const val SPACING_X1 = 4f
    const val SPACING_X2 = 8f
    const val SPACING_X4 = 16f
    
    // Spacing (rem - scalable)
    fun spacingRem(size: SpacingSize, scaled: Boolean = false): Float {
        val remValues = mapOf(
            SpacingSize.X1 to 0.286,
            SpacingSize.X2 to 0.571,
            SpacingSize.X4 to 1.143
            // ... etc
        )
        val base = if (scaled) SCALED_FONT_SIZE else BASE_FONT_SIZE
        return (remValues[size] ?: 0.0).toFloat() * base
    }
}

enum class FontSize {
    XS, SM, MD, LG, XL, XXL
}

enum class SpacingSize {
    X1, X2, X4, X5, X6 // ... etc
}
```

### Screen Size Detection

```kotlin
// Determine if device should use scaled (16px) or base (14px) sizing
fun shouldUseScaledSizing(context: Context): Boolean {
    val displayMetrics = context.resources.displayMetrics
    val screenWidthPx = displayMetrics.widthPixels
    // Use scaled sizing for screens wider than 1440px equivalent
    return screenWidthPx > 1440
}
```

## Color Tokens

Color tokens are platform-agnostic and map directly:

| CSS Token | Web | iOS | Android |
|-----------|-----|-----|---------|
| `--primary` | `#434f64` | `UIColor(hex: "#434f64")` | `Color.parseColor("#434f64")` |
| `--bg-primary` | `#ffffff` | `UIColor.white` | `Color.WHITE` |

**Note**: Color tokens are identical across platforms - no conversion needed.

## Border Radius Tokens

Border radius tokens use pixels and map directly:

| CSS Token | Web | iOS | Android |
|-----------|-----|-----|---------|
| `--radius-sm` | `4px` | `4.0` | `4f` |
| `--radius-md` | `8px` | `8.0` | `8f` |
| `--radius-lg` | `12px` | `12.0` | `12f` |

## Best Practices

### Web

1. ✅ Use rem for typography (automatic scaling)
2. ✅ Use px for precise spacing (borders, icons)
3. ✅ Use rem for typography-relative spacing (padding around text)

### iOS

1. ✅ Use `remToPoints()` for typography (respects user font scaling)
2. ✅ Use fixed pt values for precise spacing (borders, icons)
3. ✅ Use `remToPoints()` for typography-relative spacing

### Android

1. ✅ Use `remToSp()` for typography (respects user font scaling)
2. ✅ Use fixed dp values for precise spacing (borders, icons)
3. ✅ Use `remToDp()` for typography-relative spacing

## Testing Checklist

- [ ] Typography sizes match across platforms at base (14px) sizing
- [ ] Typography sizes match across platforms at scaled (16px) sizing
- [ ] Spacing values are consistent (px/dp/pt equivalents)
- [ ] User font scaling respected on native platforms
- [ ] Browser zoom works correctly on web
- [ ] Visual regression tests pass across platforms

## References

- [Rem Policy](./REM_POLICY.md)
- [Design Tokens Reference](./DESIGN_TOKENS_REFERENCE.md)
- [Design Tokens Guide](./DESIGN_TOKENS_GUIDE.md)
