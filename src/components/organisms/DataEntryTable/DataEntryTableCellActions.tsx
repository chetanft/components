"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Button } from '../../atoms/Button/Button';
import type { IconName } from '../../atoms/Icons';
import type { DataEntryCellState, ActionConfig } from './DataEntryTableTypes';

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
          "flex items-center justify-between px-[var(--spacing-x3)] py-0",
          "h-[var(--component-height-md)]",
          "bg-[var(--bg-primary)] border border-[var(--border-secondary)] border-solid box-border",
          "relative shrink-0",
          className
        )}
      >
        <div className="box-border flex gap-[var(--spacing-x2)] h-[var(--component-height-md)] items-center justify-center px-0 py-[var(--spacing-x5)] relative rounded-[var(--radius-md)] shrink-0">
          <Button
            variant="text"
            size="xs"
            icon="add"
            iconPosition="leading"
            disabled={isDisabled}
            className="px-[var(--spacing-x2)] py-0 rounded-[var(--radius-sm)]"
            style={{ height: 'var(--spacing-x6)' }}
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
        "flex items-center justify-between px-[var(--spacing-x3)] py-0",
        "h-[var(--component-height-md)]",
        "bg-[var(--bg-primary)] border border-[var(--border-secondary)] border-solid box-border",
        "relative shrink-0",
        className
      )}
    >
      <div className="box-border flex gap-[var(--spacing-x2)] h-[var(--component-height-md)] items-center justify-center px-0 py-[var(--spacing-x5)] relative rounded-[var(--radius-md)] shrink-0">
        {actions.map((action, index) => {
          const iconName = action.icon as IconName | undefined;
          return (
            <Button
              key={index}
              variant={action.variant || 'text'}
              size="xs"
              icon={iconName}
              iconPosition="leading"
              disabled={isDisabled}
              onClick={action.onClick}
              className="px-[var(--spacing-x2)] py-0 rounded-[var(--radius-sm)]"
              style={{ height: 'var(--spacing-x6)' }}
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
