"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Typography, type TypographyColor } from '../../atoms/Typography';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface CardDescriptionProps extends ComposableProps<'p'> {
  /**
   * The description text.
   */
  children: React.ReactNode;
}

/**
 * CardDescription Component
 *
 * A composable component for the description/subtitle of a Card.
 * Typically used within CardHeader.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Additional information about the card</CardDescription>
 *   </CardHeader>
 * </Card>
 * ```
 *
 * @remarks
 * - Wraps the Typography component by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Uses body-secondary-regular variant for subtle styling.
 */
export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, children, asChild, color, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot ref={ref} {...props}>
          <Typography variant="body-secondary-regular" className={cn("text-[var(--secondary)]", className)}>
            {children}
          </Typography>
        </Slot>
      );
    }
    
    const { color: _, ...restProps } = props as any;
    return (
      <Typography
        ref={ref}
        variant="body-secondary-regular"
        as="p"
        className={cn("text-[var(--secondary)]", className)}
        {...restProps}
      >
        {children}
      </Typography>
    );
  }
);

CardDescription.displayName = 'CardDescription';

