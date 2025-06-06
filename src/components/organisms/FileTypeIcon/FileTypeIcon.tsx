"use client";

import React from 'react';
import { cn } from '../../../lib/utils';

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
    
    // Get file type specific colors
    const getFileTypeColors = (type: string) => {
      const normalizedType = type.toUpperCase();
      
      switch (normalizedType) {
        case 'XLS':
        case 'XLSX':
          return {
            background: "linear-gradient(180deg, #F8F8F9 0%, #838C9D 100%)",
            badge: "#CED1D7"
          };
        case 'CSV':
          return {
            background: "linear-gradient(180deg, #F8F8F9 0%, #00C638 100%)",
            badge: "#00C638"
          };
        case 'PDF':
          return {
            background: "linear-gradient(180deg, #F8F8F9 0%, #FF3533 100%)",
            badge: "#FF3533"
          };
        case 'DOC':
        case 'DOCX':
          return {
            background: "linear-gradient(180deg, #F8F8F9 0%, #1890FF 100%)",
            badge: "#1890FF"
          };
        default:
          return {
            background: "linear-gradient(180deg, #F8F8F9 0%, #838C9D 100%)",
            badge: "#CED1D7"
          };
      }
    };
    
    // Error variant uses red gradient and exclamation
    const getErrorColors = () => ({
      background: "linear-gradient(180deg, #F8F8F9 0%, #FFEAEA 100%)",
      badge: "#FFEAEA"
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
        <div className={cn(
          "absolute bottom-[6px] left-1/2 transform -translate-x-1/2",
          "font-[600] leading-[1.4] text-white",
          sizeStyles[size].text,
          variant === 'error' && "text-[#FF3533]"
        )}>
          {displayText}
        </div>
      </div>
    );
  }
);

FileTypeIcon.displayName = 'FileTypeIcon'; 