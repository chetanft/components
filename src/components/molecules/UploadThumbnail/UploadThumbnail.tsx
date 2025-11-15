"use client";

import React, { useRef } from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { Typography } from '../../atoms/Typography';

export interface UploadThumbnailProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  preview?: string | null;
  fileName?: string;
  state?: 'default' | 'hover' | 'disabled';
  onFileSelect?: (files: FileList) => void;
  onDelete?: () => void;
  acceptedFileTypes?: string[];
  multiple?: boolean;
  disabled?: boolean;
  showFileName?: boolean;
}

export const UploadThumbnail = React.forwardRef<HTMLDivElement, UploadThumbnailProps>(
  ({ 
    className,
    preview = null,
    fileName,
    state = 'default',
    onFileSelect,
    onDelete,
    acceptedFileTypes = ['image/*'],
    multiple = false,
    disabled = false,
    showFileName = true,
    ...props 
  }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const isDisabled = disabled || state === 'disabled';
    
    const handleClick = () => {
      if (!isDisabled && !preview && inputRef.current) {
        inputRef.current.click();
      }
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isDisabled && onFileSelect && e.target.files && e.target.files.length > 0) {
        onFileSelect(e.target.files);
        e.target.value = '';
      }
    };
    
    const handleDelete = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (onDelete) {
        onDelete();
      }
    };
    
    // If there's a preview, show the uploaded image
    if (preview) {
      return (
        <div
          ref={ref}
          className={cn(
            "inline-flex flex-col items-start gap-[4px] w-[80px]",
            className
          )}
          {...props}
        >
          {/* Thumbnail container */}
          <div className="relative w-[80px] h-[80px]">
            {/* Image preview */}
            <div className="w-full h-full rounded-[8px] overflow-hidden">
              <img
                src={preview}
                alt={fileName || 'Preview'}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Delete button overlay */}
            {onDelete && (
              <div
                onClick={handleDelete}
                className={cn(
                  "absolute top-[3px] right-[3px]",
                  "w-[20px] h-[20px]",
                  "bg-[var(--bg-secondary)] rounded-full",
                  "flex items-center justify-center",
                  "cursor-pointer transition-all duration-200",
                  "hover:bg-[var(--critical-light)]"
                )}
              >
                <Icon 
                  name="delete" 
                  size={12}
                  className="text-[var(--critical)]"
                />
              </div>
            )}
          </div>
          
          {/* File name (optional) */}
          {showFileName && fileName && (
            <Typography 
              variant="body-secondary-regular"
              className="text-[var(--secondary)] text-center w-full overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {fileName}
            </Typography>
          )}
        </div>
      );
    }
    
    // Otherwise, show the "Add" button
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-0 p-0 rounded-[8px]",
          className
        )}
        {...props}
      >
        <div
          onClick={handleClick}
          className={cn(
            // Base button styles from Figma
            "inline-flex items-center justify-center gap-[8px]",
            "w-[80px] h-[80px] px-[20px] py-[12px]",
            "rounded-[8px]",
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
          {/* Add icon - 24x24 from Figma */}
          <Icon 
            name="add" 
            size={24}
            className={cn(
              "text-[var(--primary)]",
              isDisabled && "text-[var(--border-primary)]"
            )}
          />
        </div>
        
        {/* Hidden file input */}
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept={acceptedFileTypes.join(',')}
          multiple={multiple}
          disabled={isDisabled}
        />
      </div>
    );
  }
);

UploadThumbnail.displayName = 'UploadThumbnail';

