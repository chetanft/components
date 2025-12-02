"use client";

import React, { useState, useCallback, useRef } from 'react';
import { cn } from '../../../lib/utils';
import { TableHeaderItem } from './TableHeaderItem';
import type { TableRow, TableColumn, SortDirection, TableVariant } from './Table';

const CHECKBOX_COLUMN_WIDTH_CLASS = 'w-[calc(var(--spacing-x9)*2)]';
const ACTIONS_COLUMN_WIDTH_CLASS = 'w-[calc(var(--spacing-x10)*2+var(--spacing-x5))]';

export interface TableHeaderProps<T extends TableRow = TableRow> {
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
}

export const TableHeader = <T extends TableRow = TableRow>({
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
  onColumnReorder
}: TableHeaderProps<T>) => {
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

  return (
    <thead>
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
    </thead>
  );
};

TableHeader.displayName = 'TableHeader';

