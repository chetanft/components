import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from '../components/molecules/Dropdown/Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic dropdown
export const Default: Story = {
  args: {
    label: 'Label',
    placeholder: 'Select an option',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
  },
};

// Required field
export const Required: Story = {
  args: {
    label: 'Required Field',
    required: true,
    placeholder: 'Please select an option',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
  },
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Dropdown
        label="Extra Large (XL)"
        size="xl"
        placeholder="XL Dropdown"
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
        ]}
      />
      <Dropdown
        label="Large (LG)"
        size="lg"
        placeholder="LG Dropdown"
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
        ]}
      />
      <Dropdown
        label="Medium (MD)"
        size="md"
        placeholder="MD Dropdown"
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
        ]}
      />
      <Dropdown
        label="Small (SM)"
        size="sm"
        placeholder="SM Dropdown"
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
        ]}
      />
    </div>
  ),
};

// Label positions
export const LabelPositions: Story = {
  render: () => (
    <div className="space-y-4">
      <Dropdown
        label="Top Label"
        labelPosition="top"
        placeholder="Top label position"
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
        ]}
      />
      <Dropdown
        label="Left Label"
        labelPosition="left"
        placeholder="Left label position"
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
        ]}
      />
    </div>
  ),
};

// States
export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <Dropdown
        label="Default"
        state="default"
        placeholder="Default state"
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
        ]}
      />
      <Dropdown
        label="Error"
        state="error"
        placeholder="Error state"
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
        ]}
      />
      <Dropdown
        label="Disabled"
        state="disabled"
        placeholder="Disabled state"
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
        ]}
      />
    </div>
  ),
}; 