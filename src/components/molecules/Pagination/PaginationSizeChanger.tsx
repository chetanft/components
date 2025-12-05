"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../Select';
import { usePaginationContext } from './PaginationContext';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface PaginationSizeChangerProps extends ComposableProps<'div'> {
    /** Available page size options */
    options?: number[];
    /** Label text */
    label?: string;
}

/**
 * PaginationSizeChanger - Dropdown to change page size
 * 
 * Allows users to select how many items to display per page.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * <Pagination current={1} total={100} pageSize={10}>
 *   <PaginationList>
 *     <PaginationPrevious />
 *     <PaginationItem page={1} />
 *     <PaginationNext />
 *   </PaginationList>
 *   <PaginationSizeChanger options={[10, 20, 50, 100]} />
 * </Pagination>
 * ```
 * 
 * @remarks
 * - Supports `asChild` for custom wrapper elements
 * - Uses the Select component internally
 * - Triggers onShowSizeChange callback from Pagination
 */
export const PaginationSizeChanger = React.forwardRef<HTMLDivElement, PaginationSizeChangerProps>(
    ({ options = [10, 20, 50, 100], label = "Show:", className, asChild, children, ...props }, ref) => {
        const { pageSize, current, onShowSizeChange } = usePaginationContext();

        const handleSizeChange = (value: string) => {
            const newSize = Number(value);
            onShowSizeChange?.(current, newSize);
        };

        const Comp = asChild ? Slot : 'div';

        return (
            <Comp ref={ref} className={cn("flex items-center gap-2 ml-4", className)} {...props}>
                {children ?? (
                    <>
                        <span className="text-sm text-[var(--tertiary)]">{label}</span>
                        <Select value={String(pageSize)} onValueChange={handleSizeChange}>
                            <SelectTrigger className="w-20 h-8">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {options.map(opt => (
                                    <SelectItem key={opt} value={String(opt)}>{opt}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </>
                )}
            </Comp>
        );
    }
);

PaginationSizeChanger.displayName = 'PaginationSizeChanger';
