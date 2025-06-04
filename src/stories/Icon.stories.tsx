import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon, IconName, iconMap } from '../components/Icons';

const meta: Meta<typeof Icon> = {
  title: 'UI/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: { type: 'select' },
      options: Object.keys(iconMap) as IconName[],
    },
    size: {
      control: { type: 'number' },
    },
    color: {
      control: { type: 'color' },
    },
    className: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'check',
    size: 16,
    color: 'currentColor',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon name="star" size={12} />
      <Icon name="star" size={16} />
      <Icon name="star" size={20} />
      <Icon name="star" size={24} />
      <Icon name="star" size={32} />
      <Icon name="star" size={48} />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon name="check" color="#22c55e" size={24} />
      <Icon name="cross" color="#ef4444" size={24} />
      <Icon name="star" color="#f59e0b" size={24} />
      <Icon name="bell" color="#3b82f6" size={24} />
      <Icon name="search" color="#8b5cf6" size={24} />
    </div>
  ),
};

export const NavigationIcons: Story = {
  render: () => (
    <div className="grid grid-cols-8 gap-4 p-4">
      <div className="flex flex-col items-center gap-2">
        <Icon name="chevron-up" size={24} />
        <span className="text-xs">chevron-up</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="chevron-down" size={24} />
        <span className="text-xs">chevron-down</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="chevron-left" size={24} />
        <span className="text-xs">chevron-left</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="chevron-right" size={24} />
        <span className="text-xs">chevron-right</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="arrow-up" size={24} />
        <span className="text-xs">arrow-up</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="arrow-down" size={24} />
        <span className="text-xs">arrow-down</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="arrow-top-left" size={24} />
        <span className="text-xs">arrow-top-left</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="arrow-top-right" size={24} />
        <span className="text-xs">arrow-top-right</span>
      </div>
    </div>
  ),
};

export const ActionIcons: Story = {
  render: () => (
    <div className="grid grid-cols-8 gap-4 p-4">
      <div className="flex flex-col items-center gap-2">
        <Icon name="add" size={24} />
        <span className="text-xs">add</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="subtract" size={24} />
        <span className="text-xs">subtract</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="edit" size={24} />
        <span className="text-xs">edit</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="delete" size={24} />
        <span className="text-xs">delete</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="save" size={24} />
        <span className="text-xs">save</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="copy" size={24} />
        <span className="text-xs">copy</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="share" size={24} />
        <span className="text-xs">share</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="download" size={24} />
        <span className="text-xs">download</span>
      </div>
    </div>
  ),
};

export const StatusIcons: Story = {
  render: () => (
    <div className="grid grid-cols-8 gap-4 p-4">
      <div className="flex flex-col items-center gap-2">
        <Icon name="check" size={24} color="#22c55e" />
        <span className="text-xs">check</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="cross" size={24} color="#ef4444" />
        <span className="text-xs">cross</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="alert-critical" size={24} color="#ef4444" />
        <span className="text-xs">alert-critical</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="alert-informational" size={24} color="#3b82f6" />
        <span className="text-xs">alert-informational</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="success" size={24} color="#22c55e" />
        <span className="text-xs">success</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="loading" size={24} />
        <span className="text-xs">loading</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="bell" size={24} />
        <span className="text-xs">bell</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="notification" size={24} />
        <span className="text-xs">notification</span>
      </div>
    </div>
  ),
};

export const BrandIcons: Story = {
  render: () => (
    <div className="grid grid-cols-6 gap-4 p-4">
      <div className="flex flex-col items-center gap-2">
        <Icon name="google-colour" size={32} />
        <span className="text-xs">google-colour</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="airtel" size={32} />
        <span className="text-xs">airtel</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="jio" size={32} />
        <span className="text-xs">jio</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="vodafone" size={32} />
        <span className="text-xs">vodafone</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="bsnl" size={32} />
        <span className="text-xs">bsnl</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="ft-colour" size={32} />
        <span className="text-xs">ft-colour</span>
      </div>
    </div>
  ),
};

export const AllIcons: Story = {
  render: () => (
    <div className="grid grid-cols-10 gap-4 p-4 max-h-96 overflow-y-auto">
      {Object.keys(iconMap).map((iconName) => (
        <div key={iconName} className="flex flex-col items-center gap-2 p-2 border rounded hover:bg-gray-50">
          <Icon name={iconName as IconName} size={24} />
          <span className="text-xs text-center">{iconName}</span>
        </div>
      ))}
    </div>
  ),
}; 