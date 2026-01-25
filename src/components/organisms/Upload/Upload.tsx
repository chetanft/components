"use client";

import React, { useState, useCallback } from 'react';
import { cn } from '../../../lib/utils';
import { UploadZone } from '../UploadZone/UploadZone';
import { UploadButton } from '../../molecules/UploadButton/UploadButton';
import { UploadThumbnail } from '../../molecules/UploadThumbnail/UploadThumbnail';
import { UploadItem } from '../../molecules/UploadItem';
import type { UploadFile } from '../../molecules/UploadItem';
import type { ValidationStats } from '../../molecules/FileValidationCard';
import type { ComposableProps } from '../../../lib/slot';

export type UploadType = 'drag-drop' | 'button' | 'thumbnail';

export interface UploadProps extends Omit<ComposableProps<'div'>, 'onFilesChange' | 'onUploadComplete' | 'onValidationComplete'> {
  /**
   * Upload type
   * @default 'drag-drop'
   */
  type?: UploadType;
  /**
   * Maximum number of files
   * @default 10
   */
  maxFiles?: number;
  /**
   * Accepted file types
   * @default ['Excel', 'CSV']
   */
  acceptedFileTypes?: string[];
  /**
   * Maximum file size in MB
   * @default 10
   */
  maxFileSize?: number;
  /**
   * Allow multiple files
   * @default true
   */
  multiple?: boolean;
  /**
   * Files change handler
   */
  onFilesChange?: (files: UploadFile[]) => void;
  /**
   * Upload complete handler
   */
  onUploadComplete?: (file: UploadFile) => void;
  /**
   * Validation complete handler
   */
  onValidationComplete?: (file: UploadFile, stats?: ValidationStats) => void;
  /**
   * Show validation
   * @default false
   */
  showValidation?: boolean;
  /**
   * Auto upload files
   * @default true
   */
  autoUpload?: boolean;
  /**
   * Upload content (for composable API)
   */
  children?: React.ReactNode;
}

/**
 * Upload Component
 * 
 * A file upload component with drag-drop, button, and thumbnail support.
 * Supports both composable API (recommended) and declarative API (deprecated).
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Composable API (recommended)
 * <Upload type="drag-drop" maxFiles={5}>
 *   <UploadTrigger />
 *   <UploadList />
 * </Upload>
 * 
 * // Declarative API (deprecated)
 * <Upload
 *   type="button"
 *   maxFiles={10}
 *   onFilesChange={handleFilesChange}
 * />
 * ```
 * 
 * @remarks
 * - Composable API provides maximum flexibility and control
 * - All sub-components (UploadTrigger, UploadList) support `asChild`
 * - Supports drag-drop, button, and thumbnail upload types
 * - Declarative API is deprecated but still functional for backward compatibility
 */
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
    children: _children,
    asChild: _asChild,
    ...props 
  }, ref) => {
    
    const [files, setFiles] = useState<UploadFile[]>([]);
    const [fileMap, setFileMap] = useState<Map<string, File>>(new Map());
    
    // Generate unique ID for files
    const generateFileId = () => {
      return `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    };
    
    // Handle file validation (replace with real API call)
    const validateFile = useCallback(async (file: UploadFile) => {
      try {
        const stats: ValidationStats = {
          total: Math.floor(Math.random() * 1000) + 100,
          success: 0,
          invalid: 0
        };

        const validationType = Math.random();
        if (validationType > 0.7) {
          stats.success = stats.total;
        } else if (validationType > 0.4) {
          stats.success = Math.floor(stats.total * 0.7);
          stats.invalid = stats.total - stats.success;
        } else {
          stats.invalid = stats.total;
        }

        onValidationComplete?.(file, stats);
      } catch (error) {
        console.error('Validation failed:', error);
        onValidationComplete?.(file, { total: 0, success: 0, invalid: 0 });
      }
    }, [onValidationComplete]);

    // Handle file upload (replace with real API call)
    const handleUpload = useCallback(async (uploadFileData: UploadFile, _originalFile: File) => {
      try {
        const uploadInterval = setInterval(() => {
          setFiles(prev => {
            const updatedFiles = prev.map(f => {
              if (f.id === uploadFileData.id) {
                const newProgress = Math.min((f.uploadProgress || 0) + 10, 100);

                if (newProgress === 100) {
                  clearInterval(uploadInterval);
                  const completedFile = {
                    ...f,
                    uploadProgress: 100,
                    uploadedAt: new Date()
                  };

                  setTimeout(() => {
                    onUploadComplete?.(completedFile);

                    if (showValidation) {
                      validateFile(completedFile);
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
      } catch (error) {
        console.error('Upload failed:', error);
        setFiles(prev => prev.map(f =>
          f.id === uploadFileData.id ? { ...f, error: 'Upload failed' } : f
        ));
      }
    }, [onUploadComplete, showValidation, validateFile]);

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
        fileMap.set(uploadFile.id, file);

        // Start upload if autoUpload is enabled
        if (autoUpload) {
          handleUpload(uploadFile, file);
        }
      }

      if (newFiles.length > 0) {
        const updatedFiles = [...files, ...newFiles];
        setFiles(updatedFiles);
        onFilesChange?.(updatedFiles);
      }
    }, [files, maxFiles, maxFileSize, type, autoUpload, onFilesChange, fileMap, handleUpload]);
    
    
    
    // Handle file deletion
    const handleDelete = useCallback((fileId: string) => {
      const updatedFiles = files.filter(f => f.id !== fileId);
      setFiles(updatedFiles);
      setFileMap(prev => {
        const newMap = new Map(prev);
        newMap.delete(fileId);
        return newMap;
      });
      onFilesChange?.(updatedFiles);
    }, [files, onFilesChange]);
    
    // Handle file retry
    const handleRetry = useCallback((fileId: string) => {
      const uploadFile = files.find(f => f.id === fileId);
      const originalFile = fileMap.get(fileId);
      if (uploadFile && originalFile) {
        setFiles(prev => prev.map(f =>
          f.id === fileId ? { ...f, uploadProgress: 0, error: undefined } : f
        ));
        handleUpload(uploadFile, originalFile);
      }
    }, [files, fileMap, handleUpload]);
    
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
            <div className="flex items-start gap-[var(--spacing-x4)] flex-wrap">
              {/* Show existing thumbnails */}
              {files.map(uploadFile => (
                <UploadThumbnail
                  key={uploadFile.id}
                  preview={uploadFile.preview}
                  fileName={uploadFile.name}
                  onDelete={() => handleDelete(uploadFile.id)}
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
          "flex flex-col items-start gap-[var(--spacing-x4)]",
          type === 'drag-drop' && "w-full max-w-[calc(var(--spacing-x10)*21.75)]",
          type === 'button' && "w-full max-w-[calc(var(--spacing-x8)*3.85)]",
          className
        )}
        {...props}
      >
        {/* Upload input */}
        {renderUploadInput()}
        
        {/* File list (only for drag-drop and button types) */}
        {type !== 'thumbnail' && files.length > 0 && (
          <div className="flex flex-col items-start gap-[var(--spacing-x4)] w-full">
            {files.map(uploadFile => {
              const isUploading = (uploadFile.uploadProgress || 0) < 100;
              return (
                <UploadItem
                  key={uploadFile.id}
                  type={getItemType()}
                  state={isUploading ? 'uploading' : 'uploaded'}
                  file={uploadFile}
                  onDelete={() => handleDelete(uploadFile.id)}
                  onRetry={() => handleRetry(uploadFile.id)}
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
