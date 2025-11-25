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

// Interactive Demo - all variants shown together and interactable (FIRST per plan)
export function InteractiveDemo() {
  const [switch1, setSwitch1] = React.useState(false);
  const [switch2, setSwitch2] = React.useState(true);
  const [switch3, setSwitch3] = React.useState(false);
  const [switch4, setSwitch4] = React.useState(true);

  return (
    <div className="p-6 space-y-4">
      <h3 className="text-lg font-semibold mb-4">All Switch Variants - Interactive</h3>

      <div className="space-y-4">
        <div className="space-y-3">
          <h4 className="font-medium">Normal States</h4>
          <Switch
            label="Off state"
            checked={switch1}
            onChange={(e) => setSwitch1(e.target.checked)}
          />
          <Switch
            label="On state"
            checked={switch2}
            onChange={(e) => setSwitch2(e.target.checked)}
          />
        </div>

        <div className="space-y-3">
          <h4 className="font-medium">Small Size</h4>
          <Switch
            label="Small switch"
            size="sm"
            checked={switch3}
            onChange={(e) => setSwitch3(e.target.checked)}
          />
        </div>

        <div className="space-y-3">
          <h4 className="font-medium">Medium Size</h4>
          <Switch
            label="Medium switch"
            size="md"
            checked={switch4}
            onChange={(e) => setSwitch4(e.target.checked)}
          />
        </div>

        <div className="space-y-3">
          <h4 className="font-medium">Without Labels</h4>
          <div className="flex items-center gap-4">
            <Switch size="sm" />
            <Switch size="md" />
            <Switch size="md" defaultChecked />
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium">Disabled States</h4>
          <Switch label="Disabled off" disabled />
          <Switch label="Disabled on" disabled defaultChecked />
        </div>
      </div>
    </div>
  );
}

// Default switch (unchecked/off state)
export const Default: Story = {
  args: {
    label: 'Enable notifications',
    size: 'md',
  },
};

// Checked/on state
export const Checked: Story = {
  args: {
    label: 'Notifications enabled',
    size: 'md',
    checked: true,
  },
};

// Disabled unchecked state
export const DisabledUnchecked: Story = {
  args: {
    label: 'Feature unavailable',
    size: 'md',
    disabled: true,
  },
};

// Disabled checked state
export const DisabledChecked: Story = {
  args: {
    label: 'Always enabled',
    size: 'md',
    disabled: true,
    checked: true,
  },
};

// Without label
export const WithoutLabel: Story = {
  args: {
    size: 'md',
  },
};

// Normal States story - separate preview for normal states
export function NormalStates() {
  return (
    <div className="p-6 space-y-2">
      <Switch label="Off state" />
      <Switch label="On state" defaultChecked />
    </div>
  );
}

// Sizes story - separate preview for sizes
export function Sizes() {
  return (
    <div className="p-6 space-y-2">
      <Switch label="Small switch" size="sm" />
      <Switch label="Medium switch" size="md" />
    </div>
  );
}

// Without Labels story - separate preview for switches without labels
export function WithoutLabels() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-4">
        <Switch size="sm" />
        <Switch size="md" />
        <Switch size="md" defaultChecked />
      </div>
    </div>
  );
}

// Disabled States story - separate preview for disabled states
export function DisabledStates() {
  return (
    <div className="p-6 space-y-2">
      <Switch label="Disabled off" disabled />
      <Switch label="Disabled on" disabled defaultChecked />
    </div>
  );
}


