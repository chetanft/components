"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface FormHelperProps extends ComposableProps<'p'> {
  /**
   * The helper text content.
   */
  children: React.ReactNode;
}

/**
 * FormHelper Component
 *
 * A composable component for displaying helper text below a Form field.
 * Provides additional context or instructions for the user.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Form>
 *   <FormItem name="username">
 *     <FormLabel>Username</FormLabel>
 *     <FormControl>
 *       <Input />
 *     </FormControl>
 *     <FormHelper>Choose a unique username</FormHelper>
 *   </FormItem>
 * </Form>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<p>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Styled with helper text color from design system.
 */
export const FormHelper = React.forwardRef<HTMLParagraphElement, FormHelperProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'p';
    return (
      <Comp
        ref={ref}
        className={cn("text-sm text-[var(--secondary)]", className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

FormHelper.displayName = 'FormHelper';

