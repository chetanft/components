import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FileCard } from '../components/organisms/FileCard';

const meta: Meta<typeof FileCard> = {
  title: 'Organisms/FileCard',
  component: FileCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'File management card component for displaying file information and processing states.',
      },
    },
  },
  argTypes: {
    fileName: {
      control: 'text',
      description: 'Name of the file',
    },
    fileType: {
      control: 'text',
      description: 'File type (XLS, CSV, PDF, etc.)',
    },
    status: {
      control: 'select',
      options: ['uploading', 'validating', 'processed', 'partially-processed', 'failed', 'template-mismatch', 'upload-failed', 'unsupported', 'empty', 'too-large'],
      description: 'Current status of the file',
    },
    variant: {
      control: 'radio',
      options: ['compact', 'expanded', 'with-progress', 'with-stats'],
      description: 'Visual variant of the file card',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FileCard>;

export const Default: Story = {
  args: {
    fileName: 'File 178.xlsx',
    fileType: 'XLS',
    status: 'processed',
    fileDate: '12 April 2024, 5:30 PM',
    variant: 'compact',
  },
};

export const Uploading: Story = {
  args: {
    fileName: 'File 178.xlsx',
    fileType: 'XLS',
    status: 'uploading',
    progress: 45,
    variant: 'with-progress',
  },
};

export const Validating: Story = {
  args: {
    fileName: 'File 178.xlsx',
    fileType: 'XLS',
    status: 'validating',
    fileDate: '12 April 2024, 5:30 PM',
  },
};

export const Processed: Story = {
  args: {
    fileName: 'File 178.xlsx',
    fileType: 'XLS',
    status: 'processed',
    fileDate: '12 April 2024, 5:30 PM',
    variant: 'with-stats',
    stats: { total: 100, success: 100, invalid: 0 },
  },
};

export const PartiallyProcessed: Story = {
  args: {
    fileName: 'File 178.xlsx',
    fileType: 'XLS',
    status: 'partially-processed',
    fileDate: '12 April 2024, 5:30 PM',
    variant: 'with-stats',
    stats: { total: 100, success: 60, invalid: 40 },
  },
};

export const Failed: Story = {
  args: {
    fileName: 'File 178.xlsx',
    fileType: 'XLS',
    status: 'failed',
    fileDate: '12 April 2024, 5:30 PM',
    variant: 'compact',
  },
};

export const CSV: Story = {
  args: {
    fileName: 'data_export.csv',
    fileType: 'CSV',
    status: 'processed',
    fileDate: '12 April 2024, 5:30 PM',
    variant: 'with-stats',
    stats: { total: 500, success: 500, invalid: 0 },
  },
};
