"use client";

import React, { useState, useCallback } from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';

export interface UploadZoneProps extends React.HTMLAttributes<HTMLDivElement> {
  onFileSelect?: (files: FileList) => void;
  acceptedFileTypes?: string[];
  maxFileSize?: number; // in MB
  disabled?: boolean;
  multiple?: boolean;
}

export const UploadZone = React.forwardRef<HTMLDivElement, UploadZoneProps>(
  ({ 
    className, 
    onFileSelect,
    acceptedFileTypes = ['Excel', 'CSV'],
    maxFileSize = 10,
    disabled = false,
    multiple = false,
    ...props 
  }, ref) => {
    
    const [isDragActive, setIsDragActive] = useState(false);
    const [isDragReject, setIsDragReject] = useState(false);
    
    // Handle drag events
    const handleDragEnter = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) {
        setIsDragActive(true);
      }
    }, [disabled]);
    
    const handleDragLeave = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
      setIsDragReject(false);
    }, []);
    
    const handleDragOver = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    }, []);
    
    const handleDrop = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
      setIsDragReject(false);
      
      if (!disabled && onFileSelect && e.dataTransfer.files.length > 0) {
        onFileSelect(e.dataTransfer.files);
      }
    }, [disabled, onFileSelect]);
    
    // Handle file input change
    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled && onFileSelect && e.target.files && e.target.files.length > 0) {
        onFileSelect(e.target.files);
      }
    }, [disabled, onFileSelect]);
    
    // Handle click to open file dialog
    const handleClick = useCallback(() => {
      if (!disabled) {
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
    }, [disabled, multiple, acceptedFileTypes, handleFileChange]);
    
    return (
      <div
        className={cn(
          // Base styles - exact from Figma
          "flex flex-col items-center justify-center gap-[20px] p-[20px_12px]",
          "border-[1.5px] border-dashed border-[#CED1D7] rounded-[8px]",
          "bg-white cursor-pointer transition-colors",
          // Interactive states
          isDragActive && "border-[#1890FF] bg-[#F6FFED]",
          isDragReject && "border-[#FF3533] bg-[#FFF2F0]",
          disabled && "opacity-50 cursor-not-allowed",
          // Hover state
          !disabled && "hover:border-[#1890FF] hover:bg-[#FAFBFC]",
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
        <div className="flex flex-col items-center justify-center gap-[8px] p-[16px] rounded-[8px]">
          <Icon 
            name="file-upload" 
            size={33} 
            className={cn(
              "text-[#5F697B]",
              isDragActive && "text-[#1890FF]",
              isDragReject && "text-[#FF3533]"
            )}
          />
        </div>
        
        {/* Upload Instructions */}
        <div className="flex flex-col items-center gap-[16px] px-[20px]">
          {/* Main instruction */}
          <div className="flex flex-col items-center gap-[10px] w-full">
            <p className="text-[20px] font-[600] leading-[1.4] text-[#434F64] text-center">
              Click or Drag and drop file here to upload or Choose files
            </p>
          </div>
          
          {/* File restrictions */}
          <div className="flex flex-col items-center gap-[10px] w-full">
            <p className="text-[16px] font-[500] leading-[1.4] text-[#838C9D] text-center">
              Allowed file type: {acceptedFileTypes.join(' & ')} | Max Size: {maxFileSize} mb
            </p>
          </div>
        </div>
      </div>
    );
  }
);

UploadZone.displayName = 'UploadZone'; 