import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Upload, UploadTrigger, UploadList } from './index';
import { UploadItem } from '../../molecules/UploadItem';
import type { UploadFile } from '../../molecules/UploadItem';
import { Button } from '../../atoms/Button/Button';

const meta: Meta<typeof Upload> = {
  title: 'Organisms/Upload',
  component: Upload,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'File upload component with drag-drop, button, and thumbnail support. Supports both composable API (recommended) and declarative API (deprecated).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['drag-drop', 'button', 'thumbnail'],
    },
    maxFiles: {
      control: 'number',
    },
    multiple: {
      control: 'boolean',
    },
    showValidation: {
      control: 'boolean',
    },
    autoUpload: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Upload>;

// Declarative API Examples
export const DragDrop: Story = {
  args: {
    type: 'drag-drop',
    maxFiles: 5,
    acceptedFileTypes: ['Excel', 'CSV'],
    multiple: true,
  },
};

export const ButtonUpload: Story = {
  args: {
    type: 'button',
    maxFiles: 10,
    acceptedFileTypes: ['Excel', 'CSV'],
    multiple: true,
  },
};

export const ThumbnailUpload: Story = {
  args: {
    type: 'thumbnail',
    maxFiles: 5,
    acceptedFileTypes: ['Image'],
    multiple: true,
  },
};

// Composable API Examples
export const ComposableDragDrop: Story = {
  render: () => {
    const [files, setFiles] = useState<UploadFile[]>([]);
    
    return (
      <Upload
        type="drag-drop"
        maxFiles={5}
        acceptedFileTypes={['Excel', 'CSV']}
        multiple={true}
        onFilesChange={setFiles}
      >
        <UploadTrigger />
        <UploadList />
      </Upload>
    );
  },
};

export const ComposableButton: Story = {
  render: () => {
    const [files, setFiles] = useState<UploadFile[]>([]);
    
    return (
      <Upload
        type="button"
        maxFiles={10}
        acceptedFileTypes={['Excel', 'CSV']}
        multiple={true}
        onFilesChange={setFiles}
      >
        <UploadTrigger />
        <UploadList />
      </Upload>
    );
  },
};

export const ComposableWithCustomTrigger: Story = {
  render: () => {
    const [files, setFiles] = useState<UploadFile[]>([]);
    
    return (
      <Upload
        type="button"
        maxFiles={5}
        acceptedFileTypes={['Excel', 'CSV']}
        multiple={true}
        onFilesChange={setFiles}
      >
        <UploadTrigger>
          <Button variant="primary" size="lg">
            Choose Files to Upload
          </Button>
        </UploadTrigger>
        <UploadList />
      </Upload>
    );
  },
};

export const ComposableWithCustomList: Story = {
  render: () => {
    const [files, setFiles] = useState<UploadFile[]>([]);
    
    return (
      <Upload
        type="drag-drop"
        maxFiles={5}
        acceptedFileTypes={['Excel', 'CSV']}
        multiple={true}
        onFilesChange={setFiles}
      >
        <UploadTrigger />
        <UploadList>
          {files.map((file) => (
            <UploadItem
              key={file.id}
              type="card"
              state={file.uploadProgress && file.uploadProgress < 100 ? 'uploading' : 'uploaded'}
              file={file}
              onDelete={() => setFiles(files.filter(f => f.id !== file.id))}
            />
          ))}
        </UploadList>
      </Upload>
    );
  },
};

export const ComposableWithValidation: Story = {
  render: () => {
    const [files, setFiles] = useState<UploadFile[]>([]);
    
    return (
      <Upload
        type="drag-drop"
        maxFiles={5}
        acceptedFileTypes={['Excel', 'CSV']}
        multiple={true}
        showValidation={true}
        onFilesChange={setFiles}
      >
        <UploadTrigger />
        <UploadList />
      </Upload>
    );
  },
};

export const ComposableThumbnail: Story = {
  render: () => {
    const [files, setFiles] = useState<UploadFile[]>([]);
    
    return (
      <Upload
        type="thumbnail"
        maxFiles={5}
        acceptedFileTypes={['Image']}
        multiple={true}
        onFilesChange={setFiles}
      >
        <UploadTrigger />
      </Upload>
    );
  },
};

