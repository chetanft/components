import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FileTypeIcon } from '../components/organisms/FileTypeIcon';

const meta: Meta<typeof FileTypeIcon> = {
  title: 'Components/FileTypeIcon',
  component: FileTypeIcon,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'File type icon component for displaying file format indicators (XLS, XLSX, CSV, PDF, DOC, DOCX, PNG, JPEG, JPG) with proper gradients, colors, and error states.'
      }
    }
  },
  argTypes: {
    fileType: {
      control: 'text',
      description: 'File type to display (XLS, XLSX, CSV, PDF, DOC, DOCX, PNG, JPEG, JPG, etc.)'
    },
    variant: {
      control: 'radio',
      options: ['default', 'error'],
      description: 'Visual variant of the file type icon'
    },
    size: {
      control: 'radio',
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Size of the file type icon'
    }
  }
};

export default meta;
type Story = StoryObj<typeof FileTypeIcon>;

// Default file type icon
export const Default: Story = {
  args: {
    fileType: 'XLS',
    variant: 'default',
    size: 'md'
  }
};

// All file types showcase
export const AllFileTypes: Story = {
  render: () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">File Type Icons</h2>
      <div className="grid grid-cols-6 gap-4">
        <div className="text-center">
          <FileTypeIcon fileType="XLS" />
          <p className="mt-2 text-sm">XLS</p>
        </div>
        <div className="text-center">
          <FileTypeIcon fileType="XLSX" />
          <p className="mt-2 text-sm">XLSX</p>
        </div>
        <div className="text-center">
          <FileTypeIcon fileType="PDF" />
          <p className="mt-2 text-sm">PDF</p>
        </div>
        <div className="text-center">
          <FileTypeIcon fileType="DOC" />
          <p className="mt-2 text-sm">DOC</p>
        </div>
        <div className="text-center">
          <FileTypeIcon fileType="DOCX" />
          <p className="mt-2 text-sm">DOCX</p>
        </div>
        <div className="text-center">
          <FileTypeIcon fileType="PNG" />
          <p className="mt-2 text-sm">PNG</p>
        </div>
        <div className="text-center">
          <FileTypeIcon fileType="JPEG" />
          <p className="mt-2 text-sm">JPEG</p>
        </div>
        <div className="text-center">
          <FileTypeIcon fileType="JPG" />
          <p className="mt-2 text-sm">JPG</p>
        </div>
        <div className="text-center">
          <FileTypeIcon fileType="CSV" />
          <p className="mt-2 text-sm">CSV</p>
        </div>
        <div className="text-center">
          <FileTypeIcon fileType="TXT" />
          <p className="mt-2 text-sm">TXT</p>
        </div>
        <div className="text-center">
          <FileTypeIcon fileType="!" variant="error" />
          <p className="mt-2 text-sm">Error</p>
        </div>
      </div>
    </div>
  )
};

// Size variants
export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">All Size Variants</h2>
      <div className="flex items-end gap-6 flex-wrap">
        <div className="text-center">
          <FileTypeIcon fileType="XLS" size="xxs" />
          <p className="mt-2 text-xs">XXS</p>
          <p className="text-xs text-muted-foreground">13×16 (var(--component-height-xxs)×var(--spacing-x4))</p>
        </div>
        <div className="text-center">
          <FileTypeIcon fileType="XLS" size="xs" />
          <p className="mt-2 text-xs">XS</p>
          <p className="text-xs text-muted-foreground">20×24 (var(--component-height-xs)×var(--spacing-x6))</p>
        </div>
        <div className="text-center">
          <FileTypeIcon fileType="XLS" size="sm" />
          <p className="mt-2 text-xs">SM</p>
          <p className="text-xs text-muted-foreground">26×32 (var(--component-height-sm)×var(--spacing-x8))</p>
        </div>
        <div className="text-center">
          <FileTypeIcon fileType="XLS" size="md" />
          <p className="mt-2 text-xs">MD</p>
          <p className="text-xs text-muted-foreground">33×40 (var(--component-height-md)×var(--spacing-x10))</p>
        </div>
        <div className="text-center">
          <FileTypeIcon fileType="XLS" size="lg" />
          <p className="mt-2 text-xs">LG</p>
          <p className="text-xs text-muted-foreground">39×48 (var(--component-height-lg)×var(--spacing-x12))</p>
        </div>
        <div className="text-center">
          <FileTypeIcon fileType="XLS" size="xl" />
          <p className="mt-2 text-xs">XL</p>
          <p className="text-xs text-muted-foreground">46×56 (var(--component-height-xl)×var(--spacing-x14))</p>
        </div>
        <div className="text-center">
          <FileTypeIcon fileType="XLS" size="xxl" />
          <p className="mt-2 text-xs">XXL</p>
          <p className="text-xs text-muted-foreground">52×64 (var(--component-height-xxl)×var(--spacing-x16))</p>
        </div>
      </div>
    </div>
  )
};

// Error variant
export const ErrorVariant: Story = {
  args: {
    fileType: '!',
    variant: 'error',
    size: 'md'
  }
};

// Individual file type variants
export const XLSX: Story = {
  args: {
    fileType: 'XLSX',
    variant: 'default',
    size: 'md'
  }
};

export const DOC: Story = {
  args: {
    fileType: 'DOC',
    variant: 'default',
    size: 'md'
  }
};

export const DOCX: Story = {
  args: {
    fileType: 'DOCX',
    variant: 'default',
    size: 'md'
  }
};

export const PNG: Story = {
  args: {
    fileType: 'PNG',
    variant: 'default',
    size: 'md'
  }
};

export const JPEG: Story = {
  args: {
    fileType: 'JPEG',
    variant: 'default',
    size: 'md'
  }
};

export const JPG: Story = {
  args: {
    fileType: 'JPG',
    variant: 'default',
    size: 'md'
  }
}; 