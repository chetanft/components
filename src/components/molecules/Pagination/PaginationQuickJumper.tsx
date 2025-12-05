"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';
import { usePaginationContext } from './PaginationContext';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface PaginationQuickJumperProps extends ComposableProps<'div'> {
    /** Label text */
    label?: string;
    /** Button text */
    buttonText?: string;
    /** Placeholder for input */
    placeholder?: string;
}

/**
 * PaginationQuickJumper - Input to jump to a specific page
 * 
 * Allows users to quickly navigate to a specific page number.
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
 *   <PaginationQuickJumper label="Go to:" buttonText="Go" />
 * </Pagination>
 * ```
 * 
 * @remarks
 * - Supports `asChild` for custom wrapper elements
 * - Validates input against total pages
 * - Supports Enter key for quick jump
 */
export const PaginationQuickJumper = React.forwardRef<HTMLDivElement, PaginationQuickJumperProps>(
    ({
        label = "Go to:",
        buttonText = "Go",
        placeholder = "Page",
        className,
        asChild,
        children,
        ...props
    }, ref) => {
        const { totalPages, onPageChange } = usePaginationContext();
        const [value, setValue] = React.useState('');

        const handleJump = () => {
            const page = parseInt(value, 10);
            if (page >= 1 && page <= totalPages) {
                onPageChange(page);
                setValue('');
            }
        };

        const handleKeyDown = (e: React.KeyboardEvent) => {
            if (e.key === 'Enter') {
                handleJump();
            }
        };

        const Comp = asChild ? Slot : 'div';

        return (
            <Comp ref={ref} className={cn("flex items-center gap-2 ml-4", className)} {...props}>
                {children ?? (
                    <>
                        <span className="text-sm text-[var(--tertiary)]">{label}</span>
                        <input
                            type="number"
                            min={1}
                            max={totalPages}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className={cn(
                                "w-16 px-2 py-1.5 rounded-[var(--radius-md)]",
                                "border border-[var(--border-primary)]",
                                "text-sm",
                                "focus:outline-none focus:ring-2 focus:ring-[var(--neutral)] focus:ring-opacity-20",
                                "bg-[var(--bg-primary)]"
                            )}
                            placeholder={placeholder}
                        />
                        <Button variant="secondary" size="sm" onClick={handleJump}>
                            {buttonText}
                        </Button>
                    </>
                )}
            </Comp>
        );
    }
);

PaginationQuickJumper.displayName = 'PaginationQuickJumper';
