import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Spacer, type SpacerSize } from './Spacer';

const meta: Meta<typeof Spacer> = {
  title: 'Atoms/Spacer',
  component: Spacer,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A spacing component for creating consistent vertical or horizontal spacing between elements.',
      },
    },
  },
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
    <div className="flex flex-col border border-dashed border-gray-300 rounded p-4">
      <div className="bg-blue-100 p-3 rounded text-center text-sm">Above Element</div>
      <div className="bg-yellow-200 flex items-center justify-center">
        <Spacer {...args} />
      </div>
      <div className="bg-blue-100 p-3 rounded text-center text-sm">Below Element</div>
    </div>
  ),
};

export const Horizontal: Story = {
  args: {
    size: 'x4',
    horizontal: true,
  },
  render: (args) => (
    <div className="flex items-center border border-dashed border-gray-300 rounded p-4">
      <div className="bg-blue-100 p-3 rounded text-center text-sm">Left</div>
      <div className="bg-yellow-200 h-10 flex items-center">
        <Spacer {...args} />
      </div>
      <div className="bg-blue-100 p-3 rounded text-center text-sm">Right</div>
    </div>
  ),
};

// All sizes showcase
export function AllSizes() {
  const sizes: SpacerSize[] = ['x1', 'x2', 'x3', 'x4', 'x6', 'x8', 'x12'];
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
    <div className="space-y-4 p-6">
      <h3 className="text-lg font-semibold mb-4">Spacer Sizes</h3>
      {sizes.map((size) => (
        <div key={size} className="flex items-center gap-4">
          <span className="w-16 text-sm font-medium">{size}</span>
          <span className="w-12 text-xs text-gray-500">({sizeMap[size]})</span>
          <div className="flex flex-col flex-1 border border-dashed border-gray-300 rounded">
            <div className="bg-blue-100 p-2 text-xs text-center">Above</div>
            <div className="bg-yellow-200">
              <Spacer size={size} />
            </div>
            <div className="bg-blue-100 p-2 text-xs text-center">Below</div>
          </div>
        </div>
      ))}
    </div>
  );
}
