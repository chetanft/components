import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Molecules/Dropdown',
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

// Search dropdown
export const Search: Story = {
  args: {
    label: 'Search Dropdown',
    type: 'search',
    placeholder: 'Search options',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
      { value: 'option4', label: 'Option 4' },
      { value: 'option5', label: 'Option 5' },
    ],
  },
};

// Search with Segmented Tabs
export const SearchWithSegments: Story = {
  args: {
    label: 'Search with Segments',
    type: 'search',
    placeholder: 'Search groups',
    segments: [
      { label: 'Group', value: 'group' },
      { label: 'Branch', value: 'branch' },
    ],
    selectedSegment: 'group',
    options: [
      { value: 'all', label: 'All Groups' },
      { value: 'group1', label: 'Group 1' },
      { value: 'group2', label: 'Group 2' },
      { value: 'group3', label: 'Group 3' },
      { value: 'group4', label: 'Group 4' },
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
        error="This field has an error"
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