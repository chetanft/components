"use client";

import React from 'react';
import { Label } from '../Label/Label';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useTextareaContext } from './TextareaContext';

export interface TextareaLabelProps extends Omit<ComposableProps<'label'>, 'htmlFor'> {
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
}

/**
 * TextareaLabel Component
 *
 * A composable label component for Textarea fields.
 * Automatically associates with the textarea field for accessibility.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Textarea>
 *   <TextareaLabel mandatory>Description</TextareaLabel>
 *   <TextareaField rows={4} />
 * </Textarea>
 * ```
 *
 * @remarks
 * - Wraps the Label component by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically sets `htmlFor` to match the textarea field ID.
 * - Accessible: maintains proper label-textarea association.
 */
export const TextareaLabel = React.forwardRef<HTMLLabelElement, TextareaLabelProps>(
  ({ children, mandatory = false, optional = false, asChild, ...props }, ref) => {
    const { textareaId } = useTextareaContext();
    
    if (asChild) {
      return (
        <Slot ref={ref} {...props}>
          <Label
            htmlFor={textareaId}
            mandatory={mandatory}
            optional={optional}
            className="mb-2"
          >
            {children}
          </Label>
        </Slot>
      );
    }
    
    return (
      <Label
        ref={ref}
        htmlFor={textareaId}
        mandatory={mandatory}
        optional={optional}
        className="mb-2"
        {...props}
      >
        {children}
      </Label>
    );
  }
);

TextareaLabel.displayName = 'TextareaLabel';

