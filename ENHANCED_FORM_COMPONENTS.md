# Enhanced Form Components (v4.6.0)

This document outlines the enhanced Input and Dropdown components that now integrate with the new Label component, providing consistent label styling and functionality across all form elements.

## Overview

Both Input and Dropdown components have been updated to use the unified Label component, which provides:
- Mandatory field indicators (red asterisk)
- Optional field text
- Suffix icons with custom icon support
- Consistent styling and accessibility

## Enhanced Input Component

### New Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `labelMandatory` | `boolean` | `false` | Shows mandatory indicator (red asterisk) |
| `labelOptional` | `boolean` | `false` | Shows "(Optional)" text |
| `labelSuffixIcon` | `boolean` | `false` | Shows suffix icon (default: CheckFill) |
| `labelIcon` | `React.ReactNode` | `undefined` | Custom icon to display |

### Usage Examples

```tsx
import { Input } from 'ft-design-system';
import { Mail, Phone } from 'ft-design-system';

// Basic input with mandatory indicator
<Input
  label="Email Address"
  placeholder="Enter your email"
  type="email"
  labelMandatory={true}
/>

// Optional field
<Input
  label="Middle Name"
  placeholder="Enter your middle name"
  labelOptional={true}
/>

// With custom icon
<Input
  label="Contact Email"
  placeholder="Enter contact email"
  type="email"
  labelSuffixIcon={true}
  labelIcon={<Mail />}
/>

// Mandatory with custom icon
<Input
  label="User Information"
  placeholder="Enter user details"
  labelMandatory={true}
  labelSuffixIcon={true}
  labelIcon={<User />}
/>
```

## Enhanced Dropdown Component

### New Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `labelMandatory` | `boolean` | `false` | Shows mandatory indicator (red asterisk) |
| `labelOptional` | `boolean` | `false` | Shows "(Optional)" text |
| `labelSuffixIcon` | `boolean` | `false` | Shows suffix icon (default: CheckFill) |
| `labelIcon` | `React.ReactNode` | `undefined` | Custom icon to display |
| `required` | `boolean` | `false` | Backward compatibility - acts as `labelMandatory` |

### Usage Examples

```tsx
import { Dropdown } from 'ft-design-system';
import { User, AlertInformational } from 'ft-design-system';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
];

// Basic dropdown with mandatory indicator
<Dropdown
  label="Department"
  placeholder="Select your department"
  options={options}
  labelMandatory={true}
/>

// Optional field
<Dropdown
  label="Secondary Department"
  placeholder="Select secondary department"
  options={options}
  labelOptional={true}
/>

// With custom icon
<Dropdown
  label="User Role"
  placeholder="Select user role"
  options={options}
  labelSuffixIcon={true}
  labelIcon={<User />}
/>

// Backward compatibility with required prop
<Dropdown
  label="Legacy Required Field"
  placeholder="Select an option"
  options={options}
  required={true}
/>
```

## Backward Compatibility

### Input Component
All existing Input component usage remains compatible. The new label props are optional and don't affect existing implementations.

### Dropdown Component
The existing `required` prop is maintained for backward compatibility and automatically acts as `labelMandatory` when set to `true` (unless `labelOptional` is explicitly set).

## Migration Guide

### From Custom Labels to Enhanced Components

**Before:**
```tsx
<div>
  <label style={{ fontWeight: '500', marginBottom: '8px' }}>
    Email Address <span style={{ color: '#FF3533' }}>*</span>
  </label>
  <input type="email" placeholder="Enter email" />
</div>
```

**After:**
```tsx
<Input
  label="Email Address"
  placeholder="Enter email"
  type="email"
  labelMandatory={true}
/>
```

### Benefits of Migration

1. **Consistency**: All labels follow the same design system
2. **Accessibility**: Proper `htmlFor` associations and aria attributes
3. **Maintainability**: Centralized label styling and behavior
4. **Flexibility**: Easy to add icons and indicators
5. **Type Safety**: Full TypeScript support

## Form Examples

### Complete Registration Form

```tsx
import { Input, Dropdown } from 'ft-design-system';
import { Mail, Phone, User } from 'ft-design-system';

const RegistrationForm = () => {
  return (
    <form>
      {/* Mandatory fields */}
      <Input
        label="First Name"
        placeholder="Enter first name"
        labelMandatory={true}
      />
      
      <Input
        label="Email Address"
        placeholder="Enter email"
        type="email"
        labelMandatory={true}
        labelSuffixIcon={true}
        labelIcon={<Mail />}
      />
      
      <Dropdown
        label="Department"
        placeholder="Select department"
        options={departmentOptions}
        labelMandatory={true}
        labelSuffixIcon={true}
        labelIcon={<User />}
      />
      
      {/* Optional fields */}
      <Input
        label="Phone Number"
        placeholder="Enter phone number"
        type="tel"
        labelOptional={true}
        labelSuffixIcon={true}
        labelIcon={<Phone />}
      />
      
      <Input
        label="Bio"
        placeholder="Tell us about yourself"
        labelOptional={true}
      />
    </form>
  );
};
```

## Storybook Examples

The enhanced components are demonstrated in the Storybook under "Enhanced/Form Components with Labels" with the following stories:

- **InputVariations**: Shows all Input label variations
- **DropdownVariations**: Shows all Dropdown label variations  
- **CompleteForm**: Interactive form with state management
- **Comparison**: Before/after comparison

## Technical Details

### Label Component Integration

Both components now import and use the `Label` component internally:

```tsx
import { Label } from '../Label/Label';

// In component render
{label && (
  <Label 
    htmlFor={inputId}
    mandatory={labelMandatory}
    optional={labelOptional}
    suffixIcon={labelSuffixIcon}
    icon={labelIcon}
  >
    {label}
  </Label>
)}
```

### TypeScript Support

All new props are fully typed and include JSDoc documentation for IDE support.

### Accessibility

- Proper `htmlFor` associations between labels and form elements
- ARIA attributes for screen readers
- Semantic HTML structure maintained

## Version History

- **v4.6.0**: Enhanced Input and Dropdown components with Label integration
- **v4.4.0**: Initial Label component introduction
- **v4.5.0**: ReadOnly component addition

## Related Components

- [Label Component](./src/components/atoms/Label/USAGE.md)
- [ReadOnly Component](./src/components/atoms/ReadOnly/USAGE.md) 