import React from 'react';
import type { Meta } from '@storybook/react';
import { Icon, type IconName } from '../components/atoms/Icons/Icon';

const meta = {
  title: 'Components/TwoToneIcons',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Two-tone icons with primary and secondary colors for visual hierarchy.',
      },
    },
  },
} satisfies Meta;

export default meta;

export const TwoToneIcons = () => {
  const twoToneIcons = [
    // Core navigation & management
    'my-trip',
    'reconciliation',
    'control-tower',
    'contracted-bill',
    'indent',
    'reports',
    'dashboard',

    // Vehicles & transport
    'truck',
    'settlement',

    // Signal strength
    'strength-high',
    'strength-medium',
    'strength-low',
    'strength-no-tracking',

    // Connectivity & data
    'sim',
    'notification',

    // Actions & utilities
    'add-trip',
    'bulk-trip',
    'upload-document',
    'part-truck-load',
    'planning',
    'home',
    'default-icon',
    'lock',

    // Status indicators
    'route-deviation',
    'diversion',
    'long-stoppage',
    'transit-delay',
    'tracking-interrupted',
    'detention-at-origin',
    'eway-bill-expired',
    'untracked'
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Two-Tone Icons ({twoToneIcons.length} total)</h3>
        <p className="text-sm text-gray-600 mb-6">
          Complete set of two-tone icons from Figma design. These icons use opacity variations (primary: 1.0, secondary: 0.4) to create visual hierarchy and depth.
        </p>
      </div>

      <div className="grid grid-cols-8 gap-4">
        {twoToneIcons.map((iconName) => (
          <div key={iconName} className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center">
              <Icon name={iconName as IconName} size={18} />
            </div>
            <div className="w-10 h-10 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center">
              <Icon name={iconName as IconName} size={18} color="white" />
            </div>
            <span className="text-xs text-gray-700 text-center leading-tight max-w-16">{iconName}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-base font-medium mb-3">Design Principles</h4>
          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
            <li>Primary elements use full opacity (1.0) for main actions</li>
            <li>Secondary elements use 0.4 opacity for contextual information</li>
            <li>Consistent 24×24 (var(--spacing-x6)) viewport for standard icons</li>
            <li>Variable sizes (18×18, 20×20) for status indicators</li>
          </ul>
        </div>

        <div>
          <h4 className="text-base font-medium mb-3">Icon Categories</h4>
          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
            <li><strong>Navigation:</strong> dashboard, home, planning, reports</li>
            <li><strong>Transport:</strong> truck, my-trip, add-trip, bulk-trip</li>
            <li><strong>Status:</strong> signal strength, tracking states</li>
            <li><strong>Actions:</strong> upload, settlement, lock, notification</li>
          </ul>
        </div>
      </div>
    </div>
  );
}; 