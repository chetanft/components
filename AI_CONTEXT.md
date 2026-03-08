# FT Design System - AI Context

> **Single-file reference for AI tools to generate correct code.**
> Version: 4.22.0 | Last Updated: 2026-03-08

## Quick Start

```tsx
// 1. Import CSS (in root file - layout.tsx, _app.tsx, main.tsx)
import 'ft-design-system/styles.css';

// 2. Import components (AI-protected by default)
import { Button, Input, Table, Card } from 'ft-design-system';

// 3. (Advanced) For unprotected components:
import { Button, Input, Table } from 'ft-design-system/core';

// 4. (Optional) Use FTProvider for automatic setup:
import { FTProvider } from 'ft-design-system';
<FTProvider><App /></FTProvider>
```

## Workflow Contract (Mandatory)

- Before writing or modifying UI code, read relevant files in `specs/`.
- Before commit or PR, run `npm run check:tokens`.
- Before commit or PR for UI/component changes, run `npm run check:consistency`.
- Before commit or PR for component size or variant changes, run `npm run check:size-contract`.
- Before commit or PR touching explorer configs, run `npm run check:explorer-inspector`.
- New component layouts or explorer rows must include/update `parameters.explorer.inspector` metadata.
- Before merging dependency updates, run `npm run check:drift`.
- Before publishing, run `npm run publish:prepare` (includes `npm run sync:docs`).
- Do not introduce hardcoded visual values unless approved and documented.
- For PR reviews, follow the checklist at `specs/review-checklist.md`.

## AI Surfaces

- `llms.txt` is the generated discovery file for AI tools.
- `?view=machine` on `ft-docs` routes is the machine-readable content layer.
- `AI_CONTEXT.md` is the local workflow contract and coding reference.

## Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  presets: [require('ft-design-system/tailwind-preset')],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    // No need to add ft-design-system paths - preset handles it
  ],
}
```

---

## Component Reference

### Atoms (Basic Building Blocks)

| Component | Import | Usage |
|-----------|--------|-------|
| Button | `Button` | `<Button variant="primary">Save</Button>` |
| Input | `Input` | `<Input label="Name" placeholder="Enter name" />` |
| Checkbox | `Checkbox` | `<Checkbox label="Accept terms" checked={checked} />` |
| Switch | `Switch` | `<Switch checked={on} onChange={setOn} />` |
| RadioGroup | `RadioGroup` | `<RadioGroup options={opts} value={val} />` |
| Badge | `Badge` | `<Badge variant="success">Active</Badge>` |
| Avatar | `Avatar` | `<Avatar src={url} fallback="JD" />` |
| Icon | `Icon` | `<Icon name="check" size={20} />` |
| Text | `Text` | `<Text variant="body">Content</Text>` |
| Divider | `Divider` | `<Divider />` |
| Spacer | `Spacer` | `<Spacer size="x4" />` |
| Skeleton | `Skeleton` | `<Skeleton width={200} height={20} />` |
| Spin | `Spin` | `<Spin size="md" />` |

### Molecules (Combinations)

| Component | Import | Usage |
|-----------|--------|-------|
| Alert | `Alert` | `<Alert variant="info" title="Info">Message</Alert>` |
| Breadcrumb | `Breadcrumb` | `<Breadcrumb items={[{label:'Home',href:'/'}]} />` |
| DatePicker | `DatePicker` | `<DatePicker value={date} onChange={setDate} />` |
| Dropdown | `Dropdown` | `<Dropdown options={opts} value={val} />` |
| Select | `Select` | `<Select options={opts} value={val} />` |
| Pagination | `Pagination` | `<Pagination current={1} total={100} />` |
| Steps | `Steps` | `<Steps current={1} items={stepItems} />` |
| Tooltip | `Tooltip` | `<Tooltip content="Help"><Button /></Tooltip>` |
| Slider | `Slider` | `<Slider min={0} max={100} value={50} />` |
| Rate | `Rate` | `<Rate value={4} onChange={setRating} />` |
| Timeline | `Timeline` | `<Timeline items={events} />` |
| ProgressBar | `ProgressBar` | `<ProgressBar value={75} />` |
| Popconfirm | `Popconfirm` | `<Popconfirm onConfirm={del}>Delete?</Popconfirm>` |

### Organisms (Complex Components)

| Component | Import | Usage |
|-----------|--------|-------|
| Table | `Table` | `<Table columns={cols} data={rows} />` |
| Card | `Card` | `<Card title="Title"><Content /></Card>` |
| Modal | `Modal` | `<Modal open={open} onClose={close}>Content</Modal>` |
| Drawer | `Drawer` | `<Drawer open={open} onClose={close}>Content</Drawer>` |
| Form | `Form` | `<Form onSubmit={submit}><FormItem>...</FormItem></Form>` |
| Tabs | `Tabs` | `<Tabs items={[{key:'1',label:'Tab 1',children:...}]} />` |
| PageHeader | `PageHeader` | `<PageHeader title="Page" onBack={back} />` |
| Upload | `Upload` | `<Upload onUpload={handleUpload} />` |
| AppHeader | `AppHeader` | `<AppHeader logo={<Logo />} user={user} />` |
| Footer | `Footer` | `<Footer links={links} copyright="2026" />` |

### Charts

| Component | Import | Usage |
|-----------|--------|-------|
| BarChart | `BarChart` | `<BarChart data={data} />` |
| LineChart | `LineChart` | `<LineChart data={data} />` |
| PieChart | `PieChart` | `<PieChart data={data} />` |
| AreaChart | `AreaChart` | `<AreaChart data={data} />` |
| DoughnutChart | `DoughnutChart` | `<DoughnutChart data={data} />` |
| RadarChart | `RadarChart` | `<RadarChart data={data} />` |

---

## Design Tokens

### Colors (use CSS variables)

```css
/* Primary scale (dark navy) */
--primary-900: #1a2330;  /* Darkest */
--primary-700: #434f64;  /* Main brand color */
--primary-500: #5f697b;  /* Secondary */
--primary-300: #838c9d;  /* Tertiary */
--primary-100: #c5cad3;  /* Lightest */

/* Semantic shortcuts */
--primary: var(--primary-700);
--secondary: var(--primary-500);
--tertiary: var(--primary-300);

/* Status colors */
--positive: #00c637;     /* Success/green */
--warning: #ff6c19;      /* Warning/orange */
--critical: #ff3532;     /* Error/red */
--neutral: #1890ff;      /* Info/blue */

/* Backgrounds */
--bg-primary: #ffffff;
--bg-secondary: #f8f8f9;

/* Borders */
--border-primary: #ced1d7;
--border-secondary: #f0f1f7;
```

### Tailwind Classes

```tsx
// Use these semantic Tailwind classes (from preset):
<div className="bg-primary-700 text-white" />        // Primary background
<div className="bg-bg-primary border-border-primary" />  // Card style
<div className="text-primary" />                     // Main text color
<div className="text-secondary" />                   // Muted text
<div className="text-critical" />                    // Error text
<div className="text-positive" />                    // Success text
```

### Spacing (8-point grid, use --spacing-x* canonical names)

```css
--spacing-x0: 0px; --spacing-x1: 4px; --spacing-x2: 8px; --spacing-x3: 12px;
--spacing-x4: 16px; --spacing-x5: 20px; --spacing-x6: 24px; --spacing-x7: 28px;
--spacing-x8: 32px; --spacing-x9: 36px; --spacing-x10: 40px; --spacing-x11: 44px;
--spacing-x12: 48px; --spacing-x13: 52px; --spacing-x14: 56px; --spacing-x15: 60px;
--spacing-x16: 64px; --spacing-x20: 80px; --spacing-x24: 96px; --spacing-x38: 152px;
/* Half-steps */
--spacing-x1-5: 6px; --spacing-x2-5: 10px; --spacing-x3-5: 14px;
```

### Border Radius

```css
--radius-none: 0px;
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-2xl: 20px;
--radius-3xl: 24px;
--radius-4xl: 28px;
--radius-2xs: 2px;
--radius-smd: 6px;
--radius-full: 9999px;
```

---

## Button Variants

```tsx
// Primary (default) - solid dark background
<Button variant="primary">Save</Button>

// Secondary - outlined
<Button variant="secondary">Cancel</Button>

// Destructive - red for dangerous actions
<Button variant="destructive">Delete</Button>

// Text - minimal, no background
<Button variant="text">Learn more</Button>

// Link - styled as link
<Button variant="link">Read docs</Button>

// Ghost - transparent with border
<Button variant="ghost">Menu</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>  // default
<Button size="lg">Large</Button>

// With icon
<Button icon="plus" iconPosition="leading">Add</Button>
<Button icon="arrow-right" iconPosition="trailing">Next</Button>
<Button icon="edit" iconPosition="only" />  // Icon-only
```

---

## Form Components

```tsx
// Basic Input
<Input
  label="Email"
  type="email"
  placeholder="user@example.com"
  error="Invalid email"  // Shows error state
/>

// Select
<Select
  label="Country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
  ]}
  value={country}
  onChange={setCountry}
/>

// Checkbox
<Checkbox
  label="I agree to terms"
  checked={agreed}
  onChange={setAgreed}
/>

// RadioGroup
<RadioGroup
  options={[
    { value: 'opt1', label: 'Option 1' },
    { value: 'opt2', label: 'Option 2' },
  ]}
  value={selected}
  onChange={setSelected}
/>

// Switch
<Switch
  label="Enable notifications"
  checked={enabled}
  onChange={setEnabled}
/>

// Textarea
<Textarea
  label="Description"
  placeholder="Enter description..."
  rows={4}
/>
```

---

## Table Component

```tsx
// Composable API (recommended)
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map(row => (
      <TableRow key={row.id}>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>
          <Badge variant={row.active ? 'success' : 'default'}>
            {row.active ? 'Active' : 'Inactive'}
          </Badge>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

// Simple API
<Table
  columns={[
    { key: 'name', title: 'Name' },
    { key: 'email', title: 'Email' },
  ]}
  data={users}
/>
```

---

## Modal & Drawer

```tsx
// Modal
<Modal open={isOpen} onOpenChange={setIsOpen}>
  <ModalTrigger>
    <Button>Open Modal</Button>
  </ModalTrigger>
  <ModalContent>
    <ModalHeader>
      <ModalTitle>Confirm Action</ModalTitle>
    </ModalHeader>
    <ModalBody>Are you sure?</ModalBody>
    <ModalFooter>
      <Button variant="secondary" onClick={close}>Cancel</Button>
      <Button onClick={confirm}>Confirm</Button>
    </ModalFooter>
  </ModalContent>
</Modal>

// Drawer
<Drawer open={isOpen} onOpenChange={setIsOpen} position="right">
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Settings</DrawerTitle>
    </DrawerHeader>
    <DrawerBody>
      {/* Drawer content */}
    </DrawerBody>
  </DrawerContent>
</Drawer>
```

---

## Icon Names

Common icons available via `<Icon name="..." />`:

- Navigation: `home`, `menu`, `chevron-left`, `chevron-right`, `arrow-up`, `arrow-down`
- Actions: `plus`, `minus`, `edit`, `delete`, `save`, `close`, `check`, `x`
- Status: `info`, `warning`, `error`, `success`, `loading`
- Files: `file`, `folder`, `upload`, `download`, `image`, `document`
- Communication: `mail`, `phone`, `message`, `notification`, `bell`
- Users: `user`, `users`, `settings`, `logout`
- Misc: `search`, `filter`, `sort`, `refresh`, `calendar`, `clock`

---

## Dark Mode

```tsx
// Enable dark mode by adding 'dark' class to html/body
document.documentElement.classList.add('dark');

// Or use ThemeProvider
import { ThemeProvider } from 'ft-design-system';

<ThemeProvider defaultTheme="dark">
  <App />
</ThemeProvider>

// Or use FTProvider with theme
<FTProvider theme="dark">
  <App />
</FTProvider>

// System preference
<FTProvider theme="system">
  <App />
</FTProvider>
```

---

## DO's and DON'Ts

### DO:
```tsx
// ✅ Use semantic color classes
<div className="bg-primary-700 text-white" />
<div className="text-positive" />

// ✅ Use component variants
<Button variant="primary" />
<Badge variant="success" />

// ✅ Use design tokens
<div className="p-x4 rounded-md" />

// ✅ Import CSS once at root
import 'ft-design-system/styles.css';
```

### DON'T:
```tsx
// ❌ Don't use hardcoded colors
<div className="bg-[#434f64]" />
<div style={{ color: '#ff3532' }} />

// ❌ Don't override component heights
<Button className="h-20" />

// ❌ Don't use arbitrary Tailwind values for FT tokens
<div className="bg-[var(--primary)]" /> // Use bg-primary instead

// ❌ Don't install other UI libraries
// No shadcn/ui, Material-UI, Ant Design, Chakra
```

---

## Package Info

## Typography (rem-based sizes)

```css
--font-size-xs-rem: 0.857rem;   /* 12px */
--font-size-xxs-rem: 0.714rem;   /* 10px */
--font-size-sm-rem: 1rem;   /* 14px */
--font-size-md-rem: 1.143rem;   /* 16px */
--font-size-lg-rem: 1.429rem;   /* 20px */
--font-size-xl-rem: 1.714rem;   /* 24px */
--font-size-xxl-rem: 2rem;   /* 28px */
--font-size-3xl-rem: 2.571rem;   /* 36px */
--font-size-4xl-rem: 3.429rem;   /* 48px */
--font-size-3_5xl-rem: 2.5rem;   /* 40px */
--font-size-5xl-rem: 4.5rem;   /* 72px */
```

---

- **npm**: `npm install ft-design-system`
- **Import**: `import { Component } from 'ft-design-system'` (AI-protected by default)
- **Core Import**: `import { Component } from 'ft-design-system/core'` (unprotected)
- **CSS**: `import 'ft-design-system/styles.css'`
- **Tailwind Preset**: `require('ft-design-system/tailwind-preset')`
- **Registry**: `ft-design-system/registry.json`

---

## Links

- Documentation: https://ft-design-system.dev
- Storybook: https://storybook.ft-design-system.dev
- GitHub: https://github.com/chetanft/components
- npm: https://npmjs.com/package/ft-design-system
