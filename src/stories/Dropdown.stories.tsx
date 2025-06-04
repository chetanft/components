import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown, DropdownField } from '../components/Dropdown/Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xl', 'l', 'm'],
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'filled', 'disabled', 'prefilled', 'hover', 'focused', 'typing'],
    },
    type: {
      control: { type: 'select' },
      options: ['normal', 'error', 'warning', 'success'],
    },
    labelPosition: {
      control: { type: 'select' },
      options: ['top', 'left', 'none'],
    },
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

// With caption
export const WithCaption: Story = {
  args: {
    label: 'Label',
    placeholder: 'Select an option',
    showCaption: true,
    caption: 'This is a helpful caption',
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
        label="Large (L)"
        size="l"
        placeholder="L Dropdown"
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
        ]}
      />
      <Dropdown
        label="Medium (M)"
        size="m"
        placeholder="M Dropdown"
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
        ]}
      />
    </div>
  ),
};

// Different types
export const Types: Story = {
  render: () => (
    <div className="space-y-4">
      <Dropdown
        label="Normal"
        type="normal"
        placeholder="Normal dropdown"
        showCaption
        caption="This is a normal dropdown"
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
        ]}
      />
      <Dropdown
        label="Error"
        type="error"
        placeholder="Error dropdown"
        showCaption
        caption="This is an error message"
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
        ]}
      />
      <Dropdown
        label="Warning"
        type="warning"
        placeholder="Warning dropdown"
        showCaption
        caption="This is a warning message"
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
        ]}
      />
      <Dropdown
        label="Success"
        type="success"
        placeholder="Success dropdown"
        showCaption
        caption="This is a success message"
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
      <Dropdown
        labelPosition="none"
        placeholder="No label"
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
        label="Default State"
        state="default"
        placeholder="Default state"
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
        ]}
      />
      <Dropdown
        label="Filled State"
        state="filled"
        value="option1"
        options={[
          { value: 'option1', label: 'Selected Option' },
          { value: 'option2', label: 'Option 2' },
        ]}
      />
      <Dropdown
        label="Disabled State"
        state="disabled"
        disabled
        placeholder="Disabled dropdown"
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
        ]}
      />
    </div>
  ),
};

// Dropdown Field only
export const DropdownFieldOnly: Story = {
  render: () => (
    <div className="space-y-4">
      <DropdownField
        size="xl"
        placeholder="Just the field component"
      />
      <DropdownField
        size="l"
        type="error"
        placeholder="Error field"
      />
      <DropdownField
        size="m"
        state="disabled"
        disabled
        placeholder="Disabled field"
      />
    </div>
  ),
}; 