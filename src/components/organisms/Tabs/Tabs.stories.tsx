import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Tabs from './Tabs';
import { TabsList, TabsTrigger, TabsContent } from './index';

const meta: Meta<typeof Tabs> = {
  title: 'Organisms/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
    },
    overflowBehavior: {
      control: { type: 'select' },
      options: ['auto', 'dropdown'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// ---------------------------------------------------------------------------
// Composable stories (recommended API)
// ---------------------------------------------------------------------------

function DefaultComponent() {
  const [activeTab, setActiveTab] = React.useState(0);
  return (
    <Tabs activeTab={activeTab} onTabChange={setActiveTab} type="primary">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content of Tab 1</TabsContent>
      <TabsContent value="tab2">Content of Tab 2</TabsContent>
      <TabsContent value="tab3">Content of Tab 3</TabsContent>
    </Tabs>
  );
}

export const Default: Story = {
  render: () => <DefaultComponent />,
};

function WithBadgesComponent() {
  const [activeTab, setActiveTab] = React.useState(0);
  return (
    <Tabs activeTab={activeTab} onTabChange={setActiveTab} type="primary">
      <TabsList>
        <TabsTrigger value="tab1" badge badgeCount="56">
          Tab 1
        </TabsTrigger>
        <TabsTrigger value="tab2" badge badgeCount="12">
          Tab 2
        </TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content of Tab 1 with badge</TabsContent>
      <TabsContent value="tab2">Content of Tab 2 with badge</TabsContent>
      <TabsContent value="tab3">Content of Tab 3</TabsContent>
    </Tabs>
  );
}

export const WithBadges: Story = {
  render: () => <WithBadgesComponent />,
};

function SecondaryComponent() {
  const [activeTab, setActiveTab] = React.useState(0);
  return (
    <Tabs activeTab={activeTab} onTabChange={setActiveTab} type="secondary">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content of Tab 1</TabsContent>
      <TabsContent value="tab2">Content of Tab 2</TabsContent>
      <TabsContent value="tab3">Content of Tab 3</TabsContent>
    </Tabs>
  );
}

export const Secondary: Story = {
  render: () => <SecondaryComponent />,
};

function TertiaryComponent() {
  const [activeTab, setActiveTab] = React.useState(0);
  return (
    <Tabs activeTab={activeTab} onTabChange={setActiveTab} type="tertiary">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content of Tab 1</TabsContent>
      <TabsContent value="tab2">Content of Tab 2</TabsContent>
      <TabsContent value="tab3">Content of Tab 3</TabsContent>
    </Tabs>
  );
}

export const Tertiary: Story = {
  render: () => <TertiaryComponent />,
};

// ---------------------------------------------------------------------------
// Legacy declarative stories (deprecated)
// ---------------------------------------------------------------------------

const tabsData = [
  { label: 'Tab 1', children: 'Content of Tab 1' },
  { label: 'Tab 2', children: 'Content of Tab 2' },
  { label: 'Tab 3', children: 'Content of Tab 3' },
];

const overflowTabs = Array.from({ length: 20 }).map((_, index) => ({
  label: `Tab ${index + 1}`,
  children: `Content of Tab ${index + 1}`,
}));

/** @deprecated Use the `Default` story instead. */
export const LegacyPrimary: Story = {
  args: {
    tabs: tabsData,
    type: 'primary',
  },
};

/** @deprecated Use the `Secondary` story instead. */
export const LegacySecondary: Story = {
  args: {
    tabs: tabsData,
    type: 'secondary',
  },
};

/** @deprecated Use the `Tertiary` story instead. */
export const LegacyTertiary: Story = {
  args: {
    tabs: tabsData,
    type: 'tertiary',
  },
};

/** @deprecated Use the `WithBadges` story instead. */
export const LegacyWithBadges: Story = {
  args: {
    tabs: [
      { label: 'Tab 1', badge: true, badgeCount: '56', children: 'Content of Tab 1' },
      { label: 'Tab 2', badge: true, badgeCount: '12', children: 'Content of Tab 2' },
      { label: 'Tab 3', children: 'Content of Tab 3' },
    ],
    type: 'primary',
  },
};

/** @deprecated Use composable API instead. */
export const LegacyWithNotifications: Story = {
  args: {
    tabs: [
      { label: 'Tab 1', notification: true, children: 'Content of Tab 1' },
      { label: 'Tab 2', notification: true, children: 'Content of Tab 2' },
      { label: 'Tab 3', children: 'Content of Tab 3' },
    ],
    type: 'primary',
  },
};

/** @deprecated Use composable API instead. */
export const LegacyWithIcons: Story = {
  args: {
    tabs: [
      { label: 'Tab 1', icon: true, children: 'Content of Tab 1' },
      { label: 'Tab 2', icon: true, children: 'Content of Tab 2' },
      { label: 'Tab 3', children: 'Content of Tab 3' },
    ],
    type: 'primary',
  },
};

/** @deprecated Use composable API instead. */
export const LegacyOverflowDropdown: Story = {
  args: {
    tabs: overflowTabs,
    type: 'primary',
    overflowBehavior: 'dropdown',
  },
};
