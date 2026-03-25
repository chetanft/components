"use client";

import React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '../../../lib/utils';
import { useSliderContext } from './SliderContext';

export interface SliderRangeProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Range> {
  /**
   * Range content (optional).
   */
  children?: React.ReactNode;
  /**
   * @deprecated Use asChild on the parent Slider instead. Kept for API compatibility.
   */
  asChild?: boolean;
}

/**
 * SliderRange Component
 *
 * A composable component for the filled portion of a Slider track.
 * Typically used within SliderTrack. Renders as a Radix Slider.Range primitive.
 *
 * @public
 *
 * @example
 * ```tsx
 * <SliderTrack>
 *   <SliderRange />
 * </SliderTrack>
 * ```
 *
 * @remarks
 * - Wraps Radix UI Slider.Range primitive.
 * - Automatically styled and positioned based on slider value and range mode.
 */
export const SliderRange = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Range>,
  SliderRangeProps
>(
  ({ className, ...props }, ref) => {
    const { trackColor } = useSliderContext();

    return (
      <SliderPrimitive.Range
        ref={ref}
        data-slot="slider-range"
        className={cn("absolute rounded-full", className)}
        style={{
          backgroundColor: trackColor || 'var(--primary)',
        }}
        {...props}
      />
    );
  }
);

SliderRange.displayName = 'SliderRange';
(SliderRange as any).slot = 'slider-range';
