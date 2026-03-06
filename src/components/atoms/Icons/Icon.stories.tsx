import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon, type IconName } from './Icon';
import { iconMap } from './iconMap';

const meta = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Icon component with proper alignment and centering. Fixed issues with cropping and misalignment.',
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
      previewMode: 'inline' as const,
      rows: [
        {
          id: 'category',
          label: 'Type',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: { name: 'check', size: 16, color: 'currentColor' } },
            { id: 'navigation', label: 'Navigation', story: 'ExplorerBase', args: { name: 'chevron-right' } },
            { id: 'action', label: 'Action', story: 'ExplorerBase', args: { name: 'edit' } },
            { id: 'status', label: 'Status', story: 'ExplorerBase', args: { name: 'success', color: '#22c55e' } },
          ],
        },
        {
          id: 'size',
          label: 'Size',
          scenarios: [
            { id: 'size-12', label: '12', story: 'ExplorerBase', args: { size: 12 } },
            { id: 'size-16', label: '16', story: 'ExplorerBase', args: { size: 16 } },
            { id: 'size-24', label: '24', story: 'ExplorerBase', args: { size: 24 } },
            { id: 'size-32', label: '32', story: 'ExplorerBase', args: { size: 32 } },
            { id: 'size-48', label: '48', story: 'ExplorerBase', args: { size: 48 } },
          ],
        },
        {
          id: 'style',
          label: 'Style',
          scenarios: [
            { id: 'colors', label: 'Colors', story: 'ExplorerBase', args: { name: 'star', size: 24, color: '#f59e0b' } },
            { id: 'brand', label: 'Brand', story: 'ExplorerBase', args: { name: 'ft-colour', size: 32 } },
          ],
        },
      ],
      defaultRowId: 'category',
      defaultScenarioId: 'default',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: Object.keys(iconMap) as IconName[],
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

export const ExplorerBase: Story = {
  args: {
    name: 'check',
    size: 16,
    color: 'currentColor',
  },
};

export const Default: Story = {
  args: {
    name: 'edit',
    size: 16,
    color: 'currentColor',
  },
};

export const DocsIconAlignment = () => (
  <div className="space-y-8">
    <div>
      <h3 className="text-lg font-semibold mb-4">Icon Alignment Test</h3>
      <p className="text-sm text-gray-600 mb-6">
        Testing that icons are properly centered and not cropped in their containers.
      </p>
    </div>

    {/* Size variations */}
    <div>
      <h4 className="text-base font-medium mb-3">Size Variations</h4>
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
      <h4 className="text-base font-medium mb-3">FileCard Icons</h4>
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
      <h4 className="text-base font-medium mb-3">Color Inheritance</h4>
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

export const DocsAllIcons = () => {
  const commonIcons = [
    'add', 'edit', 'delete', 'download', 'preview', 'refresh', 'cross-icon',
    'chevron-left', 'chevron-right', 'chevron-up', 'chevron-down',
    'check', 'search', 'more', 'share', 'copy',
    'success', 'tata', 'temperature-cold', 'temperature-default', 'temperature-hot', 'three-dot-menu', 'time', 'tracker', 'train'
  ];

  const twoToneIcons = [
    'dashboard', 'control-tower', 'my-trip', 'reports', 'indent',
    'add-trip', 'bulk-trip', 'truck', 'settlement',
    'strength-high', 'strength-medium', 'strength-low', 'strength-no-tracking',
    'planning', 'home'
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
              <Icon name={iconName as IconName} size={16} />
            </div>
            <span className="text-xs text-gray-500 text-center">{iconName}</span>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-4">Two-Tone Icons</h3>
        <p className="text-sm text-gray-600 mb-6">
          Icons with primary and secondary elements for visual hierarchy.
        </p>
      </div>

      <div className="grid grid-cols-8 gap-4">
        {twoToneIcons.map((iconName) => (
          <div key={iconName} className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center">
              <Icon name={iconName as IconName} size={24} />
            </div>
            <span className="text-xs text-gray-500 text-center">{iconName}</span>
          </div>
        ))}
      </div>
    </div>
  );
}; 