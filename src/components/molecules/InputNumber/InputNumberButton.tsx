"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useInputNumberContext } from './InputNumberContext';

export interface InputNumberButtonProps extends ComposableProps<'button'> {
  /**
   * Button direction
   */
  direction: 'up' | 'down';
  /**
   * Custom button content (when using asChild)
   */
  children?: React.ReactNode;
}

/**
 * InputNumberButton Component
 *
 * A composable component for increment/decrement buttons.
 * Typically used within InputNumberControls.
 *
 * @public
 *
 * @example
 * ```tsx
 * <InputNumberControls>
 *   <InputNumberButton direction="up" />
 *   <InputNumberButton direction="down" />
 * </InputNumberControls>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<button>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically handles disabled state and click handlers.
 */
export const InputNumberButton = React.forwardRef<HTMLButtonElement, InputNumberButtonProps>(
  ({ className, direction, children, asChild, onClick, ...props }, ref) => {
    const {
      disabled,
      size,
      controlsPosition,
      handleIncrement,
      handleDecrement,
      canIncrement,
      canDecrement,
    } = useInputNumberContext();
    
    const sizeConfig = {
      xxs: { button: 'w-4', icon: 10 },
      xs: { button: 'w-5', icon: 12 },
      sm: { button: 'w-6', icon: 14 },
      md: { button: 'w-8', icon: 16 },
      lg: { button: 'w-10', icon: 18 },
      xl: { button: 'w-11', icon: 20 },
      xxl: { button: 'w-12', icon: 22 },
    };
    
    const config = sizeConfig[size];
    const isDisabled = disabled || (direction === 'up' ? !canIncrement : !canDecrement);
    const handleClick = direction === 'up' ? handleIncrement : handleDecrement;
    
    if (asChild) {
      return (
        <Slot
          ref={ref}
          type="button"
          tabIndex={-1}
          disabled={isDisabled}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            handleClick();
            onClick?.(e);
          }}
          className={cn(
            "flex items-center justify-center",
            "transition-colors duration-150",
            "text-[var(--tertiary)] hover:text-[var(--primary)]",
            "hover:bg-[var(--border-secondary)]",
            "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent",
            controlsPosition === 'right' && "border-l border-[var(--border-primary)]",
            controlsPosition === 'right' && config.button,
            controlsPosition === 'both' && config.button,
            controlsPosition === 'right' && direction === 'up' && "border-b border-[var(--border-primary)] flex-1",
            controlsPosition === 'right' && direction === 'down' && "flex-1",
            className
          )}
          {...props}
        >
          {children || (
            <Icon
              name={direction === 'up' ? 'chevron-up' : 'chevron-down'}
              size={controlsPosition === 'right' ? config.icon - 2 : config.icon}
            />
          )}
        </Slot>
      );
    }
    
    return (
      <button
        ref={ref}
        type="button"
        tabIndex={-1}
        disabled={isDisabled}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          handleClick();
          onClick?.(e);
        }}
        className={cn(
          "flex items-center justify-center",
          "transition-colors duration-150",
          "text-[var(--tertiary)] hover:text-[var(--primary)]",
          "hover:bg-[var(--border-secondary)]",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent",
          controlsPosition === 'right' && "border-l border-[var(--border-primary)]",
          controlsPosition === 'right' && config.button,
          controlsPosition === 'both' && config.button,
          controlsPosition === 'right' && direction === 'up' && "border-b border-[var(--border-primary)] flex-1",
          controlsPosition === 'right' && direction === 'down' && "flex-1",
          className
        )}
        {...props}
      >
        {children || (
          <Icon
            name={direction === 'up' ? 'chevron-up' : 'chevron-down'}
            size={controlsPosition === 'right' ? config.icon - 2 : config.icon}
          />
        )}
      </button>
    );
  }
);

InputNumberButton.displayName = 'InputNumberButton';

