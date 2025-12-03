"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Button } from '../../atoms/Button/Button';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { usePopconfirmContext } from './PopconfirmContext';

export interface PopconfirmActionsProps extends ComposableProps<'div'> {
  /**
   * OK button text
   * @default 'Yes'
   */
  okText?: string;
  /**
   * Cancel button text
   * @default 'No'
   */
  cancelText?: string;
  /**
   * OK button type
   * @default 'primary'
   */
  okType?: 'primary' | 'danger' | 'default';
  /**
   * Custom actions content (when using asChild)
   */
  children?: React.ReactNode;
}

/**
 * PopconfirmActions Component
 *
 * A composable component for action buttons in a Popconfirm.
 * Typically used within PopconfirmContent.
 *
 * @public
 *
 * @example
 * ```tsx
 * <PopconfirmContent>
 *   <PopconfirmTitle>Are you sure?</PopconfirmTitle>
 *   <PopconfirmActions okText="Delete" cancelText="Cancel" okType="danger" />
 * </PopconfirmContent>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically handles confirm and cancel actions.
 */
export const PopconfirmActions = React.forwardRef<HTMLDivElement, PopconfirmActionsProps>(
  ({ className, children, okText = 'Yes', cancelText = 'No', okType = 'primary', asChild, ...props }, ref) => {
    const { setOpen, onConfirm, onCancel } = usePopconfirmContext();
    
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
    
    if (asChild) {
      return (
        <Slot ref={ref} className={className} {...props}>
          {children}
        </Slot>
      );
    }
    
    return (
      <div
        ref={ref}
        className={cn("flex justify-end gap-[var(--spacing-x2)] mt-[var(--spacing-x4)]", className)}
        {...props}
      >
        {children || (
          <>
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
          </>
        )}
      </div>
    );
  }
);

PopconfirmActions.displayName = 'PopconfirmActions';

