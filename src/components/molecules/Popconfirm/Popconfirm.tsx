import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../../atoms/Button/Button';
import { Typography } from '../../atoms/Typography';
import { Icon, IconName } from '../../atoms/Icons';
import { cn } from '../../../lib/utils';

export type PopconfirmPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface PopconfirmProps {
    title: string;
    description?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    okText?: string;
    cancelText?: string;
    okType?: 'primary' | 'danger' | 'default';
    icon?: IconName;
    placement?: PopconfirmPlacement;
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
}

export const Popconfirm: React.FC<PopconfirmProps> = ({
    title,
    description,
    onConfirm,
    onCancel,
    okText = 'Yes',
    cancelText = 'No',
    okType = 'primary',
    icon = 'triangle-alert',
    placement = 'top',
    children,
    disabled = false,
    className,
}) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleOpen = () => {
        if (!disabled) {
            setOpen(true);
        }
    };

    const handleCancel = (e: React.MouseEvent) => {
        e.stopPropagation();
        setOpen(false);
        onCancel?.();
    };

    const handleConfirm = (e: React.MouseEvent) => {
        e.stopPropagation();
        setOpen(false);
        onConfirm?.();
    };

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    // Styles based on placement
    const placementStyles = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    };

    const arrowStyles = {
        top: 'top-full left-1/2 -translate-x-1/2 border-t-[var(--color-bg-primary)] border-l-transparent border-r-transparent border-b-transparent',
        bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-[var(--color-bg-primary)] border-l-transparent border-r-transparent border-t-transparent',
        left: 'left-full top-1/2 -translate-y-1/2 border-l-[var(--color-bg-primary)] border-t-transparent border-b-transparent border-r-transparent',
        right: 'right-full top-1/2 -translate-y-1/2 border-r-[var(--color-bg-primary)] border-t-transparent border-b-transparent border-l-transparent',
    };

    return (
        <div className={cn("relative inline-block", className)} ref={containerRef}>
            <div onClick={handleOpen} className="inline-block">
                {children}
            </div>

            {open && (
                <div
                    className={cn(
                        "absolute z-50 min-w-[200px] max-w-[300px]",
                        "bg-[var(--color-bg-primary)] rounded-[var(--radius-md)]",
                        "border border-[var(--color-border-secondary)]",
                        "p-[var(--spacing-x4)]",
                        placementStyles[placement]
                    )}
                    style={{ boxShadow: 'var(--shadow-lg)' }}
                >
                    <div className="flex gap-[var(--spacing-x3)]">
                        <div className="flex-shrink-0 mt-0.5">
                            <Icon name={icon} size={16} className="text-[var(--color-warning)]" />
                        </div>
                        <div className="flex flex-col gap-[var(--spacing-x2)]">
                            <Typography variant="body-primary-medium" className="text-[var(--color-primary)]">
                                {title}
                            </Typography>
                            {description && (
                                <Typography variant="body-secondary-regular" className="text-[var(--color-secondary)]">
                                    {description}
                                </Typography>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-[var(--spacing-x2)] mt-[var(--spacing-x4)]">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={handleCancel}
                        >
                            {cancelText}
                        </Button>
                        <Button
                            variant={okType === 'danger' ? 'destructive' : 'primary'}
                            size="sm"
                            onClick={handleConfirm}
                        >
                            {okText}
                        </Button>
                    </div>

                    {/* Arrow */}
                    <div
                        className={cn(
                            "absolute w-0 h-0 border-[6px]",
                            arrowStyles[placement]
                        )}
                    />
                </div>
            )}
        </div>
    );
};

Popconfirm.displayName = 'Popconfirm';
