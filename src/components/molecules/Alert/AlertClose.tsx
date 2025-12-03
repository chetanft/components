"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useAlertContext } from './AlertContext';

export interface AlertCloseProps extends ComposableProps<'button'> {
  /**
   * Custom close handler (optional, uses Alert's onClose if not provided)
   */
  onClose?: () => void;
}

/**
 * AlertClose Component
 *
 * A composable component for the close button in an Alert.
 * Automatically handles close functionality.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Alert variant="info" closable>
 *   <AlertIcon />
 *   <AlertTitle>Information</AlertTitle>
 *   <AlertDescription>This is an info alert</AlertDescription>
 *   <AlertClose />
 * </Alert>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<button>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically calls Alert's onClose callback.
 * - Accessible: includes ARIA label for screen readers.
 */
export const AlertClose = React.forwardRef<HTMLButtonElement, AlertCloseProps>(
  ({ className, onClose: customOnClose, asChild, onClick, ...props }, ref) => {
    const { onClose } = useAlertContext();
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      customOnClose?.() || onClose?.();
      onClick?.(e);
    };
    
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        type="button"
        onClick={handleClick}
        className={cn(
          "flex-shrink-0 ml-2 h-fit",
          "p-1 rounded-[var(--radius-sm)]",
          "hover:bg-black/5",
          "transition-colors duration-[var(--transition-fast)]",
          "focus:outline-none focus:ring-2 focus:ring-[var(--color-neutral)] focus:ring-opacity-20",
          className
        )}
        aria-label="Close alert"
        {...props}
      >
        <Icon name="cross" size={16} />
      </Comp>
    );
  }
);

AlertClose.displayName = 'AlertClose';

