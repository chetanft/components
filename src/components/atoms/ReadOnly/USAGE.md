# ReadOnly Component

A read-only field display component for showing label-value pairs in different layouts. Perfect for displaying form data, user profiles, and summary information. Built following the exact Figma design specifications.

## Features

- **Dual layouts**: Vertical and horizontal orientations
- **Label icons**: Optional check icon for visual enhancement
- **Flexible content**: Handles short and long text content
- **Typography consistency**: Follows design system typography rules
- **Accessibility**: Semantic HTML structure for screen readers

## Usage

### Basic Usage

```tsx
import { ReadOnly } from 'ft-design-system';

// Simple vertical layout
<ReadOnly 
  label="Full Name" 
  value="John Smith" 
  type="vertical" 
/>

// Horizontal layout
<ReadOnly 
  label="Status" 
  value="Active" 
  type="horizontal" 
/>
```

### With Icons

```tsx
import { ReadOnly } from 'ft-design-system';

// Default check icon
<ReadOnly 
  label="Email" 
  value="user@example.com" 
  type="Vertical"
  labelIcon={true}
/>
```

### All Variations (From Figma)

```tsx
// 1. Type=Vertical, Label Icon=False
<ReadOnly label="Label" value="Text" type="Vertical" />

// 2. Type=Vertical, Label Icon=True
<ReadOnly label="Label" value="Text" type="Vertical" labelIcon={true} />

// 3. Type=Horizontal, Label Icon=False
<ReadOnly label="Label" value="Text" type="Horizontal" />

// 4. Type=Horizontal, Label Icon=True
<ReadOnly label="Label" value="Text" type="Horizontal" labelIcon={true} />
```

### Real-World Examples

#### User Profile Display

```tsx
import { ReadOnly } from 'ft-design-system';

function UserProfile({ user }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
      <ReadOnly
        label="Full Name"
        value={user.name}
        type="Vertical"
        labelIcon={true}
      />
      
      <ReadOnly
        label="Email"
        value={user.email}
        type="Vertical"
        labelIcon={true}
      />
      
      <ReadOnly
        label="Phone"
        value={user.phone}
        type="Vertical"
        labelIcon={true}
      />
      
      <ReadOnly
        label="Department"
        value={user.department}
        type="Vertical"
      />
    </div>
  );
}
```

#### Form Summary

```tsx
function OrderSummary({ order }) {
  return (
    <div>
      <ReadOnly
        label="Order ID"
        value={order.id}
        type="Horizontal"
        labelIcon={true}
      />
      
      <ReadOnly
        label="Customer"
        value={order.customer}
        type="Vertical"
        labelIcon={true}
      />
      
      <ReadOnly
        label="Total"
        value={`$${order.total}`}
        type="Horizontal"
      />
    </div>
  );
}
```

#### System Information

```tsx
function SystemInfo() {
  const info = [
    { label: 'Version', value: '2.1.4' },
    { label: 'Environment', value: 'Production' },
    { label: 'Last Updated', value: '2 hours ago' },
    { label: 'Status', value: 'Operational' },
  ];

  return (
    <div>
      {info.map((item, index) => (
        <ReadOnly
          key={index}
          label={item.label}
          value={item.value}
          type="horizontal"
        />
      ))}
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `"Label"` | The label text |
| `value` | `string` | `"Text"` | The main value text |
| `type` | `'Vertical' \| 'Horizontal'` | `'Vertical'` | Layout orientation |
| `labelIcon` | `boolean` | `false` | Whether to show a check icon |
| `className` | `string` | - | Additional CSS classes |

## Design Specifications

Based on Figma component set with 4 variations:

### Typography

- **Label Text**: Inter, 14px, Medium (500), #5F697B
- **Value Text**: Inter, 16px, Regular (400), #434F64

### Layout

- **Vertical Gap**: 8px between label and value
- **Horizontal Gap**: 8px between label and value
- **Icon Size**: 16x16px
- **Icon Gap**: 4px from text (horizontal), 10px from label (vertical)
- **Fixed Width**: 183px for vertical layouts, 82px/102px for horizontal (as per Figma)

### Visual Elements

- **Default Icon**: CheckFill icon in #5F697B
- **Horizontal Labels**: Include colon (":") after label text
- **Text Wrapping**: Values wrap naturally within container

## Layout Guidelines

### When to Use Vertical

- **Profile information** with icons
- **Card layouts** with multiple fields
- **Forms** with complex values
- **Detailed data** display

### When to Use Horizontal

- **Simple key-value pairs**
- **Status information**
- **Compact lists**
- **Quick reference data**

## Accessibility

- **Semantic structure**: Uses proper text hierarchy
- **Screen reader friendly**: Clear label-value relationships
- **Color contrast**: Meets WCAG guidelines
- **Focus management**: Supports keyboard navigation when interactive

## Best Practices

1. **Use consistent layouts** within the same context
2. **Keep labels concise** and descriptive
3. **Use icons sparingly** for important information
4. **Group related fields** visually
5. **Consider content length** when choosing layout
6. **Test with long content** to ensure proper wrapping 