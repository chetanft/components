"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface CheckboxWrapperProps extends ComposableProps<'div'> {
  /**
   * The content of the checkbox wrapper.
   */
  children?: React.ReactNode;
}

/**
 * CheckboxWrapper Component
 *
 * A composable wrapper component that contains all Checkbox sub-components.
 * Provides spacing and layout for the checkbox and its associated elements.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Checkbox>
 *   <CheckboxWrapper>
 *     <CheckboxInput />
 *     <CheckboxLabel>Accept terms</CheckboxLabel>
 *     <CheckboxError>Required</CheckboxError>
 *   </CheckboxWrapper>
 * </Checkbox>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Provides default spacing between checkbox elements.
 */
export const CheckboxWrapper = React.forwardRef<HTMLDivElement, CheckboxWrapperProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn("flex flex-row items-center flex-wrap", className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

CheckboxWrapper.displayName = 'CheckboxWrapper';

