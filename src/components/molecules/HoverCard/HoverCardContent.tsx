"use client";

import React from 'react';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import { cn } from '../../../lib/utils';
import { getGlassClasses, useResolvedGlass, type GlassVariant } from '../../../lib/glass';
import type { ComposableProps } from '../../../lib/slot';
import { useHoverCardContext } from './HoverCardContext';

export interface HoverCardContentProps extends ComposableProps<'div'> {
  /**
   * Content.
   */
  children: React.ReactNode;
  /**
   * Apply glassmorphism effect to the hover card surface.
   * @default false
   */
  glass?: GlassVariant;
}

/**
 * HoverCardContent Component
 *
 * A composable component for the card content of a HoverCard.
 * Typically used within HoverCard.
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
 * - Automatically positioned based on placement.
 */
export const HoverCardContent = React.forwardRef<HTMLDivElement, HoverCardContentProps>(
  ({ className, children, glass, asChild: _asChild, ...props }, ref) => {
    const resolvedGlass = useResolvedGlass(glass);
    const { placement, width } = useHoverCardContext();

    return (
      <HoverCardPrimitive.Portal>
        <HoverCardPrimitive.Content
          ref={ref}
          side={placement}
          sideOffset={8}
          align="center"
          className={cn(
            "z-50",
            getGlassClasses(resolvedGlass, "bg-[var(--bg-primary)]", "border border-[var(--border-secondary)]"),
            "rounded-[var(--radius-md)]",
            "p-[var(--spacing-x4)]",
            // Open/close animations
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[side=bottom]:slide-in-from-top-2",
            "data-[side=top]:slide-in-from-bottom-2",
            "data-[side=left]:slide-in-from-right-2",
            "data-[side=right]:slide-in-from-left-2",
            className
          )}
          style={{ boxShadow: 'var(--shadow-xl)', width }}
          {...props}
        >
          {children}
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Portal>
    );
  }
);

HoverCardContent.displayName = 'HoverCardContent';
