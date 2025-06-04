import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../components/Badge/Badge';
import { Icon } from '../components/Icons';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['normal', 'danger', 'success', 'warning', 'neutral'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
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

// Backward compatibility story for existing references
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="normal">Normal</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="neutral">Neutral</Badge>
    </div>
  ),
};

export const WithLeadingIcon: Story = {
  args: {
    children: 'Add item',
    variant: 'normal',
    leadingIcon: <Icon name="add" size={14} />,
  },
};

export const WithTrailingIcon: Story = {
  args: {
    children: 'Next',
    variant: 'normal',
    trailingIcon: <Icon name="chevron-right" size={14} />,
  },
};

export const WithBothIcons: Story = {
  args: {
    children: 'Process',
    variant: 'success',
    leadingIcon: <Icon name="add" size={14} />,
    trailingIcon: <Icon name="chevron-right" size={14} />,
  },
}; 