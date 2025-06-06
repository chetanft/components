import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const AugmentCodePrompts = () => {
  const prompts = {
    setup: `# Augment Code + FT Design System

Setup React project with FT Design System:

\`\`\`bash
npm install ft-design-system
npm install -D tailwindcss postcss autoprefixer @types/react @types/react-dom
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

Import styles:
\`\`\`tsx
import 'ft-design-system/dist/styles.css';
import { Button, Input, Badge, Table, Checkbox, RadioGroup, Switch, DatePicker, Dropdown, Tabs, Typography, ProgressBar, Collapsible, FileCard, FileThumbnail, UploadZone } from 'ft-design-system';
\`\`\`

Available: All form controls, data display, navigation, file handling, 190+ icons.

Build modern, accessible React apps with TypeScript, proper error handling, and best practices.`,

    components: `# Component Development - Augment Code

Build reusable components with FT Design System:

**Composite Components**:
\`\`\`tsx
// SearchWithStatus
import { Input, Button, Badge } from 'ft-design-system';
export const SearchWithStatus = ({ onSearch, placeholder, status, resultCount }) => {
  const [query, setQuery] = useState('');
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={placeholder} className="flex-1" />
        <Button variant="primary" onClick={() => onSearch(query)}>Search</Button>
      </div>
      {status && (
        <div className="flex items-center gap-2">
          <Badge variant={status === 'success' ? 'success' : 'error'}>{status}</Badge>
          {resultCount !== undefined && <span className="text-sm text-gray-600">{resultCount} results</span>}
        </div>
      )}
    </div>
  );
};
\`\`\`

**Form Components**:
\`\`\`tsx
import { Input, Button, Checkbox, RadioGroup, DatePicker } from 'ft-design-system';
import { useForm, Controller } from 'react-hook-form';

export const UserRegistrationForm = ({ onSubmit }) => {
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm();
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input {...register('firstName', { required: 'Required' })} label="First Name" error={errors.firstName?.message} />
      <Input {...register('email', { required: 'Required', pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} type="email" label="Email" error={errors.email?.message} />
      <Controller name="birthDate" control={control} rules={{ required: 'Required' }} render={({ field }) => <DatePicker {...field} label="Birth Date" error={errors.birthDate?.message} />} />
      <Button type="submit" variant="primary" loading={isSubmitting} className="w-full">Create Account</Button>
    </form>
  );
};
\`\`\`

**Data Display**:
\`\`\`tsx
import { Table, Badge, Button, Input } from 'ft-design-system';

export const UserManagementTable = ({ users, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  
  const columns = [
    { key: 'name', header: 'Name', sortable: true, render: (value, row) => (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">{value.charAt(0).toUpperCase()}</div>
        <span className="font-medium">{value}</span>
      </div>
    )},
    { key: 'email', header: 'Email', sortable: true },
    { key: 'status', header: 'Status', render: (value) => <Badge variant={value === 'active' ? 'success' : 'error'}>{value}</Badge> },
    { key: 'actions', header: 'Actions', render: (_, row) => (
      <div className="flex gap-2">
        <Button size="sm" variant="secondary" onClick={() => onEdit(row.id)}>Edit</Button>
        <Button size="sm" variant="destructive" onClick={() => onDelete(row.id)}>Delete</Button>
      </div>
    )}
  ];
  
  return (
    <div className="space-y-4">
      <Input placeholder="Search users..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="max-w-sm" />
      <Table data={users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()))} columns={columns} selectable onSelectionChange={setSelectedUsers} />
    </div>
  );
};
\`\`\`

Build robust, reusable components with proper TypeScript types and testing.`,

    optimization: `# Performance Optimization - Augment Code

Optimize React apps with FT Design System:

**Component Memoization**:
\`\`\`tsx
import React, { memo, useMemo, useCallback } from 'react';
import { Table, Button, Badge } from 'ft-design-system';

const UserTableRow = memo(({ user, onEdit, onDelete }) => {
  const handleEdit = useCallback(() => onEdit(user.id), [user.id, onEdit]);
  const handleDelete = useCallback(() => onDelete(user.id), [user.id, onDelete]);
  
  return (
    <tr>
      <td>{user.name}</td>
      <td><Badge variant={user.status === 'active' ? 'success' : 'error'}>{user.status}</Badge></td>
      <td>
        <Button size="sm" onClick={handleEdit}>Edit</Button>
        <Button size="sm" variant="destructive" onClick={handleDelete}>Delete</Button>
      </td>
    </tr>
  );
});

export const OptimizedUserTable = ({ users, onEdit, onDelete }) => {
  const memoizedUsers = useMemo(() => users.map(user => ({ ...user, key: user.id })), [users]);
  return (
    <Table>
      <tbody>
        {memoizedUsers.map(user => <UserTableRow key={user.id} user={user} onEdit={onEdit} onDelete={onDelete} />)}
      </tbody>
    </Table>
  );
};
\`\`\`

**Virtual Scrolling**:
\`\`\`tsx
import { FixedSizeList as List } from 'react-window';
import { FileCard } from 'ft-design-system';

const VirtualizedFileList = ({ files }) => {
  const Row = ({ index, style }) => (
    <div style={style}>
      <FileCard file={files[index]} onSelect={() => handleFileSelect(files[index])} className="m-2" />
    </div>
  );
  return <List height={600} itemCount={files.length} itemSize={120} width="100%">{Row}</List>;
};
\`\`\`

**Lazy Loading**:
\`\`\`tsx
import { lazy, Suspense } from 'react';
import { ProgressBar } from 'ft-design-system';

const HeavyDataTable = lazy(() => import('./HeavyDataTable'));
export const Dashboard = () => (
  <Suspense fallback={<ProgressBar value={50} />}>
    <HeavyDataTable />
  </Suspense>
);
\`\`\`

**Bundle Optimization**:
\`\`\`tsx
// ✅ Import only needed components
import { Button, Input, Table } from 'ft-design-system';
// ✅ Import specific icons
import { ChevronDownIcon, UserIcon } from 'ft-design-system';
\`\`\`

**Performance Monitoring**:
\`\`\`tsx
import { Profiler } from 'react';
const onRenderCallback = (id, phase, actualDuration) => console.log('Component:', id, 'Duration:', actualDuration);
export const MonitoredComponent = ({ children }) => <Profiler id="UserTable" onRender={onRenderCallback}>{children}</Profiler>;
\`\`\`

Build high-performance apps with optimized FT component usage.`,

    accessibility: `# Accessibility Implementation - Augment Code

Build accessible apps with FT Design System:

**Semantic HTML & ARIA**:
\`\`\`tsx
import { Button, Input, Table, Badge } from 'ft-design-system';

export const AccessibleUserForm = () => {
  const [errors, setErrors] = useState({});
  return (
    <form role="form" aria-labelledby="form-title">
      <h2 id="form-title">User Registration</h2>
      <fieldset>
        <legend>Personal Information</legend>
        <Input id="firstName" label="First Name" required aria-describedby={errors.firstName ? "firstName-error" : undefined} error={errors.firstName} />
        {errors.firstName && <div id="firstName-error" role="alert" aria-live="polite">{errors.firstName}</div>}
        <Input id="email" type="email" label="Email" required aria-describedby="email-help" />
        <div id="email-help" className="text-sm text-gray-600">We'll never share your email.</div>
      </fieldset>
      <Button type="submit" variant="primary" aria-describedby="submit-help">Create Account</Button>
    </form>
  );
};
\`\`\`

**Keyboard Navigation**:
\`\`\`tsx
export const AccessibleDropdown = ({ items, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  
  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowDown': event.preventDefault(); setFocusedIndex(prev => prev < items.length - 1 ? prev + 1 : 0); break;
      case 'ArrowUp': event.preventDefault(); setFocusedIndex(prev => prev > 0 ? prev - 1 : items.length - 1); break;
      case 'Enter': case ' ': event.preventDefault(); if (focusedIndex >= 0) { onSelect(items[focusedIndex]); setIsOpen(false); } break;
      case 'Escape': setIsOpen(false); break;
    }
  };
  
  return (
    <div className="relative">
      <Button onClick={() => setIsOpen(!isOpen)} onKeyDown={handleKeyDown} aria-expanded={isOpen} aria-haspopup="menu">Select Option</Button>
      {isOpen && (
        <ul role="menu" onKeyDown={handleKeyDown}>
          {items.map((item, index) => (
            <li key={item.id} role="menuitem" className={index === focusedIndex ? 'bg-blue-100' : ''} onClick={() => onSelect(item)}>{item.label}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
\`\`\`

**Screen Reader Support**:
\`\`\`tsx
export const AccessibleDataTable = ({ users }) => (
  <div>
    <h2 id="users-table-title">Users Management</h2>
    <Table aria-labelledby="users-table-title" role="table">
      <thead>
        <tr role="row">
          <th role="columnheader" aria-sort="none">Name</th>
          <th role="columnheader">Status</th>
          <th role="columnheader">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id} role="row">
            <td role="gridcell" aria-label={\`User name: \${user.name}\`}>{user.name}</td>
            <td role="gridcell"><Badge aria-label={\`Status: \${user.status}\`}>{user.status}</Badge></td>
            <td role="gridcell">
              <Button aria-label={\`Edit user \${user.name}\`}>Edit</Button>
              <Button variant="destructive" aria-label={\`Delete user \${user.name}\`}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);
\`\`\`

**Focus Management**:
\`\`\`tsx
export const AccessibleModal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);
  
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      modalRef.current?.focus();
      
      const handleKeyDown = (event) => {
        if (event.key === 'Escape') onClose();
        if (event.key === 'Tab') {
          const focusableElements = modalRef.current?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];
          if (event.shiftKey && document.activeElement === firstElement) { event.preventDefault(); lastElement.focus(); }
          else if (!event.shiftKey && document.activeElement === lastElement) { event.preventDefault(); firstElement.focus(); }
        }
      };
      
      document.addEventListener('keydown', handleKeyDown);
      return () => { document.removeEventListener('keydown', handleKeyDown); previousFocusRef.current?.focus(); };
    }
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div ref={modalRef} className="bg-white rounded-lg p-6 max-w-md w-full mx-4" tabIndex={-1}>
        <h2 id="modal-title">{title}</h2>
        {children}
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  );
};
\`\`\`

**Accessibility Testing**:
\`\`\`tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

test('should not have accessibility violations', async () => {
  const { container } = render(<AccessibleUserForm />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
\`\`\`

Build inclusive applications with comprehensive accessibility support.`
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Augment Code AI Prompts
        </h1>
        <p className="text-gray-600">
          Copy these prompts to use the FT Design System in your Augment Code projects
        </p>
      </div>

      {Object.entries(prompts).map(([key, prompt]) => (
        <div key={key} className="bg-white border rounded-lg shadow-sm">
          <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900 capitalize">
              {key === 'setup' ? 'Project Setup' : 
               key === 'components' ? 'Component Development' :
               key === 'optimization' ? 'Performance Optimization' :
               'Accessibility Implementation'}
            </h2>
            <button
              onClick={() => copyToClipboard(prompt)}
              className="px-3 py-1 bg-orange-600 text-white text-sm rounded hover:bg-orange-700 transition-colors"
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

      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <h3 className="font-semibold text-orange-900 mb-2">🔧 Augment Code Tips</h3>
        <ul className="text-orange-800 text-sm space-y-1">
          <li>• Focus on code quality and best practices</li>
          <li>• Implement comprehensive testing strategies</li>
          <li>• Optimize for performance and accessibility</li>
          <li>• Use TypeScript for better development experience</li>
          <li>• Follow React patterns and conventions</li>
        </ul>
      </div>
    </div>
  );
};

const meta: Meta<typeof AugmentCodePrompts> = {
  title: 'AI Prompts/Augment Code',
  component: AugmentCodePrompts,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Professional AI prompts for Augment Code development using the FT Design System.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPrompts: Story = {}; 