"use client";

import React, { useState, useCallback } from 'react';
import { cn } from '../../../lib/utils';
import { Checkbox } from '../../atoms/Checkbox/Checkbox';
import { TableCellText } from './TableCellText';
import { TableCell } from './TableCell';
import { TableHeaderItem } from './TableHeaderItem';
import { Typography } from '../../atoms/Typography';

// Table types
export type SortDirection = 'asc' | 'desc' | null;
export type ColumnType = 'text' | 'number' | 'date' | 'actions';
export type TableVariant = 'primary' | 'secondary';
export type TableLayout = 'default' | 'simple';

export interface TableColumn<T = any> {
  key: string;
  title?: string;
  label?: string; // Alias for title
  header?: string; // Alias for title (common in other libraries)
  type?: ColumnType;
  sortable?: boolean;
  width?: string;
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
}

export interface TableRow {
  id: string | number;
  [key: string]: any;
}

export interface TableProps<T extends TableRow = TableRow> {
  columns: TableColumn<T>[];
  data: T[];
  variant?: TableVariant;
  layout?: TableLayout; // 'default' | 'simple' - simple layout for 2-column label-value pairs
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
  caption?: string;
  className?: string;
  // Simple layout specific props
  headerLeft?: React.ReactNode;
  headerRight?: React.ReactNode;
  striped?: boolean;
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

const CHECKBOX_COLUMN_WIDTH_CLASS = 'w-[calc(var(--spacing-x9)*2)]';
const ACTIONS_COLUMN_WIDTH_CLASS = 'w-[calc(var(--spacing-x10)*2+var(--spacing-x5))]';

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
            className={CHECKBOX_COLUMN_WIDTH_CLASS}
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

  const renderCellContent = useCallback((column: TableColumn<T>, value: unknown) => {
    try {
      if (column.render) {
        return column.render(value, row, index);
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
          // For string values, pass directly so TableCellText can handle newlines and apply colors correctly
          // First line gets primary color, second line gets secondary color
          return (
            <TableCellText type="primary">
              {typeof value === 'string' ? value : String(value ?? '')}
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
  const getCellBackground = (_columnIndex: number) => {
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
      aria-rowindex={index + 1} // 1-based index for ARIA
      onMouseEnter={() => setHoveredRowIndex(true)}
      onMouseLeave={() => setHoveredRowIndex(false)}
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
        // Determine if this cell should have multiple lines based on content
        let cellValue = row[column.key];

        // For secondary variant, extract only the first data point (before newline)
        if (variant === 'secondary' && typeof cellValue === 'string' && cellValue.includes('\n')) {
          cellValue = cellValue.split('\n')[0];
        }

        const hasNewlines = typeof cellValue === 'string' && cellValue.includes('\n');
        const hasSingleLine = !cellValue || (!hasNewlines && String(cellValue).length < 20);
        // Secondary variant always uses single line
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
    </tr>
  );
};

// ColumnCell component for simple layout (extracted from SimpleColumnLayout)
const ColumnCell = ({
  title,
  subtitle,
}: { title: React.ReactNode; subtitle?: React.ReactNode }) => (
  <div
    className={cn(
      'flex flex-col gap-[var(--spacing-x1)] items-start justify-start w-full pl-[var(--spacing-x2)]'
    )}
  >
    <Typography
      variant="body-primary-regular"
      as="p"
      className="whitespace-pre-wrap"
    >
      {title}
    </Typography>
    {subtitle && (
      <Typography
        variant="body-primary-regular"
        as="p"
        className="whitespace-pre-wrap"
        style={{ color: 'var(--primary-500)' }}
      >
        {subtitle}
      </Typography>
    )}
  </div>
);

// Main Table Component
export const Table = <T extends TableRow = TableRow>({
  columns,
  data,
  variant = 'primary',
  layout = 'default',
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
  caption,
  className,
  headerLeft,
  headerRight,
  striped = true
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

  // Simple layout rendering (2-column label-value pairs)
  if (layout === 'simple') {
    // For simple layout, we expect exactly 2 columns
    if (columns.length !== 2) {
      console.warn('Table: Simple layout requires exactly 2 columns');
    }

    const leftColumn = columns[0];
    const rightColumn = columns[1] || columns[0];

    return (
      <div
        className={cn('flex w-full flex-col', className)}
      >
        {/* Header - uses TableHeaderItem for consistency */}
        <div className="w-full">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <TableHeaderItem
                  colorVariant="dark25"
                  size="md"
                  className="w-1/2"
                >
                  {headerLeft || leftColumn.title || leftColumn.label || leftColumn.header || 'Label'}
                </TableHeaderItem>
                <TableHeaderItem
                  colorVariant="dark25"
                  size="md"
                  className="w-1/2 text-right"
                >
                  {headerRight || rightColumn.title || rightColumn.label || rightColumn.header || 'Value'}
                </TableHeaderItem>
              </tr>
            </thead>
          </table>
        </div>

        {/* Rows - matches SimpleColumnLayout structure */}
        <div className="flex flex-col">
          {validatedData.length === 0 ? (
            <div className="px-[var(--spacing-x3)] py-[var(--spacing-x8)] text-center">
              <TableCellText type="secondary">
                {emptyMessage || "No data available"}
              </TableCellText>
            </div>
          ) : (
            validatedData.map((row, index) => {
              // Alternating pattern: even indices (0, 2, 4...) = white, odd indices (1, 3, 5...) = gray
              const isEvenIndex = index % 2 === 0;
              const bgColor = striped
                ? (isEvenIndex
                  ? 'bg-[var(--bg-primary)]'
                  : 'bg-[var(--bg-secondary)]')
                : 'bg-[var(--bg-primary)]';

              const leftValue = row[leftColumn.key];
              const rightValue = row[rightColumn.key];

              // Handle multi-line values: if string contains \n, split into title/subtitle
              const getCellContent = (value: unknown): { title: React.ReactNode; subtitle?: React.ReactNode } => {
                if (typeof value === 'string' && value.includes('\n')) {
                  const [title, ...rest] = value.split('\n');
                  return { title, subtitle: rest.join('\n') };
                }
                return { title: value != null ? String(value) : '' };
              };

              const leftContent = getCellContent(leftValue);
              const rightContent = getCellContent(rightValue);

              return (
                <div
                  key={row.id ?? index}
                  className={cn(
                    'border-[var(--border-primary)] border-b border-l-0 border-r-0 border-solid border-t-0',
                    'flex flex-col gap-[var(--spacing-x2)] h-[var(--spacing-x24)] items-start justify-center px-0 py-[var(--spacing-x5)] w-full',
                    bgColor
                  )}
                >
                  <div className="flex gap-[var(--spacing-x2)] items-center py-0 w-full">
                    <div className="flex flex-[1_0_0] flex-col gap-[var(--spacing-x1)] items-start justify-start min-h-px min-w-px">
                      <ColumnCell title={leftContent.title} subtitle={leftContent.subtitle} />
                    </div>
                    <div className="flex flex-[1_0_0] flex-col gap-[var(--spacing-x1)] items-start justify-start min-h-px min-w-px">
                      <ColumnCell title={rightContent.title} subtitle={rightContent.subtitle} />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }

  // Default layout rendering (standard table)
  return (
    <div className={cn("border border-[var(--border-primary)] rounded-[var(--radius-md)] overflow-hidden bg-[var(--bg-primary)]", className)}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse" aria-rowcount={data.length}>
          {caption && (
            <caption className="sr-only">{caption}</caption>
          )}
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
                  className="px-[var(--spacing-x3)] py-[var(--spacing-x8)] text-center"
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
