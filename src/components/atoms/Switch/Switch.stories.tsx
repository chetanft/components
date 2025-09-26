import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Switch } from './Switch';

const meta = {
  title: 'Atoms/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A toggle switch component with exact Figma specifications. Supports different sizes and states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the switch'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
      description: 'Size of the switch'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled'
    },
    checked: {
      control: 'boolean',
      description: 'Whether the switch is checked/on'
    }
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default switch
export const Default: Story = {
  args: {
    label: 'Enable notifications',
    size: 'md',
  },
};

// Small size
export const Small: Story = {
  args: {
    label: 'Small switch',
    size: 'sm',
  },
};

// Checked state
export const Checked: Story = {
  args: {
    label: 'Enabled feature',
    checked: true,
    size: 'md',
  },
};

// Without label
export const WithoutLabel: Story = {
  args: {
    size: 'md',
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: 'Disabled switch',
    disabled: true,
    size: 'md',
  },
};

// Disabled and checked
export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked switch',
    disabled: true,
    checked: true,
    size: 'md',
  },
};

// All states showcase
export const AllStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="font-semibold">Normal States</h3>
        <div className="space-y-2">
          <Switch label="Off state" />
          <Switch label="On state" checked />
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="font-semibold">Sizes</h3>
        <div className="space-y-2">
          <Switch label="Small switch" size="sm" />
          <Switch label="Medium switch" size="md" />
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="font-semibold">Without Labels</h3>
        <div className="flex items-center gap-4">
          <Switch size="sm" />
          <Switch size="md" />
          <Switch size="md" checked />
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="font-semibold">Disabled States</h3>
        <div className="space-y-2">
          <Switch label="Disabled off" disabled />
          <Switch label="Disabled on" disabled checked />
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="font-semibold">Interactive Example</h3>
        <div className="space-y-2">
          <Switch label="Dark mode" />
          <Switch label="Email notifications" checked />
          <Switch label="Push notifications" />
          <Switch label="Auto-save" checked />
        </div>
      </div>
    </div>
  ),
};
