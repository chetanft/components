"use client";

import React from 'react';
import { cn } from '../../../../lib/utils';
import { Skeleton } from '../../../atoms/Skeleton';
import { useCardContext } from '../Card.context';

export interface CardSkeletonProps {
    /** Size variant for skeleton */
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

/**
 * CardSkeleton - Loading skeleton for Card
 * 
 * Displays a skeleton loader that matches the card layout
 * while content is loading.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * <Card loading>
 *   {/* CardSkeleton is automatically rendered when loading=true *\/}
 * </Card>
 * ```
 */
export const CardSkeleton: React.FC<CardSkeletonProps> = ({ size, className }) => {
    const context = useCardContext();
    const cardSize = size ?? context?.size ?? 'md';

    const padding = {
        sm: 'p-[var(--spacing-x3)]',
        md: 'p-[var(--spacing-x6)]',
        lg: 'p-[var(--spacing-x8)]',
    }[cardSize];

    return (
        <div data-slot="card-skeleton" className={cn(padding, className)}>
            <Skeleton height="var(--spacing-x6)" width="30%" className="mb-[var(--spacing-x4)]" />
            <Skeleton height="var(--spacing-x4)" className="mb-[var(--spacing-x2)]" />
            <Skeleton height="var(--spacing-x4)" className="mb-[var(--spacing-x2)]" />
            <Skeleton height="var(--spacing-x4)" width="80%" />
        </div>
    );
};

CardSkeleton.displayName = 'CardSkeleton';
(CardSkeleton as any).slot = 'card-skeleton';
