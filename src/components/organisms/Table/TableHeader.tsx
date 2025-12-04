"use client";

import React, { useState, useCallback, useRef } from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { TableHeaderItem } from './TableHeaderItem';
import type { TableRow as TableRowType, TableColumn, SortDirection, TableVariant } from './Table';

const CHECKBOX_COLUMN_WIDTH_CLASS = 'w-[calc(var(--spacing-x9)*2)]';
const ACTIONS_COLUMN_WIDTH_CLASS = 'w-[calc(var(--spacing-x10)*2+var(--spacing-x5))]';

/**
 * TableHeader component props
 * 
 * @public
 */
export interface TableHeaderProps<T extends TableRowType = TableRowType> extends Omit<ComposableProps<'thead'>, 'children'> {
  columns: TableColumn<T>[];
  variant?: TableVariant;
  selectable?: boolean;
  selectedRows?: (string | number)[];
  allRowIds?: (string | number)[];
  onSelectionChange?: (selectedRows: (string | number)[]) => void;
  onSort?: (column: string, direction: SortDirection) => void;
  sortColumn?: string;
  sortDirection?: SortDirection;
  hasRowActions?: boolean;
  rowActionsLabel?: string;
  cellSize?: 'md' | 'lg' | 'xl';
  reorderable?: boolean;
  onColumnReorder?: (columns: TableColumn<T>[]) => void;
  
  /**
   * Header content (for composable API)
   * Use TableRow and TableHead components
   */
  children?: React.ReactNode;
}

/**
 * TableHeader Component
 * 
 * A composable table header component that wraps the `<thead>` element.
 * Can be used in two ways:
 * 1. Composable API: Provide children with TableRow and TableHead components
 * 2. Declarative API: Provide columns prop (deprecated)
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Composable API (recommended)
 * <TableHeader>
 *   <TableRow>
 *     <TableHead>Name</TableHead>
 *     <TableHead sortable>Email</TableHead>
 *     <TableHead>Status</TableHead>
 *   </TableRow>
 * </TableHeader>
 * 
 * // Declarative API (deprecated)
 * <TableHeader columns={columns} onSort={handleSort} />
 * ```
 * 
 * @remarks
 * - Wraps the HTML `<thead>` element
 * - Supports `asChild` prop for custom element composition
 * - When using declarative API, automatically handles sorting and selection
 * - Use composable API for maximum flexibility and control
 */
export const TableHeader = <T extends TableRowType = TableRowType>({
  columns,
  variant = 'primary',
  selectable,
  selectedRows = [],
  allRowIds = [],
  onSelectionChange,
  onSort,
  sortColumn,
  sortDirection,
  hasRowActions = false,
  rowActionsLabel,
  cellSize = 'md',
  reorderable = false,
  onColumnReorder,
  children,
  className,
  asChild,
  ...props
}: TableHeaderProps<T>) => {
  // If children are provided, use composable API
  if (children) {
    const Comp = asChild ? Slot : 'thead';
    return (
      <Comp className={cn(className)} {...props}>
        {children}
      </Comp>
    );
  }
  const [draggedColumnIndex, setDraggedColumnIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dragStartIndexRef = useRef<number | null>(null);

  const isAllSelected = allRowIds.length > 0 && selectedRows.length === allRowIds.length;
  const isIndeterminate = selectedRows.length > 0 && selectedRows.length < allRowIds.length;

  const handleSelectAll = useCallback(() => {
    if (!onSelectionChange) return;

    if (isAllSelected) {
      onSelectionChange([]);
    } else {
      onSelectionChange(allRowIds);
    }
  }, [isAllSelected, allRowIds, onSelectionChange]);

  const handleSort = useCallback((column: TableColumn<T>) => {
    if (!column.sortable || !onSort) return;

    let newDirection: SortDirection = 'asc';
    if (sortColumn === column.key) {
      if (sortDirection === 'asc') {
        newDirection = 'desc';
      } else if (sortDirection === 'desc') {
        newDirection = null;
      }
    }

    onSort(column.key, newDirection);
  }, [sortColumn, sortDirection, onSort]);

  const handleDragStart = useCallback((index: number, e: React.DragEvent) => {
    if (!reorderable) return;
    dragStartIndexRef.current = index;
    setDraggedColumnIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', ''); // Required for Firefox
  }, [reorderable]);

  const handleDragOver = useCallback((index: number, e: React.DragEvent) => {
    if (!reorderable || draggedColumnIndex === null) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  }, [reorderable, draggedColumnIndex]);

  const handleDragLeave = useCallback(() => {
    setDragOverIndex(null);
  }, []);

  const handleDrop = useCallback((index: number, e: React.DragEvent) => {
    if (!reorderable || dragStartIndexRef.current === null || !onColumnReorder) return;
    e.preventDefault();
    
    const startIndex = dragStartIndexRef.current;
    if (startIndex === index) {
      setDraggedColumnIndex(null);
      setDragOverIndex(null);
      dragStartIndexRef.current = null;
      return;
    }

    const newColumns = [...columns];
    const [removed] = newColumns.splice(startIndex, 1);
    newColumns.splice(index, 0, removed);

    onColumnReorder(newColumns);
    setDraggedColumnIndex(null);
    setDragOverIndex(null);
    dragStartIndexRef.current = null;
  }, [reorderable, columns, onColumnReorder]);

  const handleDragEnd = useCallback(() => {
    setDraggedColumnIndex(null);
    setDragOverIndex(null);
    dragStartIndexRef.current = null;
  }, []);

  // Header color variant based on table variant - exact Figma mapping
  const headerColorVariant = variant === 'primary' ? 'dark25' : 'bg';

  const Comp = asChild ? Slot : 'thead';
  
  return (
    <Comp className={cn(className)} {...props}>
      <tr>
        {selectable && (
          <TableHeaderItem
            type="checkbox"
            colorVariant={headerColorVariant}
            size={cellSize}
            checkboxProps={{
              checked: isAllSelected,
              indeterminate: isIndeterminate,
              onChange: handleSelectAll
            }}
            className={CHECKBOX_COLUMN_WIDTH_CLASS}
          />
        )}
        {columns.map((column, index) => (
          <TableHeaderItem
            key={column.key}
            colorVariant={headerColorVariant}
            size={cellSize}
            sortable={column.sortable}
            draggable={reorderable}
            sortDirection={sortColumn === column.key ? sortDirection : null}
            onClick={() => column.sortable && handleSort(column)}
            className={cn(
              column.width && `w-[${column.width}]`,
              draggedColumnIndex === index && "opacity-50",
              dragOverIndex === index && "border-t-2 border-t-[var(--primary)]"
            )}
            onDragStart={(e) => handleDragStart(index, e)}
            onDragOver={(e) => handleDragOver(index, e)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(index, e)}
            onDragEnd={handleDragEnd}
          >
            {column.title || column.label || column.header}
          </TableHeaderItem>
        ))}
        {hasRowActions && (
          <TableHeaderItem
            colorVariant={headerColorVariant}
            size={cellSize}
            className={cn('text-right', ACTIONS_COLUMN_WIDTH_CLASS)}
          >
            {rowActionsLabel || ''}
          </TableHeaderItem>
        )}
      </tr>
    </Comp>
  );
};

TableHeader.displayName = 'TableHeader';

