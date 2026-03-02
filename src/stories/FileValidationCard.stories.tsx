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
    explorer: {
      mode: 'matrix' as const,
      behavior: 'inline' as const,
      previewMode: 'inline' as const,
      defaultRowId: 'type',
      defaultScenarioId: 'Default',
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'Default', label: 'Default', story: 'Default' as const },
            { id: 'Success', label: 'Success', story: 'Success' as const },
            { id: 'Failed', label: 'Failed', story: 'Failed' as const },
            { id: 'Partial', label: 'Partial', story: 'Partial' as const },
            { id: 'CSV', label: 'CSV', story: 'CSV' as const },
          ],
        },
      ],
      supportsGlass: true,
    },
  },
  tags: ['autodocs'],
  args: {
    glass: true,
  },
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
    glass: {
      control: 'select',
      options: [false, true, 'subtle', 'prominent'],
      description: 'Glass style variant',
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
