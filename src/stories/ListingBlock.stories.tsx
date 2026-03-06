import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ListingBlock } from '../components/templates/Blocks';

const meta: Meta<typeof ListingBlock> = {
  title: 'Stories/ListingBlock',
  component: ListingBlock,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docsOnly: true,
    docs: {
      description: {
        component: 'A pre-composed listing block with user context, filterable data table, and column configuration. All props are optional and ship with sensible defaults.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ListingBlock>;

export const Default: Story = {
  render: () => <ListingBlock />,
};
