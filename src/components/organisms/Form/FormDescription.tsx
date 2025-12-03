"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface FormDescriptionProps extends ComposableProps<'p'> {
  /**
   * The description text content.
   */
  children: React.ReactNode;
}

/**
 * FormDescription Component
 *
 * A composable component for displaying description text below a Form field.
 * Provides additional context or instructions for the user.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Form>
 *   <FormItem name="password">
 *     <FormLabel>Password</FormLabel>
 *     <FormControl>
 *       <Input type="password" />
 *     </FormControl>
 *     <FormDescription>Must be at least 8 characters</FormDescription>
 *   </FormItem>
 * </Form>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<p>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Styled with description text color from design system.
 */
export const FormDescription = React.forwardRef<HTMLParagraphElement, FormDescriptionProps>(
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

FormDescription.displayName = 'FormDescription';

