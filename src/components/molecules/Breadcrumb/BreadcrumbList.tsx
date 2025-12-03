"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface BreadcrumbListProps extends ComposableProps<'ol'> {
  /**
   * The breadcrumb items.
   */
  children?: React.ReactNode;
}

/**
 * BreadcrumbList Component
 *
 * A composable component that contains BreadcrumbItem components.
 * Provides the ordered list container for breadcrumb navigation.
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
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/about">About</BreadcrumbLink>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<ol>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Provides default spacing between items.
 */
export const BreadcrumbList = React.forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'ol';
    return (
      <Comp
        ref={ref}
        className={cn("flex items-center gap-[var(--spacing-x2)] flex-wrap", className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

BreadcrumbList.displayName = 'BreadcrumbList';

