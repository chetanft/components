"use client";

import React, { useMemo } from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '../../../lib/utils';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipDescription } from '../Tooltip';
import { SliderProvider } from './SliderContext';
import { SliderTrack } from './SliderTrack';
import { SliderRange } from './SliderRange';
import { SliderThumb } from './SliderThumb';
import { SliderLabel } from './SliderLabel';

export interface SliderProps extends Omit<React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>, 'onChange' | 'defaultValue' | 'value' | 'onValueChange' | 'onValueCommit'> {
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
   * Change complete handler (on mouse up / keyboard commit)
   */
  onChangeComplete?: (value: number | [number, number]) => void;
  /**
   * Slider content (for composable API)
   */
  children?: React.ReactNode;
  /**
   * @deprecated Radix handles slot composition internally. Kept for API compatibility.
   */
  asChild?: boolean;
}

/**
 * Declarative thumb with tooltip support (used in non-composable mode)
 */
const DeclarativeThumb = ({
  tooltip,
  value,
  disabled,
}: {
  tooltip: SliderProps['tooltip'];
  value: number;
  disabled: boolean;
}) => {
  const [isActive, setIsActive] = React.useState(false);
  const showTooltip = tooltip && isActive;

  const tooltipValue = typeof tooltip === 'object' && tooltip.formatter
    ? tooltip.formatter(value)
    : value;

  const thumb = (
    <SliderPrimitive.Thumb
      className={cn(
        "block w-[var(--spacing-x4)] h-[var(--spacing-x4)]",
        "rounded-full bg-[var(--bg-primary)]",
        "border-2 border-[var(--primary)]",
        "shadow-md cursor-pointer",
        "transition-transform duration-100",
        "hover:scale-110 focus:scale-110",
        "focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-30",
        disabled && "cursor-not-allowed opacity-50"
      )}
      onPointerDown={() => setIsActive(true)}
      onPointerUp={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      onPointerEnter={() => setIsActive(true)}
      onPointerLeave={(e) => {
        if (!(e.target as HTMLElement).hasPointerCapture?.(e.pointerId)) {
          setIsActive(false);
        }
      }}
    />
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
};

/**
 * Slider Component
 *
 * A range input component for selecting values along a track.
 * Built on Radix UI Slider primitives for full keyboard and accessibility support.
 * Supports composable API with sub-components for flexible composition.
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
 * ```
 *
 * @remarks
 * - Composable API provides maximum flexibility and control
 * - Supports single value and range modes, vertical/horizontal orientations
 * - Full keyboard support via Radix: arrow keys, Home, End, Page Up/Down
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
    tooltip = true,
    trackColor,
    railColor,
    onChange,
    onChangeComplete,
    className,
    children,
    asChild: _asChild,
    ...props
  }, ref) => {
    // Track internal value for tooltip display in declarative mode
    const [internalValue, setInternalValue] = React.useState<number | [number, number]>(
      controlledValue !== undefined ? controlledValue : defaultValue
    );

    const actualValue = controlledValue !== undefined ? controlledValue : internalValue;

    // Convert value to Radix format (always array)
    const radixValue = useMemo<number[]>(() => {
      if (Array.isArray(actualValue)) {
        return actualValue;
      }
      return [actualValue];
    }, [actualValue]);

    // Convert defaultValue to Radix format
    const radixDefaultValue = useMemo<number[]>(() => {
      if (Array.isArray(defaultValue)) {
        return defaultValue;
      }
      return [defaultValue];
    }, [defaultValue]);

    // Handle Radix value change
    const handleValueChange = React.useCallback((values: number[]) => {
      if (range) {
        const rangeVal: [number, number] = [values[0], values[1]];
        setInternalValue(rangeVal);
        onChange?.(rangeVal);
      } else {
        setInternalValue(values[0]);
        onChange?.(values[0]);
      }
    }, [range, onChange]);

    // Handle Radix value commit (equivalent to onChangeComplete)
    const handleValueCommit = React.useCallback((values: number[]) => {
      if (range) {
        onChangeComplete?.([values[0], values[1]] as [number, number]);
      } else {
        onChangeComplete?.(values[0]);
      }
    }, [range, onChangeComplete]);

    // Check if using composable API (has children with Slider sub-components)
    const hasComposableChildren = React.Children.toArray(children).some((child: any) => {
      const childType = (child as any)?.type;
      const slot = childType?.slot;
      return typeof slot === 'string' && slot.startsWith('slider-');
    });

    // Create context value for sub-components
    const contextValue = useMemo(() => ({
      value: actualValue,
      min,
      max,
      step,
      range,
      vertical,
      disabled,
      tooltip,
      trackColor,
      railColor,
    }), [actualValue, min, max, step, range, vertical, disabled, tooltip, trackColor, railColor]);

    // Radix Root props shared between both APIs
    const rootProps = {
      ref,
      value: controlledValue !== undefined ? radixValue : undefined,
      defaultValue: controlledValue === undefined ? radixDefaultValue : undefined,
      onValueChange: handleValueChange,
      onValueCommit: handleValueCommit,
      min,
      max,
      step,
      orientation: vertical ? 'vertical' as const : 'horizontal' as const,
      disabled,
      className: cn(
        "relative flex touch-none select-none items-center",
        vertical ? "h-full w-[var(--spacing-x4)] flex-col" : "w-full h-[var(--spacing-x4)]",
        disabled && "opacity-50 cursor-not-allowed",
        className
      ),
      ...props,
    };

    // Composable API: children provide their own SliderTrack, SliderRange, SliderThumb, SliderLabel
    if (hasComposableChildren) {
      // Separate SliderLabel children from Radix-compatible children
      const radixChildren: React.ReactNode[] = [];
      const labelChildren: React.ReactNode[] = [];

      React.Children.forEach(children, (child: any) => {
        if ((child as any)?.type?.slot === 'slider-label') {
          labelChildren.push(child);
        } else {
          radixChildren.push(child);
        }
      });

      return (
        <SliderProvider value={contextValue}>
          <div className="relative" style={vertical ? { height: '100%' } : { width: '100%' }}>
            <SliderPrimitive.Root {...rootProps}>
              {radixChildren}
            </SliderPrimitive.Root>
            {labelChildren}
          </div>
        </SliderProvider>
      );
    }

    // Declarative API: render the full Radix tree internally
    // For range mode, derive thumb values from actualValue
    const rangeValues = Array.isArray(actualValue) ? actualValue : [actualValue];

    return (
      <SliderProvider value={contextValue}>
        <div className="relative" style={vertical ? { height: '100%' } : { width: '100%' }}>
          <SliderPrimitive.Root {...rootProps}>
            <SliderTrack>
              <SliderRange />
            </SliderTrack>

            {/* Render thumbs */}
            {range ? (
              <>
                <DeclarativeThumb tooltip={tooltip} value={rangeValues[0]} disabled={disabled} />
                <DeclarativeThumb tooltip={tooltip} value={rangeValues[1]} disabled={disabled} />
              </>
            ) : (
              <DeclarativeThumb tooltip={tooltip} value={rangeValues[0]} disabled={disabled} />
            )}
          </SliderPrimitive.Root>
        </div>
      </SliderProvider>
    );
  }
);

Slider.displayName = 'Slider';
