import type { Meta, StoryObj } from '@storybook/react';
import Chicklet from './Chicklet';

const meta: Meta<typeof Chicklet> = {
  title: 'Molecules/Chicklet',
  component: Chicklet,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['rectangular', 'rounded'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chicklet>;

export const Default: Story = {
  args: {
    label: 'Chicklet',
  },
};

export const Closable: Story = {
  args: {
    label: 'Removable',
    closable: true,
  },
};

export const Bordered: Story = {
  args: {
    label: 'Bordered',
    bordered: true,
  },
};
