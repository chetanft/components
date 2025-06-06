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

Installation:
npm install ft-design-system

Setup:
import 'ft-design-system/dist/styles.css';
import { Button, Input, Table, Badge } from 'ft-design-system';

Available components: Button, Input, Checkbox, RadioGroup, Switch, DatePicker, Dropdown, Table, Badge, Typography, ProgressBar, Tabs, Collapsible, FileCard, UploadZone, and 190+ icons.

Use TypeScript for type safety. Follow modern React patterns with hooks and functional components.`
    },
    {
      id: 'fallback',
      title: 'Missing Components Fallback',
      description: 'Use this when FT Design System is missing components you need',
      prompt: `If FT Design System doesn't have a component I need, use shadcn/ui or Headless UI as fallback while keeping the existing FT Design System components.

Priority order:
1. FT Design System (preferred)
2. shadcn/ui (fallback)
3. Headless UI (fallback)

Keep consistent styling with Tailwind CSS classes that match the FT Design System aesthetic.`
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
          <li>• Copy the integration prompt first, then ask for your specific feature</li>
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