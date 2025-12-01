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
      control: { type: 'boolean' },
      description: 'Whether to show sub text'
    },
    leadingIcon: {
      control: { type: 'boolean' },
      description: 'Whether to show leading icon'
    },
    trailingIcon: {
      control: { type: 'boolean' },
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
    subText: false,
    leadingIcon: false,
    trailingIcon: false,
  },
};

// Small size
export const Small: Story = {
  args: {
    size: 'sm',
    subText: false,
    leadingIcon: false,
    trailingIcon: false,
  },
};

// Large size
export const Large: Story = {
  args: {
    size: 'lg',
    subText: false,
    leadingIcon: false,
    trailingIcon: false,
  },
};

// Extra large size
export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    subText: false,
    leadingIcon: false,
    trailingIcon: false,
  },
};

// XX large size
export const XXLarge: Story = {
  args: {
    size: 'xx',
    subText: false,
    leadingIcon: false,
    trailingIcon: false,
  },
};

// With sub text
export const WithSubText: Story = {
  args: {
    size: 'md',
    subText: true,
    leadingIcon: false,
    trailingIcon: false,
  },
};

// With leading icon
export const WithLeadingIcon: Story = {
  args: {
    size: 'md',
    subText: false,
    leadingIcon: true,
    trailingIcon: false,
  },
};

// With trailing icon
export const WithTrailingIcon: Story = {
  args: {
    size: 'md',
    subText: false,
    leadingIcon: false,
    trailingIcon: true,
  },
};

// With sub text and trailing icon
export const WithSubTextAndTrailingIcon: Story = {
  args: {
    size: 'md',
    subText: true,
    leadingIcon: false,
    trailingIcon: true,
  },
};

// With sub text and leading icon
export const WithSubTextAndLeadingIcon: Story = {
  args: {
    size: 'md',
    subText: true,
    leadingIcon: true,
    trailingIcon: false,
  },
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold mb-2">Text Sizes</h3>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <span className="w-12 text-sm text-muted-foreground">sm:</span>
              <Text size="sm" />
            </div>
            <p className="text-sm text-muted-foreground ml-16">Font: 1rem (14px) - Body Secondary Regular</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <span className="w-12 text-sm text-muted-foreground">md:</span>
              <Text size="md" />
            </div>
            <p className="text-sm text-muted-foreground ml-16">Font: 1.143rem (16px) - Body Primary Regular</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <span className="w-12 text-sm text-muted-foreground">lg:</span>
              <Text size="lg" />
            </div>
            <p className="text-sm text-muted-foreground ml-16">Font: 1.143rem (16px) - Body Primary Semibold</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <span className="w-12 text-sm text-muted-foreground">xl:</span>
              <Text size="xl" />
            </div>
            <p className="text-sm text-muted-foreground ml-16">Font: 1.429rem (20px) - Display Primary</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <span className="w-12 text-sm text-muted-foreground">xx:</span>
              <Text size="xx" />
            </div>
            <p className="text-sm text-muted-foreground ml-16">Font: 1.714rem (24px) - Title Secondary</p>
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
        <Text size="md" subText={true} />
      </div>
      
      <div>
        <h3 className="font-semibold mb-4">With Icons</h3>
        <div className="space-y-3">
          <div>
            <span className="text-sm text-gray-500 mb-2 block">Leading Icon:</span>
            <Text size="md" leadingIcon={true} />
          </div>
          <div>
            <span className="text-sm text-gray-500 mb-2 block">Trailing Icon:</span>
            <Text size="md" trailingIcon={true} />
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold mb-4">Combined Variants</h3>
        <div className="space-y-3">
          <div>
            <span className="text-sm text-gray-500 mb-2 block">Sub Text + Leading Icon:</span>
            <Text size="md" subText={true} leadingIcon={true} />
          </div>
          <div>
            <span className="text-sm text-gray-500 mb-2 block">Sub Text + Trailing Icon:</span>
            <Text size="md" subText={true} trailingIcon={true} />
          </div>
        </div>
      </div>
    </div>
  ),
};
