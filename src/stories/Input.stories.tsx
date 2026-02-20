import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input, InputLabel, InputField, InputHelper, InputError, InputWarning, InputSuccess } from '../components/atoms/Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'padded',
  },
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

/** @deprecated Use composable API instead. */
export const LegacyDefault: Story = {
  args: {
    label: 'Input Label',
    placeholder: 'Enter value',
    size: 'md',
    variant: 'default',
  },
};

/** @deprecated Use composable API instead. */
export function LegacyInteractiveDemo() {
  const [normalValue, setNormalValue] = React.useState('');
  const [errorValue, setErrorValue] = React.useState('');
  const [warningValue, setWarningValue] = React.useState('');
  const [successValue, setSuccessValue] = React.useState('');

  return (
    <div className="p-6 space-y-4">
      <h3 className="text-lg font-semibold mb-4">All Input Variants - Interactive</h3>
      
      <div className="space-y-4">
        <Input 
          label="Normal Input" 
          placeholder="Type here..."
          size="md" 
          variant="default"
          value={normalValue}
          onChange={(e) => setNormalValue(e.target.value)}
        />
        
        <Input 
          label="Error State" 
          placeholder="Type here..."
          size="md" 
          variant="default"
          error="This field has an error"
          value={errorValue}
          onChange={(e) => setErrorValue(e.target.value)}
        />
        
        <Input 
          label="Warning State" 
          placeholder="Type here..."
          size="md" 
          variant="default"
          warning="Please review your input"
          value={warningValue}
          onChange={(e) => setWarningValue(e.target.value)}
        />
        
        <Input 
          label="Success State" 
          placeholder="Type here..."
          size="md" 
          variant="default"
          success="Input is valid"
          value={successValue}
          onChange={(e) => setSuccessValue(e.target.value)}
        />
        
        <Input 
          label="Disabled Input" 
          placeholder="Cannot type here"
          size="md" 
          variant="default"
          disabled
        />
        
        <Input 
          label="Filled Variant" 
          placeholder="Type here..."
          size="md" 
          variant="filled"
          value={normalValue}
          onChange={(e) => setNormalValue(e.target.value)}
        />
        
        <Input 
          label="Outlined Variant" 
          placeholder="Type here..."
          size="md" 
          variant="outlined"
          value={normalValue}
          onChange={(e) => setNormalValue(e.target.value)}
        />
      </div>
    </div>
  );
}

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

/** @deprecated Use composable API instead. */
export const LegacyFilled: Story = {
  args: {
    label: 'Filled Input',
    placeholder: 'Enter value',
    size: 'md',
    variant: 'filled',
    defaultValue: 'Pre-filled value',
  },
};

/** @deprecated Use composable API instead. */
export const LegacyError: Story = {
  args: {
    label: 'Input with Error',
    placeholder: 'Enter value',
    size: 'md',
    variant: 'default',
    error: 'This field has an error',
  },
};

/** @deprecated Use composable API instead. */
export const LegacyWarning: Story = {
  args: {
    label: 'Input with Warning',
    placeholder: 'Enter value',
    size: 'md',
    variant: 'default',
    warning: 'Please review your input',
  },
};

/** @deprecated Use composable API instead. */
export const LegacySuccess: Story = {
  args: {
    label: 'Input with Success',
    placeholder: 'Enter value',
    size: 'md',
    variant: 'default',
    success: 'Input is valid',
  },
};

/** @deprecated Use composable API instead. */
export const LegacyDisabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'Cannot type here',
    size: 'md',
    variant: 'default',
    disabled: true,
  },
};

/** @deprecated Use composable API instead. */
export function LegacySizes() {
  const sizes: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'> = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
  
  return (
    <div className="p-6 space-y-4">
      {sizes.map(size => (
        <div key={size}>
          <Input label={`Size: ${size.toUpperCase()}`} placeholder="Value" size={size} variant="default" />
        </div>
      ))}
    </div>
  );
}

/** @deprecated Use composable API instead. */
export function LegacyStates() {
  return (
    <div className="p-6 space-y-3">
      <Input label="Normal" placeholder="Value" size="md" variant="default" />
      <Input label="Error" placeholder="Value" size="md" variant="default" error="Error message" />
      <Input label="Warning" placeholder="Value" size="md" variant="default" warning="Warning message" />
      <Input label="Success" placeholder="Value" size="md" variant="default" success="Success message" />
      <Input label="Disabled" placeholder="Value" size="md" variant="default" disabled />
      <Input label="Prefilled" placeholder="Value" size="md" variant="default" defaultValue="Pre-filled value" />
    </div>
  );
}

