"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useFormContext } from './Form';

export interface FormControlProps extends ComposableProps<'div'> {
  /**
   * The form control element (Input, Select, etc.).
   */
  children?: React.ReactNode;
}

/**
 * FormControl Component
 *
 * A composable wrapper component for form control elements.
 * Provides proper spacing and layout for form controls.
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
 *   </FormItem>
 * </Form>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically styled based on form layout.
 * - Provides proper spacing for form controls.
 */
export const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const { layout, wrapperCol } = useFormContext();
    
    const wrapperClasses = cn(
      'flex-1 flex flex-col gap-[var(--spacing-x1)]',
      layout === 'horizontal' && `w-[${(wrapperCol / 24) * 100}%]`,
      className
    );
    
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={wrapperClasses}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

FormControl.displayName = 'FormControl';

