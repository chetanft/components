"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Typography, type TypographyColor } from '../Typography';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useRadioGroupContext } from './RadioGroupContext';

export interface RadioItemLabelProps extends ComposableProps<'span'> {
  /**
   * The label text for this radio item.
   */
  children: React.ReactNode;
}

/**
 * RadioItemLabel Component
 *
 * A composable label component for individual radio items.
 * Automatically styled based on radio group state and context.
 *
 * @public
 *
 * @example
 * ```tsx
 * <RadioGroup name="choice" value={value} onValueChange={setValue}>
 *   <RadioItem value="option1">
 *     <RadioItemInput />
 *     <RadioItemLabel>Option 1</RadioItemLabel>
 *   </RadioItem>
 * </RadioGroup>
 * ```
 *
 * @remarks
 * - Wraps the Typography component by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically styled based on selection and disabled states.
 * - Accessible: maintains proper label-input association.
 */
export const RadioItemLabel = React.forwardRef<HTMLSpanElement, RadioItemLabelProps>(
  ({ className, children, asChild, color: _color, ...props }, ref) => {
    const { size, disabled: groupDisabled } = useRadioGroupContext();
    
    const sizeStyles = {
      sm: { variant: "body-secondary-regular" as const },
      md: { variant: "body-secondary-medium" as const }
    };

    const currentSize = sizeStyles[size];
    const labelColor: TypographyColor = groupDisabled ? 'muted' : 'primary';
    
    if (asChild) {
      return (
        <Slot ref={ref} {...props}>
          <Typography
            variant={currentSize.variant}
            color={labelColor}
            as="span"
            className={cn(groupDisabled && "cursor-not-allowed", className)}
          >
            {children}
          </Typography>
        </Slot>
      );
    }
    
    const { color: _, ...restProps } = props as any;
    return (
      <Typography
        ref={ref}
        variant={currentSize.variant}
        color={labelColor}
        as="span"
        className={cn(groupDisabled && "cursor-not-allowed", className)}
        {...restProps}
      >
        {children}
      </Typography>
    );
  }
);

RadioItemLabel.displayName = 'RadioItemLabel';

