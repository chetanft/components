"use client";

import React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '../../../lib/utils';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipDescription } from '../Tooltip';
import { useSliderContext } from './SliderContext';

export interface SliderThumbProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Thumb> {
  /**
   * Thumb value (used for tooltip display; positioning is handled by Radix)
   */
  value: number;
  /**
   * Thumb type
   */
  type: 'start' | 'end';
  /**
   * Custom thumb content (when using asChild)
   */
  children?: React.ReactNode;
}

/**
 * SliderThumb Component
 *
 * A composable component for slider handles/thumbs.
 * Typically used within Slider. Renders as a Radix Slider.Thumb primitive.
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
 * - Wraps Radix UI Slider.Thumb primitive.
 * - Supports keyboard interaction (arrow keys) via Radix.
 * - Automatically handles tooltip display on hover/focus.
 */
export const SliderThumb = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Thumb>,
  SliderThumbProps
>(
  ({ className, children, value, type, ...props }, ref) => {
    const {
      disabled,
      tooltip,
    } = useSliderContext();

    const [isActive, setIsActive] = React.useState(false);
    const showTooltip = tooltip && isActive;

    const tooltipValue = typeof tooltip === 'object' && tooltip.formatter
      ? tooltip.formatter(value)
      : value;

    const thumb = (
      <SliderPrimitive.Thumb
        ref={ref}
        data-slot="slider-thumb"
        className={cn(
          "block w-[var(--spacing-x4)] h-[var(--spacing-x4)]",
          "rounded-full bg-[var(--bg-primary)]",
          "border-2 border-[var(--primary)]",
          "shadow-md cursor-pointer",
          "transition-transform duration-100",
          "hover:scale-110 focus:scale-110",
          "focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-30",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
        onPointerDown={() => setIsActive(true)}
        onPointerUp={() => setIsActive(false)}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        onPointerEnter={() => setIsActive(true)}
        onPointerLeave={(e) => {
          // Only deactivate on leave if not currently dragging (pointer not captured)
          if (!(e.target as HTMLElement).hasPointerCapture?.(e.pointerId)) {
            setIsActive(false);
          }
        }}
        {...props}
      >
        {children}
      </SliderPrimitive.Thumb>
    );

    if (!tooltip) {
      return thumb;
    }

    return (
      <Tooltip open={showTooltip && !!tooltip}>
        <TooltipTrigger asChild>
          {thumb}
        </TooltipTrigger>
        <TooltipContent>
          <TooltipDescription>{String(tooltipValue)}</TooltipDescription>
        </TooltipContent>
      </Tooltip>
    );
  }
);

SliderThumb.displayName = 'SliderThumb';
(SliderThumb as any).slot = 'slider-thumb';
