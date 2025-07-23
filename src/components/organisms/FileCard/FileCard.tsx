"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Button } from '../../atoms/Button/Button';
import { Badge } from '../../atoms/Badge';
import { FileTypeIcon } from '../FileTypeIcon';
import { ProgressBar } from '../../molecules/ProgressBar';
import { Icon } from '../../atoms/Icons';

export interface FileStats {
  total?: number;
  success?: number;
  invalid?: number;
}

export interface FileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  // File Information
  fileName: string;
  fileType: string;
  fileDate?: string;
  
  // Status and Progress
  status: 'uploading' | 'validating' | 'processed' | 'partially-processed' | 'failed' | 'template-mismatch' | 'upload-failed' | 'unsupported' | 'empty' | 'too-large';
  progress?: number; // 0-100 for uploading status
  
  // File Statistics (for processed files)
  stats?: FileStats;
  
  // Error Messages
  errorMessage?: string;
  
  // Actions
  onDownload?: () => void;
  onPreview?: () => void;
  onDelete?: () => void;
  onRefresh?: () => void;
  onClose?: () => void;
  
  // Variants
  variant?: 'compact' | 'expanded' | 'with-progress' | 'with-stats';
  
  // States
  downloadDisabled?: boolean;
}

export const FileCard = React.forwardRef<HTMLDivElement, FileCardProps>(
  ({ 
    className,
    fileName,
    fileType,
    fileDate,
    status,
    progress = 0,
    stats,
    errorMessage,
    onDownload,
    onPreview,
    onDelete,
    onRefresh,
    onClose,
    variant = 'compact',
    downloadDisabled = false,
    ...props 
  }, ref) => {
    
    // Get status-specific configurations
    const getStatusConfig = () => {
      switch (status) {
        case 'uploading':
          return {
            badge: { variant: 'neutral' as const, text: 'Uploading', icon: undefined },
            showProgress: true,
            progressVariant: 'primary' as const
          };
        case 'validating':
          return {
            badge: { variant: 'neutral' as const, text: 'Validating', icon: 'loading' as const },
            showProgress: false,
            progressVariant: 'primary' as const
          };
        case 'processed':
          return {
            badge: { variant: 'success' as const, text: 'Fully processed', icon: undefined },
            showProgress: false,
            progressVariant: 'success' as const
          };
        case 'partially-processed':
          return {
            badge: { variant: 'warning' as const, text: 'Partially processed', icon: undefined },
            showProgress: false,
            progressVariant: 'warning' as const
          };
        case 'failed':
          return {
            badge: { variant: 'danger' as const, text: 'All rows failed', icon: undefined },
            showProgress: false,
            progressVariant: 'danger' as const
          };
        case 'template-mismatch':
          return {
            badge: { variant: 'danger' as const, text: 'Template Mismatch', icon: undefined },
            showProgress: false,
            progressVariant: 'danger' as const
          };
        case 'upload-failed':
          return {
            badge: { variant: 'danger' as const, text: 'Upload failed', icon: undefined },
            showProgress: true,
            progressVariant: 'danger' as const
          };
        case 'unsupported':
          return {
            badge: { variant: 'danger' as const, text: 'Unsupported file format', icon: undefined },
            showProgress: false,
            progressVariant: 'danger' as const
          };
        case 'empty':
          return {
            badge: { variant: 'danger' as const, text: 'Empty file', icon: undefined },
            showProgress: false,
            progressVariant: 'danger' as const
          };
        case 'too-large':
          return {
            badge: { variant: 'danger' as const, text: 'File size too large', icon: undefined },
            showProgress: true,
            progressVariant: 'danger' as const
          };
        default:
          return {
            badge: { variant: 'neutral' as const, text: 'Processing', icon: undefined },
            showProgress: false,
            progressVariant: 'primary' as const
          };
      }
    };
    
    const statusConfig = getStatusConfig();
    const isError = ['failed', 'template-mismatch', 'upload-failed', 'unsupported', 'empty', 'too-large'].includes(status);
    const showStats = variant === 'with-stats' && stats;
    
    return (
      <div
        className={cn(
          // Base styles from Figma
          "bg-white border border-[#F0F1F7] rounded-[8px] p-[20px]",
          "flex flex-col gap-[20px]",
          // Full width for expanded variants
          variant === 'expanded' || variant === 'with-stats' ? "w-full max-w-[930px]" : "w-full",
          className
        )}
        ref={ref}
        {...props}
      >
        {/* Main File Info Row */}
        <div className="flex items-center justify-between gap-[12px]">
          {/* File Info Section */}
          <div className="flex items-center gap-[20px]">
            {/* File Type Icon */}
            <FileTypeIcon 
              fileType={fileType} 
              variant={isError && (status === 'unsupported') ? 'error' : 'default'}
              size="md" 
            />
            
            {/* File Details */}
            <div className="flex flex-col gap-[8px]">
              {/* File name and badge should be horizontally aligned */}
              <div className="flex items-center gap-[20px]">
                <h3 className="text-[16px] font-[600] leading-[1.4] text-[var(--primary)]">
                  {fileName}
                </h3>
                <Badge 
                  variant={statusConfig.badge.variant}
                  icon={statusConfig.badge.icon}
                  size="md"
                >
                  {statusConfig.badge.text}
                </Badge>
              </div>
              
              {/* File Date (for processed files) */}
              {fileDate && (
                <p className="text-[14px] font-[400] leading-[1.4] text-[var(--secondary)]">
                  {fileDate}
                </p>
              )}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-[12px]">
            {onDownload && (
              <Button
                variant="secondary"
                size="md"
                icon="download"
                iconPosition="only"
                className="rounded-full"
                onClick={onDownload}
                disabled={downloadDisabled}
              />
            )}
            
            {onPreview && (
              <Button
                variant="secondary"
                size="md"
                icon="preview"
                iconPosition="only"
                className="rounded-full"
                onClick={onPreview}
              />
            )}
            
            {onRefresh && (
              <Button
                variant="secondary"
                size="md"
                icon="refresh"
                iconPosition="only"
                className="rounded-full"
                onClick={onRefresh}
              />
            )}
            
            {onDelete && (
              <Button
                variant="secondary"
                size="md"
                icon="delete"
                iconPosition="only"
                className="rounded-full"
                onClick={onDelete}
              />
            )}
            
            {onClose && (
              <Button
                variant="secondary"
                size="md"
                icon="cross-icon"
                iconPosition="only"
                className="rounded-full"
                onClick={onClose}
              />
            )}
          </div>
        </div>
        
        {/* Progress Bar (for uploading files) */}
        {(statusConfig.showProgress || variant === 'with-progress') && (
          <ProgressBar
            value={progress}
            variant={statusConfig.progressVariant}
            showPercentage={true}
            animated={status === 'uploading'}
          />
        )}
        
        {/* Error Message */}
        {errorMessage && (
          <div className="flex items-center justify-center px-[54px]">
            <p className="text-[14px] font-[400] leading-[1.4] text-[#FF3533]">
              {errorMessage}
            </p>
          </div>
        )}
        
        {/* Statistics Section */}
        {showStats && (
          <div className="flex items-stretch gap-[20px] pl-[64px]">
            {/* Total */}
            <div className="flex-1 bg-[var(--bg-secondary)] rounded-[8px] p-[12px_20px] flex flex-col gap-[4px] min-h-[74px]">
              <span className="text-[14px] font-[500] leading-[1.4] text-[var(--secondary)]">Total</span>
              <span className="text-[20px] font-[400] leading-[1.4] text-[var(--primary)]">{stats?.total || 0}</span>
            </div>
            
            {/* Success */}
            <div className="flex-1 bg-[var(--bg-secondary)] rounded-[8px] p-[12px_20px] flex flex-col gap-[4px] min-h-[74px]">
              <span className="text-[14px] font-[500] leading-[1.4] text-[var(--secondary)]">Success</span>
              <span className="text-[20px] font-[400] leading-[1.4] text-[#00C638]">{stats?.success || 0}</span>
            </div>
            
            {/* Invalid */}
            <div className="flex-1 bg-[var(--bg-secondary)] rounded-[8px] p-[12px_20px] flex flex-col gap-[4px] min-h-[74px]">
              <span className="text-[14px] font-[500] leading-[1.4] text-[var(--secondary)]">Invalid</span>
              <span className="text-[20px] font-[400] leading-[1.4] text-[#FF3533]">{stats?.invalid || 0}</span>
            </div>
          </div>
        )}
      </div>
    );
  }
);

FileCard.displayName = 'FileCard'; 