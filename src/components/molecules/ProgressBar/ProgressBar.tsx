"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Typography } from '../../atoms/Typography';

export type ProgressType = 'line' | 'circle' | 'dashboard';
export type ProgressStatus = 'primary' | 'success' | 'warning' | 'danger' | 'active';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Progress value 0-100 */
  value?: number;
  /** 🆕 NEW: Progress type - line, circle, or dashboard */
  type?: ProgressType;
  /** Color variant */
  variant?: ProgressStatus;
  /** Size for line type */
  size?: 'sm' | 'md' | 'lg';
  /** 🆕 NEW: Width/diameter for circle/dashboard (default: 120) */
  width?: number;
  /** 🆕 NEW: Stroke width for circle/dashboard */
  strokeWidth?: number;
  /** 🆕 NEW: Trail (background) color */
  trailColor?: string;
  /** 🆕 NEW: Stroke color (overrides variant) */
  strokeColor?: string;
  /** Show percentage text */
  showPercentage?: boolean;
  /** 🆕 NEW: Custom format function for percentage */
  format?: (percent: number) => React.ReactNode;
  /** Enable animation */
  animated?: boolean;
  /** 🆕 NEW: Gap degree for dashboard type (0-295) */
  gapDegree?: number;
  /** 🆕 NEW: Gap position for dashboard */
  gapPosition?: 'top' | 'bottom' | 'left' | 'right';
  /** 🆕 NEW: Number of steps */
  steps?: number;
}

/**
 * ProgressBar component - Progress indicator with line, circle, and dashboard types.
 * Built with FT Design System tokens.
 * 
 * Uses:
 * - Colors: var(--primary), var(--positive), var(--warning), var(--critical)
 * - Background: var(--border-primary)
 * - Typography: body-secondary variants
 */
export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ 
    className, 
    value = 0, 
    type = 'line',
    variant = 'primary', 
    size = 'md', 
    width = 120,
    strokeWidth,
    trailColor,
    strokeColor,
    showPercentage = true,
    format,
    animated = false,
    gapDegree = 75,
    gapPosition = 'bottom',
    steps,
    ...props 
  }, ref) => {
    
    // Clamp value between 0 and 100
    const numericValue = typeof value === 'number' && !isNaN(value) ? value : 0;
    const clampedValue = Math.min(Math.max(numericValue, 0), 100);
    
    // Variant color mapping using CSS variables
    const variantColors: Record<ProgressStatus, string> = {
      primary: 'var(--primary)',
      success: 'var(--positive)',
      warning: 'var(--warning)',
      danger: 'var(--critical)',
      active: 'var(--neutral)',
    };

    const activeColor = strokeColor || variantColors[variant];
    const bgColor = trailColor || 'var(--border-primary)';

    // Format percentage
    const formatPercent = () => {
      if (format) return format(clampedValue);
      return `${Math.round(clampedValue)}%`;
    };

    // ==================== LINE TYPE ====================
    if (type === 'line') {
      const sizeStyles = {
        sm: "h-[4px]",
        md: "h-[8px]",
        lg: "h-[12px]"
      };

      // Steps mode
      if (steps && steps > 0) {
        const stepWidth = 100 / steps;
        const filledSteps = Math.floor((clampedValue / 100) * steps);
        
        return (
          <div className="flex items-center gap-[var(--x5,20px)] w-full" ref={ref} {...props}>
            <div className={cn("flex gap-1 w-full", className)}>
              {Array.from({ length: steps }, (_, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex-1 rounded-[4px]",
                    sizeStyles[size],
                    animated && "transition-colors duration-300"
                  )}
                  style={{
                    backgroundColor: i < filledSteps ? activeColor : bgColor,
                  }}
                />
              ))}
            </div>
            {showPercentage && (
              <Typography 
                variant="body-secondary-medium" 
                as="span"
                className="text-[var(--tertiary)] whitespace-nowrap"
              >
                {formatPercent()}
              </Typography>
            )}
          </div>
        );
      }

      // Default line progress - Figma: 8px height, 8px rounded corners
      return (
        <div className="flex items-center gap-[var(--x5,20px)] w-full" ref={ref} {...props}>
          <div 
            className={cn(
              "relative w-full rounded-[8px] overflow-hidden",
              sizeStyles[size],
              className
            )}
            style={{ backgroundColor: bgColor }}
          >
            <div
              className={cn(
                "h-full rounded-[8px]",
                animated && "transition-all duration-300 ease-out",
                variant === 'active' && "animate-pulse"
              )}
              style={{ 
                width: `${clampedValue}%`,
                backgroundColor: activeColor,
              }}
              role="progressbar"
              aria-valuenow={clampedValue}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          {showPercentage && (
            <Typography 
              variant="body-secondary-medium" 
              as="span"
              className="text-[var(--tertiary)] whitespace-nowrap"
            >
              {formatPercent()}
            </Typography>
          )}
        </div>
      );
    }

    // ==================== CIRCLE & DASHBOARD TYPES ====================
    const circleStrokeWidth = strokeWidth || (type === 'dashboard' ? 8 : 6);
    const radius = (width - circleStrokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    
    // Calculate stroke dash for progress
    let dashOffset: number;
    let dashArray: string;
    let rotation: number;

    if (type === 'dashboard') {
      // Dashboard has a gap at the bottom
      const validGapDegree = Math.min(Math.max(gapDegree, 0), 295);
      const gapRatio = validGapDegree / 360;
      const availableCircumference = circumference * (1 - gapRatio);
      const progressLength = (clampedValue / 100) * availableCircumference;
      
      dashArray = `${availableCircumference} ${circumference}`;
      dashOffset = availableCircumference - progressLength;
      
      // Rotation based on gap position
      const rotationMap = {
        bottom: 90 + (validGapDegree / 2),
        top: -90 - (validGapDegree / 2),
        left: 180 + (validGapDegree / 2),
        right: validGapDegree / 2,
      };
      rotation = rotationMap[gapPosition];
    } else {
      // Full circle
      const progressLength = (clampedValue / 100) * circumference;
      dashArray = `${circumference} ${circumference}`;
      dashOffset = circumference - progressLength;
      rotation = -90; // Start from top
    }

    return (
      <div 
        ref={ref}
        className={cn("relative inline-flex items-center justify-center", className)}
        style={{ width, height: width }}
        {...props}
      >
        <svg
          width={width}
          height={width}
          viewBox={`0 0 ${width} ${width}`}
          className="transform"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {/* Background track */}
          <circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            fill="none"
            stroke={bgColor}
            strokeWidth={circleStrokeWidth}
            strokeLinecap="round"
            strokeDasharray={type === 'dashboard' ? dashArray : undefined}
          />
          {/* Progress arc */}
          <circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            fill="none"
            stroke={activeColor}
            strokeWidth={circleStrokeWidth}
            strokeLinecap="round"
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            className={cn(animated && "transition-all duration-500 ease-out")}
          />
        </svg>
        
        {/* Center content */}
        {showPercentage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Typography 
              variant={width >= 100 ? "body-primary-semibold" : "body-secondary-medium"}
              as="span"
              className="text-[var(--primary)]"
            >
              {formatPercent()}
            </Typography>
          </div>
        )}
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';

// Alias for backward compatibility and semantic naming
export const Progress = ProgressBar;
