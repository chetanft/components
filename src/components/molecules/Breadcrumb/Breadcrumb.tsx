"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { getGlassClasses, useResolvedGlass, type GlassVariant } from '../../../lib/glass';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface BreadcrumbProps extends Omit<ComposableProps<'nav'>, 'onChange'> {
  /**
   * Breadcrumb content (for composable API)
   */
  children?: React.ReactNode;
  /**
   * Apply glassmorphism effect to the breadcrumb bar
   */
  glass?: GlassVariant;
}

/**
 * Breadcrumb Component
 *
 * A composable breadcrumb component for navigation hierarchy.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/" icon="home">Home</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/about" isCurrentPage>About</BreadcrumbLink>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * ```
 *
 * @remarks
 * - Composable API provides maximum flexibility and control
 * - All sub-components (BreadcrumbList, BreadcrumbItem, BreadcrumbLink, etc.) support `asChild`
 * - Accessible: includes ARIA attributes and proper navigation semantics
 */
export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({
    children,
    glass,
    className,
    asChild,
    ...props
  }, ref) => {
    const resolvedGlass = useResolvedGlass(glass);

    const Comp = asChild ? Slot : 'nav';
    return (
      <Comp
        ref={ref}
        aria-label="Breadcrumb"
        className={cn(
          getGlassClasses(resolvedGlass, '', ''),
          resolvedGlass && 'rounded-[var(--radius-md)] px-[var(--spacing-x3)] py-[var(--spacing-x2)]',
          "flex items-center",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

