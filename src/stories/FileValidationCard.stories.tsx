import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FileValidationCard } from '../components/molecules/FileValidationCard';

const meta = {
  title: 'Molecules/FileValidationCard',
  component: FileValidationCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A card component displaying file validation status and statistics.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    validationStatus: {
      control: 'select',
      options: ['validating', 'success', 'failed', 'partial'],
      description: 'The validation status',
    },
    fileType: {
      control: 'select',
      options: ['excel', 'csv', 'generic'],
      description: 'The file type icon to display',
    },
  },
} satisfies Meta<typeof FileValidationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Validating: Story = {
  args: {
    fileName: 'File 178.xlsx',
    fileType: 'excel',
    uploadedAt: new Date(),
    validationStatus: 'validating',
    onDelete: () => console.log('Delete clicked'),
  },
};

export const Success: Story = {
  args: {
    fileName: 'File 178.xlsx',
    fileType: 'excel',
    uploadedAt: new Date(),
    validationStatus: 'success',
    validationStats: {
      total: 850,
      success: 850,
      invalid: 0,
    },
    onDelete: () => console.log('Delete clicked'),
    onDownload: () => console.log('Download clicked'),
    onViewDetails: () => console.log('View details clicked'),
  },
};

export const Failed: Story = {
  args: {
    fileName: 'File 178.xlsx',
    fileType: 'excel',
    uploadedAt: new Date(),
    validationStatus: 'failed',
    validationStats: {
      total: 850,
      success: 0,
      invalid: 850,
    },
    onDelete: () => console.log('Delete clicked'),
    onDownload: () => console.log('Download clicked'),
    onViewDetails: () => console.log('View details clicked'),
  },
};

export const PartiallyProcessed: Story = {
  args: {
    fileName: 'File 178.xlsx',
    fileType: 'excel',
    uploadedAt: new Date(),
    validationStatus: 'partial',
    validationStats: {
      total: 850,
      success: 595,
      invalid: 255,
    },
    onDelete: () => console.log('Delete clicked'),
    onDownload: () => console.log('Download clicked'),
    onViewDetails: () => console.log('View details clicked'),
  },
};

export const CSVFile: Story = {
  args: {
    fileName: 'data-export.csv',
    fileType: 'csv',
    uploadedAt: new Date(),
    validationStatus: 'success',
    validationStats: {
      total: 1250,
      success: 1250,
      invalid: 0,
    },
    onDelete: () => console.log('Delete clicked'),
    onDownload: () => console.log('Download clicked'),
  },
};

