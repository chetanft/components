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
        sm: 'p-3',
        md: 'p-6',
        lg: 'p-8',
    }[cardSize];

    return (
        <div className={cn(padding, className)}>
            <Skeleton height="24px" width="30%" className="mb-4" />
            <Skeleton height="16px" className="mb-2" />
            <Skeleton height="16px" className="mb-2" />
            <Skeleton height="16px" width="80%" />
        </div>
    );
};

CardSkeleton.displayName = 'CardSkeleton';
