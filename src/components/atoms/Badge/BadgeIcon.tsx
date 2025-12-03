"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { Icon, IconName } from '../Icons';

/**
 * BadgeIcon component props
 * 
 * @public
 */
export interface BadgeIconProps extends Omit<ComposableProps<'span'>, 'children'> {
  /**
   * Icon name from FT Design System icon library or custom React component
   */
  icon?: IconName | React.ReactNode;
  
  /**
   * Icon size
   * @default 14
   */
  iconSize?: number;
  
  /**
   * Icon content (for custom icons)
   */
  children?: React.ReactNode;
}

/**
 * BadgeIcon Component
 * 
 * A composable icon wrapper for badges.
 * Can be used within Badge or standalone with asChild.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Within Badge
 * <Badge variant="success">
 *   <BadgeIcon icon="check" />
 *   <BadgeText>Active</BadgeText>
 * </Badge>
 * 
 * // With asChild
 * <BadgeIcon asChild>
 *   <CustomIcon />
 * </BadgeIcon>
 * ```
 * 
 * @remarks
 * - Supports FT Design System icons or custom React components
 * - Supports `asChild` prop for custom element composition
 * - Use with BadgeText for complete badge composition
 */
export const BadgeIcon = React.forwardRef<HTMLSpanElement, BadgeIconProps>(
  ({ icon, iconSize = 14, children, className, asChild, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={cn("inline-flex items-center justify-center", className)}
          {...props}
        >
          {children}
        </Slot>
      );
    }
    
    if (icon && typeof icon === 'string') {
      return (
        <span
          ref={ref}
          className={cn("inline-flex items-center justify-center", className)}
          {...props}
        >
          <Icon name={icon} size={iconSize} />
        </span>
      );
    }
    
    if (icon && React.isValidElement(icon)) {
      return (
        <span
          ref={ref}
          className={cn("inline-flex items-center justify-center", className)}
          {...props}
        >
          {icon}
        </span>
      );
    }
    
    if (children) {
      return (
        <span
          ref={ref}
          className={cn("inline-flex items-center justify-center", className)}
          {...props}
        >
          {children}
        </span>
      );
    }
    
    return null;
  }
);

BadgeIcon.displayName = 'BadgeIcon';

