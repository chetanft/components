"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface FileTypeIconProps extends ComposableProps<'div'> {
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
  ({ className, fileType, variant = 'default', size = 'md', src, asChild, ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false);
    
    // Size configurations - matching Figma design structure
    // Figma sizes: xxs (0.8125rem x 1rem), xs (x5 x x6), sm (1.625rem x x8), md (2.0625rem x x10), lg (2.4375rem x x12), xl (2.875rem x x14), xxl (x13 x x16)
    const sizeStyles = {
      xxs: "w-[0.8125rem] h-[1rem] text-xs-rem",
      xs: "w-[var(--spacing-x5)] h-[var(--spacing-x6)] text-xs-rem",
      sm: "w-[1.625rem] h-[var(--spacing-x8)] text-sm-rem",
      md: "w-[2.0625rem] h-[var(--spacing-x10)] text-sm-rem",
      lg: "w-[2.4375rem] h-[var(--spacing-x12)] text-md-rem",
      xl: "w-[2.875rem] h-[var(--spacing-x14)] text-md-rem",
      xxl: "w-[var(--spacing-x13)] h-[var(--spacing-x16)] text-lg-rem"
    };
    
    // Triangle sizes based on container size - proportional to icon size
    const cornerFold = {
      xxs: '0.375rem',
      xs: 'var(--spacing-x2)',
      sm: '0.625rem',
      md: '0.8125rem',
      lg: 'var(--spacing-x4)',
      xl: '1.125rem',
      xxl: 'var(--spacing-x5)'
    };
    
    // Text sizes based on container size
    const textSizes = {
      xxs: 'text-xs-rem',
      xs: 'text-xs-rem',
      sm: 'text-sm-rem',
      md: 'text-sm-rem',
      lg: 'text-md-rem',
      xl: 'text-md-rem',
      xxl: 'text-lg-rem'
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
      // Folded corner is always border-primary per design
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
        xxs: 'bottom-[0.125rem]',
        xs: 'bottom-[0.1875rem]',
        sm: 'bottom-[var(--spacing-x1)]',
        md: 'bottom-[0.375rem]',
        lg: 'bottom-[0.4375rem]',
        xl: 'bottom-[var(--spacing-x2)]',
        xxl: 'bottom-[0.625rem]'
      };
      
      const Comp = asChild ? Slot : 'div';
      
      return (
        <Comp 
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
              width: cornerFold[size],
              height: cornerFold[size],
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
        </Comp>
      );
    }
    
    // Image-based design matching Figma structure
    const ImageComp = asChild ? Slot : 'div';
    return (
      <ImageComp 
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
      </ImageComp>
    );
  }
);

FileTypeIcon.displayName = 'FileTypeIcon'; 
