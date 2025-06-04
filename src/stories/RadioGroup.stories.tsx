import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { RadioGroup } from '../components/RadioGroup/RadioGroup';

const meta: Meta<typeof RadioGroup> = {
  title: 'Design System/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    name: {
      control: 'text',
    },
    defaultValue: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
  { value: 'option-1', label: 'Option 1' },
  { value: 'option-2', label: 'Option 2' },
  { value: 'option-3', label: 'Option 3' },
];

// Default RadioGroup
export const Default: Story = {
  args: {
    name: 'default-radio',
    options: defaultOptions,
    defaultValue: 'option-1',
    size: 'md',
    orientation: 'vertical',
  },
};

// Small size
export const Small: Story = {
  args: {
    name: 'small-radio',
    options: defaultOptions,
    size: 'sm',
    defaultValue: 'option-1',
  },
};

// Horizontal orientation
export const Horizontal: Story = {
  args: {
    name: 'horizontal-radio',
    options: defaultOptions,
    orientation: 'horizontal',
    defaultValue: 'option-2',
    size: 'md',
  },
};

// With some disabled options
export const WithDisabled: Story = {
  args: {
    name: 'disabled-options-radio',
    options: [
      { value: 'enabled-1', label: 'Enabled Option 1' },
      { value: 'disabled-1', label: 'Disabled Option', disabled: true },
      { value: 'enabled-2', label: 'Enabled Option 2' },
      { value: 'disabled-2', label: 'Disabled Selected', disabled: true },
    ],
    defaultValue: 'disabled-2',
    size: 'md',
  },
};

// Real-world examples
export const RealWorldExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-6 w-96">
      {/* Notification Settings */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
        <RadioGroup
          name="notifications"
          options={[
            { value: 'all', label: 'All notifications' },
            { value: 'important', label: 'Important only' },
            { value: 'none', label: 'None' },
          ]}
          defaultValue="important"
          size="md"
        />
      </div>

      {/* Theme Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Theme</h3>
        <RadioGroup
          name="theme"
          options={[
            { value: 'light', label: 'Light mode' },
            { value: 'dark', label: 'Dark mode' },
            { value: 'system', label: 'System default' },
          ]}
          defaultValue="system"
          size="md"
        />
      </div>

      {/* Payment Method */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
        <RadioGroup
          name="payment"
          options={[
            { value: 'card', label: 'Credit/Debit Card' },
            { value: 'paypal', label: 'PayPal' },
            { value: 'bank', label: 'Bank Transfer' },
            { value: 'crypto', label: 'Cryptocurrency', disabled: true },
          ]}
          defaultValue="card"
          size="md"
        />
      </div>
    </div>
  ),
};

// All states showcase
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-6">
      <h3 className="text-lg font-semibold">Radio Button States</h3>
      
      <div className="flex flex-row gap-12 items-center">
        <div className="text-center">
          <div className="mb-3 text-sm font-medium text-gray-600">Unselected</div>
          <RadioGroup
            name="showcase-unselected"
            options={[{ value: 'unselected', label: 'Unselected' }]}
            size="md"
          />
        </div>
        
        <div className="text-center">
          <div className="mb-3 text-sm font-medium text-gray-600">Selected</div>
          <RadioGroup
            name="showcase-selected"
            options={[{ value: 'selected', label: 'Selected' }]}
            value="selected"
            size="md"
          />
        </div>
        
        <div className="text-center">
          <div className="mb-3 text-sm font-medium text-gray-600">Disabled</div>
          <RadioGroup
            name="showcase-disabled"
            options={[{ value: 'disabled', label: 'Disabled', disabled: true }]}
            size="md"
          />
        </div>
        
        <div className="text-center">
          <div className="mb-3 text-sm font-medium text-gray-600">Disabled Selected</div>
          <RadioGroup
            name="showcase-disabled-selected"
            options={[{ value: 'disabled-selected', label: 'Disabled Selected', disabled: true }]}
            value="disabled-selected"
            size="md"
          />
        </div>
      </div>
    </div>
  ),
};

// Sizes comparison
export const SizesComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-6">
      <h3 className="text-lg font-semibold">Size Variations</h3>
      
      <div className="flex flex-col gap-6">
        <div>
          <h4 className="text-md font-medium mb-3">Small Size</h4>
          <RadioGroup
            name="sizes-small"
            options={[
              { value: 'sm-1', label: 'Small Option 1' },
              { value: 'sm-2', label: 'Small Option 2' },
            ]}
            defaultValue="sm-1"
            size="sm"
          />
        </div>
        
        <div>
          <h4 className="text-md font-medium mb-3">Medium Size (Default)</h4>
          <RadioGroup
            name="sizes-medium"
            options={[
              { value: 'md-1', label: 'Medium Option 1' },
              { value: 'md-2', label: 'Medium Option 2' },
            ]}
            defaultValue="md-1"
            size="md"
          />
        </div>
      </div>
    </div>
  ),
};

// Orientations comparison
export const OrientationsComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-6">
      <h3 className="text-lg font-semibold">Orientation Options</h3>
      
      <div className="flex flex-col gap-6">
        <div>
          <h4 className="text-md font-medium mb-3">Vertical (Default)</h4>
          <RadioGroup
            name="orientation-vertical"
            options={[
              { value: 'v-1', label: 'Vertical Option 1' },
              { value: 'v-2', label: 'Vertical Option 2' },
              { value: 'v-3', label: 'Vertical Option 3' },
            ]}
            defaultValue="v-2"
            orientation="vertical"
            size="md"
          />
        </div>
        
        <div>
          <h4 className="text-md font-medium mb-3">Horizontal</h4>
          <RadioGroup
            name="orientation-horizontal"
            options={[
              { value: 'h-1', label: 'Horizontal 1' },
              { value: 'h-2', label: 'Horizontal 2' },
              { value: 'h-3', label: 'Horizontal 3' },
            ]}
            defaultValue="h-2"
            orientation="horizontal"
            size="md"
          />
        </div>
      </div>
    </div>
  ),
}; 