import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { UploadZone } from '../components/organisms/UploadZone';
import { FileCard } from '../components/organisms/FileCard';
import { FileThumbnail } from '../components/organisms/FileThumbnail';
import { FileTypeIcon } from '../components/organisms/FileTypeIcon';

const meta: Meta = {
  title: 'Patterns/Upload Flow',
  parameters: {
    docsOnly: true,
    layout: 'padded',
    docs: {
      description: {
        component: 'Complete upload and file management flow demonstrating all file states and interactions as designed in Figma.'
      }
    }
  }
};

export default meta;
type Story = StoryObj;

// Upload Zone Demo
const UploadZoneDemoContent = () => {
  const [uploadedFiles, setUploadedFiles] = React.useState<string[]>([]);

  const handleFileSelect = (files: FileList) => {
    const fileNames = Array.from(files).map(file => file.name);
    setUploadedFiles(prev => [...prev, ...fileNames]);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Upload File</h2>
        <UploadZone
          onFileSelect={handleFileSelect}
          acceptedFileTypes={['Excel', 'CSV']}
          maxFileSize={10}
        />
      </div>

      {uploadedFiles.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Selected Files:</h3>
          {uploadedFiles.map((fileName, index) => (
            <FileThumbnail
              key={index}
              fileName={fileName}
              onDownload={() => alert(`Downloading ${fileName}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const UploadZoneDemo: Story = {
  render: () => <UploadZoneDemoContent />
};

// File Type Icons Showcase
export const DocsFileTypeIcons: Story = {
  render: () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">File Type Icons</h2>
      <div className="grid grid-cols-6 gap-4">
        <div className="text-center">
          <FileTypeIcon fileType="XLS" />
          <p className="mt-2 text-sm">XLS</p>
        </div>
        <div className="text-center">
          <FileTypeIcon fileType="CSV" />
          <p className="mt-2 text-sm">CSV</p>
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