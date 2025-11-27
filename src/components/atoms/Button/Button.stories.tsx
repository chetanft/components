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
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
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

// Sizes story - all sizes in one preview
export function Sizes() {
  return (
    <div className="p-6">
      <div className="flex flex-col gap-4">
        <Button variant="primary" size="xs">XS (24px)</Button>
        <Button variant="primary" size="sm">SM (32px)</Button>
        <Button variant="primary" size="md">MD (40px)</Button>
        <Button variant="primary" size="lg">LG (48px)</Button>
        <Button variant="primary" size="xl">XL (56px)</Button>
        <Button variant="primary" size="xxl">XXL (64px)</Button>
      </div>
    </div>
  );
}

// States story - separate preview for states
export function States() {
  return (
    <div className="p-6">
      <div className="flex gap-4">
        <Button variant="primary" size="md">Normal</Button>
        <Button variant="primary" size="md" disabled>Disabled</Button>
      </div>
    </div>
  );
}

// Icon Positions story - separate preview for icon positions
export function IconPositions() {
  return (
    <div className="p-6">
      <div className="flex gap-4">
        <Button variant="primary" size="md" icon="add" iconPosition="leading">Leading Icon</Button>
        <Button variant="primary" size="md" icon="send" iconPosition="trailing">Trailing Icon</Button>
        <Button variant="secondary" size="md" icon="edit" iconPosition="only" />
      </div>
    </div>
  );
}

// Circular buttons showcase - special showcase story
export function CircularButtons() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Circular button sizes */}
      <div>
        <h4 className="text-base font-medium mb-3">Sizes</h4>
        <div className="flex items-center gap-4">
          <Button variant="secondary" size="sm" className="rounded-full" icon="edit" iconPosition="only" />
          <Button variant="secondary" size="md" className="rounded-full" icon="edit" iconPosition="only" />
          <Button variant="secondary" size="lg" className="rounded-full" icon="edit" iconPosition="only" />
        </div>
        <div className="text-xs text-gray-500 mt-2">
          Small: 36×36px | Medium: 40×40px | Large: 52×52px
        </div>
      </div>
      
      {/* Circular button variants */}
      <div>
        <h4 className="text-base font-medium mb-3">Circular Variants</h4>
        <div className="flex items-center gap-4">
          <Button variant="primary" size="md" className="rounded-full" icon="add" iconPosition="only" />
          <Button variant="secondary" size="md" className="rounded-full" icon="edit" iconPosition="only" />
          <Button variant="destructive" size="md" className="rounded-full" icon="delete" iconPosition="only" />
        </div>
      </div>
      
      {/* Circular icon-only buttons (text variant uses secondary styling) */}
      <div>
        <h4 className="text-base font-medium mb-3">Circular Icon-Only Buttons</h4>
        <div className="flex items-center gap-4">
          <Button variant="text" size="sm" icon="more" iconPosition="only" />
          <Button variant="text" size="md" icon="more" iconPosition="only" />
          <Button variant="text" size="lg" icon="more" iconPosition="only" />
        </div>
      </div>
      
      {/* Common use cases */}
      <div>
        <h4 className="text-base font-medium mb-3">Common Use Cases</h4>
        <div className="flex items-center gap-4">
          <Button variant="secondary" size="sm" className="rounded-full" icon="more" iconPosition="only" />
          <Button variant="secondary" size="sm" className="rounded-full" icon="share" iconPosition="only" />
          <Button variant="secondary" size="sm" className="rounded-full" icon="copy" iconPosition="only" />
        </div>
      </div>
      
      {/* Comparison */}
      <div>
        <h4 className="text-base font-medium mb-3">Comparison</h4>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <Button variant="secondary" size="md">
              <Icon name="edit" size={16} />
            </Button>
            <div className="text-xs text-gray-500">Standard</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button variant="secondary" size="md" className="rounded-full" icon="edit" iconPosition="only" />
            <div className="text-xs text-gray-500">Circular</div>
          </div>
        </div>
      </div>
    </div>
  );
} 