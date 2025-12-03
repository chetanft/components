"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useDataEntryTableContext } from './DataEntryTableContext';

export interface DataEntryTableRowProps extends ComposableProps<'tr'> {
  /**
   * Row ID (unique identifier)
   */
  rowId: string | number;
  /**
   * Row content (typically DataEntryTableCell components)
   */
  children: React.ReactNode;
}

/**
 * DataEntryTableRow Component
 *
 * A composable component for a row in a data entry table.
 * Typically used within DataEntryTableBody.
 *
 * @public
 *
 * @example
 * ```tsx
 * <DataEntryTableBody>
 *   <DataEntryTableRow rowId="1">
 *     <DataEntryTableCell columnKey="name" value="John" />
 *   </DataEntryTableRow>
 * </DataEntryTableBody>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<tr>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically handles selection and hover states.
 */
export const DataEntryTableRow = React.forwardRef<HTMLTableRowElement, DataEntryTableRowProps>(
  ({ className, rowId, children, asChild, ...props }, ref) => {
    const { selectedRows, hoveredCell } = useDataEntryTableContext();
    
    const isSelected = selectedRows.includes(rowId);
    const isHovered = hoveredCell?.rowId === rowId;
    
    const Comp = asChild ? Slot : 'tr';
    return (
      <Comp
        ref={ref}
        className={cn(
          isSelected && "bg-[var(--border-secondary)]",
          isHovered && !isSelected && "bg-[var(--bg-secondary)]",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

DataEntryTableRow.displayName = 'DataEntryTableRow';

