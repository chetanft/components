import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';

const meta = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Icon component with proper alignment and centering. Fixed issues with cropping and misalignment.',
      },
    },
  },
  argTypes: {
    name: {
      control: 'select',
      options: ['add', 'edit', 'delete', 'download', 'preview', 'refresh', 'cross-icon'],
      description: 'Icon name',
    },
    size: {
      control: 'number',
      description: 'Icon size in pixels',
    },
    color: {
      control: 'color',
      description: 'Icon color',
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'edit',
    size: 16,
    color: 'currentColor',
  },
};

export const IconAlignment = () => (
  <div className="space-y-8">
    <div>
      <h3 className="text-lg font-semibold mb-4">Icon Alignment Test</h3>
      <p className="text-sm text-gray-600 mb-6">
        Testing that icons are properly centered and not cropped in their containers.
      </p>
    </div>
    
    {/* Size variations */}
    <div>
      <h4 className="text-md font-medium mb-3">Size Variations</h4>
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 bg-gray-100 border border-gray-300 flex items-center justify-center">
          <Icon name="edit" size={14} />
        </div>
        <div className="w-11 h-11 bg-gray-100 border border-gray-300 flex items-center justify-center">
          <Icon name="edit" size={16} />
        </div>
        <div className="w-13 h-13 bg-gray-100 border border-gray-300 flex items-center justify-center">
          <Icon name="edit" size={20} />
        </div>
      </div>
      <div className="text-xs text-gray-500 mt-2">
        Icons in containers showing proper centering
      </div>
    </div>
    
    {/* Commonly used icons */}
    <div>
      <h4 className="text-md font-medium mb-3">FileCard Icons</h4>
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 bg-gray-100 border border-gray-300 rounded-full flex items-center justify-center">
          <Icon name="download" size={16} />
        </div>
        <div className="w-11 h-11 bg-gray-100 border border-gray-300 rounded-full flex items-center justify-center">
          <Icon name="preview" size={16} />
        </div>
        <div className="w-11 h-11 bg-gray-100 border border-gray-300 rounded-full flex items-center justify-center">
          <Icon name="refresh" size={16} />
        </div>
        <div className="w-11 h-11 bg-gray-100 border border-gray-300 rounded-full flex items-center justify-center">
          <Icon name="delete" size={16} />
        </div>
        <div className="w-11 h-11 bg-gray-100 border border-gray-300 rounded-full flex items-center justify-center">
          <Icon name="cross-icon" size={16} />
        </div>
      </div>
      <div className="text-xs text-gray-500 mt-2">
        Icons used in FileCard action buttons
      </div>
    </div>
    
    {/* Color inheritance test */}
    <div>
      <h4 className="text-md font-medium mb-3">Color Inheritance</h4>
      <div className="flex items-center gap-4">
        <div className="text-blue-500">
          <Icon name="add" size={20} />
        </div>
        <div className="text-red-500">
          <Icon name="delete" size={20} />
        </div>
        <div className="text-green-500">
          <Icon name="check" size={20} />
        </div>
      </div>
      <div className="text-xs text-gray-500 mt-2">
        Icons should inherit color from parent elements
      </div>
    </div>
  </div>
);

export const AllIcons = () => {
  const commonIcons = [
    'add', 'edit', 'delete', 'download', 'preview', 'refresh', 'cross-icon',
    'chevron-left', 'chevron-right', 'chevron-up', 'chevron-down',
    'check', 'search', 'more', 'share', 'copy'
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">All Common Icons</h3>
        <p className="text-sm text-gray-600 mb-6">
          Grid of commonly used icons showing proper alignment and sizing.
        </p>
      </div>
      
      <div className="grid grid-cols-8 gap-4">
        {commonIcons.map((iconName) => (
          <div key={iconName} className="flex flex-col items-center gap-2">
            <div className="w-11 h-11 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center">
              <Icon name={iconName as any} size={16} />
            </div>
            <span className="text-xs text-gray-500 text-center">{iconName}</span>
          </div>
        ))}
      </div>
    </div>
  );
}; 