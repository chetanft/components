import type { Meta, StoryObj } from '@storybook/react';
import { Spin } from './Spin';

const meta: Meta<typeof Spin> = {
  title: 'Atoms/Spin',
  component: Spin,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '🆕 NEW: Loading spinner component built with FT Design System tokens.',
      },
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

export const Default: Story = {
  args: {
    spinning: true,
  },
};

export const Sizes: Story = {
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
};

export const WithTip: Story = {
  args: {
    spinning: true,
    tip: 'Loading...',
    size: 'lg',
  },
};

export const WithContent: Story = {
  render: () => (
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
  ),
};

export const DelayedSpin: Story = {
  args: {
    spinning: true,
    delay: 1000,
    tip: 'This appears after 1 second',
    size: 'lg',
  },
};

