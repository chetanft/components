"use client";

import React from 'react';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface DataEntryTableHeaderProps extends ComposableProps<'thead'> {
  /**
   * Header content (typically DataEntryTableHeaderRow components)
   */
  children: React.ReactNode;
}

/**
 * DataEntryTableHeader Component
 *
 * A composable component for the header section of a data entry table.
 * Typically used within DataEntryTable.
 *
 * @public
 *
 * @example
 * ```tsx
 * <DataEntryTable>
 *   <DataEntryTableHeader>
 *     <DataEntryTableHeaderRow>
 *       <DataEntryTableHeaderCell>Column 1</DataEntryTableHeaderCell>
 *     </DataEntryTableHeaderRow>
 *   </DataEntryTableHeader>
 * </DataEntryTable>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<thead>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 */
export const DataEntryTableHeader = React.forwardRef<HTMLTableSectionElement, DataEntryTableHeaderProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'thead';
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

DataEntryTableHeader.displayName = 'DataEntryTableHeader';

