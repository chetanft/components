"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useCollapsibleContext } from './CollapsibleContext';

export interface CollapsibleContentProps extends ComposableProps<'div'> {
  /**
   * The collapsible content.
   */
  children?: React.ReactNode;
}

/**
 * CollapsibleContent Component
 *
 * A composable component for the collapsible content panel.
 * Only displays when the Collapsible is expanded.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Collapsible>
 *   <CollapsibleTrigger>...</CollapsibleTrigger>
 *   <CollapsibleContent>
 *     <p>This content is shown when expanded</p>
 *   </CollapsibleContent>
 * </Collapsible>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically shows/hides based on expand state.
 * - Accessible: includes ARIA attributes for collapsible panels.
 */
export const CollapsibleContent = React.forwardRef<HTMLDivElement, CollapsibleContentProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const { isExpanded, type } = useCollapsibleContext();
    
    if (!isExpanded) return null;
    
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          "px-[var(--spacing-x5)] py-[var(--spacing-x5)]",
          type === 'Tertiary' && "pt-0",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

CollapsibleContent.displayName = 'CollapsibleContent';

