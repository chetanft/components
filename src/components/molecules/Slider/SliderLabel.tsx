"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useSliderContext } from './SliderContext';

export interface SliderLabelProps extends ComposableProps<'div'> {
  /**
   * Label value (for positioning)
   */
  value: number;
  /**
   * Label content
   */
  children?: React.ReactNode;
}

/**
 * SliderLabel Component
 *
 * A composable component for slider marks/labels.
 * Typically used within Slider for displaying marks.
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
 *   <SliderLabel value={0}>Min</SliderLabel>
 *   <SliderLabel value={100}>Max</SliderLabel>
 * </Slider>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically positioned based on value and vertical/horizontal orientation.
 */
export const SliderLabel = React.forwardRef<HTMLDivElement, SliderLabelProps>(
  ({ className, children, value, asChild, ...props }, ref) => {
    const { vertical, getPercent } = useSliderContext();
    
    const percent = getPercent(value);
    
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          "absolute text-[var(--tertiary)]",
          vertical ? "left-full ml-[var(--spacing-x2)] -translate-y-1/2" : "top-full mt-[var(--spacing-x2)] -translate-x-1/2",
          className
        )}
        style={{
          fontSize: 'var(--font-size-sm-rem)',
          ...(vertical 
            ? { bottom: `${percent}%` }
            : { left: `${percent}%` })
        }}
        {...props}
      >
        {children || value}
      </Comp>
    );
  }
);

SliderLabel.displayName = 'SliderLabel';

