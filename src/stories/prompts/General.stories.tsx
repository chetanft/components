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
    // Basic components with usage examples
    components: [
      {
        name: "Button",
        import: "import { Button } from 'ft-design-system';",
        usage: "<Button variant=\"primary\" size=\"md\">Click me</Button>",
        props: "variant: 'primary' | 'secondary' | 'outline' | 'ghost'\nsize: 'sm' | 'md' | 'lg'"
      },
      {
        name: "Input",
        import: "import { Input } from 'ft-design-system';",
        usage: "<Input placeholder=\"Enter text\" type=\"text\" />",
        props: "type: 'text' | 'email' | 'password' | 'number'\nplaceholder: string\ndisabled?: boolean"
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
        usage: "<Table data={tableData} columns={columns} />",
        props: "data: any[]\ncolumns: Column[]\nsortable?: boolean\npagination?: boolean"
      },
      {
        name: "Badge",
        import: "import { Badge } from 'ft-design-system';",
        usage: "<Badge variant=\"success\">Active</Badge>",
        props: "variant: 'default' | 'success' | 'warning' | 'error'\nsize: 'sm' | 'md' | 'lg'"
      },
      {
        name: "Tabs",
        import: "import { Tabs } from 'ft-design-system';",
        usage: "<Tabs tabs={[{label: 'Tab 1', content: <div>Content</div>}]} />",
        props: "tabs: {label: string, content: React.ReactNode}[]\ndefaultTab?: number"
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
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { 
    key: 'status', 
    label: 'Status',
    render: (value) => <Badge variant={value === 'active' ? 'success' : 'warning'}>{value}</Badge>
  }
];

<Table data={data} columns={columns} />`
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
import { Button, Input, Table, Badge } from 'ft-design-system';
\`\`\`

## CDN Usage

\`\`\`html
<link rel="stylesheet" href="https://unpkg.com/ft-design-system@latest/dist/styles.css">
<script src="https://unpkg.com/ft-design-system@latest/dist/index.umd.js"></script>
\`\`\`

\`\`\`javascript
const { Button, Input, Table, Badge } = window.FTDesignSystem;
\`\`\`

## Components

### Button
\`\`\`jsx
import { Button } from 'ft-design-system';

<Button variant="primary" size="md">Click me</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
\`\`\`

**Props:**
- \`variant\`: 'primary' | 'secondary' | 'outline' | 'ghost'
- \`size\`: 'sm' | 'md' | 'lg'
- \`disabled\`: boolean

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
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' }
];

<Table data={data} columns={columns} sortable pagination />
\`\`\`

### Badge
\`\`\`jsx
import { Badge } from 'ft-design-system';

<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Error</Badge>
\`\`\`

### Tabs
\`\`\`jsx
import { Tabs } from 'ft-design-system';

const tabs = [
  { label: 'Tab 1', content: <div>Content 1</div> },
  { label: 'Tab 2', content: <div>Content 2</div> }
];

<Tabs tabs={tabs} defaultTab={0} />
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

### Data Table with Badges
\`\`\`jsx
import { Table, Badge } from 'ft-design-system';

const data = [
  { id: 1, name: 'John Doe', status: 'active', role: 'Admin' },
  { id: 2, name: 'Jane Smith', status: 'inactive', role: 'User' }
];

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { 
    key: 'status', 
    label: 'Status',
    render: (value) => (
      <Badge variant={value === 'active' ? 'success' : 'warning'}>
        {value}
      </Badge>
    )
  }
];

<Table data={data} columns={columns} />
\`\`\`

## Icons

190+ icons available:
\`\`\`jsx
import { HomeIcon, UserIcon, SettingsIcon } from 'ft-design-system/icons';

<HomeIcon className="w-5 h-5" />
<UserIcon className="w-6 h-6" />
<SettingsIcon className="w-4 h-4" />
\`\`\`

## TypeScript Support

Full TypeScript support included:
\`\`\`typescript
import { ButtonProps, InputProps } from 'ft-design-system';

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
\`\`\`
`;
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

Option 3 - Manual (copy components):
If the tool doesn't support external packages, recreate these components manually using Tailwind CSS with similar styling.

Setup:
// For npm:
import 'ft-design-system/dist/styles.css';
import { Button, Input, Table, Badge } from 'ft-design-system';

// For CDN:
const { Button, Input, Table, Badge } = window.FTDesignSystem;

Available components: Button, Input, Checkbox, RadioGroup, Switch, DatePicker, Dropdown, Table, Badge, Typography, ProgressBar, Tabs, Collapsible, FileCard, UploadZone, and 190+ icons.

Use TypeScript for type safety when possible. Follow modern React patterns with hooks and functional components.`
    },
    {
      id: 'no-npm',
      title: 'For Tools Without NPM Support',
      description: 'Use this for Bolt.new, CodeSandbox, Replit, and other online AI tools',
      prompt: `Use FT Design System via CDN since this tool doesn't support npm packages.

Add these to your HTML head:
<link rel="stylesheet" href="https://unpkg.com/ft-design-system@latest/dist/styles.css">
<script src="https://unpkg.com/ft-design-system@latest/dist/index.umd.js"></script>

Then use components like this:
const { Button, Input, Table, Badge } = window.FTDesignSystem;

If CDN doesn't work, create similar components manually with Tailwind CSS:
- Use blue-600 for primary buttons
- Use gray-100 borders for inputs
- Use consistent spacing (p-2, p-4, etc.)
- Follow the same visual patterns as FT Design System

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

For tools without npm support:
- Use Headless UI CDN: https://unpkg.com/@headlessui/react@latest/dist/index.umd.js
- Or create custom components with Tailwind CSS classes
- Keep consistent styling that matches FT Design System aesthetic

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