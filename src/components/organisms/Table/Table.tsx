"use client";

import React, { useState, useCallback } from 'react';
import { cn } from '../../../lib/utils';
import { Checkbox } from '../../atoms/Checkbox/Checkbox';
import { Button } from '../../atoms/Button/Button';
import { Badge } from '../../atoms/Badge/Badge';
import { Icon, IconName } from '../../atoms/Icons';
import { TableCellText } from './TableCellText';
import { TableCellItem } from './TableCellItem';
import { TableCell } from './TableCell';
import { TableHeaderItem } from './TableHeaderItem';

// Table types
export type SortDirection = 'asc' | 'desc' | null;
export type ColumnType = 'text' | 'number' | 'date' | 'actions';
export type TableVariant = 'primary' | 'secondary';

export interface TableColumn<T = any> {
  key: string;
  title: string;
  type?: ColumnType;
  sortable?: boolean;
  width?: string;
  render?: (value: any, row: T, index: number) => React.ReactNode;
}

export interface TableRow {
  id: string | number;
  [key: string]: any;
}

export interface TableProps<T extends TableRow = TableRow> {
  columns: TableColumn<T>[];
  data: T[];
  variant?: TableVariant;
  selectable?: boolean;
  selectedRows?: (string | number)[];
  onSelectionChange?: (selectedRows: (string | number)[]) => void;
  onSort?: (column: string, direction: SortDirection) => void;
  sortColumn?: string;
  sortDirection?: SortDirection;
  rowAccessory?: (row: T, selected: boolean) => React.ReactNode;
  rowActions?: (row: T) => React.ReactNode;
  rowActionsLabel?: string;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

// Table Header Component
interface TableHeaderProps<T extends TableRow = TableRow> {
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
}

const ACTIONS_COLUMN_WIDTH_CLASS = 'w-[132px]';

const TableHeader = <T extends TableRow = TableRow>({
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
  cellSize = 'md'
}: TableHeaderProps<T>) => {
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
            className="w-[92px]" // Exact width from Figma
          />
        )}
        {columns.map((column) => (
          <TableHeaderItem
            key={column.key}
            colorVariant={headerColorVariant}
            size={cellSize}
            sortable={column.sortable}
            sortDirection={sortColumn === column.key ? sortDirection : null}
            onClick={() => column.sortable && handleSort(column)}
            className={cn(
              column.width && `w-[${column.width}]`
            )}
          >
            {column.title}
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

// Table Row Component
interface TableRowProps<T extends TableRow = TableRow> {
  row: T;
  columns: TableColumn<T>[];
  index: number;
  variant?: TableVariant;
  selectable?: boolean;
  selected?: boolean;
  onSelectionChange?: (rowId: string | number, selected: boolean) => void;
  rowAccessory?: (row: T, selected: boolean) => React.ReactNode;
  rowActions?: (row: T) => React.ReactNode;
  cellSize?: 'md' | 'lg' | 'xl';
}

const TableRowComponent = <T extends TableRow = TableRow>({
  row,
  columns,
  index,
  variant = 'primary',
  selectable,
  selected = false,
  onSelectionChange,
  rowAccessory,
  rowActions,
  cellSize = 'md'
}: TableRowProps<T>) => {
  const [hoveredRowIndex, setHoveredRowIndex] = useState<boolean>(false);
  
  const handleSelect = useCallback(() => {
    if (!onSelectionChange) return;
    onSelectionChange(row.id, !selected);
  }, [row.id, selected, onSelectionChange]);

  const renderCellContent = useCallback((column: TableColumn<T>, value: any) => {
    try {
      if (column.render) {
        return column.render(value, row, index);
      }

      switch (column.type) {
        case 'number':
          return (
            <TableCellText type="primary">
              {typeof value === 'number' ? value.toLocaleString() : (value ?? '')}
            </TableCellText>
          );
        
        case 'date':
          return (
            <TableCellText type="primary">
              {value instanceof Date ? value.toLocaleDateString() : (value ?? '')}
            </TableCellText>
          );
        
        default:
          return (
            <TableCellText type="primary">
              {value ?? ''}
            </TableCellText>
          );
      }
    } catch (error) {
      console.warn('Table: Error rendering cell content:', error, { column, value, row });
      return (
        <TableCellText type="primary">
          -
        </TableCellText>
      );
    }
  }, [row, index]);

  // Determine cell background based on variant and row position
  const getCellBackground = (columnIndex: number) => {
    if (variant === 'secondary') {
      return 'white'; // Secondary variant: all white
    }
    
    // Primary variant: alternating pattern based on row index
    // Even rows (0, 2, 4...) = white, Odd rows (1, 3, 5...) = bg
    return index % 2 === 0 ? 'white' : 'bg';
  };
  
  const actionCellIndex = columns.length + (selectable ? 1 : 0);

  return (
    <tr 
      onMouseEnter={() => setHoveredRowIndex(true)}
      onMouseLeave={() => setHoveredRowIndex(false)}
    >
      {selectable && (
        <TableCell 
          backgroundColor={getCellBackground(0)}
          lineVariant="single"
          size={cellSize}
          state={selected ? 'selected' : (hoveredRowIndex ? 'hover' : 'default')}
          className="w-[92px]" // Exact width from Figma
          onClick={handleSelect}
        >
          <div
            className={cn(
              'flex w-full items-center justify-center',
              rowAccessory && 'gap-[var(--x1,4px)]'
            )}
          >
            <Checkbox
              checked={selected}
              onChange={handleSelect}
              size="md"
            />
            {rowAccessory && (
              <div className="flex items-center justify-center">
                {rowAccessory(row, selected)}
              </div>
            )}
          </div>
        </TableCell>
      )}
      {columns.map((column, columnIndex) => {
        const cellIndex = columnIndex + (selectable ? 1 : 0);
        // Determine if this cell should have multiple lines based on content
        const hasSingleLine = !row[column.key] || String(row[column.key]).length < 20;
        
        return (
          <TableCell 
            key={column.key} 
            backgroundColor={getCellBackground(cellIndex)}
            lineVariant={hasSingleLine ? "single" : "double"}
            size={cellSize}
            state={selected ? 'selected' : (hoveredRowIndex ? 'hover' : 'default')}
          >
            {renderCellContent(column, row[column.key])}
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
          <div className="flex items-center justify-end gap-[var(--x1,4px)]">
            {rowActions(row)}
          </div>
        </TableCell>
      )}
    </tr>
  );
};

// Main Table Component
export const Table = <T extends TableRow = TableRow>({
  columns,
  data,
  variant = 'primary',
  selectable = false,
  selectedRows = [],
  onSelectionChange,
  onSort,
  sortColumn,
  sortDirection,
  rowAccessory,
  rowActions,
  rowActionsLabel = 'Actions',
  loading = false,
  emptyMessage,
  className
}: TableProps<T>) => {
  // Defensive programming: ensure all rows have valid IDs
  const validatedData = data.filter(row => {
    if (row.id === undefined || row.id === null) {
      console.warn('Table: Row missing required "id" property:', row);
      return false;
    }
    return true;
  });

  const allRowIds = validatedData.map(row => row.id);

  // Determine cell size based on data density
  const cellSize = data.length > 20 ? 'md' : (data.length > 10 ? 'lg' : 'xl');

  const handleRowSelectionChange = useCallback((rowId: string | number, selected: boolean) => {
    if (!onSelectionChange) return;
    
    let newSelectedRows: (string | number)[];
    if (selected) {
      newSelectedRows = [...selectedRows, rowId];
    } else {
      newSelectedRows = selectedRows.filter(id => id !== rowId);
    }
    
    onSelectionChange(newSelectedRows);
  }, [selectedRows, onSelectionChange]);

  if (loading) {
    return null;
  }

  return (
    <div className={cn("border border-[var(--border-primary)] rounded-[var(--x2,8px)] overflow-hidden bg-[var(--bg-primary)]", className)}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <TableHeader
            columns={columns}
            variant={variant}
            selectable={selectable}
            selectedRows={selectedRows}
            allRowIds={allRowIds}
            onSelectionChange={onSelectionChange}
            onSort={onSort}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            hasRowActions={Boolean(rowActions)}
            rowActionsLabel={rowActions ? rowActionsLabel : undefined}
            cellSize={cellSize}
          />
          <tbody>
            {validatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="px-[var(--x3,12px)] py-[var(--x8,32px)] text-center"
                >
                  <TableCellText type="secondary">
                    {emptyMessage || "No data available"}
                  </TableCellText>
                </td>
              </tr>
            ) : (
              validatedData.map((row, index) => (
                <TableRowComponent
                  key={row.id}
                  row={row}
                  columns={columns}
                  index={index}
                  variant={variant}
                  selectable={selectable}
                  selected={selectedRows.includes(row.id)}
                  onSelectionChange={handleRowSelectionChange}
                  rowAccessory={rowAccessory}
                  rowActions={rowActions}
                  cellSize={cellSize}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Table.displayName = 'Table'; 