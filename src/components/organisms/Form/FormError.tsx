"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface FormErrorProps extends ComposableProps<'p'> {
  /**
   * The error message content.
   */
  children: React.ReactNode;
}

/**
 * FormError Component
 *
 * A composable component for displaying error messages below a Form field.
 * Automatically applies error styling and accessibility attributes.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Form>
 *   <FormItem name="email">
 *     <FormLabel>Email</FormLabel>
 *     <FormControl>
 *       <Input type="email" />
 *     </FormControl>
 *     <FormError>Invalid email address</FormError>
 *   </FormItem>
 * </Form>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<p>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically sets role for accessibility.
 * - Styled with error color from design system.
 */
export const FormError = React.forwardRef<HTMLParagraphElement, FormErrorProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'p';
    return (
      <Comp
        ref={ref}
        role="alert"
        className={cn("text-sm text-critical", className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

FormError.displayName = 'FormError';

