import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Tabs from './Tabs';
import { TabsList, TabsTrigger, TabsContent } from './index';

const meta: Meta<typeof Tabs> = {
  title: 'Organisms/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A tabs component for organizing content into switchable panels. Supports primary, secondary, and tertiary styles with badges and overflow handling.',
      },
    },
    explorer: {
      mode: 'matrix' as const,
      baseStory: 'ExplorerBase',
      behavior: 'layout' as const,
      previewMode: 'inline' as const,
      rows: [
        {
          id: 'style',
          label: 'Style',
          scenarios: [
            { id: 'primary', label: 'Primary', story: 'ExplorerBase', args: { type: 'primary' } },
            { id: 'secondary', label: 'Secondary', story: 'ExplorerBase', args: { type: 'secondary' } },
            { id: 'tertiary', label: 'Tertiary', story: 'ExplorerBase', args: { type: 'tertiary' } },
          ],
        },
        {
          id: 'content',
          label: 'Content',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: { withBadges: false } },
            { id: 'badges', label: 'Badges', story: 'ExplorerBase', args: { withBadges: true } },
          ],
        },
      ],
      defaultRowId: 'style',
      defaultScenarioId: 'primary',
      supportsGlass: true,
    },
  },
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

export const ExplorerBase: Story = {
  render: (args: any) => {
    const [activeTab, setActiveTab] = React.useState(0);
    const type = args.type ?? 'primary';
    const withBadges = Boolean(args.withBadges);
    return (
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} type={type}>
        <TabsList>
          <TabsTrigger value="tab1" {...(withBadges ? { badge: true, badgeCount: '56' } : {})}>Tab 1</TabsTrigger>
          <TabsTrigger value="tab2" {...(withBadges ? { badge: true, badgeCount: '12' } : {})}>Tab 2</TabsTrigger>
          <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content of Tab 1</TabsContent>
        <TabsContent value="tab2">Content of Tab 2</TabsContent>
        <TabsContent value="tab3">Content of Tab 3</TabsContent>
      </Tabs>
    );
  },
};

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

export const DocsVariants: Story = {
  render: () => {
    function VariantsDemo() {
      const [primary, setPrimary] = React.useState(0);
      const [secondary, setSecondary] = React.useState(0);
      const [tertiary, setTertiary] = React.useState(0);
      return (
        <div className="space-y-8">
          <div>
            <p className="text-sm font-medium mb-2">Primary</p>
            <Tabs activeTab={primary} onTabChange={setPrimary} type="primary">
              <TabsList>
                <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                <TabsTrigger value="tab3">Tab 3</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Secondary</p>
            <Tabs activeTab={secondary} onTabChange={setSecondary} type="secondary">
              <TabsList>
                <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                <TabsTrigger value="tab3">Tab 3</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Tertiary</p>
            <Tabs activeTab={tertiary} onTabChange={setTertiary} type="tertiary">
              <TabsList>
                <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                <TabsTrigger value="tab3">Tab 3</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      );
    }
    return <VariantsDemo />;
  },

  parameters: { docsOnly: true },
}