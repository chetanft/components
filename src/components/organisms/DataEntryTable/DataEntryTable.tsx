"use client";

import React, { useState, useCallback, useRef, useMemo } from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { Checkbox } from '../../atoms/Checkbox/Checkbox';
import { TableHeaderItem } from '../Table/TableHeaderItem';
import { DataEntryTableCell } from './DataEntryTableCell';
import { DataEntryTableCellContextMenu } from './DataEntryTableCellContextMenu';
import { useColumnResize } from './useColumnResize';
import { DataEntryTableProvider } from './DataEntryTableContext';
import { DataEntryTableHeader } from './DataEntryTableHeader';
import { DataEntryTableHeaderRow } from './DataEntryTableHeaderRow';
import { DataEntryTableHeaderCell } from './DataEntryTableHeaderCell';
import { DataEntryTableBody } from './DataEntryTableBody';
import { DataEntryTableRow } from './DataEntryTableRow';
import { DataEntryTableRowCell } from './DataEntryTableRowCell';
import { DataEntryTableRowCheckbox } from './DataEntryTableRowCheckbox';
import type { DropdownOption } from '../../molecules/Dropdown/Dropdown';
import type { DataEntryCellType, DataEntryCellState, ActionConfig } from './DataEntryTableCell';

export interface DataEntryColumn {
  key: string;
  title: string;
  cellType: DataEntryCellType;
  width?: string;
  placeholder?: string;
  options?: DropdownOption[];
  currencySymbol?: string;
  unit?: string;
  actions?: ActionConfig[];
  editable?: boolean;
  readOnlyValue?: (row: any, value: unknown) => React.ReactNode;
}

export interface DataEntryTableProps<T extends { id: string | number; [key: string]: any } = any> extends ComposableProps<'div'> {
  /**
   * Columns configuration (for declarative API)
   * @deprecated Use DataEntryTableHeader, DataEntryTableHeaderRow, DataEntryTableHeaderCell components instead
   */
  columns?: DataEntryColumn[];
  /**
   * Data rows (for declarative API)
   * @deprecated Use DataEntryTableBody, DataEntryTableRow, DataEntryTableRowCell components instead
   */
  data?: T[];
  /**
   * Callback when cell value changes
   */
  onCellChange?: (rowId: string | number, columnKey: string, value: string | number) => void;
  /**
   * Callback when row is added
   */
  onRowAdd?: () => void;
  /**
   * Callback when row is deleted
   */
  onRowDelete?: (rowId: string | number) => void;
  /**
   * Whether rows are selectable
   * @default false
   */
  selectable?: boolean;
  /**
   * Whether columns are resizable
   * @default false
   */
  resizable?: boolean;
  /**
   * Whether to show context menu on hover
   * @default false
   */
  showContextMenu?: boolean;
  /**
   * Selected row IDs (controlled)
   */
  selectedRows?: (string | number)[];
  /**
   * Callback when selection changes
   */
  onSelectionChange?: (selectedRows: (string | number)[]) => void;
  /**
   * Cell errors by row ID and column key
   */
  cellErrors?: Record<string, Record<string, string>>;
  /**
   * Table content (for composable API)
   */
  children?: React.ReactNode;
}

/**
 * DataEntryTable Component
 *
 * A composable component for editable data entry tables.
 * Supports both composable API (recommended) and declarative API (deprecated).
 *
 * @public
 *
 * @example
 * ```tsx
 * // Composable API (recommended)
 * <DataEntryTable selectable resizable>
 *   <DataEntryTableHeader>
 *     <DataEntryTableHeaderRow>
 *       <DataEntryTableHeaderCell columnKey="name">Name</DataEntryTableHeaderCell>
 *     </DataEntryTableHeaderRow>
 *   </DataEntryTableHeader>
 *   <DataEntryTableBody>
 *     <DataEntryTableRow rowId="1">
 *       <DataEntryTableRowCell rowId="1" columnKey="name" type="input" value="John" />
 *     </DataEntryTableRow>
 *   </DataEntryTableBody>
 * </DataEntryTable>
 * 
 * // Declarative API (deprecated)
 * <DataEntryTable
 *   columns={columns}
 *   data={data}
 *   onCellChange={handleCellChange}
 * />
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Composable API provides maximum flexibility and control.
 * - Declarative API is deprecated but still functional for backward compatibility.
 */
export const DataEntryTable = <T extends { id: string | number; [key: string]: any } = any>({
  columns,
  data,
  onCellChange,
  onRowAdd,
  onRowDelete,
  selectable = false,
  resizable = false,
  showContextMenu = false,
  selectedRows = [],
  onSelectionChange,
  className,
  cellErrors = {},
  children,
  asChild,
  ...props
}: DataEntryTableProps<T>) => {
  const [focusedCell, setFocusedCell] = useState<{ rowId: string | number; columnKey: string } | null>(null);
  const [hoveredCell, setHoveredCell] = useState<{ rowId: string | number; columnKey: string } | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    position: { x: number; y: number };
    options: Array<{ label: string; onClick: () => void }>;
  } | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout>();
  const tableRef = useRef<HTMLTableElement>(null);

  const { columnWidths, resizingColumn, handleMouseDown } = useColumnResize({
    minWidth: 100,
  });

  const handleCellChange = useCallback((rowId: string | number, columnKey: string, value: string | number) => {
    onCellChange?.(rowId, columnKey, value);
  }, [onCellChange]);

  const handleCellFocus = useCallback((rowId: string | number, columnKey: string) => {
    setFocusedCell({ rowId, columnKey });
  }, []);

  const handleCellBlur = useCallback(() => {
    setFocusedCell(null);
  }, []);

  const handleCellHover = useCallback((rowId: string | number, columnKey: string, element: HTMLElement, unit?: string) => {
    setHoveredCell({ rowId, columnKey });
    
    if (showContextMenu && unit) {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      
      hoverTimeoutRef.current = setTimeout(() => {
        const rect = element.getBoundingClientRect();
        setContextMenu({
          position: {
            x: rect.left,
            y: rect.bottom + 4, // Using 4px (var(--x1)) but calculated at runtime
          },
          options: [
            {
              label: 'Copy',
              onClick: () => {
                navigator.clipboard.writeText(unit);
              },
            },
            {
              label: 'Resize',
              onClick: () => {
                console.log('Resize unit:', unit);
              },
            },
          ],
        });
      }, 1000);
    }
  }, [showContextMenu]);

  const handleCellLeave = useCallback(() => {
    setHoveredCell(null);
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setContextMenu(null);
  }, []);

  // Check if using composable API (has children with DataEntryTable sub-components)
  const hasComposableChildren = React.Children.toArray(children).some((child: any) => 
      child?.type?.displayName?.startsWith('DataEntryTable')
  );
  
  const isAllSelected = selectable && data && data.length > 0 && selectedRows.length === data.length;
  const isIndeterminate = selectable && selectedRows.length > 0 && data && selectedRows.length < data.length;
  
  const contextValue = useMemo(() => ({
    selectable,
    selectedRows,
    onSelectionChange,
    focusedCell,
    hoveredCell,
    setFocusedCell,
    setHoveredCell,
    onCellChange,
    onRowAdd,
    onRowDelete,
    resizable,
    columnWidths,
    resizingColumn,
    handleMouseDown,
    showContextMenu,
    contextMenu,
    setContextMenu,
    cellErrors,
  }), [
    selectable,
    selectedRows,
    onSelectionChange,
    focusedCell,
    hoveredCell,
    onCellChange,
    onRowAdd,
    onRowDelete,
    resizable,
    columnWidths,
    resizingColumn,
    handleMouseDown,
    showContextMenu,
    contextMenu,
    cellErrors,
  ]);
  
  // If using composable API, render with context provider
  if (hasComposableChildren) {
      if (process.env.NODE_ENV !== 'production' && (columns || data)) {
          console.warn(
              'DataEntryTable: Using deprecated props (columns, data) with composable API. ' +
              'Please use DataEntryTableHeader, DataEntryTableBody, DataEntryTableRow, and DataEntryTableRowCell components instead. ' +
              'See migration guide: docs/migrations/composable-migration.md'
          );
      }
      
      const Comp = asChild ? Slot : 'div';
      return (
          <DataEntryTableProvider value={contextValue}>
              <Comp className={cn("relative", className)} {...props}>
                  <div className="overflow-x-auto">
                      <table ref={tableRef} className="w-full border-collapse">
                          {children}
                      </table>
                  </div>
                  {contextMenu && (
                      <DataEntryTableCellContextMenu
                          options={contextMenu.options}
                          position={contextMenu.position}
                          onClose={() => setContextMenu(null)}
                      />
                  )}
              </Comp>
          </DataEntryTableProvider>
      );
  }
  
  // Otherwise use declarative API (deprecated)
  if (process.env.NODE_ENV !== 'production' && (columns || data)) {
      console.warn(
          'DataEntryTable: Declarative API (columns, data props) is deprecated. ' +
          'Please migrate to composable API using DataEntryTableHeader, DataEntryTableBody, DataEntryTableRow, and DataEntryTableRowCell components. ' +
          'See migration guide: docs/migrations/composable-migration.md'
      );
  }
  
  if (!columns || !data) {
      return null;
  }
  
  const Comp = asChild ? Slot : 'div';
  return (
    <DataEntryTableProvider value={contextValue}>
      <Comp className={cn("relative", className)} {...props}>
        <div className="overflow-x-auto">
          <table ref={tableRef} className="w-full border-collapse">
            {/* Header Row - 50px height, bg-secondary, border-secondary */}
            <thead>
              <tr>
                {selectable && (
                  <TableHeaderItem
                    type="checkbox"
                    colorVariant="bg"
                    size="lg"
                    checkboxProps={{
                      checked: isAllSelected,
                      indeterminate: isIndeterminate,
                      onChange: () => {
                        if (onSelectionChange) {
                          if (isAllSelected) {
                            onSelectionChange([]);
                          } else {
                            onSelectionChange(data.map(row => row.id));
                          }
                        }
                      },
                    }}
                    className="relative shrink-0"
                    style={{
                      width: 'var(--x12, 48px)',
                      height: '50px',
                      paddingLeft: 'var(--x5, 20px)',
                      paddingRight: 'var(--x2, 8px)',
                    }}
                  />
                )}
                {columns.map((column, index) => {
                const width = resizable && columnWidths[column.key]
                  ? `${columnWidths[column.key]}px`
                  : column.width || 'auto';

                return (
                  <React.Fragment key={column.key}>
                    <TableHeaderItem
                      colorVariant="bg"
                      size="lg"
                      className={cn(
                        "relative shrink-0",
                        resizable && "relative"
                      )}
                      style={{
                        width: resizable && columnWidths[column.key] ? width : column.width || 'auto',
                        height: '50px',
                        paddingLeft: 'var(--x2)',
                        paddingRight: 'var(--x2)',
                      }}
                    >
                      {column.title}
                    </TableHeaderItem>
                    {resizable && index < columns.length - 1 && (
                      <th
                        className="bg-transparent p-0 cursor-col-resize relative group"
                        style={{ width: 'var(--x1, 4px)' }}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleMouseDown(column.key, e);
                        }}
                      >
                        <div
                          className={cn(
                            "absolute inset-y-0 w-full pointer-events-none",
                            "group-hover:bg-[var(--primary)]",
                            resizingColumn === column.key && "bg-[var(--primary)]"
                          )}
                          style={{ width: 'var(--x1, 4px)' }}
                        />
                      </th>
                    )}
                  </React.Fragment>
                );
              })}
            </tr>
          </thead>
          {/* Body Rows - 40px height cells */}
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="px-[var(--spacing-x3)] py-[var(--spacing-x8)] text-center"
                >
                  <span className="text-[var(--secondary)]">No data available</span>
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => {
                const isSelected = selectedRows.includes(row.id);
                const isHovered = hoveredCell?.rowId === row.id;

                return (
                  <tr
                    key={row.id}
                    className={cn(
                      isSelected && "bg-[var(--border-secondary)]",
                      isHovered && !isSelected && "bg-[var(--bg-secondary)]"
                    )}
                  >
                    {selectable && (
                      <td
                        className="relative shrink-0 p-0"
                        style={{
                          width: 'var(--x12, 48px)',
                          height: 'var(--component-height-md, 40px)',
                          paddingLeft: 'var(--x5)',
                          paddingRight: 'var(--x5)',
                          verticalAlign: 'middle',
                        }}
                        onClick={() => {
                          if (onSelectionChange) {
                            if (isSelected) {
                              onSelectionChange(selectedRows.filter(id => id !== row.id));
                            } else {
                              onSelectionChange([...selectedRows, row.id]);
                            }
                          }
                        }}
                      >
                        <div 
                          className="flex gap-[var(--x2)] items-center relative shrink-0" 
                          style={{ height: '19px' }}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent td onClick from firing
                          }}
                        >
                          <Checkbox
                            checked={isSelected}
                            onChange={(checked) => {
                              if (onSelectionChange) {
                                if (checked) {
                                  onSelectionChange([...selectedRows, row.id]);
                                } else {
                                  onSelectionChange(selectedRows.filter(id => id !== row.id));
                                }
                              }
                            }}
                            size="md"
                          />
                        </div>
                      </td>
                    )}
                    {columns.map((column, colIndex) => {
                      const cellValue = row[column.key];
                      const isFocused = focusedCell?.rowId === row.id && focusedCell?.columnKey === column.key;
                      const isHovered = hoveredCell?.rowId === row.id && hoveredCell?.columnKey === column.key;
                      const error = cellErrors[row.id]?.[column.key];
                      
                      let cellState: DataEntryCellState = 'default';
                      if (error) {
                        cellState = 'error-filled';
                      } else if (isFocused) {
                        cellState = 'focused';
                      } else if (isHovered) {
                        cellState = 'hover';
                      } else if (cellValue) {
                        cellState = 'filled';
                      }

                      const width = resizable && columnWidths[column.key]
                        ? `${columnWidths[column.key]}px`
                        : column.width || 'auto';

                      return (
                        <React.Fragment key={column.key}>
                          <td
                            className={cn(
                              "relative shrink-0 p-0",
                              column.cellType === 'action' && "flex items-center justify-center"
                            )}
                            style={{
                              width: resizable && columnWidths[column.key] ? width : column.width || 'auto',
                              height: 'var(--component-height-md)',
                            }}
                          >
                            <div
                              onMouseEnter={(e) => {
                                if (column.unit) {
                                  handleCellHover(row.id, column.key, e.currentTarget, column.unit);
                                }
                              }}
                              onMouseLeave={handleCellLeave}
                              className="w-full h-full"
                            >
                              <DataEntryTableCell
                                type={column.cellType}
                                state={cellState}
                                value={cellValue as string | number}
                                placeholder={column.placeholder}
                                error={error}
                                disabled={column.editable === false}
                                onChange={(newValue) => handleCellChange(row.id, column.key, newValue)}
                                onFocus={() => handleCellFocus(row.id, column.key)}
                                onBlur={handleCellBlur}
                                options={column.options}
                                currencySymbol={column.currencySymbol}
                                unit={column.unit}
                                actions={column.actions?.map(action => ({
                                  ...action,
                                  onClick: () => {
                                    if (action.label === 'Add' || action.label === '+ Add') {
                                      onRowAdd?.();
                                    } else if (action.label === 'Delete') {
                                      onRowDelete?.(row.id);
                                    } else {
                                      action.onClick();
                                    }
                                  },
                                }))}
                                readOnlyValue={column.readOnlyValue?.(row, cellValue)}
                              />
                            </div>
                          </td>
                          {resizable && colIndex < columns.length - 1 && (
                            <td className="bg-transparent p-0" style={{ width: 'var(--x1, 4px)' }} />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
          </table>
        </div>
        {contextMenu && (
          <DataEntryTableCellContextMenu
            options={contextMenu.options}
            position={contextMenu.position}
            onClose={() => setContextMenu(null)}
          />
        )}
      </Comp>
    </DataEntryTableProvider>
  );
};

DataEntryTable.displayName = 'DataEntryTable';
