import type { Meta, StoryObj } from '@storybook/react';
import { SimpleColumnLayout } from './SimpleColumnLayout';

const meta: Meta<typeof SimpleColumnLayout> = {
  title: 'Molecules/SimpleColumnLayout',
  component: SimpleColumnLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof SimpleColumnLayout>;

const rows = [
  {
    left: { title: 'Text', subtitle: 'Text' },
    right: { title: 'Text', subtitle: 'Text', align: 'end' as const },
  },
  {
    left: { title: 'Text', subtitle: 'Text' },
    right: { title: 'Text', subtitle: 'Text', align: 'end' as const },
  },
  {
    left: { title: 'Text', subtitle: 'Text' },
    right: { title: 'Text', subtitle: 'Text', align: 'end' as const },
  },
  {
    left: { title: 'Text', subtitle: 'Text' },
    right: { title: 'Text', subtitle: 'Text', align: 'end' as const },
  },
  {
    left: { title: 'Text', subtitle: 'Text' },
    right: { title: 'Text', subtitle: 'Text', align: 'end' as const },
  },
  {
    left: { title: 'Text', subtitle: 'Text' },
    right: { title: 'Text', subtitle: 'Text', align: 'end' as const },
  },
];

export const Default: Story = {
  args: {
    rows,
  },
};

export const NoStripes: Story = {
  args: {
    rows,
    striped: false,
  },
};

