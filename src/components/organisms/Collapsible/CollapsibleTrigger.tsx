"use client";

import React from 'react';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { cn } from '../../../lib/utils';
import { useCollapsibleContext } from './CollapsibleContext';

export interface CollapsibleTriggerProps extends React.ComponentPropsWithoutRef<'button'> {
  /**
   * The trigger content (typically CollapsibleHeader).
   */
  children?: React.ReactNode;
  /**
   * Render as child element (slot pattern)
   */
  asChild?: boolean;
}

/**
 * CollapsibleTrigger Component
 *
 * A composable component that triggers the expand/collapse of a Collapsible.
 * Typically contains CollapsibleHeader with CollapsibleTitle and CollapsibleExtra.
 * Built on Radix UI CollapsibleTrigger for full accessibility.
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
    const { isExpanded, disabled } = useCollapsibleContext();

    return (
      <CollapsiblePrimitive.Trigger
        ref={ref}
        asChild={asChild}
        data-slot="collapsible-trigger"
        disabled={disabled}
        className={cn(
          "flex flex-col items-start justify-start gap-[var(--spacing-x2)] px-[var(--spacing-x3)] py-[var(--spacing-x3)] w-full cursor-pointer",
          "border-b transition-[border-color] duration-200 ease-in-out",
          "bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent",
          "outline-none focus:outline-none focus-visible:outline-none",
          "appearance-none border-0 border-b",
          "text-left select-none",
          "will-change-[border-color]",
          "touch-action-manipulation",
          isExpanded ? "border-[var(--border-primary)]" : "border-transparent",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        style={{
          WebkitTapHighlightColor: 'transparent',
          WebkitTouchCallout: 'none',
        }}
        onClick={onClick}
        {...props}
      >
        {children}
      </CollapsiblePrimitive.Trigger>
    );
  }
);

CollapsibleTrigger.displayName = 'CollapsibleTrigger';
