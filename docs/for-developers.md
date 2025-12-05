# FT Design System - For Developers

A comprehensive guide for developers using the FT Design System in their projects. This guide covers installation, CLI commands, setup, and best practices.

---

## 📦 Installation

### npm

```bash
npm install ft-design-system
```

### yarn

```bash
yarn add ft-design-system
```

### pnpm

```bash
pnpm add ft-design-system
```

---

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

After installing the package, use the automated setup:

```bash
npm install ft-design-system
npx ft-design-system setup
```

This will automatically:
- ✅ Detect your framework (Next.js, Vite, CRA)
- ✅ Inject CSS import in the correct location
- ✅ Update Tailwind config with FT DS paths
- ✅ Verify setup worked correctly

### Option 2: Scaffold New Project

Start a new project with FT Design System pre-configured:

```bash
mkdir my-project
cd my-project
npx ft-design-system init
```

Follow the prompts to select your framework, then:

```bash
npm install
npm run dev
```

---

## 🛠️ CLI Commands Reference

FT Design System provides a powerful CLI tool accessible via `npx`. You can use either `npx ft-design-system` or the shorter alias `npx ftds`.

### `setup` - Set Up FT Design System

Set up FT Design System in an existing project.

```bash
npx ft-design-system setup
# or
npx ftds setup
```

**What it does:**
- Detects your framework automatically
- Adds CSS import to the correct root file
- Updates Tailwind config with FT DS content paths
- Verifies the setup

**Supported frameworks:**
- Next.js 14+ (App Router)
- Next.js 13+ (Pages Router)
- Vite + React
- Create React App

**Example output:**
```
🚀 FT Design System Setup
========================

1️⃣ Detecting framework...
   ✅ Detected: Next.js (App Router)

2️⃣ Finding root file...
   ✅ Found: app/layout.tsx

📋 Setup will:
   • Add CSS import to root file
   • Update Tailwind config (if found)

❓ Proceed? (y/n): y

3️⃣ Injecting CSS import...
   ✅ Added CSS import to app/layout.tsx

4️⃣ Updating Tailwind config...
   ✅ Updated Tailwind config: tailwind.config.js

✅ Setup Complete!
```

---

### `verify` - Verify Setup

Check if FT Design System is properly configured in your project.

```bash
npx ft-design-system verify
# or
npx ftds verify
```

**What it checks:**
- ✅ Package installation
- ✅ CSS file availability
- ✅ CSS import in root file
- ✅ Tailwind config includes FT DS paths

**Example output:**
```
🔍 Verifying setup...
   ✅ Package installed
   ✅ CSS file found
   ✅ CSS import found in app/layout.tsx
   ✅ Tailwind config includes FT Design System

✅ FT Design System is properly configured!
```

**If issues are found:**
```
🔍 Verifying setup...
   ✅ Package installed
   ✅ CSS file found
   ❌ CSS import not found in app/layout.tsx
   💡 Run: npx ft-design-system setup
   ❌ Tailwind config missing FT Design System path
   💡 Run: npx ft-design-system update

⚠️  Setup verification found issues. Please check your configuration.
```

---

### `update` - Update Configuration

Update Tailwind config after package updates or manual changes.

```bash
npx ft-design-system update
# or
npx ftds update
```

**When to use:**
- After updating the `ft-design-system` package
- If Tailwind config was manually modified
- If CSS import was accidentally removed

**What it does:**
- Updates Tailwind config with FT DS content paths
- Checks and adds CSS import if missing
- Provides feedback on changes made

**Example output:**
```
🔄 Updating FT Design System configuration...

1️⃣ Updating Tailwind config...
   ✅ Updated Tailwind config: tailwind.config.js

2️⃣ Checking CSS import...
   ✅ CSS import already exists

✅ Configuration update complete!
💡 Restart your dev server if it's running
```

---

### `init` - Scaffold New Project

Create a new project with FT Design System pre-configured.

```bash
npx ft-design-system init
# or
npx ftds init
```

**What it does:**
- Prompts you to select a framework
- Copies template files to current directory
- Sets up project structure with FT DS configured

**Available templates:**
1. **Next.js (App Router)** - Next.js 14+ with App Router
2. **Next.js (Pages Router)** - Next.js 13+ with Pages Router
3. **Vite + React** - Vite with React
4. **Create React App** - CRA with React

**Example workflow:**
```bash
mkdir my-ftds-app
cd my-ftds-app
npx ft-design-system init

# Select framework (1-4)
# Files are copied automatically

npm install
npm run dev
```

**What's included in templates:**
- ✅ CSS import in correct location
- ✅ Tailwind config with FT DS paths
- ✅ Example component usage
- ✅ TypeScript configuration (where applicable)
- ✅ README with framework-specific notes

---

### `help` - Show Help

Display help information and available commands.

```bash
npx ft-design-system help
# or
npx ft-design-system --help
# or
npx ft-design-system -h
# or
npx ftds help
```

**Example output:**
```
📖 FT Design System CLI
======================

Usage: npx ft-design-system <command>

Commands:
  setup   Set up FT Design System in your project (default)
  verify  Verify that FT Design System is properly configured
  update  Update Tailwind config after package updates
  init    Scaffold a new project with FT Design System
  help    Show this help message

Examples:
  npx ft-design-system setup
  npx ft-design-system verify
  npx ft-design-system update
  npx ft-design-system init
  npx ftds setup  (shorter alias)
```

---

## 📋 Developer Workflow

### New Project Setup

1. **Create project:**
   ```bash
   mkdir my-project
   cd my-project
   ```

2. **Initialize with FT DS:**
   ```bash
   npx ft-design-system init
   # Select your framework
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start development:**
   ```bash
   npm run dev
   ```

### Existing Project Setup

1. **Install package:**
   ```bash
   npm install ft-design-system
   ```

2. **Run setup:**
   ```bash
   npx ft-design-system setup
   ```

3. **Verify setup:**
   ```bash
   npx ft-design-system verify
   ```

4. **Start using components:**
   ```tsx
   import { Button, Input, Badge } from 'ft-design-system';
   ```

### After Package Updates

1. **Update package:**
   ```bash
   npm update ft-design-system
   ```

2. **Update configuration:**
   ```bash
   npx ft-design-system update
   ```

3. **Verify everything still works:**
   ```bash
   npx ft-design-system verify
   ```

---

## 🔧 Manual Setup (If CLI Doesn't Work)

If the automated setup doesn't work for your project, follow these manual steps:

### Step 1: Import CSS

Add the CSS import to your root file **before** other CSS imports:

**Next.js App Router** (`app/layout.tsx`):
```tsx
import 'ft-design-system/styles.css';
import './globals.css';
```

**Next.js Pages Router** (`pages/_app.tsx`):
```tsx
import 'ft-design-system/styles.css';
import '../styles/globals.css';
```

**Vite/CRA** (`src/main.tsx` or `src/index.tsx`):
```tsx
import 'ft-design-system/styles.css';
import './index.css';
```

### Step 2: Configure Tailwind

Add FT Design System to your Tailwind `content` array:

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    './node_modules/ft-design-system/dist/**/*.{js,jsx}' // ⚠️ Required!
  ],
  // ... rest of config
};
```

### Step 3: Restart Dev Server

After updating Tailwind config, restart your development server.

---

## 💻 Using Components

### Basic Import

```tsx
import { Button, Input, Badge, Table } from 'ft-design-system';
```

### Example Usage

```tsx
import { Button, Input, Badge } from 'ft-design-system';

function MyComponent() {
  return (
    <div className="space-y-4">
      <Button variant="primary">Click Me</Button>
      <Input placeholder="Enter text" />
      <Badge variant="success">Active</Badge>
    </div>
  );
}
```

### TypeScript Support

FT Design System is built with TypeScript and includes full type definitions:

```tsx
import { Button } from 'ft-design-system';
import type { ButtonProps } from 'ft-design-system';

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

---

## 🐛 Troubleshooting

### CLI Command Not Found

**Problem:** `npx ft-design-system` doesn't work

**Solutions:**
1. Make sure package is installed:
   ```bash
   npm install ft-design-system
   ```

2. Try the shorter alias:
   ```bash
   npx ftds setup
   ```

3. Verify installation:
   ```bash
   npm list ft-design-system
   ```

4. Clear npm cache:
   ```bash
   npm cache clean --force
   ```

### Setup Script Fails to Detect Framework

**Problem:** Setup can't detect your framework

**Solutions:**
1. Check your project structure:
   - Next.js App Router: Should have `app/` directory
   - Next.js Pages Router: Should have `pages/` directory
   - Vite: Should have `vite.config.js` or `vite.config.ts`
   - CRA: Should have `src/index.js` or `src/index.tsx`

2. Use manual setup (see Manual Setup section above)

3. Verify command works:
   ```bash
   npx ft-design-system verify
   ```

### Components Render Without Styles

**Problem:** Components appear unstyled or transparent

**Solutions:**
1. Verify CSS import:
   ```bash
   npx ft-design-system verify
   ```

2. Check CSS import is before other styles:
   ```tsx
   import 'ft-design-system/styles.css'; // Must be first
   import './globals.css';
   ```

3. Verify Tailwind config includes FT DS:
   ```bash
   npx ft-design-system verify
   ```

4. Restart dev server after config changes

### Tailwind Classes Not Working

**Problem:** Tailwind utility classes from FT DS don't work

**Solutions:**
1. Update Tailwind config:
   ```bash
   npx ft-design-system update
   ```

2. Verify content paths include FT DS:
   ```js
   content: [
     './src/**/*.{js,jsx,ts,tsx}',
     './node_modules/ft-design-system/dist/**/*.{js,jsx}' // Required!
   ]
   ```

3. Restart dev server

---

## 📚 Additional Resources

- **[Integration Guide](./INTEGRATION_GUIDE.md)** - Detailed setup instructions
- **[Component Documentation](./design-system.mdx)** - Complete component API
- **[Design Tokens](./DESIGN_TOKENS_REFERENCE.md)** - Available design tokens
- **[Quick Reference](./quick-reference.md)** - Fast component snippets
- **[For Designers](./for-designers.md)** - Design guidelines

---

## 🔗 Useful Links

- **GitHub Repository:** https://github.com/chetanft/components
- **npm Package:** https://www.npmjs.com/package/ft-design-system
- **Issues:** https://github.com/chetanft/components/issues
- **Storybook:** [Add your Storybook URL]

---

## 💡 Tips & Best Practices

1. **Always verify after setup:**
   ```bash
   npx ft-design-system verify
   ```

2. **Update config after package updates:**
   ```bash
   npm update ft-design-system
   npx ft-design-system update
   ```

3. **Use TypeScript for better DX:**
   - Full type definitions included
   - Autocomplete for all props
   - Type safety for component usage

4. **Import CSS before other styles:**
   - Ensures proper CSS cascade
   - Prevents style conflicts

5. **Restart dev server after Tailwind changes:**
   - Tailwind needs to regenerate classes
   - Hot reload may not catch config changes

6. **Check version compatibility:**
   ```bash
   npm list ft-design-system
   ```

---

## 🆘 Getting Help

If you encounter issues:

1. **Run verify command:**
   ```bash
   npx ft-design-system verify
   ```

2. **Check documentation:**
   - [Integration Guide](./INTEGRATION_GUIDE.md)
   - [Troubleshooting Section](#-troubleshooting)

3. **Search existing issues:**
   - GitHub Issues: https://github.com/chetanft/components/issues

4. **Create a new issue:**
   - Include: Framework, version, error messages, steps to reproduce

---

## 📝 Version Information

Current version: **4.14.1**

Check your installed version:
```bash
npm list ft-design-system
```

Check latest version:
```bash
npm view ft-design-system version
```






