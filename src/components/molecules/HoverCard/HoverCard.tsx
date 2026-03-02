"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { HoverCardProvider } from './HoverCardContext';

export interface HoverCardProps extends Omit<ComposableProps<'div'>, 'children'> {
    /**
     * HoverCard children (composable API sub-components)
     */
    children?: React.ReactNode;
    /**
     * Open delay in milliseconds
     * @default 200
     */
    openDelay?: number;
    /**
     * Close delay in milliseconds
     * @default 300
     */
    closeDelay?: number;
    /**
     * Card width
     * @default 320
     */
    width?: number | string;
    /**
     * Additional CSS classes
     */
    className?: string;
    /**
     * Placement
     * @default 'bottom'
     */
    placement?: 'top' | 'bottom' | 'left' | 'right';
}

/**
 * HoverCard Component
 * 
 * A card that appears on hover with customizable content.
 * Uses composable API with sub-components for maximum flexibility.
 *
 * @public
 *
 * @example
 * ```tsx
 * <HoverCard openDelay={200} closeDelay={300}>
 *   <HoverCardTrigger>
 *     <Button>Hover me</Button>
 *   </HoverCardTrigger>
 *   <HoverCardContent>
 *     <p>Card content</p>
 *   </HoverCardContent>
 * </HoverCard>
 * ```
 *
 * @remarks
 * - All sub-components (HoverCardTrigger, HoverCardContent) support `asChild`
 * - Supports custom delays and placement
 */
export const HoverCard: React.FC<HoverCardProps> = ({
    children,
    openDelay = 200,
    closeDelay = 300,
    width = 320,
    className: _className,
    placement = 'bottom',
    asChild,
}) => {
    const [open, setOpen] = useState(false);
    const openTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Create context value
    const contextValue = {
        open,
        setOpen,
        openDelay,
        closeDelay,
        placement,
        width,
        openTimeoutRef,
        closeTimeoutRef,
    };

    useEffect(() => {
        return () => {
            if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
            if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        };
    }, []);

    const Comp = asChild ? Slot : 'div';
    return (
        <HoverCardProvider value={contextValue}>
            <Comp className="relative inline-block">
                {children}
            </Comp>
        </HoverCardProvider>
    );
};

HoverCard.displayName = 'HoverCard';
