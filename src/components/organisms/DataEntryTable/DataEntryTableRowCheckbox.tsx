"use client";

import React from 'react';
import { Checkbox } from '../../atoms/Checkbox/Checkbox';
import { useDataEntryTableContext } from './DataEntryTableContext';

export interface DataEntryTableRowCheckboxProps {
  /**
   * Row ID
   */
  rowId: string | number;
}

/**
 * DataEntryTableRowCheckbox Component
 *
 * A composable component for a checkbox cell in a data entry table row.
 * Typically used within DataEntryTableRow when selectable is enabled.
 *
 * @public
 *
 * @example
 * ```tsx
 * <DataEntryTableRow rowId="1">
 *   <DataEntryTableRowCheckbox rowId="1" />
 *   <DataEntryTableRowCell columnKey="name" type="input" value="John" />
 * </DataEntryTableRow>
 * ```
 *
 * @remarks
 * - Automatically handles selection state via context.
 * - Only renders when selectable is enabled.
 */
export const DataEntryTableRowCheckbox: React.FC<DataEntryTableRowCheckboxProps> = ({ rowId }) => {
  const { selectedRows, onSelectionChange } = useDataEntryTableContext();
  
  const isSelected = selectedRows.includes(rowId);
  
  const handleChange = (checked: boolean) => {
    if (onSelectionChange) {
      if (checked) {
        onSelectionChange([...selectedRows, rowId]);
      } else {
        onSelectionChange(selectedRows.filter(id => id !== rowId));
      }
    }
  };
  
  return (
    <td
      className="relative shrink-0 p-0"
      style={{
        width: 'var(--spacing-x12)',
        height: 'var(--component-height-md)',
        paddingLeft: 'var(--spacing-x5)',
        paddingRight: 'var(--spacing-x5)',
        verticalAlign: 'middle',
      }}
      onClick={() => {
        if (onSelectionChange) {
          if (isSelected) {
            onSelectionChange(selectedRows.filter(id => id !== rowId));
          } else {
            onSelectionChange([...selectedRows, rowId]);
          }
        }
      }}
    >
      <div 
        className="flex gap-[var(--spacing-x2)] items-center relative shrink-0" 
        style={{ height: '1.1875rem' }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Checkbox
          checked={isSelected}
          onChange={(e) => handleChange(e.target.checked)}
          size="md"
        />
      </div>
    </td>
  );
};

DataEntryTableRowCheckbox.displayName = 'DataEntryTableRowCheckbox';

