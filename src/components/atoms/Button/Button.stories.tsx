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
      options: ['primary', 'secondary', 'destructive', 'text', 'link'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    icon: {
      control: { type: 'select' },
      options: ['add', 'search', 'copy', 'send', 'document', 'download', 'edit'],
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['leading', 'trailing', 'only'],
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
    children: 'Button',
  },
};

// Secondary variant
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
    children: 'Button',
  },
};

// Destructive variant
export const Destructive: Story = {
  args: {
    variant: 'destructive',
    size: 'md',
    children: 'Button',
  },
};

// Text variant
export const Text: Story = {
  args: {
    variant: 'text',
    size: 'md',
    children: 'Button',
  },
};

// Link variant
export const Link: Story = {
  args: {
    variant: 'link',
    size: 'md',
    children: 'Button',
  },
};

// Different sizes
export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    children: 'Button',
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    children: 'Button',
  },
};

// With leading icon
export const WithLeadingIcon: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    icon: 'add',
    iconPosition: 'leading',
    children: 'Button',
  },
};

// With trailing icon
export const WithTrailingIcon: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    icon: 'send',
    iconPosition: 'trailing',
    children: 'Button',
  },
};

// Icon only
export const IconOnly: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
    icon: 'edit',
    iconPosition: 'only',
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    icon: 'add',
    iconPosition: 'leading',
    disabled: true,
    children: 'Button',
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-6">
      {/* Button Variants */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Button Variants</h3>
        <div className="flex gap-4">
          <Button variant="primary" size="md">Primary</Button>
          <Button variant="secondary" size="md">Secondary</Button>
          <Button variant="destructive" size="md">Destructive</Button>
          <Button variant="text" size="md">Text</Button>
          <Button variant="link" size="md">Link</Button>
        </div>
      </div>
      
      {/* Button Sizes */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Button Sizes</h3>
        <div className="flex items-center gap-4">
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="md">Medium</Button>
          <Button variant="primary" size="lg">Large</Button>
        </div>
      </div>
      
      {/* Button States */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Button States</h3>
        <div className="flex gap-4">
          <Button variant="primary" size="md">Normal</Button>
          <Button variant="primary" size="md" disabled>Disabled</Button>
        </div>
      </div>
      
      {/* Icon Positions */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Icon Positions</h3>
        <div className="flex gap-4">
          <Button variant="primary" size="md" icon="add" iconPosition="leading">Leading Icon</Button>
          <Button variant="primary" size="md" icon="send" iconPosition="trailing">Trailing Icon</Button>
          <Button variant="secondary" size="md" icon="edit" iconPosition="only" />
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
          <Button variant="secondary" size="sm" className="rounded-full" icon="edit" iconPosition="only" />
          <Button variant="secondary" size="md" className="rounded-full" icon="edit" iconPosition="only" />
          <Button variant="secondary" size="lg" className="rounded-full" icon="edit" iconPosition="only" />
        </div>
        <div className="text-xs text-gray-500 mt-2">
          Small: 36×36px | Medium: 44×44px | Large: 52×52px
        </div>
      </div>
      
      {/* Circular button variants */}
      <div>
        <h4 className="text-md font-medium mb-3">Variants</h4>
        <div className="flex items-center gap-4">
          <Button variant="primary" size="md" className="rounded-full" icon="add" iconPosition="only" />
          <Button variant="secondary" size="md" className="rounded-full" icon="edit" iconPosition="only" />
          <Button variant="destructive" size="md" className="rounded-full" icon="delete" iconPosition="only" />
        </div>
      </div>
      
      {/* Common use cases */}
      <div>
        <h4 className="text-md font-medium mb-3">Common Use Cases</h4>
        <div className="flex items-center gap-4">
          <Button variant="secondary" size="sm" className="rounded-full" icon="more" iconPosition="only" />
          <Button variant="secondary" size="sm" className="rounded-full" icon="share" iconPosition="only" />
          <Button variant="secondary" size="sm" className="rounded-full" icon="copy" iconPosition="only" />
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
            <Button variant="secondary" size="md" className="rounded-full" icon="edit" iconPosition="only" />
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