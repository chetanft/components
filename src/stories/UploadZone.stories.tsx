import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { UploadZone } from '../components/organisms/UploadZone';

const meta: Meta<typeof UploadZone> = {
  title: 'Components/UploadZone',
  component: UploadZone,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Drag and drop upload zone component for file selection and upload. Supports file validation, multiple file selection, and interactive states with customizable file type restrictions.'
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
            { id: 'Default', label: 'Default', story: 'Default' as const },
            { id: 'MultipleFiles', label: 'Multiple Files', story: 'MultipleFiles' as const },
            { id: 'DifferentFileTypes', label: 'Different File Types', story: 'DifferentFileTypes' as const },
          ],
        },
        {
          id: 'state',
          label: 'State',
          scenarios: [
            { id: 'Default', label: 'Default', story: 'Default' as const },
            { id: 'Disabled', label: 'Disabled', story: 'Disabled' as const },
          ],
        },
      ],
      supportsGlass: true,
    },
  },
  argTypes: {
    acceptedFileTypes: {
      control: 'object',
      description: 'Array of accepted file types'
    },
    maxFileSize: {
      control: 'number',
      description: 'Maximum file size in MB'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the upload zone is disabled'
    },
    multiple: {
      control: 'boolean',
      description: 'Whether multiple files can be selected'
    },
    glass: {
      control: 'select',
      options: [false, true, 'subtle', 'prominent'],
      description: 'Glass style variant'
    }
  },
  args: {
    glass: true
  }
};

export default meta;
type Story = StoryObj<typeof UploadZone>;

// Default upload zone
export const Default: Story = {
  args: {
    acceptedFileTypes: ['Excel', 'CSV'],
    maxFileSize: 10,
    disabled: false,
    multiple: false
  }
};

// Multiple files allowed
export const MultipleFiles: Story = {
  args: {
    acceptedFileTypes: ['Excel', 'CSV'],
    maxFileSize: 10,
    disabled: false,
    multiple: true
  }
};

// Disabled state
export const Disabled: Story = {
  args: {
    acceptedFileTypes: ['Excel', 'CSV'],
    maxFileSize: 10,
    disabled: true,
    multiple: false
  }
};

// Different file types
export const DifferentFileTypes: Story = {
  args: {
    acceptedFileTypes: ['PDF', 'DOC', 'DOCX'],
    maxFileSize: 25,
    disabled: false,
    multiple: true
  }
};

// Interactive demo
const UploadZoneInteractiveDemo = () => {
  const [selectedFiles, setSelectedFiles] = React.useState<string[]>([]);

  const handleFileSelect = (files: FileList) => {
    const fileNames = Array.from(files).map(file => file.name);
    setSelectedFiles(prev => [...prev, ...fileNames]);
  };

  return (
    <div className="space-y-6">
      <UploadZone
        onFileSelect={handleFileSelect}
        acceptedFileTypes={['Excel', 'CSV']}
        maxFileSize={10}
        multiple={true}
      />

      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-semibold">Selected Files:</h3>
          <ul className="space-y-1">
            {selectedFiles.map((fileName, index) => (
              <li key={index} className="text-sm text-gray-600">
                {fileName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export const DocsInteractiveDemo: Story = {
  render: () => <UploadZoneInteractiveDemo />
,
  parameters: { docsOnly: true },
}