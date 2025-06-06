"use client";
import React, { forwardRef, useState } from 'react';
import { cn } from '../../lib/utils';
import { Icon } from '../Icons';

export type ChickletVariant = 'rounded' | 'rectangular';
export type ChickletState = 'default' | 'hover';

export interface ChickletProps {
  /** The text content of the chicklet */
  label: string;
  /** Whether the chicklet has rounded corners (pill) or rectangular corners */
  variant?: ChickletVariant;
  /** Whether to show the close (cross) icon */
  showClose?: boolean;
  /** Callback when the close icon is clicked */
  onClose?: () => void;
  /** Callback when the chicklet is clicked */
  onClick?: () => void;
  /** Whether the chicklet is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const Chicklet = forwardRef<HTMLDivElement, ChickletProps>(
  ({ 
    label,
    variant = 'rectangular',
    showClose = true,
    onClose,
    onClick,
    disabled = false,
    className,
    ...props 
  }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    
    // Get current state
    const currentState: ChickletState = isHovered ? 'hover' : 'default';
    
    // Base styles using exact Figma specifications
    const baseStyles = cn(
      // Layout from Figma: row with center alignment and 8px gap
      "inline-flex items-center justify-center gap-[8px]",
      // Padding from Figma: 2px 8px
      "px-[8px] py-[2px]",
      // Font styles from Figma: Inter 500 14px with 1.4 line height
      "text-[14px] font-medium font-inter leading-[1.4]",
      // Text color from Figma: #434F64
      "text-[#434F64]",
      // Transitions
      "transition-all duration-200 cursor-pointer",
      // Disabled state
      disabled && "opacity-50 cursor-not-allowed pointer-events-none",
      
      // Border radius based on variant - exact from Figma
      variant === 'rectangular' && "rounded-[4px]", // 4px border radius
      variant === 'rounded' && "rounded-[100px]", // 100px border radius (pill)
      
      // Background colors based on state - exact from Figma
      currentState === 'default' && "bg-[#F0F1F7]", // Default background
      currentState === 'hover' && "bg-[#CED1D7]", // Hover background
      
      className
    );
    
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      onClick?.();
    };
    
    const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      e.stopPropagation(); // Prevent triggering parent onClick
      onClose?.();
    };
    
    return (
      <div
        ref={ref}
        className={baseStyles}
        onMouseEnter={() => !disabled && setIsHovered(true)}
        onMouseLeave={() => !disabled && setIsHovered(false)}
        onClick={handleClick}
        {...props}
      >
        {/* Label Text */}
        <span className="leading-[1.4]">
          {label}
        </span>
        
        {/* Close Icon - Using Cross icon from Figma */}
        {showClose && (
          <button
            type="button"
            className={cn(
              // Size from Figma: 14x14px
              "w-[14px] h-[14px] flex items-center justify-center",
              // Remove default button styles
              "border-0 bg-transparent p-0 m-0",
              // Hover and focus states
              "hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#434F64] focus:ring-offset-1 rounded-sm",
              // Disabled state
              disabled && "pointer-events-none"
            )}
            onClick={handleCloseClick}
            aria-label="Remove"
          >
            <Icon 
              name="cross" 
              size={14} 
              color="#434F64" // Same as text color from Figma
            />
          </button>
        )}
      </div>
    );
  }
);

Chicklet.displayName = "Chicklet";

export default Chicklet; 