# Component Context & Provider Requirements Guide

## Overview

This guide explains which components require context providers and which work standalone. Use this when:
- Components throw context-related errors
- Using components in new projects
- Building with AI assistants (provide this doc as context)

---

## Category 1: Optional Context (Works Standalone + With Provider)

These components **work independently** AND gain additional features when wrapped in a provider.

### Filter Components: FilterDateRange & FilterDropdown

**Standalone mode** (each filter manages its own state):
```tsx
import { FilterDateRange, FilterDropdown } from 'ft-design-system';

// ✅ Works perfectly fine alone
<FilterDateRange
  id="date-filter"
  startValue={startDate}
  endValue={endDate}
  onStartChange={setStartDate}
  onEndChange={setEndDate}
/>

<FilterDropdown
  id="status"
  value={status}
  onChange={setStatus}
  options={statusOptions}
/>
```

**Coordinated mode** (only one filter open at a time):
```tsx
import { PageHeaderFiltersProvider, FilterDateRange, FilterDropdown } from 'ft-design-system';

// ✅ With provider: automatically closes other filters when one opens
<PageHeaderFiltersProvider>
  <FilterDateRange id="date" ... />
  <FilterDropdown id="status" ... />
  <FilterSearch id="search" ... />
</PageHeaderFiltersProvider>
```

**When to use provider:**
- Multiple filters on same page
- Want only one filter open at a time
- Mobile experience needs coordination

**When NOT to use provider:**
- Single filter on page
- Multiple independent filters (each can be open)
- Simple form with filters

---

## Category 2: Complete Components (No Sub-components Needed)

These are full components. Don't try to import their internal sub-components.

### Dropdown

**✅ Use declarative API (most common):**
```tsx
<Dropdown
  value={selectedValue}
  onChange={setValue}
  options={options}
  placeholder="Select an option"
/>
```

**✅ Use composable API (for custom layouts):**
```tsx
<Dropdown value={selectedValue} onChange={setValue} options={options}>
  <DropdownTrigger />
  <DropdownContent />
</Dropdown>
```

**❌ Don't do this** (will throw error):
```tsx
// Error! DropdownTrigger requires parent Dropdown
<DropdownTrigger />
```

**When to use composable:**
- Custom trigger design
- Custom content rendering
- Advanced layout needs

**When to use declarative:**
- Standard dropdown (most cases)
- Quick implementation
- No custom layout needed

---

### DatePicker

**✅ Use as complete component:**
```tsx
// Single date
<DatePicker
  value={date}
  onChange={setDate}
  placeholder="Select date"
/>

// Date range
<DatePicker
  range
  startValue={startDate}
  endValue={endDate}
  onStartChange={setStartDate}
  onEndChange={setEndDate}
/>
```

**❌ Don't do this** (will throw error):
```tsx
// Error! DatePickerInput requires parent DatePicker
import { DatePickerInput, DatePickerCalendar } from 'ft-design-system';
<DatePickerInput />
```

DatePicker manages all internals. There's no composable API for DatePicker.

---

### FilterSearch

**Always works standalone:**
```tsx
<FilterSearch
  value={searchTerm}
  onChange={setSearchTerm}
  placeholder="Search..."
/>
```

No provider needed. This component is independent.

---

## Error Messages & Solutions

### Error: "DropdownTrigger/DropdownContent must be inside a <Dropdown> parent"

**Problem:** Using Dropdown sub-components without parent

**Solutions:**

Option 1 - Simple declarative:
```tsx
<Dropdown value={val} onChange={setVal} options={opts} />
```

Option 2 - Composable:
```tsx
<Dropdown value={val} onChange={setVal} options={opts}>
  <DropdownTrigger />
  <DropdownContent />
</Dropdown>
```

---

### Error: "DatePickerInput/DatePickerCalendar must be inside a <DatePicker> parent"

**Problem:** Using DatePicker sub-components separately

**Solution:** Use DatePicker as a complete component:
```tsx
<DatePicker
  value={date}
  onChange={setDate}
  placeholder="Select date"
/>
```

---

### Error: "FilterDateRange must be wrapped in PageHeaderFiltersProvider"

**This error should NOT happen anymore.** FilterDateRange works standalone.

If you get this error, update your code:
```tsx
// ✅ Works without provider
<FilterDateRange id="date" ... />

// ✅ Also works with provider
<PageHeaderFiltersProvider>
  <FilterDateRange id="date" ... />
</PageHeaderFiltersProvider>
```

---

## Quick Reference Table

| Component | Works Standalone? | Requires Provider? | Provider Name | Notes |
|-----------|-------------------|-------------------|---------------|-------|
| `FilterDateRange` | ✅ Yes | ❌ No (optional) | `PageHeaderFiltersProvider` | Provider adds multi-filter coordination |
| `FilterDropdown` | ✅ Yes | ❌ No (optional) | `PageHeaderFiltersProvider` | Provider adds multi-filter coordination |
| `FilterSearch` | ✅ Yes | ❌ No | None | Always standalone |
| `Dropdown` | ✅ Yes (declarative) | ❌ No | None | Use declarative API for simplicity |
| `DropdownTrigger` | ❌ No | ✅ Yes | `Dropdown` | Sub-component, requires parent |
| `DropdownContent` | ❌ No | ✅ Yes | `Dropdown` | Sub-component, requires parent |
| `DatePicker` | ✅ Yes | ❌ No | None | Complete component, no sub-components |
| `DatePickerInput` | ❌ No | ✅ Yes | `DatePicker` | Internal sub-component |
| `DatePickerCalendar` | ❌ No | ✅ Yes | `DatePicker` | Internal sub-component |

---

## Architecture: Optional Context Pattern (For Component Developers)

If building a component that should work both standalone and with coordination:

```tsx
// Step 1: Create optional hook (returns undefined if no provider)
export function useMyContextOptional() {
  return useContext(MyContext);
}

// Step 2: Component uses fallback to local state
function MyFilter({ id, value, onChange }) {
  const context = useMyContextOptional();
  const [localOpen, setLocalOpen] = useState(null);
  
  // Use context if available, otherwise fall back to local state
  const openId = context?.openId ?? localOpen;
  const setOpenId = context?.setOpenId ?? setLocalOpen;
  
  // Component now works in both modes
  return <div>...</div>;
}
```

**Benefits:**
- Component works standalone (local state)
- Component gains coordination features when wrapped in provider
- No breaking errors
- No forced boilerplate

---

## For AI Assistants

When you see a component error related to context:

1. **Check if component works standalone** - Most modern components do
2. **Check if provider is optional** - Use provider only if needed for coordination
3. **Use simple/declarative APIs** - Prefer simple usage over composable when possible
4. **Avoid importing internal sub-components** - They're implementation details

Example good prompt:
> "Create a date filter using FilterDateRange that works standalone. If I add multiple filters later, I can wrap them in PageHeaderFiltersProvider for coordination."

Example bad prompt:
> "Use DatePickerInput and DatePickerCalendar to build a date picker"
> (These are internal, use `<DatePicker>` instead)
