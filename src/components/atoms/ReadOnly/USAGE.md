# ReadOnly Component

A read-only field display component for showing label-value pairs in different layouts. Perfect for displaying form data, user profiles, and summary information. Built following the exact Figma design specifications.

## Features

- **Dual layouts**: Vertical and horizontal orientations
- **Optional subtext**: Additional context below main value
- **Label icons**: Check icons or custom icons for visual enhancement
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
import { ReadOnly, User, Mail } from 'ft-design-system';

// Default check icon
<ReadOnly 
  label="Email" 
  value="user@example.com" 
  type="vertical"
  labelIcon={true}
/>

// Custom icon
<ReadOnly 
  label="User Info" 
  value="John Doe" 
  type="vertical"
  labelIcon={true}
  icon={<User />}
/>
```

### With Subtext

```tsx
// Additional context information
<ReadOnly 
  label="Phone Number" 
  value="+1 (555) 123-4567" 
  subtext="Primary contact"
  type="vertical"
/>

// With icon and subtext
<ReadOnly 
  label="Department" 
  value="Engineering" 
  subtext="Software Development"
  type="vertical"
  labelIcon={true}
/>
```

### All Variations (From Figma)

```tsx
// 1. Type=Vertical, Subtext=False, Label Icon=False
<ReadOnly label="Label" value="Text" type="vertical" />

// 2. Type=Vertical, Subtext=False, Label Icon=True
<ReadOnly label="Label" value="Text" type="vertical" labelIcon={true} />

// 3. Type=Vertical, Subtext=True, Label Icon=False
<ReadOnly label="Label" value="Text" subtext="Sub text" type="vertical" />

// 4. Type=Vertical, Subtext=True, Label Icon=True
<ReadOnly label="Label" value="Text" subtext="Sub text" type="vertical" labelIcon={true} />

// 5. Type=Horizontal, Subtext=False, Label Icon=False
<ReadOnly label="Label" value="Text" type="horizontal" />

// 6. Type=Horizontal, Subtext=False, Label Icon=True
<ReadOnly label="Label" value="Text" type="horizontal" labelIcon={true} />
```

### Real-World Examples

#### User Profile Display

```tsx
import { ReadOnly, User, Mail, Phone } from 'ft-design-system';

function UserProfile({ user }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
      <ReadOnly
        label="Full Name"
        value={user.name}
        type="vertical"
        labelIcon={true}
        icon={<User />}
      />
      
      <ReadOnly
        label="Email"
        value={user.email}
        type="vertical"
        labelIcon={true}
        icon={<Mail />}
      />
      
      <ReadOnly
        label="Phone"
        value={user.phone}
        subtext="Work number"
        type="vertical"
        labelIcon={true}
        icon={<Phone />}
      />
      
      <ReadOnly
        label="Department"
        value={user.department}
        subtext={user.role}
        type="vertical"
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
        type="horizontal"
        labelIcon={true}
      />
      
      <ReadOnly
        label="Customer"
        value={order.customer}
        subtext="Premium account"
        type="vertical"
        labelIcon={true}
      />
      
      <ReadOnly
        label="Total"
        value={`$${order.total}`}
        subtext="Including taxes"
        type="horizontal"
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
| `label` | `string` | - | The label text |
| `value` | `string` | - | The main value text |
| `subtext` | `string` | - | Optional subtext below the main value |
| `type` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout orientation |
| `labelIcon` | `boolean` | `false` | Whether to show an icon |
| `icon` | `React.ReactNode` | `<CheckFill />` | Custom icon to use |
| `className` | `string` | - | Additional CSS classes |

## Design Specifications

Based on Figma component set with 6 variations:

### Typography

- **Label Text**: Inter, 14px, Medium (500), #5F697B
- **Value Text**: Inter, 16px, Regular (400), #434F64  
- **Subtext**: Inter, 14px, Medium (500), #5F697B

### Layout

- **Vertical Gap**: 8px between label and value, 4px before subtext
- **Horizontal Gap**: 8px between label and value
- **Icon Size**: 16x16px
- **Icon Gap**: 4px from text
- **Fixed Width**: 183px for vertical layouts (as per Figma)

### Visual Elements

- **Default Icon**: CheckFill icon in #434F64
- **Horizontal Labels**: Include colon (":") after label text
- **Text Wrapping**: Values wrap naturally within container

## Layout Guidelines

### When to Use Vertical

- **Profile information** with icons
- **Detailed data** that needs subtext
- **Card layouts** with multiple fields
- **Forms** with complex values

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
7. **Use subtext for context** not essential information 