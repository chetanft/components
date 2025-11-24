import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Spacer, type SpacerSize } from './Spacer';

const meta: Meta<typeof Spacer> = {
  title: 'Atoms/Spacer',
  component: Spacer,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12'],
      description: 'Size of the spacer',
    },
    horizontal: {
      control: 'boolean',
      description: 'Whether the spacer is horizontal (width) or vertical (height)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spacer>;

export const Default: Story = {
  args: {
    size: 'x4',
  },
  render: (args) => (
    <div className="flex flex-col">
      <div className="bg-blue-200 p-2">Above</div>
      <Spacer {...args} />
      <div className="bg-blue-200 p-2">Below</div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => {
    const sizes: SpacerSize[] = ['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12'];
    const sizeMap: Record<SpacerSize, string> = {
      x1: '4px',
      x2: '8px',
      x3: '12px',
      x4: '16px',
      x5: '20px',
      x6: '24px',
      x7: '28px',
      x8: '32px',
      x9: '36px',
      x10: '40px',
      x11: '44px',
      x12: '48px',
    };

    return (
      <div className="space-y-4">
        {sizes.map((size) => (
          <div key={size} className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-20 text-sm text-gray-600">{size}</span>
              <span className="text-xs text-gray-500">({sizeMap[size]})</span>
            </div>
            <div className="bg-blue-200 p-2">Above</div>
            <Spacer size={size} />
            <div className="bg-blue-200 p-2">Below</div>
          </div>
        ))}
      </div>
    );
  },
};

export const Horizontal: Story = {
  args: {
    size: 'x4',
    horizontal: true,
  },
  render: (args) => (
    <div className="flex items-center">
      <div className="bg-blue-200 p-2">Left</div>
      <Spacer {...args} />
      <div className="bg-blue-200 p-2">Right</div>
    </div>
  ),
};

