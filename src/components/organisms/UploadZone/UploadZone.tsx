"use client";

import React, { useState, useCallback } from 'react';
import { cn } from '../../../lib/utils';
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
            "flex flex-col items-center justify-center gap-[var(--spacing-x5)] px-[var(--spacing-x5)] py-[var(--spacing-x3)]",
            "border border-dashed rounded-[var(--radius-md)]",
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
          <div className="flex items-center justify-center w-[calc(var(--spacing-x8)+var(--spacing-x1))] h-[calc(var(--spacing-x8)+var(--spacing-x1))]">
            <svg 
              width="65" 
              height="62" 
              viewBox="0 0 65 62" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className={cn("transition-colors", isDisabled && "opacity-50")}
            >
              <path 
                d="M0 8C0 3.58172 3.58172 0 8 0H57C61.4183 0 65 3.58172 65 8V54C65 58.4183 61.4183 62 57 62H8C3.58172 62 0 58.4183 0 54V8Z" 
                fill="white"
              />
              <path 
                d="M32.4974 32.6647V46M32.4974 32.6647L25.8968 39.3323M32.4974 32.6647L39.0981 39.3323M19.2961 35.8302C18.0701 34.5648 17.1452 33.0343 16.5915 31.3544C16.0378 29.6745 15.8698 27.8894 16.1003 26.1342C16.3307 24.3791 16.9536 22.6999 17.9216 21.2239C18.8897 19.7479 20.1776 18.5138 21.6877 17.615C23.1979 16.7163 24.8907 16.1765 26.638 16.0365C28.3852 15.8965 30.1411 16.1601 31.7726 16.8071C33.4041 17.4542 34.8685 18.4678 36.0548 19.7712C37.241 21.0746 38.1181 22.6336 38.6196 24.3301H41.5734C43.1666 24.3299 44.7177 24.8474 45.9975 25.8061C47.2772 26.7648 48.2178 28.1138 48.6803 29.6539C49.1428 31.1941 49.1026 32.8436 48.5657 34.3589C48.0288 35.8742 47.0237 37.1749 45.6988 38.0688" 
                stroke={isDisabled ? "var(--border-primary)" : "#5F697B"} 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
          
          {/* Upload Instructions */}
          <div className="flex flex-col items-center gap-[var(--spacing-x4)] px-[var(--spacing-x5)] w-full">
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
