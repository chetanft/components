import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * UNIFIED COMPONENT DESIGN SYSTEM
 * All components inherit from this system to ensure perfect consistency
 */

export type ComponentSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Gets unified component styles based on size
 * This ensures ALL components have matching heights, fonts, padding, etc.
 */
export function getComponentStyles(size: ComponentSize = 'md') {
  const baseStyles = {
    // Core layout
    height: `h-component-${size}`,
    fontSize: `text-component-${size}`,
    gap: `gap-component-${size === 'xl' ? 'lg' : size}`,
    
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
    sm: 'px-3 py-2',
    md: 'px-4 py-3', 
    lg: 'px-5 py-4',
    xl: 'px-6 py-5'
  };
  
  // Size-specific icon sizes
  const iconSizeMap = {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 28
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
 * Filters out problematic classes that AI tools might add
 * This prevents manual height overrides, border radius, and color overrides
 * that would break the design system's consistency
 */
export function filterAIClasses(className?: string): string {
  if (!className) return '';
  
  // Remove height overrides, border radius, and color overrides
  const filteredClasses = className
    .split(' ')
    .filter(cls => {
      // Block manual height classes that override component sizing
      if (cls.match(/^h-\d+$/) || cls.match(/^h-\[.*\]$/)) return false;
      // Block border radius overrides that break design consistency
      if (cls.match(/^rounded/) || cls.match(/^border-radius/)) return false;
      // Block background/text color overrides that break brand colors
      if (cls.match(/^bg-\[#/) || cls.match(/^text-\[#/) || cls.match(/^border-\[#/)) return false;
      // Block width overrides on form components
      if (cls.match(/^w-\d+$/) && !cls.includes('w-full')) return false;
      // Block padding overrides that break component spacing
      if (cls.match(/^p[xy]?-\d+$/) || cls.match(/^p[xy]?-\[.*\]$/)) return false;
      return true;
    })
    .join(' ');
    
  return filteredClasses;
}

/**
 * Enhanced cn function that automatically filters AI-generated problematic classes
 * Use this instead of regular cn for components that need AI protection
 */
export function cnSafe(...inputs: ClassValue[]) {
  const merged = cn(...inputs);
  return filterAIClasses(merged);
}

/**
 * Filters out problematic inline styles that AI tools might add
 * This prevents manual height, border-radius, and color overrides via style prop
 */
export function filterAIStyles(style?: React.CSSProperties): React.CSSProperties | undefined {
  if (!style) return undefined;
  
  const filteredStyle = { ...style };
  
  // Remove problematic style properties that break design system
  delete filteredStyle.height;
  delete filteredStyle.borderRadius;
  delete filteredStyle.backgroundColor;
  delete filteredStyle.color;
  delete filteredStyle.border;
  delete filteredStyle.padding;
  delete filteredStyle.paddingTop;
  delete filteredStyle.paddingBottom;
  delete filteredStyle.paddingLeft;
  delete filteredStyle.paddingRight;
  delete filteredStyle.width; // Allow only if it's 100%
  
  return Object.keys(filteredStyle).length > 0 ? filteredStyle : undefined;
}

/**
 * Creates a unified component with automatic sizing and AI protection
 * This is the foundation for all FT Design System components
 */
export function createUnifiedComponent<T extends { size?: ComponentSize; className?: string }>(
  baseClassName: string,
  additionalClasses?: string
) {
  return function(props: T) {
    const { size = 'md', className, ...rest } = props;
    const componentStyles = getComponentStyles(size);
    const safeClassName = filterAIClasses(className);
    
    return {
      ...rest,
      className: cn(
        baseClassName,
        componentStyles.className,
        additionalClasses,
        safeClassName
      ),
      'data-size': size, // For debugging and testing
    };
  };
} 