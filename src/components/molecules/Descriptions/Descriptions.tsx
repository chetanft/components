import React from 'react';
import { cn } from '../../../lib/utils';
import { Typography } from '../../atoms/Typography';

export interface DescriptionsItemProps {
    label?: React.ReactNode;
    children: React.ReactNode;
    span?: number;
    className?: string;
}

export interface DescriptionsProps {
    title?: React.ReactNode;
    extra?: React.ReactNode;
    bordered?: boolean;
    column?: number;
    layout?: 'horizontal' | 'vertical';
    size?: 'sm' | 'md' | 'lg';
    items: DescriptionsItemProps[];
    className?: string;
}

export const Descriptions: React.FC<DescriptionsProps> = ({
    title,
    extra,
    bordered = false,
    column = 3,
    layout = 'horizontal',
    size = 'md',
    items,
    className,
}) => {
    const sizeStyles = {
        sm: 'p-[var(--spacing-x2)]',
        md: 'p-[var(--spacing-x3)]',
        lg: 'p-[var(--spacing-x4)]',
    };

    return (
        <div className={cn("w-full", className)}>
            {(title || extra) && (
                <div className="flex items-center justify-between mb-[var(--spacing-x4)]">
                    {title && (
                        <Typography variant="title-secondary" className="font-semibold text-[var(--color-primary)]">
                            {title}
                        </Typography>
                    )}
                    {extra && <div>{extra}</div>}
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
                {items.map((item, index) => {
                    const span = item.span || 1;
                    return (
                        <div
                            key={index}
                            className={cn(
                                "flex flex-col",
                                layout === 'horizontal' ? "flex-row" : "flex-col",
                                bordered ? "border-b border-r border-[var(--color-border-secondary)] last:border-b-0" : "pb-[var(--spacing-x4)]",
                                // Remove right border for last item in row if bordered (simplified logic)
                                item.className
                            )}
                            style={{
                                gridColumn: `span ${span}`,
                            }}
                        >
                            {item.label && (
                                <div
                                    className={cn(
                                        "text-[var(--color-secondary)]",
                                        sizeStyles[size],
                                        bordered && "bg-[var(--color-bg-secondary)] font-medium",
                                        layout === 'horizontal' && bordered && "w-[120px] flex-shrink-0 border-r border-[var(--color-border-secondary)]"
                                    )}
                                >
                                    <Typography variant="body-secondary-regular">{item.label}</Typography>
                                </div>
                            )}
                            <div
                                className={cn(
                                    "flex-1",
                                    sizeStyles[size]
                                )}
                            >
                                {React.isValidElement(item.children) ? (
                                    item.children
                                ) : (
                                    <Typography 
                                        variant="body-primary-regular" 
                                        className="whitespace-pre-wrap"
                                        style={{ color: 'var(--primary-500)' }}
                                    >
                                        {item.children}
                                    </Typography>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

Descriptions.displayName = 'Descriptions';
