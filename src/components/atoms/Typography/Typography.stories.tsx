import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Typography, TypographyShowcase } from './Typography';

const meta = {
  title: 'Atoms/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '🎨 **Typography Component** - Reusable text component with exact Figma specifications. Perfect for AI tools, development, and design documentation. Use this for all text rendering needs.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'display-bold', 'body-semibold', 'body-regular', 'body-medium', 'caption', 'button'],
      description: 'Typography variant based on Figma design system'
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Override the default size of the variant'
    },
    weight: {
      control: 'select',
      options: ['regular', 'medium', 'semibold', 'bold'],
      description: 'Override the default weight of the variant'
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'muted', 'danger', 'success', 'warning'],
      description: 'Text color semantic variants'
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default interactive story for controls
export const Default: Story = {
  args: {
    children: 'Interactive Typography Component',
    variant: 'p',
  },
};

// Quick test for developers
export const QuickTest = () => (
  <div style={{ border: '1px solid #e5e7eb', padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
    <h3 style={{ color: '#374151', marginBottom: '16px', marginTop: 0 }}>🚀 Quick Typography Test</h3>
    <div style={{ display: 'grid', gap: '12px' }}>
      <Typography variant="h1">H1: Main Page Title</Typography>
      <Typography variant="h2">H2: Section Heading</Typography>
      <Typography variant="display-bold">Display: Key Information</Typography>
      <Typography variant="body-semibold">Body Semibold: Important Text</Typography>
      <Typography variant="body-regular">Body Regular: Standard Text Content</Typography>
      <Typography variant="button">Button Text</Typography>
      <Typography color="danger">Error: Something went wrong</Typography>
      <Typography color="success">Success: Operation completed</Typography>
    </div>
  </div>
);

// Figma design system showcase
export const FigmaDesignSystem = () => (
  <div className="space-y-8 p-6">
    <div className="border-l-4 border-blue-500 pl-4">
      <h2 className="text-xl font-bold mb-2">📋 Figma Typography System</h2>
      <p className="text-gray-600">Exact specifications from the design system. Use these variants for consistent UI.</p>
    </div>
    
    {/* Title Styles */}
    <section>
      <h3 className="text-lg font-semibold mb-4 text-blue-600 border-b border-blue-200 pb-2">📖 Title Styles</h3>
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <code className="text-xs bg-white px-2 py-1 rounded">variant="h1"</code>
            <small className="text-xs text-gray-500">28px, Regular, 140% line-height</small>
          </div>
          <Typography variant="h1">Page Title - Freight Tiger Logistics</Typography>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <code className="text-xs bg-white px-2 py-1 rounded">variant="h2"</code>
            <small className="text-xs text-gray-500">24px, Semibold, 140% line-height</small>
          </div>
          <Typography variant="h2">Section Title - Dashboard Overview</Typography>
        </div>
      </div>
    </section>

    {/* Display Styles */}
    <section>
      <h3 className="text-lg font-semibold mb-4 text-green-600 border-b border-green-200 pb-2">🎯 Display Styles</h3>
      <div className="bg-green-50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <code className="text-xs bg-white px-2 py-1 rounded">variant="display-bold"</code>
          <small className="text-xs text-gray-500">20px, Semibold, 140% line-height</small>
        </div>
        <Typography variant="display-bold">Key Metrics and Dashboard Data</Typography>
      </div>
    </section>

    {/* Body Styles */}
    <section>
      <h3 className="text-lg font-semibold mb-4 text-purple-600 border-b border-purple-200 pb-2">📝 Body Styles</h3>
      <div className="space-y-4">
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <code className="text-xs bg-white px-2 py-1 rounded">variant="body-semibold"</code>
            <small className="text-xs text-gray-500">16px, Semibold, 140% line-height</small>
          </div>
          <Typography variant="body-semibold">Important body text for emphasis and key information</Typography>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <code className="text-xs bg-white px-2 py-1 rounded">variant="body-regular"</code>
            <small className="text-xs text-gray-500">16px, Regular, 140% line-height</small>
          </div>
          <Typography variant="body-regular">Standard body text for regular content and descriptions</Typography>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <code className="text-xs bg-white px-2 py-1 rounded">variant="body-medium"</code>
            <small className="text-xs text-gray-500">14px, Medium, 140% line-height</small>
          </div>
          <Typography variant="body-medium">Secondary body text for supporting information</Typography>
        </div>
      </div>
    </section>

    {/* Special Styles */}
    <section>
      <h3 className="text-lg font-semibold mb-4 text-orange-600 border-b border-orange-200 pb-2">⚡ Special Styles</h3>
      <div className="space-y-4">
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <code className="text-xs bg-white px-2 py-1 rounded">variant="button"</code>
            <small className="text-xs text-gray-500">20px, Medium, 140% line-height, letter-spacing</small>
          </div>
          <Typography variant="button">Call to Action Button</Typography>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <code className="text-xs bg-white px-2 py-1 rounded">variant="caption"</code>
            <small className="text-xs text-gray-500">14px, Regular, 140% line-height</small>
          </div>
          <Typography variant="caption">Caption text for small supporting details</Typography>
        </div>
      </div>
    </section>

    {/* Color Variants */}
    <section>
      <h3 className="text-lg font-semibold mb-4 text-red-600 border-b border-red-200 pb-2">🎨 Color Variants</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <code className="text-xs bg-white px-2 py-1 rounded mb-2 block">color="primary"</code>
          <Typography color="primary">Primary text color</Typography>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <code className="text-xs bg-white px-2 py-1 rounded mb-2 block">color="secondary"</code>
          <Typography color="secondary">Secondary text color</Typography>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <code className="text-xs bg-white px-2 py-1 rounded mb-2 block">color="danger"</code>
          <Typography color="danger">Error messages</Typography>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <code className="text-xs bg-white px-2 py-1 rounded mb-2 block">color="success"</code>
          <Typography color="success">Success messages</Typography>
        </div>
      </div>
    </section>
  </div>
);

// AI Tools Usage Guide
export const AIToolsGuide = () => (
  <div className="space-y-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-2">🤖 AI Tools Usage Guide</h2>
      <p className="text-gray-600">Perfect examples for Cursor AI, lovable.dev, and other AI development tools</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-3 text-gray-800">📄 Page Structure</h3>
        <div className="space-y-2 text-sm">
          <div><code>{'<Typography variant="h1">Page Title</Typography>'}</code></div>
          <div><code>{'<Typography variant="h2">Section</Typography>'}</code></div>
          <div><code>{'<Typography variant="body-regular">Content</Typography>'}</code></div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-3 text-gray-800">🎯 Interactive Elements</h3>
        <div className="space-y-2 text-sm">
          <div><code>{'<Typography variant="button">Call to Action</Typography>'}</code></div>
          <div><code>{'<Typography color="danger">Error</Typography>'}</code></div>
          <div><code>{'<Typography color="success">Success</Typography>'}</code></div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-3 text-gray-800">⚙️ Custom Styling</h3>
        <div className="space-y-2 text-sm">
          <div><code>{'<Typography size="xl" weight="bold">Custom</Typography>'}</code></div>
          <div><code>{'<Typography as="span">Inline text</Typography>'}</code></div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-3 text-gray-800">📱 Common Patterns</h3>
        <div className="space-y-2 text-sm">
          <div><code>{'<Typography variant="display-bold">Dashboard</Typography>'}</code></div>
          <div><code>{'<Typography variant="body-semibold">Key Info</Typography>'}</code></div>
        </div>
      </div>
    </div>
  </div>
);

// Individual variant stories for testing
export const H1Title: Story = {
  args: {
    children: 'Page Title Heading',
    variant: 'h1',
  },
};

export const H2Section: Story = {
  args: {
    children: 'Section Heading',
    variant: 'h2',
  },
};

export const DisplayBold: Story = {
  args: {
    children: 'Key Dashboard Information',
    variant: 'display-bold',
  },
};

export const BodySemibold: Story = {
  args: {
    children: 'Important body text content',
    variant: 'body-semibold',
  },
};

export const BodyRegular: Story = {
  args: {
    children: 'Standard body text for regular content',
    variant: 'body-regular',
  },
};

export const ButtonText: Story = {
  args: {
    children: 'Call to Action',
    variant: 'button',
  },
};

export const ErrorMessage: Story = {
  args: {
    children: 'Error message text',
    color: 'danger',
  },
};

export const SuccessMessage: Story = {
  args: {
    children: 'Success confirmation message',
    color: 'success',
  },
};

// Legacy documentation showcase (hidden by default)
export const CompleteLegacyDocumentation = () => (
  <div>
    <div style={{ 
      background: '#fef3c7', 
      border: '1px solid #f59e0b', 
      borderRadius: '8px', 
      padding: '16px', 
      marginBottom: '24px',
      color: '#92400e'
    }}>
      <strong>📚 Legacy Documentation:</strong> This is the original design system showcase for reference only.
    </div>
    <TypographyShowcase />
  </div>
); 