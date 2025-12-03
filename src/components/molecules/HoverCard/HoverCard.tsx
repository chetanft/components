"use client";
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { HoverCardProvider } from './HoverCardContext';
import { HoverCardTrigger } from './HoverCardTrigger';
import { HoverCardContent } from './HoverCardContent';

export interface HoverCardProps extends Omit<ComposableProps<'div'>, 'children' | 'content'> {
    /**
     * Trigger content (for declarative API)
     * @deprecated Use HoverCardTrigger component instead
     */
    children?: React.ReactNode;
    /**
     * Card content (for declarative API)
     * @deprecated Use HoverCardContent component instead
     */
    content?: React.ReactNode;
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
 * Supports both composable API (recommended) and declarative API (deprecated).
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Composable API (recommended)
 * <HoverCard openDelay={200} closeDelay={300}>
 *   <HoverCardTrigger>
 *     <Button>Hover me</Button>
 *   </HoverCardTrigger>
 *   <HoverCardContent>
 *     <p>Card content</p>
 *   </HoverCardContent>
 * </HoverCard>
 * 
 * // Declarative API (deprecated)
 * <HoverCard content={<p>Card content</p>}>
 *   <Button>Hover me</Button>
 * </HoverCard>
 * ```
 * 
 * @remarks
 * - Composable API provides maximum flexibility and control
 * - All sub-components (HoverCardTrigger, HoverCardContent) support `asChild`
 * - Supports custom delays and placement
 * - Declarative API is deprecated but still functional for backward compatibility
 */
export const HoverCard: React.FC<HoverCardProps> = ({
    children,
    content,
    openDelay = 200,
    closeDelay = 300,
    width = 320,
    className,
    placement = 'bottom',
    asChild,
}) => {
    const [open, setOpen] = useState(false);
    const openTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    
    // Check if using composable API (has children with HoverCard sub-components)
    const hasComposableChildren = React.Children.toArray(children).some((child: any) => 
        child?.type?.displayName?.startsWith('HoverCard')
    );
    
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
    
    // If using composable API, render with context provider
    if (hasComposableChildren) {
        if (process.env.NODE_ENV !== 'production' && content) {
            console.warn(
                'HoverCard: Using deprecated props (content) with composable API. ' +
                'Please use HoverCardContent component instead. ' +
                'See migration guide: docs/migrations/composable-migration.md'
            );
        }
        
        const Comp = asChild ? Slot : 'div';
        return (
            <HoverCardProvider value={contextValue}>
                <Comp className="relative inline-block">
                    {children}
                </Comp>
            </HoverCardProvider>
        );
    }
    
    // Otherwise use declarative API (deprecated)
    if (process.env.NODE_ENV !== 'production' && content) {
        console.warn(
            'HoverCard: Declarative API (content prop) is deprecated. ' +
            'Please migrate to composable API using HoverCardTrigger and HoverCardContent components. ' +
            'See migration guide: docs/migrations/composable-migration.md'
        );
    }
    
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

    return (
        <HoverCardProvider value={contextValue}>
            <div
                className="relative inline-block"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="inline-block">
                    {children}
                </div>
                {content && <HoverCardContent>{content}</HoverCardContent>}
            </div>
        </HoverCardProvider>
    );
};

HoverCard.displayName = 'HoverCard';
