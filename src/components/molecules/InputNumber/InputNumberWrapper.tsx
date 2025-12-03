"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useInputNumberContext } from './InputNumberContext';

export interface InputNumberWrapperProps extends ComposableProps<'div'> {
  /**
   * Wrapper content (typically InputNumberField, InputNumberControls, etc.).
   */
  children?: React.ReactNode;
}

/**
 * InputNumberWrapper Component
 *
 * A composable component for the container wrapper of an InputNumber.
 * Typically wraps InputNumberField and InputNumberControls.
 *
 * @public
 *
 * @example
 * ```tsx
 * <InputNumber value={10}>
 *   <InputNumberWrapper>
 *     <InputNumberField />
 *     <InputNumberControls />
 *   </InputNumberWrapper>
 * </InputNumber>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically styled with border, focus states, and error states.
 */
export const InputNumberWrapper = React.forwardRef<HTMLDivElement, InputNumberWrapperProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const { size, error, disabled, isFocused } = useInputNumberContext();
    
    const sizeConfig = {
      xxs: { height: 'h-4' },
      xs: { height: 'h-6' },
      sm: { height: 'h-8' },
      md: { height: 'h-10' },
      lg: { height: 'h-12' },
      xl: { height: 'h-14' },
      xxl: { height: 'h-16' },
    };
    
    const config = sizeConfig[size];
    
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center",
          "border-2 rounded-[var(--radius-md)]",
          "bg-[var(--bg-primary)]",
          "transition-colors duration-200",
          config.height,
          error
            ? "border-[var(--critical)]"
            : isFocused
              ? "border-[var(--primary)]"
              : "border-[var(--border-primary)] hover:border-[var(--primary)]",
          disabled && "bg-[var(--border-secondary)] cursor-not-allowed opacity-60",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

InputNumberWrapper.displayName = 'InputNumberWrapper';

