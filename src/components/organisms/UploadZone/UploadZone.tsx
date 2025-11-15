"use client";

import React, { useState, useCallback } from 'react';
import { cn } from '../../../lib/utils';
import { CloudUpload } from '../../atoms/Icons/CloudUpload';
import { Typography } from '../../atoms/Typography';

export type UploadZoneType = 'drag-drop' | 'button' | 'thumbnail';
export type UploadZoneState = 'default' | 'hover' | 'disabled';

export interface UploadZoneProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: UploadZoneType;
  state?: UploadZoneState;
  onFileSelect?: (files: FileList) => void;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
  disabled?: boolean;
  multiple?: boolean;
}

export const UploadZone = React.forwardRef<HTMLDivElement, UploadZoneProps>(
  ({ 
    className, 
    type = 'drag-drop',
    state = 'default',
    onFileSelect,
    acceptedFileTypes = ['Excel', 'CSV'],
    maxFileSize = 10,
    disabled = false,
    multiple = false,
    ...props 
  }, ref) => {
    
    const [isDragActive, setIsDragActive] = useState(false);
    const isDisabled = disabled || state === 'disabled';
    const isHover = state === 'hover' || isDragActive;
    
    // Handle drag events
    const handleDragEnter = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isDisabled && type === 'drag-drop') {
        setIsDragActive(true);
      }
    }, [isDisabled, type]);
    
    const handleDragLeave = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (type === 'drag-drop') {
        setIsDragActive(false);
      }
    }, [type]);
    
    const handleDragOver = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    }, []);
    
    const handleDrop = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
      
      if (!isDisabled && onFileSelect && e.dataTransfer.files.length > 0) {
        onFileSelect(e.dataTransfer.files);
      }
    }, [isDisabled, onFileSelect]);
    
    // Handle file input change
    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isDisabled && onFileSelect && e.target.files && e.target.files.length > 0) {
        onFileSelect(e.target.files);
      }
    }, [isDisabled, onFileSelect]);
    
    // Handle click to open file dialog
    const handleClick = useCallback(() => {
      if (!isDisabled) {
        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = multiple;
        input.accept = acceptedFileTypes.includes('Excel') ? '.xlsx,.xls' : '';
        if (acceptedFileTypes.includes('CSV')) {
          input.accept += (input.accept ? ',' : '') + '.csv';
        }
        input.onchange = (e) => {
          const target = e.target as HTMLInputElement;
          if (target.files && target.files.length > 0) {
            handleFileChange({ target } as React.ChangeEvent<HTMLInputElement>);
          }
        };
        input.click();
      }
    }, [isDisabled, multiple, acceptedFileTypes, handleFileChange]);
    
    // Only drag-drop type uses the full upload zone
    if (type === 'drag-drop') {
      return (
        <div
          className={cn(
            // Base styles from Figma
            "flex flex-col items-center justify-center gap-[20px] p-[20px_12px]",
            "border-[1.5px] border-dashed rounded-[8px]",
            "cursor-pointer transition-all duration-200",
            "bg-[var(--bg-secondary)]",
            // Default state
            "border-[var(--border-primary)]",
            // Hover/Active state
            isHover && !isDisabled && "border-[var(--primary)]",
            // Disabled state
            isDisabled && "border-[var(--border-primary)] opacity-50 cursor-not-allowed",
            className
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleClick}
          ref={ref}
          {...props}
        >
          {/* Upload Icon */}
          <div className="flex items-center justify-center w-[65px] h-[62px]">
            <CloudUpload 
              size={65}
              className={cn(
                "transition-colors",
                isDisabled ? "text-[var(--bg-secondary)]" : "text-[var(--primary)]"
              )}
            />
          </div>
          
          {/* Upload Instructions */}
          <div className="flex flex-col items-center gap-[16px] px-[20px] w-full">
            {/* Main instruction */}
            <div className="flex items-center justify-center w-full">
              <Typography 
                variant="display-primary"
                className={cn(
                  "text-center",
                  isDisabled ? "text-[var(--border-primary)]" : "text-[var(--primary)]"
                )}
              >
                Click or Drag and drop file here to upload or{' '}
                <span className={cn(
                  "underline decoration-solid",
                  isDisabled ? "text-[var(--border-primary)]" : "text-[var(--neutral)]"
                )}>
                  Choose files
                </span>
              </Typography>
            </div>
            
            {/* File restrictions */}
            <div className="flex items-center justify-center w-full">
              <Typography 
                variant="body-primary-medium"
                className={cn(
                  "text-center",
                  isDisabled ? "text-[var(--border-primary)]" : "text-[var(--tertiary)]"
                )}
              >
                Allowed file type: {acceptedFileTypes.join(' & ')} | Max Size: {maxFileSize} mb
              </Typography>
            </div>
          </div>
        </div>
      );
    }
    
    // For button and thumbnail types, these are handled by their respective components
    // This component only provides the drag-drop zone
    return null;
  }
);

UploadZone.displayName = 'UploadZone';
