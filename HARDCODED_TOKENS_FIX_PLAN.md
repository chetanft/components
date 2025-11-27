# Hardcoded Design Tokens - Prioritized Fix Plan

**Generated:** 2025-11-26  
**Total Issues:** 1,279 across 89 files  
**Estimated Total Effort:** ~80-100 hours

---

## 📊 Executive Summary

This plan prioritizes fixing hardcoded design token values in the FT Design System components. The strategy follows:

1. **Atomic Design Hierarchy** - Fix atoms first (foundation), then molecules, then organisms
2. **Impact-Based** - Prioritize most visible issues (colors) and most-used components
3. **Quick Wins** - Address simple fixes first to build momentum
4. **Dependency Order** - Fix components that others depend on first

---

## 🎯 Priority Levels

- **P0 (Critical)** - Foundation components, high visibility, blocks other work
- **P1 (High)** - Frequently used components, visible issues
- **P2 (Medium)** - Important but less critical components
- **P3 (Low)** - Nice to have, can be deferred

---

## 📋 Phase 1: Foundation Atoms (P0) - Week 1

**Goal:** Fix core building blocks that other components depend on  
**Estimated Effort:** 12-15 hours  
**Impact:** High - affects all dependent components

### 1.1 RadioGroup Component ⚡ QUICK WIN
**File:** `src/components/atoms/RadioGroup/RadioGroup.tsx`  
**Issues:** 8 hex colors + 100+ spacing issues  
**Effort:** 2-3 hours  
**Priority:** P0 - Used by many forms

**Fixes:**
- Replace `#ced1d7` → `var(--color-border-primary)` (3 instances)
- Replace `#434f64` → `var(--color-primary)` (4 instances)
- Replace `#f0f1f7` → `var(--color-border-secondary)` (1 instance)
- Replace all spacing px values with `var(--spacing-x*)` tokens
- Replace font sizes with typography tokens

**Dependencies:** None  
**Blocks:** RadioSelector, Form components

---

### 1.2 Textarea Component
**File:** `src/components/atoms/Textarea/Textarea.tsx`  
**Issues:** 1 hardcoded color (`#838c9d`)  
**Effort:** 30 minutes  
**Priority:** P0 - Core form component

**Fixes:**
- Line 117: `#838c9d` → `var(--color-tertiary)` (placeholder)
- Line 136: `#838c9d` → `var(--color-tertiary)` (disabled)

**Dependencies:** None  
**Blocks:** Form components

---

### 1.3 Text Component
**File:** `src/components/atoms/Text/Text.tsx`  
**Issues:** 2 spacing issues  
**Effort:** 15 minutes  
**Priority:** P0 - Core typography component

**Fixes:**
- Replace hardcoded spacing values

**Dependencies:** None  
**Blocks:** Many components

---

### 1.4 SubText Component
**File:** `src/components/atoms/SubText/SubText.tsx`  
**Issues:** TBD (check audit)  
**Effort:** 15 minutes  
**Priority:** P0 - Core typography component

---

### 1.5 ReadOnly Component
**File:** `src/components/atoms/ReadOnly/ReadOnly.tsx`  
**Issues:** 12 spacing issues  
**Effort:** 30 minutes  
**Priority:** P0 - Form component

**Fixes:**
- Replace all spacing px values

---

### 1.6 Label Component
**File:** `src/components/atoms/Label/Label.tsx`  
**Issues:** 2 spacing issues  
**Effort:** 15 minutes  
**Priority:** P0 - Form component

---

### 1.7 Badge Component
**File:** `src/components/atoms/Badge/Badge.tsx`  
**Issues:** 28 spacing issues  
**Effort:** 1 hour  
**Priority:** P0 - Frequently used

**Fixes:**
- Replace all spacing px values with tokens

---

### 1.8 Switch Component
**File:** `src/components/atoms/Switch/Switch.tsx`  
**Issues:** 8 spacing + 2 rgba colors  
**Effort:** 1 hour  
**Priority:** P0 - Form component

**Fixes:**
- Replace rgba colors with design tokens + opacity
- Replace spacing values

---

### 1.9 Skeleton Component
**File:** `src/components/atoms/Skeleton/Skeleton.tsx`  
**Issues:** 2 spacing issues  
**Effort:** 15 minutes  
**Priority:** P0 - Loading state component

---

**Phase 1 Total:** ~6 hours  
**Components Fixed:** 9 atoms

---

## 📋 Phase 2: Core Molecules (P0-P1) - Week 1-2

**Goal:** Fix frequently used molecular components  
**Estimated Effort:** 20-25 hours

### 2.1 Pagination Component ⚡ QUICK WIN
**File:** `src/components/molecules/Pagination/Pagination.tsx`  
**Issues:** 3 hex colors + 1 spacing  
**Effort:** 30 minutes  
**Priority:** P0 - High visibility

**Fixes:**
- Line 121, 162, 184: `#838c9d` → `var(--color-tertiary)`
- Line 138: `32px` → `var(--spacing-x8)`

---

### 2.2 Breadcrumb Component ⚡ QUICK WIN
**File:** `src/components/molecules/Breadcrumb/Breadcrumb.tsx`  
**Issues:** 2 hex colors  
**Effort:** 15 minutes  
**Priority:** P1 - Navigation component

**Fixes:**
- Line 33, 80: `#838c9d` → `var(--color-tertiary)`

---

### 2.3 ButtonGroup Component ⚡ QUICK WIN
**File:** `src/components/molecules/ButtonGroup/ButtonGroup.tsx`  
**Issues:** 1 spacing  
**Effort:** 10 minutes  
**Priority:** P1 - Used with Button

**Fixes:**
- Line 47: `8px` → `var(--spacing-x2)`

---

### 2.4 Tooltip Component
**File:** `src/components/molecules/Tooltip/Tooltip.tsx`  
**Issues:** 6 spacing issues  
**Effort:** 30 minutes  
**Priority:** P1 - Frequently used

**Fixes:**
- Replace spacing values
- Review 6px values (may need new token)

---

### 2.5 ProgressBar Component
**File:** `src/components/molecules/ProgressBar/ProgressBar.tsx`  
**Issues:** 10 spacing issues  
**Effort:** 45 minutes  
**Priority:** P1 - Feedback component

---

### 2.6 Chicklet Component
**File:** `src/components/molecules/Chicklet/Chicklet.tsx`  
**Issues:** 12 spacing + 2 font size  
**Effort:** 1 hour  
**Priority:** P1 - Tag/chip component

**Fixes:**
- Replace spacing and font size values
- Review 100px border-radius (may be intentional)

---

### 2.7 SegmentedTabs Component
**File:** `src/components/molecules/SegmentedTabs/SegmentedTabs.tsx`  
**Issues:** 1 rgba + 15 spacing + 2 font size  
**Effort:** 1.5 hours  
**Priority:** P1 - Navigation component

**Fixes:**
- Replace rgba with token + opacity
- Replace spacing and font sizes

---

### 2.8 RadioSelector Component
**File:** `src/components/molecules/RadioSelector/RadioSelector.tsx`  
**Issues:** 2 rgba colors + 12 spacing  
**Effort:** 1 hour  
**Priority:** P1 - Form component

**Fixes:**
- Replace rgba colors
- Replace spacing values

---

### 2.9 Steps Component
**File:** `src/components/molecules/Steps/Steps.tsx`  
**Issues:** 6 spacing issues  
**Effort:** 30 minutes  
**Priority:** P1 - Navigation component

---

### 2.10 Calendar Component
**File:** `src/components/molecules/Calendar/Calendar.tsx`  
**Issues:** 24 spacing + 3 font size  
**Effort:** 2 hours  
**Priority:** P1 - Date picker component

**Fixes:**
- Replace spacing and font size values
- Review 30px values (may need new token)

---

### 2.11 DatePicker Components
**Files:** 
- `src/components/molecules/DatePicker/DatePicker.tsx` (1 spacing)
- `src/components/molecules/DatePicker/Calendar.tsx` (1 rgba + 51 spacing + 3 font size)

**Issues:** 1 rgba + 52 spacing + 3 font size  
**Effort:** 3 hours  
**Priority:** P1 - Form component

**Fixes:**
- Replace rgba overlay color
- Replace all spacing and font sizes
- Review 30px calendar cell sizes

---

### 2.12 DropdownMenu Components
**Files:**
- `src/components/molecules/DropdownMenu/DropdownMenu.tsx` (42 spacing + 1 font size)
- `src/components/molecules/DropdownMenu/DropdownMenuItem.tsx` (41 spacing)

**Issues:** 83 spacing + 1 font size  
**Effort:** 3 hours  
**Priority:** P1 - Navigation component

---

### 2.13 Upload Components
**Files:**
- `src/components/molecules/UploadButton/UploadButton.tsx` (8 spacing)
- `src/components/molecules/UploadItem/UploadItem.tsx` (19 spacing)
- `src/components/molecules/UploadThumbnail/UploadThumbnail.tsx` (16 spacing)

**Issues:** 43 spacing issues  
**Effort:** 2 hours  
**Priority:** P1 - File upload components

---

### 2.14 ProgressList Component
**File:** `src/components/molecules/ProgressList/ProgressList.tsx`  
**Issues:** 1 hex color + 16 spacing + 1 font size  
**Effort:** 1.5 hours  
**Priority:** P1 - Feedback component

**Fixes:**
- Line 139: `#FFFFFF` → `var(--color-bg-primary)`
- Replace spacing and font size values

---

### 2.15 FileValidationCard Component
**File:** `src/components/molecules/FileValidationCard/FileValidationCard.tsx`  
**Issues:** 3 hex colors + 36 spacing  
**Effort:** 2 hours  
**Priority:** P1 - File component

**Fixes:**
- Line 132: `#ECF6FF` → `var(--color-neutral-light)`
- Line 133, 137: `#1890FF` → `var(--color-neutral)`
- Replace all spacing values

---

### 2.16 Graphs Component
**File:** `src/components/molecules/Graphs/Graphs.tsx`  
**Issues:** 5 hex colors + 29 spacing  
**Effort:** 2 hours  
**Priority:** P1 - Data visualization

**Fixes:**
- Replace all hex colors with tokens
- Replace spacing values
- Review non-standard px values (may be chart-specific)

---

### 2.17 SimpleColumnLayout Component
**File:** `src/components/molecules/SimpleColumnLayout/SimpleColumnLayout.tsx`  
**Issues:** 19 spacing  
**Effort:** 1 hour  
**Priority:** P1 - Layout component

---

### 2.18 StackedBarChart Component
**File:** `src/components/molecules/StackedBarChart/StackedBarChart.tsx`  
**Issues:** 8 spacing  
**Effort:** 30 minutes  
**Priority:** P2 - Chart component

---

### 2.19 Tree Component
**File:** `src/components/molecules/Tree/Tree.tsx`  
**Issues:** 8 spacing  
**Effort:** 30 minutes  
**Priority:** P2 - Data display

---

### 2.20 Timeline Component
**File:** `src/components/molecules/Timeline/Timeline.tsx`  
**Issues:** 12 spacing  
**Effort:** 45 minutes  
**Priority:** P2 - Data display

---

### 2.21 ColorPicker Component
**File:** `src/components/molecules/ColorPicker/ColorPicker.tsx`  
**Issues:** 2 hex colors  
**Effort:** 15 minutes  
**Priority:** P2 - Form component

**Fixes:**
- Line 41: `#000000` → `var(--color-black)` (if token exists)
- Line 41: `#ffffff` → `var(--color-bg-primary)`

---

### 2.22 Watermark Component
**File:** `src/components/molecules/Watermark/Watermark.tsx`  
**Issues:** 1 rgba color  
**Effort:** 15 minutes  
**Priority:** P2 - Utility component

---

### 2.23 Tour Component
**File:** `src/components/molecules/Tour/Tour.tsx`  
**Issues:** 1 rgba color + 5 spacing  
**Effort:** 30 minutes  
**Priority:** P2 - Onboarding component

---

### 2.24 Other Molecules (P3)
- FloatButton (1 spacing) - 10 min
- TimePicker (1 spacing) - 10 min
- Message (2 spacing) - 15 min
- Content (2 spacing) - 15 min
- Carousel (3 spacing) - 20 min
- Image (1 spacing) - 10 min
- Anchor (1 spacing) - 10 min
- Empty (25 spacing) - 1 hour

**Phase 2 Total:** ~25 hours  
**Components Fixed:** ~24 molecules

---

## 📋 Phase 3: Organisms (P1-P2) - Week 2-3

**Goal:** Fix complex organism components  
**Estimated Effort:** 30-35 hours

### 3.1 QuickFilters Component ⚡ HIGH PRIORITY
**File:** `src/components/organisms/QuickFilters/QuickFilters.tsx`  
**Issues:** 19 hex colors + 4 spacing + 2 font size  
**Effort:** 2.5 hours  
**Priority:** P1 - High visibility, many color issues

**Fixes:**
- Replace all hex colors:
  - `#F0F1F7` → `var(--color-border-secondary)` (3 instances)
  - `#CED1D7` → `var(--color-border-primary)` (3 instances)
  - `#FF3533` → `var(--color-critical)` (2 instances)
  - `#FF6C19` → `var(--color-warning)` (2 instances)
  - `#00C638` → `var(--color-positive)` (2 instances)
  - `#1890FF` → `var(--color-neutral)` (2 instances)
  - `#434F64` → `var(--color-primary)` (5 instances)
- Replace spacing and font sizes

---

### 3.2 AppHeader Component
**File:** `src/components/organisms/AppHeader/AppHeader.tsx`  
**Issues:** 77 spacing + 1 font size  
**Effort:** 4 hours  
**Priority:** P1 - Core navigation component

**Fixes:**
- Replace all spacing values
- Replace font size
- Review non-standard px values (may be layout-specific)

---

### 3.3 NavigationMenu Component
**File:** `src/components/organisms/NavigationMenu/NavigationMenu.tsx`  
**Issues:** 100+ spacing issues  
**Effort:** 5 hours  
**Priority:** P1 - Core navigation component

**Note:** This is the largest file by issue count. Consider breaking into smaller fixes.

---

### 3.4 NavigationPopover Component
**File:** `src/components/organisms/NavigationPopover/NavigationPopover.tsx`  
**Issues:** 49 spacing issues  
**Effort:** 2.5 hours  
**Priority:** P1 - Navigation component

---

### 3.5 Table Components
**Files:**
- `src/components/organisms/Table/Table.tsx` (7 spacing)
- `src/components/organisms/Table/TableCell.tsx` (12 spacing)
- `src/components/organisms/Table/TableHeaderItem.tsx` (30 spacing + 3 font size)
- `src/components/organisms/Table/TableCellItem.tsx` (2 spacing)

**Issues:** 51 spacing + 3 font size  
**Effort:** 3 hours  
**Priority:** P1 - Data display component

---

### 3.6 FileCard Component
**File:** `src/components/organisms/FileCard/FileCard.tsx`  
**Issues:** 1 hex color + 19 spacing  
**Effort:** 1.5 hours  
**Priority:** P1 - File component

**Fixes:**
- Line 273: `#FF3533` → `var(--color-critical)`
- Replace spacing values

---

### 3.7 FileThumbnail Component
**File:** `src/components/organisms/FileThumbnail/FileThumbnail.tsx`  
**Issues:** 1 rgba + 15 spacing + 2 font size  
**Effort:** 1.5 hours  
**Priority:** P1 - File component

---

### 3.8 FileTypeIcon Component
**File:** `src/components/organisms/FileTypeIcon/FileTypeIcon.tsx`  
**Issues:** 2 hex colors + 35 spacing + 4 font size  
**Effort:** 2.5 hours  
**Priority:** P1 - File component

**Fixes:**
- Line 91: `#CED1D7` → `var(--color-border-primary)`
- Line 185: `#ff3532` → `var(--color-critical)`
- Replace spacing and font sizes

---

### 3.9 DisplayBlock Component
**File:** `src/components/organisms/DisplayBlock/DisplayBlock.tsx`  
**Issues:** 6 hex colors + 42 spacing  
**Effort:** 2.5 hours  
**Priority:** P1 - Layout component

**Fixes:**
- Replace all `#ffffff` → `var(--color-bg-primary)` (6 instances)
- Replace spacing values

---

### 3.10 Card Component
**File:** `src/components/organisms/Card/Card.tsx`  
**Issues:** 2 spacing  
**Effort:** 15 minutes  
**Priority:** P1 - Layout component

---

### 3.11 Collapsible Component
**File:** `src/components/organisms/Collapsible/Collapsible.tsx`  
**Issues:** 8 spacing  
**Effort:** 30 minutes  
**Priority:** P1 - Layout component

---

### 3.12 Modal Component
**File:** `src/components/organisms/Modal/Modal.tsx`  
**Issues:** 1 hex color  
**Effort:** 15 minutes  
**Priority:** P1 - Overlay component

**Fixes:**
- Line 132: `#838c9d` → `var(--color-tertiary)`

---

### 3.13 Drawer Component
**File:** `src/components/organisms/Drawer/Drawer.tsx`  
**Issues:** 1 hex color + 8 spacing  
**Effort:** 30 minutes  
**Priority:** P1 - Overlay component

**Fixes:**
- Line 159: `#838c9d` → `var(--color-tertiary)`
- Replace spacing values

---

### 3.14 Tabs Component
**File:** `src/components/organisms/Tabs/Tabs.tsx`  
**Issues:** 2 spacing  
**Effort:** 15 minutes  
**Priority:** P1 - Navigation component

---

### 3.15 UserProfile Components
**Files:**
- `src/components/organisms/UserProfile/UserProfile.tsx` (8 spacing + 1 font size)
- `src/components/organisms/UserProfileDropdown/UserProfileDropdown.tsx` (2 rgba + 16 spacing)

**Issues:** 2 rgba + 24 spacing + 1 font size  
**Effort:** 2 hours  
**Priority:** P1 - User interface component

---

### 3.16 Upload Components
**Files:**
- `src/components/organisms/Upload/Upload.tsx` (3 spacing)
- `src/components/organisms/UploadZone/UploadZone.tsx` (7 spacing)

**Issues:** 10 spacing  
**Effort:** 1 hour  
**Priority:** P1 - File upload components

---

### 3.17 Footer Component
**File:** `src/components/organisms/Footer/Footer.tsx`  
**Issues:** TBD (check audit)  
**Effort:** 1 hour  
**Priority:** P2 - Layout component

---

### 3.18 Result Component
**File:** `src/components/organisms/Result/Result.tsx`  
**Issues:** 1 spacing  
**Effort:** 15 minutes  
**Priority:** P2 - Feedback component

---

### 3.19 Grid Component
**File:** `src/components/organisms/Grid/Grid.tsx`  
**Issues:** 1 spacing  
**Effort:** 15 minutes  
**Priority:** P2 - Layout component

---

### 3.20 ListingLayout Template
**File:** `src/components/templates/ListingLayout/ListingLayout.tsx`  
**Issues:** 17 spacing  
**Effort:** 1 hour  
**Priority:** P2 - Template component

---

**Phase 3 Total:** ~30 hours  
**Components Fixed:** ~20 organisms

---

## 📋 Phase 4: Charts & Specialized Components (P2-P3) - Week 3-4

**Goal:** Fix chart and specialized components  
**Estimated Effort:** 10-15 hours

### Chart Components
Most chart components likely have hardcoded values for chart-specific sizing. Review each:

- AreaChart
- LineChart
- PieChart
- DoughnutChart
- RadialChart
- GaugeChart
- BulletChart
- etc.

**Note:** Chart-specific px values (like chart dimensions) may be intentional and not need tokens.

**Effort:** 5-8 hours  
**Priority:** P2-P3

---

## 🛠️ Implementation Guidelines

### Fix Process for Each Component

1. **Read the component file**
2. **Identify all hardcoded values** from audit report
3. **Map to design tokens:**
   - Colors: Use `var(--color-*)` CSS variables
   - Spacing: Use `var(--spacing-x*)` CSS variables
   - Typography: Use `designTokens.typography.fontSize.*` or CSS variables
   - Border Radius: Use `var(--radius-*)` CSS variables
4. **Test the component:**
   - Visual regression testing
   - Dark mode testing
   - Responsive testing
5. **Update tests** if needed
6. **Commit** with clear message: `fix(ComponentName): replace hardcoded values with design tokens`

### Common Replacements

```typescript
// Colors
'#838c9d' → 'var(--color-tertiary)'
'#434f64' → 'var(--color-primary)'
'#ff3533' → 'var(--color-critical)'
'#1890ff' → 'var(--color-neutral)'
'#ffffff' → 'var(--color-bg-primary)'
'#f0f1f7' → 'var(--color-border-secondary)'
'#ced1d7' → 'var(--color-border-primary)'

// Spacing
'4px' → 'var(--spacing-x1)'
'8px' → 'var(--spacing-x2)'
'12px' → 'var(--spacing-x3)'
'16px' → 'var(--spacing-x4)'
'20px' → 'var(--spacing-x5)'
'24px' → 'var(--spacing-x6)'
'32px' → 'var(--spacing-x8)'
'40px' → 'var(--spacing-x10)'
'48px' → 'var(--spacing-x12)'
'64px' → 'var(--spacing-x16)'
'80px' → 'var(--spacing-x20)'
'96px' → 'var(--spacing-x24)'

// Font Sizes
'14px' → 'var(--font-size-sm)' or designTokens.typography.fontSize.desktop.sm
'16px' → 'var(--font-size-md)' or designTokens.typography.fontSize.desktop.md
'18px' → designTokens.typography.fontSize.tablet.lg
'20px' → designTokens.typography.fontSize.desktop.lg

// RGBA Colors
'rgba(0,0,0,0.1)' → Use design token with opacity: 'var(--color-primary) / 0.1'
```

### Special Cases

1. **Non-standard px values** (like 1px, 2px, 6px, 10px):
   - Review if they should use tokens
   - May need new tokens if frequently used
   - Document if intentionally hardcoded

2. **Chart-specific values:**
   - Chart dimensions may be intentional
   - Review with design team

3. **Layout-specific values:**
   - Some px values may be layout calculations
   - Review context before changing

---

## 📈 Progress Tracking

### Week 1 Goals
- [ ] Complete Phase 1 (Foundation Atoms) - 9 components
- [ ] Complete Phase 2.1-2.5 (Core Molecules) - 5 components
- **Target:** 14 components fixed

### Week 2 Goals
- [ ] Complete Phase 2.6-2.18 (Remaining Molecules) - 13 components
- [ ] Complete Phase 3.1-3.5 (Critical Organisms) - 5 components
- **Target:** 18 components fixed

### Week 3 Goals
- [ ] Complete Phase 3.6-3.20 (Remaining Organisms) - 15 components
- [ ] Start Phase 4 (Charts) - 5 components
- **Target:** 20 components fixed

### Week 4 Goals
- [ ] Complete Phase 4 (Charts & Specialized) - 10 components
- [ ] Final review and testing
- **Target:** 10 components fixed

**Total Target:** 62 components fixed in 4 weeks

---

## ✅ Quality Checklist

For each component fix:

- [ ] All hardcoded colors replaced with tokens
- [ ] All spacing values replaced with tokens
- [ ] All font sizes replaced with tokens
- [ ] Component tested in light mode
- [ ] Component tested in dark mode
- [ ] Component tested responsively
- [ ] No visual regressions
- [ ] Tests updated if needed
- [ ] Code reviewed
- [ ] Documentation updated if needed

---

## 🚨 Risk Mitigation

1. **Visual Regressions:**
   - Test each component after changes
   - Use visual regression testing tools
   - Review with design team

2. **Breaking Changes:**
   - Ensure CSS variables are available
   - Test in consuming applications
   - Version appropriately

3. **Performance:**
   - CSS variables have minimal performance impact
   - Monitor bundle size

4. **Timeline:**
   - Start with quick wins to build momentum
   - Batch similar fixes together
   - Don't block on edge cases

---

## 📝 Notes

- **Estimated completion:** 4 weeks with 1 developer
- **Can be parallelized:** Yes, different developers can work on different phases
- **Dependencies:** Phase 1 should be completed before Phase 2-3
- **Testing:** Allocate 20% of time for testing
- **Review:** Allocate 10% of time for code review

---

## 🎯 Success Metrics

- **Components Fixed:** 62+ components
- **Issues Resolved:** 1,000+ hardcoded values replaced
- **Token Usage:** 100% compliance in fixed components
- **Visual Regressions:** 0
- **Breaking Changes:** 0

---

**Last Updated:** 2025-11-26  
**Next Review:** After Phase 1 completion

