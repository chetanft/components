import type { Meta, StoryObj } from '@storybook/react';
import { SegmentedTabs, SegmentedTabItem } from '../components/molecules/SegmentedTabs';

const meta: Meta<typeof SegmentedTabs> = {
  title: 'Stories/SegmentedTabs',
  component: SegmentedTabs,
  parameters: {
    docsOnly: true,
    layout: 'centered',
    docs: {
      description: {
        component: 'Segmented tabs component for switching between related views.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SegmentedTabs>;

export const Default: Story = {
  render: () => (
    <SegmentedTabs defaultValue="tab1">
      <SegmentedTabItem value="tab1">Tab 1</SegmentedTabItem>
      <SegmentedTabItem value="tab2">Tab 2</SegmentedTabItem>
      <SegmentedTabItem value="tab3">Tab 3</SegmentedTabItem>
    </SegmentedTabs>
  ),
};

export const TwoTabs: Story = {
  render: () => (
    <SegmentedTabs defaultValue="first">
      <SegmentedTabItem value="first">First</SegmentedTabItem>
      <SegmentedTabItem value="second">Second</SegmentedTabItem>
    </SegmentedTabs>
  ),
};

export const FourTabs: Story = {
  render: () => (
    <SegmentedTabs defaultValue="tab1">
      <SegmentedTabItem value="tab1">Tab 1</SegmentedTabItem>
      <SegmentedTabItem value="tab2">Tab 2</SegmentedTabItem>
      <SegmentedTabItem value="tab3">Tab 3</SegmentedTabItem>
      <SegmentedTabItem value="tab4">Tab 4</SegmentedTabItem>
    </SegmentedTabs>
  ),
};

export const DocsVariants: Story = {
  name: 'Variants',
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-[var(--secondary)] mb-2">Two Tabs</p>
        <SegmentedTabs defaultValue="first">
          <SegmentedTabItem value="first">First</SegmentedTabItem>
          <SegmentedTabItem value="second">Second</SegmentedTabItem>
        </SegmentedTabs>
      </div>
      <div>
        <p className="text-sm font-medium text-[var(--secondary)] mb-2">Three Tabs</p>
        <SegmentedTabs defaultValue="tab1">
          <SegmentedTabItem value="tab1">Tab 1</SegmentedTabItem>
          <SegmentedTabItem value="tab2">Tab 2</SegmentedTabItem>
          <SegmentedTabItem value="tab3">Tab 3</SegmentedTabItem>
        </SegmentedTabs>
      </div>
      <div>
        <p className="text-sm font-medium text-[var(--secondary)] mb-2">Four Tabs</p>
        <SegmentedTabs defaultValue="tab1">
          <SegmentedTabItem value="tab1">Tab 1</SegmentedTabItem>
          <SegmentedTabItem value="tab2">Tab 2</SegmentedTabItem>
          <SegmentedTabItem value="tab3">Tab 3</SegmentedTabItem>
          <SegmentedTabItem value="tab4">Tab 4</SegmentedTabItem>
        </SegmentedTabs>
      </div>
    </div>
  ),

  parameters: { docsOnly: true },
}