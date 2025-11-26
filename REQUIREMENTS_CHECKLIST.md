# DatePicker Requirements Checklist

## ✅ **1. Basic Date Range Types**

### **A. Fixed (preset) ranges**

| Requirement | Status | Notes |
|------------|--------|-------|
| Today | ❌ **MISSING** | Not implemented |
| Yesterday | ❌ **MISSING** | Not implemented |
| Last 7 days | ❌ **MISSING** | Not implemented |
| Last 14 days | ❌ **MISSING** | Not implemented |
| Last 30 days | ❌ **MISSING** | Not implemented |
| This week (Mon–Sun) | ✅ **IMPLEMENTED** | Uses `startOfWeek` and `endOfWeek` |
| Previous week | ⚠️ **PARTIAL** | Code exists but not in UI (`last-week` in code) |
| This month | ✅ **IMPLEMENTED** | Uses `startOfMonth` and `endOfMonth` |
| Previous month | ⚠️ **PARTIAL** | Code exists but not in UI (`last-month` in code) |
| This quarter | ❌ **MISSING** | Not implemented |
| Previous quarter | ❌ **MISSING** | Not implemented |
| This year | ❌ **MISSING** | Not implemented |
| Previous year | ❌ **MISSING** | Not implemented |

**Current Implementation:** Only 4 presets visible: "This week", "Next week", "This month", "Next month"

### **B. Custom Range**

| Requirement | Status | Notes |
|------------|--------|-------|
| User picks start + end date | ✅ **IMPLEMENTED** | Working |
| End date cannot be before start | ⚠️ **PARTIAL** | Auto-swaps but no error message |
| Max range limit validation | ❌ **MISSING** | No max range check |
| Error message for invalid range | ❌ **MISSING** | No error display |

### **C. Quick Actions**

| Requirement | Status | Notes |
|------------|--------|-------|
| "Clear" button | ❌ **MISSING** | Not implemented |
| "Apply" button | ✅ **IMPLEMENTED** | Closes popup |
| "Cancel" button | ✅ **IMPLEMENTED** | Reverts to previous state |

---

## ✅ **2. Behaviour Rules (UX standard)**

### **1. When user clicks component**

| Requirement | Status | Notes |
|------------|--------|-------|
| Open calendar dropdown | ✅ **IMPLEMENTED** | Opens on click |
| Show presets on left side | ✅ **IMPLEMENTED** | Quick select panel visible |
| Show calendar on right side | ✅ **IMPLEMENTED** | Two months side-by-side |
| Highlight selected range | ✅ **IMPLEMENTED** | Start/end dates highlighted |

### **2. Hover behaviour**

| Requirement | Status | Notes |
|------------|--------|-------|
| Hover preview highlight | ❌ **MISSING** | No hover preview to second date |

### **3. Partial selection**

| Requirement | Status | Notes |
|------------|--------|-------|
| Select start date → don't close | ✅ **IMPLEMENTED** | Popup stays open |
| Select end date → highlight range | ✅ **IMPLEMENTED** | Range highlighting works |

### **4. Invalid actions**

| Requirement | Status | Notes |
|------------|--------|-------|
| Cannot choose disabled day | ✅ **IMPLEMENTED** | `disabled` prop supported |
| End date before start → auto swap | ✅ **IMPLEMENTED** | Auto-swaps in code |
| Error message for invalid range | ❌ **MISSING** | No error display |

### **5. Clear behaviour**

| Requirement | Status | Notes |
|------------|--------|-------|
| Clear button exists | ❌ **MISSING** | No clear button |
| Sets both dates to null | ❌ **MISSING** | No clear functionality |
| Shows "Select date range" | ❌ **MISSING** | No placeholder update |

### **6. Apply behaviour**

| Requirement | Status | Notes |
|------------|--------|-------|
| Menu closes | ✅ **IMPLEMENTED** | `setIsOpen(false)` |
| Filter event triggers | ⚠️ **PARTIAL** | Callbacks exist but no filter event |
| Shows selected range in input | ✅ **IMPLEMENTED** | Format: "MM/DD/YYYY → MM/DD/YYYY" |

---

## ✅ **3. Calendar Rendering Logic**

### **A. Marking days**

| Requirement | Status | Notes |
|------------|--------|-------|
| Selected start date highlighted | ✅ **IMPLEMENTED** | `rangeStart` type |
| Selected end date highlighted | ✅ **IMPLEMENTED** | `rangeEnd` type |
| Dates inside range filled | ✅ **IMPLEMENTED** | `rangeSelected` type |
| Disabled dates greyed | ✅ **IMPLEMENTED** | `disabled` type |

### **B. Two month calendar**

| Requirement | Status | Notes |
|------------|--------|-------|
| Current month + next month | ✅ **IMPLEMENTED** | Two months side-by-side |

### **C. Navigation**

| Requirement | Status | Notes |
|------------|--------|-------|
| Next month button | ✅ **IMPLEMENTED** | Chevron right |
| Previous month button | ✅ **IMPLEMENTED** | Chevron left |
| Year navigation | ✅ **IMPLEMENTED** | Double arrows |
| Min/max limits disable buttons | ⚠️ **PARTIAL** | `minDate`/`maxDate` props exist but navigation not disabled |

---

## ✅ **4. API Logic (Backend)**

| Requirement | Status | Notes |
|------------|--------|-------|
| Input structure with startDate/endDate | ⚠️ **PARTIAL** | Uses `onStartChange`/`onEndChange` but format is ISO string |
| Preset field in API | ❌ **MISSING** | No preset identifier returned |
| Date format validation | ❌ **MISSING** | No validation |
| End < start error | ⚠️ **PARTIAL** | Auto-swaps but no error |
| Range too large error | ❌ **MISSING** | No max range check |
| Auto-adjust dates | ❌ **MISSING** | No auto-adjustment |

---

## ✅ **5. Edge Cases**

| Requirement | Status | Notes |
|------------|--------|-------|
| Different months | ✅ **IMPLEMENTED** | Works across months |
| Different years | ✅ **IMPLEMENTED** | Works across years |
| Leap year (Feb 29) | ✅ **IMPLEMENTED** | `date-fns` handles it |
| Timezone handling | ⚠️ **PARTIAL** | Uses `toISOString()` but no explicit timezone conversion |
| Server vs browser date | ❌ **MISSING** | No server date sync |
| Double click same date | ✅ **IMPLEMENTED** | Sets start = end |
| Range overflow error | ❌ **MISSING** | No max range validation |

---

## ✅ **6. Preset Range Logic**

| Preset | Status | Implementation |
|--------|--------|----------------|
| Today | ❌ **MISSING** | Not implemented |
| Yesterday | ❌ **MISSING** | Not implemented |
| Last 7 Days | ❌ **MISSING** | Not implemented |
| Last 14 Days | ❌ **MISSING** | Not implemented |
| Last 30 Days | ❌ **MISSING** | Not implemented |
| This Week | ✅ **IMPLEMENTED** | `startOfWeek(today)` to `endOfWeek(today)` |
| Previous Week | ⚠️ **PARTIAL** | Code exists (`subWeeks(startOfWeek(today), 1)`) but not in UI |
| This Month | ✅ **IMPLEMENTED** | `startOfMonth(today)` to `endOfMonth(today)` |
| Previous Month | ⚠️ **PARTIAL** | Code exists (`subMonths(today, 1)`) but not in UI |
| This Quarter | ❌ **MISSING** | Not implemented |
| Previous Quarter | ❌ **MISSING** | Not implemented |
| This Year | ❌ **MISSING** | Not implemented |
| Previous Year | ❌ **MISSING** | Not implemented |

---

## ✅ **7. UI State Machine**

| State | Status | Notes |
|-------|--------|-------|
| Idle (nothing selected) | ✅ **IMPLEMENTED** | Shows placeholder |
| Calendar open | ✅ **IMPLEMENTED** | Opens on click |
| Start date picked | ✅ **IMPLEMENTED** | Highlights start date |
| Full range selected | ✅ **IMPLEMENTED** | Highlights complete range |
| Applied | ✅ **IMPLEMENTED** | Closes popup, updates input |
| Cleared | ❌ **MISSING** | No clear functionality |

---

## ✅ **8. Good UX Behaviours**

| Requirement | Status | Notes |
|------------|--------|-------|
| Auto-highlight preset if custom matches | ⚠️ **PARTIAL** | Code exists (`isQuickSelectActive`) but only for 4 presets |
| Keyboard navigation (←↑↓→) | ❌ **MISSING** | Not implemented |
| Manual date typing | ❌ **MISSING** | Input is read-only |
| Error for wrong formats | ❌ **MISSING** | No format validation |
| Disable future dates | ⚠️ **PARTIAL** | `maxDate` prop exists but not enforced in UI |
| Tooltip for weekday name | ❌ **MISSING** | Not implemented |
| Remember last selected range | ❌ **MISSING** | No persistence |

---

## 📊 **Summary**

### ✅ **Implemented (Working)**
- Basic custom range selection
- Two-month calendar view
- Date highlighting (start, end, in-range)
- Apply/Cancel buttons
- Basic preset options (4 out of 14 required)
- Cross-month/year ranges
- Disabled dates

### ⚠️ **Partially Implemented**
- Preset detection (code exists but not all presets in UI)
- End date validation (auto-swaps but no error message)
- Min/max date limits (props exist but not fully enforced)
- Timezone handling (basic but not explicit)

### ❌ **Missing (Critical)**
- **10 out of 14 preset ranges** (Today, Yesterday, Last 7/14/30 days, Quarters, Years, Previous week/month)
- **Clear button** and functionality
- **Hover preview** behavior
- **Keyboard navigation**
- **Manual date typing**
- **Error messages** for invalid ranges
- **Max range validation**
- **Preset auto-highlighting** for all presets
- **API preset field**
- **Server date sync**

---

## 🎯 **Priority Fixes Needed**

1. **HIGH PRIORITY:**
   - Add missing preset ranges (Today, Yesterday, Last 7/14/30 days, etc.)
   - Add Clear button
   - Add error messages for invalid ranges
   - Add max range validation

2. **MEDIUM PRIORITY:**
   - Add hover preview behavior
   - Add keyboard navigation
   - Add manual date typing
   - Add preset auto-highlighting for all presets

3. **LOW PRIORITY:**
   - Add tooltips
   - Add range persistence
   - Improve timezone handling
   - Add server date sync







