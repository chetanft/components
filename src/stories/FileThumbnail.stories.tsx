import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FileThumbnail } from '../components/organisms/FileThumbnail';

const meta: Meta<typeof FileThumbnail> = {
  title: 'Organisms/FileThumbnail',
  component: FileThumbnail,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Compact file thumbnail component for displaying file previews or file type icons.',
      },
    },
  },
  argTypes: {
    fileName: {
      control: 'text',
      description: 'Name of the file',
    },
    imageUrl: {
      control: 'text',
      description: 'Optional image preview URL',
    },
    showFileName: {
      control: 'boolean',
      description: 'Whether to display the filename',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FileThumbnail>;

export const Default: Story = {
  args: {
    fileName: 'document.pdf',
    showFileName: true,
  },
};

export const WithImage: Story = {
  args: {
    fileName: 'Image.png',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    showFileName: true,
  },
};

export const WithoutFileName: Story = {
  args: {
    fileName: 'Image.png',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    showFileName: false,
  },
};

export const PDFFile: Story = {
  args: {
    fileName: 'document.pdf',
    showFileName: true,
  },
};

export const ExcelFile: Story = {
  args: {
    fileName: 'spreadsheet.xlsx',
    showFileName: true,
  },
};

export const ImagePreview: Story = {
  args: {
    fileName: 'photo.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    showFileName: true,
  },
};
