import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FileThumbnail } from '../components/organisms/FileThumbnail';

const meta: Meta<typeof FileThumbnail> = {
  title: 'Components/FileThumbnail',
  component: FileThumbnail,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Compact file thumbnail component for displaying file information with optional actions. Ideal for file lists, selected file displays, and file management interfaces.'
      }
    }
  },
  argTypes: {
    fileName: {
      control: 'text',
      description: 'Name of the file'
    },
    variant: {
      control: 'radio',
      options: ['uploaded', 'downloading'],
      description: 'Visual variant of the file thumbnail'
    }
  }
};

export default meta;
type Story = StoryObj<typeof FileThumbnail>;

// Default file thumbnail
export const Default: Story = {
  args: {
    fileName: 'Add_order_upload.xlsx',
    variant: 'uploaded',
    onDownload: () => alert('Download file')
  }
};

// Without download button
export const WithoutDownload: Story = {
  args: {
    fileName: 'Add_order_upload.xlsx',
    variant: 'uploaded'
  }
};

// Different file names
export const DifferentFiles: Story = {
  render: () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">File Thumbnails</h2>
      
      <FileThumbnail
        fileName="Product_inventory.xlsx"
        variant="uploaded"
        onDownload={() => alert('Download Product_inventory.xlsx')}
      />
      
      <FileThumbnail
        fileName="Customer_data_export.xlsx"
        variant="uploaded"
        onDownload={() => alert('Download Customer_data_export.xlsx')}
      />
      
      <FileThumbnail
        fileName="Financial_report_Q1_2024.xlsx"
        variant="uploaded"
        onDownload={() => alert('Download Financial_report_Q1_2024.xlsx')}
      />
      
      <FileThumbnail
        fileName="Very_long_filename_that_should_truncate_properly.xlsx"
        variant="uploaded"
        onDownload={() => alert('Download long file')}
      />
    </div>
  )
};

// Downloading state
export const Downloading: Story = {
  args: {
    fileName: 'Add_order_upload.xlsx',
    variant: 'downloading'
  }
}; 