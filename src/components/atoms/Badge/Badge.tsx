"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon, IconName } from '../Icons';
import { Typography } from '../Typography';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'normal' | 'danger' | 'success' | 'warning' | 'neutral';
  icon?: IconName;
  children: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'normal', icon, children, ...props }, ref) => {
    // Base styles using exact Figma specifications
    const baseStyles = "inline-flex items-center justify-center border border-transparent transition-colors";
    
    // Fixed size from Figma - only one size exists in Figma design
    const sizeStyles = "px-[8px] py-[2px] gap-[8px] rounded-[4px]"; // Exact Figma specs: 2px 8px padding, 4px border radius, 8px gap
    
    // Variant styles using exact Figma colors (not CSS variables)
    const variantStyles = {
      normal: "bg-[#F0F1F7] text-[#434F64]",
      danger: "bg-[#FFEAEA] text-[#FF3533]",  
      success: "bg-[#DFFFE8] text-[#00763D]",
      warning: "bg-[#FFEBDC] text-[#FF6C19]",
      neutral: "bg-[#ECF6FF] text-[#1890FF]"
    };

    // Interactive hover states (these exist in Figma for interactive badges)
    const hoverStyles = {
      normal: "hover:bg-[#CED1D7] hover:border-[#838C9D]",
      danger: "hover:bg-[#FFAFAD] hover:text-[#B80100] hover:border-[#B80100]",
      success: "hover:bg-[#99E8AF] hover:border-[#00763D]", 
      warning: "hover:bg-[#FFC4A3] hover:border-[#FF6C19]",
      neutral: "hover:bg-[#ECF6FF]"
    };

    const iconSize = 14; // Exact Figma icon size: 14x14px

    // Get text color for Typography component
    const getTextColor = () => {
      switch (variant) {
        case 'danger': return '#FF3533';
        case 'success': return '#00763D';
        case 'warning': return '#FF6C19';
        case 'neutral': return '#1890FF';
        default: return '#434F64';
      }
    };

    return (
      <div
        className={cn(
          baseStyles,
          sizeStyles,
          variantStyles[variant],
          // Apply hover styles if badge has interactive props
          (props.onClick || props.onMouseEnter || props.onFocus) && hoverStyles[variant],
          className
        )}
        ref={ref}
        {...props}
      >
        {icon && <Icon name={icon} size={iconSize} />}
        <Typography 
          variant="body-secondary-semibold" 
          as="span"
          style={{ color: getTextColor() }}
        >
          {children}
        </Typography>
      </div>
    );
  }
);

Badge.displayName = 'Badge'; 