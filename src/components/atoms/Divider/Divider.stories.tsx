import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Atoms/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'with-label'],
      description: 'The type of divider to display',
    },
    label: {
      control: 'text',
      description: 'Label to display in the middle of the divider (only for type="with-label")',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Primary: Story = {
  args: {
    type: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    type: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    type: 'tertiary',
  },
};

export const WithLabel: Story = {
  args: {
    type: 'with-label',
    label: '14 March 2023',
  },
}; 