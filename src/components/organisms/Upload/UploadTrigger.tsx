"use client";

import React from 'react';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { UploadButton } from '../../molecules/UploadButton/UploadButton';
import { UploadZone } from '../UploadZone/UploadZone';
import { useUploadContext } from './UploadContext';

export interface UploadTriggerProps extends ComposableProps<'div'> {
  /**
   * Trigger content (optional, defaults to UploadButton or UploadZone based on type).
   */
  children?: React.ReactNode;
}

/**
 * UploadTrigger Component
 *
 * A composable component for the upload trigger (button or zone).
 * Automatically renders UploadButton or UploadZone based on Upload type.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Upload type="button">
 *   <UploadTrigger />
 *   <UploadList />
 * </Upload>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically handles file selection based on Upload type.
 */
export const UploadTrigger = React.forwardRef<HTMLDivElement, UploadTriggerProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const {
      type,
      acceptedFileTypes,
      maxFileSize,
      multiple,
      handleFileSelect,
    } = useUploadContext();
    
    if (asChild) {
      return (
        <Slot ref={ref} className={className} {...props}>
          {children}
        </Slot>
      );
    }
    
    if (children) {
      return (
        <div ref={ref} className={className} {...props}>
          {children}
        </div>
      );
    }
    
    // Render based on type
    if (type === 'button') {
      return (
        <UploadButton
          ref={ref}
          onFileSelect={handleFileSelect}
          acceptedFileTypes={acceptedFileTypes}
          maxFileSize={maxFileSize}
          multiple={multiple}
          className={className}
          {...props}
        />
      );
    }
    
    return (
      <UploadZone
        ref={ref}
        type={type}
        onFileSelect={handleFileSelect}
        acceptedFileTypes={acceptedFileTypes}
        maxFileSize={maxFileSize}
        multiple={multiple}
        className={className}
        {...props}
      />
    );
  }
);

UploadTrigger.displayName = 'UploadTrigger';

