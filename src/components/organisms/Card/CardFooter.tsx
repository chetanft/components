"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Divider } from '../../atoms/Divider';
import { Spacer } from '../../atoms/Spacer';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface CardFooterProps extends ComposableProps<'div'> {
  /**
   * The content of the card footer.
   */
  children?: React.ReactNode;
  /**
   * Whether to add padding
   * @default true
   */
  padding?: boolean;
}

/**
 * CardFooter Component
 *
 * A composable component for the footer section of a Card.
 * Typically contains action buttons or additional information.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardBody>...</CardBody>
 *   <CardFooter>
 *     <Button>Action</Button>
 *   </CardFooter>
 * </Card>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically includes a divider above the footer.
 * - Provides default padding and spacing.
 */
export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, padding = true, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          "flex flex-col items-start pb-0 pt-0 relative w-full",
          padding ? "px-[var(--spacing-x5)]" : "px-0",
          className
        )}
        {...props}
      >
        <Divider type="primary" />
        <Spacer size="x5" />
        <div className={cn(
          "flex gap-[var(--spacing-x4)] items-center relative shrink-0 w-full",
          padding ? "px-[var(--spacing-x5)] py-0" : ""
        )}>
          {children}
        </div>
      </Comp>
    );
  }
);

CardFooter.displayName = 'CardFooter';

