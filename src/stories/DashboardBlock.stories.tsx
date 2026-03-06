import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DashboardBlock } from '../components/templates/Blocks';

const meta: Meta<typeof DashboardBlock> = {
  title: 'Stories/DashboardBlock',
  component: DashboardBlock,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docsOnly: true,
    docs: {
      description: {
        component: 'A pre-composed dashboard block with user greeting, metric cards, and a data table. All props are optional and ship with sensible defaults.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DashboardBlock>;

export const Default: Story = {
  render: () => <DashboardBlock />,
};
