"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Typography } from '../../atoms/Typography';

export interface SimpleColumnCell {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: 'start' | 'end';
}

export interface SimpleColumnRow {
  id?: string | number;
  left: SimpleColumnCell;
  right: SimpleColumnCell;
  /**
   * Force highlight regardless of stripe order
   */
  accent?: boolean;
}

export interface SimpleColumnLayoutProps
  extends React.HTMLAttributes<HTMLDivElement> {
  headerLeft?: React.ReactNode;
  headerRight?: React.ReactNode;
  rows: SimpleColumnRow[];
  /**
   * Alternate row backgrounds to match Figma visual
   */
  striped?: boolean;
}

const ColumnCell = ({
  title,
  subtitle,
  align = 'start',
}: SimpleColumnCell) => (
  <div
    className={cn(
      'flex flex-col gap-[var(--x1,4px)]',
      align === 'end' && 'items-end text-right'
    )}
  >
    <Typography 
      variant="body-secondary-regular" 
      as="span"
      className="text-[var(--primary,#434f64)]"
    >
      {title}
    </Typography>
    {subtitle && (
      <Typography 
        variant="body-secondary-regular" 
        as="span"
        className="text-[var(--tertiary,#838c9d)] text-[12px]"
      >
        {subtitle}
      </Typography>
    )}
  </div>
);

export const SimpleColumnLayout = React.forwardRef<
  HTMLDivElement,
  SimpleColumnLayoutProps
>(
  (
    {
      headerLeft = 'Column header',
      headerRight = 'Column header',
      rows,
      striped = true,
      className,
      ...props
    },
    ref
  ) => {
    if (!rows?.length) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn('flex w-full flex-col gap-[var(--x2,8px)]', className)}
        {...props}
      >
        <div className="grid grid-cols-2 gap-4 rounded-[8px] bg-[var(--primary,#434f64)] px-4 py-3">
          <Typography variant="body-secondary-medium" className="text-[var(--bg_primary,#ffffff)]">
            {headerLeft}
          </Typography>
          <Typography variant="body-secondary-medium" className="text-[var(--bg_primary,#ffffff)] text-right">
            {headerRight}
          </Typography>
        </div>

        <div className="flex flex-col">
          {rows.map((row, index) => {
            const applyStripe = striped && index % 2 === 0;

            return (
              <div
                key={row.id ?? index}
                className={cn(
                  'grid grid-cols-2 gap-4 px-4 py-3',
                  (applyStripe || row.accent) &&
                    'bg-[var(--border_secondary,#f0f1f7)]'
                )}
              >
                <ColumnCell {...row.left} />
                <ColumnCell {...row.right} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

SimpleColumnLayout.displayName = 'SimpleColumnLayout';

export default SimpleColumnLayout;

