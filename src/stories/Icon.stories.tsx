import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon, IconName, iconMap } from '../components/atoms/Icons';

const meta: Meta<typeof Icon> = {
  title: 'UI/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docsOnly: true,
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

export const DocsSizes: Story = {
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

  parameters: { docsOnly: true },
}