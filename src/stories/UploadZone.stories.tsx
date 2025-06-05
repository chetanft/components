import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { UploadZone } from '../components/UploadZone';

const meta: Meta<typeof UploadZone> = {
  title: 'Upload & Files/Atoms/UploadZone',
  component: UploadZone,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Drag and drop upload zone component based on Figma design specifications. Supports file selection, validation, and interactive states.'
      }
    }
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
    }
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
export const Multiple_Files: Story = {
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
export const Different_File_Types: Story = {
  args: {
    acceptedFileTypes: ['PDF', 'DOC', 'DOCX'],
    maxFileSize: 25,
    disabled: false,
    multiple: true
  }
};

// Interactive demo
export const Interactive_Demo: Story = {
  render: () => {
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
  }
}; 