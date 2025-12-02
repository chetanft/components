"use client";

import React, { useState, useCallback, useRef } from 'react';
import { cn } from '../../../lib/utils';
import { Checkbox } from '../../atoms/Checkbox/Checkbox';
import { TableCellText } from './TableCellText';
import { TableCell } from './TableCell';
import { TableHeaderItem } from './TableHeaderItem';
import { TableHeader } from './TableHeader';
import { TableRow as TableRowComponent } from './TableRow';
import { Typography } from '../../atoms/Typography';

// Table types
export type SortDirection = 'asc' | 'desc' | null;
export type ColumnType = 'text' | 'number' | 'date' | 'actions';
export type TableVariant = 'primary' | 'secondary';
export type TableLayout = 'default' | 'simple';

/**
 * Table column definition
 * 
 * @public
 */
export interface TableColumn<T = any> {
  /**
   * Unique key for the column (required)
   * Used to access data from row objects
   */
  key: string;
  
  /**
   * Column header text
   * @alias label, header
   */
  title?: string;
  
  /**
   * Column header text (alias for title)
   * @deprecated Use `title` instead
   */
  label?: string;
  
  /**
   * Column header text (alias for title)
   * @deprecated Use `title` instead
   */
  header?: string;
  
  /**
   * Column data type for sorting/formatting
   * @default 'text'
   */
  type?: ColumnType;
  
  /**
   * Enable column sorting
   * @default false
   */
  sortable?: boolean;
  
  /**
   * Column width (CSS value)
   * Example: "200px", "20%", "auto"
   */
  width?: string;
  
  /**
   * Custom cell renderer function
   * @param value - Cell value from row data
   * @param row - Full row object
   * @param index - Row index
   * @returns React node to render in cell
   */
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
}

/**
 * Table row data structure
 * 
 * @public
 */
export interface TableRow {
  /**
   * Unique row identifier (required)
   */
  id: string | number;
  
  /**
   * Additional row data properties
   */
  [key: string]: any;
}

/**
 * Table component props
 * 
 * @public
 * 
 * @example
 * ```tsx
 * const columns = [
 *   { key: 'name', title: 'Name', sortable: true },
 *   { key: 'email', title: 'Email' },
 *   { key: 'status', title: 'Status', render: (value) => <Badge>{value}</Badge> }
 * ];
 * 
 * const data = [
 *   { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
 *   { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' }
 * ];
 * 
 * <Table 
 *   columns={columns} 
 *   data={data}
 *   selectable
 *   onSelectionChange={(selected) => console.log(selected)}
 *   onSort={(column, direction) => console.log(column, direction)}
 * />
 * ```
 */
export interface TableProps<T extends TableRow = TableRow> {
  /**
   * Column definitions (for declarative API)
   * Required when using declarative API (columns + data)
   */
  columns?: TableColumn<T>[];
  
  /**
   * Row data array (for declarative API)
   * Each row must have an `id` property
   * Required when using declarative API (columns + data)
   */
  data?: T[];
  
  /**
   * Table content (for composable API)
   * Use TableHeader, TableBody, TableRow, TableCell components
   */
  children?: React.ReactNode;
  
  /**
   * Table visual variant
   * @default 'primary'
   * 
   * - `primary`: Main table style with borders
   * - `secondary`: Alternative style
   */
  variant?: TableVariant;
  
  /**
   * Table layout style
   * @default 'default'
   * 
   * - `default`: Standard table layout
   * - `simple`: 2-column label-value pairs layout
   */
  layout?: TableLayout;
  
  /**
   * Enable row selection with checkboxes
   * @default false
   */
  selectable?: boolean;
  
  /**
   * Currently selected row IDs
   * Controlled selection state
   */
  selectedRows?: (string | number)[];
  
  /**
   * Callback when selection changes
   * @param selectedRows - Array of selected row IDs
   */
  onSelectionChange?: (selectedRows: (string | number)[]) => void;
  
  /**
   * Callback when column is sorted
   * @param column - Column key being sorted
   * @param direction - Sort direction: 'asc', 'desc', or null
   */
  onSort?: (column: string, direction: SortDirection) => void;
  
  /**
   * Currently sorted column key
   * Controlled sort state
   */
  sortColumn?: string;
  
  /**
   * Current sort direction
   * Controlled sort state
   */
  sortDirection?: SortDirection;
  
  /**
   * Custom accessory content for each row
   * Rendered before row actions
   * @param row - Row data object
   * @param selected - Whether row is selected
   * @returns React node
   */
  rowAccessory?: (row: T, selected: boolean) => React.ReactNode;
  
  /**
   * Custom actions for each row
   * Rendered in actions column
   * @param row - Row data object
   * @returns React node (typically action buttons)
   */
  rowActions?: (row: T) => React.ReactNode;
  
  /**
   * Label for row actions column header
   * @default 'Actions'
   */
  rowActionsLabel?: string;
  
  /**
   * Show loading state
   * @default false
   */
  loading?: boolean;
  
  /**
   * Message displayed when table is empty
   * @default 'No data available'
   */
  emptyMessage?: string;
  
  /**
   * Table caption (accessibility)
   */
  caption?: string;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Left header content (simple layout only)
   */
  headerLeft?: React.ReactNode;
  
  /**
   * Right header content (simple layout only)
   */
  headerRight?: React.ReactNode;
  
  /**
   * Enable striped row styling
   * @default false
   */
  striped?: boolean;
  
  /**
   * Enable column reordering via drag-and-drop
   * @default false
   */
  reorderable?: boolean;
  
  /**
   * Callback when columns are reordered
   * @param columns - Reordered column definitions
   */
  onColumnReorder?: (columns: TableColumn<T>[]) => void;
}

const CHECKBOX_COLUMN_WIDTH_CLASS = 'w-[calc(var(--spacing-x9)*2)]';
const ACTIONS_COLUMN_WIDTH_CLASS = 'w-[calc(var(--spacing-x10)*2+var(--spacing-x5))]';

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
  striped = true,
  reorderable = false,
  onColumnReorder,
  children
}: TableProps<T>) => {
  // If children are provided, use composable API
  if (children) {
    return (
      <div className={cn("border border-[var(--border-primary)] rounded-[var(--radius-md)] overflow-hidden bg-[var(--bg-primary)]", className)}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            {caption && (
              <caption className="sr-only">{caption}</caption>
            )}
            {children}
          </table>
        </div>
      </div>
    );
  }

  // Otherwise use declarative API
  if (!columns || !data) {
    console.warn('Table: Either provide children (composable API) or columns + data (declarative API)');
    return null;
  }

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
            reorderable={reorderable}
            onColumnReorder={onColumnReorder}
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
