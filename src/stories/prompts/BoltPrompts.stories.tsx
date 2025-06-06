import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const BoltPrompts = () => {
  const prompts = {
    setup: `# Bolt.new + FT Design System

Install:
\`\`\`bash
npm install ft-design-system
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

Configure tailwind.config.js:
\`\`\`js
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/ft-design-system/**/*.{js,jsx,ts,tsx}"
  ]
}
\`\`\`

Import styles:
\`\`\`tsx
import 'ft-design-system/dist/styles.css';
import { Button, Input, Badge, Table } from 'ft-design-system';
\`\`\`

Available: Button, Input, Badge, Table, Checkbox, RadioGroup, Switch, DatePicker, Dropdown, Tabs, Typography, ProgressBar, FileCard, UploadZone, 190+ Icons.

Create responsive TypeScript React app.`,

    webapp: `# Multi-Page Web App - Bolt.new

Build with these pages:

**Landing**: Hero with Typography, feature cards with Badge/Button
**Dashboard**: Tabs navigation, Table for data, Input filters, Badge status
**User Management**: Table (sortable), forms with Input/RadioGroup, Switch toggles
**Settings**: Switch options, RadioGroup preferences, Button actions

Components:
- Button (primary, secondary, destructive)
- Input (with validation)
- Table (sorting, selection)
- Badge (status indicators)
- Tabs, Switch, RadioGroup, Typography

Features:
- React Router navigation
- Form validation
- Loading states
- Responsive design
- TypeScript

Use Tailwind for styling, ensure accessibility.`,

    saas: `# SaaS Platform - Bolt.new

Build complete SaaS with:

**Auth**: Login/register forms with Input, Button variants
**Onboarding**: Multi-step with ProgressBar, RadioGroup plans, Switch features
**Dashboard**: Metrics cards, Table (sorting/filtering), Badge status, Input search
**User Management**: Table for team, Dropdown roles, Switch permissions, Checkbox bulk ops
**Settings**: Account forms, billing Input, RadioGroup plans
**Files**: UploadZone, FileCard list, bulk operations

Components: All FT components (Button, Input, Table, Badge, Switch, RadioGroup, ProgressBar, UploadZone, FileCard)

Features:
- Authentication state
- API integration
- Loading/error states
- Responsive design
- TypeScript

Create production-ready SaaS with modern UI.`,

    mobile: `# Mobile-First App - Bolt.new

Create mobile-first responsive app:

**Navigation**: Collapsible sidebar, bottom Tabs, hamburger Button
**Forms**: Stacked Input, large touch targets for Checkbox/RadioGroup, mobile DatePicker
**Data Display**: Card layouts, horizontal Table scroll, Collapsible rows
**Touch**: 44px+ targets, swipe actions, drag/drop UploadZone

Components:
- Button (full-width mobile, inline desktop)
- Input (stacked labels mobile)
- Table (cards on mobile)
- Tabs (horizontal scroll)
- Collapsible, DatePicker, Checkbox, RadioGroup

Responsive breakpoints: sm:640px, md:768px, lg:1024px, xl:1280px

Features:
- Touch-friendly interactions
- Performance optimization
- Lazy loading
- Offline support
- Cross-device testing

Build fast, accessible mobile-first app.`
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Bolt.new AI Prompts
        </h1>
        <p className="text-gray-600">
          Copy these prompts to use the FT Design System in your Bolt.new projects
        </p>
      </div>

      {Object.entries(prompts).map(([key, prompt]) => (
        <div key={key} className="bg-white border rounded-lg shadow-sm">
          <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900 capitalize">
              {key === 'setup' ? 'Project Setup' : 
               key === 'webapp' ? 'Web Application' :
               key === 'saas' ? 'SaaS Platform' :
               'Mobile-First App'}
            </h2>
            <button
              onClick={() => copyToClipboard(prompt)}
              className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
            >
              Copy Prompt
            </button>
          </div>
          <div className="p-4">
            <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-50 p-4 rounded border overflow-x-auto">
              {prompt}
            </pre>
          </div>
        </div>
      ))}

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="font-semibold text-green-900 mb-2">🚀 Bolt.new Tips</h3>
        <ul className="text-green-800 text-sm space-y-1">
          <li>• Bolt.new excels at full-stack applications</li>
          <li>• Include backend requirements if needed</li>
          <li>• Specify database schema and API endpoints</li>
          <li>• Mention deployment preferences (Vercel, Netlify)</li>
          <li>• Request specific integrations (Stripe, Auth0, etc.)</li>
        </ul>
      </div>
    </div>
  );
};

const meta: Meta<typeof BoltPrompts> = {
  title: 'AI Prompts/Bolt.new',
  component: BoltPrompts,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Comprehensive AI prompts for Bolt.new projects using the FT Design System.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPrompts: Story = {}; 