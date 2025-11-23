import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FileThumbnail } from '../components/organisms/FileThumbnail';

const meta: Meta<typeof FileThumbnail> = {
  title: 'Components/FileThumbnail',
  component: FileThumbnail,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Compact file thumbnail component for displaying file previews or file type icons. Supports hover states with action icons for preview and download. Based on Figma design specifications.'
      }
    }
  },
  argTypes: {
    fileName: {
      control: 'text',
      description: 'Name of the file'
    },
    imageUrl: {
      control: 'text',
      description: 'Optional image preview URL. If not provided, shows file type icon.'
    },
    showFileName: {
      control: 'boolean',
      description: 'Whether to display the filename below the thumbnail'
    },
    onPreview: {
      action: 'preview',
      description: 'Callback when preview/view action is triggered'
    },
    onDownload: {
      action: 'download',
      description: 'Callback when download action is triggered'
    }
  }
};

export default meta;
type Story = StoryObj<typeof FileThumbnail>;

// Sample image URL for previews (using a placeholder)
const sampleImageUrl = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop';

// Image preview without filename
export const ImagePreview: Story = {
  args: {
    fileName: 'Image2.png',
    imageUrl: sampleImageUrl,
    showFileName: false
  }
};

// File type icon without filename
export const FileTypeIcon: Story = {
  args: {
    fileName: 'document.pdf',
    showFileName: false
  }
};

// Image preview with filename
export const WithFileName: Story = {
  args: {
    fileName: 'Image2.png',
    imageUrl: sampleImageUrl,
    showFileName: true
  }
};

// Image preview with filename and actions
export const WithActions: Story = {
  args: {
    fileName: 'Image2.png',
    imageUrl: sampleImageUrl,
    showFileName: true,
    onPreview: () => alert('Preview file'),
    onDownload: () => alert('Download file')
  }
};

// Different file types
export const DifferentFileTypes: Story = {
  render: () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">File Thumbnails - Different Types</h2>
      <div className="flex flex-wrap gap-4">
        <FileThumbnail
          fileName="document.pdf"
          showFileName={true}
        />
        <FileThumbnail
          fileName="spreadsheet.xlsx"
          showFileName={true}
        />
        <FileThumbnail
          fileName="image.png"
          imageUrl={sampleImageUrl}
          showFileName={true}
          onPreview={() => alert('Preview image')}
          onDownload={() => alert('Download image')}
        />
        <FileThumbnail
          fileName="photo.jpg"
          imageUrl={sampleImageUrl}
          showFileName={false}
        />
      </div>
    </div>
  )
};

// Grid layout showing all variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">File Thumbnail Variants</h2>
      <div className="grid grid-cols-3 gap-6 max-w-md">
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Image Preview</p>
          <FileThumbnail
            fileName="Image2.png"
            imageUrl={sampleImageUrl}
            showFileName={false}
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">File Type Icon</p>
          <FileThumbnail
            fileName="document.pdf"
            showFileName={false}
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">With Filename</p>
          <FileThumbnail
            fileName="Image2.png"
            imageUrl={sampleImageUrl}
            showFileName={true}
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Hover State</p>
          <FileThumbnail
            fileName="Image2.png"
            imageUrl={sampleImageUrl}
            showFileName={true}
            onPreview={() => alert('Preview')}
            onDownload={() => alert('Download')}
          />
        </div>
      </div>
    </div>
  )
};
