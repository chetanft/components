import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { Icon } from '../Icons';

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

// Circular buttons showcase
export const CircularButtons: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Circular Buttons</h3>
        <p className="text-sm text-gray-600 mb-4">
          When using the `rounded-full` class, buttons automatically become perfect circles 
          (width = height) with optimal padding removed for icon-only usage.
        </p>
      </div>
      
      {/* Circular button sizes */}
      <div>
        <h4 className="text-md font-medium mb-3">Sizes</h4>
        <div className="flex items-center gap-4">
          <Button variant="secondary" size="sm" className="rounded-full">
            <Icon name="edit" size={14} />
          </Button>
          <Button variant="secondary" size="md" className="rounded-full">
            <Icon name="edit" size={16} />
          </Button>
          <Button variant="secondary" size="lg" className="rounded-full">
            <Icon name="edit" size={20} />
          </Button>
        </div>
        <div className="text-xs text-gray-500 mt-2">
          Small: 36×36px | Medium: 44×44px | Large: 52×52px
        </div>
      </div>
      
      {/* Circular button variants */}
      <div>
        <h4 className="text-md font-medium mb-3">Variants</h4>
        <div className="flex items-center gap-4">
          <Button variant="primary" size="md" className="rounded-full">
            <Icon name="add" size={16} />
          </Button>
          <Button variant="secondary" size="md" className="rounded-full">
            <Icon name="edit" size={16} />
          </Button>
          <Button variant="destructive" size="md" className="rounded-full">
            <Icon name="delete" size={16} />
          </Button>
        </div>
      </div>
      
      {/* Common use cases */}
      <div>
        <h4 className="text-md font-medium mb-3">Common Use Cases</h4>
        <div className="flex items-center gap-4">
          <Button variant="secondary" size="sm" className="rounded-full">
            <Icon name="more" size={14} />
          </Button>
          <Button variant="secondary" size="sm" className="rounded-full">
            <Icon name="share" size={14} />
          </Button>
          <Button variant="secondary" size="sm" className="rounded-full">
            <Icon name="copy" size={14} />
          </Button>
        </div>
        <div className="text-xs text-gray-500 mt-2">
          Perfect for table action buttons, toolbar icons, and floating action buttons
        </div>
      </div>
      
      {/* Comparison */}
      <div>
        <h4 className="text-md font-medium mb-3">Comparison</h4>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <Button variant="secondary" size="md">
              <Icon name="edit" size={16} />
            </Button>
            <span className="text-xs text-gray-500">Regular Button</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button variant="secondary" size="md" className="rounded-full">
              <Icon name="edit" size={16} />
            </Button>
            <span className="text-xs text-gray-500">Circular Button</span>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the automatic circular button functionality. When `rounded-full` class is applied, the button width automatically equals the height for perfect circles, ideal for icon-only buttons.'
      }
    }
  }
}; 