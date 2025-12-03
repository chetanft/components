"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface DataEntryTableHeaderRowProps extends ComposableProps<'tr'> {
  /**
   * Row content (typically DataEntryTableHeaderCell components)
   */
  children: React.ReactNode;
}

/**
 * DataEntryTableHeaderRow Component
 *
 * A composable component for a header row in a data entry table.
 * Typically used within DataEntryTableHeader.
 *
 * @public
 *
 * @example
 * ```tsx
 * <DataEntryTableHeader>
 *   <DataEntryTableHeaderRow>
 *     <DataEntryTableHeaderCell>Column 1</DataEntryTableHeaderCell>
 *   </DataEntryTableHeaderRow>
 * </DataEntryTableHeader>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<tr>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 */
export const DataEntryTableHeaderRow = React.forwardRef<HTMLTableRowElement, DataEntryTableHeaderRowProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'tr';
    return (
      <Comp
        ref={ref}
        className={className}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

DataEntryTableHeaderRow.displayName = 'DataEntryTableHeaderRow';

