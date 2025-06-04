import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Design System/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'destructive', 'link'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    showIcon: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    children: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default primary button
export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    showIcon: true,
    children: 'Button',
  },
};

// Secondary variant
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
    showIcon: true,
    children: 'Button',
  },
};

// Destructive variant
export const Destructive: Story = {
  args: {
    variant: 'destructive',
    size: 'md',
    showIcon: true,
    children: 'Button',
  },
};

// Link variant
export const Link: Story = {
  args: {
    variant: 'link',
    size: 'md',
    showIcon: false,
    children: 'Button',
  },
};

// Different sizes
export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    showIcon: true,
    children: 'Button',
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    showIcon: true,
    children: 'Button',
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    showIcon: true,
    disabled: true,
    children: 'Button',
  },
};

// Without icon
export const WithoutIcon: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    showIcon: false,
    children: 'Button',
  },
};

// All variants showcase - updated to only show correct variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-6">
      {/* Button Variants */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Button Variants</h3>
        <div className="flex gap-4">
          <Button variant="primary" size="md" showIcon={true}>Primary</Button>
          <Button variant="secondary" size="md" showIcon={true}>Secondary</Button>
          <Button variant="destructive" size="md" showIcon={true}>Destructive</Button>
          <Button variant="link" size="md" showIcon={false}>Link</Button>
        </div>
      </div>
      
      {/* Button Sizes */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Button Sizes</h3>
        <div className="flex items-center gap-4">
          <Button variant="primary" size="sm" showIcon={true}>Small</Button>
          <Button variant="primary" size="md" showIcon={true}>Medium</Button>
          <Button variant="primary" size="lg" showIcon={true}>Large</Button>
        </div>
      </div>
      
      {/* Button States */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Button States</h3>
        <div className="flex gap-4">
          <Button variant="primary" size="md" showIcon={true}>Normal</Button>
          <Button variant="primary" size="md" showIcon={true} disabled>Disabled</Button>
        </div>
      </div>
      
      {/* With and Without Icons */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Icon Options</h3>
        <div className="flex gap-4">
          <Button variant="primary" size="md" showIcon={true}>With Icon</Button>
          <Button variant="primary" size="md" showIcon={false}>Without Icon</Button>
        </div>
      </div>
    </div>
  ),
}; 