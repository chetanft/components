import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../components/organisms/Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Flexible card component with configurable content sections. Supports basic and advanced layouts with eyebrow, header, body, and footer sections.'
      }
    }
  },
  argTypes: {
    content: {
      control: 'select',
      options: ['Basic', 'Advanced'],
      description: 'Card content variant'
    },
    state: {
      control: 'select',
      options: ['Default'],
      description: 'Card state'
    },
    showEyebrow: {
      control: 'boolean',
      description: 'Show eyebrow section with badges'
    },
    showFooter: {
      control: 'boolean',
      description: 'Show footer section with actions'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Card>;

// Basic Card
export const Basic: Story = {
  args: {
    content: 'Basic',
    state: 'Default',
    showEyebrow: true,
    showFooter: true,
  },
};

// Advanced Card with Graphic
export const Advanced: Story = {
  args: {
    content: 'Advanced',
    state: 'Default', 
    showEyebrow: true,
    showFooter: true,
  },
};

// Without Eyebrow
export const WithoutEyebrow: Story = {
  args: {
    content: 'Basic',
    state: 'Default',
    showEyebrow: false,
    showFooter: true,
  },
};

// Without Footer
export const WithoutFooter: Story = {
  args: {
    content: 'Basic',
    state: 'Default',
    showEyebrow: true,
    showFooter: false,
  },
};

// Minimal Card
export const Minimal: Story = {
  args: {
    content: 'Basic',
    state: 'Default',
    showEyebrow: false,
    showFooter: false,
  },
};

// All Variants Showcase
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Card</h3>
        <div className="max-w-md">
          <Card 
            content="Basic"
            state="Default"
            showEyebrow={true}
            showFooter={true}
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Advanced Card</h3>
        <div className="max-w-md">
          <Card 
            content="Advanced"
            state="Default"
            showEyebrow={true}
            showFooter={true}
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Minimal Card</h3>
        <div className="max-w-md">
          <Card 
            content="Basic"
            state="Default"
            showEyebrow={false}
            showFooter={false}
          />
        </div>
      </div>
    </div>
  ),
};
