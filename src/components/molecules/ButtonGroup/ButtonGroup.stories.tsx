import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup } from './ButtonGroup';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Molecules/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const PrimarySet: Story = {
  args: {
    buttons: [
      {
        id: 'text',
        label: 'Text',
        variant: 'text',
        icon: 'add',
        iconPosition: 'leading',
      },
      {
        id: 'secondary',
        label: 'Secondary',
        variant: 'secondary',
        icon: 'add',
        iconPosition: 'leading',
      },
      {
        id: 'primary',
        label: 'Primary',
        variant: 'primary',
        icon: 'add',
        iconPosition: 'leading',
      },
    ],
  },
};

export const AllVariants: Story = {
  args: {
    buttons: [
      {
        id: 'primary',
        label: 'Primary',
        variant: 'primary',
      },
      {
        id: 'secondary',
        label: 'Secondary',
        variant: 'secondary',
      },
      {
        id: 'tertiary',
        label: 'Tertiary',
        variant: 'tertiary',
      },
      {
        id: 'destructive',
        label: 'Destructive',
        variant: 'destructive',
      },
      {
        id: 'text',
        label: 'Text',
        variant: 'text',
      },
      {
        id: 'link',
        label: 'Link',
        variant: 'link',
      },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    buttons: [
      {
        id: 'add',
        label: 'Add',
        variant: 'primary',
        icon: 'add',
        iconPosition: 'leading',
      },
      {
        id: 'edit',
        label: 'Edit',
        variant: 'secondary',
        icon: 'edit',
        iconPosition: 'leading',
      },
      {
        id: 'delete',
        label: 'Delete',
        variant: 'destructive',
        icon: 'delete',
        iconPosition: 'leading',
      },
    ],
  },
};

export const EqualWidth: Story = {
  args: {
    equalWidth: true,
    style: { width: 320 },
    buttons: [
      {
        id: 'text',
        label: 'Text',
        variant: 'text',
        icon: 'add',
        iconPosition: 'leading',
      },
      {
        id: 'secondary',
        label: 'Secondary',
        variant: 'secondary',
        icon: 'add',
        iconPosition: 'leading',
      },
      {
        id: 'primary',
        label: 'Primary',
        variant: 'primary',
        icon: 'add',
        iconPosition: 'leading',
      },
    ],
  },
};

export const WithDisabled: Story = {
  args: {
    buttons: [
      {
        id: 'enabled',
        label: 'Enabled',
        variant: 'primary',
      },
      {
        id: 'disabled',
        label: 'Disabled',
        variant: 'secondary',
        disabled: true,
      },
      {
        id: 'enabled2',
        label: 'Enabled',
        variant: 'tertiary',
      },
    ],
  },
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Small</h3>
        <ButtonGroup
          buttons={[
            { id: 'sm1', label: 'Small', variant: 'primary', size: 'sm' },
            { id: 'sm2', label: 'Small', variant: 'secondary', size: 'sm' },
            { id: 'sm3', label: 'Small', variant: 'tertiary', size: 'sm' },
          ]}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Medium (Default)</h3>
        <ButtonGroup
          buttons={[
            { id: 'md1', label: 'Medium', variant: 'primary', size: 'md' },
            { id: 'md2', label: 'Medium', variant: 'secondary', size: 'md' },
            { id: 'md3', label: 'Medium', variant: 'tertiary', size: 'md' },
          ]}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Large</h3>
        <ButtonGroup
          buttons={[
            { id: 'lg1', label: 'Large', variant: 'primary', size: 'lg' },
            { id: 'lg2', label: 'Large', variant: 'secondary', size: 'lg' },
            { id: 'lg3', label: 'Large', variant: 'tertiary', size: 'lg' },
          ]}
        />
      </div>
    </div>
  ),
};

export const Wrapped: Story = {
  args: {
    wrap: true,
    style: { width: 200 },
    buttons: [
      {
        id: 'btn1',
        label: 'Button One',
        variant: 'primary',
      },
      {
        id: 'btn2',
        label: 'Button Two',
        variant: 'secondary',
      },
      {
        id: 'btn3',
        label: 'Button Three',
        variant: 'tertiary',
      },
      {
        id: 'btn4',
        label: 'Button Four',
        variant: 'text',
      },
    ],
  },
};

