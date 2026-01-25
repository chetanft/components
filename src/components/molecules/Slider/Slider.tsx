"use client";

import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { cn } from '../../../lib/utils';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipDescription } from '../Tooltip';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { SliderProvider } from './SliderContext';
import { SliderTrack } from './SliderTrack';
import { SliderRange } from './SliderRange';
import { SliderThumb } from './SliderThumb';
import { SliderLabel } from './SliderLabel';

export interface SliderMark {
  value: number;
  label?: React.ReactNode;
}

export interface SliderProps extends Omit<ComposableProps<'div'>, 'onChange' | 'defaultValue'> {
  /**
   * Current value (single or range) (controlled)
   */
  value?: number | [number, number];
  /**
   * Default value (uncontrolled)
   * @default 0
   */
  defaultValue?: number | [number, number];
  /**
   * Minimum value
   * @default 0
   */
  min?: number;
  /**
   * Maximum value
   * @default 100
   */
  max?: number;
  /**
   * Step increment
   * @default 1
   */
  step?: number;
  /**
   * Enable range mode
   * @default false
   */
  range?: boolean;
  /**
   * Vertical orientation
   * @default false
   */
  vertical?: boolean;
  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;
  /**
   * Show marks (for declarative API)
   * @deprecated Use SliderLabel components instead
   */
  marks?: SliderMark[] | boolean;
  /**
   * Show tooltip
   * @default true
   */
  tooltip?: boolean | { formatter?: (value: number) => React.ReactNode };
  /**
   * Track color
   */
  trackColor?: string;
  /**
   * Rail color
   */
  railColor?: string;
  /**
   * Change handler
   */
  onChange?: (value: number | [number, number]) => void;
  /**
   * Change complete handler (on mouse up)
   */
  onChangeComplete?: (value: number | [number, number]) => void;
  /**
   * Slider content (for composable API)
   */
  children?: React.ReactNode;
}

/**
 * Slider Component
 * 
 * A range input component for selecting values along a track.
 * Supports both composable API (recommended) and declarative API (deprecated).
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Composable API (recommended)
 * <Slider value={50} min={0} max={100} step={1}>
 *   <SliderTrack>
 *     <SliderRange />
 *   </SliderTrack>
 *   <SliderThumb value={50} type="end" />
 *   <SliderLabel value={0}>Min</SliderLabel>
 *   <SliderLabel value={100}>Max</SliderLabel>
 * </Slider>
 * 
 * // Declarative API (deprecated)
 * <Slider value={50} marks={true} />
 * ```
 * 
 * @remarks
 * - Composable API provides maximum flexibility and control
 * - All sub-components (SliderTrack, SliderRange, SliderThumb, etc.) support `asChild`
 * - Supports single value and range modes, vertical/horizontal orientations
 * - Declarative API is deprecated but still functional for backward compatibility
 * - Uses FT Design System tokens: var(--primary) for track, var(--border-secondary) for rail
 */
export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({
    value: controlledValue,
    defaultValue = 0,
    min = 0,
    max = 100,
    step = 1,
    range = false,
    vertical = false,
    disabled = false,
    marks = false,
    tooltip = true,
    trackColor,
    railColor,
    onChange,
    onChangeComplete,
    className,
    children,
    asChild,
    ...props
  }, ref) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [internalValue, setInternalValue] = useState<number | [number, number]>(
      controlledValue !== undefined ? controlledValue : defaultValue
    );
    const [isDragging, setIsDragging] = useState<'start' | 'end' | null>(null);
    const [hoveredHandle, setHoveredHandle] = useState<'start' | 'end' | null>(null);

    const actualValue = controlledValue !== undefined ? controlledValue : internalValue;

    // Normalize to range format
    const rangeValue = useMemo<[number, number]>(() => {
      if (Array.isArray(actualValue)) {
        return actualValue;
      }
      return [min, actualValue];
    }, [actualValue, min]);

    // Calculate percentage
    const getPercent = (val: number) => ((val - min) / (max - min)) * 100;

    // Calculate value from position
    const getValueFromPosition = useCallback((clientX: number, clientY: number): number => {
      if (!sliderRef.current) return min;

      const rect = sliderRef.current.getBoundingClientRect();
      let percent: number;

      if (vertical) {
        percent = 1 - (clientY - rect.top) / rect.height;
      } else {
        percent = (clientX - rect.left) / rect.width;
      }

      percent = Math.max(0, Math.min(1, percent));
      let value = min + percent * (max - min);

      // Snap to step
      value = Math.round(value / step) * step;
      value = Math.max(min, Math.min(max, value));

      return value;
    }, [min, max, step, vertical]);

    // Update value
    const updateValue = useCallback((newValue: number | [number, number]) => {
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    }, [controlledValue, onChange]);

    // Handle mouse/touch move
    const handleMove = useCallback((clientX: number, clientY: number) => {
      if (!isDragging || disabled) return;

      const newValue = getValueFromPosition(clientX, clientY);

      if (range) {
        const [start, end] = rangeValue;
        if (isDragging === 'start') {
          updateValue([Math.min(newValue, end), end]);
        } else {
          updateValue([start, Math.max(newValue, start)]);
        }
      } else {
        updateValue(newValue);
      }
    }, [isDragging, disabled, range, rangeValue, getValueFromPosition, updateValue]);

    // Mouse events
    useEffect(() => {
      if (!isDragging) return;

      const handleMouseMove = (e: MouseEvent) => {
        handleMove(e.clientX, e.clientY);
      };

      const handleMouseUp = () => {
        setIsDragging(null);
        onChangeComplete?.(actualValue);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }, [isDragging, handleMove, actualValue, onChangeComplete]);

    // Handle click on rail
    const _handleRailClick = useCallback((e: React.MouseEvent) => {
      if (disabled) return;

      const newValue = getValueFromPosition(e.clientX, e.clientY);

      if (range) {
        const [start, end] = rangeValue;
        const midpoint = (start + end) / 2;
        if (newValue < midpoint) {
          updateValue([newValue, end]);
        } else {
          updateValue([start, newValue]);
        }
      } else {
        updateValue(newValue);
      }
    }, [disabled, range, rangeValue, getValueFromPosition, updateValue]);

    // Generate marks
    const renderMarks = () => {
      if (!marks) return null;

      let markItems: SliderMark[] = [];

      if (marks === true) {
        // Auto-generate marks at min and max
        markItems = [
          { value: min },
          { value: max },
        ];
      } else {
        markItems = marks;
      }

      return (
        <div className={cn(
          "absolute",
          vertical 
            ? "left-full ml-[var(--spacing-x2)] top-0 bottom-0" 
            : "top-full mt-[var(--spacing-x2)] left-0 right-0"
        )}>
          {markItems.map((mark) => {
            const percent = getPercent(mark.value);
            return (
              <div
                key={mark.value}
                className={cn(
                  "absolute text-[var(--tertiary)]",
                  vertical ? "-translate-y-1/2" : "-translate-x-1/2"
                )}
                style={{
                  fontSize: 'var(--font-size-sm-rem)', // 14px → 1rem (responsive)
                  ...(vertical 
                  ? { bottom: `${percent}%` }
                    : { left: `${percent}%` })
                }
                }
              >
                {mark.label ?? mark.value}
              </div>
            );
          })}
        </div>
      );
    };

    const startPercent = getPercent(rangeValue[0]);
    const endPercent = getPercent(rangeValue[1]);
    
    // Check if using composable API (has children with Slider sub-components)
    const hasComposableChildren = React.Children.toArray(children).some((child: any) => 
        child?.type?.displayName?.startsWith('Slider')
    );
    
    // Create context value
    const contextValue = {
      value: actualValue,
      setValue: (newValue: number | [number, number]) => {
        if (controlledValue === undefined) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
      },
      min,
      max,
      step,
      range,
      vertical,
      disabled,
      marks,
      tooltip,
      trackColor,
      railColor,
      onChange,
      onChangeComplete,
      isDragging,
      setIsDragging,
      hoveredHandle,
      setHoveredHandle,
      sliderRef,
      getPercent,
      getValueFromPosition,
      rangeValue,
    };
    
    // If using composable API, render with context provider
    if (hasComposableChildren) {
        // Show deprecation warning if using old props with composable API
        if (process.env.NODE_ENV !== 'production' && marks) {
            console.warn(
                'Slider: Using deprecated props (marks) with composable API. ' +
                'Please use SliderLabel components instead. ' +
                'See migration guide: docs/migrations/composable-migration.md'
            );
        }
        
        const Comp = asChild ? Slot : 'div';
        return (
            <SliderProvider value={contextValue}>
                <Comp
                    ref={ref}
                    className={cn(
                        "relative",
                        vertical ? "h-full w-[var(--spacing-x4)]" : "w-full h-[var(--spacing-x4)]",
                        disabled && "opacity-50 cursor-not-allowed",
                        className
                    )}
                    {...props}
                >
                    {children}
                </Comp>
            </SliderProvider>
        );
    }
    
    // Otherwise use declarative API (deprecated)
    if (process.env.NODE_ENV !== 'production' && marks) {
        console.warn(
            'Slider: Declarative API (marks prop) is deprecated. ' +
            'Please migrate to composable API using SliderTrack, SliderRange, SliderThumb, and SliderLabel components. ' +
            'See migration guide: docs/migrations/composable-migration.md'
        );
    }
    
    // Handle component (for declarative API)
    const Handle = ({ 
      position, 
      value, 
      type 
    }: { 
      position: number; 
      value: number; 
      type: 'start' | 'end';
    }) => {
      const isActive = isDragging === type || hoveredHandle === type;
      const showTooltip = tooltip && isActive;

      const handle = (
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
            disabled && "cursor-not-allowed opacity-50"
          )}
          style={vertical 
            ? { bottom: `${position}%`, left: '50%' }
            : { left: `${position}%`, top: '50%' }
          }
          onMouseDown={(e) => {
            e.stopPropagation();
            if (!disabled) setIsDragging(type);
          }}
          onMouseEnter={() => setHoveredHandle(type)}
          onMouseLeave={() => setHoveredHandle(null)}
          tabIndex={disabled ? -1 : 0}
          role="slider"
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-disabled={disabled}
        />
      );

      const tooltipValue = typeof tooltip === 'object' && tooltip.formatter
        ? tooltip.formatter(value)
        : value;

      return (
        <Tooltip open={showTooltip && !!tooltip}>
          <TooltipTrigger asChild>
            {handle}
          </TooltipTrigger>
          <TooltipContent>
            <TooltipDescription>{String(tooltipValue)}</TooltipDescription>
          </TooltipContent>
        </Tooltip>
      );
    };
    
    const Comp = asChild ? Slot : 'div';
    return (
        <SliderProvider value={contextValue}>
            <Comp
                ref={ref}
                className={cn(
                    "relative",
                    vertical ? "h-full w-[var(--spacing-x4)]" : "w-full h-[var(--spacing-x4)]",
                    disabled && "opacity-50 cursor-not-allowed",
                    className
                )}
                {...props}
            >
                {/* Rail (background track) */}
                <SliderTrack ref={sliderRef}>
                    <SliderRange />
                </SliderTrack>

                {/* Handles */}
                {range && (
                    <Handle position={startPercent} value={rangeValue[0]} type="start" />
                )}
                <Handle position={endPercent} value={rangeValue[1]} type="end" />

                {/* Marks */}
                {renderMarks()}
            </Comp>
        </SliderProvider>
    );
  }
);

Slider.displayName = 'Slider';
