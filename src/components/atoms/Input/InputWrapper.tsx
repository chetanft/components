"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface InputWrapperProps extends ComposableProps<'div'> {
  /**
   * The content of the input wrapper.
   */
  children?: React.ReactNode;
}

/**
 * InputWrapper Component
 *
 * A composable wrapper component that contains all Input sub-components.
 * Provides spacing and layout for the input field and its associated elements.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Input>
 *   <InputWrapper>
 *     <InputLabel>Email</InputLabel>
 *     <InputField type="email" />
 *     <InputError>Invalid email</InputError>
 *   </InputWrapper>
 * </Input>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Provides default spacing between input elements.
 */
export const InputWrapper = React.forwardRef<HTMLDivElement, InputWrapperProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn("w-full space-y-2", className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

InputWrapper.displayName = 'InputWrapper';

