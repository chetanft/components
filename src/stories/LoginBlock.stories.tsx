import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LoginBlock } from '../components/templates/Blocks';

const meta: Meta<typeof LoginBlock> = {
  title: 'Stories/LoginBlock',
  component: LoginBlock,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docsOnly: true,
    docs: {
      description: {
        component: 'A pre-composed login form block with heading, subheading, and submit handler. All props are optional and ship with sensible defaults.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LoginBlock>;

export const Default: Story = {
  render: () => <LoginBlock />,
};
