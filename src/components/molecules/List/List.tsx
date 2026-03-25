"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { getGlassClasses, useResolvedGlass, type GlassVariant } from '../../../lib/glass';
import { Spin } from '../../atoms/Spin';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface ListProps extends Omit<ComposableProps<'div'>, 'onChange'> {
    /** Glass morphism variant */
    glass?: GlassVariant;
    /**
     * Show border around list
     * @default false
     */
    bordered?: boolean;
    /**
     * Show split lines between items
     * @default true
     */
    split?: boolean;
    /**
     * Show loading state
     * @default false
     */
    loading?: boolean;
    /**
     * Size of list items
     * @default 'md'
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * List content (for composable API)
     */
    children?: React.ReactNode;
}

/**
 * List Component
 *
 * A versatile list component for displaying collections of items.
 *
 * @public
 *
 * @example
 * ```tsx
 * <List bordered>
 *   <ListHeader>
 *     <Typography variant="title-secondary">List Header</Typography>
 *   </ListHeader>
 *   <ListBody>
 *     <ListItem>
 *       <ListItemIcon>
 *         <Icon name="check" />
 *       </ListItemIcon>
 *       <ListItemContent>
 *         <ListItemTitle>Item Title</ListItemTitle>
 *         <ListItemDescription>Item description</ListItemDescription>
 *       </ListItemContent>
 *       <ListItemAction>
 *         <Button size="sm">Action</Button>
 *       </ListItemAction>
 *     </ListItem>
 *   </ListBody>
 *   <ListFooter>
 *     <Button>Load More</Button>
 *   </ListFooter>
 * </List>
 * ```
 *
 * @remarks
 * - Composable API provides maximum flexibility and control
 * - All sub-components (ListHeader, ListBody, ListItem, etc.) support `asChild`
 * - Supports loading states, borders, and split lines
 */
export function List({
    bordered = false,
    split = true,
    loading = false,
    size = 'md',
    glass,
    className,
    children,
    asChild,
    ...props
}: ListProps) {
    const resolvedGlass = useResolvedGlass(glass);

    const containerClasses = cn(
        "flex flex-col text-[var(--primary)]",
        getGlassClasses(resolvedGlass, 'bg-[var(--bg-primary)]', bordered ? 'border border-[var(--border-secondary)]' : ''),
        bordered && !resolvedGlass && "border border-[var(--border-secondary)] rounded-[var(--radius-md)]",
        bordered && resolvedGlass && "rounded-[var(--radius-md)]",
        className
    );

    const Comp = asChild ? Slot : 'div';
    return (
        <Comp className={cn(containerClasses, className)} {...props}>
            {loading && (
                <div className="flex justify-center py-[var(--spacing-x8)]">
                    <Spin size="md" />
                </div>
            )}
            {!loading && children}
        </Comp>
    );
}

List.displayName = 'List';
