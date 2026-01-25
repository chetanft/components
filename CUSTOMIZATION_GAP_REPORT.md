# Customization Gap Report

## Executive Summary

This report identifies hard-coded lists, labels, and configurations in components that users would reasonably expect to customize. A total of **5 gaps** were identified across **4 components**.

### Implementation Status
- ✅ **Phase 1 (High Priority)**: **COMPLETED** - 2/2 gaps fixed
  - ✅ ColorPicker presets prop
  - ✅ Calendar/DatePicker quickSelectOptions prop
- ✅ **Phase 2 (Medium Priority)**: **COMPLETED** - 2/2 gaps fixed
  - ✅ Calendar weekday/month labels
  - ✅ StackedBarChart default colors
- ⏳ **Phase 3 (Low Priority)**: **PENDING** - 0/1 gaps fixed
  - Chart components default colors

### Breakdown by Priority
- **High Priority**: 2 gaps (✅ 2 fixed, 0 remaining)
- **Medium Priority**: 2 gaps (✅ 2 fixed, 0 remaining)
- **Low Priority**: 1 gap (⏳ 0 fixed, 1 remaining)

### Breakdown by Type
- **preset-list**: 2 gaps (✅ 2 fixed)
- **format-options**: 1 gap (⏳ 0 fixed)
- **internal-state-ui**: 2 gaps (⏳ 0 fixed)

---

## Detailed Findings

### 1. ColorPicker - Hard-coded Color Presets ✅ FIXED

**Component**: `ColorPicker`  
**File**: `src/components/molecules/ColorPicker/ColorPicker.tsx`  
**Line**: 98-102 (DEFAULT_PRESETS), 95 (presets prop)  
**Priority**: **High**  
**Gap Type**: `preset-list`  
**Status**: ✅ **IMPLEMENTED**

**Issue Description**:  
The ColorPicker component had a hard-coded array of 13 color presets that were displayed in a grid when the picker opens. These presets could not be customized by users.

**Previous Behavior**:  
```tsx
// Hard-coded inside component
const presets = [
  '#f5222d', '#fa8c16', '#fadb14', '#8bbb11', '#52c41a',
  '#13c2c2', '#1677ff', '#2f54eb', '#722ed1', '#eb2f96',
  '#000000', '#ffffff', '#8c8c8c'
];
```

**Solution Implemented**:  
✅ Added optional `presets?: string[]` prop with `DEFAULT_PRESETS` constant:

```tsx
const DEFAULT_PRESETS = [
  '#f5222d', '#fa8c16', '#fadb14', '#8bbb11', '#52c41a',
  '#13c2c2', '#1677ff', '#2f54eb', '#722ed1', '#eb2f96',
  '#000000', '#ffffff', '#8c8c8c'
];

export interface ColorPickerProps {
  // ... existing props
  /**
   * Custom color presets to display in the picker grid
   * @default ['#f5222d', '#fa8c16', '#fadb14', '#8bbb11', '#52c41a', '#13c2c2', '#1677ff', '#2f54eb', '#722ed1', '#eb2f96', '#000000', '#ffffff', '#8c8c8c']
   */
  presets?: string[];
}
```

**Coverage Added**:  
- ✅ Story: `CustomPresets` in `ColorPicker.stories.tsx`
- ✅ Tests: `ColorPicker.test.tsx` with tests for custom presets
- ✅ Documentation: JSDoc comments in component interface

**Impact**: High - Users can now customize color palettes for brand consistency

---

### 2. Calendar (DatePicker) - Hard-coded Quick Select Options ✅ FIXED

**Component**: `Calendar` (used by DatePicker)  
**File**: `src/components/molecules/DatePicker/Calendar.tsx`  
**Line**: 180-185 (DEFAULT_QUICK_SELECT_OPTIONS), 34-40 (quickSelectOptions prop)  
**Priority**: **High**  
**Gap Type**: `preset-list`  
**Status**: ✅ **IMPLEMENTED**

**Issue Description**:  
The Calendar component had hard-coded quick select options ("This week", "Next week", "This month", "Next month") that appeared in the left sidebar when `range={true}`. These options could not be customized.

**Previous Behavior**:  
```tsx
const QUICK_SELECT_OPTIONS = [
  { label: 'This week', value: 'this-week' },
  { label: 'Next week', value: 'next-week' },
  { label: 'This month', value: 'this-month' },
  { label: 'Next month', value: 'next-month' }
];
```

**Solution Implemented**:  
✅ Added optional `quickSelectOptions?: QuickSelectOption[]` prop to Calendar and DatePicker:

```tsx
export interface QuickSelectOption {
  label: string;
  value: string;
}

const DEFAULT_QUICK_SELECT_OPTIONS: QuickSelectOption[] = [
  { label: 'This week', value: 'this-week' },
  { label: 'Next week', value: 'next-week' },
  { label: 'This month', value: 'this-month' },
  { label: 'Next month', value: 'next-month' }
];

interface CalendarProps {
  // ... existing props
  /**
   * Quick select options shown in the left sidebar (range mode only)
   * @default [{ label: 'This week', value: 'this-week' }, { label: 'Next week', value: 'next-week' }, { label: 'This month', value: 'this-month' }, { label: 'Next month', value: 'next-month' }]
   */
  quickSelectOptions?: QuickSelectOption[];
}
```

**Coverage Added**:  
- ✅ Story: `CustomQuickSelectOptions` in `DatePicker.stories.tsx`
- ✅ Tests: `Calendar.test.tsx` and `DatePicker.test.tsx` with tests for custom quickSelectOptions
- ✅ Documentation: JSDoc comments in component interfaces

**Impact**: High - Users can now customize quick select ranges for their application needs (e.g., "Last 7 days", "Last 30 days", "This quarter")

---

### 3. Calendar (Standalone) - Hard-coded Weekday/Month Labels ✅ FIXED

**Component**: `Calendar` (standalone)  
**File**: `src/components/molecules/Calendar/Calendar.tsx`  
**Line**: 62-68 (DEFAULT constants), 40-48 (props)  
**Priority**: **Medium**  
**Gap Type**: `format-options`  
**Status**: ✅ **IMPLEMENTED**

**Issue Description**:  
The standalone Calendar component had hard-coded weekday abbreviations (`['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']`) and month names (`['Jan', 'Feb', ...]`, `['January', 'February', ...]`). While a `locale` prop existed, it only supported 'en' | 'zh' and didn't allow custom labels.

**Previous Behavior**:  
```tsx
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_FULL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
```

**Solution Implemented**:  
✅ Added optional props for custom labels with locale-based defaults (en/zh):

```tsx
const DEFAULT_WEEKDAYS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DEFAULT_MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DEFAULT_MONTHS_FULL_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const DEFAULT_WEEKDAYS_ZH = ['日', '一', '二', '三', '四', '五', '六'];
const DEFAULT_MONTHS_ZH = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
const DEFAULT_MONTHS_FULL_ZH = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

export interface CalendarProps {
  // ... existing props
  /**
   * Custom weekday labels (Sunday to Saturday)
   * @default Based on locale prop
   */
  weekdayLabels?: string[];
  /**
   * Custom month abbreviations
   * @default Based on locale prop
   */
  monthLabels?: string[];
  /**
   * Custom full month names
   * @default Based on locale prop
   */
  monthLabelsFull?: string[];
}
```

**Coverage Added**:  
- ✅ Story: `CustomLabels` in `Calendar.stories.tsx`
- ✅ Tests: `Calendar.test.tsx` with tests for custom labels
- ✅ Documentation: JSDoc comments in component interface

**Impact**: Medium - Users can now customize labels for internationalization and custom date formatting needs

---

### 4. StackedBarChart - Hard-coded Default Colors ✅ FIXED

**Component**: `StackedBarChart`  
**File**: `src/components/molecules/StackedBarChart/StackedBarChart.tsx`  
**Line**: 6 (DEFAULT_COLORS), 41 (defaultColors prop)  
**Priority**: **Medium**  
**Gap Type**: `internal-state-ui`  
**Status**: ✅ **IMPLEMENTED**

**Issue Description**:  
The StackedBarChart component had hard-coded default colors (`['#ffb3c3', '#ff809a', '#ff6384']`) that were used when segments didn't specify a `color` prop. Users could not customize this default color palette.

**Previous Behavior**:  
```tsx
const DEFAULT_COLORS = ['#ffb3c3', '#ff809a', '#ff6384'] as const;

// Used when segment.color is not provided:
const color = segment.color ?? DEFAULT_COLORS[segmentIndex % DEFAULT_COLORS.length];
```

**Solution Implemented**:  
✅ Added optional `defaultColors?: string[]` prop with `DEFAULT_COLORS` constant:

```tsx
const DEFAULT_COLORS = ['#ffb3c3', '#ff809a', '#ff6384'];

export interface StackedBarChartProps {
  // ... existing props
  /**
   * Default color palette for segments without explicit colors
   * @default ['#ffb3c3', '#ff809a', '#ff6384']
   */
  defaultColors?: string[];
}
```

**Coverage Added**:  
- ✅ Story: `CustomDefaultColors` in `StackedBarChart.stories.tsx`
- ✅ Tests: `StackedBarChart.test.tsx` with tests for custom defaultColors
- ✅ Documentation: JSDoc comments in component interface

**Impact**: Medium - Users can now customize default colors for brand-consistent colors across all charts

---

### 5. Chart Components - Hard-coded Default Color Palette

**Component**: All chart components (LineChart, BarChart, PieChart, etc.)  
**File**: `src/components/charts/chartConfig.ts`  
**Line**: 48-54  
**Priority**: **Low**  
**Gap Type**: `internal-state-ui`

**Issue Description**:  
All chart components use a hard-coded `defaultColors` array from `chartConfig.ts` when datasets don't specify colors. This palette cannot be customized per chart instance.

**Current Behavior**:  
```tsx
export const defaultColors = [
  chartColors.teal,
  chartColors.indigo,
  chartColors.blue,
  chartColors.pink,
  chartColors.gold,
];

// Used in chart components:
const baseColor = defaultColors[index % defaultColors.length];
```

**Current API**:  
- Individual datasets can specify `backgroundColor` and `borderColor`
- No prop to customize the default color palette per chart
- Colors are imported from `chartConfig.ts`

**UI Surface**:  
Chart datasets when colors are not explicitly provided

**Proposed Solution**:  
Add optional `defaultColors?: string[]` prop to `BaseChartProps`:

```tsx
export interface BaseChartProps {
  // ... existing props
  /**
   * Default color palette for datasets without explicit colors
   * @default ['#42bdbd', '#0828f7', '#1793e8', '#ff0036', '#ffbe07']
   */
  defaultColors?: string[];
}
```

**Impact**: Low - Users can already customize colors per dataset, but cannot set a default palette per chart instance

---

## Quick Reference Table

| Component | Gap Type | Priority | File | Line |
|-----------|----------|----------|------|------|
| ColorPicker | preset-list | High | `src/components/molecules/ColorPicker/ColorPicker.tsx` | 112-116 |
| Calendar (DatePicker) | preset-list | High | `src/components/molecules/DatePicker/Calendar.tsx` | 180-185 |
| Calendar (Standalone) | format-options | Medium | `src/components/molecules/Calendar/Calendar.tsx` | 47-49 |
| StackedBarChart | internal-state-ui | Medium | `src/components/molecules/StackedBarChart/StackedBarChart.tsx` | 6 |
| Chart Components | internal-state-ui | Low | `src/components/charts/chartConfig.ts` | 48-54 |

---

## Implementation Recommendations

### Phase 1: High Priority (COMPLETED ✅)
1. **ColorPicker presets** - Add `presets?: string[]` prop ✅
   - ✅ Implemented: Added `presets` prop with `DEFAULT_PRESETS` constant
   - ✅ Story added: `CustomPresets` story demonstrating customization
   - ✅ Tests added: Unit tests for custom presets in `ColorPicker.test.tsx`
   - ✅ Documentation: JSDoc comments in component interface
   - Breaking change: No (optional prop with defaults)

2. **Calendar quick select options** - Add `quickSelectOptions?: Array<{label: string, value: string}>` prop ✅
   - ✅ Implemented: Added `quickSelectOptions` prop to Calendar and DatePicker
   - ✅ Story added: `CustomQuickSelectOptions` story demonstrating customization
   - ✅ Tests added: Unit tests for custom quickSelectOptions in `Calendar.test.tsx` and `DatePicker.test.tsx`
   - ✅ Documentation: JSDoc comments in component interfaces
   - Breaking change: No (optional prop with defaults)

### Phase 2: Medium Priority (COMPLETED ✅)
3. **Calendar weekday/month labels** - Add `weekdayLabels`, `monthLabels`, `monthLabelsFull` props ✅
   - ✅ Implemented: Added props with locale-based defaults (en/zh)
   - ✅ Story added: `CustomLabels` story demonstrating customization
   - ✅ Tests added: Unit tests for custom labels in `Calendar.test.tsx`
   - ✅ Documentation: JSDoc comments in component interface
   - Breaking change: No (optional props with locale-based defaults)

4. **StackedBarChart default colors** - Add `defaultColors?: string[]` prop ✅
   - ✅ Implemented: Added `defaultColors` prop with `DEFAULT_COLORS` constant
   - ✅ Story added: `CustomDefaultColors` story demonstrating customization
   - ✅ Tests added: Unit tests for custom defaultColors in `StackedBarChart.test.tsx`
   - ✅ Documentation: JSDoc comments in component interface
   - Breaking change: No (optional prop with defaults)

### Phase 3: Low Priority (Future Enhancement)
5. **Chart components default colors** - Add `defaultColors?: string[]` to `BaseChartProps`
   - Estimated effort: 2-3 hours
   - Breaking change: No (optional prop with defaults)
   - Note: Lower priority since users can already customize per-dataset

---

## Notes

### Components Already Well-Designed
- **PaginationSizeChanger**: Default options `[10, 20, 50, 100]` are exposed via `options` prop ✅
- **NavigationPopover**: `DEFAULT_SECTIONS` exists but `sections` prop allows full customization ✅
- **DatePicker**: `dropdownPresets` prop exists for dropdown menu customization ✅

### Not Considered Gaps
- **Blocks component** hard-coded arrays (`CONDITION_VARIABLES`, `OPERATORS`, etc.) - Template-specific demo data, not user-facing
- **DatePicker date format arrays** - Internal parsing logic, not user-facing
- **useState with position objects** - Internal UI state, not user-facing options

---

## Testing Recommendations

For each fix, add:
1. Story demonstrating customization
2. Unit test verifying prop works correctly
3. Test ensuring defaults still work when prop is not provided
4. Documentation example showing customization

---

**Report Generated**: 2026-01-23  
**Audit Scope**: `src/components` directory  
**Total Components Audited**: ~50+ components
