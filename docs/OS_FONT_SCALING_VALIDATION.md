# OS Font Scaling Validation Guide

## Overview

This guide provides step-by-step instructions for validating that the FT Design System correctly respects OS-level font scaling settings across different operating systems.

## Why OS Font Scaling Matters

OS font scaling allows users with visual impairments to increase text size system-wide. When applications respect these settings, rem-based typography automatically scales, improving accessibility without requiring application-specific settings.

## Testing Platforms

### macOS

#### Steps to Test

1. **Open System Preferences**
   - Apple Menu → System Preferences (or System Settings on macOS Ventura+)

2. **Navigate to Accessibility**
   - System Preferences → Accessibility
   - Or: System Settings → Accessibility

3. **Adjust Display Settings**
   - Click "Display" in the left sidebar
   - Find "Larger Text" slider
   - Adjust to different levels:
     - **Default**: No scaling
     - **Small**: Slightly larger
     - **Large**: Significantly larger
     - **Extra Large**: Maximum scaling

4. **Test in Browser**
   - Open your application in Safari, Chrome, or Firefox
   - Navigate to components using rem-based typography
   - Verify text scales proportionally

#### Expected Results

- ✅ Typography scales proportionally with OS setting
- ✅ Layout remains intact (no overlapping elements)
- ✅ Interactive elements remain accessible
- ✅ No horizontal scrolling introduced

#### Verification Checklist

- [ ] Title Primary (`.text-xxl-rem`) scales correctly
- [ ] Body Primary (`.text-md-rem`) scales correctly
- [ ] Body Secondary (`.text-sm-rem`) scales correctly
- [ ] Component padding (if using rem) scales correctly
- [ ] Buttons remain clickable at all zoom levels
- [ ] Forms remain usable at all zoom levels

### Windows

#### Steps to Test

1. **Open Settings**
   - Windows Key + I
   - Or: Start Menu → Settings

2. **Navigate to Ease of Access**
   - Settings → Ease of Access
   - Or: Settings → Accessibility (Windows 11)

3. **Adjust Text Size**
   - Click "Display" or "Text size"
   - Use slider to adjust text size:
     - **100%**: Default
     - **125%**: Slightly larger
     - **150%**: Larger
     - **175%**: Much larger
     - **200%**: Maximum

4. **Test in Browser**
   - Open your application in Edge, Chrome, or Firefox
   - Navigate to components using rem-based typography
   - Verify text scales proportionally

#### Expected Results

- ✅ Typography scales proportionally with OS setting
- ✅ Layout remains intact
- ✅ No horizontal scrolling
- ✅ All interactive elements remain accessible

#### Verification Checklist

- [ ] All typography variants scale correctly
- [ ] Component spacing (rem-based) scales correctly
- [ ] Navigation menus remain usable
- [ ] Form inputs remain accessible
- [ ] Buttons maintain proper sizing

### iOS

#### Steps to Test

1. **Open Settings**
   - Settings app

2. **Navigate to Display & Brightness**
   - Settings → Display & Brightness

3. **Adjust Text Size**
   - Tap "Text Size"
   - Use slider to adjust:
     - **Smaller**: Minimum
     - **Default**: Standard
     - **Larger**: Maximum

4. **Test in Safari**
   - Open your web application in Safari
   - Verify typography scales correctly

#### Expected Results

- ✅ Typography scales with iOS text size setting
- ✅ Layout adapts gracefully
- ✅ Touch targets remain accessible (minimum 44x44pt)

#### Verification Checklist

- [ ] Typography scales correctly
- [ ] Touch targets remain accessible
- [ ] No text truncation
- [ ] Forms remain usable

### Android

#### Steps to Test

1. **Open Settings**
   - Settings app

2. **Navigate to Accessibility**
   - Settings → Accessibility

3. **Adjust Font Size**
   - Tap "Font size"
   - Select size:
     - **Small**
     - **Default**
     - **Large**
     - **Largest**

4. **Test in Chrome**
   - Open your web application in Chrome
   - Verify typography scales correctly

#### Expected Results

- ✅ Typography scales with Android font size setting
- ✅ Layout adapts gracefully
- ✅ Touch targets remain accessible

#### Verification Checklist

- [ ] Typography scales correctly
- [ ] Touch targets remain accessible
- [ ] No layout breaking
- [ ] Forms remain usable

## Automated Testing

### Browser DevTools Simulation

Most browsers allow simulating OS font scaling in DevTools:

#### Chrome/Edge

1. Open DevTools (F12)
2. Go to Settings (gear icon)
3. Under "Rendering", find "Emulate CSS media feature prefers-reduced-motion"
4. Use "Emulate CSS media" to simulate different font scaling

#### Firefox

1. Open DevTools (F12)
2. Go to Settings
3. Enable "Simulate prefers-reduced-motion"
4. Use accessibility preferences

### JavaScript Testing

```typescript
// Test OS font scaling detection
function testOSFontScaling() {
  // Check if browser reports font scaling
  const rootFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );
  
  // Compare with expected base (14px or 16px)
  const expectedBase = window.innerWidth > 1440 ? 16 : 14;
  const scalingFactor = rootFontSize / expectedBase;
  
  console.log(`OS Font Scaling Factor: ${scalingFactor}x`);
  
  return scalingFactor;
}
```

## Common Issues & Solutions

### Issue: Text doesn't scale with OS setting

**Symptoms**: Typography remains fixed size despite OS font scaling

**Solutions**:
- Verify components use rem tokens/classes, not px values
- Check that root font-size is set correctly
- Ensure CSS is not overriding rem values with px

### Issue: Layout breaks at high OS scaling

**Symptoms**: Elements overlap or layout becomes unusable

**Solutions**:
- Review fixed-width containers
- Ensure spacing uses rem where appropriate
- Test at maximum OS scaling level
- Consider responsive breakpoints

### Issue: Touch targets too small on mobile

**Symptoms**: Buttons/links difficult to tap at high scaling

**Solutions**:
- Ensure minimum touch target size (44x44pt iOS, 48x48dp Android)
- Use rem-based sizing for touch targets
- Test on actual devices, not just simulators

## Testing Checklist

### Desktop (macOS/Windows)

- [ ] Test at default OS font size
- [ ] Test at 125% OS font size
- [ ] Test at 150% OS font size
- [ ] Test at 200% OS font size (WCAG requirement)
- [ ] Verify no horizontal scrolling
- [ ] Verify all interactive elements accessible
- [ ] Test in multiple browsers (Chrome, Firefox, Safari, Edge)

### Mobile (iOS/Android)

- [ ] Test at default font size
- [ ] Test at large font size
- [ ] Test at largest font size
- [ ] Verify touch targets remain accessible
- [ ] Verify no layout breaking
- [ ] Test in Safari (iOS) and Chrome (Android)

## Reporting Issues

When reporting OS font scaling issues, include:

1. **Platform**: macOS/Windows/iOS/Android
2. **OS Version**: e.g., macOS 14.0, Windows 11
3. **Browser**: Chrome 120, Safari 17, etc.
4. **Font Size Setting**: e.g., "150%", "Large"
5. **Component**: Which component(s) affected
6. **Expected Behavior**: What should happen
7. **Actual Behavior**: What actually happens
8. **Screenshots**: Before/after comparison

## References

- [Rem Policy Guide](./REM_POLICY.md)
- [Platform Mapping Guide](./PLATFORM_MAPPING.md)
- [Rem Migration Guide](./REM_MIGRATION_GUIDE.md)
- [WCAG 2.1 Success Criterion 1.4.4](https://www.w3.org/WAI/WCAG21/Understanding/resize-text.html)
