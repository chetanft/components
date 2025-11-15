"use client";

import React, { useState, useCallback } from 'react';
import { cn } from '../../../lib/utils';
import { UploadZone } from '../UploadZone/UploadZone';
import { UploadButton } from '../../molecules/UploadButton/UploadButton';
import { UploadThumbnail } from '../../molecules/UploadThumbnail/UploadThumbnail';
import { UploadItem, UploadFile } from '../../molecules/UploadItem/UploadItem';
import { FileValidationCard, ValidationStats } from '../../molecules/FileValidationCard/FileValidationCard';

export type UploadType = 'drag-drop' | 'button' | 'thumbnail';

export interface UploadProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: UploadType;
  maxFiles?: number;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
  multiple?: boolean;
  onFilesChange?: (files: UploadFile[]) => void;
  onUploadComplete?: (file: UploadFile) => void;
  onValidationComplete?: (file: UploadFile, stats?: ValidationStats) => void;
  showValidation?: boolean;
  autoUpload?: boolean;
}

export const Upload = React.forwardRef<HTMLDivElement, UploadProps>(
  ({ 
    className,
    type = 'drag-drop',
    maxFiles = 10,
    acceptedFileTypes = ['Excel', 'CSV'],
    maxFileSize = 10,
    multiple = true,
    onFilesChange,
    onUploadComplete,
    onValidationComplete,
    showValidation = false,
    autoUpload = true,
    ...props 
  }, ref) => {
    
    const [files, setFiles] = useState<UploadFile[]>([]);
    
    // Generate unique ID for files
    const generateFileId = () => {
      return `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    };
    
    // Handle file selection
    const handleFileSelect = useCallback((fileList: FileList) => {
      const newFiles: UploadFile[] = [];
      
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        
        // Check if we've reached max files
        if (files.length + newFiles.length >= maxFiles) {
          break;
        }
        
        // Check file size
        if (file.size > maxFileSize * 1024 * 1024) {
          console.warn(`File ${file.name} exceeds max size of ${maxFileSize}MB`);
          continue;
        }
        
        // Create upload file object
        const uploadFile: UploadFile = {
          id: generateFileId(),
          name: file.name,
          size: file.size,
          type: file.type,
          uploadProgress: 0,
        };
        
        // Create preview for images if thumbnail type
        if (type === 'thumbnail' && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const preview = e.target?.result as string;
            setFiles(prev => prev.map(f => 
              f.id === uploadFile.id ? { ...f, preview } : f
            ));
          };
          reader.readAsDataURL(file);
        }
        
        newFiles.push(uploadFile);
        
        // Simulate upload if autoUpload is enabled
        if (autoUpload) {
          simulateUpload(uploadFile);
        }
      }
      
      if (newFiles.length > 0) {
        const updatedFiles = [...files, ...newFiles];
        setFiles(updatedFiles);
        onFilesChange?.(updatedFiles);
      }
    }, [files, maxFiles, maxFileSize, type, autoUpload, onFilesChange]);
    
    // Simulate file upload (replace with real upload logic)
    const simulateUpload = useCallback((file: UploadFile) => {
      const uploadInterval = setInterval(() => {
        setFiles(prev => {
          const updatedFiles = prev.map(f => {
            if (f.id === file.id) {
              const newProgress = Math.min((f.uploadProgress || 0) + 10, 100);
              
              // If upload complete
              if (newProgress === 100) {
                clearInterval(uploadInterval);
                const completedFile = {
                  ...f,
                  uploadProgress: 100,
                  uploadedAt: new Date()
                };
                
                // Trigger callback
                setTimeout(() => {
                  onUploadComplete?.(completedFile);
                  
                  // Simulate validation if enabled
                  if (showValidation) {
                    simulateValidation(completedFile);
                  }
                }, 500);
                
                return completedFile;
              }
              
              return { ...f, uploadProgress: newProgress };
            }
            return f;
          });
          return updatedFiles;
        });
      }, 200);
    }, [onUploadComplete, showValidation]);
    
    // Simulate validation (replace with real validation logic)
    const simulateValidation = useCallback((file: UploadFile) => {
      setTimeout(() => {
        const stats: ValidationStats = {
          total: Math.floor(Math.random() * 1000) + 100,
          success: 0,
          invalid: 0
        };
        
        // Random validation result
        const validationType = Math.random();
        if (validationType > 0.7) {
          // Success
          stats.success = stats.total;
        } else if (validationType > 0.4) {
          // Partial
          stats.success = Math.floor(stats.total * 0.7);
          stats.invalid = stats.total - stats.success;
        } else {
          // Failed
          stats.invalid = stats.total;
        }
        
        onValidationComplete?.(file, stats);
      }, 2000);
    }, [onValidationComplete]);
    
    // Handle file deletion
    const handleDelete = useCallback((fileId: string) => {
      const updatedFiles = files.filter(f => f.id !== fileId);
      setFiles(updatedFiles);
      onFilesChange?.(updatedFiles);
    }, [files, onFilesChange]);
    
    // Handle file retry
    const handleRetry = useCallback((fileId: string) => {
      const file = files.find(f => f.id === fileId);
      if (file) {
        setFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, uploadProgress: 0 } : f
        ));
        simulateUpload(file);
      }
    }, [files, simulateUpload]);
    
    // Render based on type
    const renderUploadInput = () => {
      switch (type) {
        case 'button':
          return (
            <UploadButton
              onFileSelect={handleFileSelect}
              acceptedFileTypes={acceptedFileTypes}
              maxFileSize={maxFileSize}
              multiple={multiple}
            />
          );
          
        case 'thumbnail':
          return (
            <div className="flex items-start gap-[16px] flex-wrap">
              {/* Show existing thumbnails */}
              {files.map(file => (
                <UploadThumbnail
                  key={file.id}
                  preview={file.preview}
                  fileName={file.name}
                  onDelete={() => handleDelete(file.id)}
                  showFileName={true}
                />
              ))}
              
              {/* Show add button if under max files */}
              {files.length < maxFiles && (
                <UploadThumbnail
                  onFileSelect={handleFileSelect}
                  acceptedFileTypes={acceptedFileTypes}
                  multiple={multiple}
                  showFileName={false}
                />
              )}
            </div>
          );
          
        case 'drag-drop':
        default:
          return (
            <UploadZone
              type="drag-drop"
              onFileSelect={handleFileSelect}
              acceptedFileTypes={acceptedFileTypes}
              maxFileSize={maxFileSize}
              multiple={multiple}
            />
          );
      }
    };
    
    // Determine item display type based on upload type
    const getItemType = () => {
      if (type === 'button') return 'text';
      if (type === 'thumbnail') return 'thumbnail';
      return 'card';
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-start gap-[16px]",
          type === 'drag-drop' && "w-full max-w-[870px]",
          type === 'button' && "w-full max-w-[308px]",
          className
        )}
        {...props}
      >
        {/* Upload input */}
        {renderUploadInput()}
        
        {/* File list (only for drag-drop and button types) */}
        {type !== 'thumbnail' && files.length > 0 && (
          <div className="flex flex-col items-start gap-[16px] w-full">
            {files.map(file => {
              const isUploading = (file.uploadProgress || 0) < 100;
              const isUploaded = (file.uploadProgress || 0) === 100;
              
              return (
                <UploadItem
                  key={file.id}
                  type={getItemType()}
                  state={isUploading ? 'uploading' : 'uploaded'}
                  file={file}
                  onDelete={() => handleDelete(file.id)}
                  onRetry={() => handleRetry(file.id)}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

Upload.displayName = 'Upload';

