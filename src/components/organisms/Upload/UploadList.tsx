"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { UploadItem } from '../../molecules/UploadItem/UploadItem';
import { useUploadContext } from './UploadContext';

export interface UploadListProps extends ComposableProps<'div'> {
  /**
   * List content (optional, defaults to UploadItem components).
   */
  children?: React.ReactNode;
}

/**
 * UploadList Component
 *
 * A composable component for the file list in an Upload.
 * Automatically renders UploadItem components for each file.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Upload type="drag-drop">
 *   <UploadTrigger />
 *   <UploadList />
 * </Upload>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Only renders for drag-drop and button types (not thumbnail).
 */
export const UploadList = React.forwardRef<HTMLDivElement, UploadListProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const { type, files, handleDelete, handleRetry } = useUploadContext();
    
    // Don't render for thumbnail type
    if (type === 'thumbnail') {
      return null;
    }
    
    if (files.length === 0) {
      return null;
    }
    
    // Determine item display type based on upload type
    const getItemType = () => {
      if (type === 'button') return 'text';
      return 'card';
    };
    
    if (asChild) {
      return (
        <Slot ref={ref} className={className} {...props}>
          {children}
        </Slot>
      );
    }
    
    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-start gap-[var(--spacing-x4)] w-full", className)}
        {...props}
      >
        {children || files.map(uploadFile => {
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
    );
  }
);

UploadList.displayName = 'UploadList';

