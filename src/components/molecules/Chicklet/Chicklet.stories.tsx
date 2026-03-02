import type { Meta, StoryObj } from '@storybook/react';
import Chicklet from './Chicklet';

const meta: Meta<typeof Chicklet> = {
  title: 'Molecules/Chicklet',
  component: Chicklet,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A compact label element (chicklet/chip) used for tags, filters, and selections. Supports rounded and rectangular variants.',
      },
    },
    explorer: {
      mode: 'matrix' as const,
      behavior: 'inline' as const,
      previewMode: 'inline' as const,
      rows: [
        {
          id: 'style',
          label: 'Style',
          scenarios: [
            { id: 'default', label: 'Default', story: 'Default' as const },
            { id: 'rounded', label: 'Rounded', story: 'Rounded' as const },
            { id: 'bordered', label: 'Bordered', story: 'Bordered' as const },
            { id: 'rounded-bordered', label: 'Rounded Bordered', story: 'RoundedBordered' as const },
          ],
        },
        {
          id: 'state',
          label: 'State',
          scenarios: [
            { id: 'default', label: 'Default', story: 'Default' as const },
            { id: 'closable', label: 'Closable', story: 'Closable' as const },
            { id: 'disabled', label: 'Disabled', story: 'Disabled' as const },
            { id: 'closable-disabled', label: 'Closable Disabled', story: 'ClosableDisabled' as const },
          ],
        },
      ],
      defaultRowId: 'style' as const,
      defaultScenarioId: 'default' as const,
      supportsGlass: true,
    },
  },
  args: {
    glass: true,
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['rectangular', 'rounded'],
    },
    glass: {
      control: 'select',
      options: [false, true, 'subtle', 'prominent'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chicklet>;

export const Default: Story = {
  args: {
    label: 'Chicklet',
  },
};

export const Rounded: Story = {
  args: {
    label: 'Chicklet',
    variant: 'rounded',
  },
};

export const Bordered: Story = {
  args: {
    label: 'Chicklet',
    bordered: true,
  },
};

export const RoundedBordered: Story = {
  args: {
    label: 'Chicklet',
    variant: 'rounded',
    bordered: true,
  },
};

export const Closable: Story = {
  args: {
    label: 'Chicklet',
    onClose: () => {},
  },
};

export const Disabled: Story = {
  args: {
    label: 'Chicklet',
    disabled: true,
  },
};

export const ClosableDisabled: Story = {
  args: {
    label: 'Chicklet',
    onClose: () => {},
    disabled: true,
  },
};

export const Colored: Story = {
  args: {
    label: 'Chicklet',
    color: '#8B5CF6',
  },
};
