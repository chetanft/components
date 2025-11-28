import type { Meta, StoryObj } from '@storybook/react';
import { Upload } from '../components/organisms/Upload';

const meta = {
  title: 'Organisms/Upload',
  component: Upload,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A comprehensive upload component supporting drag-and-drop, button, and thumbnail upload types with progress tracking and validation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['drag-drop', 'button', 'thumbnail'],
      description: 'The upload interface type',
    },
    maxFiles: {
      control: 'number',
      description: 'Maximum number of files that can be uploaded',
    },
    maxFileSize: {
      control: 'number',
      description: 'Maximum file size in MB',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple file selection',
    },
    autoUpload: {
      control: 'boolean',
      description: 'Automatically upload files when selected',
    },
  },
} satisfies Meta<typeof Upload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DragAndDrop: Story = {
  args: {
    type: 'drag-drop',
    maxFiles: 10,
    maxFileSize: 10,
    multiple: true,
    autoUpload: true,
    acceptedFileTypes: ['Excel', 'CSV'],
  },
};

export const ButtonUpload: Story = {
  args: {
    type: 'button',
    maxFiles: 5,
    maxFileSize: 10,
    multiple: true,
    autoUpload: true,
    acceptedFileTypes: ['Excel', 'CSV'],
  },
};

export const ThumbnailUpload: Story = {
  args: {
    type: 'thumbnail',
    maxFiles: 4,
    maxFileSize: 5,
    multiple: true,
    autoUpload: true,
    acceptedFileTypes: ['image/*'],
  },
};

export const WithCallbacks: Story = {
  args: {
    type: 'drag-drop',
    maxFiles: 3,
    maxFileSize: 10,
    multiple: true,
    autoUpload: true,
    onFilesChange: (files) => {
      console.log('Files changed:', files);
    },
    onUploadComplete: (file) => {
      console.log('Upload complete:', file);
    },
  },
};

export const SingleFile: Story = {
  args: {
    type: 'drag-drop',
    maxFiles: 1,
    maxFileSize: 10,
    multiple: false,
    autoUpload: true,
  },
};

