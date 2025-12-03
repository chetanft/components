"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface BreadcrumbItemProps extends ComposableProps<'li'> {
  /**
   * The breadcrumb item content (typically BreadcrumbLink or BreadcrumbSeparator).
   */
  children?: React.ReactNode;
}

/**
 * BreadcrumbItem Component
 *
 * A composable component for individual breadcrumb items.
 * Contains BreadcrumbLink and BreadcrumbSeparator components.
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
 * - Wraps the HTML `<li>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Provides proper spacing for breadcrumb items.
 */
export const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'li';
    return (
      <Comp
        ref={ref}
        className={cn("flex items-center gap-[var(--spacing-x2)]", className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

BreadcrumbItem.displayName = 'BreadcrumbItem';

