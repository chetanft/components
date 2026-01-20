# Rem Adoption - Migration & Testing Guide

## Overview

This guide provides step-by-step instructions for migrating components to use rem units and validating the implementation.

## Migration Checklist

### Phase 1: Typography Migration (Already Complete)

✅ **Status**: Typography components already use rem utility classes
- Components use `.text-xs-rem`, `.text-sm-rem`, `.text-md-rem`, etc.
- Rem font-size tokens are defined in `globals.css`
- Utility classes are available in the design system

### Phase 2: Spacing Migration (Optional - Case-by-Case)

⚠️ **Status**: Spacing uses hybrid approach (px primary, rem optional)

**When to migrate spacing to rem:**
- Component padding that should scale with text
- Margins between text elements
- Spacing in typography-heavy layouts

**When to keep spacing as px:**
- Borders (need pixel precision)
- Icon spacing (fixed alignment)
- Grid systems (precise layout)
- Component heights/widths (fixed dimensions)

### Phase 3: Validation & Testing

## Testing Checklist

### Visual Regression Testing

Test at key breakpoints to ensure consistent scaling:

- [ ] **Mobile** (≤768px): Typography and spacing render correctly
- [ ] **Tablet** (769px - 1440px): Typography and spacing render correctly
- [ ] **Desktop** (1441px - 1600px): Typography scales to 16px base
- [ ] **Large Desktop** (>1600px): Typography scales correctly

### Browser Zoom Testing

Test browser zoom levels to ensure accessibility:

- [ ] **50% zoom**: Layout remains usable, text readable
- [ ] **100% zoom** (default): Normal appearance
- [ ] **150% zoom**: Layout scales proportionally
- [ ] **200% zoom**: Layout scales proportionally (WCAG 2.1 AA requirement)
- [ ] **300% zoom**: Layout remains functional

### OS Font Scaling Testing

Test with OS-level font scaling:

- [ ] **macOS**: System Preferences → Accessibility → Display → Larger Text
- [ ] **Windows**: Settings → Ease of Access → Display → Make text bigger
- [ ] **iOS**: Settings → Display & Brightness → Text Size
- [ ] **Android**: Settings → Accessibility → Font Size

### Component-Specific Testing

Test key components that use rem units:

- [ ] **Typography Component**: All variants render correctly
- [ ] **Button Component**: Text sizes scale correctly across size variants
- [ ] **Badge Component**: Text and spacing scale correctly
- [ ] **Input Components**: Text sizes and spacing scale correctly
- [ ] **Alert Components**: Text and spacing scale correctly

### Cross-Platform Testing (If Applicable)

If deploying to native platforms:

- [ ] **iOS**: Typography maps correctly to points (pt)
- [ ] **Android**: Typography maps correctly to scaled pixels (sp)
- [ ] **Screen size detection**: Correctly identifies when to use scaled (16px) vs base (14px) sizing

## Manual Testing Steps

### 1. Typography Scaling Test

```tsx
// Test component
<div>
  <Typography variant="title-primary" className="text-xxl-rem">
    Title (should be 28px at base, 32px at >1440px)
  </Typography>
  <Typography variant="body-primary-regular" className="text-md-rem">
    Body text (should be 16px at base, 18.29px at >1440px)
  </Typography>
</div>
```

**Expected Results:**
- At ≤1440px: Title = 28px, Body = 16px
- At >1440px: Title = 32px, Body = 18.29px
- Browser zoom 200%: All sizes double proportionally

### 2. Spacing Scaling Test

```tsx
// Test component with rem spacing
<div style={{ padding: 'var(--spacing-x4-rem)' }}>
  <p>Content with scalable padding</p>
</div>

// Test component with px spacing
<div style={{ borderWidth: 'var(--spacing-x1)' }}>
  <p>Content with fixed border</p>
</div>
```

**Expected Results:**
- Rem padding scales with root font-size
- Px border remains fixed at 4px

### 3. Browser Zoom Test

1. Open application in browser
2. Use browser zoom controls (Cmd/Ctrl + Plus/Minus)
3. Verify:
   - Text scales proportionally
   - Layout remains intact
   - No horizontal scrolling at 200% zoom
   - Interactive elements remain accessible

### 4. Responsive Breakpoint Test

1. Open browser DevTools
2. Test at breakpoints:
   - 480px (mobile)
   - 768px (tablet)
   - 1024px (small desktop)
   - 1440px (desktop threshold)
   - 1441px (scaled desktop)
   - 1600px (large desktop)
3. Verify:
   - Typography scales correctly at 1441px threshold
   - Layout remains consistent
   - No visual regressions

## Automated Testing

### Visual Regression Tests

```typescript
// Example: Visual regression test for typography scaling
describe('Typography Scaling', () => {
  it('should scale correctly at breakpoint threshold', () => {
    // Test at 1440px (base)
    cy.viewport(1440, 900);
    cy.get('[data-testid="typography-title"]').should('have.css', 'font-size', '28px');
    
    // Test at 1441px (scaled)
    cy.viewport(1441, 900);
    cy.get('[data-testid="typography-title"]').should('have.css', 'font-size', '32px');
  });
});
```

### Accessibility Tests

```typescript
// Example: Browser zoom accessibility test
describe('Browser Zoom Accessibility', () => {
  it('should maintain layout at 200% zoom', () => {
    cy.viewport(1920, 1080);
    // Simulate 200% zoom by scaling viewport
    cy.get('body').invoke('css', 'zoom', '2');
    // Verify no horizontal scroll
    cy.window().its('scrollX').should('eq', 0);
  });
});
```

## Common Issues & Solutions

### Issue: Text doesn't scale at breakpoint

**Symptoms**: Typography remains same size at >1440px

**Solution**: 
- Verify `html { font-size: 16px; }` is applied in media query
- Check that components use rem tokens/classes, not px values
- Inspect computed styles to confirm rem values

### Issue: Layout breaks at high zoom

**Symptoms**: Horizontal scrolling or overlapping elements at 200% zoom

**Solution**:
- Review fixed-width containers
- Ensure spacing uses rem where appropriate
- Check for hardcoded pixel values in layout code

### Issue: Inconsistent scaling across components

**Symptoms**: Some components scale, others don't

**Solution**:
- Audit components for hardcoded px values
- Migrate to rem tokens/classes
- Verify all typography uses rem utility classes

## Rollout Plan

### Step 1: Documentation (Complete)

- ✅ Rem policy document created
- ✅ Platform mapping guide created
- ✅ Design tokens guide updated
- ✅ Migration guide created (this document)

### Step 2: Token Implementation (Complete)

- ✅ Rem typography tokens defined
- ✅ Rem spacing tokens defined
- ✅ Utility classes available
- ✅ Design tokens TypeScript file updated

### Step 3: Component Audit (In Progress)

- [ ] Audit components for rem usage
- [ ] Identify components needing migration
- [ ] Prioritize high-impact components

### Step 4: Gradual Migration

- [ ] Migrate typography (mostly complete)
- [ ] Migrate spacing (case-by-case)
- [ ] Update component documentation

### Step 5: Validation

- [ ] Visual regression tests
- [ ] Accessibility tests
- [ ] Cross-platform tests (if applicable)
- [ ] User acceptance testing

### Step 6: Release

- [ ] Update release notes
- [ ] Communicate changes to consumers
- [ ] Provide migration guide for downstream projects

## Rollback Plan

If issues are discovered:

1. **Immediate**: Revert to previous token values
2. **Short-term**: Keep both px and rem tokens available
3. **Long-term**: Fix issues and re-release

## Support

For questions or issues:

- Review [Rem Policy Guide](./REM_POLICY.md)
- Review [Platform Mapping Guide](./PLATFORM_MAPPING.md)
- Check [Design Tokens Reference](./DESIGN_TOKENS_REFERENCE.md)
- File an issue in the repository
