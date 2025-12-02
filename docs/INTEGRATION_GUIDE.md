# FT Design System - Integration Guide

## 🚀 Automated Setup (Recommended)

**NEW!** Use the automated setup script for fastest setup:

```bash
# After installing the package
npm install ft-design-system

# Run automated setup
npx ft-design-system setup
```

The script will:
- ✅ Detect your framework automatically
- ✅ Inject CSS import in the correct location
- ✅ Update Tailwind config with FT DS paths
- ✅ Verify setup worked correctly

**Alternative:** Use pre-configured starter templates in [`templates/`](../../templates/) directory.

---

## 🎯 Manual Setup Checklist

If you prefer manual setup or the automated script doesn't work:

- [ ] Install package: `npm install ft-design-system`
- [ ] Import CSS in main app file: `import 'ft-design-system/styles.css'` ⚠️ **REQUIRED**
- [ ] Add FT DS to Tailwind content paths ⚠️ **REQUIRED**
- [ ] Restart dev server after Tailwind config change
- [ ] Verify components render correctly

---

## ⚡ Quick Reference

### Critical Setup (Copy-Paste Ready)

**1. CSS Import** (add to your root file):
```tsx
import 'ft-design-system/styles.css'; // Must be BEFORE other CSS imports
```

**2. Tailwind Config** (add to `content` array):
```js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/ft-design-system/dist/**/*.{js,jsx}' // ⚠️ Required!
  ],
};
```

**3. Restart dev server** after Tailwind config change

### Why Both Steps Are Required

- **CSS Import:** Provides CSS variables (`--primary-700`, `--spacing-x2`, etc.) that components use
- **Tailwind Content Paths:** Allows Tailwind to scan component files and generate utility classes like `bg-[var(--primary-700)]`

**Without CSS import:** Variables undefined → transparent/unstyled components  
**Without Tailwind config:** Classes not generated → missing styles

---

## 📦 Installation

```bash
npm install ft-design-system
# or
yarn add ft-design-system
# or
pnpm add ft-design-system
```

## 🚀 Automated Setup Script

After installation, run the setup script:

```bash
npx ft-design-system setup
```

This will automatically:
1. Detect your framework (Next.js App Router, Pages Router, Vite, CRA)
2. Add CSS import to the correct file
3. Update Tailwind config with FT DS content paths
4. Verify the setup

**Supported frameworks:**
- Next.js 14+ (App Router)
- Next.js 13+ (Pages Router)
- Vite + React
- Create React App

**Manual setup:** See framework-specific sections below if you prefer manual configuration.

---

## 🔧 Setup by Framework

### Next.js 14+ (App Router)

**1. Import CSS in root layout:**
```tsx
// app/layout.tsx
import 'ft-design-system/styles.css';
import './globals.css'; // Your global styles

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

**2. Configure Tailwind:**
```js
// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/ft-design-system/dist/**/*.{js,jsx}' // ⚠️ Required!
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

**3. Use components:**
```tsx
// app/page.tsx
import { Button, Table, Badge } from 'ft-design-system';

export default function Home() {
  return (
    <main>
      <Button variant="primary">Get Started</Button>
    </main>
  );
}
```

---

### Next.js 13 (Pages Router)

**1. Import CSS in _app.tsx:**
```tsx
// pages/_app.tsx
import 'ft-design-system/styles.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

**2. Tailwind config:** (same as App Router)

---

### Vite + React

**1. Import CSS in main.tsx:**
```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'ft-design-system/styles.css'; // ⚠️ Before your styles
import './index.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**2. Configure Tailwind:**
```js
// tailwind.config.js
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/ft-design-system/dist/**/*.{js,jsx}' // ⚠️ Required!
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

**3. Optional: Vite config optimization**
```js
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['ft-design-system']
  }
});
```

---

### Create React App

**1. Import CSS in index.tsx:**
```tsx
// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'ft-design-system/styles.css'; // ⚠️ Before your styles
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**2. Configure Tailwind:** (same as Vite)

---

## ❌ Common Issues & Solutions

### Issue 1: Components Render Without Styles

**Symptoms:**
- Button appears transparent or with wrong colors
- Table has no padding
- Drawer has semi-transparent background

**Cause:** CSS file not imported

**Solution:**
```tsx
// ✅ Add this to your root file
import 'ft-design-system/styles.css';
```

---

### Issue 2: "Cannot resolve 'ft-design-system/styles.css'"

**Solution 1 - Clear cache:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Solution 2 - Try alternative import:**
```tsx
import 'ft-design-system/dist/styles.css'; // Instead of /styles.css
```

---

### Issue 3: Tailwind Classes Not Working

**Symptoms:**
- Components missing utility classes like `bg-[var(--primary-700)]`
- Spacing/padding not applied
- Components render but styles don't match design
- Console shows classes are not defined

**Root Cause:** FT DS components use Tailwind arbitrary value classes (e.g., `bg-[var(--primary-700)]`, `text-[var(--primary)]`). Tailwind only generates classes it finds in files listed in the `content` array. If FT DS isn't included, these classes are never generated.

**Solution:**
```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    // ⚠️ CRITICAL: Include FT DS so Tailwind scans component files
    './node_modules/ft-design-system/dist/**/*.{js,jsx}'
  ],
};
```

**After updating config:**
1. **Restart your dev server** (Tailwind regenerates classes on startup)
2. **Clear build cache** if needed:
   - Next.js: `rm -rf .next`
   - Vite: `rm -rf node_modules/.vite`
   - CRA: `rm -rf node_modules/.cache`

**Verify it's working:**
- Inspect a Button element in DevTools
- You should see classes like `bg-[var(--primary-700)]` in the class list
- These classes should have actual CSS rules applied

---

### Issue 4: CSS Variables Undefined

**Symptoms:**
- Console shows: `Invalid property value` for `var(--primary-700)`
- Components have no colors
- Styles completely missing
- Components appear transparent or unstyled

**Root Cause:** CSS file not imported, or imported after components render, or CSS file not loading properly.

**Solution:**

1. **Import CSS in root file BEFORE other imports:**
   ```tsx
   // ✅ Correct order
   import 'ft-design-system/styles.css'; // First!
   import './globals.css';
   import App from './App';
   ```

2. **Verify CSS is loading:**
   - Open DevTools → Network tab
   - Reload page
   - Look for `styles.css` request
   - Should show status 200 (success)
   - Check Response tab to see CSS variables are present

3. **If CSS not loading, try alternative import:**
   ```tsx
   // Try this if styles.css doesn't work
   import 'ft-design-system/dist/styles.css';
   ```

4. **For Next.js, ensure CSS is in the right place:**
   ```tsx
   // App Router: app/layout.tsx
   import 'ft-design-system/styles.css';
   
   // Pages Router: pages/_app.tsx
   import 'ft-design-system/styles.css';
   ```

5. **Check CSS variables are defined:**
   - Open DevTools → Elements tab
   - Select `:root` or `<html>` element
   - In Styles panel, verify variables like `--primary-700`, `--spacing-x2` are defined

---

### Issue 5: TypeScript Errors

**Solution:**
```bash
# Reinstall with types
npm install ft-design-system@latest
```

If issues persist:
```tsx
// Add to tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "types": ["node"]
  }
}
```

---

## ✅ Verification Checklist

After setup, verify everything works:

### 1. CSS File is Loaded
- Open DevTools → Network tab
- Reload page
- Look for `styles.css` or `ft-design-system/styles.css` request
- Status should be `200` (success)
- Response should contain CSS variables like `--primary-700`

### 2. CSS Variables are Defined
- Open DevTools → Elements tab
- Select `:root` or `<html>` element
- In Styles panel, verify variables are defined:
  - `--primary-700: #434f64`
  - `--spacing-x2: 8px`
  - `--table-cell-padding-y: 12px`
  - etc.

### 3. Tailwind Classes are Generated
- Inspect a Button element in DevTools
- Should see classes like:
  - `bg-[var(--primary-700)]`
  - `text-[var(--color-bg-primary)]`
- These classes should have actual CSS rules (not grayed out)
- If classes are grayed out, Tailwind didn't generate them → check content paths

### 4. Components Render Correctly
```tsx
import { Button } from 'ft-design-system';

// Should render with dark blue background (#434f64)
<Button variant="primary">Test</Button>
```

**Expected result:**
- ✅ Button has dark blue background
- ✅ Button text is white/light colored
- ✅ Button has proper padding and border radius
- ✅ Button is clickable and has hover effects

### 5. Quick Test Component
Create a test page to verify all components work:

```tsx
import { Button, Table, Badge, Drawer } from 'ft-design-system';

export default function TestPage() {
  return (
    <div>
      <Button variant="primary">Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
      <Badge variant="success">Success</Badge>
      {/* Add more components to test */}
    </div>
  );
}
```

**If any component looks unstyled:**
1. Check CSS import is present
2. Check Tailwind content paths include FT DS
3. Restart dev server
4. Clear build cache

---

## 📚 Component Examples

### Button
```tsx
import { Button } from 'ft-design-system';

<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Delete</Button>
<Button variant="ghost">Ghost</Button>
```

### Table
```tsx
import { Table } from 'ft-design-system';

const columns = [
  { key: 'name', title: 'Name' },
  { key: 'email', title: 'Email' },
];

const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

<Table 
  variant="primary" 
  columns={columns} 
  data={data} 
  selectable
/>
```

### Drawer
```tsx
import { Drawer } from 'ft-design-system';
import { Button } from 'ft-design-system';
import { useState } from 'react';

function MyComponent() {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>
      <Drawer 
        open={open} 
        onClose={() => setOpen(false)}
        title="Drawer Title"
        placement="right"
      >
        Drawer content here
      </Drawer>
    </>
  );
}
```

---

## 🔍 Debugging Steps

If components still don't work after following all steps:

### Step 1: Verify Installation
```bash
# Check version
npm list ft-design-system

# Should show version 4.13.17 or higher
# If not, update:
npm install ft-design-system@latest
```

### Step 2: Check CSS Import
```bash
# Search your codebase for CSS import
grep -r "ft-design-system.*css" src/ app/ pages/
# Should find at least one import
```

### Step 3: Check Tailwind Config
```bash
# Verify Tailwind config includes FT DS
cat tailwind.config.js | grep "ft-design-system"
# Should show the content path
```

### Step 4: Inspect in Browser
1. Open DevTools → Elements tab
2. Find a Button component
3. Check:
   - **Classes:** Should include `bg-[var(--primary-700)]` etc.
   - **Computed styles:** Should show actual colors, not `transparent`
   - **CSS variables:** Hover over `var(--primary-700)` → should show `#434f64`

### Step 5: Check Console for Errors
- Look for CSS loading errors
- Look for Tailwind warnings
- Look for undefined variable errors

## 🆘 Still Having Issues?

1. **Double-check both required steps:**
   - ✅ CSS imported in root file
   - ✅ Tailwind content paths include FT DS

2. **Try a fresh install:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install ft-design-system@latest
   ```

3. **Check version:** `npm list ft-design-system` (should be 4.13.17+)

4. **Review troubleshooting:** See [README.md](../README.md#-troubleshooting)

5. **Open an issue:** [GitHub Issues](https://github.com/chetanft/components/issues)
   - Include: Framework (Next.js/Vite/etc), version, error messages, screenshots
