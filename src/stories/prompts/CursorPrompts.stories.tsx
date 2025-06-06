import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const CursorPrompts = () => {
  const prompts = {
    setup: `# Cursor AI + FT Design System

Setup React TypeScript project:

\`\`\`bash
npx create-react-app my-app --template typescript
npm install ft-design-system
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

Configure tailwind.config.js:
\`\`\`js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/ft-design-system/**/*.{js,jsx,ts,tsx}"
  ]
}
\`\`\`

Import styles and components:
\`\`\`tsx
import 'ft-design-system/dist/styles.css';
import { Button, Input, Badge, Table, Checkbox, RadioGroup, Switch, DatePicker, Dropdown, Tabs, Typography, ProgressBar, Collapsible, FileCard, UploadZone } from 'ft-design-system';
\`\`\`

Available: All form controls, data display, navigation, file handling, 190+ icons.

Build well-structured, maintainable React app with TypeScript.`,

    refactoring: `# Code Refactoring - Cursor AI

Refactor existing components to use FT Design System:

**Strategy**:
1. Audit existing UI components
2. Map to FT equivalents
3. Update imports and props
4. Test functionality

**Component Migration**:
\`\`\`tsx
// Before: Custom button
<button className="btn btn-primary" onClick={handleClick}>Submit</button>

// After: FT Button
import { Button } from 'ft-design-system';
<Button variant="primary" onClick={handleClick}>Submit</Button>

// Before: Custom input
<input type="text" className="form-control" value={value} onChange={onChange} />

// After: FT Input
import { Input } from 'ft-design-system';
<Input value={value} onChange={onChange} placeholder="Enter text" />
\`\`\`

**Migration Checklist**:
- Update buttons → Button (variants: primary, secondary, destructive)
- Replace inputs → Input, Checkbox, RadioGroup, Switch
- Migrate tables → Table (sorting, selection)
- Update icons → FT icon library
- Replace badges → Badge component
- Test all states and interactions

Systematically refactor with proper TypeScript types.`,

    architecture: `# App Architecture - Cursor AI

Design scalable React architecture with FT Design System:

**Project Structure**:
\`\`\`
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── services/      # API and business logic
├── types/         # TypeScript definitions
└── utils/         # Utility functions
\`\`\`

**Atomic Design Pattern**:
- **Atoms**: FT components (Button, Input, Badge)
- **Molecules**: Combined components (SearchBox, FormField)
- **Organisms**: Complex sections (Header, DataTable)
- **Templates**: Page layouts
- **Pages**: Complete implementations

**Component Composition**:
\`\`\`tsx
// Molecule: SearchBox
import { Input, Button } from 'ft-design-system';
export const SearchBox = ({ onSearch, placeholder }) => (
  <div className="flex gap-2">
    <Input placeholder={placeholder} onChange={handleInputChange} />
    <Button variant="primary" onClick={onSearch}>Search</Button>
  </div>
);

// Organism: UserTable
import { Table, Badge, Button } from 'ft-design-system';
export const UserTable = ({ users, onEdit, onDelete }) => {
  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'status', header: 'Status', render: (value) => <Badge variant={getStatusVariant(value)}>{value}</Badge> },
    { key: 'actions', header: 'Actions', render: (_, row) => (
      <div className="flex gap-2">
        <Button size="sm" onClick={() => onEdit(row.id)}>Edit</Button>
        <Button size="sm" variant="destructive" onClick={() => onDelete(row.id)}>Delete</Button>
      </div>
    )}
  ];
  return <Table data={users} columns={columns} />;
};
\`\`\`

**State Management**: React Context for global state, custom hooks for complex logic, React Query for server state.

Build maintainable, scalable architecture.`,

    testing: `# Testing Strategy - Cursor AI

Implement comprehensive testing for FT components:

**Setup**:
\`\`\`bash
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom
\`\`\`

**Test Configuration** (setupTests.ts):
\`\`\`tsx
import '@testing-library/jest-dom';
import 'ft-design-system/dist/styles.css';
\`\`\`

**Component Tests**:
\`\`\`tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from 'ft-design-system';

describe('Button Component', () => {
  test('renders and handles clicks', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies correct variant styles', () => {
    render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-blue-600');
  });
});
\`\`\`

**Form Tests**:
\`\`\`tsx
import userEvent from '@testing-library/user-event';
import { Input, Checkbox } from 'ft-design-system';

test('Input handles value changes', async () => {
  const user = userEvent.setup();
  const handleChange = jest.fn();
  render(<Input onChange={handleChange} placeholder="Enter text" />);
  
  await user.type(screen.getByPlaceholderText('Enter text'), 'Hello');
  expect(handleChange).toHaveBeenCalled();
});
\`\`\`

**Best Practices**:
- Test user interactions, not implementation
- Use semantic queries (getByRole, getByLabelText)
- Test accessibility features
- Mock external dependencies
- Maintain >80% coverage

Implement comprehensive testing for reliability.`
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Cursor AI Prompts
        </h1>
        <p className="text-gray-600">
          Copy these prompts to use the FT Design System in your Cursor AI projects
        </p>
      </div>

      {Object.entries(prompts).map(([key, prompt]) => (
        <div key={key} className="bg-white border rounded-lg shadow-sm">
          <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900 capitalize">
              {key === 'setup' ? 'Project Setup' : 
               key === 'refactoring' ? 'Code Refactoring' :
               key === 'architecture' ? 'App Architecture' :
               'Testing Strategy'}
            </h2>
            <button
              onClick={() => copyToClipboard(prompt)}
              className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition-colors"
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

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h3 className="font-semibold text-purple-900 mb-2">💡 Cursor AI Tips</h3>
        <ul className="text-purple-800 text-sm space-y-1">
          <li>• Use Cursor's AI chat for component-specific questions</li>
          <li>• Leverage Cursor's code completion with FT components</li>
          <li>• Use Cursor's refactoring tools for large migrations</li>
          <li>• Ask Cursor to generate tests for your components</li>
          <li>• Use Cursor's documentation features for team knowledge</li>
        </ul>
      </div>
    </div>
  );
};

const meta: Meta<typeof CursorPrompts> = {
  title: 'AI Prompts/Cursor AI',
  component: CursorPrompts,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Specialized AI prompts for Cursor AI development using the FT Design System.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPrompts: Story = {}; 