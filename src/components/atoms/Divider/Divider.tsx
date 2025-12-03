"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Typography } from '../Typography';
import { Slot, type ComposableProps } from '../../../lib/slot';

export type DividerType = 'primary' | 'secondary' | 'tertiary' | 'with-label';
export type DividerOrientation = 'left' | 'right' | 'center';

export interface DividerProps extends ComposableProps<'div'> {
  /**
   * The type of divider to display
   * @default 'primary'
   */
  type?: DividerType;
  /**
   * Label to display in the middle of the divider (only for type='with-label')
   */
  label?: React.ReactNode;
  /**
   * Direction of divider
   * @default 'horizontal'
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * Whether line is dashed
   */
  dashed?: boolean;
  /**
   * Position of title inside divider
   * @default 'center'
   */
  orientation?: DividerOrientation;
  /**
   * Margin for orientation
   */
  orientationMargin?: string | number;
  /**
   * Whether to be a normal text without line if plain
   */
  plain?: boolean;
  children?: React.ReactNode;
}

/**
 * Divider Component
 *
 * A divider component for separating content sections.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Divider type="primary" />
 * <Divider type="with-label" label="Section" />
 * <Divider direction="vertical" />
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Supports horizontal and vertical orientations.
 * - Supports labels for section dividers.
 */
export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({
    type = 'primary',
    label,
    direction = 'horizontal',
    dashed,
    orientation = 'center',
    plain,
    children,
    className,
    asChild,
    ...props
  }, ref) => {
    const content = children || label;
    const isVertical = direction === 'vertical';
    const isDashed = dashed || type === 'tertiary';
    const isWithLabel = type === 'with-label';

    // Determine border color based on type
    const borderColorClass = type === 'secondary'
      ? 'border-[var(--border-secondary)]'
      : 'border-[var(--border-primary)]';

    const Comp = asChild ? Slot : 'div';
    
    if (isVertical) {
      return (
        <Comp
          ref={ref}
          className={cn(
            "inline-block w-px h-[0.9em] mx-2 align-middle border-l",
            borderColorClass,
            isDashed && "border-dashed",
            className
          )}
          {...props}
        />
      );
    }

    // Horizontal with Content (with-label type)
    if (content || isWithLabel) {
      const labelContent = content || label;

      return (
        <Comp
          ref={ref}
          className={cn(
            "box-border flex items-center justify-between w-full m-0 p-0",
            'py-[var(--x4,16px)]',
            orientation === 'left' && "justify-start",
            orientation === 'right' && "justify-end",
            orientation === 'center' && "justify-between",
            className
          )}
          {...props}
        >
          {/* Left divider line */}
          <div
            className={cn(
              "h-px flex-1 border-t",
              'border-[var(--border-primary)]'
            )}
          />

          {/* Label */}
          <span className={cn(
            "inline-block shrink-0",
            plain ? "font-normal" : "font-medium"
          )}>
            {typeof labelContent === 'string' ? (
              <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)] border-solid rounded-full px-[8px] py-[2px] shrink-0">
                <Typography variant="body-secondary-medium" color="tertiary">
                  {labelContent}
                </Typography>
              </div>
            ) : labelContent}
          </span>

          {/* Right divider line */}
          <div
            className={cn(
              "h-px flex-1 border-t",
              'border-[var(--border-primary)]'
            )}
          />
        </Comp>
      );
    }

    // Simple Horizontal (primary, secondary, tertiary)
    return (
      <Comp
        ref={ref}
        className={cn(
          "box-border flex items-center w-full m-0 p-0",
          'py-[var(--x4,16px)]',
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "h-px w-full border-t",
            borderColorClass,
            isDashed && "border-dashed"
          )}
        />
      </Comp>
    );
  }
);

Divider.displayName = 'Divider';
