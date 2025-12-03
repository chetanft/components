"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { Icon, IconName } from '../Icons';

/**
 * ButtonIcon component props
 * 
 * @public
 */
export interface ButtonIconProps extends Omit<ComposableProps<'span'>, 'children'> {
  /**
   * Icon name from FT Design System icon library or custom React component
   * Can be an IconName string or a custom React component
   */
  icon?: IconName | React.ReactNode;
  
  /**
   * Icon size (only applies when icon is IconName string)
   */
  iconSize?: number;
  
  /**
   * Custom className for icon wrapper (only applies when icon is IconName string)
   */
  iconClassName?: string;
  
  /**
   * Icon content (for custom icons)
   */
  children?: React.ReactNode;
}

/**
 * ButtonIcon Component
 * 
 * A composable icon wrapper for buttons.
 * Can be used within Button or standalone with asChild.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Within Button
 * <Button>
 *   <ButtonIcon icon="add" />
 *   <ButtonText>Add Item</ButtonText>
 * </Button>
 * 
 * // With asChild
 * <ButtonIcon asChild icon="edit">
 *   <CustomIcon />
 * </ButtonIcon>
 * ```
 * 
 * @remarks
 * - Supports FT Design System icons or custom React components
 * - Supports `asChild` prop for custom element composition
 * - Automatically sizes icons based on button size when used within Button
 */
export const ButtonIcon = React.forwardRef<HTMLSpanElement, ButtonIconProps>(
  ({ icon, iconSize, iconClassName, children, className, asChild, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={cn(className)}
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
          className={cn("inline-flex items-center justify-center", iconClassName, className)}
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
          className={cn("inline-flex items-center justify-center", iconClassName, className)}
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

ButtonIcon.displayName = 'ButtonIcon';

