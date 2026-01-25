import type { ReactNode } from 'react';

export type SortDirection = 'asc' | 'desc' | null;
export type ColumnType = 'text' | 'number' | 'date' | 'actions';
export type TableVariant = 'primary' | 'secondary';
export type TableLayout = 'default' | 'simple';

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
  render?: (value: unknown, row: T, index: number) => ReactNode;
}

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
