import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Molecules/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Dropdown component for selecting from a list of options with support for search and segments.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['default', 'search'],
      description: 'Dropdown type',
    },
    state: {
      control: 'select',
      options: ['default', 'error', 'disabled'],
      description: 'Dropdown state',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Dropdown size',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

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

export const WithValue: Story = {
  args: {
    label: 'Dropdown with Value',
    placeholder: 'Select an option',
    value: 'option1',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
  },
};

export const Error: Story = {
  args: {
    label: 'Dropdown with Error',
    placeholder: 'Select an option',
    state: 'error',
    error: 'This field has an error',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Dropdown',
    placeholder: 'Cannot select',
    state: 'disabled',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
  },
};

export const SearchWithSegments: Story = {
  args: {
    label: 'Search with Segments',
    type: 'search',
    placeholder: 'Search...',
    segments: [
      { label: 'Group', value: 'group' },
      { label: 'Branch', value: 'branch' },
    ],
    selectedSegment: 'group',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
  },
};

export const SizeXS: Story = {
  args: {
    label: 'Extra Small (XS)',
    size: 'xs',
    placeholder: '24px height',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ],
  },
};

export const SizeSM: Story = {
  args: {
    label: 'Small (SM)',
    size: 'sm',
    placeholder: '32px height',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ],
  },
};

export const SizeMD: Story = {
  args: {
    label: 'Medium (MD)',
    size: 'md',
    placeholder: '40px height',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ],
  },
};

export const SizeLG: Story = {
  args: {
    label: 'Large (LG)',
    size: 'lg',
    placeholder: '48px height',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ],
  },
};
