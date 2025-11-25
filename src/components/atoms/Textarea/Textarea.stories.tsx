import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Atoms/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A textarea component with support for labels, error states, and different sizes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the textarea'
    },
    size: {
      control: { type: 'select' },
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Size of the textarea'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled'
    },
    error: {
      control: 'text',
      description: 'Error message to display'
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display'
    },
    rows: {
      control: 'number',
      description: 'Number of rows'
    }
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default textarea
export const Default: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter your description here...',
    size: 'md',
    rows: 4,
  },
};

// Normal States story - separate preview for normal states
export function NormalStates() {
  return (
    <div className="p-6 space-y-4">
      <Textarea 
        label="Normal textarea" 
        placeholder="Type here..."
        size="md"
      />
      <Textarea 
        label="With helper text" 
        placeholder="Type here..."
        helperText="This is helper text"
        size="md"
      />
    </div>
  );
}

// Error State story - separate preview for error state
export function ErrorState() {
  return (
    <div className="p-6">
      <Textarea 
        label="Textarea with error" 
        placeholder="Type here..."
        error="This field has an error"
        size="md"
      />
    </div>
  );
}

// Disabled States story - separate preview for disabled states
export function DisabledStates() {
  return (
    <div className="p-6 space-y-4">
      <Textarea 
        label="Disabled textarea" 
        placeholder="Cannot type here"
        disabled
        size="md"
      />
    </div>
  );
}

// Sizes story - separate preview for sizes
export function Sizes() {
  return (
    <div className="p-6 space-y-4">
      <Textarea label="Small" size="sm" placeholder="Small textarea" />
      <Textarea label="Medium" size="md" placeholder="Medium textarea" />
      <Textarea label="Large" size="lg" placeholder="Large textarea" />
    </div>
  );
}

// Interactive Demo - all variants shown together and interactable
export function InteractiveDemo() {
  const [normalValue, setNormalValue] = React.useState('');
  const [errorValue, setErrorValue] = React.useState('');
  const [helperValue, setHelperValue] = React.useState('');

  return (
    <div className="p-6 space-y-4">
      <h3 className="text-lg font-semibold mb-4">All Textarea Variants - Interactive</h3>
      
      <div className="space-y-4">
        <Textarea 
          label="Normal Textarea" 
          placeholder="Type here..."
          size="md"
          value={normalValue}
          onChange={(e) => setNormalValue(e.target.value)}
        />
        
        <Textarea 
          label="With Helper Text" 
          placeholder="Type here..."
          helperText="This is helper text"
          size="md"
          value={helperValue}
          onChange={(e) => setHelperValue(e.target.value)}
        />
        
        <Textarea 
          label="Error State" 
          placeholder="Type here..."
          error="This field has an error"
          size="md"
          value={errorValue}
          onChange={(e) => setErrorValue(e.target.value)}
        />
        
        <Textarea 
          label="Disabled Textarea" 
          placeholder="Cannot type here"
          disabled
          size="md"
        />
        
        <Textarea 
          label="Small Size" 
          placeholder="Type here..."
          size="sm"
          value={normalValue}
          onChange={(e) => setNormalValue(e.target.value)}
        />
        
        <Textarea 
          label="Large Size" 
          placeholder="Type here..."
          size="lg"
          value={normalValue}
          onChange={(e) => setNormalValue(e.target.value)}
        />
      </div>
    </div>
  );
}

