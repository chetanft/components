import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Colors } from '../components/atoms/Colors/Colors';

const meta: Meta<typeof Colors> = {
  title: 'Design System/Colors',
  component: Colors,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Color System',
  render: () => <Colors />,
}; 