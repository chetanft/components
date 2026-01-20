# Cross-Platform Testing Guide

## Overview

This guide provides instructions for testing FT Design System components across different platforms (Web, iOS, Android) to ensure consistent visual appearance and behavior when using rem-based tokens.

## Testing Strategy

### 1. Visual Consistency Testing

Ensure components look identical across platforms at equivalent screen sizes and font scaling.

### 2. Unit Conversion Testing

Verify that rem values convert correctly to platform-specific units (pt for iOS, sp for Android).

### 3. Responsive Behavior Testing

Test that scaling behavior matches across platforms at different screen sizes.

## Web Platform Testing

### Setup

1. **Local Development**
   ```bash
   npm run dev
   # or
   npm run storybook
   ```

2. **Test Breakpoints**
   - Mobile: 480px
   - Tablet: 768px
   - Desktop: 1440px (threshold)
   - Large Desktop: 1441px+ (scaled)

### Test Cases

#### Typography Scaling

```typescript
// Test at base size (14px)
document.documentElement.style.fontSize = '14px';
// Verify: text-md-rem = 16px

// Test at scaled size (16px)
document.documentElement.style.fontSize = '16px';
// Verify: text-md-rem = 18.29px
```

#### Spacing Scaling

```typescript
// Test rem-based spacing
element.style.padding = 'var(--spacing-x4-rem)';
// At 14px base: should be ~16px
// At 16px base: should be ~18.29px
```

### Browser Testing Matrix

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | Latest | ✅ Test |
| Firefox | Latest | ✅ Test |
| Safari | Latest | ✅ Test |
| Edge | Latest | ✅ Test |

## iOS Platform Testing

### Setup

1. **Xcode Project**
   - Create new iOS project or use existing
   - Import design tokens

2. **Token Implementation**
   ```swift
   import SwiftUI

   struct FTDesignTokens {
       static let baseFontSize: CGFloat = 14.0
       static let scaledFontSize: CGFloat = 16.0
       
       static func remToPoints(_ rem: Double, scaled: Bool = false) -> CGFloat {
           let base = scaled ? scaledFontSize : baseFontSize
           return CGFloat(rem * base)
       }
   }
   ```

### Test Cases

#### Typography Conversion

```swift
// Test rem to points conversion
let fontSize = FTDesignTokens.remToPoints(1.143) // Should be 16pt at base
let scaledFontSize = FTDesignTokens.remToPoints(1.143, scaled: true) // Should be 18.29pt
```

#### Screen Size Detection

```swift
func shouldUseScaledSizing() -> Bool {
    let screenWidth = UIScreen.main.bounds.width
    let pixelWidth = screenWidth * UIScreen.main.scale
    return pixelWidth > 1440
}
```

### Device Testing Matrix

| Device | Screen Size | Base Size | Scaled Size |
|--------|-------------|-----------|-------------|
| iPhone SE | 375pt | 14pt | N/A |
| iPhone 14 | 390pt | 14pt | N/A |
| iPhone 14 Pro Max | 430pt | 14pt | N/A |
| iPad | 768pt | 14pt | 16pt |
| iPad Pro 12.9" | 1024pt | 14pt | 16pt |

### Verification Checklist

- [ ] Typography sizes match web at equivalent screen sizes
- [ ] Spacing values convert correctly (px → pt)
- [ ] Screen size detection works correctly
- [ ] User font scaling respected (iOS Accessibility settings)
- [ ] Visual appearance matches web design

## Android Platform Testing

### Setup

1. **Android Studio Project**
   - Create new Android project or use existing
   - Import design tokens

2. **Token Implementation**
   ```kotlin
   object FTDesignTokens {
       const val BASE_FONT_SIZE = 14f
       const val SCALED_FONT_SIZE = 16f
       
       fun remToSp(rem: Double, scaled: Boolean = false): Float {
           val base = if (scaled) SCALED_FONT_SIZE else BASE_FONT_SIZE
           return (rem * base).toFloat()
       }
   }
   ```

### Test Cases

#### Typography Conversion

```kotlin
// Test rem to sp conversion
val fontSize = FTDesignTokens.remToSp(1.143) // Should be 16sp at base
val scaledFontSize = FTDesignTokens.remToSp(1.143, scaled = true) // Should be 18.29sp
```

#### Screen Size Detection

```kotlin
fun shouldUseScaledSizing(context: Context): Boolean {
    val displayMetrics = context.resources.displayMetrics
    val screenWidthPx = displayMetrics.widthPixels
    return screenWidthPx > 1440
}
```

### Device Testing Matrix

| Device | Screen Size | Density | Base Size | Scaled Size |
|--------|-------------|---------|-----------|-------------|
| Pixel 7 | 412dp | mdpi | 14sp | N/A |
| Pixel 7 Pro | 412dp | xhdpi | 14sp | N/A |
| Tablet 10" | 600dp+ | mdpi | 14sp | 16sp |
| Tablet 12" | 800dp+ | xhdpi | 14sp | 16sp |

### Verification Checklist

- [ ] Typography sizes match web at equivalent screen sizes
- [ ] Spacing values convert correctly (px → dp)
- [ ] Screen size detection works correctly
- [ ] User font scaling respected (Android Accessibility settings)
- [ ] Visual appearance matches web design

## Cross-Platform Comparison Testing

### Visual Regression Testing

1. **Create Reference Screenshots**
   - Web: Screenshot at 1440px and 1441px
   - iOS: Screenshot at equivalent sizes
   - Android: Screenshot at equivalent sizes

2. **Compare Visuals**
   - Use visual regression tools
   - Compare typography sizes
   - Compare spacing values
   - Verify layout consistency

### Automated Testing

#### Web Test

```typescript
describe('Cross-Platform Consistency', () => {
  it('should match iOS sizing at equivalent screen width', () => {
    // Test at iPad width (768px)
    cy.viewport(768, 1024);
    cy.get('[data-testid="typography"]').should('have.css', 'font-size', '16px');
  });
});
```

#### iOS Test

```swift
func testTypographyMatchesWeb() {
    let fontSize = FTDesignTokens.remToPoints(1.143) // 16pt
    XCTAssertEqual(fontSize, 16.0, accuracy: 0.1)
}
```

#### Android Test

```kotlin
@Test
fun testTypographyMatchesWeb() {
    val fontSize = FTDesignTokens.remToSp(1.143) // 16sp
    assertEquals(16f, fontSize, 0.1f)
}
```

## Common Cross-Platform Issues

### Issue: Different Sizing at Same Screen Width

**Symptoms**: Web shows different sizes than iOS/Android at equivalent widths

**Solutions**:
- Verify conversion formulas are correct
- Check screen size detection logic
- Ensure base font sizes match (14px = 14pt = 14sp)

### Issue: User Font Scaling Not Respected

**Symptoms**: Native apps don't scale when user changes system font size

**Solutions**:
- iOS: Use `UIFontMetrics` for dynamic scaling
- Android: Use `sp` units (already handled)
- Verify accessibility settings are respected

### Issue: Layout Differences

**Symptoms**: Same content looks different across platforms

**Solutions**:
- Review platform-specific layout constraints
- Check for platform-specific CSS/styling
- Verify spacing conversions are correct

## Testing Checklist

### Pre-Release

- [ ] Web tested at all breakpoints
- [ ] iOS tested on multiple devices
- [ ] Android tested on multiple devices
- [ ] Visual regression tests pass
- [ ] Unit conversion tests pass
- [ ] Screen size detection verified
- [ ] User font scaling respected on all platforms
- [ ] Documentation updated with platform-specific notes

### Post-Release

- [ ] Monitor user feedback for sizing issues
- [ ] Track platform-specific bug reports
- [ ] Update conversion formulas if needed
- [ ] Document platform-specific workarounds

## Tools & Resources

### Visual Regression Tools

- **Chromatic**: Visual testing for Storybook
- **Percy**: Visual regression testing
- **BackstopJS**: Visual regression testing

### Platform Testing Tools

- **iOS Simulator**: Test on different device sizes
- **Android Emulator**: Test on different screen sizes and densities
- **BrowserStack**: Cross-browser and device testing

## References

- [Platform Mapping Guide](./PLATFORM_MAPPING.md)
- [Rem Policy Guide](./REM_POLICY.md)
- [Rem Migration Guide](./REM_MIGRATION_GUIDE.md)
- [OS Font Scaling Validation](./OS_FONT_SCALING_VALIDATION.md)
