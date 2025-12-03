"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface CardActionsProps extends ComposableProps<'div'> {
  /**
   * The action buttons or elements.
   */
  children?: React.ReactNode;
}

/**
 * CardActions Component
 *
 * A composable component for action buttons in a Card footer.
 * Provides proper spacing and alignment for action elements.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardBody>...</CardBody>
 *   <CardFooter>
 *     <CardActions>
 *       <Button variant="secondary">Cancel</Button>
 *       <Button>Confirm</Button>
 *     </CardActions>
 *   </CardFooter>
 * </Card>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Provides default spacing between action items.
 */
export const CardActions = React.forwardRef<HTMLDivElement, CardActionsProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn("flex gap-[var(--spacing-x4)] items-center justify-end", className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

CardActions.displayName = 'CardActions';

