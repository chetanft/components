"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { FileIcon } from '../../atoms/Icons/FileIcon';
import { LoadingSpinner } from '../../atoms/Icons/LoadingSpinner';
import { Icon } from '../../atoms/Icons';
import { Badge } from '../../atoms/Badge/Badge';
import { Typography } from '../../atoms/Typography';

export type ValidationStatus = 'validating' | 'success' | 'failed' | 'partial';

export interface ValidationStats {
  total: number;
  success: number;
  invalid: number;
}

export interface FileValidationCardProps extends React.HTMLAttributes<HTMLDivElement> {
  fileName: string;
  fileType?: 'excel' | 'csv' | 'generic';
  uploadedAt?: Date;
  validationStatus?: ValidationStatus;
  validationStats?: ValidationStats;
  onDelete?: () => void;
  onDownload?: () => void;
  onViewDetails?: () => void;
}

export const FileValidationCard = React.forwardRef<HTMLDivElement, FileValidationCardProps>(
  ({ 
    className,
    fileName,
    fileType = 'excel',
    uploadedAt,
    validationStatus = 'validating',
    validationStats,
    onDelete,
    onDownload,
    onViewDetails,
    ...props 
  }, ref) => {
    
    // Format date
    const formatDate = (date?: Date) => {
      if (!date) return '';
      // Validate date is valid
      const dateObj = date instanceof Date ? date : new Date(date);
      if (isNaN(dateObj.getTime())) return '';
      return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).format(dateObj);
    };
    
    // Get badge config based on validation status
    const getBadgeConfig = () => {
      switch (validationStatus) {
        case 'validating':
          return {
            variant: 'neutral' as const,
            text: 'Validating',
            showSpinner: true // Internal flag, not exposed as prop
          };
        case 'success':
          return {
            variant: 'success' as const,
            text: 'Success',
            showSpinner: false
          };
        case 'failed':
          return {
            variant: 'danger' as const,
            text: 'All rows failed',
            showSpinner: false
          };
        case 'partial':
          return {
            variant: 'warning' as const,
            text: 'Partially processed',
            showSpinner: false
          };
      }
    };
    
    const badgeConfig = getBadgeConfig();
    const showStats = validationStats && (validationStatus === 'success' || validationStatus === 'failed' || validationStatus === 'partial');
    const showActions = validationStatus !== 'validating' && (onDownload || onViewDetails || onDelete);
    
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-start justify-center w-full",
          className
        )}
        {...props}
      >
        <div className={cn(
          "w-full bg-[var(--bg-primary)] border border-[var(--border-secondary)]",
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
                <FileIcon type={fileType} size={40} />
              </div>
              
              {/* File details */}
              <div className="flex flex-col gap-[var(--spacing-x1)] flex-1 min-w-0">
                <div className="flex items-center gap-[var(--spacing-x3)]">
                  <Typography 
                    variant="body-primary-semibold"
                    className="text-[var(--primary)]"
                  >
                    {fileName}
                  </Typography>
                  
                  {/* Validation badge */}
                  <div className="flex items-center gap-[var(--spacing-x2)]">
                    {badgeConfig.showSpinner ? (
                      <div className="inline-flex items-center justify-center border border-transparent px-[var(--spacing-x2)] py-[var(--spacing-x1)] gap-[var(--spacing-x2)] rounded-[var(--radius-sm)] bg-[var(--color-neutral-light)]">
                        <LoadingSpinner size={14} color="var(--color-neutral)" />
                        <Typography 
                          variant="body-secondary-semibold" 
                          as="span"
                          className="text-[var(--color-neutral)]"
                        >
                          {badgeConfig.text}
                        </Typography>
                      </div>
                    ) : (
                      <Badge variant={badgeConfig.variant}>
                        {badgeConfig.text}
                      </Badge>
                    )}
                  </div>
                </div>
                
                {/* Subtitle - date */}
                {uploadedAt && (
                  <Typography 
                    variant="body-secondary-regular"
                    className="text-[var(--secondary)] truncate"
                  >
                    {formatDate(uploadedAt)}
                  </Typography>
                )}
              </div>
              
              {/* Right side - Actions or Delete */}
              {showActions ? (
                <div className="flex items-center justify-end gap-[var(--spacing-x2)] shrink-0">
                  {onDownload && (
                    <div 
                      onClick={onDownload}
                      className={cn(
                        "flex items-center justify-center",
                        "w-[var(--spacing-x8)] h-[var(--spacing-x8)] rounded-[var(--radius-md)]",
                        "cursor-pointer transition-colors",
                        "hover:bg-[var(--bg-secondary)]"
                      )}
                    >
                      <Icon name="download" size={16} className="text-[var(--primary)]" />
                    </div>
                  )}
                  
                  {onViewDetails && (
                    <div 
                      onClick={onViewDetails}
                      className={cn(
                        "flex items-center justify-center",
                        "w-[var(--spacing-x8)] h-[var(--spacing-x8)] rounded-[var(--radius-md)]",
                        "cursor-pointer transition-colors",
                        "hover:bg-[var(--bg-secondary)]"
                      )}
                    >
                      <Icon name="preview" size={16} className="text-[var(--primary)]" />
                    </div>
                  )}
                  
                  {onDelete && (
                    <div 
                      onClick={onDelete}
                      className={cn(
                        "flex items-center justify-center",
                        "w-[var(--spacing-x8)] h-[var(--spacing-x8)] rounded-[var(--radius-md)]",
                        "cursor-pointer transition-colors",
                        "hover:bg-[var(--critical-light)]"
                      )}
                    >
                      <Icon name="delete" size={16} className="text-[var(--critical)]" />
                    </div>
                  )}
                </div>
              ) : (
                onDelete && (
                  <div className="flex items-center justify-center shrink-0">
                    <div 
                      onClick={onDelete}
                      className="w-[var(--spacing-x4)] h-[var(--spacing-x4)] cursor-pointer overflow-hidden"
                    >
                      <Icon name="cross" size={16} className="text-[var(--secondary)]" />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          
          {/* Spacer */}
          <div className="h-[var(--spacing-x3)] w-full" />
          
          {/* Statistics section */}
          {showStats && (
            <>
              <div className="flex items-start gap-[var(--spacing-x3)] w-full px-[calc(var(--spacing-x6)+var(--spacing-x2))]">
                {/* Total */}
                <div className={cn(
                  "flex-1 bg-[var(--bg-secondary)] rounded-[var(--radius-sm)] p-[var(--spacing-x2)]",
                  "flex flex-col gap-[var(--spacing-x2)]"
                )}>
                  <Typography 
                    variant="body-secondary-medium"
                    className="text-[var(--secondary)]"
                  >
                    Total
                  </Typography>
                  <Typography 
                    variant="body-primary-regular"
                    className="text-[var(--primary)]"
                  >
                    {validationStats?.total || 0}
                  </Typography>
                </div>
                
                {/* Success */}
                <div className={cn(
                  "flex-1 bg-[var(--bg-secondary)] rounded-[var(--radius-sm)] p-[var(--spacing-x2)]",
                  "flex flex-col gap-[var(--spacing-x2)]"
                )}>
                  <Typography 
                    variant="body-secondary-medium"
                    className="text-[var(--secondary)]"
                  >
                    Success
                  </Typography>
                  <Typography 
                    variant="body-primary-regular"
                    className="text-[var(--primary)]"
                  >
                    {validationStats?.success || 0}
                  </Typography>
                </div>
                
                {/* Invalid */}
                <div className={cn(
                  "flex-1 bg-[var(--bg-secondary)] rounded-[var(--radius-sm)] p-[var(--spacing-x2)]",
                  "flex flex-col gap-[var(--spacing-x2)]"
                )}>
                  <Typography 
                    variant="body-secondary-medium"
                    className="text-[var(--secondary)]"
                  >
                    Invalid
                  </Typography>
                  <Typography 
                    variant="body-primary-regular"
                    className="text-[var(--primary)]"
                  >
                    {validationStats?.invalid || 0}
                  </Typography>
                </div>
              </div>
              
              <div className="h-[var(--spacing-x3)] w-full" />
            </>
          )}
        </div>
      </div>
    );
  }
);

FileValidationCard.displayName = 'FileValidationCard';
