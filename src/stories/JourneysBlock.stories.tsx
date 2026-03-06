import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { JourneysBlock } from '../components/templates/Blocks';

const meta: Meta<typeof JourneysBlock> = {
  title: 'Stories/JourneysBlock',
  component: JourneysBlock,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docsOnly: true,
    docs: {
      description: {
        component: 'A pre-composed journeys block with filterable journey list, company and direction selectors. All props are optional and ship with sensible defaults.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof JourneysBlock>;

export const Default: Story = {
  render: () => <JourneysBlock />,
};
