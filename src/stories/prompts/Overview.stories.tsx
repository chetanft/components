import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const PromptsOverview = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-4">
          FT Design System Integration Prompts
        </h1>
        <p className="text-lg text-[var(--color-tertiary)] max-w-2xl mx-auto">
          Simple prompts to integrate FT Design System into your projects using AI tools.
        </p>
      </div>

      {/* Installation */}
      <div className="bg-[var(--color-bg-secondary)] rounded-lg p-6">
        <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4">📦 Installation Options</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-[var(--color-primary)] mb-2">Option 1: NPM (Recommended)</h3>
            <div className="bg-[var(--color-primary)] text-[var(--color-positive)] p-3 rounded-lg font-mono text-sm text-[var(--color-bg-primary)]">
              npm install ft-design-system
            </div>
            <p className="text-sm text-[var(--color-tertiary)] mt-2">For tools like VS Code, Cursor, local development</p>
          </div>

          <div>
            <h3 className="font-semibold text-[var(--color-primary)] mb-2">Option 2: CDN (Universal)</h3>
            <div className="bg-[var(--color-primary)] text-[var(--color-neutral)] p-3 rounded-lg font-mono text-sm text-[var(--color-bg-primary)]">
              &lt;link rel=&quot;stylesheet&quot; href=&quot;https://unpkg.com/ft-design-system@latest/dist/styles.css&quot;&gt;<br/>
              &lt;script src=&quot;https://unpkg.com/ft-design-system@latest/dist/index.umd.js&quot;&gt;&lt;/script&gt;
            </div>
            <p className="text-sm text-[var(--color-tertiary)] mt-2">For Bolt.new, CodeSandbox, Replit, and other online tools</p>
          </div>

          <div>
            <h3 className="font-semibold text-[var(--color-primary)] mb-2">Option 3: Manual Components</h3>
            <div className="bg-[var(--color-primary)] text-[var(--color-warning)] p-3 rounded-lg font-mono text-sm text-[var(--color-bg-primary)]">
              Recreate components with Tailwind CSS
            </div>
            <p className="text-sm text-[var(--color-tertiary)] mt-2">For tools with no external package support</p>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-[var(--color-primary)] mb-2">NPM Setup</h3>
            <div className="bg-[var(--color-primary)] text-[var(--color-neutral-light)] p-3 rounded text-sm font-mono">
              import 'ft-design-system/dist/styles.css';<br/>
              import &#123; Button, Input &#125; from 'ft-design-system';
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-[var(--color-primary)] mb-2">CDN Setup</h3>
            <div className="bg-[var(--color-primary)] text-[var(--color-neutral-light)] p-3 rounded text-sm font-mono">
              const &#123; Button, Input &#125; = window.FTDesignSystem;
            </div>
          </div>
        </div>
      </div>

      {/* Available Components */}
      <div className="bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] rounded-lg p-6">
        <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4">🧩 Available Components</h2>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <h3 className="font-semibold text-[var(--color-primary)] mb-2">Form Controls</h3>
            <ul className="text-[var(--color-tertiary)] space-y-1">
              <li>• Button (5 variants)</li>
              <li>• Input</li>
              <li>• Checkbox</li>
              <li>• RadioGroup</li>
              <li>• Switch</li>
              <li>• DatePicker</li>
              <li>• Dropdown</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[var(--color-primary)] mb-2">Data Display</h3>
            <ul className="text-[var(--color-tertiary)] space-y-1">
              <li>• Table (with pagination)</li>
              <li>• Badge (5 variants, Figma-exact)</li>
              <li>• Typography (display only)</li>
              <li>• ProgressBar ✅</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[var(--color-primary)] mb-2">Other</h3>
            <ul className="text-[var(--color-tertiary)] space-y-1">
              <li>• Tabs (3 types)</li>
              <li>• Collapsible</li>
              <li>• FileCard</li>
              <li>• UploadZone</li>
              <li>• 190+ Icons (string names)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Usage */}
      <div className="bg-[var(--color-neutral-light)] border border-[var(--color-border-primary)] rounded-lg p-6">
        <h3 className="font-semibold text-[var(--color-primary)] mb-4">💡 How to Use</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-[var(--color-primary)] mb-2">Tools with NPM Support:</h4>
            <ul className="text-[var(--color-neutral)] text-sm space-y-1">
              <li>• VS Code + Cursor AI</li>
              <li>• Local development</li>
              <li>• Lovable.dev</li>
              <li>→ Use the &quot;Integration&quot; prompt</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-[var(--color-primary)] mb-2">Tools without NPM:</h4>
            <ul className="text-[var(--color-neutral)] text-sm space-y-1">
              <li>• Bolt.new</li>
              <li>• CodeSandbox</li>
              <li>• Replit</li>
              <li>→ Use the &quot;No NPM Support&quot; prompt</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-[var(--color-border-primary)]">
          <ol className="text-[var(--color-neutral)] text-sm space-y-1">
            <li>1. Copy the appropriate prompt from the General section</li>
            <li>2. Paste it into your AI tool (ChatGPT, Claude, etc.)</li>
            <li>3. Ask the AI to build your specific feature</li>
            <li>4. Use the fallback prompt if components are missing</li>
          </ol>
        </div>

        <div className="mt-4 p-4 bg-[var(--color-neutral-light)] rounded-lg">
          <h4 className="font-medium text-[var(--color-primary)] mb-2">📁 Bonus: Downloadable Documentation</h4>
          <p className="text-[var(--color-neutral)] text-sm">
            Visit the General section to download JSON/MDX documentation files that you can upload to AI tools for even better component generation results.
          </p>
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
