"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface CardBodyProps extends ComposableProps<'div'> {
  /**
   * The content of the card body.
   */
  children?: React.ReactNode;
}

/**
 * CardBody Component
 *
 * A composable component for the main content area of a Card.
 * Provides default padding and spacing.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>...</CardHeader>
 *   <CardBody>
 *     <p>Card content goes here</p>
 *   </CardBody>
 *   <CardFooter>...</CardFooter>
 * </Card>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Provides default padding for card content.
 */
export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn("flex-1 px-[var(--spacing-x5)] py-[var(--spacing-x5)]", className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

CardBody.displayName = 'CardBody';

