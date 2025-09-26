import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Text } from './Text';

const meta = {
  title: 'Atoms/Text',
  component: Text,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible text component with configurable icons and sub-text. Supports various sizes and icon positions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', 'xx'],
      description: 'Text size variant'
    },
    subText: {
      control: { type: 'select' },
      options: ['False', 'True'],
      description: 'Whether to show sub text'
    },
    leadingIcon: {
      control: { type: 'select' },
      options: ['False', 'True'],
      description: 'Whether to show leading icon'
    },
    trailingIcon: {
      control: { type: 'select' },
      options: ['False', 'True'],
      description: 'Whether to show trailing icon'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    }
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default text
export const Default: Story = {
  args: {
    size: 'md',
    subText: 'False',
    leadingIcon: 'False',
    trailingIcon: 'False',
  },
};

// Small size
export const Small: Story = {
  args: {
    size: 'sm',
    subText: 'False',
    leadingIcon: 'False',
    trailingIcon: 'False',
  },
};

// Large size
export const Large: Story = {
  args: {
    size: 'lg',
    subText: 'False',
    leadingIcon: 'False',
    trailingIcon: 'False',
  },
};

// Extra large size
export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    subText: 'False',
    leadingIcon: 'False',
    trailingIcon: 'False',
  },
};

// XX large size
export const XXLarge: Story = {
  args: {
    size: 'xx',
    subText: 'False',
    leadingIcon: 'False',
    trailingIcon: 'False',
  },
};

// With sub text
export const WithSubText: Story = {
  args: {
    size: 'md',
    subText: 'True',
    leadingIcon: 'False',
    trailingIcon: 'False',
  },
};

// With leading icon
export const WithLeadingIcon: Story = {
  args: {
    size: 'md',
    subText: 'False',
    leadingIcon: 'True',
    trailingIcon: 'False',
  },
};

// With trailing icon
export const WithTrailingIcon: Story = {
  args: {
    size: 'md',
    subText: 'False',
    leadingIcon: 'False',
    trailingIcon: 'True',
  },
};

// With sub text and trailing icon
export const WithSubTextAndTrailingIcon: Story = {
  args: {
    size: 'md',
    subText: 'True',
    leadingIcon: 'False',
    trailingIcon: 'True',
  },
};

// With sub text and leading icon
export const WithSubTextAndLeadingIcon: Story = {
  args: {
    size: 'md',
    subText: 'True',
    leadingIcon: 'True',
    trailingIcon: 'False',
  },
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold mb-2">Text Sizes</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <span className="w-12 text-sm text-gray-500">sm:</span>
            <Text size="sm" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-12 text-sm text-gray-500">md:</span>
            <Text size="md" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-12 text-sm text-gray-500">lg:</span>
            <Text size="lg" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-12 text-sm text-gray-500">xl:</span>
            <Text size="xl" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-12 text-sm text-gray-500">xx:</span>
            <Text size="xx" />
          </div>
        </div>
      </div>
    </div>
  ),
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Basic Text</h3>
        <Text size="md" />
      </div>
      
      <div>
        <h3 className="font-semibold mb-4">With Sub Text</h3>
        <Text size="md" subText="True" />
      </div>
      
      <div>
        <h3 className="font-semibold mb-4">With Icons</h3>
        <div className="space-y-3">
          <div>
            <span className="text-sm text-gray-500 mb-2 block">Leading Icon:</span>
            <Text size="md" leadingIcon="True" />
          </div>
          <div>
            <span className="text-sm text-gray-500 mb-2 block">Trailing Icon:</span>
            <Text size="md" trailingIcon="True" />
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold mb-4">Combined Variants</h3>
        <div className="space-y-3">
          <div>
            <span className="text-sm text-gray-500 mb-2 block">Sub Text + Leading Icon:</span>
            <Text size="md" subText="True" leadingIcon="True" />
          </div>
          <div>
            <span className="text-sm text-gray-500 mb-2 block">Sub Text + Trailing Icon:</span>
            <Text size="md" subText="True" trailingIcon="True" />
          </div>
        </div>
      </div>
    </div>
  ),
};
