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
    explorer: {
                                                                                                                                                                                                                                                                                                                                                                                                inspector: {
                                                                                                                                                                                                  enabled: true,
                                                                                                                                                                                                  defaultMode: 'token-spacing' as const,
                                                                                                                                                                                                  spacingHints: {
                                                                                                                                                                                                    outerXToken: 'x6',
                                                                                                                                                                                                    outerYToken: 'x3',
                                                                                                                                                                                                    innerGapToken: 'x2',
                                                                                                                                                                                                  },
                                                                                                                                                                                                },
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
            { id: 'WithPreview', label: 'With Preview', story: 'WithPreview' as const },
          ],
        },
        {
          id: 'state',
          label: 'State',
          scenarios: [
            { id: 'Default', label: 'Default', story: 'Default' as const },
            { id: 'Disabled', label: 'Disabled', story: 'Disabled' as const },
            { id: 'HoverState', label: 'Hover State', story: 'HoverState' as const },
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
    glass: {
      control: 'select',
      options: [false, true, 'subtle', 'prominent'],
      description: 'Glass style variant',
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
