"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon, IconName } from '../../atoms/Icons';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useAlertContext } from './AlertContext';

export interface AlertIconProps extends ComposableProps<'div'> {
  /**
   * Custom icon name (optional, defaults to variant icon)
   */
  icon?: IconName;
}

/**
 * AlertIcon Component
 *
 * A composable component for displaying an icon in an Alert.
 * Automatically shows the appropriate icon based on Alert variant.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Alert variant="info">
 *   <AlertIcon />
 *   <AlertTitle>Information</AlertTitle>
 *   <AlertDescription>This is an info alert</AlertDescription>
 * </Alert>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically styled based on Alert variant.
 */
export const AlertIcon = React.forwardRef<HTMLDivElement, AlertIconProps>(
  ({ className, icon, asChild, ...props }, ref) => {
    const { variant } = useAlertContext();
    
    const variantIcons = {
      info: 'alert-informational' as IconName,
      success: 'check' as IconName,
      warning: 'triangle-alert' as IconName,
      danger: 'alert-critical' as IconName,
    };
    
    const variantColors = {
      info: 'text-[var(--neutral)]',
      success: 'text-[var(--positive)]',
      warning: 'text-[var(--warning)]',
      danger: 'text-[var(--danger-500)]',
    };
    
    const displayIcon = icon || variantIcons[variant];
    const iconColor = variantColors[variant];
    
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn("flex-shrink-0", className)}
        {...props}
      >
        <Icon
          name={displayIcon}
          size={20}
          className={cn(iconColor)}
        />
      </Comp>
    );
  }
);

AlertIcon.displayName = 'AlertIcon';

