"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { getGlassClasses, useResolvedGlass, type GlassVariant } from '../../../lib/glass';
import type { ColumnType, SortDirection, TableColumn, TableLayout, TableRow, TableVariant } from './TableTypes';

/**
 * Table component props
 *
 * @public
 *
 * @example
 * ```tsx
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
 * ```
 */
export interface TableProps<T extends TableRow = TableRow> extends React.HTMLAttributes<HTMLDivElement> {
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

  /**
   * Enable sticky table header during vertical scroll
   * When true, the outer wrapper becomes the scroll container
   * and the thead sticks to the top.
   * @default false
   */
  stickyHeader?: boolean;
}

/**
 * Table Component
 *
 * A composable table component that provides a flexible, Shadcn-style API.
 *
 * @public
 *
 * @example
 * ```tsx
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
 * ```
 *
 * @remarks
 * - Composable API provides maximum flexibility and control
 * - All sub-components (TableHeader, TableBody, TableRow, TableCell, etc.) support `asChild`
 * - Use design tokens for consistent styling
 * - Accessible: maintains proper table semantics and ARIA attributes
 */
export const Table = React.forwardRef<HTMLDivElement, TableProps<any>>(({
  caption,
  className,
  glass,
  stickyHeader = false,
  children,
  ...props
}, ref) => {
  const resolvedGlass = useResolvedGlass(glass);

  // When stickyHeader is enabled, the outer div becomes the single scroll
  // container (overflow-auto) so that position:sticky on <thead> binds to
  // the correct scrolling ancestor.  Without stickyHeader the original
  // overflow-hidden + nested overflow-x-auto layout is preserved.

  const stickyChildren = stickyHeader
    ? React.Children.map(children, (child) => {
        if (React.isValidElement<{ className?: string }>(child) && (child as any)?.type?.slot === 'table-header') {
          return React.cloneElement(child, {
            className: cn(
              child.props.className,
              'sticky top-0 z-10'
            ),
          });
        }
        return child;
      })
    : children;

  return (
    <div
      ref={ref}
      className={cn(
        getGlassClasses(resolvedGlass, "bg-[var(--bg-primary)]", "border border-[var(--border-primary)]"),
        "rounded-[var(--radius-md)]",
        stickyHeader ? "overflow-auto" : "overflow-hidden",
        className
      )}
      {...props}
    >
      {stickyHeader ? (
        <table className="w-full border-collapse">
          {caption && (
            <caption className="sr-only">{caption}</caption>
          )}
          {stickyChildren}
        </table>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            {caption && (
              <caption className="sr-only">{caption}</caption>
            )}
            {children}
          </table>
        </div>
      )}
    </div>
  );
}) as <T extends TableRow = TableRow>(props: TableProps<T> & { ref?: React.Ref<HTMLDivElement> }) => React.ReactElement;

// Assign displayName after the cast
(Table as React.FC).displayName = 'Table';

export type { ColumnType, SortDirection, TableColumn, TableLayout, TableRow, TableVariant } from './TableTypes';
