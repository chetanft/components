"use client";

import React from 'react';
import { cn } from '../../../lib/utils';

export interface FileTypeIconProps extends React.HTMLAttributes<HTMLDivElement> {
  fileType: string; // e.g., 'XLS', 'CSV', 'PDF', 'DOC'
  variant?: 'default' | 'error';
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  src?: string; // Optional image source URL
}

// File type to Figma asset URL mapping
// Note: These are temporary URLs (7 days). For production, replace with local assets or permanent URLs
const getFileTypeImageUrl = (fileType: string, variant?: 'default' | 'error'): string | undefined => {
  // Error variant uses specific error icon
  if (variant === 'error') {
    return 'https://www.figma.com/api/mcp/asset/bac18ef2-df6e-4716-b064-07c60b87356b';
  }
  
  const normalizedType = fileType.toUpperCase();
  
  switch (normalizedType) {
    case 'XLS':
    case 'XLSX':
      return 'https://www.figma.com/api/mcp/asset/b0a9c48e-812a-4bad-99b3-b62b9b342f62';
    case 'PDF':
      return 'https://www.figma.com/api/mcp/asset/f2bd230c-f63a-49a6-8e70-ea5e0a4ba935';
    case 'DOC':
    case 'DOCX':
      return 'https://www.figma.com/api/mcp/asset/c58f8436-7679-40da-a580-4dfa465b290e';
    case 'PNG':
      return 'https://www.figma.com/api/mcp/asset/9ee3aa6f-7ebf-4449-b753-315f1a9e1b76';
    case 'JPEG':
    case 'JPG':
      return 'https://www.figma.com/api/mcp/asset/5171ce8d-3333-43cc-9abf-e798cc619840';
    default:
      return undefined;
  }
};

export const FileTypeIcon = React.forwardRef<HTMLDivElement, FileTypeIconProps>(
  ({ className, fileType, variant = 'default', size = 'md', src, ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false);
    
    // Size configurations - matching Figma design structure
    // Figma sizes: xxs (13×16), xs (20×24), sm (26×32), md (33×40), lg (39×48), xl (46×56), xxl (52×64)
    const sizeStyles = {
      xxs: "w-[13px] h-[16px]",
      xs: "w-[20px] h-[24px]",
      sm: "w-[26px] h-[32px]",
      md: "w-[33px] h-[40px]",
      lg: "w-[39px] h-[48px]",
      xl: "w-[46px] h-[56px]",
      xxl: "w-[52px] h-[64px]"
    };
    
    // Triangle sizes based on container size - proportional to icon size
    const triangleSizes = {
      xxs: '6px',
      xs: '8px',
      sm: '10px',
      md: '13px',
      lg: '16px',
      xl: '18px',
      xxl: '20px'
    };
    
    // Text sizes based on container size
    const textSizes = {
      xxs: 'text-[8px]',
      xs: 'text-[10px]',
      sm: 'text-[12px]',
      md: 'text-[14px]',
      lg: 'text-[16px]',
      xl: 'text-[18px]',
      xxl: 'text-[20px]'
    };
    
    // Get image source - prefer provided src, then file type mapping
    const imageSrc = src || getFileTypeImageUrl(fileType, variant);
    
    // Reset error state when image source changes
    React.useEffect(() => {
      setImageError(false);
    }, [imageSrc]);
    
    // If no image source available or image failed to load, fallback to CSS-based design with folded corner triangle
    if (!imageSrc || imageError) {
      // File type colors matching design - using gradients like the SVG
      // Folded corner is always #CED1D7 (border-primary) per design
      const getFileTypeStyles = (type: string) => {
        const normalizedType = type.toUpperCase();
        
        switch (normalizedType) {
          case 'XLS':
          case 'XLSX':
            return {
              gradient: "linear-gradient(180deg, var(--color-bg-secondary) 0%, var(--color-positive) 100%)",
              foldedCorner: "var(--color-border-primary)"
            };
          case 'CSV':
            return {
              gradient: "linear-gradient(180deg, var(--color-bg-secondary) 0%, var(--color-neutral) 100%)",
              foldedCorner: "var(--color-neutral-dark)"
            };
          case 'PDF':
            return {
              gradient: "linear-gradient(180deg, var(--color-bg-secondary) 0%, var(--color-critical) 100%)",
              foldedCorner: "var(--color-border-primary)"
            };
          case 'DOC':
          case 'DOCX':
            return {
              gradient: "linear-gradient(180deg, var(--color-bg-secondary) 0%, var(--color-neutral) 100%)",
              foldedCorner: "var(--color-border-primary)"
            };
          case 'PNG':
            return {
              gradient: "linear-gradient(180deg, var(--color-bg-secondary) 0%, var(--color-neutral) 100%)",
              foldedCorner: "var(--color-border-primary)"
            };
          case 'JPEG':
          case 'JPG':
            return {
              gradient: "linear-gradient(180deg, var(--color-bg-secondary) 0%, var(--color-neutral) 100%)",
              foldedCorner: "var(--color-border-primary)"
            };
          default:
            return {
              gradient: "linear-gradient(180deg, var(--color-bg-secondary) 0%, var(--color-tertiary) 100%)",
              foldedCorner: "var(--color-border-primary)"
            };
        }
      };
      
      const getErrorStyles = () => ({
        gradient: "linear-gradient(180deg, var(--color-bg-secondary) 0%, var(--color-critical-light) 100%)",
        foldedCorner: "var(--color-border-primary)"
      });
      
      const styles = variant === 'error' ? getErrorStyles() : getFileTypeStyles(fileType);
      const displayText = variant === 'error' ? '!' : fileType.toUpperCase().slice(0, 3);
      
      // Bottom padding scales with size
      const bottomPadding = {
        xxs: 'bottom-[2px]',
        xs: 'bottom-[3px]',
        sm: 'bottom-[4px]',
        md: 'bottom-[6px]',
        lg: 'bottom-[7px]',
        xl: 'bottom-[8px]',
        xxl: 'bottom-[10px]'
      };
      
      return (
        <div 
          className={cn(
            "relative rounded-none",
            sizeStyles[size],
            className
          )}
          style={{ 
            background: styles.gradient
          }}
          ref={ref}
          {...props}
        >
          {/* Folded corner triangle - matching SVG path structure */}
          <div 
            className="absolute top-0 right-0"
            style={{
              width: triangleSizes[size],
              height: triangleSizes[size],
              backgroundColor: styles.foldedCorner,
              clipPath: 'polygon(100% 0, 100% 100%, 0 0)'
            }}
          />
          
          {/* File type text - positioned at bottom center */}
          <div className={cn("absolute left-1/2 transform -translate-x-1/2", bottomPadding[size])}>
            <span className={cn(
              "text-[var(--color-bg-primary)] font-semibold",
              textSizes[size],
              variant === 'error' && "text-[var(--color-critical)]"
            )}>
              {displayText}
            </span>
          </div>
        </div>
      );
    }
    
    // Image-based design matching Figma structure
    return (
      <div 
        className={cn(
          "relative overflow-hidden flex items-center justify-center",
          sizeStyles[size],
          className
        )}
        data-name={fileType.toLowerCase()}
        ref={ref}
        {...props}
      >
        <img 
          alt={`${fileType} file icon`}
          className="w-full h-full object-contain"
          src={imageSrc}
          onError={() => setImageError(true)}
          style={{ 
            display: imageError ? 'none' : 'block',
            maxWidth: '100%',
            maxHeight: '100%'
          }}
        />
      </div>
    );
  }
);

FileTypeIcon.displayName = 'FileTypeIcon'; 
