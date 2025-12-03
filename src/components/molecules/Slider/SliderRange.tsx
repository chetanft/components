"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useSliderContext } from './SliderContext';

export interface SliderRangeProps extends ComposableProps<'div'> {
  /**
   * Range content (optional).
   */
  children?: React.ReactNode;
}

/**
 * SliderRange Component
 *
 * A composable component for the filled portion of a Slider track.
 * Typically used within SliderTrack.
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
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically styled and positioned based on slider value and range mode.
 */
export const SliderRange = React.forwardRef<HTMLDivElement, SliderRangeProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const { vertical, trackColor, range, rangeValue, getPercent } = useSliderContext();
    
    const startPercent = getPercent(rangeValue[0]);
    const endPercent = getPercent(rangeValue[1]);
    
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn("absolute rounded-full pointer-events-none", className)}
        style={{
          backgroundColor: trackColor || 'var(--primary)',
          ...(vertical
            ? {
                width: '100%',
                bottom: range ? `${startPercent}%` : '0%',
                height: range ? `${endPercent - startPercent}%` : `${endPercent}%`,
              }
            : {
                height: '100%',
                left: range ? `${startPercent}%` : '0%',
                width: range ? `${endPercent - startPercent}%` : `${endPercent}%`,
              }),
        }}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

SliderRange.displayName = 'SliderRange';

