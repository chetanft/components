# Dropdown API Migration Guide

## Overview

The Dropdown component has been enhanced with support for rich options including ReactNode labels, descriptions, icons, and grouping. The `onSelect` prop is deprecated in favor of `onChange`.

---

## Breaking Changes

None - all changes are backward compatible with deprecation warnings.

---

## New Features

### 1. ReactNode Labels

**Before** (string only):
```tsx
<Dropdown
  options={[
    { value: '1', label: 'Option 1' }
  ]}
/>
```

**After** (ReactNode supported):
```tsx
<Dropdown
  options={[
    { 
      value: '1', 
      label: <span className="font-bold">Featured Option</span>
    }
  ]}
/>
```

### 2. Descriptions

Add two-line options with descriptions:

```tsx
<Dropdown
  options={[
    {
      value: 'user1',
      label: 'John Doe',
      description: 'Software Engineer - Team Lead'
    }
  ]}
/>
```

### 3. Custom Icons

```tsx
<Dropdown
  options={[
    {
      value: 'settings',
      label: 'Settings',
      icon: <SettingsIcon className="w-4 h-4" />
    }
  ]}
/>
```

### 4. Grouped Options

```tsx
<Dropdown
  type="groups"
  options={[
    { value: 'apple', label: 'Apple', group: 'Fruits' },
    { value: 'banana', label: 'Banana', group: 'Fruits' },
    { value: 'carrot', label: 'Carrot', group: 'Vegetables' }
  ]}
/>
```

### 5. Search Optimization

For ReactNode labels, provide searchValue:

```tsx
<Dropdown
  type="search"
  options={[
    {
      value: '1',
      label: <span>Complex <strong>Label</strong></span>,
      searchValue: 'Complex Label' // Used for filtering
    }
  ]}
/>
```

---

## Deprecated Props

### `onSelect` → `onChange`

**Deprecated**:
```tsx
<Dropdown
  onSelect={(value) => console.log(value)} // Will show warning
/>
```

**Recommended**:
```tsx
<Dropdown
  onChange={(value) => console.log(value)}
/>
```

**Migration**: Replace all `onSelect` with `onChange`. Both currently work, but `onSelect` will be removed in v3.0.0.

---

## Updated Type Definitions

```typescript
interface DropdownOption {
  value: string | number;
  label: React.ReactNode;  // Changed from string
  disabled?: boolean;
  description?: React.ReactNode;  // NEW
  icon?: React.ReactNode;  // NEW
  group?: string;  // NEW
  searchValue?: string;  // NEW - for ReactNode label search
}

interface DropdownProps {
  // ... existing props
  onChange?: (value: string | number) => void;
  onSelect?: (value: string) => void;  // DEPRECATED
  type?: 'normal' | 'search' | 'groups';  // Added 'groups'
}
```

---

## Migration Steps

### Step 1: Update Event Handlers

Find and replace:
```bash
# Search for
onSelect={

# Replace with
onChange={
```

### Step 2: Add Rich Features (Optional)

Enhance your dropdowns with new capabilities:

```tsx
// Before: Simple dropdown
<Dropdown
  options={[
    { value: '1', label: 'User 1' },
    { value: '2', label: 'User 2' }
  ]}
  onSelect={handleSelect}
/>

// After: Rich dropdown with icons and descriptions
<Dropdown
  options={[
    {
      value: '1',
      label: 'John Doe',
      description: 'john@example.com',
      icon: <UserIcon />
    },
    {
      value: '2',
      label: 'Jane Smith',
      description: 'jane@example.com',
      icon: <UserIcon />
    }
  ]}
  onChange={handleChange}
/>
```

### Step 3: Test

- Verify dropdown still works with simple string labels
- Test search functionality with ReactNode labels
- Confirm onChange receives correct values

---

## Timeline

- **v2.x**: `onSelect` deprecated, both work
- **v3.0.0**: `onSelect` removed, use `onChange` only

---

## Examples

See `Dropdown.stories.tsx`:
- `RichOptions`: Demonstrates all new features
- `GroupedOptions`: Shows grouped dropdown usage
