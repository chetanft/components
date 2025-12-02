import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../../lib/utils';

export interface HoverCardProps {
    children: React.ReactNode;
    content: React.ReactNode;
    openDelay?: number;
    closeDelay?: number;
    width?: number | string;
    className?: string;
    placement?: 'top' | 'bottom' | 'left' | 'right';
}

export const HoverCard: React.FC<HoverCardProps> = ({
    children,
    content,
    openDelay = 200,
    closeDelay = 300,
    width = 320,
    className,
    placement = 'bottom',
}) => {
    const [open, setOpen] = useState(false);
    const openTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        if (!open) {
            openTimeoutRef.current = setTimeout(() => {
                setOpen(true);
            }, openDelay);
        }
    };

    const handleMouseLeave = () => {
        if (openTimeoutRef.current) {
            clearTimeout(openTimeoutRef.current);
            openTimeoutRef.current = null;
        }
        if (open) {
            closeTimeoutRef.current = setTimeout(() => {
                setOpen(false);
            }, closeDelay);
        }
    };

    useEffect(() => {
        return () => {
            if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
            if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        };
    }, []);

    const placementStyles = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="inline-block">
                {children}
            </div>

            {open && (
                <div
                    className={cn(
                        "absolute z-50",
                        "bg-[var(--color-bg-primary)] rounded-[var(--radius-md)]",
                        "border border-[var(--color-border-secondary)]",
                        "p-[var(--spacing-x4)]",
                        placementStyles[placement],
                        className
                    )}
                    style={{ boxShadow: 'var(--shadow-xl)', width }}
                >
                    {content}
                </div>
            )}
        </div>
    );
};

HoverCard.displayName = 'HoverCard';
