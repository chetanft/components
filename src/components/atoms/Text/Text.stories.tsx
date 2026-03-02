import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Text } from './Text';

const meta = {
  title: 'Atoms/Text',
  component: Text,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible text component with configurable icons and sub-text. Supports various sizes and icon positions.',
      },
    },
    explorer: {
      mode: 'matrix' as const,
      behavior: 'inline' as const,
      previewMode: 'inline' as const,
      baseStory: 'ExplorerBase',
      defaultRowId: 'size',
      defaultScenarioId: 'md',
      rows: [
        {
          id: 'size',
          label: 'Size',
          scenarios: [
            { id: 'sm', label: 'SM', story: 'ExplorerBase', args: { size: 'sm' } },
            { id: 'md', label: 'MD', story: 'ExplorerBase', args: { size: 'md' } },
            { id: 'lg', label: 'LG', story: 'ExplorerBase', args: { size: 'lg' } },
            { id: 'xl', label: 'XL', story: 'ExplorerBase', args: { size: 'xl' } },
            { id: 'xx', label: 'XX', story: 'ExplorerBase', args: { size: 'xx' } },
          ],
        },
        {
          id: 'content',
          label: 'Content',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: {} },
            { id: 'sub-text', label: 'Sub Text', story: 'ExplorerBase', args: { subText: true } },
            { id: 'leading-icon', label: 'Leading Icon', story: 'ExplorerBase', args: { leadingIcon: true } },
            { id: 'trailing-icon', label: 'Trailing Icon', story: 'ExplorerBase', args: { trailingIcon: true } },
          ],
        },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', 'xx'],
      description: 'Text size variant'
    },
    subText: {
      control: { type: 'boolean' },
      description: 'Whether to show sub text'
    },
    leadingIcon: {
      control: { type: 'boolean' },
      description: 'Whether to show leading icon'
    },
    trailingIcon: {
      control: { type: 'boolean' },
      description: 'Whether to show trailing icon'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    }
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExplorerBase: Story = {
  render: (args: any) => {
    const size = args.size ?? 'md';
    const subText = Boolean(args.subText);
    const leadingIcon = Boolean(args.leadingIcon);
    const trailingIcon = Boolean(args.trailingIcon);
    return (
      <Text
        size={size}
        subText={subText}
        leadingIcon={leadingIcon}
        trailingIcon={trailingIcon}
      />
    );
  },
};

// Default text
export const Default: Story = {
  args: {
    size: 'md',
    subText: false,
    leadingIcon: false,
    trailingIcon: false,
  },
};

// Small size
export const DocsSmall: Story = {
  args: {
    size: 'sm',
    subText: false,
    leadingIcon: false,
    trailingIcon: false,
  },

  parameters: { docsOnly: true },
}