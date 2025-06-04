# Chetan FT Design System

A comprehensive React component library built from Figma designs, featuring a modern design system with TypeScript and Tailwind CSS support.

## 🚀 Features

- 🎨 **Figma-First Design**: Components built directly from Figma specifications
- 📦 **12+ Core Components**: Including Table, Button, Badge, Checkbox, and more
- 🎯 **190+ Icons**: Comprehensive icon library with proper TypeScript definitions
- 💅 **Tailwind CSS**: Built with Tailwind for easy customization
- 📱 **Responsive**: Mobile-friendly and responsive design
- 🔍 **TypeScript**: Full TypeScript support with proper type definitions
- 📚 **Storybook**: Complete documentation and component playground

## 📥 Installation

```bash
# Install from GitHub
npm install git+https://github.com/chetanft/components.git

# OR install from NPM (once published)
npm install @chetanft/design-system
```

## 🔧 Usage

```tsx
// Import components
import { Table, Button, Badge, Checkbox } from '@chetanft/design-system';

// Import styles in your main App.tsx or index.tsx
import '@chetanft/design-system/dist/output.css';

function App() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <Badge variant="default">Status</Badge>
    </div>
  );
}
```

## 🧩 Components

### Table
- Primary and Secondary variants
- Sorting functionality
- Row selection with indeterminate state
- Pagination support
- Custom cell rendering

```tsx
<Table 
  variant="primary"
  data={data}
  columns={columns}
  onSort={handleSort}
  selectable
/>
```

### Button
- Multiple variants: primary, secondary, destructive, link
- Loading state
- Icon support
- Size variants

```tsx
<Button variant="primary" loading={false}>
  Click me
</Button>
```

### Badge
- Status indicators
- Multiple variants
- Icon support

### Checkbox
- Indeterminate state
- Custom styling
- Label support

### Input
- Text input with validation
- Icon support
- Error states

### DatePicker
- Date selection
- Range selection
- Custom formatting

### Icons
- 190+ custom icons
- SVG-based
- Color inheritance
- Size customization

## 🎨 Customization

### Tailwind Configuration
The design system uses Tailwind CSS for styling. Make sure your project has Tailwind CSS configured:

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@chetanft/design-system/**/*.{js,jsx,ts,tsx}'
  ],
  // ... rest of your config
}
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run Storybook
npm run storybook

# Build package
npm run build

# Run tests
npm run test
```

## 📚 Documentation

Full documentation is available in Storybook. Run `npm run storybook` to view it locally.

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a pull request.

## 📄 License

MIT © [Chetan FT]

## 🙏 Acknowledgments

- Built with [Figma](https://figma.com)
- Powered by [React](https://reactjs.org)
- Styled with [Tailwind CSS](https://tailwindcss.com)
