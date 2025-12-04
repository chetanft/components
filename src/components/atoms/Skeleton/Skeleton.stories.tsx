import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Skeleton, SkeletonText, SkeletonImage, type SkeletonProps } from './index';

const meta = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Skeleton provides a loading placeholder for text and UI blocks using FT Design System tokens.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['text', 'circular', 'rectangular'],
      description: 'Shape of the skeleton placeholder',
    },
    animation: {
      control: 'radio',
      options: ['pulse', 'wave', 'none'],
      description: 'Animation style for the skeleton',
    },
  },
  args: {
    width: '240px',
    height: '16px',
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof Skeleton>;

// Composable API Examples (Recommended)
export const ComposableBasic: Story = {
  render: () => (
    <div className="p-6 space-y-4">
      <Skeleton>
        <SkeletonImage width={200} height={200} />
        <SkeletonText lines={3} />
      </Skeleton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '✅ **Composable API**: Use SkeletonImage and SkeletonText sub-components for flexible skeleton composition.',
      },
    },
  },
};

export const ComposableCard: Story = {
  render: () => (
    <div className="p-6">
      <Skeleton>
        <div className="flex gap-4">
          <SkeletonImage width={80} height={80} variant="circular" />
          <div className="flex-1 space-y-2">
            <SkeletonText lines={1} width="60%" />
            <SkeletonText lines={2} width="80%" />
          </div>
        </div>
      </Skeleton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Compose skeletons for complex layouts using SkeletonImage and SkeletonText.',
      },
    },
  },
};

export const ComposableList: Story = {
  render: () => (
    <div className="p-6 space-y-3">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i}>
          <div className="flex gap-3">
            <SkeletonImage width={48} height={48} variant="rectangular" />
            <div className="flex-1 space-y-2">
              <SkeletonText lines={1} width="40%" />
              <SkeletonText lines={1} width="60%" />
            </div>
          </div>
        </Skeleton>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use composable API to create skeleton lists.',
      },
    },
  },
};

// Mark deprecated examples
export const Default: Story = {
  args: {
    variant: 'rectangular',
    animation: 'pulse',
    className: 'w-60 h-4',
  },
  parameters: {
    docs: {
      description: {
        story: '⚠️ **Deprecated**: This uses the deprecated `variant`, `width`, and `height` props. Use the composable API with SkeletonImage and SkeletonText instead.',
      },
    },
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
    width: '200px',
  },
};

export const Circular: Story = {
  args: {
    variant: 'circular',
    width: '64px',
    height: '64px',
  },
};

const ShowcaseContent = (props: SkeletonProps) => (
  <div className="space-y-3">
    <div className="space-y-2">
      <Skeleton {...props} variant="text" width="60%" />
      <Skeleton {...props} variant="text" width="40%" animation="wave" />
    </div>
    <div className="flex items-center gap-4">
      <Skeleton {...props} variant="circular" width="48px" height="48px" />
      <div className="space-y-2 flex-1">
        <Skeleton {...props} width="80%" />
        <Skeleton {...props} width="65%" />
      </div>
    </div>
  </div>
);

export const Showcase: Story = {
  render: (args: SkeletonProps) => <ShowcaseContent {...args} />,
  args: {
    animation: 'pulse',
  },
};
