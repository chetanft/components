"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface SkeletonImageProps extends ComposableProps<'div'> {
  /**
   * Width of the image skeleton
   */
  width?: string | number;
  /**
   * Height of the image skeleton
   */
  height?: string | number;
  /**
   * Shape of the image skeleton
   * @default 'rectangular'
   */
  shape?: 'rectangular' | 'circular';
  /**
   * Animation type
   * @default 'pulse'
   */
  animation?: 'pulse' | 'wave' | 'none';
}

/**
 * SkeletonImage Component
 *
 * A composable component for displaying image skeleton loaders.
 * Typically used within Skeleton or standalone.
 *
 * @public
 *
 * @example
 * ```tsx
 * <SkeletonImage width={200} height={200} shape="circular" />
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Supports rectangular and circular shapes.
 */
export const SkeletonImage = React.forwardRef<HTMLDivElement, SkeletonImageProps>(
  ({ className, width, height, shape = 'rectangular', animation = 'pulse', asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    
    return (
      <Comp
        ref={ref}
        className={cn(
          "bg-[var(--color-bg-secondary)]",
          shape === 'circular' ? "rounded-full" : "rounded-[var(--radius-md)]",
          animation === 'pulse' && "animate-pulse",
          animation === 'wave' && "relative overflow-hidden skeleton-wave",
          className
        )}
        style={{ width: width || height, height: height || width }}
        {...props}
      />
    );
  }
);

SkeletonImage.displayName = 'SkeletonImage';

