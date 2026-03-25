"use client";
import React from 'react';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import { HoverCardProvider } from './HoverCardContext';

export interface HoverCardProps {
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
}) => {
    return (
        <HoverCardProvider value={{ placement, width }}>
            <HoverCardPrimitive.Root
                openDelay={openDelay}
                closeDelay={closeDelay}
            >
                {children}
            </HoverCardPrimitive.Root>
        </HoverCardProvider>
    );
};

HoverCard.displayName = 'HoverCard';
