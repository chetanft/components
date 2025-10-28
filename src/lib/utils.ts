import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * UNIFIED COMPONENT DESIGN SYSTEM
 * All components inherit from this system to ensure perfect consistency
 */

export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/**
 * Gets unified component styles based on size
 * This ensures ALL components have matching heights, fonts, padding, etc.
 */
export function getComponentStyles(size: ComponentSize = 'md') {
  const baseStyles = {
    // Core layout
    height: `h-component-${size}`,
    fontSize: `text-component-${size}`,
    gap: `gap-component-${size === 'xxl' ? 'xl' : size === 'xl' ? 'lg' : size}`,
    
    // Unified styling
    borderRadius: 'rounded-component',
    borderWidth: 'border-component',
    borderColor: 'border-component-border',
    backgroundColor: 'bg-component-bg-default',
    color: 'text-component-text-default',
    
    // Unified interactions
    transition: 'transition-component',
    focusRing: 'focus:ring-component-focus focus:border-component-border-focus',
    hoverShadow: 'hover:shadow-component-hover',
    
    // Unified states
    disabled: 'disabled:bg-component-bg-disabled disabled:text-component-text-disabled disabled:cursor-not-allowed',
  };
  
  // Size-specific padding
  const paddingMap = {
    xs: 'px-2 py-1',
    sm: 'px-3 py-2',
    md: 'px-4 py-3', 
    lg: 'px-5 py-4',
    xl: 'px-6 py-5',
    xxl: 'px-7 py-6'
  };
  
  // Size-specific icon sizes
  const iconSizeMap = {
    xs: 14,
    sm: 16,
    md: 18,
    lg: 20,
    xl: 22,
    xxl: 24
  };
  
  return {
    ...baseStyles,
    padding: paddingMap[size],
    iconSize: iconSizeMap[size],
    // Combined class string for easy use
    className: cn(
      baseStyles.height,
      baseStyles.fontSize,
      baseStyles.gap,
      baseStyles.borderRadius,
      baseStyles.borderWidth,
      baseStyles.borderColor,
      baseStyles.backgroundColor,
      baseStyles.color,
      baseStyles.transition,
      baseStyles.focusRing,
      baseStyles.hoverShadow,
      baseStyles.disabled,
      paddingMap[size]
    )
  };
}



/**
 * Creates a unified component with automatic sizing
 * This is the foundation for all FT Design System components
 */
export function createUnifiedComponent<T extends { size?: ComponentSize; className?: string }>(
  baseClassName: string,
  additionalClasses?: string
) {
  return function(props: T) {
    const { size = 'md', className, ...rest } = props;
    const componentStyles = getComponentStyles(size);
    
    return {
      ...rest,
      className: cn(
        baseClassName,
        componentStyles.className,
        additionalClasses,
        className
      ),
      'data-size': size, // For debugging and testing
    };
  };
} 