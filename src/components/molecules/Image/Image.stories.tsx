import type { Meta, StoryObj } from '@storybook/react';
import { Image } from './Image';
import { useState } from 'react';

const meta: Meta<typeof Image> = {
  title: 'Molecules/Image',
  component: Image,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'An enhanced image component with preview, fallback, and loading states. Built using FT Design System tokens.',
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
            { id: 'WithFallback', label: 'With Fallback', story: 'WithFallback' as const },
          ],
        },
        {
          id: 'state',
          label: 'State',
          scenarios: [
            { id: 'Default', label: 'Default', story: 'Default' as const },
            { id: 'ErrorState', label: 'Error State', story: 'ErrorState' as const },
          ],
        },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    preview: {
      control: 'boolean',
      description: 'Enable click to preview',
    },
    width: {
      control: 'number',
      description: 'Image width',
    },
    height: {
      control: 'number',
      description: 'Image height',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Image>;

const sampleImage = 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=300&fit=crop';
const sampleImageLarge = 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1200&h=900&fit=crop';

// Basic Image
export const Default: Story = {
  args: {
    src: sampleImage,
    alt: 'Sample image',
    width: 300,
    height: 200,
  },
};

// With Preview
export const WithPreview: Story = {
  args: {
    src: sampleImage,
    alt: 'Click to preview',
    width: 300,
    height: 200,
    preview: true,
  },
};

// Preview with Different Source
export const PreviewWithDifferentSource: Story = {
  args: {
    src: sampleImage,
    alt: 'Click to see full resolution',
    width: 300,
    height: 200,
    preview: {
      src: sampleImageLarge,
    },
  },
};

// With Fallback
export const WithFallback: Story = {
  args: {
    src: 'https://invalid-url.com/image.jpg',
    alt: 'Image with fallback',
    width: 300,
    height: 200,
    fallback: sampleImage,
  },
};

// Error State (No Fallback)
export const ErrorState: Story = {
  args: {
    src: 'https://invalid-url.com/image.jpg',
    alt: 'Failed to load',
    width: 300,
    height: 200,
    preview: false,
  },
};

// Custom Placeholder
export const DocsCustomPlaceholder: Story = {
  render: (args: React.ComponentProps<typeof Image>) => (
    <Image
      {...args}
      placeholder={
        <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-100 to-purple-100">
          <span className="text-blue-500 animate-pulse">Loading...</span>
        </div>
      }
    />
  ),
  args: {
    src: sampleImage,
    alt: 'Custom placeholder',
    width: 300,
    height: 200,
  },

  parameters: { docsOnly: true },
}