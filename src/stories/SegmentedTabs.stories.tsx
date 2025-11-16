import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SegmentedTabs } from '../components/molecules/SegmentedTabs';
import { Check, Copy } from '../components/atoms/Icons';

const meta: Meta<typeof SegmentedTabs> = {
  title: 'Components/SegmentedTabs',
  component: SegmentedTabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SegmentedTabs>;

// Basic two tabs example
export const TwoTabs: Story = {
  args: {
    items: [
      { label: 'Tab', value: 'tab1' },
      { label: 'Tab', value: 'tab2' },
    ],
    defaultValue: 'tab2',
  },
};

// Three tabs example
export const ThreeTabs: Story = {
  args: {
    items: [
      { label: 'Tab', value: 'tab1' },
      { label: 'Tab', value: 'tab2' },
      { label: 'Tab', value: 'tab3' },
    ],
    defaultValue: 'tab3',
  },
};

// Four tabs example
export const FourTabs: Story = {
  args: {
    items: [
      { label: 'Tab', value: 'tab1' },
      { label: 'Tab', value: 'tab2' },
      { label: 'Tab', value: 'tab3' },
      { label: 'Tab', value: 'tab4' },
    ],
    defaultValue: 'tab4',
  },
};

// With icons
export const WithIcons: Story = {
  args: {
    items: [
      { label: 'Copy', value: 'copy', icon: <Copy /> },
      { label: 'Check', value: 'check', icon: <Check /> },
      { label: 'Tab', value: 'tab3' },
    ],
    defaultValue: 'check',
  },
};

// Practical example - View modes
export const ViewModes: Story = {
  args: {
    items: [
      { label: 'List', value: 'list' },
      { label: 'Grid', value: 'grid' },
      { label: 'Card', value: 'card' },
    ],
    defaultValue: 'grid',
  },
};

// Controlled example
export const Controlled: Story = {
  args: {
    items: [
      { label: 'Overview', value: 'overview' },
      { label: 'Details', value: 'details' },
      { label: 'Settings', value: 'settings' },
    ],
  },
  render: (args) => {
    const [value, setValue] = React.useState('details');
    return (
      <div className="flex flex-col gap-4">
        <SegmentedTabs
          {...args}
          value={value}
          onChange={setValue}
        />
        <p className="text-sm text-gray-600">
          Selected: {value}
        </p>
      </div>
    );
  },
};

// Icon-only variant
export const IconOnly: Story = {
  args: {
    items: [
      { label: 'Copy', value: 'copy', icon: <Copy /> },
      { label: 'Check', value: 'check', icon: <Check /> },
    ],
    variant: 'icon-only',
    defaultValue: 'check',
  },
}; 