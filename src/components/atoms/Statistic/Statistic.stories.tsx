import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Statistic, StatisticTitle, StatisticValue } from './index';

const meta = {
  title: 'Atoms/Statistic',
  component: Statistic,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A statistic component for displaying numerical values with labels. Supports different label placements.',
      },
    },
    explorer: {
      mode: 'matrix' as const,
      behavior: 'inline' as const,
      previewMode: 'inline' as const,
      defaultRowId: 'type',
      defaultScenarioId: 'default',
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase' },
            { id: 'label-on-top', label: 'Label On Top', story: 'ExplorerBase', args: { labelPlacement: 'Top' } },
          ],
        },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    labelPlacement: {
      control: { type: 'select' },
      options: ['Below', 'Top'],
      description: 'Label placement relative to value'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    }
  },
} satisfies Meta<typeof Statistic>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExplorerBase: Story = {
  render: (args: any) => (
    <Statistic labelPlacement={args.labelPlacement}>
      {args.labelPlacement === 'Top' && <StatisticTitle>Total Users</StatisticTitle>}
      <StatisticValue>1,234</StatisticValue>
      {args.labelPlacement !== 'Top' && <StatisticTitle>Total Users</StatisticTitle>}
    </Statistic>
  ),
};

// Composable API Examples
export const Default: Story = {
  render: () => (
    <Statistic>
      <StatisticValue>1,234</StatisticValue>
      <StatisticTitle>Total Users</StatisticTitle>
    </Statistic>
  ),
};

export const DocsVariants: Story = {
  render: () => (
    <div className="flex gap-8">
      <Statistic>
        <StatisticValue>1,234</StatisticValue>
        <StatisticTitle>Label Below</StatisticTitle>
      </Statistic>
      <Statistic labelPlacement="Top">
        <StatisticTitle>Label On Top</StatisticTitle>
        <StatisticValue>$45,678</StatisticValue>
      </Statistic>
    </div>
  ),

  parameters: { docsOnly: true },
}