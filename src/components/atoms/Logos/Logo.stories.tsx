import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from './Logo';

const meta: Meta<typeof Logo> = {
  title: 'Atoms/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Logo component for displaying company logos.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: ['ft', 'tata-motors'],
      description: 'Logo name to display',
    },
    width: {
      control: 'number',
      description: 'Width of the logo',
    },
    height: {
      control: 'number',
      description: 'Height of the logo',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: {
    name: 'ft',
  },
};

export const FT: Story = {
  args: {
    name: 'ft',
  },
};

export const TataMotors: Story = {
  args: {
    name: 'tata-motors',
  },
};

export const CustomSize: Story = {
  args: {
    name: 'ft',
    width: 150,
    height: 24,
  },
};

export const TataMotorsLarge: Story = {
  args: {
    name: 'tata-motors',
    width: 200,
    height: 40,
  },
};
