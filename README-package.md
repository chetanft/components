# Design System

A comprehensive React component library built from Figma designs with TypeScript and Tailwind CSS.

## Installation

```bash
npm install @your-org/design-system
```

## Usage

```tsx
import { Button, Table, Badge, Checkbox } from '@your-org/design-system';

function App() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <Badge variant="default">Status</Badge>
    </div>
  );
}
```

### Import Styles

Make sure to import the CSS file in your main application file:

```tsx
import '@your-org/design-system/dist/output.css';
```

## Components

- **Button** - Customizable buttons with multiple variants
- **Table** - Data tables with sorting, selection, and pagination
- **Badge** - Status indicators and labels
- **Checkbox** - Form checkboxes with indeterminate state
- **Input** - Form input fields
- **Dropdown** - Select dropdowns
- **DatePicker** - Date selection component
- **Switch** - Toggle switches
- **RadioGroup** - Radio button groups
- **Tabs** - Tabbed interfaces
- **Typography** - Text components
- **Icons** - Icon library

## Table Variants

The Table component supports two variants:

```tsx
<Table variant="primary" />   // Dark header with alternating rows
<Table variant="secondary" /> // Light header with white rows
```

## TypeScript Support

This package includes full TypeScript definitions. All components are fully typed with proper generic support where applicable.

## Tailwind CSS

This component library is built with Tailwind CSS. Make sure your project has Tailwind CSS configured.

## License

MIT 