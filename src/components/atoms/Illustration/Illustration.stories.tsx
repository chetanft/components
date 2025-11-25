import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Illustration } from './Illustration';

const meta: Meta<typeof Illustration> = {
  title: 'Atoms/Illustration',
  component: Illustration,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Illustration component for displaying images with various sizes and styling options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['overview', 'insights', 'workspace', 'reports'],
      description: 'Predefined illustration variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the illustration',
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Border radius style',
    },
    background: {
      control: 'select',
      options: ['transparent', 'subtle'],
      description: 'Background style',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Illustration>;

export const Default: Story = {
  args: {
    variant: 'overview',
    size: 'md',
  },
};

export const Overview: Story = {
  args: {
    variant: 'overview',
    size: 'lg',
  },
};

export const Insights: Story = {
  args: {
    variant: 'insights',
    size: 'lg',
  },
};

export const Workspace: Story = {
  args: {
    variant: 'workspace',
    size: 'lg',
  },
};

export const Reports: Story = {
  args: {
    variant: 'reports',
    size: 'lg',
  },
};

// Sizes showcase
export function Sizes() {
  return (
    <div className="flex flex-wrap gap-4 items-end p-6">
      <div className="text-center">
        <Illustration variant="overview" size="sm" />
        <p className="mt-2 text-sm text-gray-600">Small</p>
      </div>
      <div className="text-center">
        <Illustration variant="overview" size="md" />
        <p className="mt-2 text-sm text-gray-600">Medium</p>
      </div>
      <div className="text-center">
        <Illustration variant="overview" size="lg" />
        <p className="mt-2 text-sm text-gray-600">Large</p>
      </div>
      <div className="text-center">
        <Illustration variant="overview" size="xl" />
        <p className="mt-2 text-sm text-gray-600">Extra Large</p>
      </div>
    </div>
  );
}

// All Variants showcase
export function AllVariants() {
  return (
    <div className="grid grid-cols-2 gap-6 p-6">
      <div className="text-center">
        <Illustration variant="overview" size="md" />
        <p className="mt-2 text-sm text-gray-600">Overview</p>
      </div>
      <div className="text-center">
        <Illustration variant="insights" size="md" />
        <p className="mt-2 text-sm text-gray-600">Insights</p>
      </div>
      <div className="text-center">
        <Illustration variant="workspace" size="md" />
        <p className="mt-2 text-sm text-gray-600">Workspace</p>
      </div>
      <div className="text-center">
        <Illustration variant="reports" size="md" />
        <p className="mt-2 text-sm text-gray-600">Reports</p>
      </div>
    </div>
  );
}

