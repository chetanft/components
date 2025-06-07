import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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