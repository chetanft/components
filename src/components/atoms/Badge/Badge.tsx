"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon, IconName } from '../Icons';
import { Typography } from '../Typography';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'normal' | 'danger' | 'success' | 'warning' | 'neutral';
  leadingIcon?: IconName;
  trailingIcon?: IconName;
  interaction?: boolean;
  children: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'normal', leadingIcon, trailingIcon, interaction = false, children, ...props }, ref) => {
    // Base styles using design tokens
    const baseStyles = "inline-flex items-center justify-center transition-colors";
    
    // Fixed size from Figma - using design tokens
    const sizeStyles = "px-[var(--x2)] py-[2px] gap-[var(--x2)] rounded-[var(--badge-border-radius)]";
    
    // Variant background and text colors (non-interactive) - using CSS variables
    const variantStyles = {
      normal: "bg-[var(--badge-normal-bg)] text-[var(--badge-normal-text)]",
      danger: "bg-[var(--badge-danger-bg)] text-[var(--badge-danger-text)]",  
      success: "bg-[var(--badge-success-bg)] text-[var(--badge-success-text)]",
      warning: "bg-[var(--badge-warning-bg)] text-[var(--badge-warning-text)]",
      neutral: "bg-[var(--badge-neutral-bg)] text-[var(--badge-neutral-text)]"
    };

    // Border styles for interactive badges - using CSS variables
    const interactiveBorderStyles = {
      normal: "border border-[var(--badge-normal-border)]",
      danger: "border border-[var(--badge-danger-border)]",
      success: "border border-[var(--badge-success-border)]",
      warning: "border border-[var(--badge-warning-border)]",
      neutral: "border border-[var(--badge-neutral-border)]"
    };

    // Interactive hover states - using CSS variables
    const hoverStyles = {
      normal: "hover:bg-[var(--badge-normal-hover-bg)] hover:border-[var(--badge-normal-hover-border)]",
      danger: "hover:bg-[var(--badge-danger-hover-bg)] hover:border-[var(--badge-danger-hover-border)] hover:text-[var(--badge-danger-hover-text)]",
      success: "hover:bg-[var(--badge-success-hover-bg)] hover:border-[var(--badge-success-hover-border)]", 
      warning: "hover:bg-[var(--badge-warning-hover-bg)] hover:border-[var(--badge-warning-hover-border)]",
      neutral: "hover:bg-[var(--badge-neutral-hover-bg)] hover:border-[var(--badge-neutral-hover-border)]"
    };

    const iconSize = 14; // Exact Figma icon size: 14x14px

    // Get text color for Typography component - using CSS variables
    const getTextColor = () => {
      switch (variant) {
        case 'danger': return 'var(--badge-danger-text)';
        case 'success': return 'var(--badge-success-text)';
        case 'warning': return 'var(--badge-warning-text)';
        case 'neutral': return 'var(--badge-neutral-text)';
        default: return 'var(--badge-normal-text)';
      }
    };

    // Determine if badge is interactive (has interaction prop or event handlers)
    const isInteractive = interaction || props.onClick || props.onMouseEnter || props.onFocus;

    return (
      <div
        className={cn(
          baseStyles,
          sizeStyles,
          variantStyles[variant],
          // Apply border styles if interactive
          isInteractive && interactiveBorderStyles[variant],
          // Apply hover styles if interactive
          isInteractive && hoverStyles[variant],
          className
        )}
        ref={ref}
        {...props}
      >
        {leadingIcon && <Icon name={leadingIcon} size={iconSize} />}
        <Typography 
          variant="body-secondary-semibold" 
          as="span"
          style={{ color: getTextColor() }}
        >
          {children}
        </Typography>
        {trailingIcon && <Icon name={trailingIcon} size={iconSize} />}
      </div>
    );
  }
);

Badge.displayName = 'Badge'; 