import React from 'react';
import { cn } from '../../../lib/utils';

interface SkeletonRowProps {
    columns: number;
    className?: string;
}

export const SkeletonRow: React.FC<SkeletonRowProps> = ({ columns, className }) => {
    return (
        <tr className={cn('animate-pulse', className)}>
            {Array(columns).fill(0).map((_, i) => (
                <td
                    key={i}
                    className="px-[var(--spacing-x4)] py-[var(--spacing-x3)] border-b border-[var(--color-border-primary)]"
                >
                    <div className="h-4 bg-[var(--color-border-secondary)] rounded" />
                </td>
            ))}
        </tr>
    );
};
