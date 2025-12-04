"use client";
import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { FileTypeIcon } from '../FileTypeIcon/FileTypeIcon';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface FileThumbnailProps extends ComposableProps<'div'> {
  fileName: string;
  imageUrl?: string; // Optional image preview URL
  showFileName?: boolean; // Whether to show filename below thumbnail
  onPreview?: () => void; // Preview/view action
  onDownload?: () => void; // Download action
}

// Extract file extension from fileName
const getFileExtension = (fileName: string): string => {
  const parts = fileName.split('.');
  return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : '';
};

export const FileThumbnail = React.forwardRef<HTMLDivElement, FileThumbnailProps>(
  ({ 
    className,
    fileName,
    imageUrl,
    showFileName = false,
    onPreview,
    onDownload,
    asChild,
    ...props 
  }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const fileExtension = getFileExtension(fileName);
    const hasActions = (onPreview || onDownload) && imageUrl;
    const Comp = asChild ? Slot : 'div';
    
    return (
      <Comp
        ref={ref}
        className={cn(
          "flex flex-col gap-[4px] items-start w-[80px]",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {/* Thumbnail Container */}
        <div className="relative shrink-0 size-[80px] rounded-[8px] overflow-hidden group">
          {/* Image Preview or File Type Icon */}
          {imageUrl ? (
            <div className="relative size-full">
              <img 
                src={imageUrl}
                alt={fileName}
                className="absolute inset-0 max-w-none object-cover object-center pointer-events-none rounded-[8px] size-full"
              />
              {/* Hover Overlay */}
              {isHovered && hasActions && (
                <div className="absolute inset-0 bg-[rgba(67,79,100,0.8)] rounded-[8px] pointer-events-none" />
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center size-full px-[16px] py-[14px]">
              <FileTypeIcon 
                fileType={fileExtension || 'FILE'} 
                size="lg"
                className="h-full w-auto"
              />
            </div>
          )}
          
          {/* Action Icons (only show on hover with image preview) */}
          {isHovered && hasActions && imageUrl && (
            <>
              {onPreview && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPreview();
                  }}
                  className="absolute left-[calc(50%-15px)] top-[calc(50%-12px)] translate-x-[-50%] translate-y-[-50%] size-[20px] flex items-center justify-center z-10 hover:opacity-80 transition-opacity text-[var(--overlay-control-text)]"
                  aria-label="Preview file"
                >
                  <Icon name="preview" size={20} />
                </button>
              )}
              {onDownload && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDownload();
                  }}
                  className="absolute left-[calc(50%+15px)] top-[calc(50%-12px)] translate-x-[-50%] translate-y-[-50%] size-[20px] flex items-center justify-center z-10 hover:opacity-80 transition-opacity text-[var(--overlay-control-text)]"
                  aria-label="Download file"
                >
                  <Icon name="download" size={20} />
                </button>
              )}
            </>
          )}
        </div>
        
        {/* Filename (optional) */}
        {showFileName && (
          <p className="font-normal leading-[1.4] overflow-ellipsis overflow-hidden relative shrink-0 text-sm-rem text-[var(--secondary)] text-center w-full">
            {/* 14px → 1rem (responsive) */}
            {fileName}
          </p>
        )}
      </Comp>
    );
  }
);

FileThumbnail.displayName = 'FileThumbnail';
