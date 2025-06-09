import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Typography, TypographyShowcase } from './Typography';

const meta = {
  title: 'Atoms/Typography (Reusable)',
  component: Typography,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Reusable Typography component for AI tools and development. Use this component instead of the documentation showcase.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'display-bold', 'body-semibold', 'body-regular', 'body-medium', 'caption', 'button'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
    },
    weight: {
      control: 'select',
      options: ['regular', 'medium', 'semibold', 'bold'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'muted', 'danger', 'success', 'warning'],
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

// Debug story to test basic functionality
export const Debug = () => (
  <div style={{ border: '1px solid red', padding: '20px', backgroundColor: 'white' }}>
    <h2 style={{ color: 'red', marginBottom: '20px' }}>🔧 Debug: Typography Component Test</h2>
    <div style={{ border: '1px solid blue', margin: '10px 0', padding: '10px' }}>
      <strong>H1:</strong>
      <Typography variant="h1">Test H1 - Should be visible</Typography>
    </div>
    <div style={{ border: '1px solid green', margin: '10px 0', padding: '10px' }}>
      <strong>Body Paragraph:</strong>
      <Typography variant="p">Test paragraph - Should be visible</Typography>
    </div>
    <div style={{ border: '1px solid purple', margin: '10px 0', padding: '10px' }}>
      <strong>Body Semibold:</strong>
      <Typography variant="body-semibold">Test body semibold - Should be visible</Typography>
    </div>
    <div style={{ border: '1px solid orange', margin: '10px 0', padding: '10px' }}>
      <strong>Regular HTML for comparison:</strong>
      <p style={{ color: 'black', fontSize: '16px', margin: 0 }}>Regular HTML paragraph</p>
    </div>
  </div>
);

// Figma-based typography showcase
export const FigmaTypographyShowcase = () => (
  <div className="space-y-8 p-6">
    <div>
      <h2 className="text-2xl font-bold mb-4">📋 Figma Typography Styles</h2>
      <p className="text-gray-600 mb-6">These match the exact styles from the Figma design system.</p>
    </div>
    
    {/* Title Styles */}
    <section>
      <h3 className="text-lg font-semibold mb-4 text-blue-600">Title Styles</h3>
      <div className="space-y-4">
        <div>
          <small className="text-xs text-gray-500">Title Primary (28px, Regular, Line-height: 140%)</small>
          <Typography variant="h1">Freight Tiger is building logistics infrastructure to transform commerce in India.</Typography>
        </div>
        <div>
          <small className="text-xs text-gray-500">Title Secondary (24px, Semibold, Line-height: 140%)</small>
          <Typography variant="h2">Freight Tiger is building logistics infrastructure to transform commerce in India.</Typography>
        </div>
      </div>
    </section>

    {/* Display Styles */}
    <section>
      <h3 className="text-lg font-semibold mb-4 text-green-600">Display Styles</h3>
      <div>
        <small className="text-xs text-gray-500">Display Primary (20px, Semibold, Line-height: 140%)</small>
        <Typography variant="display-bold">Freight Tiger is building logistics infrastructure to transform commerce in India.</Typography>
      </div>
    </section>

    {/* Body Styles */}
    <section>
      <h3 className="text-lg font-semibold mb-4 text-purple-600">Body Styles</h3>
      <div className="space-y-4">
        <div>
          <small className="text-xs text-gray-500">Body Primary Semibold (16px, Semibold, Line-height: 140%)</small>
          <Typography variant="body-semibold">Freight Tiger is building logistics infrastructure to transform commerce in India.</Typography>
        </div>
        <div>
          <small className="text-xs text-gray-500">Body Primary Regular (16px, Regular, Line-height: 140%)</small>
          <Typography variant="body-regular">Freight Tiger is building logistics infrastructure to transform commerce in India.</Typography>
        </div>
        <div>
          <small className="text-xs text-gray-500">Body Secondary Semibold (14px, Semibold, Line-height: 140%)</small>
          <Typography variant="body-medium" size="sm" weight="semibold">Freight Tiger is building logistics infrastructure to transform commerce in India.</Typography>
        </div>
      </div>
    </section>

    {/* Button Styles */}
    <section>
      <h3 className="text-lg font-semibold mb-4 text-red-600">Button Styles</h3>
      <div>
        <small className="text-xs text-gray-500">Button (20px, Medium, Line-height: 140%, Letter-spacing: 0.00163rem)</small>
        <Typography variant="button">Button</Typography>
      </div>
    </section>
  </div>
);

export const Default: Story = {
  args: {
    children: 'This is default typography text',
    variant: 'p',
  },
};

export const H1: Story = {
  args: {
    children: 'Page Title Heading',
    variant: 'h1',
  },
};

export const H2: Story = {
  args: {
    children: 'Section Heading',
    variant: 'h2',
  },
};

export const BodySemibold: Story = {
  args: {
    children: 'Important body text content',
    variant: 'body-semibold',
  },
};

export const DangerText: Story = {
  args: {
    children: 'Error message text',
    color: 'danger',
  },
};

export const CustomSize: Story = {
  args: {
    children: 'Custom styled text',
    size: 'xxl',
    weight: 'bold',
  },
};

// All typography variants in one view
export const AllVariants = () => (
  <div className="space-y-4">
    <Typography variant="h1">H1: Page Title</Typography>
    <Typography variant="h2">H2: Section Title</Typography>
    <Typography variant="h3">H3: Subsection Title</Typography>
    <Typography variant="display-bold">Display Bold: Key Information</Typography>
    <Typography variant="body-semibold">Body Semibold: Important Content</Typography>
    <Typography variant="body-regular">Body Regular: Standard Content</Typography>
    <Typography variant="body-medium">Body Medium: Emphasized Content</Typography>
    <Typography variant="caption">Caption: Small Supporting Text</Typography>
    <Typography variant="button">Button: Action Text</Typography>
    <Typography color="danger">Danger: Error Messages</Typography>
    <Typography color="success">Success: Confirmation Messages</Typography>
  </div>
);

// Keep the original documentation showcase but rename it
export const LegacyDocumentationShowcase = () => <TypographyShowcase />; 