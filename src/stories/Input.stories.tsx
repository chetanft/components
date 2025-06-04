import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../components/Input/Input';

const meta: Meta<typeof Input> = {
  title: 'Design System/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'filled'],
    },
    leadingIcon: {
      control: { type: 'select' },
      options: ['search', 'user', 'mail', 'lock', 'phone', 'location', undefined],
    },
    trailingIcon: {
      control: { type: 'select' },
      options: ['eye-invisible', 'cross', 'check', 'alert-critical', undefined],
    },
    disabled: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    error: {
      control: 'text',
    },
    helperText: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default input
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    size: 'md',
    variant: 'default',
  },
};

// With label
export const WithLabel: Story = {
  args: {
    label: 'Email address',
    placeholder: 'Enter your email...',
    type: 'email',
    size: 'md',
  },
};

// With helper text
export const WithHelperText: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password...',
    type: 'password',
    helperText: 'Must be at least 8 characters long',
    size: 'md',
  },
};

// With leading icon
export const WithLeadingIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    leadingIcon: 'search',
    size: 'md',
  },
};

// With trailing icon
export const WithTrailingIcon: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password...',
    type: 'password',
    trailingIcon: 'eye-invisible',
    size: 'md',
  },
};

// Error state
export const ErrorState: Story = {
  args: {
    label: 'Email address',
    placeholder: 'Enter your email...',
    type: 'email',
    value: 'invalid-email',
    error: 'Please enter a valid email address',
    size: 'md',
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username...',
    value: 'john.doe',
    disabled: true,
    size: 'md',
  },
};

// Filled variant
export const FilledVariant: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search products...',
    leadingIcon: 'search',
    variant: 'filled',
    size: 'md',
  },
};

// Different sizes
export const Small: Story = {
  args: {
    label: 'Small Input',
    placeholder: 'Small size...',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Input',
    placeholder: 'Large size...',
    size: 'lg',
  },
};

// All examples showcase
export const AllExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-6 w-96">
      {/* Basic Inputs */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Inputs</h3>
        <div className="flex flex-col gap-4">
          <Input 
            label="Full name"
            placeholder="Enter your full name..."
            size="md"
          />
          <Input 
            label="Email address"
            type="email"
            placeholder="Enter your email..."
            size="md"
          />
          <Input 
            label="Phone number"
            type="tel"
            placeholder="Enter your phone..."
            leadingIcon="phone"
            size="md"
          />
        </div>
      </div>
      
      {/* With Icons */}
      <div>
        <h3 className="text-lg font-semibold mb-4">With Icons</h3>
        <div className="flex flex-col gap-4">
          <Input 
            label="Search"
            placeholder="Search..."
            leadingIcon="search"
            size="md"
          />
          <Input 
            label="Password"
            type="password"
            placeholder="Enter password..."
            leadingIcon="lock"
            trailingIcon="eye-invisible"
            size="md"
          />
        </div>
      </div>
      
      {/* Sizes */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Sizes</h3>
        <div className="flex flex-col gap-4">
          <Input 
            label="Small"
            placeholder="Small input..."
            size="sm"
          />
          <Input 
            label="Medium (Default)"
            placeholder="Medium input..."
            size="md"
          />
        <Input 
            label="Large"
            placeholder="Large input..."
            size="lg"
        />
        </div>
      </div>
      
      {/* Variants */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Variants</h3>
        <div className="flex flex-col gap-4">
          <Input 
            label="Default variant"
            placeholder="Default style..."
            variant="default"
            size="md"
          />
        <Input 
            label="Filled variant"
            placeholder="Filled style..."
            variant="filled"
            leadingIcon="search"
            size="md"
        />
        </div>
      </div>
      
      {/* States */}
      <div>
        <h3 className="text-lg font-semibold mb-4">States</h3>
        <div className="flex flex-col gap-4">
          <Input 
            label="Normal state"
            placeholder="Normal input..."
            size="md"
          />
        <Input 
            label="Error state"
          placeholder="Enter email..."
            value="invalid-email"
            error="Please enter a valid email address"
            size="md"
        />
        <Input 
            label="Disabled state"
            placeholder="Disabled input..."
            value="Cannot edit this"
          disabled
            size="md"
          />
          <Input 
            label="With helper text"
            placeholder="Enter password..."
            helperText="Must be at least 8 characters long"
            size="md"
          />
        </div>
      </div>
    </div>
  ),
}; 