import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { RadioGroup } from './RadioGroup';

const meta = {
  title: 'Atoms/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A radio button group component with support for horizontal and vertical layouts, different sizes, and disabled options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Name attribute for the radio group'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
      description: 'Size of the radio buttons'
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation'
    },
    value: {
      control: 'text',
      description: 'Controlled value'
    },
    defaultValue: {
      control: 'text',
      description: 'Default selected value'
    }
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const sampleOptionsWithDisabled = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
  { value: 'xlarge', label: 'Extra Large', disabled: true },
];

// Default radio group
export const Default: Story = {
  args: {
    name: 'default-radio',
    options: sampleOptions,
    defaultValue: 'option1',
    size: 'md',
    orientation: 'vertical',
  },
};

// Small size
export const Small: Story = {
  args: {
    name: 'small-radio',
    options: sampleOptions,
    size: 'sm',
    orientation: 'vertical',
  },
};

// Horizontal layout
export const Horizontal: Story = {
  args: {
    name: 'horizontal-radio',
    options: sampleOptions,
    orientation: 'horizontal',
    size: 'md',
  },
};

// With disabled option
export const WithDisabled: Story = {
  args: {
    name: 'disabled-radio',
    options: sampleOptionsWithDisabled,
    defaultValue: 'medium',
    size: 'md',
    orientation: 'vertical',
  },
};

// Controlled
export const Controlled: Story = {
  args: {
    name: 'controlled-radio',
    options: sampleOptions,
    value: 'option2',
    size: 'md',
    orientation: 'vertical',
  },
};

// All states showcase
export const AllStates: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="font-semibold mb-4">Vertical Layout (Default)</h3>
        <RadioGroup
          name="vertical-example"
          options={[
            { value: 'free', label: 'Free Plan' },
            { value: 'pro', label: 'Pro Plan' },
            { value: 'enterprise', label: 'Enterprise Plan' },
          ]}
          defaultValue="pro"
          size="md"
          orientation="vertical"
        />
      </div>
      
      <div>
        <h3 className="font-semibold mb-4">Horizontal Layout</h3>
        <RadioGroup
          name="horizontal-example"
          options={[
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
            { value: 'maybe', label: 'Maybe' },
          ]}
          defaultValue="yes"
          size="md"
          orientation="horizontal"
        />
      </div>
      
      <div>
        <h3 className="font-semibold mb-4">Small Size</h3>
        <RadioGroup
          name="small-example"
          options={[
            { value: 'xs', label: 'Extra Small' },
            { value: 's', label: 'Small' },
            { value: 'm', label: 'Medium' },
            { value: 'l', label: 'Large' },
          ]}
          defaultValue="m"
          size="sm"
          orientation="vertical"
        />
      </div>
      
      <div>
        <h3 className="font-semibold mb-4">With Disabled Options</h3>
        <RadioGroup
          name="disabled-example"
          options={[
            { value: 'available', label: 'Available Option' },
            { value: 'selected', label: 'Selected Option' },
            { value: 'disabled1', label: 'Disabled Option', disabled: true },
            { value: 'disabled2', label: 'Another Disabled Option', disabled: true },
          ]}
          defaultValue="selected"
          size="md"
          orientation="vertical"
        />
      </div>
      
      <div>
        <h3 className="font-semibold mb-4">Payment Methods Example</h3>
        <RadioGroup
          name="payment-example"
          options={[
            { value: 'credit', label: 'Credit Card' },
            { value: 'paypal', label: 'PayPal' },
            { value: 'bank', label: 'Bank Transfer' },
            { value: 'crypto', label: 'Cryptocurrency', disabled: true },
          ]}
          defaultValue="credit"
          size="md"
          orientation="vertical"
        />
      </div>
    </div>
  ),
};
