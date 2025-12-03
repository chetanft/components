"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface CollapsibleExtraProps extends ComposableProps<'div'> {
  /**
   * Extra content (typically action buttons).
   */
  children?: React.ReactNode;
}

/**
 * CollapsibleExtra Component
 *
 * A composable component for extra content in a Collapsible header.
 * Typically contains action buttons or additional controls.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Collapsible>
 *   <CollapsibleTrigger>
 *     <CollapsibleHeader>
 *       <CollapsibleTitle>Section Title</CollapsibleTitle>
 *       <CollapsibleExtra>
 *         <Button>Action</Button>
 *       </CollapsibleExtra>
 *     </CollapsibleHeader>
 *   </CollapsibleTrigger>
 * </Collapsible>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Provides proper spacing for extra content.
 */
export const CollapsibleExtra = React.forwardRef<HTMLDivElement, CollapsibleExtraProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn("flex items-center", className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

CollapsibleExtra.displayName = 'CollapsibleExtra';

