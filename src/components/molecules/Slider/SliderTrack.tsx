"use client";

import React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '../../../lib/utils';
import { useSliderContext } from './SliderContext';

export interface SliderTrackProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Track> {
  /**
   * Track content (typically SliderRange).
   */
  children?: React.ReactNode;
  /**
   * @deprecated Use asChild on the parent Slider instead. Kept for API compatibility.
   */
  asChild?: boolean;
}

/**
 * SliderTrack Component
 *
 * A composable component for the rail/background track of a Slider.
 * Typically wraps SliderRange. Renders as a Radix Slider.Track primitive.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Slider value={50}>
 *   <SliderTrack>
 *     <SliderRange />
 *   </SliderTrack>
 *   <SliderThumb value={50} type="end" />
 * </Slider>
 * ```
 *
 * @remarks
 * - Wraps Radix UI Slider.Track primitive.
 * - Automatically styled based on vertical/horizontal orientation.
 */
export const SliderTrack = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Track>,
  SliderTrackProps
>(
  ({ className, children, ...props }, ref) => {
    const { vertical, railColor } = useSliderContext();

    return (
      <SliderPrimitive.Track
        ref={ref}
        data-slot="slider-track"
        className={cn(
          "relative rounded-full cursor-pointer overflow-hidden",
          vertical
            ? "w-[var(--spacing-x1)] h-full"
            : "h-[var(--spacing-x1)] w-full",
          className
        )}
        style={{ backgroundColor: railColor || 'var(--border-secondary)' }}
        {...props}
      >
        {children}
      </SliderPrimitive.Track>
    );
  }
);

SliderTrack.displayName = 'SliderTrack';
(SliderTrack as any).slot = 'slider-track';
