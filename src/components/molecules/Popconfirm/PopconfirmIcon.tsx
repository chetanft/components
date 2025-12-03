"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { usePopconfirmContext } from './PopconfirmContext';

export interface PopconfirmIconProps extends ComposableProps<'div'> {
  /**
   * Custom icon name
   */
  icon?: string;
  /**
   * Custom icon content (when using asChild)
   */
  children?: React.ReactNode;
}

/**
 * PopconfirmIcon Component
 *
 * A composable component for the icon in a Popconfirm.
 * Typically used within PopconfirmContent.
 *
 * @public
 *
 * @example
 * ```tsx
 * <PopconfirmContent>
 *   <PopconfirmIcon icon="triangle-alert" />
 *   <PopconfirmTitle>Are you sure?</PopconfirmTitle>
 * </PopconfirmContent>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically styled with warning color.
 */
export const PopconfirmIcon = React.forwardRef<HTMLDivElement, PopconfirmIconProps>(
  ({ className, children, icon, asChild, ...props }, ref) => {
    const { icon: contextIcon } = usePopconfirmContext();
    const iconName = icon || contextIcon || 'triangle-alert';
    
    if (asChild) {
      return (
        <Slot ref={ref} className={className} {...props}>
          {children}
        </Slot>
      );
    }
    
    return (
      <div ref={ref} className={cn("flex-shrink-0 mt-0.5", className)} {...props}>
        {children || <Icon name={iconName as any} size={16} className="text-[var(--color-warning)]" />}
      </div>
    );
  }
);

PopconfirmIcon.displayName = 'PopconfirmIcon';

