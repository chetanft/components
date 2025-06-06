import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const PromptsOverview = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          FT Design System Integration Prompts
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Simple prompts to integrate FT Design System into your projects using AI tools.
        </p>
      </div>

      {/* Installation */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">📦 Installation Options</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Option 1: NPM (Recommended)</h3>
            <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm">
              npm install ft-design-system
            </div>
            <p className="text-sm text-gray-600 mt-2">For tools like VS Code, Cursor, local development</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Option 2: CDN (Universal)</h3>
            <div className="bg-gray-900 text-blue-400 p-3 rounded-lg font-mono text-sm">
              &lt;link rel="stylesheet" href="https://unpkg.com/ft-design-system@latest/dist/styles.css"&gt;<br/>
              &lt;script src="https://unpkg.com/ft-design-system@latest/dist/index.umd.js"&gt;&lt;/script&gt;
            </div>
            <p className="text-sm text-gray-600 mt-2">For Bolt.new, CodeSandbox, Replit, and other online tools</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Option 3: Manual Components</h3>
            <div className="bg-gray-900 text-yellow-400 p-3 rounded-lg font-mono text-sm">
              Recreate components with Tailwind CSS
            </div>
            <p className="text-sm text-gray-600 mt-2">For tools with no external package support</p>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">NPM Setup</h3>
            <div className="bg-gray-900 text-gray-300 p-3 rounded text-sm font-mono">
              import 'ft-design-system/dist/styles.css';<br/>
              import &#123; Button, Input &#125; from 'ft-design-system';
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">CDN Setup</h3>
            <div className="bg-gray-900 text-gray-300 p-3 rounded text-sm font-mono">
              const &#123; Button, Input &#125; = window.FTDesignSystem;
            </div>
          </div>
        </div>
      </div>

      {/* Available Components */}
      <div className="bg-white border rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">🧩 Available Components</h2>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Form Controls</h3>
            <ul className="text-gray-600 space-y-1">
              <li>• Button</li>
              <li>• Input</li>
              <li>• Checkbox</li>
              <li>• RadioGroup</li>
              <li>• Switch</li>
              <li>• DatePicker</li>
              <li>• Dropdown</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Data Display</h3>
            <ul className="text-gray-600 space-y-1">
              <li>• Table</li>
              <li>• Badge</li>
              <li>• Typography</li>
              <li>• ProgressBar</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Other</h3>
            <ul className="text-gray-600 space-y-1">
              <li>• Tabs</li>
              <li>• Collapsible</li>
              <li>• FileCard</li>
              <li>• UploadZone</li>
              <li>• 190+ Icons</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Usage */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-4">💡 How to Use</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-blue-900 mb-2">Tools with NPM Support:</h4>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• VS Code + Cursor AI</li>
              <li>• Local development</li>
              <li>• Lovable.dev</li>
              <li>→ Use the "Integration" prompt</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-900 mb-2">Tools without NPM:</h4>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Bolt.new</li>
              <li>• CodeSandbox</li>
              <li>• Replit</li>
              <li>→ Use the "No NPM Support" prompt</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-blue-200">
          <ol className="text-blue-800 text-sm space-y-1">
            <li>1. Copy the appropriate prompt from the General section</li>
            <li>2. Paste it into your AI tool (ChatGPT, Claude, etc.)</li>
            <li>3. Ask the AI to build your specific feature</li>
            <li>4. Use the fallback prompt if components are missing</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof PromptsOverview> = {
  title: 'AI Prompts/Overview',
  component: PromptsOverview,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Simple integration prompts for using FT Design System with AI tools.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {}; 