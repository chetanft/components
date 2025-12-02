"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { TableHeaderItem } from './TableHeaderItem';
import type { HeaderColorVariant, HeaderSize } from './TableHeaderItem';

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /**
   * Header color variant
   * @default 'dark25'
   */
  colorVariant?: HeaderColorVariant;
  
  /**
   * Header size
   * @default 'md'
   */
  size?: HeaderSize;
  
  /**
   * Enable column sorting
   * @default false
   */
  sortable?: boolean;
  
  /**
   * Current sort direction
   */
  sortDirection?: 'asc' | 'desc' | null;
  
  /**
   * Callback when header is clicked (for sorting)
   */
  onSort?: () => void;
}

/**
 * TableHead Component
 * 
 * Shadcn-compatible table header cell component.
 * Wraps TableHeaderItem for consistent styling.
 * 
 * @public
 */
export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({
    children,
    className,
    colorVariant = 'dark25',
    size = 'md',
    sortable = false,
    sortDirection = null,
    onSort,
    ...props
  }, ref) => {
    return (
      <TableHeaderItem
        colorVariant={colorVariant}
        size={size}
        sortable={sortable}
        sortDirection={sortDirection}
        onClick={onSort}
        className={className}
        style={props.style}
      >
        {children}
      </TableHeaderItem>
    );
  }
);

TableHead.displayName = 'TableHead';

