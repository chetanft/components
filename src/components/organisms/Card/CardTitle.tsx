"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Typography } from '../../atoms/Typography';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface CardTitleProps extends ComposableProps<'h3'> {
  /**
   * The title text.
   */
  children: React.ReactNode;
}

/**
 * CardTitle Component
 *
 * A composable component for the title of a Card.
 * Typically used within CardHeader.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>My Card Title</CardTitle>
 *   </CardHeader>
 * </Card>
 * ```
 *
 * @remarks
 * - Wraps the Typography component by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Uses display-primary variant for prominent styling.
 */
export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, children, asChild, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot ref={ref} {...props}>
          <Typography variant="display-primary" className={cn("text-[var(--primary)]", className)}>
            {children}
          </Typography>
        </Slot>
      );
    }
    
    return (
      <Typography
        ref={ref}
        variant="display-primary"
        as="h3"
        className={cn("text-[var(--primary)]", className)}
        {...props}
      >
        {children}
      </Typography>
    );
  }
);

CardTitle.displayName = 'CardTitle';

