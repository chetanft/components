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
      'flex flex-col gap-[var(--x1,4px)] items-start justify-center',
      align === 'end' && 'items-end text-right'
    )}
  >
    <Typography 
      variant="body-primary-regular" 
      as="p"
      className="whitespace-pre-wrap"
    >
      {title}
    </Typography>
    {subtitle && (
      <Typography 
        variant="body-primary-regular" 
        as="p"
        className="whitespace-pre-wrap"
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
        className={cn('flex w-full flex-col', className)}
        {...props}
      >
        {/* Header - matches Figma: bg-[var(--tertiary)], h-[48px], px-[var(--x2,8px)] py-[15px] */}
        <div className="bg-[var(--tertiary)] flex flex-col gap-[10px] h-[48px] items-start justify-center px-[var(--x2,8px)] py-[15px] w-full">
          <div className="flex gap-[var(--x1,4px)] h-[19px] items-center w-full">
            <Typography 
              variant="body-primary-semibold"
              className="text-[var(--color-bg-primary)]"
            >
              {headerLeft}
            </Typography>
            <Typography 
              variant="body-primary-semibold"
              className="ml-auto text-right text-[var(--color-bg-primary)]"
            >
              {headerRight}
            </Typography>
          </div>
        </div>

        {/* Rows - matches Figma: h-[96px], px-0 py-[var(--x5,20px)], alternating bg */}
        <div className="flex flex-col">
          {rows.map((row, index) => {
            // Alternating pattern: even indices (0, 2, 4...) = white, odd indices (1, 3, 5...) = gray
            const isEvenIndex = index % 2 === 0;
            const bgColor = striped 
              ? (isEvenIndex 
                  ? 'bg-[var(--bg-primary)]' 
                  : 'bg-[var(--bg-secondary)]')
              : (row.accent 
                  ? 'bg-[var(--bg-secondary)]' 
                  : 'bg-[var(--bg-primary)]');

            return (
              <div
                key={row.id ?? index}
                className={cn(
                  'border-[var(--border-primary)] border-b border-l-0 border-r-0 border-solid border-t-0',
                  'flex flex-col gap-[var(--x2,8px)] h-[96px] items-start justify-center px-0 py-[var(--x5,20px)] w-full',
                  bgColor
                )}
              >
                <div className="flex gap-[var(--x2,8px)] items-center px-[var(--x2,8px)] py-0 w-full">
                  <div className="flex flex-[1_0_0] flex-col gap-[var(--x1,4px)] items-start justify-center min-h-px min-w-px">
                    <ColumnCell {...row.left} />
                  </div>
                  <div className="flex flex-[1_0_0] flex-col gap-[var(--x1,4px)] items-start justify-center min-h-px min-w-px">
                    <ColumnCell {...row.right} />
                  </div>
                </div>
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
