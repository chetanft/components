import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const GeneralPrompts = () => {
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  const copyToClipboard = (text: string, promptName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(promptName);
    setTimeout(() => setCopiedPrompt(null), 2000);
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