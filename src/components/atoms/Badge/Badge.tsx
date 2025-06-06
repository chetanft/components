"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon, IconName } from '../Icons';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'normal' | 'danger' | 'success' | 'warning' | 'neutral';
  size?: 'sm' | 'md';
  icon?: IconName;
  children: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'normal', size = 'md', icon, children, ...props }, ref) => {
    // Base styles using exact Figma specifications
    const baseStyles = "inline-flex items-center justify-center font-[var(--badge-font-weight)] text-[var(--badge-font-size)] leading-[1.4] border border-transparent transition-colors";
    
    // Size styles - using exact Figma specifications
    const sizeStyles = {
      sm: "px-[6px] py-[1px] gap-[6px] rounded-[3px] text-[12px]", // Smaller variant
      md: "px-[8px] py-[2px] gap-[8px] rounded-[var(--badge-border-radius)] text-[var(--badge-font-size)]" // Exact Figma specs
    };
    
    // Variant styles using exact Figma colors
    const variantStyles = {
      normal: "bg-[var(--badge-normal-bg)] text-[var(--badge-normal-text)] hover:bg-[var(--badge-normal-hover-bg)]",
      danger: "bg-[var(--badge-danger-bg)] text-[var(--badge-danger-text)] hover:bg-[var(--badge-danger-hover-bg)] hover:text-[var(--badge-danger-hover-text)]",
      success: "bg-[var(--badge-success-bg)] text-[var(--badge-success-text)] hover:bg-[var(--badge-success-hover-bg)]",
      warning: "bg-[var(--badge-warning-bg)] text-[var(--badge-warning-text)] hover:bg-[var(--badge-warning-hover-bg)]",
      neutral: "bg-[var(--badge-neutral-bg)] text-[var(--badge-neutral-text)]"
    };

    // Interactive variant styles with borders (for interactive badges)
    const interactiveStyles = {
      normal: "border-[var(--badge-normal-border)] hover:border-[var(--badge-normal-hover-border)]",
      danger: "border-[var(--badge-danger-border)] hover:border-[var(--badge-danger-hover-border)]",
      success: "border-[var(--badge-success-border)]",
      warning: "border-[var(--badge-warning-border)]",
      neutral: "border-transparent"
    };

    const iconSize = size === 'sm' ? 12 : 14; // Exact Figma icon sizes

    return (
      <div
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          // Apply interactive styles if badge has onClick or other interactive props
          (props.onClick || props.onMouseEnter || props.onFocus) && interactiveStyles[variant],
          className
        )}
        ref={ref}
        {...props}
      >
        {icon && <Icon name={icon} size={iconSize} />}
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge'; 