import type { Meta, StoryObj } from '@storybook/react';
import Tabs from './Tabs';

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

const overflowTabs = Array.from({ length: 20 }).map((_, index) => ({
  label: `Tab ${index + 1}`,
  children: `Content of Tab ${index + 1}`,
}));

export const OverflowDropdown: Story = {
  args: {
    tabs: overflowTabs,
    type: 'primary',
    overflowBehavior: 'dropdown',
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const tabsData = [
    { label: 'Tab 1', children: 'Content of Tab 1' },
    { label: 'Tab 2', children: 'Content of Tab 2' },
    { label: 'Tab 3', children: 'Content of Tab 3' },
];

export const Primary: Story = {
  args: {
    tabs: tabsData,
    type: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    tabs: tabsData,
    type: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    tabs: tabsData,
    type: 'tertiary',
  },
};

export const WithBadges: Story = {
  args: {
    tabs: [
      { label: 'Tab 1', badge: true, badgeCount: '56', children: 'Content of Tab 1' },
      { label: 'Tab 2', badge: true, badgeCount: '12', children: 'Content of Tab 2' },
      { label: 'Tab 3', children: 'Content of Tab 3' },
    ],
    type: 'primary',
  },
};

export const WithNotifications: Story = {
  args: {
    tabs: [
      { label: 'Tab 1', notification: true, children: 'Content of Tab 1' },
      { label: 'Tab 2', notification: true, children: 'Content of Tab 2' },
      { label: 'Tab 3', children: 'Content of Tab 3' },
    ],
    type: 'primary',
  },
};

export const WithIcons: Story = {
  args: {
    tabs: [
      { label: 'Tab 1', icon: true, children: 'Content of Tab 1' },
      { label: 'Tab 2', icon: true, children: 'Content of Tab 2' },
      { label: 'Tab 3', children: 'Content of Tab 3' },
    ],
    type: 'primary',
  },
};
