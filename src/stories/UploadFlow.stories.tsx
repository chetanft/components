import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { UploadZone } from '../components/UploadZone';
import { FileCard } from '../components/FileCard';
import { FileThumbnail } from '../components/FileThumbnail';
import { FileTypeIcon } from '../components/FileTypeIcon';
import { ProgressBar } from '../components/ProgressBar';

const meta: Meta = {
  title: 'Patterns/Upload Flow',
  parameters: {
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
export const UploadZoneDemo: Story = {
  render: () => {
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
  }
};

// File Type Icons Showcase
export const FileTypeIcons: Story = {
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
};

// Complete File Processing Flow
export const FileProcessingFlow: Story = {
  render: () => (
    <div className="max-w-4xl space-y-8">
      <h2 className="text-xl font-semibold">File Processing States</h2>
      
      {/* Upload Zone */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">1. Upload Zone</h3>
        <UploadZone />
      </div>
      
      {/* Simple File Thumbnail */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">2. File Selected</h3>
        <FileThumbnail
          fileName="Add_order_upload.xlsx"
          onDownload={() => alert('Download')}
        />
      </div>
      
      {/* Uploading State */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">3. Uploading</h3>
        <FileCard
          fileName="File 178.xlsx"
          fileType="XLS"
          status="uploading"
          progress={23}
          variant="with-progress"
          onClose={() => alert('Cancel upload')}
        />
      </div>
      
      {/* Validating State */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">4. Validating</h3>
        <FileCard
          fileName="File 178.xlsx"
          fileType="XLS"
          status="validating"
          fileDate="12 April 2024, 5:30 PM"
          onClose={() => alert('Cancel')}
        />
      </div>
      
      {/* Processed Successfully */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">5. Fully Processed</h3>
        <FileCard
          fileName="File 178.xlsx"
          fileType="XLS"
          status="processed"
          fileDate="12 April 2024, 5:30 PM"
          variant="with-stats"
          stats={{ total: 100, success: 100, invalid: 0 }}
          onDownload={() => alert('Download')}
          onPreview={() => alert('Preview')}
          onDelete={() => alert('Delete')}
          downloadDisabled={false}
        />
      </div>
      
      {/* Partially Processed */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">6. Partially Processed</h3>
        <FileCard
          fileName="File 178.xlsx"
          fileType="XLS"
          status="partially-processed"
          fileDate="12 April 2024, 5:30 PM"
          variant="with-stats"
          stats={{ total: 100, success: 60, invalid: 40 }}
          onDownload={() => alert('Download')}
          onPreview={() => alert('Preview')}
          onDelete={() => alert('Delete')}
        />
      </div>
      
      {/* Error States */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">7. Error States</h3>
        
        {/* Template Mismatch */}
        <FileCard
          fileName="File 178.xlsx"
          fileType="XLS"
          status="template-mismatch"
          fileDate="12 April 2024, 5:30 PM"
          errorMessage="Missing required column: Origin. Please use the sample template"
          onDelete={() => alert('Delete')}
        />
        
        {/* Upload Failed */}
        <FileCard
          fileName="File 178.xlsx"
          fileType="XLS"
          status="upload-failed"
          progress={23}
          variant="with-progress"
          onRefresh={() => alert('Retry')}
          onDelete={() => alert('Delete')}
        />
        
        {/* Unsupported Format */}
        <FileCard
          fileName="File 178.txt"
          fileType="!"
          status="unsupported"
          fileDate="12 April 2024, 5:30 PM"
          onDelete={() => alert('Delete')}
        />
        
        {/* File Too Large */}
        <FileCard
          fileName="File 178.xlsx"
          fileType="XLS"
          status="too-large"
          progress={23}
          variant="with-progress"
          onClose={() => alert('Cancel')}
        />
      </div>
    </div>
  )
};

// Interactive Upload Simulator
export const InteractiveUploadSimulator: Story = {
  render: () => {
    const [files, setFiles] = React.useState<Array<{
      id: string;
      name: string;
      status: 'uploading' | 'validating' | 'processed' | 'failed';
      progress: number;
    }>>([]);
    
    const handleFileSelect = (fileList: FileList) => {
      const newFiles = Array.from(fileList).map(file => ({
        id: Date.now().toString() + Math.random(),
        name: file.name,
        status: 'uploading' as const,
        progress: 0
      }));
      
      setFiles(prev => [...prev, ...newFiles]);
      
      // Simulate upload progress
      newFiles.forEach(file => {
        simulateUpload(file.id);
      });
    };
    
    const simulateUpload = (fileId: string) => {
      const interval = setInterval(() => {
        setFiles(prev => 
          prev.map(file => {
            if (file.id === fileId && file.status === 'uploading') {
              const newProgress = Math.min(file.progress + Math.random() * 15, 100);
              
              if (newProgress >= 100) {
                clearInterval(interval);
                // Transition to validating
                setTimeout(() => {
                  setFiles(prev2 => 
                    prev2.map(f => 
                      f.id === fileId ? { ...f, status: 'validating' } : f
                    )
                  );
                  
                  // Then to processed
                  setTimeout(() => {
                    setFiles(prev3 => 
                      prev3.map(f => 
                        f.id === fileId ? { ...f, status: 'processed' } : f
                      )
                    );
                  }, 2000);
                }, 1000);
                
                return { ...file, progress: 100 };
              }
              
              return { ...file, progress: newProgress };
            }
            return file;
          })
        );
      }, 200);
    };
    
    const removeFile = (fileId: string) => {
      setFiles(prev => prev.filter(f => f.id !== fileId));
    };
    
    return (
      <div className="max-w-4xl space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Interactive Upload Simulator</h2>
          <p className="text-gray-600 mb-4">
            Select files to see the complete upload flow in action.
          </p>
          
          <UploadZone onFileSelect={handleFileSelect} />
        </div>
        
        {files.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Files</h3>
            {files.map(file => (
              <FileCard
                key={file.id}
                fileName={file.name}
                fileType="XLS"
                status={file.status}
                progress={file.progress}
                variant={file.status === 'uploading' ? 'with-progress' : 'compact'}
                fileDate={file.status === 'processed' ? '12 April 2024, 5:30 PM' : undefined}
                stats={file.status === 'processed' ? { total: 100, success: 95, invalid: 5 } : undefined}
                onClose={file.status === 'uploading' ? () => removeFile(file.id) : undefined}
                onDelete={file.status === 'processed' ? () => removeFile(file.id) : undefined}
                onDownload={file.status === 'processed' ? () => alert(`Downloading ${file.name}`) : undefined}
                onPreview={file.status === 'processed' ? () => alert(`Previewing ${file.name}`) : undefined}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}; 