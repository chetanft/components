import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Avatar, AvatarGroup, AvatarImage, AvatarFallback } from './Avatar';

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

// Composable API Examples (Recommended)
export const ComposableBasic: Story = {
  render: () => (
    <div className="p-6 flex gap-4 items-center">
      <Avatar size="md" shape="circle">
        <AvatarImage src="https://i.pravatar.cc/300" alt="User" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar size="md" shape="circle">
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '✅ **Composable API**: Use AvatarImage and AvatarFallback sub-components for flexible avatar composition.',
      },
    },
  },
};

export const ComposableWithFallback: Story = {
  render: () => (
    <div className="p-6 flex gap-4 items-center">
      <Avatar size="md" shape="circle">
        <AvatarImage src="invalid-url" alt="User" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar size="lg" shape="square">
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'AvatarFallback displays when image fails to load or is not provided.',
      },
    },
  },
};

// Mark deprecated examples
export const Default: Story = {
  args: {
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: '⚠️ **Deprecated**: This uses the deprecated `src` prop. Use the composable API with AvatarImage and AvatarFallback instead.',
      },
    },
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
