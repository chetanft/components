"use client";

import React, { useRef } from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { Typography } from '../../atoms/Typography';

export interface UploadButtonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  onFileSelect?: (files: FileList) => void;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
  disabled?: boolean;
  multiple?: boolean;
  state?: 'default' | 'hover' | 'disabled';
}

export const UploadButton = React.forwardRef<HTMLDivElement, UploadButtonProps>(
  ({ 
    className,
    onFileSelect,
    acceptedFileTypes = ['Excel', 'CSV'],
    maxFileSize: _maxFileSize = 10,
    disabled = false,
    multiple = false,
    state = 'default',
    ...props 
  }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    
    const isDisabled = disabled || state === 'disabled';
    
    const handleClick = () => {
      if (!isDisabled && inputRef.current) {
        inputRef.current.click();
      }
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isDisabled && onFileSelect && e.target.files && e.target.files.length > 0) {
        onFileSelect(e.target.files);
        // Reset input so same file can be selected again
        e.target.value = '';
      }
    };
    
    // Build accept attribute from file types
    const getAcceptAttribute = () => {
      const accepts: string[] = [];
      if (acceptedFileTypes.includes('Excel')) {
        accepts.push('.xlsx', '.xls');
      }
      if (acceptedFileTypes.includes('CSV')) {
        accepts.push('.csv');
      }
      return accepts.join(',');
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          // Base container styles
          "inline-flex items-center justify-center gap-0 p-0 rounded-[var(--radius-md)]",
          className
        )}
        {...props}
      >
        <div
          onClick={handleClick}
          className={cn(
            // Base button styles from Figma
            "inline-flex items-center justify-center gap-[var(--spacing-x2)]",
            "h-[var(--spacing-x10)] px-[var(--spacing-x5)] py-[var(--spacing-x3)]",
            "rounded-[var(--radius-md)]",
            "border border-solid",
            "transition-all duration-200",
            "cursor-pointer",
            // Default state
            "border-[var(--border-primary)] bg-transparent",
            // Hover state
            !isDisabled && "hover:border-[var(--primary)]",
            // Disabled state
            isDisabled && "opacity-50 cursor-not-allowed",
            // Force hover state if specified
            state === 'hover' && !isDisabled && "border-[var(--primary)]"
          )}
        >
          {/* Leading icon - 16x16 from Figma */}
          <div className="flex items-center justify-center w-[var(--spacing-x4)] h-[var(--spacing-x4)] overflow-hidden">
            <Icon 
              name="add" 
              size={16}
              color={isDisabled ? "var(--border-primary)" : "var(--primary)"}
            />
          </div>
          
          {/* Button text */}
          <Typography 
            variant="body-primary-medium"
            className={cn(
              "whitespace-nowrap",
              isDisabled ? "text-[var(--border-primary)]" : "text-[var(--primary)]"
            )}
          >
            Upload file
          </Typography>
        </div>
        
        {/* Hidden file input */}
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept={getAcceptAttribute()}
          multiple={multiple}
          disabled={isDisabled}
        />
      </div>
    );
  }
);

UploadButton.displayName = 'UploadButton';
