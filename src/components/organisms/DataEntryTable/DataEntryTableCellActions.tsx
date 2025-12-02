"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icons';
import type { DataEntryCellState, ActionConfig } from './DataEntryTableCell';

export interface DataEntryTableCellActionsProps {
  actions?: ActionConfig[];
  state?: DataEntryCellState;
  className?: string;
}

export const DataEntryTableCellActions: React.FC<DataEntryTableCellActionsProps> = ({
  actions = [],
  state = 'default',
  className,
}) => {
  const isDisabled = state === 'disabled';

  if (actions.length === 0) {
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
        <div className="box-border flex gap-[var(--x2)] h-[var(--component-height-md)] items-center justify-center px-[var(--x0)] py-[var(--x5)] relative rounded-[var(--radius-md)] shrink-0">
          <Button
            variant="text"
            size="xs"
            icon="add"
            iconPosition="leading"
            disabled={isDisabled}
            className="px-[var(--x2)] py-[var(--x0)] rounded-[var(--radius-sm)]"
            style={{ height: 'var(--x6, 24px)' }}
          >
            Button
          </Button>
        </div>
      </div>
    );
  }

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
      <div className="box-border flex gap-[var(--x2)] h-[var(--component-height-md)] items-center justify-center px-[var(--x0)] py-[var(--x5)] relative rounded-[var(--radius-md)] shrink-0">
        {actions.map((action, index) => {
          const iconName = action.icon as any;
          return (
            <Button
              key={index}
              variant={action.variant || 'text'}
              size="xs"
              icon={iconName}
              iconPosition="leading"
              disabled={isDisabled}
              onClick={action.onClick}
              className="px-[var(--x2)] py-[var(--x0)] rounded-[var(--radius-sm)]"
              style={{ height: 'var(--x6, 24px)' }}
            >
              {action.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

DataEntryTableCellActions.displayName = 'DataEntryTableCellActions';

