import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from '../components/atoms/Typography/Typography';

const meta: Meta<typeof Typography> = {
  title: 'Design System/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Typography System',
  render: () => <Typography />,
}; 