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
export const CustomPlaceholder: Story = {
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
};

// Controlled Preview
export const ControlledPreview: Story = {
  render: (args: React.ComponentProps<typeof Image>) => {
    const [visible, setVisible] = useState(false);
    return (
      <div className="space-y-4">
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setVisible(true)}
            className="px-4 py-2 bg-[var(--color-primary)] text-white rounded"
          >
            Open Preview
          </button>
          <span className="text-sm text-[var(--color-tertiary)]">
            Preview is: {visible ? 'Open' : 'Closed'}
          </span>
        </div>
        <Image
          {...args}
          preview={{
            visible,
            onVisibleChange: setVisible,
          }}
        />
      </div>
    );
  },
  args: {
    src: sampleImage,
    alt: 'Controlled preview',
    width: 300,
    height: 200,
  },
};

// Preview Options
export const PreviewOptions: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <p className="text-sm text-[var(--color-tertiary)] mb-2">With Zoom Only</p>
        <Image
          src={sampleImage}
          alt="Zoom only"
          width={200}
          height={150}
          preview={{
            zoom: true,
            rotate: false,
          }}
        />
      </div>
      <div>
        <p className="text-sm text-[var(--color-tertiary)] mb-2">With Rotate Only</p>
        <Image
          src={sampleImage}
          alt="Rotate only"
          width={200}
          height={150}
          preview={{
            zoom: false,
            rotate: true,
          }}
        />
      </div>
      <div>
        <p className="text-sm text-[var(--color-tertiary)] mb-2">Full Controls (Default)</p>
        <Image
          src={sampleImage}
          alt="Full controls"
          width={200}
          height={150}
          preview={true}
        />
      </div>
      <div>
        <p className="text-sm text-[var(--color-tertiary)] mb-2">Custom Zoom Range</p>
        <Image
          src={sampleImage}
          alt="Custom zoom range"
          width={200}
          height={150}
          preview={{
            minScale: 0.25,
            maxScale: 10,
          }}
        />
      </div>
    </div>
  ),
};

// Image Gallery
export const ImageGallery: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {[
        'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=300&h=200&fit=crop',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop',
        'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=300&h=200&fit=crop',
        'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=300&h=200&fit=crop',
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=300&h=200&fit=crop',
      ].map((src, index) => (
        <Image
          key={index}
          src={src}
          alt={`Gallery image ${index + 1}`}
          width={200}
          height={150}
          preview={true}
          className="rounded-lg"
        />
      ))}
    </div>
  ),
};

// Responsive Image
export const ResponsiveImage: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-[var(--color-tertiary)]">Resize the window to see the image adapt</p>
      <Image
        src={sampleImage}
        alt="Responsive image"
        width="100%"
        height="auto"
        preview={true}
        className="rounded-lg max-w-full"
      />
    </div>
  ),
};

// Without Preview
export const WithoutPreview: Story = {
  args: {
    src: sampleImage,
    alt: 'No preview available',
    width: 300,
    height: 200,
    preview: false,
  },
};

