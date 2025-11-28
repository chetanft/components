"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Typography } from '../Typography';

export type DividerType = 'primary' | 'secondary' | 'tertiary' | 'with-label';
export type DividerOrientation = 'left' | 'right' | 'center';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
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

    if (isVertical) {
      return (
        <div
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
        <div
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
        </div>
      );
    }

    // Simple Horizontal (primary, secondary, tertiary)
    return (
      <div
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
      </div>
    );
  }
);

Divider.displayName = 'Divider';
