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
  x1: 'h-[var(--spacing-x1)]',
  x2: 'h-[var(--spacing-x2)]',
  x3: 'h-[var(--spacing-x3)]',
  x4: 'h-[var(--spacing-x4)]',
  x5: 'h-[var(--spacing-x5)]',
  x6: 'h-[var(--spacing-x6)]',
  x7: 'h-[var(--spacing-x7)]',
  x8: 'h-[var(--spacing-x8)]',
  x9: 'h-[var(--spacing-x9)]',
  x10: 'h-[var(--spacing-x10)]',
  x11: 'h-[var(--spacing-x11)]',
  x12: 'h-[var(--spacing-x12)]',
};

const horizontalSizeMap: Record<SpacerSize, string> = {
  x1: 'w-[var(--spacing-x1)]',
  x2: 'w-[var(--spacing-x2)]',
  x3: 'w-[var(--spacing-x3)]',
  x4: 'w-[var(--spacing-x4)]',
  x5: 'w-[var(--spacing-x5)]',
  x6: 'w-[var(--spacing-x6)]',
  x7: 'w-[var(--spacing-x7)]',
  x8: 'w-[var(--spacing-x8)]',
  x9: 'w-[var(--spacing-x9)]',
  x10: 'w-[var(--spacing-x10)]',
  x11: 'w-[var(--spacing-x11)]',
  x12: 'w-[var(--spacing-x12)]',
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
  (props, ref) => {
    const { size = 'x1', horizontal = false, className, asChild, ...htmlProps } = props;
    const sizeClass = horizontal ? horizontalSizeMap[size] : sizeMap[size];
    const baseClass = horizontal ? 'inline-block' : 'block';
    const combinedClassName = cn(baseClass, sizeClass, className);

    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={combinedClassName}
          {...htmlProps}
        />
      );
    }

    return (
      <div
        ref={ref}
        className={combinedClassName}
        {...htmlProps}
      />
    );
  }
);

Spacer.displayName = 'Spacer';

