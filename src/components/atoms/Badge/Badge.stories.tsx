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
 
    icon: {
      control: { type: 'text' },
      description: 'Optional icon name to display in the badge',
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

// All variants showcase (exactly matching Figma)
export const AllVariants: Story = {
  args: {
    children: 'Label',
  },
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="normal">Label</Badge>
      <Badge variant="danger">Label</Badge>
      <Badge variant="success">Label</Badge>
      <Badge variant="warning">Label</Badge>
      <Badge variant="neutral">Label</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available badge variants displayed together, exactly matching Figma design.',
      },
    },
  },
};

// With icons (exactly matching Figma)
export const WithIcons: Story = {
  args: {
    children: 'Label',
  },
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="normal" icon="add">Label</Badge>
      <Badge variant="danger" icon="add">Label</Badge>
      <Badge variant="success" icon="add">Label</Badge>
      <Badge variant="warning" icon="add">Label</Badge>
      <Badge variant="neutral" icon="add">Label</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges with leading icons, matching Figma interactive badge variants.',
      },
    },
  },
};

// Interactive badges with hover states
export const Interactive: Story = {
  args: {
    children: 'Interactive',
  },
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="normal" onClick={() => alert('Normal clicked!')}>
        Interactive
      </Badge>
      <Badge variant="danger" onClick={() => alert('Danger clicked!')}>
        Interactive
      </Badge>
      <Badge variant="success" onClick={() => alert('Success clicked!')}>
        Interactive
      </Badge>
      <Badge variant="warning" onClick={() => alert('Warning clicked!')}>
        Interactive
      </Badge>
      <Badge variant="neutral" onClick={() => alert('Neutral clicked!')}>
        Interactive
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive badges with hover states and click handlers, matching Figma interactive badge designs.',
      },
    },
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