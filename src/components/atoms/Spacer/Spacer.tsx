"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export type SpacerSize = 'x1' | 'x2' | 'x3' | 'x4' | 'x5' | 'x6' | 'x7' | 'x8' | 'x9' | 'x10' | 'x11' | 'x12';

export interface SpacerProps extends Omit<ComposableProps<'div'>, 'children'> {
  /**
   * Size of the spacer
   * @default 'x1'
   */
  size?: SpacerSize;
  /**
   * Whether the spacer is horizontal (width) or vertical (height)
   * @default false (vertical)
   */
  horizontal?: boolean;
}

const sizeMap: Record<SpacerSize, string> = {
  x1: 'h-[var(--x1,4px)]',
  x2: 'h-[var(--x2,8px)]',
  x3: 'h-[var(--x3,12px)]',
  x4: 'h-[var(--x4,16px)]',
  x5: 'h-[var(--x5,20px)]',
  x6: 'h-[var(--x6,24px)]',
  x7: 'h-[var(--x7,28px)]',
  x8: 'h-[var(--x8,32px)]',
  x9: 'h-[var(--x9,36px)]',
  x10: 'h-[var(--x10,40px)]',
  x11: 'h-[var(--x11,44px)]',
  x12: 'h-[var(--x12,48px)]',
};

const horizontalSizeMap: Record<SpacerSize, string> = {
  x1: 'w-[var(--x1,4px)]',
  x2: 'w-[var(--x2,8px)]',
  x3: 'w-[var(--x3,12px)]',
  x4: 'w-[var(--x4,16px)]',
  x5: 'w-[var(--x5,20px)]',
  x6: 'w-[var(--x6,24px)]',
  x7: 'w-[var(--x7,28px)]',
  x8: 'w-[var(--x8,32px)]',
  x9: 'w-[var(--x9,36px)]',
  x10: 'w-[var(--x10,40px)]',
  x11: 'w-[var(--x11,44px)]',
  x12: 'w-[var(--x12,48px)]',
};

/**
 * Spacer Component
 *
 * A spacer component for adding consistent spacing between elements.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Spacer size="x4" />
 * <Spacer size="x2" horizontal />
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Supports horizontal and vertical orientations.
 * - Uses FT Design System spacing tokens.
 */
export const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  ({ size = 'x1', horizontal = false, className, asChild, children, ...props }, ref) => {
    const sizeClass = horizontal ? horizontalSizeMap[size] : sizeMap[size];
    const baseClass = horizontal ? 'inline-block' : 'block';
    const combinedClassName = cn(baseClass, sizeClass, className);

    if (asChild) {
      return (
        <Slot
          ref={ref as any}
          className={combinedClassName}
          {...(props as any)}
        />
      );
    }

    return (
      <div
        ref={ref}
        className={combinedClassName}
        {...props}
      />
    );
  }
);

Spacer.displayName = 'Spacer';

