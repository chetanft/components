import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup } from './ButtonGroup';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Molecules/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Button group component for grouping related actions together.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  args: {
    buttons: [
      { id: 'text', label: 'Text', variant: 'text' },
      { id: 'secondary', label: 'Secondary', variant: 'secondary' },
      { id: 'primary', label: 'Primary', variant: 'primary' },
    ],
  },
};

// All Variants showcase
export function AllVariants() {
  return (
    <div className="space-y-4 p-6">
      <div>
        <p className="text-sm font-medium mb-2">Primary Buttons</p>
        <ButtonGroup
          buttons={[
            { id: 'p1', label: 'Action 1', variant: 'primary' },
            { id: 'p2', label: 'Action 2', variant: 'primary' },
          ]}
        />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Secondary Buttons</p>
        <ButtonGroup
          buttons={[
            { id: 's1', label: 'Action 1', variant: 'secondary' },
            { id: 's2', label: 'Action 2', variant: 'secondary' },
          ]}
        />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Mixed Variants</p>
        <ButtonGroup
          buttons={[
            { id: 'm1', label: 'Cancel', variant: 'text' },
            { id: 'm2', label: 'Save', variant: 'secondary' },
            { id: 'm3', label: 'Submit', variant: 'primary' },
          ]}
        />
      </div>
    </div>
  );
}

// With Icons - uses sampleButtons from registry
export const WithIcons: Story = {
  args: {
    buttons: [
      { id: 'add', label: 'Add', variant: 'primary', icon: 'add', iconPosition: 'leading' },
      { id: 'edit', label: 'Edit', variant: 'secondary', icon: 'edit', iconPosition: 'leading' },
      { id: 'delete', label: 'Delete', variant: 'destructive', icon: 'delete', iconPosition: 'leading' },
    ],
  },
};

// With Disabled - uses story args format
export const WithDisabled: Story = {
  args: {
    buttons: [
      { id: 'enabled', label: 'Enabled', variant: 'primary' },
      { id: 'disabled', label: 'Disabled', variant: 'secondary', disabled: true },
      { id: 'enabled2', label: 'Enabled', variant: 'tertiary' },
    ],
  },
};
