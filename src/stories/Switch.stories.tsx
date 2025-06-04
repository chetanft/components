import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Switch } from '../components/Switch/Switch';

const meta: Meta<typeof Switch> = {
  title: 'Form/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Switch id="airplane-mode" />
        <label htmlFor="airplane-mode" className="text-sm font-medium">
          Airplane mode
        </label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="notifications" defaultChecked />
        <label htmlFor="notifications" className="text-sm font-medium">
          Enable notifications
        </label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="marketing" disabled />
        <label htmlFor="marketing" className="text-sm font-medium">
          Marketing emails (disabled)
        </label>
      </div>
    </div>
  ),
};

export const DesignShowcase: Story = {
  render: () => (
    <div className="p-8 bg-white">
      <h2 className="text-lg font-semibold mb-6 text-gray-800">Switch States - Exact Figma Design</h2>
      
      <div className="flex flex-row gap-12 items-center">
        <div className="text-center">
          <div className="mb-3 text-sm font-medium text-gray-600">Off</div>
          <Switch />
        </div>
        
        <div className="text-center">
          <div className="mb-3 text-sm font-medium text-gray-600">On</div>
          <Switch checked />
        </div>
        
        <div className="text-center">
          <div className="mb-3 text-sm font-medium text-gray-600">Disabled Off</div>
          <Switch disabled />
        </div>
        
        <div className="text-center">
          <div className="mb-3 text-sm font-medium text-gray-600">Disabled On</div>
          <Switch disabled checked />
        </div>
      </div>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-row gap-8 p-6">
      <div className="text-center">
        <div className="mb-2 text-sm font-medium text-gray-600">Off</div>
        <Switch />
      </div>
      
      <div className="text-center">
        <div className="mb-2 text-sm font-medium text-gray-600">On</div>
        <Switch checked />
      </div>
      
      <div className="text-center">
        <div className="mb-2 text-sm font-medium text-gray-600">Disabled Off</div>
        <Switch disabled />
      </div>
      
      <div className="text-center">
        <div className="mb-2 text-sm font-medium text-gray-600">Disabled On</div>
        <Switch disabled checked />
      </div>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Switch id="off" />
          <label htmlFor="off" className="text-sm">Off</label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="on" checked />
          <label htmlFor="on" className="text-sm">On</label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="disabled-off" disabled />
          <label htmlFor="disabled-off" className="text-sm">Disabled Off</label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="disabled-on" disabled checked />
          <label htmlFor="disabled-on" className="text-sm">Disabled On</label>
        </div>
      </div>
    </div>
  ),
}; 