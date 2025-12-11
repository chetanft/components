# Component Context Requirements - Complete Guide

## What Was Fixed

Your error **"Dropdown sub-components must be used within a Dropdown component"** revealed a systemic issue: components weren't working as they should out-of-the-box.

This has been **completely fixed** using a universal optional context pattern.

---

## The Fix in 3 Points

### 1. Filter Components Now Work Standalone
```tsx
// ✅ This now works (no provider needed)
<FilterDateRange id="date" startValue={start} endValue={end} ... />
<FilterDropdown id="status" value={val} onChange={set} options={opts} />

// ✅ This also works (adds coordination - only one open at a time)
<PageHeaderFiltersProvider>
  <FilterDateRange id="date" ... />
  <FilterDropdown id="status" ... />
</PageHeaderFiltersProvider>
```

### 2. Dropdown Has Clear APIs
```tsx
// ✅ Simple (use this for most cases)
<Dropdown value={val} onChange={set} options={opts} placeholder="Select..." />

// ✅ Composable (use for custom layouts)
<Dropdown value={val} onChange={set} options={opts}>
  <DropdownTrigger />
  <DropdownContent />
</Dropdown>
```

### 3. Better Error Messages
When errors occur, they now show:
- ✅ Clear problem statement
- ✅ Working code examples
- ✅ Multiple solution paths

---

## Quick Start

### Filters (Optional Provider Pattern)
```tsx
// Standalone - no provider needed
<FilterDateRange 
  id="date-filter"
  startValue={startDate}
  endValue={endDate}
  onStartChange={setStartDate}
  onEndChange={setEndDate}
/>

// Coordinated - with provider
<PageHeaderFiltersProvider>
  <FilterDateRange id="date" ... />
  <FilterDropdown id="status" ... />
  <FilterSearch value={q} ... /> {/* Never needs provider */}
</PageHeaderFiltersProvider>
```

### Dropdown (Choose Your API)
```tsx
// Simple API (recommended)
<Dropdown 
  value={selectedValue}
  onChange={setValue}
  options={options}
  placeholder="Select an option"
/>

// Composable API (for advanced layouts)
<Dropdown value={selectedValue} onChange={setValue} options={options}>
  <DropdownTrigger />
  <DropdownContent />
</Dropdown>
```

### DatePicker (Complete Component)
```tsx
// Just use DatePicker - it handles everything
<DatePicker 
  value={date}
  onChange={setDate}
  placeholder="Select date"
/>

// Or date range
<DatePicker 
  range
  startValue={startDate}
  endValue={endDate}
  onStartChange={setStartDate}
  onEndChange={setEndDate}
/>
```

---

## Documentation Files

| File | Purpose | Size |
|------|---------|------|
| `docs/AI_CONTEXT_REQUIREMENTS.md` | **Complete reference** with all details | 7KB |
| `docs/QUICK_CONTEXT_GUIDE.md` | **30-second quick start** | 1.2KB |
| `SOLUTION_SUMMARY.md` | **Before/after breakdown** | 9KB |
| `CONTEXT_FIXES_SUMMARY.md` | **Technical implementation** | 9KB |

---

## Component Behavior Matrix

| Component | Standalone | With Provider | Notes |
|-----------|-----------|---------------|-------|
| `FilterDateRange` | ✅ Works | ✅ Enhanced | Coordination optional |
| `FilterDropdown` | ✅ Works | ✅ Enhanced | Coordination optional |
| `FilterSearch` | ✅ Works | ❌ N/A | Never needs provider |
| `Dropdown` | ✅ Works | ❌ N/A | Use declarative API |
| `DatePicker` | ✅ Works | ❌ N/A | Complete component |
| `DropdownTrigger` | ❌ Error | ✅ Works | Must use inside Dropdown |
| `DropdownContent` | ❌ Error | ✅ Works | Must use inside Dropdown |

---

## When to Use Each Pattern

### Pattern 1: Standalone Components (Most Common)
Use when you have:
- Single filter on page
- Single dropdown on page
- Single date picker on page

```tsx
<FilterDateRange id="date" ... />
<Dropdown value={v} onChange={set} options={o} />
<DatePicker value={d} onChange={set} />
```

### Pattern 2: Optional Provider (Coordination)
Use when you have:
- Multiple filters on same page
- Want only one filter open at a time
- Need state coordination

```tsx
<PageHeaderFiltersProvider>
  <FilterDateRange id="date" ... />
  <FilterDropdown id="status" ... />
  {/* Both work independently but coordinate via provider */}
</PageHeaderFiltersProvider>
```

### Pattern 3: Composable Dropdown (Custom Layouts)
Use when you have:
- Custom trigger design
- Custom content rendering
- Advanced layout needs

```tsx
<Dropdown value={v} onChange={set} options={o}>
  <CustomTrigger /> {/* as={Slot} to merge props */}
  <CustomContent />
</Dropdown>
```

---

## Error Reference

### "DropdownTrigger/DropdownContent must be inside Dropdown"
**Problem:** Using sub-components without parent  
**Solution:** Either:
1. Use simple Dropdown: `<Dropdown value={v} ... />`
2. Wrap in parent: `<Dropdown><DropdownTrigger /></Dropdown>`

### "DatePickerInput/DatePickerCalendar must be inside DatePicker"
**Problem:** Trying to use internal components  
**Solution:** Use complete DatePicker: `<DatePicker value={d} ... />`

### "(shouldn't see this) Context provider required"
**Problem:** FilterDate Range/Dropdown without provider  
**Solution:** Filters now work standalone - this error is gone!

---

## For AI Assistants

### Best Practices

✅ **DO:**
- Use `<FilterDateRange id="..." ... />` directly
- Use `<Dropdown value={v} onChange={set} options={o} />`
- Use `<DatePicker value={d} onChange={set} />`
- Wrap filters in provider only for coordination
- Reference `docs/AI_CONTEXT_REQUIREMENTS.md`

❌ **DON'T:**
- Try to use `DatePickerInput` separately
- Wrap single filter in unnecessary provider
- Use `DropdownTrigger` without parent Dropdown
- Import internal sub-components
- Assume providers are always required

---

## Migration (If You Had Workarounds)

If you added providers just to prevent errors:

**Before (workaround):**
```tsx
// Even with single filter, needed provider to prevent error
<PageHeaderFiltersProvider>
  <FilterDateRange id="date" ... />
</PageHeaderFiltersProvider>
```

**After (fixed):**
```tsx
// Just use the component
<FilterDateRange id="date" ... />

// Only use provider if you actually need coordination
<PageHeaderFiltersProvider>
  <FilterDateRange id="date" ... />
  <FilterDropdown id="status" ... />
</PageHeaderFiltersProvider>
```

---

## Testing Your Usage

Quick checklist:

- [ ] Filters work without provider → ✅
- [ ] Dropdown works with simple API → ✅
- [ ] DatePicker works standalone → ✅
- [ ] Error messages are helpful → ✅
- [ ] No breaking changes → ✅

---

## Key Principle

### "Components work by default, gain features optionally"

- Components function independently
- Providers enhance functionality (coordination)
- No forced boilerplate
- Clear error messages when you go wrong

---

## Questions?

1. **How do I use FilterDateRange?**  
   Just use it: `<FilterDateRange id="date" ... />`

2. **Do I always need PageHeaderFiltersProvider?**  
   No - only if you have multiple filters and want coordination

3. **Which Dropdown API should I use?**  
   Simple API for most cases: `<Dropdown value={v} ... />`

4. **Can I use DatePickerInput separately?**  
   No - DatePicker is complete, use `<DatePicker value={d} ... />`

5. **Are there breaking changes?**  
   No - all existing code continues to work

---

## Summary

✅ **All components work standalone**  
✅ **Providers are optional for coordination**  
✅ **Error messages are helpful**  
✅ **No breaking changes**  
✅ **Production ready**  

**Start using the components as expected - they just work!**
