import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { SubText } from './SubText';

const meta = {
  title: 'Atoms/SubText',
  component: SubText,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A sub-text component for displaying secondary information. Can optionally include a check icon.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: { type: 'select' },
      options: ['Yes', 'No'],
      description: 'Whether to show the check icon'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    }
  },
} satisfies Meta<typeof SubText>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default sub text (no icon)
export const Default: Story = {
  args: {
    icon: 'No',
  },
};

// With icon
export const WithIcon: Story = {
  args: {
    icon: 'Yes',
  },
};

// Both variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Without Icon</h3>
        <div className="max-w-xs">
          <SubText icon="No" />
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold mb-4">With Check Icon</h3>
        <div className="max-w-xs">
          <SubText icon="Yes" />
        </div>
      </div>
    </div>
  ),
};

// Usage examples
export const UsageExamples: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="font-semibold mb-4">Form Field Examples</h3>
        <div className="space-y-4 max-w-md">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-900">
              Email Address
            </label>
            <input 
              type="email" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your email"
            />
            <SubText icon="No" />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <input 
              type="password" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your password"
            />
            <SubText icon="Yes" />
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold mb-4">Status Examples</h3>
        <div className="space-y-3 max-w-sm">
          <div className="p-3 border rounded-lg">
            <div className="font-medium text-gray-900 mb-1">Profile Setup</div>
            <SubText icon="Yes" />
          </div>
          
          <div className="p-3 border rounded-lg">
            <div className="font-medium text-gray-900 mb-1">Email Verification</div>
            <SubText icon="No" />
          </div>
          
          <div className="p-3 border rounded-lg">
            <div className="font-medium text-gray-900 mb-1">Payment Method</div>
            <SubText icon="Yes" />
          </div>
        </div>
      </div>
    </div>
  ),
};
