"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Typography } from '../../atoms/Typography';
import { Spin } from '../../atoms/Spin';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { ListHeader } from './ListHeader';
import { ListFooter } from './ListFooter';
import { ListBody } from './ListBody';
import { ListItem } from './ListItem';

export interface ListProps<T> extends Omit<ComposableProps<'div'>, 'onChange'> {
    /**
     * Data source for declarative API (deprecated)
     * @deprecated Use ListItem components instead
     */
    dataSource?: T[];
    /**
     * Render function for declarative API (deprecated)
     * @deprecated Use ListItem components instead
     */
    renderItem?: (item: T, index: number) => React.ReactNode;
    /**
     * Header content for declarative API (deprecated)
     * @deprecated Use ListHeader component instead
     */
    header?: React.ReactNode;
    /**
     * Footer content for declarative API (deprecated)
     * @deprecated Use ListFooter component instead
     */
    footer?: React.ReactNode;
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
     * Grid layout configuration (deprecated)
     * @deprecated Use CSS Grid directly
     */
    grid?: {
        gutter?: number;
        column?: number;
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
        xxl?: number;
    };
    /**
     * List content (for composable API)
     */
    children?: React.ReactNode;
}

/**
 * List Component
 * 
 * A versatile list component for displaying collections of items.
 * Supports both composable API (recommended) and declarative API (deprecated).
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Composable API (recommended)
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
 * 
 * // Declarative API (deprecated)
 * <List dataSource={items} renderItem={(item) => <div>{item.name}</div>} />
 * ```
 * 
 * @remarks
 * - Composable API provides maximum flexibility and control
 * - All sub-components (ListHeader, ListBody, ListItem, etc.) support `asChild`
 * - Supports loading states, borders, and split lines
 * - Declarative API is deprecated but still functional for backward compatibility
 */
export function List<T>({
    dataSource = [],
    renderItem,
    header,
    footer,
    bordered = false,
    split = true,
    loading = false,
    size = 'md',
    grid,
    className,
    children,
    asChild,
    ...props
}: ListProps<T>) {
    const sizeStyles = {
        sm: 'py-[var(--spacing-x2)] px-[var(--spacing-x3)]',
        md: 'py-[var(--spacing-x3)] px-[var(--spacing-x4)]',
        lg: 'py-[var(--spacing-x4)] px-[var(--spacing-x6)]',
    };

    const containerClasses = cn(
        "flex flex-col text-[var(--color-primary)] bg-[var(--color-bg-primary)]",
        bordered && "border border-[var(--color-border-secondary)] rounded-[var(--radius-md)]",
        className
    );

    const _headerClasses = cn(
        "border-b border-[var(--color-border-secondary)]",
        sizeStyles[size]
    );

    const _footerClasses = cn(
        "border-t border-[var(--color-border-secondary)]",
        sizeStyles[size]
    );

    const itemClasses = (index: number) => cn(
        "flex items-center justify-between",
        sizeStyles[size],
        split && index !== (dataSource.length - 1) && "border-b border-[var(--color-border-secondary)]"
    );

    // Check if using composable API (has children with List sub-components)
    const hasComposableChildren = React.Children.toArray(children).some((child: any) => 
        child?.type?.displayName?.startsWith('List')
    );
    
    // If using composable API, render with context
    if (hasComposableChildren) {
        // Show deprecation warning if using old props with composable API
        if (process.env.NODE_ENV !== 'production' && (dataSource.length || header || footer)) {
            console.warn(
                'List: Using deprecated props (dataSource, header, footer) with composable API. ' +
                'Please use ListHeader, ListBody, ListFooter, and ListItem components instead. ' +
                'See migration guide: docs/migrations/composable-migration.md'
            );
        }
        
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
    
    // Otherwise use declarative API (deprecated)
    if (process.env.NODE_ENV !== 'production' && (dataSource.length || renderItem || header || footer)) {
        console.warn(
            'List: Declarative API (dataSource, renderItem, header, footer props) is deprecated. ' +
            'Please migrate to composable API using ListHeader, ListBody, ListFooter, and ListItem components. ' +
            'See migration guide: docs/migrations/composable-migration.md'
        );
    }
    
    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex justify-center py-[var(--spacing-x8)]">
                    <Spin size="md" />
                </div>
            );
        }

        if (children) {
            return <div className="p-[var(--spacing-x4)]">{children}</div>;
        }

        if (!dataSource.length) {
            return (
                <div className="flex justify-center py-[var(--spacing-x8)] text-[var(--color-tertiary)]">
                    <Typography variant="body-secondary-regular">No data</Typography>
                </div>
            );
        }

        if (grid) {
            const gridStyle = {
                display: 'grid',
                gridTemplateColumns: `repeat(${grid.column || 1}, minmax(0, 1fr))`,
                gap: grid.gutter ? `${grid.gutter}px` : '16px',
            };
            return (
                <div className={cn("p-[var(--spacing-x4)]")} style={gridStyle}>
                    {dataSource.map((item, index) => (
                        <div key={index}>
                            {renderItem ? renderItem(item, index) : String(item)}
                        </div>
                    ))}
                </div>
            );
        }

        return (
            <ListBody>
                {dataSource.map((item, index) => (
                    <ListItem
                        key={index}
                        className={cn(
                            itemClasses(index),
                            split && index !== (dataSource.length - 1) && "border-b border-[var(--color-border-secondary)]"
                        )}
                    >
                        {renderItem ? renderItem(item, index) : String(item)}
                    </ListItem>
                ))}
            </ListBody>
        );
    };

    const Comp = asChild ? Slot : 'div';
    return (
        <Comp className={cn(containerClasses, className)} {...props}>
            {header && <ListHeader className={sizeStyles[size]}>{header}</ListHeader>}
            {renderContent()}
            {footer && <ListFooter className={sizeStyles[size]}>{footer}</ListFooter>}
        </Comp>
    );
}

List.displayName = 'List';
