import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Skeleton, SkeletonText, SkeletonImage } from './index';

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
export const Default: Story = {
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
      source: {
        code: `<Skeleton>
  <SkeletonImage width={200} height={200} />
  <SkeletonText lines={3} />
</Skeleton>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

export const DocsVariants: Story = {
  render: () => (
    <div className="p-6 space-y-6">
      <div>
        <p className="text-sm font-medium mb-2">Text lines</p>
        <Skeleton>
          <SkeletonText lines={3} />
        </Skeleton>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Image (rectangular)</p>
        <Skeleton>
          <SkeletonImage width={200} height={120} />
        </Skeleton>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Image (circular)</p>
        <Skeleton>
          <SkeletonImage width={64} height={64} shape="circular" />
        </Skeleton>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Combined</p>
        <Skeleton>
          <div className="flex gap-4">
            <SkeletonImage width={80} height={80} shape="circular" />
            <div className="flex-1">
              <SkeletonText lines={2} />
            </div>
          </div>
        </Skeleton>
      </div>
    </div>
  ),

  parameters: {
    docsOnly: true,
    docs: {
      source: {
        code: `{/* Text lines */}
<Skeleton>
  <SkeletonText lines={3} />
</Skeleton>

{/* Image (rectangular) */}
<Skeleton>
  <SkeletonImage width={200} height={120} />
</Skeleton>

{/* Image (circular) */}
<Skeleton>
  <SkeletonImage width={64} height={64} shape="circular" />
</Skeleton>

{/* Combined */}
<Skeleton>
  <div className="flex gap-4">
    <SkeletonImage width={80} height={80} shape="circular" />
    <div className="flex-1">
      <SkeletonText lines={2} />
    </div>
  </div>
</Skeleton>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
}