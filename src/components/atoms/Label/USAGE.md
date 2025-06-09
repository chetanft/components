# Label Component

A versatile form label component that supports mandatory indicators, optional text, and suffix icons. Built following the exact Figma design specifications.

## Features

- **Mandatory indicator**: Red asterisk for required fields
- **Optional text**: "(Optional)" suffix for optional fields  
- **Suffix icons**: Info/alert icons for additional context
- **Flexible rendering**: Can render as `label`, `span`, or `div` elements
- **Accessibility**: Proper `htmlFor` support for form associations
- **Custom icons**: Support for custom icon components

## Usage

### Basic Label

```tsx
import { Label } from 'ft-design-system';

// Simple label
<Label>Email Address</Label>

// With htmlFor for accessibility
<Label htmlFor="email">Email Address</Label>
```

### Mandatory Fields

```tsx
// Shows red asterisk before text
<Label mandatory>Required Field</Label>

// With form association
<Label htmlFor="password" mandatory>Password</Label>
```

### Optional Fields

```tsx
// Shows "(Optional)" after text
<Label optional>Company Name</Label>

// With form association
<Label htmlFor="bio" optional>Bio</Label>
```

### With Suffix Icons

```tsx
// Shows default alert icon
<Label suffixIcon>Phone Number</Label>

// Custom icon
import { AlertInformational } from 'ft-design-system';
<Label suffixIcon icon={<AlertInformational />}>
  Custom Icon Label
</Label>
```

### Combined Variations

```tsx
// Mandatory with suffix icon
<Label mandatory suffixIcon>Required Field with Info</Label>

// Optional with suffix icon
<Label optional suffixIcon>Optional Field with Info</Label>
```

### Different HTML Elements

```tsx
// As span (inline)
<Label as="span" mandatory>Inline Label</Label>

// As div (block)
<Label as="div" optional>Block Label</Label>
```

### Complete Form Example

```tsx
import { Label, Input } from 'ft-design-system';

function ContactForm() {
  return (
    <form>
      <div>
        <Label htmlFor="name" mandatory>Full Name</Label>
        <Input id="name" type="text" placeholder="Enter your name" />
      </div>
      
      <div>
        <Label htmlFor="email" mandatory suffixIcon>Email Address</Label>
        <Input id="email" type="email" placeholder="Enter your email" />
      </div>
      
      <div>
        <Label htmlFor="company" optional>Company</Label>
        <Input id="company" type="text" placeholder="Enter company name" />
      </div>
    </form>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | The text content of the label |
| `mandatory` | `boolean` | `false` | Shows red asterisk for required fields |
| `optional` | `boolean` | `false` | Shows "(Optional)" text |
| `suffixIcon` | `boolean` | `false` | Shows info/alert icon |
| `icon` | `React.ReactNode` | `<AlertCritical />` | Custom icon to use |
| `as` | `'label' \| 'span' \| 'div'` | `'label'` | HTML element to render as |
| `htmlFor` | `string` | - | Associates label with form control |
| `className` | `string` | - | Additional CSS classes |
| `onClick` | `() => void` | - | Click handler |

## Design Specifications

Based on Figma component set with 6 variations:

1. **Basic**: `<Label>Label</Label>`
2. **With Icon**: `<Label suffixIcon>Label</Label>`
3. **Optional**: `<Label optional>Label</Label>`
4. **Optional + Icon**: `<Label optional suffixIcon>Label</Label>`
5. **Mandatory**: `<Label mandatory>Label</Label>`
6. **Mandatory + Icon**: `<Label mandatory suffixIcon>Label</Label>`

### Typography

- **Font Family**: Inter, sans-serif
- **Font Size**: 14px (main text), 12px (optional text)
- **Font Weight**: 500 (main text), 400 (optional text)
- **Line Height**: 1.4
- **Color**: #5F697B (main text), #838C9D (optional text)

### Visual Elements

- **Mandatory Asterisk**: Red (#FF3533) 8x8px star shape
- **Gap**: 4px between elements
- **Suffix Icon**: 16x16px, color #434F64
- **Optional Text**: "(Optional)" in lighter gray

## Accessibility

- Use `htmlFor` prop to associate labels with form controls
- Supports keyboard navigation and screen readers
- Semantic HTML structure with proper ARIA attributes
- Color contrast meets WCAG guidelines

## Best Practices

1. **Always use `htmlFor`** when labeling form inputs
2. **Use `mandatory` for required fields** instead of manual asterisks
3. **Use `optional` for truly optional fields** to improve UX clarity
4. **Use suffix icons sparingly** for important information only
5. **Keep label text concise** and descriptive
6. **Test with screen readers** to ensure accessibility 