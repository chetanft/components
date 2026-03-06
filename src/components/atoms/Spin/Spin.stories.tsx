import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Spin } from './Spin';

const meta: Meta<typeof Spin> = {
  title: 'Atoms/Spin',
  component: Spin,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Spinner',
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
      behavior: 'inline',
      previewMode: 'inline' as const,
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: { variant: 'default' } },
            { id: 'with-tip', label: 'WithTip', story: 'ExplorerBase', args: { variant: 'with-tip' } },
            { id: 'with-content', label: 'WithContent', story: 'ExplorerBase', args: { variant: 'with-content' } },
          ],
        },
        {
          id: 'state',
          label: 'State',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: { variant: 'default' } },
            { id: 'delayed', label: 'Delayed', story: 'ExplorerBase', args: { variant: 'delayed' } },
          ],
        },
      ],
      defaultRowId: 'type',
      defaultScenarioId: 'default',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    spinning: {
      control: 'boolean',
    },
    tip: {
      control: 'text',
    },
    delay: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spin>;

export const ExplorerBase: Story = {
  render: (args: any) => {
    const variant = args.variant ?? 'default';
    const syncKey = JSON.stringify({ variant });

    if (variant === 'with-content') {
      return (
        <div key={syncKey}>
          <Spin spinning tip="Loading data...">
            <div className="p-8 bg-[var(--bg-secondary)] rounded-lg">
              <h3 className="text-lg font-semibold text-[var(--primary)] mb-2">
                Content Title
              </h3>
              <p className="text-[var(--secondary)]">
                This content will be dimmed while loading.
              </p>
            </div>
          </Spin>
        </div>
      );
    }

    if (variant === 'with-tip') {
      return (
        <div key={syncKey}>
          <Spin spinning tip="Loading..." size="lg" />
        </div>
      );
    }

    if (variant === 'delayed') {
      return (
        <div key={syncKey}>
          <Spin spinning delay={1000} tip="This appears after 1 second" size="lg" />
        </div>
      );
    }

    // default
    return (
      <div key={syncKey}>
        <Spin spinning />
      </div>
    );
  },
};

export const Default: Story = {
  args: {
    spinning: true,
  },
};

export const DocsSizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="text-center">
        <Spin size="sm" />
        <p className="mt-2 text-[var(--tertiary)]" style={{ fontSize: 'var(--font-size-sm-rem)' }}>
          {/* 14px → 1rem (responsive) */}
          Small
        </p>
      </div>
      <div className="text-center">
        <Spin size="md" />
        <p className="mt-2 text-[var(--tertiary)]" style={{ fontSize: 'var(--font-size-sm-rem)' }}>
          {/* 14px → 1rem (responsive) */}
          Medium
        </p>
      </div>
      <div className="text-center">
        <Spin size="lg" />
        <p className="mt-2 text-[var(--tertiary)]" style={{ fontSize: 'var(--font-size-sm-rem)' }}>
          {/* 14px → 1rem (responsive) */}
          Large
        </p>
      </div>
      <div className="text-center">
        <Spin size="xl" />
        <p className="mt-2 text-[var(--tertiary)]" style={{ fontSize: 'var(--font-size-sm-rem)' }}>
          {/* 14px → 1rem (responsive) */}
          XLarge
        </p>
      </div>
    </div>
  ),

  parameters: { docsOnly: true },
}