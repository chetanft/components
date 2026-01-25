"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { DataEntryTableCell } from './DataEntryTableCell';
import { useDataEntryTableContext } from './DataEntryTableContext';
import type { DataEntryCellType } from './DataEntryTableTypes';
import type { DropdownOption } from '../../molecules/Dropdown';
import type { ActionConfig } from './DataEntryTableTypes';

export interface DataEntryTableRowCellProps extends ComposableProps<'td'> {
  /**
   * Row ID
   */
  rowId: string | number;
  /**
   * Column key
   */
  columnKey: string;
  /**
   * Cell type
   */
  type: DataEntryCellType;
  /**
   * Cell value
   */
  value?: string | number;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Error message
   */
  error?: string;
  /**
   * Whether the cell is disabled
   */
  disabled?: boolean;
  /**
   * Dropdown options (for dropdown type)
   */
  options?: DropdownOption[];
  /**
   * Currency symbol (for amount-input type)
   */
  currencySymbol?: string;
  /**
   * Unit text (for amount-input type)
   */
  unit?: string;
  /**
   * Actions (for action type)
   */
  actions?: ActionConfig[];
  /**
   * Read-only value render function
   */
  readOnlyValue?: React.ReactNode;
  /**
   * Column width
   */
  width?: string | number;
}

/**
 * DataEntryTableRowCell Component
 *
 * A composable component for a cell in a data entry table row.
 * Typically used within DataEntryTableRow.
 *
 * @public
 *
 * @example
 * ```tsx
 * <DataEntryTableRow rowId="1">
 *   <DataEntryTableRowCell
 *     rowId="1"
 *     columnKey="name"
 *     type="input"
 *     value="John"
 *   />
 * </DataEntryTableRow>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<td>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically handles focus, hover, and error states via context.
 */
export const DataEntryTableRowCell = React.forwardRef<HTMLTableCellElement, DataEntryTableRowCellProps>(
  ({ 
    className, 
    rowId, 
    columnKey, 
    type, 
    value, 
    placeholder, 
    error, 
    disabled, 
    options, 
    currencySymbol, 
    unit, 
    actions, 
    readOnlyValue,
    width,
    asChild,
    ...props 
  }, ref) => {
    const {
      focusedCell,
      hoveredCell,
      setFocusedCell,
      setHoveredCell,
      onCellChange,
      showContextMenu: _showContextMenu,
      resizable,
      columnWidths,
      cellErrors,
      onRowAdd,
      onRowDelete,
    } = useDataEntryTableContext();
    
    const isFocused = focusedCell?.rowId === rowId && focusedCell?.columnKey === columnKey;
    const isHovered = hoveredCell?.rowId === rowId && hoveredCell?.columnKey === columnKey;
    const cellError = error || cellErrors[rowId]?.[columnKey];
    
    let cellState: 'default' | 'hover' | 'focused' | 'typing' | 'filled' | 'error-filled' | 'disabled' | 'pre-filled' = 'default';
    if (cellError) {
      cellState = 'error-filled';
    } else if (isFocused) {
      cellState = 'focused';
    } else if (isHovered) {
      cellState = 'hover';
    } else if (value) {
      cellState = 'filled';
    }
    
    const effectiveWidth = resizable && columnWidths[columnKey]
      ? `${columnWidths[columnKey]}px`
      : width || 'auto';
    
    const handleCellChange = (newValue: string | number) => {
      onCellChange?.(rowId, columnKey, newValue);
    };
    
    const handleFocus = () => {
      setFocusedCell({ rowId, columnKey });
    };
    
    const handleBlur = () => {
      setFocusedCell(null);
    };
    
    const handleMouseEnter = (_e: React.MouseEvent<HTMLElement>) => {
      if (unit) {
        // Context menu logic would go here
        setHoveredCell({ rowId, columnKey });
      } else {
        setHoveredCell({ rowId, columnKey });
      }
    };
    
    const handleMouseLeave = () => {
      setHoveredCell(null);
    };
    
    // Map actions to include row actions
    const mappedActions = actions?.map(action => ({
      ...action,
      onClick: () => {
        if (action.label === 'Add' || action.label === '+ Add') {
          onRowAdd?.();
        } else if (action.label === 'Delete') {
          onRowDelete?.(rowId);
        } else {
          action.onClick();
        }
      },
    }));
    
    const Comp = asChild ? Slot : 'td';
    return (
      <>
        <Comp
          ref={ref}
          className={cn(
            "relative shrink-0 p-0",
            type === 'action' && "flex items-center justify-center",
            className
          )}
          style={{
            width: effectiveWidth,
            height: 'var(--component-height-md)',
          }}
          {...props}
        >
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="w-full h-full"
          >
            <DataEntryTableCell
              type={type}
              state={cellState}
              value={value}
              placeholder={placeholder}
              error={cellError}
              disabled={disabled}
              onChange={handleCellChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              options={options}
              currencySymbol={currencySymbol}
              unit={unit}
              actions={mappedActions}
              readOnlyValue={readOnlyValue}
            />
          </div>
        </Comp>
        {resizable && (
          <td className="bg-transparent p-0" style={{ width: 'var(--x1, 4px)' }} />
        )}
      </>
    );
  }
);

DataEntryTableRowCell.displayName = 'DataEntryTableRowCell';
