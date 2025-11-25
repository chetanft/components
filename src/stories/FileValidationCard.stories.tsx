import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FileValidationCard } from '../components/molecules/FileValidationCard';

const meta: Meta<typeof FileValidationCard> = {
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
};

export default meta;
type Story = StoryObj<typeof FileValidationCard>;

export const Default: Story = {
  args: {
    fileName: 'File 178.xlsx',
    fileType: 'excel',
    uploadedAt: new Date(),
    validationStatus: 'validating',
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
  },
};

export const Partial: Story = {
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
  },
};

export const CSV: Story = {
  args: {
    fileName: 'data_export.csv',
    fileType: 'csv',
    uploadedAt: new Date(),
    validationStatus: 'success',
    validationStats: {
      total: 1200,
      success: 1200,
      invalid: 0,
    },
  },
};
