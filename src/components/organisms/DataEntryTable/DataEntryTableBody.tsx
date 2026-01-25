"use client";

import React from 'react';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface DataEntryTableBodyProps extends ComposableProps<'tbody'> {
  /**
   * Body content (typically DataEntryTableRow components)
   */
  children: React.ReactNode;
  /**
   * Empty state message
   */
  emptyMessage?: React.ReactNode;
  /**
   * Number of columns (for empty state colspan)
   */
  columnCount?: number;
}

/**
 * DataEntryTableBody Component
 *
 * A composable component for the body section of a data entry table.
 * Typically used within DataEntryTable.
 *
 * @public
 *
 * @example
 * ```tsx
 * <DataEntryTable>
 *   <DataEntryTableBody>
 *     <DataEntryTableRow rowId="1">
 *       <DataEntryTableCell columnKey="name">John</DataEntryTableCell>
 *     </DataEntryTableRow>
 *   </DataEntryTableBody>
 * </DataEntryTable>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<tbody>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically shows empty state when no children are provided.
 */
export const DataEntryTableBody = React.forwardRef<HTMLTableSectionElement, DataEntryTableBodyProps>(
  ({ className, children, emptyMessage, columnCount, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'tbody';
    const hasChildren = React.Children.count(children) > 0;
    
    return (
      <Comp
        ref={ref}
        className={className}
        {...props}
      >
        {hasChildren ? children : (
          <tr>
            <td
              colSpan={columnCount || 1}
              className="px-[var(--spacing-x3)] py-[var(--spacing-x8)] text-center"
            >
              <span className="text-[var(--secondary)]">
                {emptyMessage || 'No data available'}
              </span>
            </td>
          </tr>
        )}
      </Comp>
    );
  }
);

DataEntryTableBody.displayName = 'DataEntryTableBody';

