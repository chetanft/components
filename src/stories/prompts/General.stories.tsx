import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const GeneralPrompts = () => {
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  const copyToClipboard = (text: string, promptName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(promptName);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  const downloadFile = (content: string, filename: string, contentType: string) => {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const componentExamples = {
    // ⚠️ IMPORTANT: Update this list when adding/modifying components in src/index.ts
    // This should match the actual exports from the design system
    // Last updated: December 2024
    components: [
      {
        name: "Button",
        import: "import { Button } from 'ft-design-system';",
        usage: "<Button variant=\"primary\" size=\"md\">Click me</Button>",
        props: "variant: 'primary' | 'secondary' | 'destructive' | 'text' | 'link'\nsize: 'sm' | 'md' | 'lg'\nicon?: IconName (string)\niconPosition?: 'leading' | 'trailing' | 'only'"
      },
      {
        name: "Input",
        import: "import { Input } from 'ft-design-system';",
        usage: "<Input placeholder=\"Enter text\" type=\"text\" />",
        props: "type: 'text' | 'email' | 'password' | 'number'\nplaceholder: string\ndisabled?: boolean\nNote: No icon prop available"
      },
      {
        name: "Checkbox",
        import: "import { Checkbox } from 'ft-design-system';",
        usage: "<Checkbox id=\"terms\" label=\"I agree to terms\" />",
        props: "id: string\nlabel: string\nchecked?: boolean\nonChange?: (checked: boolean) => void"
      },
      {
        name: "Table",
        import: "import { Table } from 'ft-design-system';",
        usage: "<Table columns={columns} data={data} />",
        props: "columns: TableColumn[] (with 'title' not 'header')\ndata: TableRow[]\nselectable?: boolean\npagination?: { currentPage, totalPages, pageSize, totalItems, onPageChange }"
      },
      {
        name: "Badge",
        import: "import { Badge } from 'ft-design-system';",
        usage: "<Badge variant=\"normal\">Active</Badge>",
        props: "variant: 'normal' | 'neutral' | 'warning' | 'error' | 'success'\nsize: 'sm' | 'md' | 'lg'"
      },
      {
        name: "Tabs",
        import: "import { Tabs } from 'ft-design-system';",
        usage: "<Tabs tabs={[{label: 'Tab 1'}, {label: 'Tab 2'}]} activeTab={0} />",
        props: "tabs: {label: string, badge?: boolean, badgeCount?: string | number}[]\nactiveTab?: number\nonTabChange?: (index: number) => void\ntype?: 'primary' | 'secondary' | 'tertiary'"
      },
      {
        name: "ProgressBar",
        import: "import { ProgressBar } from 'ft-design-system';",
        usage: "<ProgressBar value={75} variant=\"primary\" />",
        props: "value?: number (0-100)\nvariant?: 'primary' | 'success' | 'warning' | 'danger'\nsize?: 'sm' | 'md' | 'lg'\nshowPercentage?: boolean"
      },
      {
        name: "Typography",
        import: "import { Typography } from 'ft-design-system';",
                    usage: "// Demo component only. Use: <h1 className=\"text-xl font-semibold\">Title</h1>",
        props: "This component is for display only. Use regular HTML tags with CSS classes for typography."
      },
      {
        name: "Icon",
        import: "import { Icon } from 'ft-design-system';",
        usage: "<Icon name=\"check\" size={20} />",
        props: "name: string (icon name)\nsize?: number\nclassName?: string\nNote: Icons are string names, not React elements"
      }
    ],
    setup: {
      installation: "npm install ft-design-system",
      imports: "import 'ft-design-system/dist/styles.css';",
      cdn: "<link rel=\"stylesheet\" href=\"https://unpkg.com/ft-design-system@latest/dist/styles.css\">\n<script src=\"https://unpkg.com/ft-design-system@latest/dist/index.umd.js\"></script>"
    }
  };

  const generateJSONDocs = () => {
    const docs = {
      name: "FT Design System",
      version: "1.0.1",
      description: "Complete design system with React components",
      installation: componentExamples.setup,
      components: componentExamples.components,
      icons: {
        count: "190+",
        usage: "import { IconName } from 'ft-design-system/icons';",
        examples: ["<HomeIcon />", "<UserIcon />", "<SettingsIcon />"]
      },
      examples: {
        basicForm: `import { Button, Input, Checkbox } from 'ft-design-system';
import 'ft-design-system/dist/styles.css';

function ContactForm() {
  return (
    <form className="space-y-4">
      <Input placeholder="Your name" type="text" />
      <Input placeholder="Email address" type="email" />
      <Checkbox id="newsletter" label="Subscribe to newsletter" />
      <Button variant="primary">Submit</Button>
    </form>
  );
}`,
        dataTable: `import { Table, Badge } from 'ft-design-system';

const data = [
  { id: 1, name: 'John Doe', status: 'active', role: 'Admin' },
  { id: 2, name: 'Jane Smith', status: 'inactive', role: 'User' }
];

const columns = [
  { key: 'name', title: 'Name' },
  { key: 'role', title: 'Role' },
  { 
    key: 'status', 
    title: 'Status',
    render: (value) => (
      <Badge variant={value === 'active' ? 'success' : 'warning'}>
        {value}
      </Badge>
    )
  }
];

<Table columns={columns} data={data} />`
      }
    };
    
    return JSON.stringify(docs, null, 2);
  };

  const generateMDXDocs = () => {
    return `# FT Design System Documentation

## Installation

\`\`\`bash
npm install ft-design-system
\`\`\`

\`\`\`javascript
import 'ft-design-system/dist/styles.css';
import { Button, Input, Table, Badge, ProgressBar } from 'ft-design-system';
\`\`\`

## CDN Usage

\`\`\`html
<link rel="stylesheet" href="https://unpkg.com/ft-design-system@latest/dist/styles.css">
<script src="https://unpkg.com/ft-design-system@latest/dist/index.umd.js"></script>
\`\`\`

\`\`\`javascript
const { Button, Input, Table, Badge, ProgressBar } = window.FTDesignSystem;
\`\`\`

## Components

### Button
\`\`\`jsx
import { Button } from 'ft-design-system';

<Button variant="primary" size="md">Click me</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Delete</Button>
<Button variant="text">Text Button</Button>
<Button variant="link">Link Button</Button>

// With icons (icon names are strings)
<Button variant="primary" icon="check" iconPosition="leading">
  Save Changes
</Button>
\`\`\`

**Props:**
- \`variant\`: 'primary' | 'secondary' | 'destructive' | 'text' | 'link'
- \`size\`: 'sm' | 'md' | 'lg'
- \`icon\`: string (icon name)
- \`iconPosition\`: 'leading' | 'trailing' | 'only'

### Input
\`\`\`jsx
import { Input } from 'ft-design-system';

<Input placeholder="Enter text" type="text" />
<Input placeholder="Email" type="email" />
<Input placeholder="Password" type="password" />
\`\`\`

**Props:**
- \`type\`: 'text' | 'email' | 'password' | 'number'
- \`placeholder\`: string
- \`disabled\`: boolean
- **Note:** No icon prop available

### Checkbox
\`\`\`jsx
import { Checkbox } from 'ft-design-system';

<Checkbox id="terms" label="I agree to terms" />
<Checkbox id="newsletter" label="Subscribe to newsletter" checked />
\`\`\`

### Table
\`\`\`jsx
import { Table } from 'ft-design-system';

const data = [
  { id: 1, name: 'John Doe', role: 'Admin' },
  { id: 2, name: 'Jane Smith', role: 'User' }
];

const columns = [
  { key: 'name', title: 'Name' }, // Use 'title', not 'header'
  { key: 'role', title: 'Role' }
];

<Table columns={columns} data={data} selectable />

// With pagination
const pagination = {
  currentPage: 1,
  totalPages: 10,
  pageSize: 20,
  totalItems: 200,
  onPageChange: (page) => console.log(page)
};

<Table columns={columns} data={data} pagination={pagination} />
\`\`\`

### Badge
\`\`\`jsx
import { Badge } from 'ft-design-system';

<Badge variant="normal">Default</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
        <Badge variant="danger">Error</Badge>
<Badge variant="neutral">Neutral</Badge>
\`\`\`

### Tabs
\`\`\`jsx
import { Tabs } from 'ft-design-system';

const tabs = [
  { label: 'Tab 1' },
  { label: 'Tab 2', badge: true, badgeCount: '5' },
  { label: 'Tab 3', notification: true }
];

<Tabs tabs={tabs} activeTab={0} type="primary" />
<Tabs tabs={tabs} activeTab={0} type="secondary" />
<Tabs tabs={tabs} activeTab={0} type="tertiary" />
\`\`\`

**Note:** Tabs don't have content property, handle content separately based on activeTab.

### ProgressBar
\`\`\`jsx
import { ProgressBar } from 'ft-design-system';

<ProgressBar value={75} variant="primary" />
<ProgressBar value={50} variant="success" size="lg" />
<ProgressBar value={25} variant="warning" showPercentage={false} />
\`\`\`

### Icons
\`\`\`jsx
import { Icon } from 'ft-design-system';

<Icon name="check" size={20} />
<Icon name="user" size={24} className="text-blue-500" />
\`\`\`

**Note:** Icon names are strings, not React elements. Available icons: check, user, home, settings, etc.

### Typography
The Typography component is a showcase only. For actual content, use regular HTML tags with design tokens:

\`\`\`jsx
// Typography component is for viewing the design system only:
<Typography /> // Shows typography showcase

// For actual content, use regular HTML tags with design token classes:
<h1 className="text-[var(--font-size-xxl)] font-[var(--font-weight-regular)] text-[var(--color-primary)]">Title</h1>
<p className="text-[var(--font-size-md)] text-[var(--color-secondary)]">Body text</p>
\`\`\`

## Complete Examples

### Contact Form
\`\`\`jsx
import { Button, Input, Checkbox } from 'ft-design-system';
import 'ft-design-system/dist/styles.css';

function ContactForm() {
  return (
    <form className="space-y-4">
      <Input placeholder="Your name" type="text" />
      <Input placeholder="Email address" type="email" />
      <Checkbox id="newsletter" label="Subscribe to newsletter" />
      <Button variant="primary">Submit</Button>
    </form>
  );
}
\`\`\`

### Data Table with Badges (Correct Usage)
\`\`\`jsx
import { Table, Badge, Tabs } from 'ft-design-system';

// ✅ Correct: Table data with 'id' property
const data = [
  { id: 1, name: 'John Doe', status: 'active', role: 'Admin' },  // 'id' required
  { id: 2, name: 'Jane Smith', status: 'inactive', role: 'User' }
];

// ✅ Correct: Columns with 'title' property  
const columns = [
  { key: 'name', title: 'Name' },        // 'title' not 'header'
  { key: 'role', title: 'Role' },
  { 
    key: 'status', 
    title: 'Status',
    render: (value) => (
      <Badge variant={value === 'active' ? 'success' : 'warning'}>
        {value}
      </Badge>
    )
  }
];

// ✅ Correct: Tabs with tabs array
const tabs = [
  { label: 'Active Users' },
  { label: 'Inactive Users', badge: true, badgeCount: 5 }
];

<div>
  <Tabs tabs={tabs} onTabChange={(index) => console.log(index)} />
  <Table columns={columns} data={data} />
</div>
\`\`\`

## TypeScript Support

Full TypeScript support included:
\`\`\`typescript
import { ButtonProps, InputProps } from 'ft-design-system';

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
\`\`\`

## Important Notes

🚨 **CRITICAL: Primary Button Color**
- Primary buttons should be #434f64 (dark gray), NOT blue!
- If you see blue buttons, check CDN loading or CSS conflicts

⚠️ **CRITICAL: CSS Specificity & Component Sizing**
- FT Design System components override Tailwind height classes (h-12, h-10, etc.)
- Use size props instead: size="sm|md|lg" for consistent 36px/44px/52px heights
- Components control their own font sizes - don't override with text-xl, text-base
- If Tailwind classes don't work, check DevTools for CSS specificity conflicts

- Button variants: Use 'destructive', 'text', 'link' instead of 'outline', 'ghost'
- Table columns: Use 'title' property, not 'header'
- Icons: Pass string names, not React elements
- Typography: Component is showcase only - use regular HTML tags with design token classes for content
- Badge: Use variant="danger" not variant="error"
- Table: Always provide data array (even if empty []) to prevent undefined .map() errors
- Tabs: Never use children - always use tabs array prop
- Tabs: Handle content rendering separately based on activeTab
- Input: No icon prop available
- ProgressBar: IS exported and available

🚨 PRIMARY BUTTON COLOR DEBUGGING:
If primary buttons show BLUE instead of dark gray #434f64, debug with:
1. console.log(getComputedStyle(document.documentElement).getPropertyValue('--dark-100'))
2. Check CDN CSS loaded: document.querySelector('link[href*="ft-design-system"]')
3. Inspect element in DevTools to see what CSS is overriding

⚠️ CRITICAL: CSS SPECIFICITY & COMPONENT SIZING ISSUES
FT Design System components have pre-defined heights that override Tailwind classes:

COMPONENT HEIGHT CONFLICTS:
- DON'T use: h-12, h-10, h-16 (will be overridden by FT Design System CSS)
- DO use: Let FT components control their own sizing with size="sm|md|lg" props
- Button: size="sm" (36px), size="md" (44px), size="lg" (52px) 
- Input: size="sm" (36px), size="md" (44px), size="lg" (52px)
- Dropdown: size="m" (44px), size="l" (52px), size="xl" (64px)

FONT SIZE CONFLICTS:
- FT components use standardized font sizes: 14px (sm), 16px (md/lg)
- DON'T override with text-xl, text-base classes
- Components automatically apply correct font sizes based on size prop

CSS SPECIFICITY DEBUGGING:
If custom Tailwind classes don't work:
1. Use browser DevTools to check which styles are overriding
2. FT Design System uses CSS variables: var(--component-height-md) 
3. Use !important sparingly: className="!h-12" (not recommended)
4. Better: Use size props instead of height classes

Always prioritize FT Design System components first, then fall back as needed.

MAINTAIN VISUAL CONSISTENCY: Always use these exact color values, spacing units, border radius, and shadows. Never deviate from these tokens to ensure perfect brand alignment.

Available components: Button, Input, Checkbox, RadioGroup, Switch, DatePicker, Dropdown, Table, Badge, Typography, ProgressBar, Tabs, Collapsible, FileCard, UploadZone, and 190+ icons.`;
  };

  const prompts = [
    {
      id: 'integration',
      title: 'FT Design System Integration',
      description: 'Use this prompt to tell AI tools to use FT Design System instead of other design systems',
      prompt: `Use the FT Design System instead of shadcn/ui, Material-UI, or other design systems.

Installation Options:

Option 1 - NPM (for tools that support npm):
npm install ft-design-system

Option 2 - CDN (for tools without npm support):
Add to your HTML head:
<link rel="stylesheet" href="https://unpkg.com/ft-design-system@latest/dist/styles.css">
<script src="https://unpkg.com/ft-design-system@latest/dist/index.umd.js"></script>

Setup Options:

// OPTION A: Standard components (recommended for most users)
import 'ft-design-system/dist/styles.css';
import { Button, Input, Table, Badge, ProgressBar } from 'ft-design-system';

// OPTION B: AI-protected components (for AI tools that add problematic classes)
import 'ft-design-system/dist/styles.css';
import { Button, Input, Table, Badge, ProgressBar } from 'ft-design-system/ai';

// OPTION C: Manual AI protection (advanced users)
import { Button, filterAIClasses } from 'ft-design-system';
<Button className={filterAIClasses(aiGeneratedClasses)} />

// For CDN (with robust loading):
waitForDesignSystem((FTDesignSystem) => {
  if (!FTDesignSystem) return; // Handle loading failure
  const { Button, Input, Table, Badge, ProgressBar } = FTDesignSystem;
  // Your app code here
});

Available components: Button, Input, Checkbox, RadioGroup, Switch, DatePicker, Dropdown, Table, Badge, Typography, ProgressBar, Tabs, Collapsible, FileCard, UploadZone, and 190+ icons.

🎨 FT DESIGN TOKENS - When using components or creating custom elements, follow these exact values:

COLORS (brand-consistent values):
- Primary: #434f64, Neutral/Accent: #1890ff, Error: #ff3533, Warning: #ff6c19, Success: #00c638
- Text: #434f64 (headings), #5f697b (body), #838c9d (muted)
- Borders: #ced1d7, Dividers: #f0f1f7, Backgrounds: #f8f8f9/#ffffff

TYPOGRAPHY: Inter font, weights 400/500/600, sizes 14px/16px/20px/24px/28px

SPACING: 4px/8px/12px/16px/20px/24px/32px (8px system), padding 12px/20px/32px

BORDERS: radius 4px/8px/12px/16px, shadows 0 1px 2px to 0 20px 25px rgba(67,79,100,0.05-0.1)

COMPONENT SPECIFICATIONS:
- Button: variant="primary|secondary|destructive|text|link" (NOT outline/ghost)
- Table: columns with 'title' property (NOT header/label), data must have 'id' property (NOT 'key')
- Icons: name="check" as string (NOT <CheckIcon /> elements)
- Badge: variant="normal|neutral|warning|danger|success" (use "danger" NOT "error")
- Tabs: Uses tabs=[{label, badge?, icon?}] array (NO children prop)
- Input: No icon prop available
- Typography: Display component only - use regular HTML tags with design token classes for content

CRITICAL DATA REQUIREMENTS:
- Table data: Each row MUST have 'id' property: [{id: 1, name: "..."}, {id: 2, ...}]
- Tabs: Pass tabs array, not children: <Tabs tabs={[{label: "Tab 1"}, {label: "Tab 2"}]} />
- Always provide data array to Table (never undefined) to prevent .map() errors

CUSTOM STYLING EXAMPLES (when extending components):
- className="bg-[#1890ff] text-white rounded-lg px-5 py-3 shadow-sm" (button)
- className="border-[#ced1d7] rounded-lg focus:border-[#1890ff]" (input)
- className="bg-white rounded-xl shadow-md p-6" (card)

Use TypeScript for type safety when possible. Follow modern React patterns with hooks and functional components.

🛡️ SELF-DEFENSIVE COMPONENTS (v4.1.5+):
Components automatically prevent common mistakes - no validation needed!`
    },
    {
      id: 'no-npm',
      title: 'For Tools Without NPM Support',
      description: 'Use this for Bolt.new, CodeSandbox, Replit, and other online AI tools',
      prompt: `Use FT Design System via CDN since this tool doesn't support npm packages.

⚠️ IMPORTANT: Use robust CDN loading to avoid window.FTDesignSystem undefined errors!

Add these to your HTML head (ALWAYS use latest version):
<link rel="stylesheet" href="https://unpkg.com/ft-design-system@4.1.4/dist/styles.css">
<script src="https://unpkg.com/ft-design-system@4.1.4/dist/index.umd.js"></script>

🚨 VERSION CRITICAL: Use v4.1.4+ for these fixes:
- v4.1.2: Fixed primary color (#434f64) and removed unwanted border radius
- v4.1.3: Fixed component height consistency (Dropdown defaults to 44px)  
- v4.1.4: Added Table error handling and defensive programming
- Using older versions will require manual workarounds!

Use robust loading pattern (prevents undefined errors):
function waitForDesignSystem(callback, timeout = 5000) {
  const startTime = Date.now();
  function check() {
    if (window.FTDesignSystem) {
      callback(window.FTDesignSystem);
    } else if (Date.now() - startTime < timeout) {
      setTimeout(check, 100);
    } else {
      console.error('FT Design System failed to load');
      callback(null);
    }
  }
  check();
}

// Use components safely with debugging:
waitForDesignSystem((FTDesignSystem) => {
  if (!FTDesignSystem) {
    console.error('Design System not available, using fallbacks');
    return;
  }
  
  // Debug: Check what components are actually available
  console.log('Available components:', Object.keys(FTDesignSystem));
  
  const { Button, Input, Table, Badge, Dropdown, ProgressBar } = FTDesignSystem;
  
  // Debug: Check if any components are undefined
  const components = { Button, Input, Table, Badge, Dropdown, ProgressBar };
  const undefined_components = Object.entries(components)
    .filter(([name, component]) => !component)
    .map(([name]) => name);
  
  if (undefined_components.length > 0) {
    console.error('Undefined components:', undefined_components);
    console.log('This will cause render errors. Check CDN loading or component names.');
    return;
  }
  
  // Your app code here - all components are verified as loaded
});

🎨 DESIGN TOKENS - Use these EXACT values for consistent styling:

COLORS (use these specific values):
🚨 CRITICAL: Primary buttons use #434f64 (dark gray), NOT blue!
- Primary: #434f64 (PRIMARY BUTTONS - dark gray, not blue!)
- Secondary/Accent: #1890ff (secondary elements, links, focus states)
- Critical/Error: #ff3533 (errors, destructive actions)
- Warning: #ff6c19 (warnings, alerts)  
- Success/Positive: #00c638 (success states, confirmations)
- Dark Text: #434f64 (headings), #5f697b (body text), #838c9d (muted text)
- Borders: #ced1d7 (default borders), #f0f1f7 (dividers)
- Background: #f8f8f9 (page background), #ffffff (cards, panels)

TYPOGRAPHY (Inter font family):
- Font weights: 400 (regular), 500 (medium), 600 (semibold)
- Font sizes: 14px (small), 16px (base), 20px (large), 24px (xl), 28px (xxl)
- Line heights: Use 1.2-1.5 for optimal readability

SPACING (8px base unit system):
- 4px (xs), 8px (sm), 12px (md), 16px (lg), 20px (xl), 24px (2xl), 32px (3xl)
- Component padding: 12px (compact), 20px (default), 32px (spacious)
- Gaps between elements: 8px (tight), 16px (normal), 24px (loose)

BORDER RADIUS:
- 4px: Small elements (badges, checkboxes)
- 8px: Default (buttons, inputs, cards)
- 12px: Large cards, modals
- 16px: Hero sections
- 9999px: Pills and fully rounded elements

SHADOWS (use rgba(67, 79, 100, opacity)):
- Small: 0 1px 2px 0 rgba(67, 79, 100, 0.05)
- Medium: 0 4px 6px -1px rgba(67, 79, 100, 0.1)
- Large: 0 10px 15px -3px rgba(67, 79, 100, 0.1)
- XL: 0 20px 25px -5px rgba(67, 79, 100, 0.1)

COMPONENT SPECIFICATIONS:
- Button: variant="primary|secondary|destructive|text|link" size="sm|md|lg" (NOT outline/ghost)
- Input: size="sm|md|lg" (36px/44px/52px) - DON'T use h-12, h-10 classes
- Dropdown: size="m|l|xl" (44px/52px/64px) - DON'T add manual height/borderRadius
- Table: columns with 'title' property (NOT header/label), data must have 'id' property (NOT 'key')
- Icons: name="check" as string (NOT <CheckIcon /> elements)
- Badge: variant="normal|neutral|warning|danger|success" (use "danger" NOT "error")
- Tabs: Uses tabs=[{label, badge?, icon?}] array (NO children prop)
- ProgressBar: variant="primary|secondary|success|warning|danger" (DON'T use custom colors)
- Typography: Display component only - use regular HTML tags with design token classes for content

✅ CORRECT COMPONENT USAGE EXAMPLES:
<Button variant="primary" size="md">Save</Button>
<Input size="md" placeholder="Enter text" />
<Dropdown size="m" options={[{value: "1", label: "Option 1"}]} />
<Table columns={[{key: "name", title: "Name"}]} data={[{id: 1, name: "Item"}]} />
<Badge variant="success">Active</Badge>
<ProgressBar variant="primary" value={75} />

CRITICAL DATA REQUIREMENTS:
- Table data: Each row MUST have 'id' property: [{id: 1, name: "..."}, {id: 2, ...}]
- Tabs: Pass tabs array, not children: <Tabs tabs={[{label: "Tab 1"}, {label: "Tab 2"}]} />
- Always provide data array to Table (never undefined) to prevent .map() errors

🚨 PRIMARY BUTTON COLOR DEBUGGING:
If primary buttons show BLUE instead of dark gray #434f64, debug with:
1. console.log(getComputedStyle(document.documentElement).getPropertyValue('--dark-100'))
2. Check CDN CSS loaded: document.querySelector('link[href*="ft-design-system"]')
3. Inspect element in DevTools to see what CSS is overriding

🚨 TABLE ERROR DEBUGGING:
If you see "TableRowComponent" React errors:
1. Check data has 'id' property: data.every(row => row.id !== undefined)
2. Ensure columns use 'title' not 'header': {key: "name", title: "Name"}
3. Validate data structure: console.log('Table data:', data)
4. Missing 'id' will cause React crashes - always include it!
5. Use defensive data: data?.filter(row => row.id) || []

🛡️ AUTOMATIC PROTECTION: FT components automatically filter out problematic classes and styles.
You can use any className or style - the components will ignore overrides that break the design system.

⚠️ CRITICAL: CSS SPECIFICITY & COMPONENT SIZING ISSUES
FT Design System components have pre-defined heights that override Tailwind classes:

COMPONENT HEIGHT CONFLICTS:
- DON'T use: h-12, h-10, h-16 (will be overridden by FT Design System CSS)
- DO use: Let FT components control their own sizing with size="sm|md|lg" props
- Button: size="sm" (36px), size="md" (44px), size="lg" (52px) 
- Input: size="sm" (36px), size="md" (44px), size="lg" (52px)
- Dropdown: size="m" (44px), size="l" (52px), size="xl" (64px)

FONT SIZE CONFLICTS:
- FT components use standardized font sizes: 14px (sm), 16px (md/lg)
- DON'T override with text-xl, text-base classes
- Components automatically apply correct font sizes based on size prop

CSS SPECIFICITY DEBUGGING:
If custom Tailwind classes don't work:
1. Use browser DevTools to check which styles are overriding
2. FT Design System uses CSS variables: var(--component-height-md) 
3. Use !important sparingly: className="!h-12" (not recommended)
4. Better: Use size props instead of height classes

MAINTAIN VISUAL CONSISTENCY: Always use these exact color values, spacing units, border radius, and shadows. Never deviate from these tokens to ensure perfect brand alignment.

Available components: Button, Input, Checkbox, RadioGroup, Switch, DatePicker, Dropdown, Table, Badge, Typography, ProgressBar, Tabs, Collapsible, FileCard, UploadZone, and 190+ icons.`
    },
    {
      id: 'fallback',
      title: 'Missing Components Fallback',
      description: 'Use this when FT Design System is missing components you need',
      prompt: `If FT Design System doesn't have a component I need, use these fallbacks in order:

Priority order:
1. FT Design System (preferred)
2. shadcn/ui (if npm available)
3. Headless UI + Tailwind CSS (universal fallback)
4. Manual Tailwind CSS components (for tools without package support)

🎨 WHEN CREATING FALLBACK COMPONENTS, USE EXACT FT DESIGN TOKENS:

COLORS: #434f64 (primary buttons), #1890ff (neutral/accent), #ff3533 (error), #ff6c19 (warning), #00c638 (success)
TYPOGRAPHY: Inter font, weights 400/500/600, sizes 14px/16px/20px/24px/28px
SPACING: 4px/8px/12px/16px/20px/24px/32px (8px base system)
BORDERS: radius 4px/8px/12px/16px, color #ced1d7
SHADOWS: 0 1px 2px rgba(67,79,100,0.05) to 0 20px 25px rgba(67,79,100,0.1)

FALLBACK EXAMPLES:
- Primary Button: bg-[#434f64] hover:bg-[#5f697b] text-white rounded-lg px-5 py-3 shadow-sm
- Input: border-[#ced1d7] rounded-lg px-3 py-2 focus:border-[#1890ff] focus:ring-2 focus:ring-[#ecf6ff]
- Card: bg-white rounded-xl shadow-md p-6 border border-[#f0f1f7]
- Badge danger: bg-[#ffeaea] text-[#b80100] px-3 py-1 rounded text-sm font-medium
- Typography: Use regular HTML tags with text-[#434f64] font-medium text-lg etc.

For tools without npm support:
- Use Headless UI CDN: https://unpkg.com/@headlessui/react@latest/dist/index.umd.js
- Or create custom components with exact FT Design System tokens above
- NEVER use generic Tailwind colors (blue-500, gray-200) - always use FT's exact hex values

CRITICAL: Maintain perfect visual consistency by using ONLY the FT Design System tokens listed above. Any deviation will break brand consistency.

Always prioritize FT Design System components first, then fall back as needed.`
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          General Integration Prompts
        </h1>
        <p className="text-lg text-gray-600">
          Universal prompts that work with any AI coding tool
        </p>
      </div>

      <div className="space-y-6">
        {prompts.map((item) => (
          <div key={item.id} className="bg-white border rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h2>
                <p className="text-gray-600">{item.description}</p>
              </div>
              <button
                onClick={() => copyToClipboard(item.prompt, item.id)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                {copiedPrompt === item.id ? '✓ Copied!' : 'Copy Prompt'}
              </button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
                {item.prompt}
              </pre>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="font-semibold text-yellow-900 mb-2">💡 Usage Tips</h3>
        <ul className="text-yellow-800 text-sm space-y-1">
          <li>• Use the integration prompt for tools with npm support (VS Code, Cursor)</li>
          <li>• Use the "No NPM Support" prompt for online tools (Bolt.new, CodeSandbox, Replit)</li>
          <li>• Use the fallback prompt when you need components not in FT Design System</li>
          <li>• These prompts work with ChatGPT, Claude, Cursor, Bolt.new, Lovable.dev, etc.</li>
        </ul>
      </div>

      {/* Documentation Downloads */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
        <h3 className="font-semibold text-green-900 mb-4">📁 Download Documentation</h3>
        <p className="text-green-800 text-sm mb-4">
          Download component documentation files to upload to your AI tool or reference in your project.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <h4 className="font-medium text-gray-900 mb-2">📄 JSON Documentation</h4>
            <p className="text-gray-600 text-sm mb-3">
              Structured component data with examples, props, and usage patterns.
            </p>
            <button
              onClick={() => downloadFile(generateJSONDocs(), 'ft-design-system-docs.json', 'application/json')}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              Download JSON Docs
            </button>
          </div>

          <div className="bg-white rounded-lg p-4 border border-green-200">
            <h4 className="font-medium text-gray-900 mb-2">📝 MDX Documentation</h4>
            <p className="text-gray-600 text-sm mb-3">
              Markdown with code examples, perfect for uploading to AI tools.
            </p>
            <button
              onClick={() => downloadFile(generateMDXDocs(), 'ft-design-system-guide.mdx', 'text/markdown')}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Download MDX Guide
            </button>
          </div>
        </div>

        <div className="mt-4 p-4 bg-white rounded-lg border border-green-200">
          <h4 className="font-medium text-gray-900 mb-2">🔧 How to Use Downloaded Files:</h4>
          <ul className="text-gray-600 text-sm space-y-1">
            <li>• <strong>JSON:</strong> Upload to AI tools that support file uploads for structured component data</li>
            <li>• <strong>MDX:</strong> Upload to ChatGPT, Claude, or paste into Cursor for context</li>
            <li>• <strong>Project Reference:</strong> Keep in your project docs folder for team reference</li>
            <li>• <strong>AI Context:</strong> Upload before asking AI to build components for better results</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof GeneralPrompts> = {
  title: 'AI Prompts/General',
  component: GeneralPrompts,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Universal prompts for integrating FT Design System with any AI tool.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const General: Story = {}; 