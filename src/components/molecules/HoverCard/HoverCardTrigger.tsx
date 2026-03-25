"use client";

import React from 'react';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import type { ComposableProps } from '../../../lib/slot';

export interface HoverCardTriggerProps extends ComposableProps<'div'> {
  /**
   * Trigger content.
   */
  children: React.ReactNode;
}

/**
 * HoverCardTrigger Component
 *
 * A composable component for the trigger element of a HoverCard.
 * Typically wraps a hoverable element.
 *
 * @public
 *
 * @example
 * ```tsx
 * <HoverCard>
 *   <HoverCardTrigger>
 *     <Button>Hover me</Button>
 *   </HoverCardTrigger>
 *   <HoverCardContent>
 *     <p>Card content</p>
 *   </HoverCardContent>
 * </HoverCard>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically handles mouse enter/leave to show/hide card.
 */
export const HoverCardTrigger = React.forwardRef<HTMLDivElement, HoverCardTriggerProps>(
  ({ className, children, asChild, ...props }, ref) => {
    return (
      <HoverCardPrimitive.Trigger
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={className}
        asChild={asChild}
        {...(props as React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Trigger>)}
      >
        {children}
      </HoverCardPrimitive.Trigger>
    );
  }
);

HoverCardTrigger.displayName = 'HoverCardTrigger';
