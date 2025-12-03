"use client";

import React from 'react';
import { Label } from '../Label/Label';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useInputContext } from './InputContext';

export interface InputLabelProps extends Omit<ComposableProps<'label'>, 'htmlFor'> {
  /**
   * The label text.
   */
  children: React.ReactNode;
  /**
   * Shows mandatory indicator (*) next to label
   * @default false
   */
  mandatory?: boolean;
  /**
   * Shows optional indicator next to label
   * @default false
   */
  optional?: boolean;
  /**
   * Shows suffix icon in label
   * @default false
   */
  suffixIcon?: boolean;
  /**
   * Custom icon component for label
   */
  icon?: React.ReactNode;
}

/**
 * InputLabel Component
 *
 * A composable label component for Input fields.
 * Automatically associates with the input field for accessibility.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Input>
 *   <InputLabel mandatory>Email Address</InputLabel>
 *   <InputField type="email" />
 * </Input>
 * ```
 *
 * @remarks
 * - Wraps the Label component by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically sets `htmlFor` to match the input field ID.
 * - Accessible: maintains proper label-input association.
 */
export const InputLabel = React.forwardRef<HTMLDivElement, InputLabelProps>(
  ({ children, mandatory = false, optional = false, suffixIcon = false, icon, asChild, onClick, ...props }, ref) => {
    const { inputId } = useInputContext();
    
    if (asChild) {
      return (
        <Slot ref={ref} {...props}>
          <Label
            htmlFor={inputId}
            mandatory={mandatory}
            optional={optional}
            suffixIcon={suffixIcon}
            icon={icon}
          >
            {children}
          </Label>
        </Slot>
      );
    }
    
    const { onClick: _, ...restProps } = props as any;
    return (
      <div ref={ref}>
        <Label
          htmlFor={inputId}
          mandatory={mandatory}
          optional={optional}
          suffixIcon={suffixIcon}
          icon={icon}
          onClick={onClick as (() => void) | undefined}
          {...restProps}
        >
          {children}
        </Label>
      </div>
    );
  }
);

InputLabel.displayName = 'InputLabel';

