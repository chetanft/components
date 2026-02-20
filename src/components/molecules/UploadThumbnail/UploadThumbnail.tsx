"use client";

import React, { useRef } from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { Typography } from '../../atoms/Typography';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { getGlassClasses, useResolvedGlass, type GlassVariant } from '../../../lib/glass';

export interface UploadThumbnailProps extends Omit<ComposableProps<'div'>, 'onSelect'> {
  preview?: string | null;
  fileName?: string;
  state?: 'default' | 'hover' | 'disabled';
  onFileSelect?: (files: FileList) => void;
  onDelete?: () => void;
  acceptedFileTypes?: string[];
  multiple?: boolean;
  disabled?: boolean;
  showFileName?: boolean;
  /** Glass morphism variant */
  glass?: GlassVariant;
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
    glass,
    asChild,
    ...props
  }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const resolvedGlass = useResolvedGlass(glass);
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
            "inline-flex flex-col items-start gap-[var(--spacing-x1)] w-[var(--spacing-x20)]",
            className
          )}
          {...props}
        >
          {/* Thumbnail container */}
          <div className="relative w-[var(--spacing-x20)] h-[var(--spacing-x20)]">
            {/* Image preview */}
            <div className="w-full h-full rounded-[var(--radius-md)] overflow-hidden">
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
                  "absolute top-[calc(var(--spacing-x1)-var(--spacing-x1)/4)] right-[calc(var(--spacing-x1)-var(--spacing-x1)/4)]",
                  "w-[var(--spacing-x5)] h-[var(--spacing-x5)]",
                  "bg-[var(--color-bg-secondary)] rounded-[var(--radius-full)]",
                  "flex items-center justify-center",
                  "cursor-pointer transition-all duration-200",
                  "hover:bg-[var(--color-critical-light)]"
                )}
              >
                <Icon 
                  name="delete" 
                  size={12}
                  className="text-[var(--color-critical)]"
                />
              </div>
            )}
          </div>
          
          {/* File name (optional) */}
          {showFileName && fileName && (
            <Typography 
              variant="body-secondary-regular"
              className="text-[var(--color-secondary)] text-center w-full overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {fileName}
            </Typography>
          )}
        </div>
      );
    }
    
    // Otherwise, show the "Add" button
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
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
            "w-[var(--spacing-x20)] h-[var(--spacing-x20)] px-[var(--spacing-x5)] py-[var(--spacing-x3)]",
            "rounded-[var(--radius-md)]",
            "border border-solid",
            "transition-all duration-200",
            "cursor-pointer",
            // Default state
            getGlassClasses(resolvedGlass, 'bg-transparent', 'border-[var(--color-border-primary)]'),
            // Hover state
            !isDisabled && "hover:border-[var(--color-primary)]",
            // Disabled state
            isDisabled && "opacity-50 cursor-not-allowed",
            // Force hover state if specified
            state === 'hover' && !isDisabled && "border-[var(--color-primary)]"
          )}
        >
          {/* Add icon - 24x24 from Figma */}
          <Icon 
            name="add" 
            size={24}
            className={cn(
              "text-[var(--color-primary)]",
              isDisabled && "text-[var(--color-border-primary)]"
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
      </Comp>
    );
  }
);

UploadThumbnail.displayName = 'UploadThumbnail';
