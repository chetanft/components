"use client";
import React, { useState, useRef } from 'react';
import { IconName } from '../../atoms/Icons';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { PopconfirmProvider } from './PopconfirmContext';
import { PopconfirmContent } from './PopconfirmContent';
import { PopconfirmTitle } from './PopconfirmTitle';
import { PopconfirmDescription } from './PopconfirmDescription';
import { PopconfirmActions } from './PopconfirmActions';
import { PopconfirmIcon } from './PopconfirmIcon';
import { PopconfirmArrow } from './PopconfirmArrow';

export type PopconfirmPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface PopconfirmProps extends Omit<ComposableProps<'div'>, 'onConfirm' | 'onCancel'> {
    /**
     * Title text (for declarative API)
     * @deprecated Use PopconfirmTitle component instead
     */
    title?: string;
    /**
     * Description text (for declarative API)
     * @deprecated Use PopconfirmDescription component instead
     */
    description?: string;
    /**
     * Confirm handler
     */
    onConfirm?: () => void;
    /**
     * Cancel handler
     */
    onCancel?: () => void;
    /**
     * OK button text (for declarative API)
     * @default 'Yes'
     * @deprecated Use PopconfirmActions component instead
     */
    okText?: string;
    /**
     * Cancel button text (for declarative API)
     * @default 'No'
     * @deprecated Use PopconfirmActions component instead
     */
    cancelText?: string;
    /**
     * OK button type (for declarative API)
     * @default 'primary'
     * @deprecated Use PopconfirmActions component instead
     */
    okType?: 'primary' | 'danger' | 'default';
    /**
     * Icon name (for declarative API)
     * @default 'triangle-alert'
     * @deprecated Use PopconfirmIcon component instead
     */
    icon?: IconName;
    /**
     * Placement
     * @default 'top'
     */
    placement?: PopconfirmPlacement;
    /**
     * Trigger content (for declarative API)
     * @deprecated Use PopconfirmTrigger component instead
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
 * Supports both composable API (recommended) and declarative API (deprecated).
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Composable API (recommended)
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
 * 
 * // Declarative API (deprecated)
 * <Popconfirm
 *   title="Are you sure?"
 *   description="This action cannot be undone."
 *   onConfirm={handleConfirm}
 * >
 *   <Button>Delete</Button>
 * </Popconfirm>
 * ```
 * 
 * @remarks
 * - Composable API provides maximum flexibility and control
 * - All sub-components (PopconfirmTrigger, PopconfirmContent, etc.) support `asChild`
 * - Supports custom placement and styling
 * - Declarative API is deprecated but still functional for backward compatibility
 */
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
    asChild,
}) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Check if using composable API (has children with Popconfirm sub-components)
    const hasComposableChildren = React.Children.toArray(children).some((child: any) => 
        child?.type?.displayName?.startsWith('Popconfirm')
    );
    
    // Create context value
    const contextValue = {
        open,
        setOpen,
        disabled,
        placement,
        icon,
        onConfirm,
        onCancel,
        containerRef,
    };
    
    // If using composable API, render with context provider
    if (hasComposableChildren) {
        if (process.env.NODE_ENV !== 'production' && (title || description)) {
            console.warn(
                'Popconfirm: Using deprecated props (title, description) with composable API. ' +
                'Please use PopconfirmTitle and PopconfirmDescription components instead. ' +
                'See migration guide: docs/migrations/composable-migration.md'
            );
        }
        
        const Comp = asChild ? Slot : 'div';
        return (
            <PopconfirmProvider value={contextValue}>
                <Comp className={cn("relative inline-block", className)} ref={containerRef}>
                    {children}
                </Comp>
            </PopconfirmProvider>
        );
    }
    
    // Otherwise use declarative API (deprecated)
    if (process.env.NODE_ENV !== 'production' && title) {
        console.warn(
            'Popconfirm: Declarative API (title, description props) is deprecated. ' +
            'Please migrate to composable API using PopconfirmTrigger, PopconfirmContent, PopconfirmTitle, etc. ' +
            'See migration guide: docs/migrations/composable-migration.md'
        );
    }
    
    const handleOpen = () => {
        if (!disabled) {
            setOpen(true);
        }
    };

    const _handleCancel = (e: React.MouseEvent) => {
        e.stopPropagation();
        setOpen(false);
        onCancel?.();
    };

    const _handleConfirm = (e: React.MouseEvent) => {
        e.stopPropagation();
        setOpen(false);
        onConfirm?.();
    };

    // Styles based on placement
    const _placementStyles = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    };

    const _arrowStyles = {
        top: 'top-full left-1/2 -translate-x-1/2 border-t-[var(--color-bg-primary)] border-l-transparent border-r-transparent border-b-transparent',
        bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-[var(--color-bg-primary)] border-l-transparent border-r-transparent border-t-transparent',
        left: 'left-full top-1/2 -translate-y-1/2 border-l-[var(--color-bg-primary)] border-t-transparent border-b-transparent border-r-transparent',
        right: 'right-full top-1/2 -translate-y-1/2 border-r-[var(--color-bg-primary)] border-t-transparent border-b-transparent border-l-transparent',
    };

    return (
        <PopconfirmProvider value={contextValue}>
            <div className={cn("relative inline-block", className)} ref={containerRef}>
                <div onClick={handleOpen} className="inline-block">
                    {children}
                </div>

                {open && (
                    <PopconfirmContent>
                        <div className="flex gap-[var(--spacing-x3)]">
                            <PopconfirmIcon />
                            <div className="flex flex-col gap-[var(--spacing-x2)]">
                                {title && <PopconfirmTitle>{title}</PopconfirmTitle>}
                                {description && <PopconfirmDescription>{description}</PopconfirmDescription>}
                            </div>
                        </div>

                        <PopconfirmActions okText={okText} cancelText={cancelText} okType={okType} />
                        <PopconfirmArrow />
                    </PopconfirmContent>
                )}
            </div>
        </PopconfirmProvider>
    );
};

Popconfirm.displayName = 'Popconfirm';
