import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader } from './PageHeader';

const meta: Meta<typeof PageHeader> = {
  title: 'Design System/Organisms/PageHeader',
  component: PageHeader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Title text displayed next to the back button',
    },
    subtitle: {
      control: { type: 'text' },
      description: 'Subtitle text displayed below the title (only shown in variant1)',
    },
    variant: {
      control: { type: 'select' },
      options: ['variant1', 'variant2'],
      description: 'Layout variant: variant1 has back button on left with subtitle, variant2 has back button on right',
    },
    showBackButton: {
      control: { type: 'boolean' },
      description: 'Whether to show the back button',
    },
    tabStyle: {
      control: { type: 'select' },
      options: ['underline', 'segmented'],
      description: 'Tab style: underline (default) or segmented',
    },
    showTabs: {
      control: { type: 'boolean' },
      description: 'Whether to show tabs',
    },
    showActions: {
      control: { type: 'boolean' },
      description: 'Whether to show action buttons',
    },
    primaryActionLabel: {
      control: { type: 'text' },
      description: 'Primary action button label',
    },
    secondaryActionLabel: {
      control: { type: 'text' },
      description: 'Secondary action button label',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'PB 09 HH6439',
    showBackButton: true,
    showTabs: true,
    showActions: true,
    tabs: [
      { label: 'Tracking', key: 'tracking' },
      { label: 'Loads', key: 'loads' },
      { label: 'Exceptions', key: 'exceptions' },
      { label: 'Ops', key: 'ops' },
    ],
    activeTab: 'tracking',
    primaryActionLabel: 'Button',
    secondaryActionLabel: 'Button',
  },
};

export const NoTabs: Story = {
  args: {
    title: 'PB 09 HH6439',
    showBackButton: true,
    showTabs: false,
    showActions: true,
    primaryActionLabel: 'Button',
    secondaryActionLabel: 'Button',
  },
};

export const NoTabsAndButtons: Story = {
  args: {
    title: 'PB 09 HH6439',
    showBackButton: true,
    showTabs: false,
    showActions: false,
  },
};

export const CustomTabs: Story = {
  args: {
    title: 'Vehicle Details',
    showBackButton: true,
    showTabs: true,
    showActions: true,
    tabs: [
      { label: 'Overview', key: 'overview' },
      { label: 'History', key: 'history' },
      { label: 'Documents', key: 'documents' },
    ],
    activeTab: 'overview',
    primaryActionLabel: 'Edit',
    secondaryActionLabel: 'Export',
  },
};

export const WithCallbacks: Story = {
  args: {
    title: 'PB 09 HH6439',
    showBackButton: true,
    showTabs: true,
    showActions: true,
    tabs: [
      { label: 'Tracking', key: 'tracking' },
      { label: 'Loads', key: 'loads' },
      { label: 'Exceptions', key: 'exceptions' },
      { label: 'Ops', key: 'ops' },
    ],
    activeTab: 'tracking',
    primaryActionLabel: 'Create',
    secondaryActionLabel: 'Filter',
    onBack: () => console.log('Back clicked'),
    onTabChange: (key: string) => console.log('Tab changed:', key),
    onPrimaryAction: () => console.log('Primary action clicked'),
    onSecondaryAction: () => console.log('Secondary action clicked'),
    onSearchClick: () => console.log('Search clicked'),
    onDocumentClick: () => console.log('Document clicked'),
  },
};

export const Variant1WithSubtitle: Story = {
  args: {
    title: 'PB 09 HH6439',
    subtitle: 'MTI-7ebd1826-18bb-4a41-9009-11bc6fc5e444',
    variant: 'variant1',
    showBackButton: true,
    showTabs: true,
    tabStyle: 'segmented',
    showActions: false,
    tabs: [
      { label: 'Orders', key: 'orders' },
      { label: 'Plans', key: 'plans' },
    ],
    activeTab: 'orders',
  },
};

export const Variant2: Story = {
  args: {
    title: 'PB 09 HH6439',
    variant: 'variant2',
    showBackButton: true,
    showTabs: true,
    tabStyle: 'segmented',
    showActions: false,
    tabs: [
      { label: 'Orders', key: 'orders' },
      { label: 'Plans', key: 'plans' },
    ],
    activeTab: 'orders',
  },
};

