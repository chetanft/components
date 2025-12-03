"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useRateContext } from './RateContext';
import { RateIcon } from './RateIcon';

export interface RateItemProps extends ComposableProps<'div'> {
  /**
   * Star index (0-based)
   */
  index: number;
  /**
   * Custom content (optional)
   */
  children?: React.ReactNode;
}

/**
 * RateItem Component
 *
 * A composable component for individual star items in a Rate component.
 * Typically wraps RateIcon.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Rate value={3} count={5}>
 *   {Array.from({ length: 5 }, (_, i) => (
 *     <RateItem key={i} index={i}>
 *       <RateIcon />
 *     </RateItem>
 *   ))}
 * </Rate>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically handles click and hover events.
 */
export const RateItem = React.forwardRef<HTMLDivElement, RateItemProps>(
  ({ className, children, index, asChild, ...props }, ref) => {
    const {
      value,
      setValue,
      hoverValue,
      setHoverValue,
      allowHalf,
      allowClear,
      disabled,
      readOnly,
      tooltips,
      onChange,
      onHoverChange,
    } = useRateContext();
    
    const starValue = index + 1;
    const halfValue = index + 0.5;
    
    const displayValue = hoverValue !== null ? hoverValue : value;
    
    // Calculate fill state
    let fillState: 'full' | 'half' | 'empty' = 'empty';
    if (displayValue >= starValue) {
      fillState = 'full';
    } else if (allowHalf && displayValue >= halfValue) {
      fillState = 'half';
    }
    
    const handleClick = () => {
      if (disabled || readOnly) return;
      
      let newValue = starValue;
      
      // If clicking the same value and allowClear, reset to 0
      if (allowClear && starValue === value) {
        newValue = 0;
      }
      
      setValue(newValue);
      onChange?.(newValue);
    };
    
    const handleHover = (starValue: number | null) => {
      if (disabled || readOnly) return;
      setHoverValue(starValue);
      if (starValue !== null) {
        onHoverChange?.(starValue);
      }
    };
    
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!allowHalf || disabled || readOnly) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const isLeftHalf = e.clientX - rect.left < rect.width / 2;
      handleHover(isLeftHalf ? halfValue : starValue);
    };
    
    const content = children || <RateIcon fillState={fillState} index={index} />;
    
    const tooltipContent = tooltips && tooltips[index] ? (
      <span title={tooltips[index]}>
        {content}
      </span>
    ) : content;
    
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          "relative inline-flex cursor-pointer transition-transform duration-100",
          !disabled && !readOnly && "hover:scale-110",
          disabled && "cursor-not-allowed opacity-50",
          readOnly && "cursor-default",
          className
        )}
        onClick={handleClick}
        onMouseEnter={() => handleHover(starValue)}
        onMouseMove={handleMouseMove}
        {...props}
      >
        {tooltipContent}
      </Comp>
    );
  }
);

RateItem.displayName = 'RateItem';

