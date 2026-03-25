"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Divider } from '../../atoms/Divider';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface CardFooterProps extends ComposableProps<'div'> {
  /**
   * The content of the card footer.
   */
  children?: React.ReactNode;
  /**
   * Whether to add horizontal padding to the footer container.
   * @default true
   */
  padding?: boolean;
}

/**
 * CardFooter Component
 *
 * A composable component for the footer section of a Card.
 * Renders a divider line followed by footer content.
 *
 * Matches Figma `.card_footer`:
 * - Full-width divider
 * - Footer container with padding
 *
 * @public
 */
export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, padding = true, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        data-slot="card-footer"
        className={cn(
          "flex flex-col items-start pt-0 relative w-full",
          className
        )}
        {...props}
      >
        <Divider type="primary" className="w-full" />

        {/* Footer container */}
        <div className={cn(
          "flex gap-[var(--spacing-x4)] items-center relative shrink-0 w-full py-[var(--spacing-x5)]",
          padding ? "px-[var(--spacing-x5)]" : ""
        )}>
          {children}
        </div>
      </Comp>
    );
  }
);

CardFooter.displayName = 'CardFooter';
(CardFooter as any).slot = 'card-footer';
