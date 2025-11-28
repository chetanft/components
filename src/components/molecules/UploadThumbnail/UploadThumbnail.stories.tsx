import type { Meta, StoryObj } from '@storybook/react';
import { UploadThumbnail } from './UploadThumbnail';

const meta: Meta<typeof UploadThumbnail> = {
  title: 'Molecules/UploadThumbnail',
  component: UploadThumbnail,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Upload thumbnail component for image uploads with preview support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'hover', 'disabled'],
      description: 'Visual state of the thumbnail',
    },
    showFileName: {
      control: 'boolean',
      description: 'Whether to show the filename below the thumbnail',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the thumbnail is disabled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof UploadThumbnail>;

export const Default: Story = {
  args: {
    state: 'default',
  },
};

export const WithPreview: Story = {
  args: {
    preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    fileName: 'Image.png',
    showFileName: true,
  },
};

export const Disabled: Story = {
  args: {
    state: 'disabled',
    disabled: true,
  },
};

export const HoverState: Story = {
  args: {
    state: 'hover',
  },
};

export const WithPreviewNoName: Story = {
  args: {
    preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    fileName: 'photo.jpg',
    showFileName: false,
  },
};
