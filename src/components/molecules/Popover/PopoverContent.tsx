"use client";

import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '../../../lib/utils';
import { useResolvedGlass, getGlassClasses, type GlassVariant } from '../../../lib/glass';
import type { ComposableProps } from '../../../lib/slot';

export interface PopoverContentProps extends ComposableProps<'div'> {
  /**
   * The popover content.
   */
  children?: React.ReactNode;
  /**
   * Preferred side of the trigger to render against.
   * @default 'bottom'
   */
  side?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * Preferred alignment against the trigger.
   * @default 'center'
   */
  align?: 'start' | 'center' | 'end';
  /**
   * Distance in pixels from the trigger.
   * @default 4
   */
  sideOffset?: number;
  /**
   * Apply glassmorphism effect to the popover surface.
   * @default false
   */
  glass?: GlassVariant;
}

/**
 * PopoverContent Component
 *
 * A composable component for the popover content panel.
 * Renders in a portal with collision detection and animations.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverTrigger>
 *     <Button>Open</Button>
 *   </PopoverTrigger>
 *   <PopoverContent side="bottom" align="center">
 *     <p>Content goes here</p>
 *   </PopoverContent>
 * </Popover>
 * ```
 *
 * @remarks
 * - Renders inside a portal to avoid overflow clipping.
 * - Uses Radix collision detection to stay within the viewport.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Animated with fade, zoom, and slide transitions.
 */
export const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ className, children, side = 'bottom', align = 'center', sideOffset = 4, glass, asChild: _asChild, ...props }, ref) => {
    const resolvedGlass = useResolvedGlass(glass);

    const bgClass = resolvedGlass
      ? getGlassClasses(resolvedGlass, '', '')
      : 'bg-[var(--bg-primary)] border border-[var(--border-secondary)]';

    const contentClasses = cn(
      'z-50 rounded-[var(--radius-md)] p-[var(--spacing-x4)] min-w-[var(--spacing-x20)] shadow-md outline-none',
      bgClass,
      'text-[var(--primary)]',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
      'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
      'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    );

    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          ref={ref}
          className={contentClasses}
          side={side}
          align={align}
          sideOffset={sideOffset}
          data-slot="popover-content"
          {...props}
        >
          {children}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    );
  }
);

PopoverContent.displayName = 'PopoverContent';
