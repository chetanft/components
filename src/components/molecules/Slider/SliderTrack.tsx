"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useSliderContext } from './SliderContext';

export interface SliderTrackProps extends ComposableProps<'div'> {
  /**
   * Track content (typically SliderRange).
   */
  children?: React.ReactNode;
}

/**
 * SliderTrack Component
 *
 * A composable component for the rail/background track of a Slider.
 * Typically wraps SliderRange.
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
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically styled based on vertical/horizontal orientation.
 */
export const SliderTrack = React.forwardRef<HTMLDivElement, SliderTrackProps>(
  ({ className, children, asChild, onClick, ...props }, ref) => {
    const { vertical, railColor, getValueFromPosition, range, rangeValue, setValue } = useSliderContext();
    
    const handleRailClick = (e: React.MouseEvent<HTMLDivElement>) => {
      const newValue = getValueFromPosition(e.clientX, e.clientY);
      
      if (range) {
        const [start, end] = rangeValue;
        const midpoint = (start + end) / 2;
        if (newValue < midpoint) {
          setValue([newValue, end]);
        } else {
          setValue([start, newValue]);
        }
      } else {
        setValue(newValue);
      }
      
      onClick?.(e);
    };
    
    const Comp = asChild ? Slot : 'div';
    // Cast children to exclude bigint which Slot doesn't accept
    const safeChildren = children as Exclude<React.ReactNode, bigint> | undefined;
    
    return (
      <Comp
        ref={ref}
        className={cn(
          "absolute rounded-full cursor-pointer",
          vertical 
            ? "w-[var(--spacing-x1)] h-full left-1/2 -translate-x-1/2" 
            : "h-[var(--spacing-x1)] w-full top-1/2 -translate-y-1/2",
          className
        )}
        style={{ backgroundColor: railColor || 'var(--border-secondary)' }}
        onClick={handleRailClick}
        {...props}
      >
        {safeChildren}
      </Comp>
    );
  }
);

SliderTrack.displayName = 'SliderTrack';

