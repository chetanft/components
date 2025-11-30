import React from 'react';
import { cn } from '../../../lib/utils';
import { Typography } from '../../atoms/Typography';
import { Spin } from '../../atoms/Spin';

export interface ListProps<T> {
    dataSource?: T[];
    renderItem?: (item: T, index: number) => React.ReactNode;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    bordered?: boolean;
    split?: boolean;
    loading?: boolean;
    size?: 'sm' | 'md' | 'lg';
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
    className?: string;
    children?: React.ReactNode;
}

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

    const headerClasses = cn(
        "border-b border-[var(--color-border-secondary)]",
        sizeStyles[size]
    );

    const footerClasses = cn(
        "border-t border-[var(--color-border-secondary)]",
        sizeStyles[size]
    );

    const itemClasses = (index: number) => cn(
        "flex items-center justify-between",
        sizeStyles[size],
        split && index !== (dataSource.length - 1) && "border-b border-[var(--color-border-secondary)]"
    );

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
            <ul className="m-0 p-0 list-none">
                {dataSource.map((item, index) => (
                    <li key={index} className={itemClasses(index)}>
                        {renderItem ? renderItem(item, index) : String(item)}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className={containerClasses}>
            {header && <div className={headerClasses}>{header}</div>}
            {renderContent()}
            {footer && <div className={footerClasses}>{footer}</div>}
        </div>
    );
}

List.displayName = 'List';
