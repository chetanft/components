import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabItem } from '../components/Tabs/Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    showLine: {
      control: { type: 'boolean' },
    },
    activeTab: {
      control: { type: 'number' },
      min: 0,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default tabs
export const Default: Story = {
  args: {
    tabs: [
      { label: 'Tab 1' },
      { label: 'Tab 2' },
      { label: 'Tab 3' },
    ],
    activeTab: 0,
    showLine: true,
  },
};

// With badges
export const WithBadges: Story = {
  args: {
    tabs: [
      { label: 'Tab 1', badge: true, badgeCount: '56' },
      { label: 'Tab 2', badge: true, badgeCount: '12' },
      { label: 'Tab 3', badge: true, badgeCount: '3' },
    ],
    activeTab: 0,
    showLine: true,
  },
};

// With notifications
export const WithNotifications: Story = {
  args: {
    tabs: [
      { label: 'Tab 1', notification: true },
      { label: 'Tab 2' },
      { label: 'Tab 3', notification: true },
    ],
    activeTab: 0,
    showLine: true,
  },
};

// With icons
export const WithIcons: Story = {
  args: {
    tabs: [
      { label: 'Tab 1', icon: true },
      { label: 'Tab 2', icon: true },
      { label: 'Tab 3', icon: true },
    ],
    activeTab: 0,
    showLine: true,
  },
};

// Kitchen sink - all features
export const AllFeatures: Story = {
  args: {
    tabs: [
      { label: 'Tab 1', badge: true, badgeCount: '56', icon: true },
      { label: 'Tab 2', badge: true, badgeCount: '12', notification: true },
      { label: 'Tab 3', icon: true, notification: true },
      { label: 'Tab 4', badge: true, badgeCount: '99+' },
    ],
    activeTab: 0,
    showLine: true,
  },
};

// Show line variants
export const LineVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">With Line</h3>
        <Tabs
          showLine={true}
          tabs={[
            { label: 'Tab 1', badge: true, badgeCount: '56' },
            { label: 'Tab 2' },
            { label: 'Tab 3' },
          ]}
        />
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Without Line</h3>
        <Tabs
          showLine={false}
          tabs={[
            { label: 'Tab 1', badge: true, badgeCount: '56' },
            { label: 'Tab 2' },
            { label: 'Tab 3' },
          ]}
        />
      </div>
    </div>
  ),
};

// Different tab counts
export const TabCounts: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">2 Tabs</h3>
        <Tabs
          tabs={[
            { label: 'Overview', badge: true, badgeCount: '12' },
            { label: 'Details' },
          ]}
        />
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">4 Tabs</h3>
        <Tabs
          tabs={[
            { label: 'Home', badge: true, badgeCount: '3' },
            { label: 'Products', notification: true },
            { label: 'Services', icon: true },
            { label: 'Contact' },
          ]}
        />
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">6 Tabs</h3>
        <Tabs
          tabs={[
            { label: 'Dashboard', badge: true, badgeCount: '5' },
            { label: 'Analytics', icon: true },
            { label: 'Reports' },
            { label: 'Settings', notification: true },
            { label: 'Users', badge: true, badgeCount: '42' },
            { label: 'Help' },
          ]}
        />
      </div>
    </div>
  ),
};

// Individual TabItem component
export const TabItemOnly: Story = {
  render: () => (
    <div className="flex gap-4 border-b border-gray-300">
      <TabItem label="Unselected Tab" />
      <TabItem label="Selected Tab" active={true} />
      <TabItem label="With Badge" badge={true} badgeCount="56" />
      <TabItem label="With Icon" icon={true} />
      <TabItem label="With Notification" notification={true} />
      <TabItem 
        label="All Features" 
        badge={true} 
        badgeCount="99+" 
        icon={true} 
        notification={true} 
      />
    </div>
  ),
};

// Interactive example
export const Interactive: Story = {
  render: () => {
    const [activeTab, setActiveTab] = React.useState(0);
    
    const tabs = [
      { label: 'Home', badge: true, badgeCount: '3' },
      { label: 'Products', notification: true },
      { label: 'Services', icon: true },
      { label: 'About', badge: true, badgeCount: '12' },
      { label: 'Contact' },
    ];

    return (
      <div>
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          showLine={true}
        />
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p>Active tab: <strong>{tabs[activeTab]?.label}</strong></p>
          <p>Tab index: <strong>{activeTab}</strong></p>
        </div>
      </div>
    );
  },
}; 