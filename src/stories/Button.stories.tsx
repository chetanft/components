import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '../components/Button/Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'text', 'destructive', 'link'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    icon: {
      control: { type: 'select' },
      options: ['add', 'search', 'copy', 'send', 'document'],
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['leading', 'trailing', 'only'],
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic button variants
export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Button',
    variant: 'secondary',
    size: 'md',
  },
};

export const Text: Story = {
  args: {
    children: 'Button',
    variant: 'text',
    size: 'md',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive',
    size: 'md',
  },
};

// Button sizes
export const Small: Story = {
  args: {
    children: 'Small Button',
    variant: 'primary',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    children: 'Medium Button',
    variant: 'primary',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    variant: 'primary',
    size: 'lg',
  },
};

// Icon buttons - Leading icon
export const WithLeadingIcon: Story = {
  args: {
    children: 'Add New',
    icon: 'add',
    iconPosition: 'leading',
    variant: 'primary',
    size: 'md',
  },
};

// Icon buttons - Trailing icon
export const WithTrailingIcon: Story = {
  args: {
    children: 'Submit',
    icon: 'send',
    iconPosition: 'trailing',
    variant: 'primary',
    size: 'md',
  },
};

// Icon-only button
export const IconOnly: Story = {
  args: {
    icon: 'add',
    iconPosition: 'only',
    variant: 'primary',
    size: 'md',
  },
};

// Disabled states
export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    variant: 'primary',
    disabled: true,
  },
};

// Comprehensive showcase matching Figma design
export const AllVariations: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      {/* Primary Buttons */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Primary Buttons</h3>
        <div className="flex gap-4 items-center">
          <Button variant="primary" size="sm">
            Button
          </Button>
          <Button variant="primary" size="md">
            Button
          </Button>
          <Button variant="primary" size="lg">
            Button
          </Button>
        </div>
        <div className="flex gap-4 items-center">
          <Button variant="primary" size="sm" icon="add" iconPosition="leading">
            Button
          </Button>
          <Button variant="primary" size="md" icon="add" iconPosition="leading">
            Button
          </Button>
          <Button variant="primary" size="lg" icon="add" iconPosition="leading">
            Button
          </Button>
        </div>
        <div className="flex gap-4 items-center">
          <Button variant="primary" size="sm" icon="add" iconPosition="trailing">
            Button
          </Button>
          <Button variant="primary" size="md" icon="add" iconPosition="trailing">
            Button
          </Button>
          <Button variant="primary" size="lg" icon="add" iconPosition="trailing">
            Button
          </Button>
        </div>
        <div className="flex gap-4 items-center">
          <Button variant="primary" size="sm" icon="add" iconPosition="only" />
          <Button variant="primary" size="md" icon="add" iconPosition="only" />
          <Button variant="primary" size="lg" icon="add" iconPosition="only" />
        </div>
      </div>

      {/* Secondary Buttons */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Secondary Buttons</h3>
        <div className="flex gap-4 items-center">
          <Button variant="secondary" size="sm">
            Button
          </Button>
          <Button variant="secondary" size="md">
            Button
          </Button>
          <Button variant="secondary" size="lg">
            Button
          </Button>
        </div>
        <div className="flex gap-4 items-center">
          <Button variant="secondary" size="sm" icon="add" iconPosition="leading">
            Button
          </Button>
          <Button variant="secondary" size="md" icon="add" iconPosition="leading">
            Button
          </Button>
          <Button variant="secondary" size="lg" icon="add" iconPosition="leading">
            Button
          </Button>
        </div>
        <div className="flex gap-4 items-center">
          <Button variant="secondary" size="sm" icon="add" iconPosition="trailing">
            Button
          </Button>
          <Button variant="secondary" size="md" icon="add" iconPosition="trailing">
            Button
          </Button>
          <Button variant="secondary" size="lg" icon="add" iconPosition="trailing">
            Button
          </Button>
        </div>
        <div className="flex gap-4 items-center">
          <Button variant="secondary" size="sm" icon="add" iconPosition="only" />
          <Button variant="secondary" size="md" icon="add" iconPosition="only" />
          <Button variant="secondary" size="lg" icon="add" iconPosition="only" />
        </div>
      </div>

      {/* Text Buttons */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Text Buttons</h3>
        <div className="flex gap-4 items-center">
          <Button variant="text" size="sm">
            Button
          </Button>
          <Button variant="text" size="md">
            Button
          </Button>
          <Button variant="text" size="lg">
            Button
          </Button>
        </div>
        <div className="flex gap-4 items-center">
          <Button variant="text" size="sm" icon="add" iconPosition="leading">
            Button
          </Button>
          <Button variant="text" size="md" icon="add" iconPosition="leading">
            Button
          </Button>
          <Button variant="text" size="lg" icon="add" iconPosition="leading">
            Button
          </Button>
        </div>
        <div className="flex gap-4 items-center">
          <Button variant="text" size="sm" icon="add" iconPosition="trailing">
            Button
          </Button>
          <Button variant="text" size="md" icon="add" iconPosition="trailing">
            Button
          </Button>
          <Button variant="text" size="lg" icon="add" iconPosition="trailing">
            Button
          </Button>
        </div>
      </div>
    </div>
  ),
};

// Legacy compatibility test
export const LegacyShowIcon: Story = {
  args: {
    children: 'Legacy Button',
    icon: 'add',
    iconPosition: 'leading',
    variant: 'primary',
    size: 'md',
  },
};

// Text button variants
export const TextButton: Story = {
  args: {
    children: 'Text Button',
    variant: 'text',
    size: 'md',
  },
};

export const TextButtonWithLeadingIcon: Story = {
  args: {
    children: 'Text Button',
    variant: 'text',
    icon: 'add',
    iconPosition: 'leading',
    size: 'md',
  },
};

export const TextButtonWithTrailingIcon: Story = {
  args: {
    children: 'Text Button',
    variant: 'text',
    icon: 'add',
    iconPosition: 'trailing',
    size: 'md',
  },
};

// Suffix (Trailing) icon button variations for all variants
export const PrimaryWithSuffixIcon: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
    icon: 'send',
    iconPosition: 'trailing',
    size: 'md',
  },
};

export const SecondaryWithSuffixIcon: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
    icon: 'send',
    iconPosition: 'trailing',
    size: 'md',
  },
};

export const DestructiveWithSuffixIcon: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive',
    icon: 'send',
    iconPosition: 'trailing',
    size: 'md',
  },
};

// Link button variant
export const LinkButton: Story = {
  args: {
    children: 'Link Button',
    variant: 'link',
    size: 'md',
  },
};

export const LinkButtonWithIcon: Story = {
  args: {
    children: 'Link Button',
    variant: 'link',
    icon: 'add',
    iconPosition: 'leading',
    size: 'md',
  },
}; 