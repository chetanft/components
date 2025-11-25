import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarGroup } from './Avatar';
import { Icon } from '../Icons';

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
    },
    shape: {
        control: { type: 'select' },
        options: ['circle', 'square'],
    }
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    size: 'md',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/300',
    size: 'md',
  },
};

export const Square: Story = {
    args: {
      shape: 'square',
      children: 'A',
      size: 'md',
    },
};

export const Group: Story = {
    render: () => (
        <AvatarGroup maxCount={3} size="md">
            <Avatar src="https://i.pravatar.cc/300?img=1" />
            <Avatar src="https://i.pravatar.cc/300?img=2" />
            <Avatar src="https://i.pravatar.cc/300?img=3" />
            <Avatar src="https://i.pravatar.cc/300?img=4" />
            <Avatar src="https://i.pravatar.cc/300?img=5" />
        </AvatarGroup>
    )
};
