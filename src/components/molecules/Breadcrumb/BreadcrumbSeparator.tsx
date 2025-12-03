"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon, IconName } from '../../atoms/Icons';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface BreadcrumbSeparatorProps extends ComposableProps<'span'> {
  /**
   * Custom separator icon name
   * @default 'chevron-right'
   */
  icon?: IconName;
  /**
   * Custom separator content (overrides icon)
   */
  children?: React.ReactNode;
}

/**
 * BreadcrumbSeparator Component
 *
 * A composable component for breadcrumb separators.
 * Automatically displays between breadcrumb items.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/">Home</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/about">About</BreadcrumbLink>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<span>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Defaults to chevron-right icon.
 */
export const BreadcrumbSeparator = React.forwardRef<HTMLSpanElement, BreadcrumbSeparatorProps>(
  ({ className, icon = 'chevron-right', children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'span';
    return (
      <Comp
        ref={ref}
        className={cn("flex items-center", className)}
        {...props}
      >
        {children || <Icon name={icon} size={16} className="text-[var(--color-tertiary)]" />}
      </Comp>
    );
  }
);

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

