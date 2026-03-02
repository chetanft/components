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
            { id: 'Default', label: 'Default', story: 'ExplorerBase' },
            { id: 'XLSX', label: 'XLSX', story: 'ExplorerBase', args: { fileType: 'XLSX' } },
            { id: 'PDF', label: 'PDF', story: 'ExplorerBase', args: { fileType: 'PDF' } },
            { id: 'DOC', label: 'DOC', story: 'ExplorerBase', args: { fileType: 'DOC' } },
            { id: 'DOCX', label: 'DOCX', story: 'ExplorerBase', args: { fileType: 'DOCX' } },
            { id: 'PNG', label: 'PNG', story: 'ExplorerBase', args: { fileType: 'PNG' } },
            { id: 'JPEG', label: 'JPEG', story: 'ExplorerBase', args: { fileType: 'JPEG' } },
            { id: 'JPG', label: 'JPG', story: 'ExplorerBase', args: { fileType: 'JPG' } },
            { id: 'CSV', label: 'CSV', story: 'ExplorerBase', args: { fileType: 'CSV' } },
            { id: 'ErrorVariant', label: 'Error Variant', story: 'ExplorerBase', args: { fileType: '!', variant: 'error' } },
          ],
        },
        {
          id: 'size',
          label: 'Size',
          scenarios: [
            { id: 'SizeXXS', label: 'XXS', story: 'ExplorerBase', args: { size: 'xxs' } },
            { id: 'SizeXS', label: 'XS', story: 'ExplorerBase', args: { size: 'xs' } },
            { id: 'SizeSM', label: 'SM', story: 'ExplorerBase', args: { size: 'sm' } },
            { id: 'SizeMD', label: 'MD', story: 'ExplorerBase', args: { size: 'md' } },
            { id: 'SizeLG', label: 'LG', story: 'ExplorerBase', args: { size: 'lg' } },
            { id: 'SizeXL', label: 'XL', story: 'ExplorerBase', args: { size: 'xl' } },
            { id: 'SizeXXL', label: 'XXL', story: 'ExplorerBase', args: { size: 'xxl' } },
          ],
        },
      ],
    },
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

export const ExplorerBase: Story = {
  args: {
    fileType: 'XLS',
    variant: 'default',
    size: 'md',
  },
};

// Default file type icon
export const Default: Story = {
  args: {
    fileType: 'XLS',
    variant: 'default',
    size: 'md'
  }
};

// All file types showcase
export const DocsAllFileTypes: Story = {
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
,
  parameters: { docsOnly: true },
}