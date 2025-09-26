import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible checkbox component with support for labels, descriptions, error states, and indeterminate state.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the checkbox'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
      description: 'Size of the checkbox'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled'
    },
    error: {
      control: 'boolean',
      description: 'Whether the checkbox is in error state'
    },
    indeterminate: {
      control: 'boolean',
      description: 'Whether the checkbox is in indeterminate state'
    },
    description: {
      control: 'text',
      description: 'Additional description text below the checkbox'
    },
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked'
    }
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default checkbox
export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
    size: 'md',
  },
};

// Small size
export const Small: Story = {
  args: {
    label: 'Small checkbox',
    size: 'sm',
  },
};

// Checked state
export const Checked: Story = {
  args: {
    label: 'Checked checkbox',
    checked: true,
    size: 'md',
  },
};

// Indeterminate state
export const Indeterminate: Story = {
  args: {
    label: 'Indeterminate checkbox',
    indeterminate: true,
    size: 'md',
  },
};

// With description
export const WithDescription: Story = {
  args: {
    label: 'Checkbox with description',
    description: 'This is additional information about the checkbox option',
    size: 'md',
  },
};

// Error state
export const Error: Story = {
  args: {
    label: 'Checkbox with error',
    error: true,
    description: 'This field is required',
    size: 'md',
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    disabled: true,
    size: 'md',
  },
};

// Disabled and checked
export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked checkbox',
    disabled: true,
    checked: true,
    size: 'md',
  },
};

// All states showcase
export const AllStates: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="font-semibold">Normal States</h3>
        <Checkbox label="Unchecked" />
        <Checkbox label="Checked" checked />
        <Checkbox label="Indeterminate" indeterminate />
      </div>
      
      <div className="space-y-2">
        <h3 className="font-semibold">With Descriptions</h3>
        <Checkbox 
          label="Newsletter subscription" 
          description="Receive weekly updates about new features and products"
        />
        <Checkbox 
          label="Marketing emails" 
          description="Get promotional offers and special discounts"
          checked
        />
      </div>
      
      <div className="space-y-2">
        <h3 className="font-semibold">Error State</h3>
        <Checkbox 
          label="Required field" 
          error
          description="This field must be checked to continue"
        />
      </div>
      
      <div className="space-y-2">
        <h3 className="font-semibold">Disabled States</h3>
        <Checkbox label="Disabled unchecked" disabled />
        <Checkbox label="Disabled checked" disabled checked />
      </div>
      
      <div className="space-y-2">
        <h3 className="font-semibold">Sizes</h3>
        <Checkbox label="Small checkbox" size="sm" />
        <Checkbox label="Medium checkbox" size="md" />
      </div>
    </div>
  ),
};
