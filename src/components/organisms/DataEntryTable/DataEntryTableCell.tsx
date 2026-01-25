"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { DataEntryTableCellInput } from './DataEntryTableCellInput';
import { DataEntryTableCellDropdown } from './DataEntryTableCellDropdown';
import { DataEntryTableCellAmount } from './DataEntryTableCellAmount';
import { DataEntryTableCellDateTime } from './DataEntryTableCellDateTime';
import { DataEntryTableCellActions } from './DataEntryTableCellActions';
import type { DropdownOption } from '../../molecules/Dropdown';
import type { ActionConfig, DataEntryCellState, DataEntryCellType } from './DataEntryTableTypes';

export interface DataEntryTableCellProps {
  type: DataEntryCellType;
  state?: DataEntryCellState;
  value?: string | number;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  onChange?: (value: string | number) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  options?: DropdownOption[];
  currencySymbol?: string;
  unit?: string;
  actions?: ActionConfig[];
  className?: string;
  readOnlyValue?: React.ReactNode;
}

export const DataEntryTableCell: React.FC<DataEntryTableCellProps> = ({
  type,
  state = 'default',
  value,
  placeholder,
  error,
  disabled = false,
  onChange,
  onFocus,
  onBlur,
  options = [],
  currencySymbol = '₹',
  unit,
  actions = [],
  className,
  readOnlyValue,
}) => {
  // Determine effective state
  const effectiveState = disabled ? 'disabled' : state;

  // Render based on cell type
  switch (type) {
    case 'read-only':
      return (
        <div
          className={cn(
            "flex items-center justify-between px-[var(--x3)] py-[var(--x0)]",
            "h-[var(--component-height-md)]",
            "bg-[var(--bg-primary)] border border-[var(--border-secondary)] border-solid box-border",
            "relative shrink-0",
            className
          )}
        >
          <div className="box-border flex flex-[1_0_0] gap-[var(--x1)] h-[var(--component-height-md)] items-center min-h-px min-w-px px-[var(--x0)] py-[var(--x5)] relative rounded-[var(--radius-md)] shrink-0">
            <p
              className="flex-[1_0_0] font-normal leading-[1.4] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 whitespace-nowrap"
              style={{
                color: 'var(--tertiary)',
                fontSize: 'var(--font-size-md)',
              }}
            >
              {readOnlyValue ?? value ?? ''}
            </p>
          </div>
        </div>
      );

    case 'input':
      return (
        <DataEntryTableCellInput
          value={value as string}
          placeholder={placeholder}
          error={error}
          state={effectiveState}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className={className}
        />
      );

    case 'amount-input':
      return (
        <DataEntryTableCellAmount
          value={value as string | number}
          placeholder={placeholder}
          error={error}
          state={effectiveState}
          currencySymbol={currencySymbol}
          unit={unit}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className={className}
        />
      );

    case 'dropdown':
      return (
        <DataEntryTableCellDropdown
          value={value}
          placeholder={placeholder}
          error={error}
          state={effectiveState}
          options={options}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className={className}
        />
      );

    case 'date-time':
      return (
        <DataEntryTableCellDateTime
          value={value as string}
          placeholder={placeholder}
          error={error}
          state={effectiveState}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className={className}
        />
      );

    case 'action':
      return (
        <DataEntryTableCellActions
          actions={actions}
          state={effectiveState}
          className={className}
        />
      );

    default:
      return null;
  }
};

DataEntryTableCell.displayName = 'DataEntryTableCell';

export type { DataEntryCellType, DataEntryCellState, ActionConfig } from './DataEntryTableTypes';
