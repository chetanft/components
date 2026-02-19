"use client";

import React, { useCallback } from 'react';
import { cn } from '../../../lib/utils';
import { getGlassClasses, useResolvedGlass, type GlassVariant } from '../../../lib/glass';
import { Checkbox } from '../../atoms/Checkbox/Checkbox';
import { TableCellText } from './TableCellText';
import { TableCell } from './TableCell';
import { TableHeaderItem } from './TableHeaderItem';
import { TableHeader } from './TableHeader';
import { TableRow as TableRowComponent } from './TableRow';
import { Typography } from '../../atoms/Typography';
import type { ColumnType, SortDirection, TableColumn, TableLayout, TableRow, TableVariant } from './TableTypes';

/**
 * Table component props
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Composable API (recommended)
 * <Table>
 *   <TableCaption>Monthly Sales Data</TableCaption>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Name</TableHead>
 *       <TableHead sortable>Email</TableHead>
 *       <TableHead>Status</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>John Doe</TableCell>
 *       <TableCell>john@example.com</TableCell>
 *       <TableCell>
 *         <Badge variant="success">Active</Badge>
 *       </TableCell>
 *     </TableRow>
 *   </TableBody>
 *   <TableFooter>
 *     <TableRow>
 *       <TableCell colSpan={3} className="text-right">
 *         Total: $1,234.56
 *       </TableCell>
 *     </TableRow>
 *   </TableFooter>
 * </Table>
 * 
 * // Declarative API (deprecated)
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
export interface TableProps<T extends TableRow = TableRow> extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Column definitions (for declarative API)
   * @deprecated Use composable API with TableHeader, TableBody, TableRow, TableCell instead
   * Required when using declarative API (columns + data)
   */
  columns?: TableColumn<T>[];
  
  /**
   * Row data array (for declarative API)
   * @deprecated Use composable API with TableHeader, TableBody, TableRow, TableCell instead
   * Each row must have an `id` property
   * Required when using declarative API (columns + data)
   */
  data?: T[];
  
  /**
   * Table content (for composable API)
   * Use TableHeader, TableBody, TableRow, TableCell components
   * 
   * @example
   * ```tsx
   * <Table>
   *   <TableHeader>
   *     <TableRow>
   *       <TableHead>Name</TableHead>
   *     </TableRow>
   *   </TableHeader>
   *   <TableBody>
   *     <TableRow>
   *       <TableCell>John Doe</TableCell>
   *     </TableRow>
   *   </TableBody>
   * </Table>
   * ```
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
   * @default true
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

  /**
   * Apply glassmorphism effect to the table header
   */
  glass?: GlassVariant;
}

const _CHECKBOX_COLUMN_WIDTH_CLASS = 'w-[calc(var(--spacing-x9)*2)]';
const _ACTIONS_COLUMN_WIDTH_CLASS = 'w-[calc(var(--spacing-x10)*2+var(--spacing-x5))]';

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

/**
 * Table Component
 * 
 * A composable table component that provides a flexible, Shadcn-style API.
 * Supports both composable API (recommended) and declarative API (deprecated).
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Composable API (recommended) - Full control and flexibility
 * <Table>
 *   <TableCaption>Employee Directory</TableCaption>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Name</TableHead>
 *       <TableHead sortable>Email</TableHead>
 *       <TableHead>Department</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>John Doe</TableCell>
 *       <TableCell>john@example.com</TableCell>
 *       <TableCell>
 *         <Badge variant="info">Engineering</Badge>
 *       </TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * 
 * // Declarative API (deprecated) - Simpler but less flexible
 * <Table columns={columns} data={data} />
 * ```
 * 
 * @remarks
 * - Composable API provides maximum flexibility and control
 * - All sub-components (TableHeader, TableBody, TableRow, TableCell, etc.) support `asChild`
 * - Use design tokens for consistent styling
 * - Accessible: maintains proper table semantics and ARIA attributes
 * - Declarative API is deprecated but still functional for backward compatibility
 */
export const Table = React.forwardRef<HTMLDivElement, TableProps<any>>(({
  columns,
  data,
  variant = 'primary',
  layout = 'default',
  selectable = false,
  selectedRows = [] as (string | number)[],
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
  glass,
  children,
  ...props
}, ref) => {
  const resolvedGlass = useResolvedGlass(glass);

  // If children are provided, use composable API
  if (children) {
    return (
      <div
        ref={ref}
        className={cn(getGlassClasses(resolvedGlass, "bg-[var(--bg-primary)]", "border border-[var(--border-primary)]"), "rounded-[var(--radius-md)] overflow-hidden", className)}
        {...props}
      >
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

  // Otherwise use declarative API (deprecated)
  if (!columns || !data) {
    console.warn('Table: Either provide children (composable API) or columns + data (declarative API)');
    return null;
  }

  // Show deprecation warning for declarative API
  if (process.env.NODE_ENV !== 'production') {
      }

  // Defensive programming: ensure all rows have valid IDs
  const validatedData = (data || []).filter((row: any) => {
    if (row.id === undefined || row.id === null) {
      console.warn('Table: Row missing required "id" property:', row);
      return false;
    }
    return true;
  });

  const allRowIds = validatedData.map((row: any) => row.id);

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
            validatedData.map((row: any, index: number) => {
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
    <div
      ref={ref}
      className={cn(getGlassClasses(resolvedGlass, "bg-[var(--bg-primary)]", "border border-[var(--border-primary)]"), "rounded-[var(--radius-md)] overflow-hidden", className)}
      {...props}
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse" aria-rowcount={data.length}>
          {caption && (
            <caption className="sr-only">{caption}</caption>
          )}
          <TableHeader
            columns={columns}
            variant={variant as TableVariant}
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
              validatedData.map((row: any, index: number) => {
                const rowId: string | number = row.id;
                const isSelected = (selectedRows as (string | number)[]).includes(rowId);
                return (
                  <TableRowComponent
                    key={String(rowId)}
                    row={row}
                    columns={columns}
                    index={index}
                    {...({ variant } as any)}
                    selectable={selectable}
                    selected={isSelected}
                    onSelectionChange={handleRowSelectionChange}
                    rowAccessory={rowAccessory}
                    rowActions={rowActions}
                    cellSize={cellSize}
                  />
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}) as <T extends TableRow = TableRow>(props: TableProps<T> & { ref?: React.Ref<HTMLDivElement> }) => React.ReactElement;

// Assign displayName after the cast
(Table as any).displayName = 'Table';

export type { ColumnType, SortDirection, TableColumn, TableLayout, TableRow, TableVariant } from './TableTypes';
