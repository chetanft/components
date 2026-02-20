import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup, ButtonGroupItem } from './ButtonGroup';
import { Button } from '../../atoms/Button/Button';

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

/** @deprecated Use composable API instead. */
export const LegacyDefault: Story = {
  args: {
    buttons: [
      { id: 'text', label: 'Text', variant: 'text' },
      { id: 'secondary', label: 'Secondary', variant: 'secondary' },
      { id: 'primary', label: 'Primary', variant: 'primary' },
    ],
  },
};

// All Variants showcase
/** @deprecated Use composable API instead. */
export function LegacyAllVariants() {
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
/** @deprecated Use composable API instead. */
export const LegacyWithIcons: Story = {
  args: {
    buttons: [
      { id: 'add', label: 'Add', variant: 'primary', icon: 'add', iconPosition: 'leading' },
      { id: 'edit', label: 'Edit', variant: 'secondary', icon: 'edit', iconPosition: 'leading' },
      { id: 'delete', label: 'Delete', variant: 'destructive', icon: 'delete', iconPosition: 'leading' },
    ],
  },
};

// With Disabled - uses story args format
/** @deprecated Use composable API instead. */
export const LegacyWithDisabled: Story = {
  args: {
    buttons: [
      { id: 'enabled', label: 'Enabled', variant: 'primary' },
      { id: 'disabled', label: 'Disabled', variant: 'secondary', disabled: true },
      { id: 'enabled2', label: 'Enabled', variant: 'secondary' },
    ],
  },
};

// Composable API Examples
export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <ButtonGroupItem>
        <Button variant="text">Text</Button>
      </ButtonGroupItem>
      <ButtonGroupItem>
        <Button variant="secondary">Secondary</Button>
      </ButtonGroupItem>
      <ButtonGroupItem>
        <Button variant="primary">Primary</Button>
      </ButtonGroupItem>
    </ButtonGroup>
  ),
};

export const EqualWidth: Story = {
  render: () => (
    <ButtonGroup equalWidth>
      <ButtonGroupItem>
        <Button variant="text" className="w-full">Cancel</Button>
      </ButtonGroupItem>
      <ButtonGroupItem>
        <Button variant="secondary" className="w-full">Save Draft</Button>
      </ButtonGroupItem>
      <ButtonGroupItem>
        <Button variant="primary" className="w-full">Submit</Button>
      </ButtonGroupItem>
    </ButtonGroup>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <ButtonGroup>
      <ButtonGroupItem>
        <Button variant="primary" icon="add" iconPosition="leading">Add</Button>
      </ButtonGroupItem>
      <ButtonGroupItem>
        <Button variant="secondary" icon="edit" iconPosition="leading">Edit</Button>
      </ButtonGroupItem>
      <ButtonGroupItem>
        <Button variant="destructive" icon="delete" iconPosition="leading">Delete</Button>
      </ButtonGroupItem>
    </ButtonGroup>
  ),
};

export const Wrapped: Story = {
  render: () => (
    <ButtonGroup wrap className="max-w-md">
      <ButtonGroupItem>
        <Button variant="secondary" size="sm">Option 1</Button>
      </ButtonGroupItem>
      <ButtonGroupItem>
        <Button variant="secondary" size="sm">Option 2</Button>
      </ButtonGroupItem>
      <ButtonGroupItem>
        <Button variant="secondary" size="sm">Option 3</Button>
      </ButtonGroupItem>
      <ButtonGroupItem>
        <Button variant="secondary" size="sm">Option 4</Button>
      </ButtonGroupItem>
      <ButtonGroupItem>
        <Button variant="secondary" size="sm">Option 5</Button>
      </ButtonGroupItem>
    </ButtonGroup>
  ),
};
