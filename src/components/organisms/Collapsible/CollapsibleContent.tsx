"use client";

import React from 'react';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { cn } from '../../../lib/utils';
import { useCollapsibleContext } from './CollapsibleContext';

export interface CollapsibleContentProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * The collapsible content.
   */
  children?: React.ReactNode;
  /**
   * Used to force mounting when more control is needed.
   * Useful when controlling animation with React animation libraries.
   */
  forceMount?: true;
  /**
   * Render as child element (slot pattern)
   */
  asChild?: boolean;
}

/**
 * CollapsibleContent Component
 *
 * A composable component for the collapsible content panel.
 * Animates open and closed with a height transition.
 * Built on Radix UI CollapsibleContent for full accessibility.
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
 * - Built on Radix UI CollapsibleContent primitive.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically animates height on open/close using Radix CSS custom properties.
 * - Accessible: includes ARIA attributes for collapsible panels.
 */
export const CollapsibleContent = React.forwardRef<HTMLDivElement, CollapsibleContentProps>(
  ({ className, children, forceMount, asChild, ...props }, ref) => {
    const { type } = useCollapsibleContext();

    return (
      <CollapsiblePrimitive.Content
        ref={ref}
        asChild={asChild}
        forceMount={forceMount}
        data-slot="collapsible-content"
        className={cn(
          "overflow-hidden",
          "data-[state=open]:animate-collapsible-down",
          "data-[state=closed]:animate-collapsible-up",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "py-[var(--spacing-x3)]",
            type === 'Tertiary' && "pt-0",
          )}
        >
          {children}
        </div>
      </CollapsiblePrimitive.Content>
    );
  }
);

CollapsibleContent.displayName = 'CollapsibleContent';
