"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { FileIcon } from '../../atoms/Icons/FileIcon';
import { LoadingSpinner } from '../../atoms/Icons/LoadingSpinner';
import { Icon } from '../../atoms/Icons';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { Typography } from '../../atoms/Typography';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { getGlassClasses, useResolvedGlass, type GlassVariant } from '../../../lib/glass';

export type UploadItemType = 'card' | 'text' | 'thumbnail';
export type UploadItemState = 'uploading' | 'uploaded' | 'saved' | 'error';

export interface UploadFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadProgress?: number;
  uploadedAt?: Date;
  preview?: string;
}

export interface UploadItemProps extends ComposableProps<'div'> {
  type?: UploadItemType;
  state?: UploadItemState;
  file: UploadFile;
  onDelete?: () => void;
  onRetry?: () => void;
  /** Glass morphism variant */
  glass?: GlassVariant;
}

export const UploadItem = React.forwardRef<HTMLDivElement, UploadItemProps>(
  ({ 
    className,
    type = 'card',
    state = 'uploading',
    file,
    onDelete,
    onRetry,
    glass,
    asChild,
    ...props
  }, ref) => {
    const resolvedGlass = useResolvedGlass(glass);
    
    // Determine file icon type
    const getFileIconType = () => {
      if (file.type.includes('excel') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        return 'excel';
      }
      if (file.type.includes('csv') || file.name.endsWith('.csv')) {
        return 'csv';
      }
      return 'generic';
    };
    
    // Format file size
    const formatFileSize = (bytes: number) => {
      if (bytes < 1024) return `${bytes} B`;
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };
    
    // Format date
    const formatDate = (date?: Date) => {
      if (!date) return '';
      return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).format(date);
    };
    
    const Comp = asChild ? Slot : 'div';
    
    // Render Text type
    if (type === 'text') {
      return (
        <Comp
          ref={ref}
          className={cn(
            "inline-flex items-center justify-between gap-[var(--spacing-x2)] p-[var(--spacing-x2)]",
            "rounded-[var(--radius-sm)]",
            className
          )}
          {...props}
        >
          {/* File name button */}
          <div className="inline-flex items-center gap-[var(--spacing-x2)]">
            <Typography 
              variant="body-secondary-medium"
              className="text-[var(--neutral)]"
            >
              {file.name}
            </Typography>
          </div>
          
          {/* Status indicator */}
          <div className={cn(
            "flex items-center justify-center w-[var(--spacing-x3)] h-[var(--spacing-x3)]",
            "bg-[var(--bg-secondary)] rounded-full p-[var(--spacing-x1)]"
          )}>
            {state === 'uploading' && (
              <LoadingSpinner size={12} color="var(--neutral)" />
            )}
            {(state === 'uploaded' || state === 'saved') && onDelete && (
              <div onClick={onDelete} className="cursor-pointer">
                <Icon name="delete" size={12} className="text-[var(--critical)]" />
              </div>
            )}
            {state === 'error' && onRetry && (
              <div onClick={onRetry} className="cursor-pointer">
                <Icon name="refresh" size={12} className="text-[var(--warning)]" />
              </div>
            )}
          </div>
        </Comp>
      );
    }
    
    // Render Card type (default)
    return (
      <Comp
        ref={ref}
        className={cn(
          "flex flex-col items-start justify-center w-full",
          className
        )}
        {...props}
      >
        <div className={cn(
          "w-full", getGlassClasses(resolvedGlass, 'bg-[var(--bg-primary)]', 'border border-[var(--border-secondary)]'),
          "rounded-[var(--radius-md)] overflow-hidden"
        )}>
          {/* Spacer */}
          <div className="h-[var(--spacing-x3)] w-full" />
          
          {/* Main content */}
          <div className="flex items-center justify-between w-full px-[var(--spacing-x3)]">
            {/* Left side - Icon and file info */}
            <div className="flex items-start gap-[var(--spacing-x5)] flex-1 min-w-0">
              {/* File icon */}
              <div className="flex items-center justify-center shrink-0">
                <FileIcon type={getFileIconType()} size={40} />
              </div>
              
              {/* File details */}
              <div className="flex flex-col gap-[var(--spacing-x1)] flex-1 min-w-0">
                <div className="flex flex-col gap-[var(--spacing-x1)] w-full">
                  <Typography 
                    variant="body-primary-semibold"
                    className="text-[var(--primary)] truncate"
                  >
                    {file.name}
                  </Typography>
                  
                  {/* Subtitle - date or size */}
                  {(state === 'uploaded' || state === 'saved') && file.uploadedAt ? (
                    <Typography 
                      variant="body-secondary-regular"
                      className="text-[var(--secondary)]"
                    >
                      {formatDate(file.uploadedAt)}
                    </Typography>
                  ) : (
                    <Typography 
                      variant="body-secondary-regular"
                      className="text-[var(--secondary)]"
                    >
                      {formatFileSize(file.size)}
                    </Typography>
                  )}
                  
                  {state === 'error' && (
                    <Typography 
                      variant="body-secondary-regular"
                      className="text-[var(--critical)]"
                    >
                      Upload failed. Please try again.
                    </Typography>
                  )}
                </div>
              </div>
              
              {/* Right side - Delete button */}
              <div className="flex items-center justify-center shrink-0">
                {onDelete && (
                  <div 
                    onClick={onDelete}
                    className="w-[var(--spacing-x4)] h-[var(--spacing-x4)] cursor-pointer overflow-hidden"
                  >
                    <Icon name="cross" size={16} className="text-[var(--secondary)]" />
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Spacer */}
          <div className="h-[var(--spacing-x3)] w-full" />
          
          {/* Progress bar for uploading state */}
          {state === 'uploading' && (
            <>
              <div className="w-full px-[var(--spacing-x3)]">
                <div className="flex items-center gap-[var(--spacing-x5)] w-full">
                  <ProgressBar 
                    value={file.uploadProgress || 0}
                    className="flex-1"
                    showPercentage={true}
                  />
                </div>
              </div>
              <div className="h-[var(--spacing-x3)] w-full" />
            </>
          )}
        </div>
      </Comp>
    );
  }
);

UploadItem.displayName = 'UploadItem';
