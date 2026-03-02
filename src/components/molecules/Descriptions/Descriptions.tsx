"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { getGlassClasses, useResolvedGlass, type GlassVariant } from '../../../lib/glass';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface DescriptionsProps extends Omit<ComposableProps<'div'>, 'onChange' | 'title'> {
    /** Glass morphism variant */
    glass?: GlassVariant;
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
     * Descriptions content (for composable API)
     */
    children?: React.ReactNode;
}

/**
 * Descriptions Component
 *
 * A component for displaying key-value pairs in a structured format.
 * Uses composable API with DescriptionsTitle, DescriptionsExtra,
 * DescriptionsItem, DescriptionsLabel, and DescriptionsValue sub-components.
 *
 * @public
 *
 * @example
 * ```tsx
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
 * ```
 *
 * @remarks
 * - Composable API provides maximum flexibility and control
 * - All sub-components (DescriptionsTitle, DescriptionsItem, etc.) support `asChild`
 * - Supports bordered layouts, column spans, and different sizes
 */
export const Descriptions: React.FC<DescriptionsProps> = ({
    bordered = false,
    column = 3,
    layout: _layout = 'horizontal',
    size: _size = 'md',
    glass,
    className,
    children,
    asChild,
    ...props
}) => {
    const resolvedGlass = useResolvedGlass(glass);

    const Comp = asChild ? Slot : 'div';
    return (
        <Comp className={cn("w-full", className)} {...props}>
            <div
                className={cn(
                    "grid w-full",
                    bordered && cn(getGlassClasses(resolvedGlass, '', 'border border-[var(--color-border-secondary)]'), "rounded-[var(--radius-md)] overflow-hidden")
                )}
                style={{
                    gridTemplateColumns: `repeat(${column}, minmax(0, 1fr))`,
                }}
            >
                {children}
            </div>
        </Comp>
    );
};

Descriptions.displayName = 'Descriptions';
