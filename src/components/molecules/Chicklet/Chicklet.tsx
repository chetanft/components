"use client";
import React, { forwardRef, useState } from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { Typography } from '../../atoms/Typography';

export type ChickletVariant = 'rounded' | 'rectangular';
export type ChickletState = 'default' | 'hover';

export interface ChickletProps {
  /** The text content of the chicklet */
  label?: React.ReactNode;
  /** Whether the chicklet has rounded corners (pill) or rectangular corners */
  variant?: ChickletVariant;
  /**
   * Whether to show the close (cross) icon
   * @deprecated Use conditional rendering instead: `{onClose && <CloseButton />}`
   */
  showClose?: boolean;
  /**
   * Alias for showClose
   * @deprecated Use conditional rendering instead: `{onClose && <CloseButton />}`
   */
  closable?: boolean;
  /** Whether to show border */
  bordered?: boolean;
  /** Callback when the close icon is clicked */
  onClose?: (e?: React.MouseEvent) => void;
  /** Callback when the chicklet is clicked */
  onClick?: () => void;
  /** Whether the chicklet is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  children?: React.ReactNode;
  color?: string; // Custom color support
}

export const Chicklet = forwardRef<HTMLDivElement, ChickletProps>(
  ({ 
    label,
    variant = 'rectangular',
    showClose,
    closable,
    bordered = false,
    onClose,
    onClick,
    disabled = false,
    className,
    children,
    color,
    ...props 
  }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const [visible, setVisible] = useState(true);
    
    // Get current state
    const currentState: ChickletState = isHovered ? 'hover' : 'default';
    const isClosable = closable || showClose;
    
    // Base styles using exact Figma specifications
    const baseStyles = cn(
      // Layout from Figma: row with center alignment and 8px gap
      "inline-flex items-center justify-center gap-[8px]",
      // Padding from Figma: 2px 8px
      "px-[8px] py-[2px]",
      // Transitions
      "transition-all duration-200 cursor-pointer",
      // Disabled state
      disabled && "opacity-50 cursor-not-allowed pointer-events-none",
      
      // Border radius based on variant - exact from Figma
      variant === 'rectangular' && "rounded-[4px]", // 4px border radius
      variant === 'rounded' && "rounded-[100px]", // 100px border radius (pill)
      
      // Background colors based on state - use CSS variables instead of hardcoded
      currentState === 'default' && "bg-[var(--border-secondary)]", // Default background
      currentState === 'hover' && "bg-[var(--border-primary)]", // Hover background
      
      bordered && "border border-[var(--border-primary)] bg-transparent",

      className
    );
    
    const handleClick = (_e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      onClick?.();
    };
    
    const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      e.stopPropagation(); // Prevent triggering parent onClick
      onClose?.(e);
      if (!onClose) {
          setVisible(false);
      }
    };

    if (!visible) return null;
    
    return (
      <div
        ref={ref}
        className={baseStyles}
        onMouseEnter={() => !disabled && setIsHovered(true)}
        onMouseLeave={() => !disabled && setIsHovered(false)}
        onClick={handleClick}
        style={{ color: color, borderColor: color }}
        {...props}
      >
        {/* Label Text */}
        <Typography 
          variant="body-secondary-medium" 
          as="span"
          style={{ color: color || 'var(--primary)' }}
        >
          {children || label}
        </Typography>
        
        {/* Close Icon - Using Cross icon from Figma */}
        {isClosable && (
          <button
            type="button"
            className={cn(
              // Size from Figma: 14x14px
              "w-[14px] h-[14px] flex items-center justify-center",
              // Remove default button styles
              "border-0 bg-transparent p-0 m-0",
              // Hover and focus states
              "hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-1 rounded-sm",
              // Disabled state
              disabled && "pointer-events-none"
            )}
            onClick={handleCloseClick}
            aria-label="Remove"
          >
            <Icon 
              name="cross" 
              size={14} 
              color={color || "var(--primary)"} 
            />
          </button>
        )}
      </div>
    );
  }
);

Chicklet.displayName = "Chicklet";

export default Chicklet;
