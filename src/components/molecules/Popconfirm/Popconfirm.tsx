"use client";
import React, { useState, useRef } from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { PopconfirmProvider } from './PopconfirmContext';

export type PopconfirmPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface PopconfirmProps extends Omit<ComposableProps<'div'>, 'onConfirm' | 'onCancel'> {
    /**
     * Confirm handler
     */
    onConfirm?: () => void;
    /**
     * Cancel handler
     */
    onCancel?: () => void;
    /**
     * Placement
     * @default 'top'
     */
    placement?: PopconfirmPlacement;
    /**
     * Popconfirm content (composable API)
     */
    children?: React.ReactNode;
    /**
     * Disabled state
     * @default false
     */
    disabled?: boolean;
    /**
     * Additional CSS classes
     */
    className?: string;
}

/**
 * Popconfirm Component
 *
 * A confirmation popup component triggered by user action.
 * Uses composable API with PopconfirmTrigger, PopconfirmContent,
 * PopconfirmTitle, PopconfirmDescription, PopconfirmActions,
 * PopconfirmIcon, and PopconfirmArrow sub-components.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Popconfirm onConfirm={handleConfirm} placement="top">
 *   <PopconfirmTrigger>
 *     <Button>Delete</Button>
 *   </PopconfirmTrigger>
 *   <PopconfirmContent>
 *     <PopconfirmIcon />
 *     <PopconfirmTitle>Are you sure?</PopconfirmTitle>
 *     <PopconfirmDescription>This action cannot be undone.</PopconfirmDescription>
 *     <PopconfirmActions />
 *     <PopconfirmArrow />
 *   </PopconfirmContent>
 * </Popconfirm>
 * ```
 *
 * @remarks
 * - Composable API provides maximum flexibility and control
 * - All sub-components (PopconfirmTrigger, PopconfirmContent, etc.) support `asChild`
 * - Supports custom placement and styling
 */
export const Popconfirm: React.FC<PopconfirmProps> = ({
    onConfirm,
    onCancel,
    placement = 'top',
    children,
    disabled = false,
    className,
    asChild,
}) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Create context value
    const contextValue = {
        open,
        setOpen,
        disabled,
        placement,
        icon: undefined,
        onConfirm,
        onCancel,
        containerRef,
    };

    const Comp = asChild ? Slot : 'div';
    return (
        <PopconfirmProvider value={contextValue}>
            <Comp className={cn("relative inline-block", className)} ref={containerRef}>
                {children}
            </Comp>
        </PopconfirmProvider>
    );
};

Popconfirm.displayName = 'Popconfirm';
