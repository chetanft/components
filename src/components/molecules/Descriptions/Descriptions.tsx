"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Typography } from '../../atoms/Typography';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { DescriptionsTitle } from './DescriptionsTitle';
import { DescriptionsExtra } from './DescriptionsExtra';
import { DescriptionsItem } from './DescriptionsItem';
import { DescriptionsLabel } from './DescriptionsLabel';
import { DescriptionsValue } from './DescriptionsValue';

export interface DescriptionsItemProps {
    label?: React.ReactNode;
    children: React.ReactNode;
    span?: number;
    className?: string;
}

export interface DescriptionsProps extends Omit<ComposableProps<'div'>, 'onChange'> {
    /**
     * Title for declarative API (deprecated)
     * @deprecated Use DescriptionsTitle component instead
     */
    title?: React.ReactNode;
    /**
     * Extra content for declarative API (deprecated)
     * @deprecated Use DescriptionsExtra component instead
     */
    extra?: React.ReactNode;
    /**
     * Show border around descriptions
     * @default false
     */
    bordered?: boolean;
    /**
     * Number of columns
     * @default 3
     */
    column?: number;
    /**
     * Layout direction
     * @default 'horizontal'
     */
    layout?: 'horizontal' | 'vertical';
    /**
     * Size of items
     * @default 'md'
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Items array for declarative API (deprecated)
     * @deprecated Use DescriptionsItem components instead
     */
    items?: DescriptionsItemProps[];
    /**
     * Descriptions content (for composable API)
     */
    children?: React.ReactNode;
}

/**
 * Descriptions Component
 * 
 * A component for displaying key-value pairs in a structured format.
 * Supports both composable API (recommended) and declarative API (deprecated).
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Composable API (recommended)
 * <Descriptions bordered column={2}>
 *   <DescriptionsTitle>User Details</DescriptionsTitle>
 *   <DescriptionsExtra>
 *     <Button size="sm">Edit</Button>
 *   </DescriptionsExtra>
 *   <DescriptionsItem span={2}>
 *     <DescriptionsLabel>Name</DescriptionsLabel>
 *     <DescriptionsValue>John Doe</DescriptionsValue>
 *   </DescriptionsItem>
 * </Descriptions>
 * 
 * // Declarative API (deprecated)
 * <Descriptions items={[{label: 'Name', children: 'John Doe'}]} />
 * ```
 * 
 * @remarks
 * - Composable API provides maximum flexibility and control
 * - All sub-components (DescriptionsTitle, DescriptionsItem, etc.) support `asChild`
 * - Supports bordered layouts, column spans, and different sizes
 * - Declarative API is deprecated but still functional for backward compatibility
 */
export const Descriptions: React.FC<DescriptionsProps> = ({
    title,
    extra,
    bordered = false,
    column = 3,
    layout = 'horizontal',
    size = 'md',
    items,
    className,
    children,
    asChild,
    ...props
}) => {
    const sizeStyles = {
        sm: 'p-[var(--spacing-x2)]',
        md: 'p-[var(--spacing-x3)]',
        lg: 'p-[var(--spacing-x4)]',
    };

    // Check if using composable API (has children with Descriptions sub-components)
    const hasComposableChildren = React.Children.toArray(children).some((child: any) => 
        child?.type?.displayName?.startsWith('Descriptions')
    );
    
    // If using composable API, render with composable structure
    if (hasComposableChildren) {
        // Show deprecation warning if using old props with composable API
        if (process.env.NODE_ENV !== 'production' && (title || extra || items?.length)) {
            console.warn(
                'Descriptions: Using deprecated props (title, extra, items) with composable API. ' +
                'Please use DescriptionsTitle, DescriptionsExtra, and DescriptionsItem components instead. ' +
                'See migration guide: docs/migrations/composable-migration.md'
            );
        }
        
        const Comp = asChild ? Slot : 'div';
        return (
            <Comp className={cn("w-full", className)} {...props}>
                {(title || extra) && (
                    <div className="flex items-center justify-between mb-[var(--spacing-x4)]">
                        {title && <DescriptionsTitle>{title}</DescriptionsTitle>}
                        {extra && <DescriptionsExtra>{extra}</DescriptionsExtra>}
                    </div>
                )}
                <div
                    className={cn(
                        "grid w-full",
                        bordered && "border border-[var(--color-border-secondary)] rounded-[var(--radius-md)] overflow-hidden"
                    )}
                    style={{
                        gridTemplateColumns: `repeat(${column}, minmax(0, 1fr))`,
                    }}
                >
                    {children}
                </div>
            </Comp>
        );
    }
    
    // Otherwise use declarative API (deprecated)
    if (process.env.NODE_ENV !== 'production' && items?.length) {
        console.warn(
            'Descriptions: Declarative API (items array prop) is deprecated. ' +
            'Please migrate to composable API using DescriptionsItem, DescriptionsLabel, and DescriptionsValue components. ' +
            'See migration guide: docs/migrations/composable-migration.md'
        );
    }
    
    const Comp = asChild ? Slot : 'div';
    return (
        <Comp className={cn("w-full", className)} {...props}>
            {(title || extra) && (
                <div className="flex items-center justify-between mb-[var(--spacing-x4)]">
                    {title && <DescriptionsTitle>{title}</DescriptionsTitle>}
                    {extra && <DescriptionsExtra>{extra}</DescriptionsExtra>}
                </div>
            )}
            <div
                className={cn(
                    "grid w-full",
                    bordered && "border border-[var(--color-border-secondary)] rounded-[var(--radius-md)] overflow-hidden"
                )}
                style={{
                    gridTemplateColumns: `repeat(${column}, minmax(0, 1fr))`,
                }}
            >
                {items?.map((item, index) => {
                    const span = item.span || 1;
                    return (
                        <DescriptionsItem
                            key={index}
                            span={span}
                            className={cn(
                                layout === 'horizontal' ? "flex-row" : "flex-col",
                                bordered ? "border-b border-r border-[var(--color-border-secondary)] last:border-b-0" : "pb-[var(--spacing-x4)]",
                                item.className
                            )}
                        >
                            {item.label && (
                                <DescriptionsLabel className={cn(
                                    sizeStyles[size],
                                    bordered && "bg-[var(--color-bg-secondary)] font-medium",
                                    layout === 'horizontal' && bordered && "w-[120px] flex-shrink-0 border-r border-[var(--color-border-secondary)]"
                                )}>
                                    {item.label}
                                </DescriptionsLabel>
                            )}
                            <DescriptionsValue className={sizeStyles[size]}>
                                {item.children}
                            </DescriptionsValue>
                        </DescriptionsItem>
                    );
                })}
            </div>
        </Comp>
    );
};

Descriptions.displayName = 'Descriptions';
