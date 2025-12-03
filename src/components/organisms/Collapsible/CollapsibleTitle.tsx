"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface CollapsibleTitleProps extends ComposableProps<'div'> {
  /**
   * The title text.
   */
  children: React.ReactNode;
}

/**
 * CollapsibleTitle Component
 *
 * A composable component for the title of a Collapsible.
 * Typically used within CollapsibleHeader.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Collapsible>
 *   <CollapsibleTrigger>
 *     <CollapsibleHeader>
 *       <CollapsibleTitle>Section Title</CollapsibleTitle>
 *     </CollapsibleHeader>
 *   </CollapsibleTrigger>
 * </Collapsible>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Uses prominent typography styling.
 */
export const CollapsibleTitle = React.forwardRef<HTMLDivElement, CollapsibleTitleProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn("flex-1 font-semibold text-xl text-[var(--primary)]", className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

CollapsibleTitle.displayName = 'CollapsibleTitle';

