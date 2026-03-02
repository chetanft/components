import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input, InputLabel, InputField, InputHelper, InputError, InputWarning, InputSuccess } from '../components/atoms/Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Composable input component with support for labels, helper text, error/warning/success states, and icons. Use InputLabel, InputField, InputHelper, InputError, InputWarning, InputSuccess sub-components for flexible composition.',
      },
    },
    explorer: {
      mode: 'matrix' as const,
      behavior: 'inline' as const,
      previewMode: 'inline' as const,
      baseStory: 'ExplorerBase',
      rows: [
        {
          id: 'style',
          label: 'Style',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: { variant: 'default' } },
            { id: 'filled', label: 'Filled', story: 'ExplorerBase', args: { variant: 'filled' } },
            { id: 'outlined', label: 'Outlined', story: 'ExplorerBase', args: { variant: 'outlined' } },
          ],
        },
        {
          id: 'content',
          label: 'Content',
          scenarios: [
            { id: 'default', label: 'Basic', story: 'ExplorerBase', args: { explorerContent: 'basic' } },
            { id: 'icons', label: 'With Icons', story: 'ExplorerBase', args: { explorerContent: 'icons' } },
          ],
        },
        {
          id: 'state',
          label: 'State',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: { explorerState: 'default' } },
            { id: 'error', label: 'Error', story: 'ExplorerBase', args: { explorerState: 'error' } },
            { id: 'warning', label: 'Warning', story: 'ExplorerBase', args: { explorerState: 'warning' } },
            { id: 'success', label: 'Success', story: 'ExplorerBase', args: { explorerState: 'success' } },
            { id: 'disabled', label: 'Disabled', story: 'ExplorerBase', args: { explorerState: 'disabled' } },
          ],
        },
      ],
      defaultRowId: 'style',
      defaultScenarioId: 'default',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'filled', 'outlined'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

type ExplorerInputState = 'default' | 'error' | 'warning' | 'success' | 'disabled';
type ExplorerInputContent = 'basic' | 'icons';

export const ExplorerBase: Story = {
  args: {
    variant: 'default',
    explorerState: 'default' as ExplorerInputState,
    explorerContent: 'basic' as ExplorerInputContent,
  } as any,
  render: (args: any) => {
    const variant = (args.variant ?? 'default') as 'default' | 'filled' | 'outlined';
    const explorerState = (args.explorerState ?? 'default') as ExplorerInputState;
    const explorerContent = (args.explorerContent ?? 'basic') as ExplorerInputContent;
    const disabled = explorerState === 'disabled';

    const error = explorerState === 'error' ? 'Please enter a valid email address' : undefined;
    const warning = explorerState === 'warning' ? 'Please verify your email address' : undefined;
    const success = explorerState === 'success' ? 'Email is valid' : undefined;

    return (
      <div className="w-[320px]">
        <Input size="md" variant={variant} disabled={disabled} error={error} warning={warning} success={success}>
          <InputLabel mandatory>Email Address</InputLabel>
          <InputField
            type="email"
            defaultValue={explorerState === 'success' ? 'user@example.com' : explorerState === 'warning' ? 'user@example' : ''}
            placeholder={disabled ? 'Disabled input' : 'Enter your email'}
            disabled={disabled}
            leadingIcon={explorerContent === 'icons' ? 'search' : undefined}
          />
          {error && <InputError>{error}</InputError>}
          {warning && <InputWarning>{warning}</InputWarning>}
          {success && <InputSuccess>{success}</InputSuccess>}
          {explorerState === 'default' && <InputHelper>We'll never share your email</InputHelper>}
        </Input>
      </div>
    );
  },
};

// Composable API Examples
function ComposableBasicComponent() {
  const [value, setValue] = React.useState('');
  return (
    <Input size="md" variant="default">
      <InputLabel mandatory>Email Address</InputLabel>
      <InputField 
        type="email" 
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter your email"
      />
      <InputHelper>We'll never share your email</InputHelper>
    </Input>
  );
}

export const Default: Story = {
  render: () => <ComposableBasicComponent />,
};

function ComposableWithErrorComponent() {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    if (val && !val.includes('@')) {
      setError('Please enter a valid email address');
    } else {
      setError('');
    }
  };
  
  return (
    <Input size="md" variant="default" error={error}>
      <InputLabel mandatory>Email Address</InputLabel>
      <InputField 
        type="email" 
        value={value}
        onChange={handleChange}
        placeholder="Enter your email"
      />
      {error && <InputError>{error}</InputError>}
    </Input>
  );
}

export const WithError: Story = {
  render: () => <ComposableWithErrorComponent />,
};

function ComposableWithIconsComponent() {
  const [value, setValue] = React.useState('');
  return (
    <Input size="md" variant="default">
      <InputLabel>Search</InputLabel>
      <InputField 
        type="text" 
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search..."
        leadingIcon="search"
      />
    </Input>
  );
}

export const WithIcons: Story = {
  render: () => <ComposableWithIconsComponent />,
};

function ComposableWithSuccessComponent() {
  const [value, setValue] = React.useState('user@example.com');
  return (
    <Input size="md" variant="default" success="Email is valid">
      <InputLabel>Email Address</InputLabel>
      <InputField 
        type="email" 
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter your email"
      />
      <InputSuccess>Email is valid</InputSuccess>
    </Input>
  );
}

export const WithSuccess: Story = {
  render: () => <ComposableWithSuccessComponent />,
};

function ComposableWithWarningComponent() {
  const [value, setValue] = React.useState('user@example');
  return (
    <Input size="md" variant="default" warning="Please verify your email address">
      <InputLabel>Email Address</InputLabel>
      <InputField 
        type="email" 
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter your email"
      />
      <InputWarning>Please verify your email address</InputWarning>
    </Input>
  );
}

export const WithWarning: Story = {
  render: () => <ComposableWithWarningComponent />,
};

function ComposableFilledComponent() {
  const [value, setValue] = React.useState('');
  return (
    <Input size="md" variant="filled">
      <InputLabel>Email Address</InputLabel>
      <InputField
        type="email"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter your email"
      />
    </Input>
  );
}

export const Filled: Story = {
  render: () => <ComposableFilledComponent />,
};

function ComposableOutlinedComponent() {
  const [value, setValue] = React.useState('');
  return (
    <Input size="md" variant="outlined">
      <InputLabel>Email Address</InputLabel>
      <InputField
        type="email"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter your email"
      />
    </Input>
  );
}

export const Outlined: Story = {
  render: () => <ComposableOutlinedComponent />,
};

function ComposableDisabledComponent() {
  return (
    <Input size="md" variant="default" disabled>
      <InputLabel>Email Address</InputLabel>
      <InputField type="email" placeholder="Disabled input" disabled />
    </Input>
  );
}

export const Disabled: Story = {
  render: () => <ComposableDisabledComponent />,
};

export function DocsVariants() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <p className="text-sm font-medium text-[var(--secondary)] mb-2">Default Variant</p>
        <Input size="md" variant="default">
          <InputLabel>Default</InputLabel>
          <InputField placeholder="Enter value" />
        </Input>
      </div>
      <div>
        <p className="text-sm font-medium text-[var(--secondary)] mb-2">Filled Variant</p>
        <Input size="md" variant="filled">
          <InputLabel>Filled</InputLabel>
          <InputField placeholder="Enter value" />
        </Input>
      </div>
      <div>
        <p className="text-sm font-medium text-[var(--secondary)] mb-2">Outlined Variant</p>
        <Input size="md" variant="outlined">
          <InputLabel>Outlined</InputLabel>
          <InputField placeholder="Enter value" />
        </Input>
      </div>
    </div>
  );
}

export function DocsStates() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <p className="text-sm font-medium text-[var(--secondary)] mb-2">Normal</p>
        <Input size="md" variant="default">
          <InputLabel>Email</InputLabel>
          <InputField placeholder="Enter email" />
          <InputHelper>We will not share your email</InputHelper>
        </Input>
      </div>
      <div>
        <p className="text-sm font-medium text-[var(--secondary)] mb-2">Error</p>
        <Input size="md" variant="default" error="Invalid email address">
          <InputLabel mandatory>Email</InputLabel>
          <InputField placeholder="Enter email" />
          <InputError>Invalid email address</InputError>
        </Input>
      </div>
      <div>
        <p className="text-sm font-medium text-[var(--secondary)] mb-2">Warning</p>
        <Input size="md" variant="default" warning="Please verify">
          <InputLabel>Email</InputLabel>
          <InputField placeholder="Enter email" />
          <InputWarning>Please verify your email</InputWarning>
        </Input>
      </div>
      <div>
        <p className="text-sm font-medium text-[var(--secondary)] mb-2">Success</p>
        <Input size="md" variant="default" success="Valid">
          <InputLabel>Email</InputLabel>
          <InputField placeholder="Enter email" />
          <InputSuccess>Email is valid</InputSuccess>
        </Input>
      </div>
      <div>
        <p className="text-sm font-medium text-[var(--secondary)] mb-2">Disabled</p>
        <Input size="md" variant="default" disabled>
          <InputLabel>Email</InputLabel>
          <InputField placeholder="Cannot type here" />
        </Input>
      </div>
    </div>
  );
}
