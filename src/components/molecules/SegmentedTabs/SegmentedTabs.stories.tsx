import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { SegmentedTabs, SegmentedTabItem } from './SegmentedTabs';
import { Icon } from '../../atoms/Icons';

const meta: Meta<typeof SegmentedTabs> = {
  title: 'Molecules/SegmentedTabs',
  component: SegmentedTabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Segmented tabs component for switching between related options. Supports both composable API (recommended) and declarative API (deprecated).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'icon-only'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof SegmentedTabs>;

// Declarative API Examples
/** @deprecated Use composable API instead. */
export const LegacyDeclarativeDefault: Story = {
  args: {
    items: [
      { label: 'Tab 1', value: 'tab1' },
      { label: 'Tab 2', value: 'tab2' },
      { label: 'Tab 3', value: 'tab3' },
    ],
    defaultValue: 'tab1',
  },
};

/** @deprecated Use composable API instead. */
export const LegacyDeclarativeWithIcons: Story = {
  args: {
    items: [
      { label: 'Home', value: 'home', icon: <Icon name="home" size={16} /> },
      { label: 'Settings', value: 'settings', icon: <Icon name="settings" size={16} /> },
      { label: 'Profile', value: 'profile', icon: <Icon name="user" size={16} /> },
    ],
    defaultValue: 'home',
  },
};

/** @deprecated Use composable API instead. */
export const LegacyDeclarativeIconOnly: Story = {
  args: {
    variant: 'icon-only',
    items: [
      { label: 'Home', value: 'home', icon: <Icon name="home" size={16} /> },
      { label: 'Settings', value: 'settings', icon: <Icon name="settings" size={16} /> },
      { label: 'Profile', value: 'profile', icon: <Icon name="user" size={16} /> },
    ],
    defaultValue: 'home',
  },
};

// Composable API Examples
function ComposableBasicComponent() {
  const [value, setValue] = useState('tab1');
  return (
    <SegmentedTabs value={value} onChange={setValue}>
      <SegmentedTabItem value="tab1" label="Tab 1" />
      <SegmentedTabItem value="tab2" label="Tab 2" />
      <SegmentedTabItem value="tab3" label="Tab 3" />
    </SegmentedTabs>
  );
}

export const Default: Story = {
  render: () => <ComposableBasicComponent />,
};

function ComposableWithIconsComponent() {
  const [value, setValue] = useState('home');
  return (
    <SegmentedTabs value={value} onChange={setValue}>
      <SegmentedTabItem 
        value="home" 
        label="Home" 
        icon={<Icon name="home" size={16} />}
      />
      <SegmentedTabItem 
        value="settings" 
        label="Settings" 
        icon={<Icon name="settings" size={16} />}
      />
      <SegmentedTabItem 
        value="profile" 
        label="Profile" 
        icon={<Icon name="user" size={16} />}
      />
    </SegmentedTabs>
  );
}

export const WithIcons: Story = {
  render: () => <ComposableWithIconsComponent />,
};

function ComposableIconOnlyComponent() {
  const [value, setValue] = useState('home');
  return (
    <SegmentedTabs value={value} onChange={setValue} variant="icon-only">
      <SegmentedTabItem 
        value="home" 
        label="Home" 
        icon={<Icon name="home" size={16} />}
      />
      <SegmentedTabItem 
        value="settings" 
        label="Settings" 
        icon={<Icon name="settings" size={16} />}
      />
      <SegmentedTabItem 
        value="profile" 
        label="Profile" 
        icon={<Icon name="user" size={16} />}
      />
    </SegmentedTabs>
  );
}

export const IconOnly: Story = {
  render: () => <ComposableIconOnlyComponent />,
};

function ComposableControlledComponent() {
  const [value, setValue] = useState('option1');
  return (
    <div className="space-y-4">
      <SegmentedTabs value={value} onChange={setValue}>
        <SegmentedTabItem value="option1" label="Option 1" />
        <SegmentedTabItem value="option2" label="Option 2" />
        <SegmentedTabItem value="option3" label="Option 3" />
      </SegmentedTabs>
      <p className="text-sm text-[var(--color-tertiary)]">
        Selected: {value}
      </p>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ComposableControlledComponent />,
};

