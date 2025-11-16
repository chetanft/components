"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Typography } from '../Typography';

export type DividerType = 'primary' | 'secondary' | 'tertiary' | 'with-label';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The type of divider to display
   * @default 'primary'
   */
  type?: DividerType;
  /**
   * Label to display in the middle of the divider (only for type='with-label')
   */
  label?: string;
}

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ type = 'primary', label, className, ...props }, ref) => {
    const baseStyles = 'flex items-center py-[var(--x4,16px)] w-full';
    
    const borderColorMap = {
      primary: 'border-[var(--border-primary,#ced1d7)]',
      secondary: 'border-[var(--border-secondary,#f0f1f7)]',
      tertiary: 'border-[var(--border-primary,#ced1d7)]',
      'with-label': 'border-[var(--border-primary,#ced1d7)]',
    };

    const borderColor = borderColorMap[type];

    if (type === 'with-label' && label) {
      return (
        <div
          ref={ref}
          className={cn(baseStyles, 'justify-between', className)}
          {...props}
        >
          <div className={cn('flex-[1_0_0] h-0 min-h-px min-w-px border-t', borderColor)} style={{ width: '253px' }} />
          <div className="bg-[var(--bg-primary,#ffffff)] border border-[var(--border-primary,#ced1d7)] rounded-full px-[8px] py-[2px] mx-0 shrink-0">
            <Typography variant="body-secondary-medium" color="tertiary">
              {label}
            </Typography>
          </div>
          <div className={cn('h-0 border-t shrink-0', borderColor)} style={{ width: '257px' }} />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(baseStyles, className)}
        {...props}
      >
        <div className={cn('flex-[1_0_0] h-0 min-h-px min-w-px border-t', borderColor)} />
      </div>
    );
  }
);

Divider.displayName = 'Divider'; 