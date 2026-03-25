"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { TableHeaderItem } from '../Table/TableHeaderItem';
import { useDataEntryTableContext } from './DataEntryTableContext';

export interface DataEntryTableHeaderCellProps extends ComposableProps<'th'> {
  /**
   * Column key (for resizing and identification)
   */
  columnKey?: string;
  /**
   * Column width
   */
  width?: string | number;
  /**
   * Cell content
   */
  children: React.ReactNode;
  /**
   * Whether this is a checkbox column
   */
  checkbox?: boolean;
  /**
   * Checkbox props (when checkbox is true)
   */
  checkboxProps?: {
    checked?: boolean;
    indeterminate?: boolean;
    onChange?: (checked: boolean) => void;
  };
}

/**
 * DataEntryTableHeaderCell Component
 *
 * A composable component for a header cell in a data entry table.
 * Typically used within DataEntryTableHeaderRow.
 *
 * @public
 *
 * @example
 * ```tsx
 * <DataEntryTableHeaderRow>
 *   <DataEntryTableHeaderCell columnKey="name" width="12.5rem">
 *     Name
 *   </DataEntryTableHeaderCell>
 * </DataEntryTableHeaderRow>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<th>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically handles column resizing when resizable is enabled.
 */
export const DataEntryTableHeaderCell = React.forwardRef<HTMLTableCellElement, DataEntryTableHeaderCellProps>(
  ({ className, columnKey, width, children, checkbox, checkboxProps, asChild, ...props }, ref) => {
    const { resizable, columnWidths, handleMouseDown } = useDataEntryTableContext();
    
    const effectiveWidth = resizable && columnKey && columnWidths[columnKey]
      ? `${columnWidths[columnKey]}px`
      : width || 'auto';
    
    if (checkbox) {
      const { draggable: _draggable, ...restProps } = props;
      return (
        <TableHeaderItem
          type="checkbox"
          colorVariant="bg"
          size="lg"
          checkboxProps={checkboxProps ? {
            ...checkboxProps,
            onChange: checkboxProps.onChange ? () => checkboxProps.onChange?.(true) : undefined
          } : undefined}
          className={cn("relative shrink-0", className)}
          style={{
            width: 'var(--spacing-x12)',
            height: '3.125rem',
            paddingLeft: 'var(--spacing-x5)',
            paddingRight: 'var(--spacing-x2)',
          }}
          {...(restProps as Record<string, unknown>)}
        />
      );
    }
    
    const Comp = asChild ? Slot : 'th';
    return (
      <>
        <Comp
          ref={ref}
          className={cn(
            "relative shrink-0",
            className
          )}
          style={{
            width: effectiveWidth,
            height: '3.125rem',
            paddingLeft: 'var(--spacing-x2)',
            paddingRight: 'var(--spacing-x2)',
          }}
          {...props}
        >
          {children}
        </Comp>
        {resizable && columnKey && (
          <th
            className="bg-transparent p-0 cursor-col-resize relative group"
            style={{ width: 'var(--spacing-x1)' }}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleMouseDown(columnKey, e);
            }}
          >
            <div
              className={cn(
                "absolute inset-y-0 w-full pointer-events-none",
                "group-hover:bg-[var(--primary)]"
              )}
              style={{ width: 'var(--spacing-x1)' }}
            />
          </th>
        )}
      </>
    );
  }
);

DataEntryTableHeaderCell.displayName = 'DataEntryTableHeaderCell';

