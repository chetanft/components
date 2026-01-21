"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipDescription } from '../Tooltip';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useSliderContext } from './SliderContext';

export interface SliderThumbProps extends ComposableProps<'div'> {
  /**
   * Thumb value
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
 * Typically used within Slider.
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
 * - Automatically handles drag interactions and tooltip display.
 */
export const SliderThumb = React.forwardRef<HTMLDivElement, SliderThumbProps>(
  ({ className, children, value, type, asChild, onMouseDown, onMouseEnter, onMouseLeave, ...props }, ref) => {
    const {
      vertical,
      disabled,
      min,
      max,
      isDragging,
      setIsDragging,
      hoveredHandle,
      setHoveredHandle,
      tooltip,
      getPercent,
    } = useSliderContext();
    
    const position = getPercent(value);
    const isActive = isDragging === type || hoveredHandle === type;
    const showTooltip = tooltip && isActive;
    
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!disabled) setIsDragging(type);
      onMouseDown?.(e);
    };
    
    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      setHoveredHandle(type);
      onMouseEnter?.(e);
    };
    
    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      setHoveredHandle(null);
      onMouseLeave?.(e);
    };
    
    const thumbContent = children || (
      <div
        className={cn(
          "absolute w-[var(--spacing-x4)] h-[var(--spacing-x4)] left-1/2 top-1/2",
          "-translate-x-1/2 -translate-y-1/2 origin-center",
          "rounded-full bg-[var(--bg-primary)]",
          "border-2 border-[var(--primary)]",
          "shadow-md cursor-pointer z-20 pointer-events-auto",
          "transition-transform duration-100",
          "hover:scale-110 focus:scale-110",
          "focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-30",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
        style={vertical 
          ? { bottom: `${position}%`, left: '50%' }
          : { left: `${position}%`, top: '50%' }
        }
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        tabIndex={disabled ? -1 : 0}
        role="slider"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-disabled={disabled}
        {...props}
      />
    );
    
    if (asChild) {
      return (
        <Slot
          ref={ref}
          onMouseDown={handleMouseDown}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...props}
        >
          {thumbContent}
        </Slot>
      );
    }
    
    const tooltipValue = typeof tooltip === 'object' && tooltip.formatter
      ? tooltip.formatter(value)
      : value;
    
    return (
      <Tooltip open={showTooltip && !!tooltip}>
        <TooltipTrigger asChild>
          {thumbContent}
        </TooltipTrigger>
        <TooltipContent>
          <TooltipDescription>{String(tooltipValue)}</TooltipDescription>
        </TooltipContent>
      </Tooltip>
    );
  }
);

SliderThumb.displayName = 'SliderThumb';

