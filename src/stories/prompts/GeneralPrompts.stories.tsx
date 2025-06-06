import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const GeneralPrompts = () => {
  const prompts = {
    quickStart: `# Quick Start - FT Design System

Build a React app with FT Design System:

Setup:
\`\`\`bash
npm install ft-design-system
\`\`\`

Import:
\`\`\`tsx
import 'ft-design-system/dist/styles.css';
import { Button, Input, Badge, Table } from 'ft-design-system';
\`\`\`

Available: Button, Input, Badge, Table, Checkbox, RadioGroup, Switch, DatePicker, Dropdown, Tabs, Typography, ProgressBar, Collapsible, FileCard, UploadZone, 190+ Icons.

What to build: [Describe your project - dashboard, e-commerce, forms, etc.]

Requirements: TypeScript, responsive, accessible, modern React patterns.

Create complete implementation with FT components.`,

    dashboard: `# Admin Dashboard - FT Design System

Build dashboard with:

**Layout**: Header (user profile), sidebar (menu), main content
**Content**: Stats cards, user Table, action Button components
**Features**: Search Input, Badge status, Tabs navigation

Components:
- Table (sortable, selectable, pagination)
- Button (primary, secondary, destructive)
- Badge (status indicators)
- Input (search)
- Tabs, Typography, Icons

Features:
- Responsive design
- Real-time search
- CRUD operations
- Loading states
- Error handling

Mock data: users with id, name, email, role, status.
Use Tailwind styling, TypeScript types.`,

    ecommerce: `# E-commerce Store - FT Design System

Build online store with:

**Product Catalog**: Grid layout, product cards with Badge (sale/new), Button (add to cart)
**Filters**: Dropdown (categories), Input (search), Checkbox (brands)
**Cart**: Item list, quantity controls, checkout Button
**Product Page**: Images, info, reviews, actions

Components:
- Button (cart, checkout, actions)
- Badge (sale, stock status)
- Input (search, quantity)
- Dropdown (sorting, filters)
- Checkbox (filter options)
- Typography (product info)

Features:
- Mobile-first responsive
- Cart state management
- Product filtering
- Form validation
- Loading states

Mock products: name, price, image, rating, category, inStock.`,

    forms: `# Advanced Forms - FT Design System

Build form collection:

**Contact Form**: Name, email, message Input, subject Dropdown
**Registration**: Personal info, preferences with Checkbox/Switch
**Settings**: Profile, notifications Switch, payment info

Components:
- Input (text, email, tel, password)
- Checkbox (agreements, multi-select)
- RadioGroup (single selections)
- Switch (toggles)
- DatePicker (dates)
- Button (submit, cancel)
- UploadZone (file attachments)

Features:
- Real-time validation
- Error states
- Loading feedback
- Responsive layout
- TypeScript types
- Accessibility

Use React Hook Form for state management.`,

    migration: `# Project Migration - FT Design System

Migrate existing project to FT Design System:

**Current**: [Describe current UI library/components]

**Migration Plan**:
1. Install ft-design-system, configure Tailwind
2. Map components: buttons→Button, inputs→Input, tables→Table
3. Update imports, props, styling
4. Test functionality, responsive behavior
5. Remove old dependencies

**Component Mapping**:
- Custom buttons → Button (variants: primary, secondary, destructive)
- Form inputs → Input, Checkbox, RadioGroup, Switch
- Data tables → Table (sorting, selection)
- Navigation → Tabs
- Status indicators → Badge

**Requirements**:
- Maintain existing functionality
- Preserve styling/branding
- Ensure backward compatibility
- Update TypeScript types

Provide step-by-step migration with code examples.`,

    testing: `# Testing Strategy - FT Design System

Create comprehensive testing for FT components:

**Component Tests**:
- Button: clicks, variants, disabled states
- Input: validation, error states, value changes
- Table: sorting, selection, pagination
- Forms: submission, validation flows

**Integration Tests**:
- Complete user workflows
- Form submission flows
- Navigation between pages
- CRUD operations

**Accessibility Tests**:
- Keyboard navigation
- Screen reader support
- Focus management
- ARIA compliance

**Tools**:
- Jest + React Testing Library
- Cypress/Playwright (E2E)
- axe-core (accessibility)
- Storybook (visual testing)

**Best Practices**:
- Test user interactions, not implementation
- Use semantic queries
- Mock external dependencies
- Test error states
- Maintain >80% coverage

Include setup instructions and test examples.`
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          General AI Prompts
        </h1>
        <p className="text-gray-600">
          Universal prompts that work with any AI tool for FT Design System projects
        </p>
      </div>

      {Object.entries(prompts).map(([key, prompt]) => (
        <div key={key} className="bg-white border rounded-lg shadow-sm">
          <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900 capitalize">
              {key === 'quickStart' ? 'Quick Start Guide' : 
               key === 'dashboard' ? 'Dashboard Application' :
               key === 'ecommerce' ? 'E-commerce Store' :
               key === 'forms' ? 'Advanced Forms' :
               key === 'migration' ? 'Project Migration' :
               'Testing Strategy'}
            </h2>
            <button
              onClick={() => copyToClipboard(prompt)}
              className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
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

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-2">📋 How to Use These Prompts</h3>
        <ul className="text-gray-700 text-sm space-y-1">
          <li>• Copy the entire prompt including code examples</li>
          <li>• Customize the requirements section for your specific needs</li>
          <li>• Add your project details where indicated</li>
          <li>• Works with ChatGPT, Claude, Gemini, and other AI tools</li>
          <li>• Combine prompts for more complex requirements</li>
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
        component: 'Universal AI prompts that work with any AI tool for FT Design System projects.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPrompts: Story = {}; 