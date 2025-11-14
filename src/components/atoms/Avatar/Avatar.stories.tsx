import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Avatar } from './Avatar';

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Avatar component with multiple size options matching Figma specifications.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'The size of the avatar',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    src: {
      control: { type: 'text' },
      description: 'Image source URL for the avatar',
    },
    alt: {
      control: { type: 'text' },
      description: 'Alt text for the avatar image',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes to apply',
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default avatar
export const Default: Story = {
  args: {
    size: 'md',
    src: 'https://www.figma.com/api/mcp/asset/e8b29616-8d2c-4163-926e-ba963bf1fb33',
    alt: 'User Avatar',
  },
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar size="xxs" src="https://www.figma.com/api/mcp/asset/e8b29616-8d2c-4163-926e-ba963bf1fb33" alt="XXS Avatar" />
      <Avatar size="xs" src="https://www.figma.com/api/mcp/asset/e8b29616-8d2c-4163-926e-ba963bf1fb33" alt="XS Avatar" />
      <Avatar size="sm" src="https://www.figma.com/api/mcp/asset/e8b29616-8d2c-4163-926e-ba963bf1fb33" alt="SM Avatar" />
      <Avatar size="md" src="https://www.figma.com/api/mcp/asset/e8b29616-8d2c-4163-926e-ba963bf1fb33" alt="MD Avatar" />
      <Avatar size="lg" src="https://www.figma.com/api/mcp/asset/e8b29616-8d2c-4163-926e-ba963bf1fb33" alt="LG Avatar" />
      <Avatar size="xl" src="https://www.figma.com/api/mcp/asset/e8b29616-8d2c-4163-926e-ba963bf1fb33" alt="XL Avatar" />
      <Avatar size="xxl" src="https://www.figma.com/api/mcp/asset/e8b29616-8d2c-4163-926e-ba963bf1fb33" alt="XXL Avatar" />
    </div>
  ),
};

// Without image (placeholder)
export const Placeholder: Story = {
  args: {
    size: 'md',
  },
};

