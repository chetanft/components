import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FileCard } from '../components/FileCard';

const meta: Meta<typeof FileCard> = {
  title: 'Components/FileCard',
  component: FileCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Comprehensive file management card component for displaying file information, processing states, statistics, and actions. Supports various file processing workflows with progress tracking and error handling.'
      }
    }
  },
  argTypes: {
    fileName: {
      control: 'text',
      description: 'Name of the file'
    },
    fileType: {
      control: 'text',
      description: 'File type (XLS, CSV, PDF, etc.)'
    },
    status: {
      control: 'select',
      options: ['uploading', 'validating', 'processed', 'partially-processed', 'failed', 'template-mismatch', 'upload-failed', 'unsupported', 'empty', 'too-large'],
      description: 'Current status of the file'
    },
    variant: {
      control: 'radio',
      options: ['compact', 'expanded', 'with-progress', 'with-stats'],
      description: 'Visual variant of the file card'
    }
  }
};

export default meta;
type Story = StoryObj<typeof FileCard>;

// Default file card
export const Default: Story = {
  args: {
    fileName: 'File 178.xlsx',
    fileType: 'XLS',
    status: 'processed',
    fileDate: '12 April 2024, 5:30 PM',
    variant: 'compact'
  }
};

// Uploading state with progress
export const Uploading: Story = {
  args: {
    fileName: 'File 178.xlsx',
    fileType: 'XLS',
    status: 'uploading',
    progress: 23,
    variant: 'with-progress',
    onClose: () => alert('Cancel upload')
  }
};

// Validating state with loading icon
export const Validating: Story = {
  args: {
    fileName: 'File 178.xlsx',
    fileType: 'XLS',
    status: 'validating',
    fileDate: '12 April 2024, 5:30 PM',
    onClose: () => alert('Cancel')
  }
};

// Fully processed with stats
export const FullyProcessed: Story = {
  args: {
    fileName: 'File 178.xlsx',
    fileType: 'XLS',
    status: 'processed',
    fileDate: '12 April 2024, 5:30 PM',
    variant: 'with-stats',
    stats: { total: 100, success: 100, invalid: 0 },
    onDownload: () => alert('Download'),
    onPreview: () => alert('Preview'),
    onDelete: () => alert('Delete')
  }
};

// Partially processed with stats
export const PartiallyProcessed: Story = {
  args: {
    fileName: 'File 178.xlsx',
    fileType: 'XLS',
    status: 'partially-processed',
    fileDate: '12 April 2024, 5:30 PM',
    variant: 'with-stats',
    stats: { total: 100, success: 60, invalid: 40 },
    onDownload: () => alert('Download'),
    onPreview: () => alert('Preview'),
    onDelete: () => alert('Delete')
  }
};

// Error states
export const TemplateMismatch: Story = {
  args: {
    fileName: 'File 178.xlsx',
    fileType: 'XLS',
    status: 'template-mismatch',
    fileDate: '12 April 2024, 5:30 PM',
    errorMessage: 'Missing required column: Origin. Please use the sample template',
    onDelete: () => alert('Delete')
  }
};

export const UploadFailed: Story = {
  args: {
    fileName: 'File 178.xlsx',
    fileType: 'XLS',
    status: 'upload-failed',
    progress: 23,
    variant: 'with-progress',
    onRefresh: () => alert('Retry'),
    onDelete: () => alert('Delete')
  }
};

export const UnsupportedFormat: Story = {
  args: {
    fileName: 'File 178.txt',
    fileType: '!',
    status: 'unsupported',
    fileDate: '12 April 2024, 5:30 PM',
    onDelete: () => alert('Delete')
  }
};

export const FileTooLarge: Story = {
  args: {
    fileName: 'File 178.xlsx',
    fileType: 'XLS',
    status: 'too-large',
    progress: 23,
    variant: 'with-progress',
    onClose: () => alert('Cancel')
  }
};

// All states showcase
export const AllStates: Story = {
  render: () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">File Card States</h2>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Processing States</h3>
        
        <FileCard
          fileName="File 178.xlsx"
          fileType="XLS"
          status="uploading"
          progress={23}
          variant="with-progress"
        />
        
        <FileCard
          fileName="File 178.xlsx"
          fileType="XLS"
          status="validating"
          fileDate="12 April 2024, 5:30 PM"
        />
        
        <FileCard
          fileName="File 178.xlsx"
          fileType="XLS"
          status="processed"
          fileDate="12 April 2024, 5:30 PM"
          variant="with-stats"
          stats={{ total: 100, success: 100, invalid: 0 }}
        />
        
        <FileCard
          fileName="File 178.xlsx"
          fileType="XLS"
          status="partially-processed"
          fileDate="12 April 2024, 5:30 PM"
          variant="with-stats"
          stats={{ total: 100, success: 60, invalid: 40 }}
        />
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Error States</h3>
        
        <FileCard
          fileName="File 178.xlsx"
          fileType="XLS"
          status="template-mismatch"
          fileDate="12 April 2024, 5:30 PM"
          errorMessage="Missing required column: Origin. Please use the sample template"
        />
        
        <FileCard
          fileName="File 178.xlsx"
          fileType="XLS"
          status="upload-failed"
          progress={23}
          variant="with-progress"
        />
        
        <FileCard
          fileName="File 178.txt"
          fileType="!"
          status="unsupported"
          fileDate="12 April 2024, 5:30 PM"
        />
      </div>
    </div>
  )
}; 