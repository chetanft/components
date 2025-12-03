"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useInputNumberContext } from './InputNumberContext';

export interface InputNumberSuffixProps extends ComposableProps<'span'> {
  /**
   * Suffix content.
   */
  children: React.ReactNode;
}

/**
 * InputNumberSuffix Component
 *
 * A composable component for suffix content in an InputNumber.
 * Typically used within InputNumberWrapper.
 *
 * @public
 *
 * @example
 * ```tsx
 * <InputNumberWrapper>
 *   <InputNumberField />
 *   <InputNumberSuffix>%</InputNumberSuffix>
 * </InputNumberWrapper>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<span>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically styled with proper spacing and text color.
 */
export const InputNumberSuffix = React.forwardRef<HTMLSpanElement, InputNumberSuffixProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const { size } = useInputNumberContext();
    
    const sizeConfig = {
      xxs: { text: 'text-xs' },
      xs: { text: 'text-sm' },
      sm: { text: 'text-sm' },
      md: { text: 'text-base' },
      lg: { text: 'text-lg' },
      xl: { text: 'text-xl' },
      xxl: { text: 'text-2xl' },
    };
    
    const config = sizeConfig[size];
    
    const Comp = asChild ? Slot : 'span';
    return (
      <Comp
        ref={ref}
        className={cn("text-[var(--tertiary)] pr-[var(--spacing-x3)]", config.text, className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

InputNumberSuffix.displayName = 'InputNumberSuffix';

