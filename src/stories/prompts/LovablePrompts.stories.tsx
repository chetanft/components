import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const LovablePrompts = () => {
  const prompts = {
    setup: `# Lovable.dev + FT Design System Setup

Install and configure:
\`\`\`bash
npm install ft-design-system
\`\`\`

Import in App.tsx:
\`\`\`tsx
import 'ft-design-system/dist/styles.css';
import { Button, Input, Badge, Table } from 'ft-design-system';
\`\`\`

Update tailwind.config.js:
\`\`\`js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/ft-design-system/**/*.{js,jsx,ts,tsx}"
  ]
}
\`\`\`

Available components: Button, Input, Badge, Table, Checkbox, RadioGroup, Switch, DatePicker, Dropdown, Tabs, Typography, 190+ Icons.

Create a responsive React app using these components with TypeScript.`,

    dashboard: `# Admin Dashboard - Lovable.dev

Build an admin dashboard with:

**Header**: User profile, navigation
**Stats Cards**: Key metrics with Badge indicators  
**Data Table**: User list with Table component
**Actions**: Edit/delete buttons, search Input

Components to use:
- Table (sortable, selectable)
- Button (primary, secondary, destructive)
- Badge (status indicators)
- Input (search)
- Typography (headings)

Features:
- Responsive design
- Row selection
- Search functionality
- Status badges
- CRUD operations

Mock data: users with id, name, email, status, role.
Import from 'ft-design-system'.`,

    ecommerce: `# E-commerce Store - Lovable.dev

Create product catalog with:

**Product Grid**: Responsive cards
**Product Card**: Image, name, price, Badge for sales, Button for cart
**Filters**: Dropdown for categories, Input for search
**Cart**: Item list, quantity controls

Components:
- Button (add to cart, checkout)
- Badge (sale, new, stock status)
- Input (search, quantity)
- Dropdown (sorting, filters)
- Typography (product info)

Features:
- Mobile-first responsive
- Product filtering
- Shopping cart state
- Price display
- Stock indicators

Mock products: name, price, image, rating, inStock, category.`,

    forms: `# Contact Forms - Lovable.dev

Build comprehensive forms:

**Contact Form**: Name, email, message
**Registration**: Personal info, preferences
**Settings**: Profile, notifications

Components:
- Input (text, email, tel)
- Checkbox (agreements)
- RadioGroup (selections)
- Switch (toggles)
- DatePicker (dates)
- Button (submit, cancel)

Features:
- Form validation
- Error states
- Loading states
- Success feedback
- Responsive layout
- TypeScript types

Use React Hook Form for state management.`
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Lovable.dev AI Prompts
        </h1>
        <p className="text-gray-600">
          Concise prompts for using FT Design System in Lovable.dev projects
        </p>
      </div>

      {Object.entries(prompts).map(([key, prompt]) => (
        <div key={key} className="bg-white border rounded-lg shadow-sm">
          <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900 capitalize">
              {key === 'setup' ? 'Initial Setup' : 
               key === 'dashboard' ? 'Admin Dashboard' :
               key === 'ecommerce' ? 'E-commerce Store' :
               'Contact Forms'}
            </h2>
            <button
              onClick={() => copyToClipboard(prompt)}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
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

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">💡 Lovable.dev Tips</h3>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>• Start with setup prompt for new projects</li>
          <li>• Paste entire prompt including code examples</li>
          <li>• Modify requirements for your specific needs</li>
          <li>• Always include CSS import for proper styling</li>
        </ul>
      </div>
    </div>
  );
};

const meta: Meta<typeof LovablePrompts> = {
  title: 'AI Prompts/Lovable.dev',
  component: LovablePrompts,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Concise AI prompts for Lovable.dev projects using the FT Design System.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPrompts: Story = {}; 