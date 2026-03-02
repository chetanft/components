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
 * - Full-width divider with py-x4 vertical rhythm
 * - Spacer (x5)
 * - Footer container with optional px-x5 padding
 *
 * @public
 */
export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, padding = true, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          "flex flex-col items-start pt-0 relative w-full",
          className
        )}
        {...props}
      >
        {/* Divider — matches Figma py-x4 rhythm */}
        <div className="flex items-center justify-between py-[var(--spacing-x4)] w-full">
          <Divider type="primary" className="flex-1" />
        </div>

        <Spacer size="x5" />

        {/* Footer container */}
        <div className={cn(
          "flex gap-[var(--spacing-x4)] items-center relative shrink-0 w-full",
          padding ? "px-[var(--spacing-x5)]" : ""
        )}>
          {children}
        </div>
      </Comp>
    );
  }
);

CardFooter.displayName = 'CardFooter';
