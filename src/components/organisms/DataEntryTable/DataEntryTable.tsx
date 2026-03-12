"use client";

import React, { useState, useCallback, useRef, useMemo } from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { type GlassVariant } from '../../../lib/glass';
import { DataEntryTableCellContextMenu } from './DataEntryTableCellContextMenu';
import { useColumnResize } from './useColumnResize';
import { DataEntryTableProvider } from './DataEntryTableContext';

export interface DataEntryTableProps extends ComposableProps<'div'> {
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
  /** Glass morphism variant */
  glass?: GlassVariant;
}

/**
 * DataEntryTable Component
 *
 * A composable component for editable data entry tables.
 *
 * @public
 *
 * @example
 * ```tsx
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
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Composable API provides maximum flexibility and control.
 */
export const DataEntryTable = ({
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
  glass,
  asChild,
  ...props
}: DataEntryTableProps) => {
  const [focusedCell, setFocusedCell] = useState<{ rowId: string | number; columnKey: string } | null>(null);
  const [hoveredCell, setHoveredCell] = useState<{ rowId: string | number; columnKey: string } | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    position: { x: number; y: number };
    options: Array<{ label: string; onClick: () => void }>;
  } | null>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  const { columnWidths, resizingColumn, handleMouseDown } = useColumnResize({
    minWidth: 100,
  });

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
};

DataEntryTable.displayName = 'DataEntryTable';
