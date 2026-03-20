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
      baseStory: 'ExplorerBase',
      behavior: 'layout' as const,
      previewMode: 'inline' as const,
      defaultRowId: 'type',
      defaultScenarioId: 'Default',
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'Default', label: 'Default', story: 'ExplorerBase' as const, args: { uploadType: 'drag-drop', customTrigger: false } },
            { id: 'ButtonUpload', label: 'Button Upload', story: 'ExplorerBase' as const, args: { uploadType: 'button', customTrigger: false } },
            { id: 'Thumbnail', label: 'Thumbnail', story: 'ExplorerBase' as const, args: { uploadType: 'thumbnail', acceptedFileTypes: ['Image'] } },
            { id: 'WithCustomTrigger', label: 'Custom Trigger', story: 'ExplorerBase' as const, args: { uploadType: 'button', customTrigger: true } },
          ],
        },
        {
          id: 'state',
          label: 'State',
          scenarios: [
            { id: 'Default', label: 'Default', story: 'ExplorerBase' as const, args: { showValidation: false, maxFiles: 5, multiple: true } },
            { id: 'WithValidation', label: 'With Validation', story: 'ExplorerBase' as const, args: { showValidation: true, maxFiles: 5, multiple: true } },
            { id: 'SingleFileOnly', label: 'Single File Only', story: 'ExplorerBase' as const, args: { maxFiles: 1, multiple: false } },
          ],
        },
      ],
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

export const ExplorerBase: Story = {
  render: (args: any) => {
    const [files, setFiles] = useState<UploadFile[]>([]);
    const type = args.uploadType ?? 'drag-drop';
    const maxFiles = args.maxFiles ?? 5;
    const multiple = args.multiple ?? true;
    const acceptedFileTypes = args.acceptedFileTypes ?? ['Excel', 'CSV'];
    const showValidation = Boolean(args.showValidation);
    const customTrigger = Boolean(args.customTrigger);

    return (
      <Upload
        type={type}
        maxFiles={maxFiles}
        acceptedFileTypes={acceptedFileTypes}
        multiple={multiple}
        showValidation={showValidation}
        onFilesChange={setFiles}
      >
        <UploadTrigger>
          {customTrigger ? (
            <Button variant="primary" size="lg">
              Choose Files to Upload
            </Button>
          ) : undefined}
        </UploadTrigger>
        {type !== 'thumbnail' ? <UploadList /> : null}
      </Upload>
    );
  },
};

// Composable API Examples
export const Default: Story = {
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
  parameters: {
    docs: {
      source: {
        code: `<Upload
  type="drag-drop"
  maxFiles={5}
  acceptedFileTypes={['Excel', 'CSV']}
  multiple={true}
  onFilesChange={setFiles}
>
  <UploadTrigger />
  <UploadList />
</Upload>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

export const ButtonUpload: Story = {
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
  parameters: {
    docs: {
      source: {
        code: `<Upload
  type="button"
  maxFiles={10}
  acceptedFileTypes={['Excel', 'CSV']}
  multiple={true}
  onFilesChange={setFiles}
>
  <UploadTrigger />
  <UploadList />
</Upload>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

export const WithCustomTrigger: Story = {
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
  parameters: {
    docs: {
      source: {
        code: `<Upload
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
</Upload>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

export const DocsWithCustomList: Story = {
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

  parameters: {
    docsOnly: true,
    docs: {
      source: {
        code: `<Upload
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
</Upload>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
}