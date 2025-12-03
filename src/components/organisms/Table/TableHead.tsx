"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { TableHeaderItem } from './TableHeaderItem';
import type { HeaderColorVariant, HeaderSize } from './TableHeaderItem';

/**
 * TableHead component props
 * 
 * @public
 */
export interface TableHeadProps extends Omit<ComposableProps<'th'>, 'children'> {
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
  
  /**
   * Header cell content
   */
  children: React.ReactNode;
}

/**
 * TableHead Component
 * 
 * A composable table header cell component that wraps the `<th>` element.
 * Used within TableHeader and TableRow to create column headers.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * <TableHeader>
 *   <TableRow>
 *     <TableHead>Name</TableHead>
 *     <TableHead sortable sortDirection="asc" onSort={() => console.log('sorted')}>
 *       Email
 *     </TableHead>
 *     <TableHead>Status</TableHead>
 *   </TableRow>
 * </TableHeader>
 * ```
 * 
 * @remarks
 * - Wraps the HTML `<th>` element
 * - Supports `asChild` prop for custom element composition
 * - Automatically handles sorting UI when sortable is true
 * - Use with TableHeader and TableRow for proper table structure
 * - Accessible: maintains proper header cell semantics
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
    asChild,
    ...props
  }, ref) => {
    if (asChild) {
      const Comp = Slot;
      return (
        <Comp
          ref={ref}
          className={cn(className)}
          {...props}
        >
          {children}
        </Comp>
      );
    }
    
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

