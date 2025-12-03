"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface SkeletonTextProps extends ComposableProps<'div'> {
  /**
   * Number of lines to display
   * @default 1
   */
  lines?: number;
  /**
   * Width of each line
   */
  width?: string | number;
  /**
   * Animation type
   * @default 'pulse'
   */
  animation?: 'pulse' | 'wave' | 'none';
}

/**
 * SkeletonText Component
 *
 * A composable component for displaying text skeleton loaders.
 * Typically used within Skeleton or standalone.
 *
 * @public
 *
 * @example
 * ```tsx
 * <SkeletonText lines={3} width="100%" />
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically handles multiple lines with spacing.
 */
export const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ className, lines = 1, width, animation = 'pulse', asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    
    return (
      <Comp
        ref={ref}
        className={cn("flex flex-col gap-[var(--spacing-x2)]", className)}
        {...props}
      >
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-4 bg-[var(--color-bg-secondary)] rounded-[var(--radius-md)]",
              animation === 'pulse' && "animate-pulse",
              animation === 'wave' && "relative overflow-hidden skeleton-wave"
            )}
            style={{ width: index === lines - 1 && lines > 1 ? '75%' : width || '100%' }}
          />
        ))}
      </Comp>
    );
  }
);

SkeletonText.displayName = 'SkeletonText';

