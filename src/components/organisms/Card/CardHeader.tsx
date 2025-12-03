"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface CardHeaderProps extends ComposableProps<'div'> {
  /**
   * The content of the card header.
   */
  children?: React.ReactNode;
}

/**
 * CardHeader Component
 *
 * A composable component for the header section of a Card.
 * Typically contains CardTitle and CardDescription.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Card description</CardDescription>
 *   </CardHeader>
 *   <CardBody>...</CardBody>
 * </Card>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Provides default padding and spacing.
 */
export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn("flex flex-col gap-[var(--spacing-x1)] px-[var(--spacing-x5)] pt-[var(--spacing-x5)]", className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

CardHeader.displayName = 'CardHeader';

