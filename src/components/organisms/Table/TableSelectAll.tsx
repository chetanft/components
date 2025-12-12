"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Checkbox } from '../../atoms/Checkbox';
import { useTableSelection } from './TableSelectionContext';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface TableSelectAllProps extends Omit<ComposableProps<'div'>, 'onChange'> {
    /** Custom checkbox renderer */
    renderCheckbox?: (props: {
        checked: boolean;
        indeterminate: boolean;
        onChange: () => void
    }) => React.ReactNode;
}

/**
 * TableSelectAll - Checkbox to select/deselect all table rows
 * 
 * Renders a checkbox that controls selection of all rows in the table.
 * Shows indeterminate state when some rows are selected.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * <Table selectedRows={selected} onSelectionChange={setSelected}>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead><TableSelectAll /></TableHead>
 *       <TableHead>Name</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   ...
 * </Table>
 * ```
 * 
 * @remarks
 * - Supports `asChild` for custom wrapper elements
 * - Supports custom checkbox via renderCheckbox prop
 * - Must be used within a Table with selection enabled
 */
export const TableSelectAll = React.forwardRef<HTMLDivElement, TableSelectAllProps>(
    ({ renderCheckbox, className, asChild, children, ...props }, ref) => {
        const { isAllSelected, isSomeSelected, toggleAll } = useTableSelection();

        const Comp = asChild ? Slot : 'div';

        const checkboxProps = {
            checked: isAllSelected,
            indeterminate: isSomeSelected,
            onChange: toggleAll,
        };

        const content = (children ?? (renderCheckbox ? (
            renderCheckbox(checkboxProps)
        ) : (
            <Checkbox
                checked={isAllSelected}
                // Note: indeterminate would need to be added to Checkbox component
                onChange={toggleAll}
                aria-label="Select all rows"
            />
        ))) as React.ReactElement | null;

        return (
            <Comp ref={ref} className={cn("flex items-center justify-center", className)} {...props}>
                {content}
            </Comp>
        );
    }
);

TableSelectAll.displayName = 'TableSelectAll';
