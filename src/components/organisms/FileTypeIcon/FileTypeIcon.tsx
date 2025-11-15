"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Typography } from '../../atoms/Typography';

export interface FileTypeIconProps extends React.HTMLAttributes<HTMLDivElement> {
  fileType: string; // e.g., 'XLS', 'CSV', 'PDF', 'DOC'
  variant?: 'default' | 'error';
  size?: 'sm' | 'md' | 'lg';
}

export const FileTypeIcon = React.forwardRef<HTMLDivElement, FileTypeIconProps>(
  ({ className, fileType, variant = 'default', size = 'md', ...props }, ref) => {
    
    // Size configurations
    const sizeStyles = {
      sm: {
        container: "w-[36px] h-[44px]",
        badge: "w-[10px] h-[10px]",
        text: "text-[10px]"
      },
      md: {
        container: "w-[44px] h-[54px]", // Exact from Figma
        badge: "w-[13px] h-[13px]", // Exact from Figma
        text: "text-[14px]" // Exact from Figma
      },
      lg: {
        container: "w-[52px] h-[64px]",
        badge: "w-[16px] h-[16px]",
        text: "text-[16px]"
      }
    };
    
    // Get file type specific colors - use CSS variables instead of hardcoded
    const getFileTypeColors = (type: string) => {
      const normalizedType = type.toUpperCase();
      
      switch (normalizedType) {
        case 'XLS':
        case 'XLSX':
          return {
            background: "linear-gradient(180deg, var(--bg-secondary) 0%, var(--tertiary) 100%)",
            badge: "var(--border-primary)"
          };
        case 'CSV':
          return {
            background: "linear-gradient(180deg, var(--bg-secondary) 0%, var(--positive) 100%)",
            badge: "var(--positive)"
          };
        case 'PDF':
          return {
            background: "linear-gradient(180deg, var(--bg-secondary) 0%, var(--critical) 100%)",
            badge: "var(--critical)"
          };
        case 'DOC':
        case 'DOCX':
          return {
            background: "linear-gradient(180deg, var(--bg-secondary) 0%, var(--neutral) 100%)",
            badge: "var(--neutral)"
          };
        default:
          return {
            background: "linear-gradient(180deg, var(--bg-secondary) 0%, var(--tertiary) 100%)",
            badge: "var(--border-primary)"
          };
      }
    };
    
    // Error variant uses red gradient and exclamation
    const getErrorColors = () => ({
      background: "linear-gradient(180deg, var(--bg-secondary) 0%, var(--critical-light) 100%)",
      badge: "var(--critical-light)"
    });
    
    const colors = variant === 'error' ? getErrorColors() : getFileTypeColors(fileType);
    const displayText = variant === 'error' ? '!' : fileType.toUpperCase().slice(0, 3);
    
    return (
      <div 
        className={cn(
          "relative rounded-none", // No border radius as per Figma
          sizeStyles[size].container,
          className
        )}
        style={{ 
          background: colors.background
        }}
        ref={ref}
        {...props}
      >
        {/* File Type Badge */}
        <div 
          className={cn(
            "absolute top-0 right-0 rounded-none", // No border radius as per Figma
            sizeStyles[size].badge
          )}
          style={{ backgroundColor: colors.badge }}
        />
        
        {/* File Type Text */}
        <div className="absolute bottom-[6px] left-1/2 transform -translate-x-1/2">
          <Typography 
            variant="body-secondary-semibold"
            as="span"
            className={cn(
              "text-white",
              sizeStyles[size].text,
              variant === 'error' && "text-[#ff3532]"
            )}
          >
            {displayText}
          </Typography>
        </div>
      </div>
    );
  }
);

FileTypeIcon.displayName = 'FileTypeIcon'; 