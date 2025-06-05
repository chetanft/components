import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FileTypeIcon } from '../components/FileTypeIcon';

const meta: Meta<typeof FileTypeIcon> = {
  title: 'Components/FileTypeIcon',
  component: FileTypeIcon,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'File type icon component for displaying file format indicators (XLS, CSV, PDF, DOC, etc.) with proper gradients, colors, and error states.'
      }
    }
  },
  argTypes: {
    fileType: {
      control: 'text',
      description: 'File type to display (XLS, CSV, PDF, DOC, etc.)'
    },
    variant: {
      control: 'radio',
      options: ['default', 'error'],
      description: 'Visual variant of the file type icon'
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the file type icon'
    }
  }
};

export default meta;
type Story = StoryObj<typeof FileTypeIcon>;

// Default file type icon
export const Default: Story = {
  args: {
    fileType: 'XLS',
    variant: 'default',
    size: 'md'
  }
};

// All file types showcase
export const AllFileTypes: Story = {
  render: () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">File Type Icons</h2>
      <div className="grid grid-cols-6 gap-4">
        <div className="text-center">
          <FileTypeIcon fileType="XLS" />
          <p className="mt-2 text-sm">XLS</p>
        </div>
        <div className="text-center">
          <FileTypeIcon fileType="CSV" />
          <p className="mt-2 text-sm">CSV</p>
        </div>
        <div className="text-center">
          <FileTypeIcon fileType="PDF" />
          <p className="mt-2 text-sm">PDF</p>
        </div>
        <div className="text-center">
          <FileTypeIcon fileType="DOC" />
          <p className="mt-2 text-sm">DOC</p>
        </div>
        <div className="text-center">
          <FileTypeIcon fileType="TXT" />
          <p className="mt-2 text-sm">TXT</p>
        </div>
        <div className="text-center">
          <FileTypeIcon fileType="!" variant="error" />
          <p className="mt-2 text-sm">Error</p>
        </div>
      </div>
    </div>
  )
};

// Size variants
export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="flex items-center gap-8">
        <div className="text-center">
          <FileTypeIcon fileType="XLS" size="sm" />
          <p className="mt-2 text-sm">Small</p>
        </div>
        <div className="text-center">
          <FileTypeIcon fileType="XLS" size="md" />
          <p className="mt-2 text-sm">Medium</p>
        </div>
        <div className="text-center">
          <FileTypeIcon fileType="XLS" size="lg" />
          <p className="mt-2 text-sm">Large</p>
        </div>
      </div>
    </div>
  )
};

// Error variant
export const ErrorVariant: Story = {
  args: {
    fileType: '!',
    variant: 'error',
    size: 'md'
  }
}; 