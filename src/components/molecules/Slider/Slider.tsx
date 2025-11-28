"use client";

import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { cn } from '../../../lib/utils';
import { Tooltip } from '../Tooltip';

export interface SliderMark {
  value: number;
  label?: React.ReactNode;
}

export interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Current value (single or range) */
  value?: number | [number, number];
  /** Default value */
  defaultValue?: number | [number, number];
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Enable range mode */
  range?: boolean;
  /** Vertical orientation */
  vertical?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Show marks */
  marks?: SliderMark[] | boolean;
  /** Show tooltip */
  tooltip?: boolean | { formatter?: (value: number) => React.ReactNode };
  /** Track color */
  trackColor?: string;
  /** Rail color */
  railColor?: string;
  /** Change handler */
  onChange?: (value: number | [number, number]) => void;
  /** Change complete handler (on mouse up) */
  onChangeComplete?: (value: number | [number, number]) => void;
}

/**
 * Slider component - Range input built with FT Design System tokens.
 * 
 * Features:
 * - Single value and range modes
 * - Vertical and horizontal orientations
 * - Marks with custom labels
 * - Tooltips on hover/drag
 * - Smooth hover animations with proper centering
 * - Custom track and rail colors
 * - Controlled and uncontrolled modes
 * 
 * Design Tokens:
 * - Track: var(--primary)
 * - Rail: var(--border-secondary)
 * - Handle: var(--bg-primary) with shadow
 * - Border radius: var(--radius-full)
 * 
 * Implementation Notes:
 * - Handle uses origin-center for proper hover scaling
 * - z-20 ensures handle stays above track
 * - pointer-events-none on track prevents event conflicts
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
    const handleRailClick = useCallback((e: React.MouseEvent) => {
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
                  "absolute text-[var(--font-size-sm)] text-[var(--tertiary)]",
                  vertical ? "-translate-y-1/2" : "-translate-x-1/2"
                )}
                style={vertical 
                  ? { bottom: `${percent}%` }
                  : { left: `${percent}%` }
                }
              >
                {mark.label ?? mark.value}
              </div>
            );
          })}
        </div>
      );
    };

    // Handle component
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

      if (showTooltip && tooltip) {
        const tooltipContent = typeof tooltip === 'object' && tooltip.formatter
          ? tooltip.formatter(value)
          : value;

        return (
          <Tooltip heading={String(tooltipContent)}>
            {handle}
          </Tooltip>
        );
      }

      return handle;
    };

    const startPercent = getPercent(rangeValue[0]);
    const endPercent = getPercent(rangeValue[1]);

    return (
      <div
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
        <div
          ref={sliderRef}
          className={cn(
            "absolute rounded-full cursor-pointer",
            vertical 
              ? "w-[var(--spacing-x1)] h-full left-1/2 -translate-x-1/2" 
              : "h-[var(--spacing-x1)] w-full top-1/2 -translate-y-1/2"
          )}
          style={{ backgroundColor: railColor || 'var(--border-secondary)' }}
          onClick={handleRailClick}
        >
          {/* Track (filled portion) */}
          <div
            className="absolute rounded-full pointer-events-none"
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
          />
        </div>

        {/* Handles */}
        {range && (
          <Handle position={startPercent} value={rangeValue[0]} type="start" />
        )}
        <Handle position={endPercent} value={rangeValue[1]} type="end" />

        {/* Marks */}
        {renderMarks()}
      </div>
    );
  }
);

Slider.displayName = 'Slider';
