"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useCollapsibleContext } from './CollapsibleContext';

export interface CollapsibleTriggerProps extends ComposableProps<'button'> {
  /**
   * The trigger content (typically CollapsibleHeader).
   */
  children?: React.ReactNode;
}

/**
 * CollapsibleTrigger Component
 *
 * A composable component that triggers the expand/collapse of a Collapsible.
 * Typically contains CollapsibleHeader with CollapsibleTitle and CollapsibleExtra.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Collapsible>
 *   <CollapsibleTrigger>
 *     <CollapsibleHeader>
 *       <CollapsibleTitle>Section Title</CollapsibleTitle>
 *       <CollapsibleExtra><Button>Action</Button></CollapsibleExtra>
 *     </CollapsibleHeader>
 *   </CollapsibleTrigger>
 *   <CollapsibleContent>Content here</CollapsibleContent>
 * </Collapsible>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<button>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically handles expand/collapse state.
 * - Accessible: includes ARIA attributes and keyboard navigation.
 */
export const CollapsibleTrigger = React.forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  ({ className, children, asChild, onClick, ...props }, ref) => {
    const { isExpanded, onToggle, disabled, type } = useCollapsibleContext();
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled) {
        onToggle();
        onClick?.(e);
      }
    };
    
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        onClick={handleClick}
        disabled={disabled}
        aria-expanded={isExpanded}
        aria-disabled={disabled}
        className={cn(
          "flex items-center gap-[var(--spacing-x2)] px-0 py-[var(--spacing-x5)] w-full cursor-pointer",
          isExpanded && "border-b border-[var(--border-primary)]",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

CollapsibleTrigger.displayName = 'CollapsibleTrigger';

