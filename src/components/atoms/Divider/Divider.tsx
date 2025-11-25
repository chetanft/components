"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Typography } from '../Typography';

export type DividerType = 'primary' | 'secondary' | 'tertiary' | 'with-label'; // Legacy
export type DividerOrientation = 'left' | 'right' | 'center';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The type of divider to display (Legacy)
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
   * (Ant Design concept, but here we might just map to simple style)
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
    orientationMargin,
    plain,
    children,
    className, 
    ...props 
  }, ref) => {
    // Determine content (children or label)
    const content = children || label;
    const isVertical = direction === 'vertical';
    const isDashed = dashed || type === 'tertiary'; // Map legacy tertiary to dashed

    const baseColorClass = type === 'secondary' 
      ? 'border-[var(--border-secondary,#f0f1f7)]' 
      : 'border-[var(--border-primary,#ced1d7)]';

    if (isVertical) {
      return (
        <div
          ref={ref}
          className={cn(
            "inline-block w-px h-[0.9em] mx-2 align-middle border-l",
            baseColorClass,
            isDashed && "border-dashed",
            className
          )}
          {...props}
        />
      );
    }

    // Horizontal with Content
    if (content) {
      return (
        <div
          ref={ref}
          className={cn(
            "flex w-full items-center whitespace-nowrap text-center m-0 p-0",
            orientation === 'left' && "justify-start",
            orientation === 'right' && "justify-end",
            orientation === 'center' && "justify-center",
            // Padding logic?
            'py-[var(--x4,16px)]',
            className
          )}
          {...props}
        >
          <div 
             className={cn(
               "relative top-[50%] border-t w-full min-w-[5%]", 
               baseColorClass,
               isDashed && "border-dashed"
             )} 
          />
          
          <span className={cn(
             "inline-block px-[1em]",
             plain ? "font-normal" : "font-medium"
          )}>
             {typeof content === 'string' ? (
                <div className="bg-[var(--bg-primary,#ffffff)] border border-[var(--border-primary,#ced1d7)] rounded-full px-[8px] py-[2px] mx-0 shrink-0">
                    <Typography variant="body-secondary-medium" color="tertiary">
                    {content}
                    </Typography>
                </div>
             ) : content}
          </span>
          
          <div 
             className={cn(
               "relative top-[50%] border-t w-full min-w-[5%]", 
               baseColorClass,
               isDashed && "border-dashed"
             )} 
          />
        </div>
      );
    }

    // Simple Horizontal
    return (
      <div
        ref={ref}
        className={cn(
            "flex clear-both w-full min-w-full my-[24px]", // Ant default margin
            'py-[var(--x4,16px)]', // Existing FT padding
            className
        )}
        {...props}
      >
        <div className={cn('w-full border-t', baseColorClass, isDashed && 'border-dashed')} />
      </div>
    );
  }
);

Divider.displayName = 'Divider';
