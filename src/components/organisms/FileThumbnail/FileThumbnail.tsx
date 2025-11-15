"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icons';
import { Typography } from '../../atoms/Typography';

export interface FileThumbnailProps extends React.HTMLAttributes<HTMLDivElement> {
  fileName: string;
  onDownload?: () => void;
  variant?: 'uploaded' | 'downloading';
}

export const FileThumbnail = React.forwardRef<HTMLDivElement, FileThumbnailProps>(
  ({ 
    className,
    fileName,
    onDownload,
    variant = 'uploaded',
    ...props 
  }, ref) => {
    
    return (
      <div
        className={cn(
          // Base styles from Figma
          "bg-[var(--bg-secondary)] rounded-[8px] p-[20px]",
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
            className="text-[var(--primary)] flex-shrink-0"
          />
          
          {/* File Name */}
          <Typography 
            variant="body-secondary-medium"
            as="span"
            className="text-[var(--primary)] truncate"
          >
            {fileName}
          </Typography>
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
            <Typography 
              variant="body-primary-medium"
              as="span"
              className="text-[var(--primary)]"
            >
              Download
            </Typography>
          </Button>
        )}
      </div>
    );
  }
);

FileThumbnail.displayName = 'FileThumbnail'; 