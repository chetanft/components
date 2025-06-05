"use client";

import React from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../Button/Button';
import { Icon } from '../Icons';

export interface FileThumbnailProps extends React.HTMLAttributes<HTMLDivElement> {
  fileName: string;
  onDownload?: () => void;
  onRemove?: () => void;
  variant?: 'uploaded' | 'downloading';
}

export const FileThumbnail = React.forwardRef<HTMLDivElement, FileThumbnailProps>(
  ({ 
    className,
    fileName,
    onDownload,
    onRemove,
    variant = 'uploaded',
    ...props 
  }, ref) => {
    
    return (
      <div
        className={cn(
          // Base styles from Figma
          "bg-[#F8F8F9] rounded-[8px] p-[20px]",
          "flex items-center gap-[16px]",
          "w-full",
          className
        )}
        ref={ref}
        {...props}
      >
        {/* File Info Section */}
        <div className="flex items-center gap-[12px] flex-1">
          {/* File Icon */}
          <Icon 
            name="excel" 
            size={16} 
            className="text-[#434F64] flex-shrink-0"
          />
          
          {/* File Name */}
          <span className="text-[14px] font-[500] leading-[1.4] text-[#434F64] truncate">
            {fileName}
          </span>
        </div>
        
        {/* Action Button */}
        {variant === 'uploaded' && onDownload && (
          <Button
            variant="secondary"
            size="md"
            className="gap-[8px] px-[24px] py-[12px] h-[40px] w-[157px]"
            onClick={onDownload}
          >
            <Icon name="download" size={16} />
            <span className="text-[16px] font-[500] leading-[1.4] text-[#434F64]">
              Download
            </span>
          </Button>
        )}
        
        {/* Remove button for any variant */}
        {onRemove && (
          <Button
            variant="secondary"
            size="md"
            className="rounded-full w-[40px] h-[40px] ml-auto"
            onClick={onRemove}
          >
            <Icon name="cross-icon" size={16} />
          </Button>
        )}
      </div>
    );
  }
);

FileThumbnail.displayName = 'FileThumbnail'; 