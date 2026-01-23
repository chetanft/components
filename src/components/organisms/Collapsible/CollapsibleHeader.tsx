"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface CollapsibleHeaderProps extends ComposableProps<'div'> {
  /**
   * The header content (typically CollapsibleTitle and CollapsibleExtra).
   */
  children?: React.ReactNode;
}

/**
 * CollapsibleHeader Component
 *
 * A composable component for the header section of a Collapsible.
 * Typically contains CollapsibleTitle, CollapsibleIcon, and CollapsibleExtra.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Collapsible>
 *   <CollapsibleTrigger>
 *     <CollapsibleHeader>
 *       <CollapsibleIcon />
 *       <CollapsibleTitle>Section Title</CollapsibleTitle>
 *       <CollapsibleExtra><Button>Action</Button></CollapsibleExtra>
 *     </CollapsibleHeader>
 *   </CollapsibleTrigger>
 * </Collapsible>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Provides default spacing and layout for header elements.
 */
export const CollapsibleHeader = React.forwardRef<HTMLDivElement, CollapsibleHeaderProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn("flex items-center gap-[var(--spacing-x5)] flex-1 w-full", className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

CollapsibleHeader.displayName = 'CollapsibleHeader';

