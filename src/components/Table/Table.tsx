"use client";

import React, { useState, useCallback } from 'react';
import { cn } from '../../lib/utils';
import { Checkbox } from '../Checkbox/Checkbox';
import { Button } from '../Button/Button';
import { Badge } from '../Badge/Badge';
import { Icon, IconName } from '../Icons';
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
  pagination?: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalItems: number;
    onPageChange: (page: number) => void;
  };
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
}

const TableHeader = <T extends TableRow = TableRow>({
  columns,
  variant = 'primary',
  selectable,
  selectedRows = [],
  allRowIds = [],
  onSelectionChange,
  onSort,
  sortColumn,
  sortDirection
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
}

const TableRowComponent = <T extends TableRow = TableRow>({
  row,
  columns,
  index,
  variant = 'primary',
  selectable,
  selected = false,
  onSelectionChange
}: TableRowProps<T>) => {
  const handleSelect = useCallback(() => {
    if (!onSelectionChange) return;
    onSelectionChange(row.id, !selected);
  }, [row.id, selected, onSelectionChange]);

  const renderCellContent = useCallback((column: TableColumn<T>, value: any) => {
    if (column.render) {
      return column.render(value, row, index);
    }

    switch (column.type) {
      case 'number':
        return (
          <TableCellText type="primary">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </TableCellText>
        );
      
      case 'date':
        return (
          <TableCellText type="primary">
            {value instanceof Date ? value.toLocaleDateString() : value}
          </TableCellText>
        );
      
      default:
        return (
          <TableCellText type="primary">
            {value}
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

  return (
    <tr className={cn(
      "hover:bg-gray-50 transition-colors duration-200",
      selected && "ring-2 ring-blue-500"
    )}>
      {selectable && (
        <TableCell 
          backgroundColor={getCellBackground(0)}
          borderStyle="single"
          className="w-[92px]" // Exact width from Figma
        >
          <Checkbox
            checked={selected}
            onChange={handleSelect}
            size="md"
          />
        </TableCell>
      )}
      {columns.map((column, columnIndex) => (
        <TableCell 
          key={column.key} 
          backgroundColor={getCellBackground(columnIndex + (selectable ? 1 : 0))}
          borderStyle="single"
        >
          {renderCellContent(column, row[column.key])}
        </TableCell>
      ))}
    </tr>
  );
};

// Pagination Component
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange
}) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const startItem = ((currentPage - 1) * pageSize) + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex items-center justify-between px-[var(--spacing-x3)] py-[var(--spacing-x3)] border-t border-[var(--color-divider)] bg-[var(--color-background)]">
      <div className="flex items-center gap-[var(--spacing-x4)]">
        <TableCellText type="secondary">
          Showing {startItem}-{endItem} of {totalItems} results
        </TableCellText>
      </div>

      <div className="flex items-center gap-[var(--spacing-x1)]">
        <Button
          variant="secondary"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="rounded-full"
        >
          <Icon name="chevron-left" size={16} />
          Previous
        </Button>

        <div className="flex items-center gap-[var(--spacing-x1)]">
          {getVisiblePages().map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <TableCellText type="secondary" className="px-[var(--spacing-x2)] py-[var(--spacing-x1)]">
                  ...
                </TableCellText>
              ) : (
                <Button
                  variant={currentPage === page ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => onPageChange(page as number)}
                  className="rounded-full"
                >
                  {page}
                </Button>
              )}
            </React.Fragment>
          ))}
        </div>

        <Button
          variant="secondary"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="rounded-full"
        >
          Next
          <Icon name="chevron-right" size={16} />
        </Button>
      </div>
    </div>
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
  pagination,
  loading = false,
  emptyMessage,
  className
}: TableProps<T>) => {
  const allRowIds = data.map(row => row.id);

  const handleRowSelectionChange = useCallback((rowId: string | number, selected: boolean) => {
    if (!onSelectionChange) return;
    
    if (selected) {
      onSelectionChange([...selectedRows, rowId]);
    } else {
      onSelectionChange(selectedRows.filter(id => id !== rowId));
    }
  }, [selectedRows, onSelectionChange]);

  if (loading) {
    return null;
  }

  return (
    <div className={cn("border border-[var(--color-border)] rounded-[var(--spacing-x2)] overflow-hidden bg-[var(--color-white)]", className)}>
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
          />
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="px-[var(--spacing-x3)] py-[var(--spacing-x8)] text-center"
                >
                  <TableCellText type="secondary">
                    {emptyMessage}
                  </TableCellText>
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <TableRowComponent
                  key={row.id}
                  row={row}
                  columns={columns}
                  index={index}
                  variant={variant}
                  selectable={selectable}
                  selected={selectedRows.includes(row.id)}
                  onSelectionChange={handleRowSelectionChange}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {pagination && (
        <Pagination {...pagination} />
      )}
    </div>
  );
};

Table.displayName = 'Table'; 