import type { Meta, StoryObj } from '@storybook/react';
import { UploadItem } from './UploadItem';

const meta: Meta<typeof UploadItem> = {
  title: 'Molecules/UploadItem',
  component: UploadItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Upload item component for displaying file upload status with progress tracking.',
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
            { id: 'TextType', label: 'Text Type', story: 'TextType' as const },
          ],
        },
        {
          id: 'state',
          label: 'State',
          scenarios: [
            { id: 'Default', label: 'Default', story: 'Default' as const },
            { id: 'Uploading', label: 'Uploading', story: 'Uploading' as const },
            { id: 'Uploaded', label: 'Uploaded', story: 'Uploaded' as const },
            { id: 'Saved', label: 'Saved', story: 'Saved' as const },
            { id: 'Error', label: 'Error', story: 'Error' as const },
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
    type: {
      control: 'select',
      options: ['card', 'text', 'thumbnail'],
      description: 'Visual type of the upload item',
    },
    state: {
      control: 'select',
      options: ['uploading', 'uploaded', 'saved', 'error'],
      description: 'Current upload state',
    },
    glass: {
      control: 'select',
      options: [false, true, 'subtle', 'prominent'],
      description: 'Glass style variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof UploadItem>;

const sampleFile = {
  id: '1',
  name: 'File 178.xlsx',
  size: 2048576,
  type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  uploadProgress: 45,
  uploadedAt: new Date(),
};

export const Default: Story = {
  args: {
    file: sampleFile,
    state: 'uploading',
    type: 'card',
  },
};

export const Uploading: Story = {
  args: {
    file: { ...sampleFile, uploadProgress: 45 },
    state: 'uploading',
    type: 'card',
  },
};

export const Uploaded: Story = {
  args: {
    file: { ...sampleFile, uploadProgress: 100 },
    state: 'uploaded',
    type: 'card',
  },
};

export const Saved: Story = {
  args: {
    file: { ...sampleFile, uploadProgress: 100 },
    state: 'saved',
    type: 'card',
  },
};

export const Error: Story = {
  args: {
    file: sampleFile,
    state: 'error',
    type: 'card',
  },
};

export const TextType: Story = {
  args: {
    file: sampleFile,
    state: 'uploaded',
    type: 'text',
  },
};

export const TextUploading: Story = {
  args: {
    file: { ...sampleFile, uploadProgress: 30 },
    state: 'uploading',
    type: 'text',
  },
};

export const TextError: Story = {
  args: {
    file: sampleFile,
    state: 'error',
    type: 'text',
  },
};
