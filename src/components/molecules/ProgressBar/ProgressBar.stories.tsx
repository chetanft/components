import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar, Progress } from './ProgressBar';
import { useState, useEffect } from 'react';

const meta: Meta<typeof ProgressBar> = {
  title: 'Molecules/Progress',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Progress indicator with line, circle, and dashboard types. Built with FT Design System tokens.',
      },
    },
    explorer: {
                                                                                                                                                                                                                                                                                                                                                                                                inspector: {
                                                                                                                                                                                                  enabled: true,
                                                                                                                                                                                                  defaultMode: 'token-spacing' as const,
                                                                                                                                                                                                  spacingHints: {
                                                                                                                                                                                                    outerXToken: 'x6',
                                                                                                                                                                                                    outerYToken: 'x3',
                                                                                                                                                                                                    innerGapToken: 'x2',
                                                                                                                                                                                                  },
                                                                                                                                                                                                },
      mode: 'matrix' as const,
      baseStory: 'ExplorerBase',
      behavior: 'inline' as const,
      previewMode: 'inline' as const,
      defaultRowId: 'type',
      defaultScenarioId: 'default',
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase' as const, args: { value: 50, variant: 'primary', type: 'line' } },
            { id: 'line', label: 'Line', story: 'ExplorerBase' as const, args: { type: 'line', steps: undefined } },
            { id: 'circle', label: 'Circle', story: 'ExplorerBase' as const, args: { type: 'circle', width: 96 } },
            { id: 'dashboard', label: 'Dashboard', story: 'ExplorerBase' as const, args: { type: 'dashboard', width: 96 } },
            { id: 'steps', label: 'Steps', story: 'ExplorerBase' as const, args: { type: 'line', steps: 5 } },
          ],
        },
        {
          id: 'style',
          label: 'Style',
          scenarios: [
            { id: 'primary', label: 'Primary', story: 'ExplorerBase' as const, args: { variant: 'primary' } },
            { id: 'success', label: 'Success', story: 'ExplorerBase' as const, args: { variant: 'success' } },
            { id: 'warning', label: 'Warning', story: 'ExplorerBase' as const, args: { variant: 'warning' } },
            { id: 'danger', label: 'Danger', story: 'ExplorerBase' as const, args: { variant: 'danger' } },
            { id: 'active', label: 'Active', story: 'ExplorerBase' as const, args: { variant: 'active' } },
          ],
        },
        {
          id: 'state',
          label: 'State',
          scenarios: [
            { id: 'not-started', label: 'Not Started', story: 'ExplorerBase' as const, args: { value: 0 } },
            { id: 'in-progress', label: 'In Progress', story: 'ExplorerBase' as const, args: { value: 23 } },
            { id: 'completed', label: 'Completed', story: 'ExplorerBase' as const, args: { value: 100 } },
          ],
        },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['line', 'circle', 'dashboard'],
    },
    variant: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger', 'active'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const ExplorerBase: Story = {
  args: {
    value: 50,
    variant: 'primary',
    className: 'w-[300px]',
    type: 'line',
  },
  render: (args: any) => (
    <div className={args.type === 'line' ? 'w-[300px]' : ''}>
      <Progress
        value={args.value as number}
        variant={args.variant as any}
        type={args.type as any}
        className={args.className as string}
        steps={args.steps as any}
        width={args.width as any}
      />
    </div>
  ),
};

export const Default: Story = {
  args: {
    value: 50,
    className: 'w-[300px]',
  },
};

export const LineProgress: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <Progress value={30} />
      <Progress value={50} variant="success" />
      <Progress value={70} variant="warning" />
      <Progress value={100} variant="danger" />
    </div>
  ),
};

export const DocsPrimaryVariant: Story = {
  args: {
    value: 50,
    variant: 'primary',
    className: 'w-[300px]',
  },

  parameters: { docsOnly: true },
}