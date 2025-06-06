import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabItem } from './Tabs';
import type { TabType } from './Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Tab component with three variants (Primary, Secondary, Tertiary) built from Figma specifications. Supports badges, icons, and notifications.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Tab variant type',
    },
    activeTab: {
      control: 'number',
      description: 'Index of the active tab',
    },
    showLine: {
      control: 'boolean',
      description: 'Show underline for primary tabs',
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleTabs = [
  { label: 'Tab 1' },
  { label: 'Tab 2' },
  { label: 'Tab 3' },
];

const tabsWithFeatures = [
  { label: 'Simple', icon: false, badge: false, notification: false },
  { label: 'With Icon', icon: true, badge: false, notification: false },
  { label: 'With Badge', icon: false, badge: true, badgeCount: '56', notification: false },
  { label: 'With Notification', icon: false, badge: false, notification: true },
  { label: 'All Features', icon: true, badge: true, badgeCount: '12', notification: true },
];

export const Primary: Story = {
  args: {
    type: 'primary',
    tabs: sampleTabs,
    activeTab: 0,
    showLine: true,
  },
};

export const Secondary: Story = {
  args: {
    type: 'secondary',
    tabs: sampleTabs,
    activeTab: 0,
    showLine: false,
  },
};

export const Tertiary: Story = {
  args: {
    type: 'tertiary',
    tabs: sampleTabs,
    activeTab: 0,
    showLine: false,
  },
};

export const WithFeatures: Story = {
  args: {
    type: 'primary',
    tabs: tabsWithFeatures,
    activeTab: 0,
    showLine: true,
  },
};

export const AllVariants = () => (
  <div className="space-y-8">
    <div>
      <h3 className="text-lg font-semibold mb-4">Primary Tabs</h3>
      <Tabs type="primary" tabs={sampleTabs} activeTab={0} showLine={true} />
    </div>
    
    <div>
      <h3 className="text-lg font-semibold mb-4">Secondary Tabs</h3>
      <Tabs type="secondary" tabs={sampleTabs} activeTab={1} showLine={false} />
    </div>
    
    <div>
      <h3 className="text-lg font-semibold mb-4">Tertiary Tabs</h3>
      <Tabs type="tertiary" tabs={sampleTabs} activeTab={2} showLine={false} />
    </div>
    
    <div>
      <h3 className="text-lg font-semibold mb-4">With All Features</h3>
      <Tabs type="primary" tabs={tabsWithFeatures} activeTab={2} showLine={true} />
    </div>
  </div>
);

export const FigmaVariants = () => (
  <div className="space-y-12 p-6">
    <div>
      <h2 className="text-xl font-bold mb-6 text-gray-800">Tab Component - Figma Specifications</h2>
      <p className="text-gray-600 mb-8">
        Built exactly from Figma design with three types: Primary (rectangular with underline), 
        Secondary (rounded corners), and Tertiary (pill-shaped).
      </p>
    </div>

    {/* Primary Type */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Primary Type</h3>
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">Basic Tabs</h4>
          <Tabs type="primary" tabs={[
            { label: 'Unselected' },
            { label: 'Selected' },
            { label: 'Another Tab' }
          ]} activeTab={1} showLine={true} />
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">With Badges</h4>
          <Tabs type="primary" tabs={[
            { label: 'Dashboard', badge: true, badgeCount: '8' },
            { label: 'Messages', badge: true, badgeCount: '56' },
            { label: 'Settings', badge: true, badgeCount: '2' }
          ]} activeTab={0} showLine={true} />
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">With Icons and Notifications</h4>
          <Tabs type="primary" tabs={[
            { label: 'Home', icon: true },
            { label: 'Alerts', notification: true },
            { label: 'Profile', icon: true, badge: true, badgeCount: '3' }
          ]} activeTab={1} showLine={true} />
        </div>
      </div>
    </div>

    {/* Secondary Type */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Secondary Type</h3>
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">Basic Tabs</h4>
          <Tabs type="secondary" tabs={[
            { label: 'Overview' },
            { label: 'Analytics' },
            { label: 'Reports' }
          ]} activeTab={1} showLine={false} />
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">With Features</h4>
          <Tabs type="secondary" tabs={[
            { label: 'Active', badge: true, badgeCount: '12' },
            { label: 'Pending', icon: true, notification: true },
            { label: 'Completed', icon: true }
          ]} activeTab={0} showLine={false} />
        </div>
      </div>
    </div>

    {/* Tertiary Type */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Tertiary Type (Pills)</h3>
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">Basic Pills</h4>
          <Tabs type="tertiary" tabs={[
            { label: 'All' },
            { label: 'Active' },
            { label: 'Inactive' }
          ]} activeTab={0} showLine={false} />
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">With Features</h4>
          <Tabs type="tertiary" tabs={[
            { label: 'Draft', badge: true, badgeCount: '4' },
            { label: 'Review', notification: true },
            { label: 'Published', icon: true }
          ]} activeTab={1} showLine={false} />
        </div>
      </div>
    </div>

    <div className="mt-8 p-4 bg-gray-50 rounded-lg">
      <h4 className="font-medium text-gray-700 mb-2">Design Specifications</h4>
      <ul className="text-sm text-gray-600 space-y-1">
        <li>• Primary: 32px horizontal padding, 12px vertical padding, bottom border for selection</li>
        <li>• Secondary: 16px horizontal padding, 8px vertical padding, 8px border radius</li>
        <li>• Tertiary: 16px horizontal padding, 8px vertical padding, proper pill shape (rounded-pill)</li>
        <li>• Selected tabs have enhanced background colors and border styling</li>
        <li>• Hover states provide visual feedback with background color changes</li>
        <li>• Badges show count with white background and gray border</li>
        <li>• Notifications display as small red dots</li>
      </ul>
    </div>
  </div>
);

export const InteractiveDemo = () => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Try different tab types</h3>
        <p className="text-gray-600 mb-6">Click on tabs to see the selection behavior across different types.</p>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Primary (with underline)</label>
          <Tabs type="primary" tabs={tabsWithFeatures} activeTab={2} showLine={true} />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Secondary (rounded corners)</label>
          <Tabs type="secondary" tabs={tabsWithFeatures} activeTab={2} showLine={false} />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tertiary (pill-shaped)</label>
          <Tabs type="tertiary" tabs={tabsWithFeatures} activeTab={2} showLine={false} />
        </div>
      </div>
    </div>
  );
}; 