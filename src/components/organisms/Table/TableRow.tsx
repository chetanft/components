"use client";

import React, { useState, useCallback } from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { Checkbox } from '../../atoms/Checkbox/Checkbox';
import { TableCell } from './TableCell';
import { TableCellText } from './TableCellText';
import type { TableRow as TableRowType, TableColumn, TableVariant } from './TableTypes';

const CHECKBOX_COLUMN_WIDTH_CLASS = 'w-[calc(var(--spacing-x9)*2)]';
const ACTIONS_COLUMN_WIDTH_CLASS = 'w-[calc(var(--spacing-x10)*2+var(--spacing-x5))]';

/**
 * TableRow component props
 * 
 * @public
 */
export interface TableRowProps<T extends TableRowType = TableRowType> extends ComposableProps<'tr'> {
  /**
   * Row data object
   */
  row?: T;
  
  /**
   * Column definitions (for declarative API compatibility)
   */
  columns?: TableColumn<T>[];
  
  /**
   * Row index (for styling)
   */
  index?: number;
  
  /**
   * Table variant
   * @default 'primary'
   */
  variant?: TableVariant;
  
  /**
   * Enable row selection
   * @default false
   */
  selectable?: boolean;
  
  /**
   * Whether row is selected
   * @default false
   */
  selected?: boolean;
  
  /**
   * Callback when selection changes
   */
  onSelectionChange?: (rowId: string | number, selected: boolean) => void;
  
  /**
   * Custom accessory content for row
   */
  rowAccessory?: (row: T, selected: boolean) => React.ReactNode;
  
  /**
   * Custom actions for row
   */
  rowActions?: (row: T) => React.ReactNode;
  
  /**
   * Cell size
   * @default 'md'
   */
  cellSize?: 'md' | 'lg' | 'xl';
  
  /**
   * Row content (for composable API)
   */
  children?: React.ReactNode;
}

/**
 * TableRow Component
 * 
 * A composable table row component that wraps the `<tr>` element.
 * Can be used in two ways:
 * 1. Composable API: Provide children with TableCell components (recommended)
 * 2. Declarative API: Provide row and columns props (deprecated)
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Composable API (recommended)
 * <TableRow>
 *   <TableCell>John Doe</TableCell>
 *   <TableCell>john@example.com</TableCell>
 *   <TableCell>
 *     <Badge variant="success">Active</Badge>
 *   </TableCell>
 * </TableRow>
 * 
 * // Declarative API (deprecated)
 * <TableRow row={rowData} columns={columns} />
 * ```
 * 
 * @remarks
 * - Wraps the HTML `<tr>` element
 * - Supports `asChild` prop for custom element composition
 * - Use composable API for maximum flexibility and control
 * - Automatically handles hover states and selection when using declarative API
 * - Accessible: maintains proper row semantics and ARIA attributes
 */
export const TableRow = <T extends TableRowType = TableRowType>({
  row,
  columns,
  index = 0,
  variant = 'primary',
  selectable = false,
  selected = false,
  onSelectionChange,
  rowAccessory,
  rowActions,
  cellSize = 'md',
  children,
  className,
  asChild,
  ...props
}: TableRowProps<T>) => {
  const [hoveredRowIndex, setHoveredRowIndex] = useState<boolean>(false);

  const handleSelect = useCallback(() => {
    if (!onSelectionChange || !row) return;
    onSelectionChange(row.id, !selected);
  }, [row, selected, onSelectionChange]);

  const renderCellContent = useCallback((column: TableColumn<T>, value: unknown) => {
    try {
      if (column.render) {
        return column.render(value, row!, index);
      }

      switch (column.type) {
        case 'number':
          return (
            <TableCellText type="primary">
              {typeof value === 'number' ? value.toLocaleString() : String(value ?? '')}
            </TableCellText>
          );

        case 'date':
          return (
            <TableCellText type="primary">
              {value instanceof Date ? value.toLocaleDateString() : String(value ?? '')}
            </TableCellText>
          );

        default:
          return (
            <TableCellText type="primary">
              {typeof value === 'string' ? value : String(value ?? '')}
            </TableCellText>
          );
      }
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Table: Error rendering cell content:', error, { column, value, row });
      }
      return (
        <TableCellText type="primary">
          -
        </TableCellText>
      );
    }
  }, [row, index]);

  // Determine cell background based on variant and row position
  const getCellBackground = (_columnIndex: number) => {
    if (variant === 'secondary') {
      return 'white'; // Secondary variant: all white
    }

    // Primary variant: alternating pattern based on row index
    // Even rows (0, 2, 4...) = white, Odd rows (1, 3, 5...) = bg
    return index % 2 === 0 ? 'white' : 'bg';
  };

  // If children are provided, use composable API
  if (children) {
    const Comp = asChild ? Slot : 'tr';
    return (
      <Comp
        aria-rowindex={index + 1}
        onMouseEnter={() => setHoveredRowIndex(true)}
        onMouseLeave={() => setHoveredRowIndex(false)}
        className={cn(className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }

  // Otherwise use declarative API with row + columns
  if (!row || !columns) {
    const Comp = asChild ? Slot : 'tr';
    return (
      <Comp
        aria-rowindex={index + 1}
        className={cn(className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }

  const actionCellIndex = columns.length + (selectable ? 1 : 0);
  const Comp = asChild ? Slot : 'tr';

  return (
    <Comp
      aria-rowindex={index + 1}
      onMouseEnter={() => setHoveredRowIndex(true)}
      onMouseLeave={() => setHoveredRowIndex(false)}
      className={cn(className)}
      {...props}
    >
      {selectable && (
        <TableCell
          type="checkbox"
          backgroundColor={getCellBackground(0)}
          lineVariant="single"
          size={cellSize}
          state={selected ? 'selected' : (hoveredRowIndex ? 'hover' : 'default')}
          className={CHECKBOX_COLUMN_WIDTH_CLASS}
          onClick={handleSelect}
        >
          <div
            className={cn(
              'flex w-full items-center justify-start',
              rowAccessory && 'gap-[var(--spacing-x2)]'
            )}
          >
            <Checkbox
              checked={selected}
              onChange={handleSelect}
              size="md"
            />
            {rowAccessory && rowAccessory(row, selected)}
          </div>
        </TableCell>
      )}
      {columns.map((column, columnIndex) => {
        const cellIndex = columnIndex + (selectable ? 1 : 0);
        let cellValue = row[column.key];

        // For secondary variant, extract only the first data point (before newline)
        if (variant === 'secondary' && typeof cellValue === 'string' && cellValue.includes('\n')) {
          cellValue = cellValue.split('\n')[0];
        }

        const hasNewlines = typeof cellValue === 'string' && cellValue.includes('\n');
        const hasSingleLine = !cellValue || (!hasNewlines && String(cellValue).length < 20);
        const lineVariant = variant === 'secondary' ? "single" : (hasSingleLine ? "single" : "double");

        return (
          <TableCell
            key={column.key}
            backgroundColor={getCellBackground(cellIndex)}
            lineVariant={lineVariant}
            size={cellSize}
            state={selected ? 'selected' : (hoveredRowIndex ? 'hover' : 'default')}
          >
            {renderCellContent(column, cellValue)}
          </TableCell>
        );
      })}
      {rowActions && (
        <TableCell
          backgroundColor={getCellBackground(actionCellIndex)}
          lineVariant="single"
          size={cellSize}
          state={selected ? 'selected' : (hoveredRowIndex ? 'hover' : 'default')}
          className={ACTIONS_COLUMN_WIDTH_CLASS}
        >
          <div className="flex items-center justify-end gap-[var(--spacing-x1)]">
            {rowActions(row)}
          </div>
        </TableCell>
      )}
    </Comp>
  );
};

TableRow.displayName = 'TableRow';
