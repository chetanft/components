import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

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
      options: [
        'title-primary',
        'title-secondary',
        'display-primary',
        'button',
        'body-primary-semibold',
        'body-primary-medium',
        'body-primary-italic',
        'body-primary-regular',
        'body-secondary-semibold',
        'body-secondary-medium',
        'body-secondary-regular'
      ],
      description: 'Typography variant based on Figma design system (28/140 = 28px font, 140% line-height)'
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
    variant: 'body-primary-regular',
  },
};

// Quick test for developers - All Figma variants
export const QuickTest = () => (
  <div style={{ border: '1px solid #e5e7eb', padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
    <h3 style={{ color: '#374151', marginBottom: '16px', marginTop: 0 }}>🚀 All Figma Typography Variants</h3>
    <div style={{ display: 'grid', gap: '12px' }}>
      <div><strong>Title:</strong></div>
      <Typography variant="title-primary">Title Primary: 28/140</Typography>
      <Typography variant="title-secondary">Title Secondary: 24/140</Typography>
      
      <div style={{ marginTop: '12px' }}><strong>Display:</strong></div>
      <Typography variant="display-primary">Display Primary: 20/140</Typography>
      
      <div style={{ marginTop: '12px' }}><strong>Button:</strong></div>
      <Typography variant="button">Button: 20/140</Typography>
      
      <div style={{ marginTop: '12px' }}><strong>Body Primary (16px):</strong></div>
      <Typography variant="body-primary-semibold">Body Primary Semibold: 16/140</Typography>
      <Typography variant="body-primary-medium">Body Primary Medium: 16/140</Typography>
      <Typography variant="body-primary-italic">Body Primary Italic: 16/140</Typography>
      <Typography variant="body-primary-regular">Body Primary Regular: 16/140</Typography>
      
      <div style={{ marginTop: '12px' }}><strong>Body Secondary (14px):</strong></div>
      <Typography variant="body-secondary-semibold">Body Secondary Semibold: 14/140</Typography>
      <Typography variant="body-secondary-medium">Body Secondary Medium: 14/140</Typography>
      <Typography variant="body-secondary-regular">Body Secondary Regular: 14/140</Typography>
      
      <div style={{ marginTop: '12px' }}><strong>Colors:</strong></div>
      <Typography color="danger">Error: Something went wrong</Typography>
      <Typography color="success">Success: Operation completed</Typography>
    </div>
  </div>
);

// Figma design system showcase - Complete with all variants
export const FigmaDesignSystem = () => (
  <div className="space-y-8 p-6">
    <div className="border-l-4 border-blue-500 pl-4">
      <h2 className="text-xl font-bold mb-2">📋 Figma Typography System</h2>
      <p className="text-gray-600">Complete specifications from Figma (Format: Size/LineHeight)</p>
    </div>
    
    {/* Title Styles */}
    <section>
      <h3 className="text-lg font-semibold mb-4 text-blue-600 border-b border-blue-200 pb-2">📖 Title</h3>
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <code className="text-xs bg-white px-2 py-1 rounded">variant="title-primary"</code>
            <small className="text-xs text-gray-500">Primary · 28/140</small>
          </div>
          <Typography variant="title-primary">Title Primary - Page Title</Typography>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <code className="text-xs bg-white px-2 py-1 rounded">variant="title-secondary"</code>
            <small className="text-xs text-gray-500">Secondary · 24/140</small>
          </div>
          <Typography variant="title-secondary">Title Secondary - Section Heading</Typography>
        </div>
      </div>
    </section>

    {/* Display Styles */}
    <section>
      <h3 className="text-lg font-semibold mb-4 text-green-600 border-b border-green-200 pb-2">🎯 Display</h3>
      <div className="bg-green-50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <code className="text-xs bg-white px-2 py-1 rounded">variant="display-primary"</code>
          <small className="text-xs text-gray-500">Primary · 20/140</small>
        </div>
        <Typography variant="display-primary">Display Primary - Dashboard Data</Typography>
      </div>
    </section>

    {/* Button Styles */}
    <section>
      <h3 className="text-lg font-semibold mb-4 text-orange-600 border-b border-orange-200 pb-2">🔘 Button</h3>
      <div className="bg-orange-50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <code className="text-xs bg-white px-2 py-1 rounded">variant="button"</code>
          <small className="text-xs text-gray-500">Btn · 20/140</small>
        </div>
        <Typography variant="button">Button Text</Typography>
      </div>
    </section>

    {/* Body Primary Styles */}
    <section>
      <h3 className="text-lg font-semibold mb-4 text-purple-600 border-b border-purple-200 pb-2">📝 Body Primary (16px)</h3>
      <div className="space-y-4">
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <code className="text-xs bg-white px-2 py-1 rounded">variant="body-primary-semibold"</code>
            <small className="text-xs text-gray-500">Primary - Semibold · 16/140</small>
          </div>
          <Typography variant="body-primary-semibold">Body Primary Semibold - Important text</Typography>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <code className="text-xs bg-white px-2 py-1 rounded">variant="body-primary-medium"</code>
            <small className="text-xs text-gray-500">Primary - Medium · 16/140</small>
          </div>
          <Typography variant="body-primary-medium">Body Primary Medium - Highlighted content</Typography>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <code className="text-xs bg-white px-2 py-1 rounded">variant="body-primary-italic"</code>
            <small className="text-xs text-gray-500">Primary - Italic · 16/140</small>
          </div>
          <Typography variant="body-primary-italic">Body Primary Italic - Emphasized text</Typography>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <code className="text-xs bg-white px-2 py-1 rounded">variant="body-primary-regular"</code>
            <small className="text-xs text-gray-500">Primary - Regular · 16/140</small>
          </div>
          <Typography variant="body-primary-regular">Body Primary Regular - Standard content</Typography>
        </div>
      </div>
    </section>

    {/* Body Secondary Styles */}
    <section>
      <h3 className="text-lg font-semibold mb-4 text-indigo-600 border-b border-indigo-200 pb-2">📄 Body Secondary (14px)</h3>
      <div className="space-y-4">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <code className="text-xs bg-white px-2 py-1 rounded">variant="body-secondary-semibold"</code>
            <small className="text-xs text-gray-500">Secondary - Semibold · 14/140</small>
          </div>
          <Typography variant="body-secondary-semibold">Body Secondary Semibold - Small important text</Typography>
        </div>
        <div className="bg-indigo-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <code className="text-xs bg-white px-2 py-1 rounded">variant="body-secondary-medium"</code>
            <small className="text-xs text-gray-500">Secondary - Medium · 14/140</small>
          </div>
          <Typography variant="body-secondary-medium">Body Secondary Medium - Small highlighted text</Typography>
        </div>
        <div className="bg-indigo-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <code className="text-xs bg-white px-2 py-1 rounded">variant="body-secondary-regular"</code>
            <small className="text-xs text-gray-500">Secondary - Regular · 14/140</small>
          </div>
          <Typography variant="body-secondary-regular">Body Secondary Regular - Small supporting text</Typography>
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

// AI Tools Usage Guide - Updated with new variants
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
          <div><code>{'<Typography variant="title-primary">Page Title</Typography>'}</code></div>
          <div><code>{'<Typography variant="title-secondary">Section</Typography>'}</code></div>
          <div><code>{'<Typography variant="body-primary-regular">Content</Typography>'}</code></div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-3 text-gray-800">🎯 Interactive Elements</h3>
        <div className="space-y-2 text-sm">
          <div><code>{'<Typography variant="button">Call to Action</Typography>'}</code></div>
          <div><code>{'<Typography variant="display-primary">Stats</Typography>'}</code></div>
          <div><code>{'<Typography color="danger">Error</Typography>'}</code></div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-3 text-gray-800">📝 Body Text Variants</h3>
        <div className="space-y-2 text-sm">
          <div><code>{'<Typography variant="body-primary-semibold">Important</Typography>'}</code></div>
          <div><code>{'<Typography variant="body-primary-medium">Highlighted</Typography>'}</code></div>
          <div><code>{'<Typography variant="body-primary-italic">Emphasized</Typography>'}</code></div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-3 text-gray-800">🔤 Small Text (14px)</h3>
        <div className="space-y-2 text-sm">
          <div><code>{'<Typography variant="body-secondary-semibold">Label</Typography>'}</code></div>
          <div><code>{'<Typography variant="body-secondary-medium">Caption</Typography>'}</code></div>
          <div><code>{'<Typography variant="body-secondary-regular">Info</Typography>'}</code></div>
        </div>
      </div>
    </div>
  </div>
);

// Individual variant stories - Figma Design System
export const TitlePrimary: Story = {
  args: {
    children: 'Page Title - 28/140',
    variant: 'title-primary',
  },
};

export const TitleSecondary: Story = {
  args: {
    children: 'Section Heading - 24/140',
    variant: 'title-secondary',
  },
};

export const DisplayPrimary: Story = {
  args: {
    children: 'Display Primary - 20/140',
    variant: 'display-primary',
  },
};

export const ButtonText: Story = {
  args: {
    children: 'Button Text - 20/140',
    variant: 'button',
  },
};

export const BodyPrimarySemibold: Story = {
  args: {
    children: 'Body Primary Semibold - 16/140',
    variant: 'body-primary-semibold',
  },
};

export const BodyPrimaryMedium: Story = {
  args: {
    children: 'Body Primary Medium - 16/140',
    variant: 'body-primary-medium',
  },
};

export const BodyPrimaryItalic: Story = {
  args: {
    children: 'Body Primary Italic - 16/140',
    variant: 'body-primary-italic',
  },
};

export const BodyPrimaryRegular: Story = {
  args: {
    children: 'Body Primary Regular - 16/140',
    variant: 'body-primary-regular',
  },
};

export const BodySecondarySemibold: Story = {
  args: {
    children: 'Body Secondary Semibold - 14/140',
    variant: 'body-secondary-semibold',
  },
};

export const BodySecondaryMedium: Story = {
  args: {
    children: 'Body Secondary Medium - 14/140',
    variant: 'body-secondary-medium',
  },
};

export const BodySecondaryRegular: Story = {
  args: {
    children: 'Body Secondary Regular - 14/140',
    variant: 'body-secondary-regular',
  },
};

// Color variants
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
