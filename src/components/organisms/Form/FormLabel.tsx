"use client";

import React from 'react';
import { Label } from '../../atoms/Label/Label';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useFormContext } from './Form';

export interface FormLabelProps extends Omit<ComposableProps<'label'>, 'htmlFor'> {
  /**
   * The label text.
   */
  children: React.ReactNode;
  /**
   * Whether the field is required
   * @default false
   */
  mandatory?: boolean;
}

/**
 * FormLabel Component
 *
 * A composable label component for Form fields.
 * Automatically associates with the form field for accessibility.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Form>
 *   <FormItem name="email">
 *     <FormLabel mandatory>Email Address</FormLabel>
 *     <FormControl>
 *       <Input type="email" />
 *     </FormControl>
 *   </FormItem>
 * </Form>
 * ```
 *
 * @remarks
 * - Wraps the Label component by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically styled based on form layout.
 * - Accessible: maintains proper label-input association.
 */
export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ children, mandatory = false, asChild, className, ...props }, ref) => {
    const { layout, labelCol } = useFormContext();
    
    const labelClasses = className || (
      layout === 'horizontal' 
        ? `flex-shrink-0 text-right pt-[var(--spacing-x2)] w-[${(labelCol / 24) * 100}%]`
        : ''
    );
    
    if (asChild) {
      return (
        <Slot ref={ref} className={labelClasses} {...props}>
          <Label mandatory={mandatory}>
            {children}
          </Label>
        </Slot>
      );
    }
    
    return (
      <div className={labelClasses}>
        <Label ref={ref} mandatory={mandatory} {...props}>
          {children}
        </Label>
      </div>
    );
  }
);

FormLabel.displayName = 'FormLabel';

