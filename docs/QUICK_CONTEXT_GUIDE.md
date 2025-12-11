# Quick Context Guide

## In 30 Seconds

| Component | Use Case | Code |
|-----------|----------|------|
| **FilterDateRange** | Standalone date filter | `<FilterDateRange id="date" ... />` |
| **FilterDropdown** | Standalone dropdown filter | `<FilterDropdown id="status" ... />` |
| **FilterSearch** | Standalone search filter | `<FilterSearch value={q} ... />` |
| **Dropdown** | Simple select | `<Dropdown value={v} onChange={set} options={o} />` |
| **DatePicker** | Date picker | `<DatePicker value={d} onChange={set} />` |

## When You Need Coordination

Only one filter open at a time:

```tsx
<PageHeaderFiltersProvider>
  <FilterDateRange id="date" ... />
  <FilterDropdown id="status" ... />
</PageHeaderFiltersProvider>
```

## For Composition

Custom Dropdown layout:

```tsx
<Dropdown value={v} onChange={set} options={o}>
  <DropdownTrigger />
  <DropdownContent />
</Dropdown>
```

## If You Get an Error

### Error: "DropdownTrigger must be inside Dropdown"
→ Use simple Dropdown or wrap in parent

### Error: "DatePickerInput must be inside DatePicker"  
→ Use `<DatePicker>` directly

### Error: "No provider" (shouldn't happen now)
→ Filters work standalone, provider is optional

## Reference
→ `docs/AI_CONTEXT_REQUIREMENTS.md` for details
