# Using ft-design-system in Your Project

This guide shows how to install and use the design system in your React project.

## Installation

### 1. Install the Package

#### From GitHub Packages
```bash
npm install ft-design-system
```

#### From npm (if published)
```bash
npm install ft-design-system
```

### 2. Configure .npmrc (for GitHub Packages)

Create a `.npmrc` file in your project root:

```
@chetanft:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

## Setup

### 1. Import Styles

Add the design system styles to your main app file:

```tsx
// src/App.tsx or src/index.tsx
import 'ft-design-system/dist/styles.css';
```

### 2. Configure Tailwind (Optional)

If you're using Tailwind CSS in your project, add the design system to your content paths:

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/ft-design-system/**/*.{js,jsx,ts,tsx}' // Add this line
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## Usage Examples

### Basic Components

```tsx
import React from 'react';
import { 
  Button, 
  Input, 
  Badge, 
  Checkbox,
  DatePicker 
} from 'ft-design-system';

function MyApp() {
  return (
    <div className="p-8 space-y-4">
      {/* Buttons */}
      <div className="space-x-2">
        <Button variant="primary">Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="destructive">Delete</Button>
      </div>

      {/* Input */}
      <Input 
        placeholder="Enter your name"
        type="text"
      />

      {/* Badges */}
      <div className="space-x-2">
        <Badge variant="default">Default</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
      </div>

      {/* Checkbox */}
      <Checkbox 
        label="Accept terms and conditions"
        checked={true}
      />

      {/* Date Picker */}
      <DatePicker 
        placeholder="Select date"
        onDateChange={(date) => console.log(date)}
      />
    </div>
  );
}

export default MyApp;
```

### Table Component

```tsx
import React from 'react';
import { Table } from 'ft-design-system';

const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
];

const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email' },
  { key: 'status', header: 'Status' },
];

function UsersTable() {
  return (
    <Table
      variant="primary"
      data={data}
      columns={columns}
      selectable
      onRowSelect={(selectedRows) => console.log(selectedRows)}
      onSort={(column, direction) => console.log(column, direction)}
    />
  );
}
```

### Icons

```tsx
import React from 'react';
import { 
  CheckIcon, 
  XMarkIcon, 
  UserIcon,
  // ... other icons
} from 'ft-design-system';

function IconExample() {
  return (
    <div className="flex space-x-4">
      <CheckIcon className="w-6 h-6 text-green-500" />
      <XMarkIcon className="w-6 h-6 text-red-500" />
      <UserIcon className="w-6 h-6 text-blue-500" />
    </div>
  );
}
```

### TypeScript Support

The design system includes full TypeScript support:

```tsx
import React from 'react';
import { 
  Button, 
  ButtonProps, 
  TableProps, 
  BadgeVariant 
} from 'ft-design-system';

// Type-safe props
interface MyComponentProps {
  variant: BadgeVariant;
  onSubmit: () => void;
}

const MyComponent: React.FC<MyComponentProps> = ({ variant, onSubmit }) => {
  const buttonProps: ButtonProps = {
    variant: 'primary',
    onClick: onSubmit,
    children: 'Submit'
  };

  return (
    <div>
      <Button {...buttonProps} />
      <Badge variant={variant}>Status</Badge>
    </div>
  );
};
```

### Form Example

```tsx
import React, { useState } from 'react';
import { 
  Input, 
  Button, 
  Checkbox, 
  RadioGroup,
  DatePicker 
} from 'ft-design-system';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subscribe: false,
    contactMethod: 'email',
    preferredDate: null
  });

  return (
    <form className="space-y-6 max-w-md">
      <Input
        label="Full Name"
        placeholder="Enter your name"
        value={formData.name}
        onChange={(e) => setFormData(prev => ({ 
          ...prev, 
          name: e.target.value 
        }))}
      />

      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={(e) => setFormData(prev => ({ 
          ...prev, 
          email: e.target.value 
        }))}
      />

      <RadioGroup
        name="contactMethod"
        options={[
          { value: 'email', label: 'Email' },
          { value: 'phone', label: 'Phone' },
          { value: 'text', label: 'Text Message' }
        ]}
        value={formData.contactMethod}
        onChange={(value) => setFormData(prev => ({ 
          ...prev, 
          contactMethod: value 
        }))}
      />

      <DatePicker
        label="Preferred Contact Date"
        onDateChange={(date) => setFormData(prev => ({ 
          ...prev, 
          preferredDate: date 
        }))}
      />

      <Checkbox
        label="Subscribe to newsletter"
        checked={formData.subscribe}
        onChange={(checked) => setFormData(prev => ({ 
          ...prev, 
          subscribe: checked 
        }))}
      />

      <Button variant="primary" type="submit">
        Submit Form
      </Button>
    </form>
  );
}
```

## Best Practices

### 1. Import Only What You Need

```tsx
// ✅ Good - tree-shaking friendly
import { Button, Input } from 'ft-design-system';

// ❌ Avoid - imports entire library
import * as DesignSystem from 'ft-design-system';
```

### 2. Use TypeScript

Take advantage of the built-in TypeScript definitions:

```tsx
import { ButtonProps } from 'ft-design-system';

// Get full autocomplete and type checking
const buttonConfig: ButtonProps = {
  variant: 'primary', // autocomplete will show available variants
  size: 'medium',
  disabled: false
};
```

### 3. Consistent Styling

Use the design system's spacing and color tokens:

```tsx
// ✅ Good - using design system classes
<div className="space-y-4 p-6">
  <Button variant="primary">Action</Button>
</div>

// ❌ Avoid - custom spacing that doesn't match design system
<div style={{ padding: '23px', marginBottom: '17px' }}>
  <Button variant="primary">Action</Button>
</div>
```

## Package Information

- **Size**: ~50KB gzipped
- **Dependencies**: React 16.8+, Tailwind CSS compatible
- **TypeScript**: Full type definitions included
- **Tree Shaking**: Supported for optimal bundle size
- **Browser Support**: Modern browsers (ES2015+)

## Getting Help

- 📖 [Design System Documentation](https://github.com/chetanft/components)
- 🎨 [Storybook](your-storybook-url)
- 🐛 [Report Issues](https://github.com/chetanft/components/issues)
- 💬 [Discussions](https://github.com/chetanft/components/discussions)

## Updates

To update to the latest version:

```bash
npm update ft-design-system
```

Check the [changelog](https://github.com/chetanft/components/releases) for breaking changes and new features. 