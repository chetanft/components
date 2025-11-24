import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Badge } from './Badge';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile badge component matching exact Figma specifications. Built with consistent theming and proper spacing.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['normal', 'danger', 'success', 'warning', 'neutral'],
      description: 'The visual style variant of the badge',
      table: {
        defaultValue: { summary: 'normal' },
      },
    },
 
    leadingIcon: {
      control: { type: 'text' },
      description: 'Optional icon name to display before the label',
    },
    trailingIcon: {
      control: { type: 'text' },
      description: 'Optional icon name to display after the label',
    },
    interaction: {
      control: { type: 'boolean' },
      description: 'Enables interactive state with border and hover effects',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    onClick: {
      control: false,
      description: 'Makes the badge interactive when provided',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes to apply',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default badge
export const Default: Story = {
  args: {
    variant: 'normal',
    children: 'Label',
  },
};

// Individual variant examples
export const Normal: Story = {
  args: {
    children: 'Normal',
    variant: 'normal',
  },
};

export const Danger: Story = {
  args: {
    children: 'Error',
    variant: 'danger',
  },
};

export const Success: Story = {
  args: {
    children: 'Success',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    children: 'Warning',
    variant: 'warning',
  },
};

export const Neutral: Story = {
  args: {
    children: 'Info',
    variant: 'neutral',
  },
};

// With leading icon
export const WithLeadingIcon: Story = {
  args: {
    children: 'Label',
    variant: 'normal',
    leadingIcon: 'add',
  },
};

// With trailing icon
export const WithTrailingIcon: Story = {
  args: {
    children: 'Label',
    variant: 'normal',
    trailingIcon: 'chevron-right',
  },
};

// With both icons
export const WithBothIcons: Story = {
  args: {
    children: 'Label',
    variant: 'normal',
    leadingIcon: 'add',
    trailingIcon: 'chevron-right',
  },
};

// Interactive badge
export const Interactive: Story = {
  args: {
    children: 'Label',
    variant: 'normal',
    interaction: true,
  },
}; 