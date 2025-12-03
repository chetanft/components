# FT Design System

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
# Install from npm
npm install ft-design-system
```

## 🚀 Quick Setup (Automated)

**NEW!** Use the automated setup script to configure FT Design System in seconds:

```bash
# After installing the package, run:
npx ft-design-system setup
# or use the shorter alias:
npx ftds setup
```

The setup script will:
- ✅ Detect your framework (Next.js, Vite, CRA)
- ✅ Automatically inject CSS import in the correct location
- ✅ Update Tailwind config with FT DS content paths
- ✅ Verify setup worked correctly

**Available commands:**
- `npx ft-design-system setup` - Set up FT Design System in existing project (default)
- `npx ft-design-system verify` - Verify your setup is correct
- `npx ft-design-system update` - Update Tailwind config after package updates
- `npx ft-design-system init` - Scaffold a new project with FT Design System
- `npx ft-design-system help` - Show help message
- `npx ftds <command>` - Shorter alias for all commands

**Alternative:** Use pre-configured starter templates in [`templates/`](./templates/) directory.

---

## 🔧 Manual Setup (Required if not using automated setup)

### ⚠️ CRITICAL: Two Required Steps

FT Design System components **will not work** without completing BOTH steps below. Components use CSS variables and Tailwind utility classes that must be properly configured.

---

### Step 1: Import CSS (REQUIRED)

**Why:** Components rely on CSS variables (`var(--primary-700)`, `var(--table-cell-padding-y)`, etc.) defined in the CSS file. Without importing it, all variables are undefined, resulting in:
- ❌ Transparent or missing button colors
- ❌ No table padding/spacing
- ❌ Semi-transparent drawer backgrounds
- ❌ Missing component styles

```tsx
// ✅ For Next.js 14+ (App Router) - Import in app/layout.tsx
import 'ft-design-system/styles.css';
import './globals.css';

// ✅ For Next.js 13 (Pages Router) - Import in pages/_app.tsx
import 'ft-design-system/styles.css';
import '../styles/globals.css';

// ✅ For Vite/CRA - Import in main.tsx or App.tsx (BEFORE other styles)
import 'ft-design-system/styles.css';
import './index.css';
```

**Important:** Import FT DS CSS **before** your own CSS files to ensure proper cascade.

---

### Step 2: Configure Tailwind Content Paths (REQUIRED)

**Why:** Components use Tailwind arbitrary value classes like `bg-[var(--primary-700)]` and `text-[var(--primary)]`. Tailwind must scan the component files to generate these utility classes. Without this configuration:
- ❌ Tailwind classes won't be generated
- ❌ Components will have missing styles
- ❌ Spacing, colors, and utilities won't work

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    // ⚠️ CRITICAL: Include FT DS components so Tailwind scans them
    './node_modules/ft-design-system/dist/**/*.{js,jsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**Note:** After updating Tailwind config, restart your dev server to regenerate classes.

### Step 4: Use Components

```tsx
import { Table, Button, Badge, Checkbox } from 'ft-design-system';

function App() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <Badge variant="default">Status</Badge>
    </div>
  );
}
```

## ⚡ Quick Start Example

<details>
<summary>Next.js 14+ (App Router)</summary>

```tsx
// app/layout.tsx
import 'ft-design-system/styles.css';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

// app/page.tsx
import { Button, Table } from 'ft-design-system';

export default function Home() {
  return (
    <main>
      <Button variant="primary">Get Started</Button>
    </main>
  );
}

// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './node_modules/ft-design-system/dist/**/*.{js,jsx}'
  ],
};
```

</details>

<details>
<summary>Vite + React</summary>

```tsx
// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'ft-design-system/styles.css';
import './index.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// tailwind.config.js
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/ft-design-system/dist/**/*.{js,jsx}'
  ],
};
```

</details>


## 🚨 Troubleshooting

> 📖 **For detailed setup and troubleshooting, see [Integration Guide](docs/INTEGRATION_GUIDE.md)**

### Components Not Rendering Correctly

**Symptoms:**
- Buttons appear transparent or with wrong colors
- Tables have no padding/spacing
- Drawer has semi-transparent background
- Components look unstyled

**Root Cause:** Missing CSS import OR Tailwind not configured to scan FT DS components.

**✅ Solution:** Complete BOTH required steps:

1. **Import CSS** in your main application file (BEFORE other styles):
   ```tsx
   import 'ft-design-system/styles.css'; // ⚠️ Must be first
   import './globals.css';
   ```

2. **Configure Tailwind** to include FT DS:
   ```js
   // tailwind.config.js
   module.exports = {
     content: [
       './src/**/*.{js,jsx,ts,tsx}',
       './node_modules/ft-design-system/dist/**/*.{js,jsx}' // ⚠️ Required!
     ],
   };
   ```

3. **Restart your dev server** after updating Tailwind config.

### CSS Variables Undefined

**Symptoms:**
- Console shows: `Invalid property value` for `var(--primary-700)`
- Components have no colors
- Styles completely missing

**Solution:**
- Verify CSS is imported: Check Network tab → look for `styles.css` loaded
- Ensure CSS import is BEFORE component imports
- Try alternative import path: `import 'ft-design-system/dist/styles.css'`

### Tailwind Classes Not Generated

**Symptoms:**
- Classes like `bg-[var(--primary-700)]` don't work
- Components missing utility classes
- Spacing/padding not applied

**Solution:**
- Add FT DS to Tailwind content paths (see Step 2 above)
- Restart dev server after config change
- Clear Tailwind cache: `rm -rf .next` (Next.js) or `rm -rf node_modules/.vite` (Vite)

### CSS Styles Not Loading

If you're getting errors like `"Cannot resolve 'ft-design-system/styles.css'"`:

1. **Clear Cache and Reinstall**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install ft-design-system@latest
   ```

2. **Try Alternative Import Path**:
   ```tsx
   import 'ft-design-system/dist/styles.css';
   ```

3. **For Vite Projects**, ensure your `vite.config.js` includes:
   ```js
   export default defineConfig({
     optimizeDeps: {
       include: ['ft-design-system']
     }
   });
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

## 🎨 Design Guidelines

For designers working with the FT Design System, please follow our comprehensive design guidelines to ensure consistency and proper integration:

📋 **[Design Guidelines](DESIGN_GUIDELINES.md)** - Essential rules for creating components that match the FT Design System

Key highlights:
- **Unified Component Sizing**: All components follow standardized heights (36px, 44px, 52px, 64px)
- **Color System**: Use #434f64 as primary brand color
- **Consistent Spacing**: Standardized padding and margin ratios
- **Accessibility**: WCAG AA compliance requirements
- **Developer Handoff**: Proper specifications and naming conventions

## 🎨 Design Tokens

FT Design System uses CSS custom properties (variables) for all design tokens. 

**📖 Complete Token Reference:** See [`docs/DESIGN_TOKENS_REFERENCE.md`](./docs/DESIGN_TOKENS_REFERENCE.md) for a comprehensive list of all available tokens.

The token reference is auto-generated from the CSS source and includes:
- Color scales (primary, secondary, tertiary, neutral, positive, warning, danger)
- Semantic colors
- Spacing system (8-point grid)
- Typography tokens
- Shadows, transitions, border radius
- Component-specific tokens
- Usage examples

**Quick examples:**
```css
/* Use semantic colors */
.my-component {
  color: var(--primary);
  background-color: var(--bg-primary);
  padding: var(--spacing-x4);
  border-radius: var(--radius-md);
}
```

## 🎨 Customization

### Tailwind Configuration
The design system uses Tailwind CSS for styling. Make sure your project has Tailwind CSS configured:

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/ft-design-system/dist/**/*.{js,jsx}'
  ],
  // ... rest of your config
}
```

## 🛠️ Development

### Docs-First Architecture

This project follows a **docs-first architecture** where the documentation site (`ft-docs`) is the primary development interface. See [DOCS_FIRST_ARCHITECTURE.md](./DOCS_FIRST_ARCHITECTURE.md) for details.

**Quick Start:**
```bash
# Develop components in docs (primary interface)
cd ft-docs && npm run dev

# Validate components are exported
npm run validate:docs

# Sync docs changes to npm package
npm run sync:docs-to-package

# Build package (includes validation)
npm run build
```

### Traditional Development

```bash
# Install dependencies
npm install

# Run Storybook (optional)
npm run storybook

# Build package
npm run build

# Run tests
npm run test

# Share with designers (local network)
npm run share-storybook

# Setup automatic deployment to Netlify
npm run setup-deployment
```

### 📋 Maintaining Documentation

When adding or modifying components, always update the downloadable documentation:

```bash
# Check if docs are in sync with components
npm run update-docs

# After adding a new component:
# 1. Add to src/index.ts exports
# 2. Update src/stories/prompts/General.stories.tsx
# 3. Run npm run update-docs to verify
# 4. Test downloadable JSON/MDX files
```

**Important**: The downloadable AI integration files must stay in sync with actual component exports and props. This ensures developers get accurate information when using AI tools like Lovable.dev, ChatGPT, etc.

## 📦 Publishing

### 🚀 Interactive CLI (Recommended)

Use the interactive publishing CLI for a guided experience:

```bash
npm run publish
```

### Quick Publishing Commands

```bash
# Validate package before publishing
npm run validate:package

# Create local package for testing
npm run publish:local

# Test publishing without actually publishing
npm run publish:dry-run

# Publish different version types
npm run publish:patch    # Bug fixes (1.0.1 → 1.0.2)
npm run publish:minor    # New features (1.0.1 → 1.1.0)
npm run publish:major    # Breaking changes (1.0.1 → 2.0.0)
npm run publish:beta     # Beta version for testing

# Publish to specific registries
npm run publish:github   # GitHub Packages (default)
npm run publish:npm      # Public npm registry
```

For detailed publishing instructions, see [📖 Publishing Guide](docs/PUBLISHING_GUIDE.md)

## 💖 Lovable.dev Integration

Your design system is **Lovable-ready**! Use it seamlessly in [Lovable.dev](https://lovable.dev) projects:

```bash
# In your Lovable project
npm install ft-design-system

# Generate templates (run in design system repo)
npm run lovable:templates
```

See [📖 Lovable Integration Guide](docs/LOVABLE_INTEGRATION_GUIDE.md) for complete setup instructions and examples.

## 🌐 Deployment & Sharing

### **For Designers**
This project includes comprehensive designer collaboration tools:
- 📖 See [`DESIGN_COLLABORATION.md`](DESIGN_COLLABORATION.md) for Storybook usage guide
- 🎨 Interactive component playground with real-time controls
- 📱 Responsive testing and design specifications

### **Automatic Deployment**
Deploy your Storybook automatically to Netlify:
- ✅ **Auto-deploy** on every GitHub push
- ✅ **Preview URLs** for pull requests  
- ✅ **Global CDN** for fast worldwide access
- ✅ **HTTPS** enabled by default

```bash
# One-command setup
npm run setup-deployment
```

See [`DEPLOYMENT_GUIDE.md`](DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

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
