"use client";

import React from 'react';
import { cn } from '../../../lib/utils';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number; // Progress value 0-100
  variant?: 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
  animated?: boolean;
}

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ 
    className, 
    value = 0, 
    variant = 'primary', 
    size = 'md', 
    showPercentage = true,
    animated = false,
    ...props 
  }, ref) => {
    
    // Clamp value between 0 and 100, handle NaN and null/undefined
    const numericValue = typeof value === 'number' && !isNaN(value) ? value : 0;
    const clampedValue = Math.min(Math.max(numericValue, 0), 100);
    
    // Container styles based on Figma design
    const containerStyles = "relative w-full bg-[var(--border-primary)] rounded-[8px] overflow-hidden";
    
    // Size styles - exact from Figma
    const sizeStyles = {
      sm: "h-[4px]",
      md: "h-[8px]", // Exact height from Figma design
      lg: "h-[12px]"
    };
    
    // Progress bar fill colors based on variant - use CSS variables
    const variantStyles = {
      primary: "bg-[var(--primary)]", // Primary color from CSS variable
      success: "bg-[var(--positive)]", // Success green from CSS variable
      warning: "bg-[var(--warning)]", // Warning orange from CSS variable
      danger: "bg-[var(--critical)]"   // Danger red from CSS variable
    };
    
    // Animation class for smooth transitions
    const animationClass = animated ? "transition-all duration-300 ease-out" : "";

    return (
      <div className="flex items-center gap-[20px] w-full" ref={ref} {...props}>
        {/* Progress Container */}
        <div className={cn(containerStyles, sizeStyles[size], className)}>
          {/* Progress Fill */}
          <div
            className={cn(
              "h-full rounded-[24px]", // 24px border radius from Figma
              variantStyles[variant],
              animationClass
            )}
            style={{ width: `${clampedValue}%` }}
            role="progressbar"
            aria-valuenow={clampedValue}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        
        {/* Percentage Display */}
        {showPercentage && (
          <span className="text-[14px] font-[500] leading-[1.4] text-[var(--tertiary)] whitespace-nowrap">
            {Math.round(clampedValue)}%
          </span>
        )}
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar'; 