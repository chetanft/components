"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Typography } from '../Typography';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useSwitchContext } from './SwitchContext';

export interface SwitchLabelProps extends ComposableProps<'span'> {
  /**
   * The label text.
   */
  children: React.ReactNode;
}

/**
 * SwitchLabel Component
 *
 * A composable label component for Switch inputs.
 * Automatically styled based on switch state and context.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Switch>
 *   <SwitchInput />
 *   <SwitchLabel>Enable notifications</SwitchLabel>
 * </Switch>
 * ```
 *
 * @remarks
 * - Wraps the Typography component by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically styled based on disabled state.
 * - Accessible: maintains proper label-input association.
 */
export const SwitchLabel = React.forwardRef<HTMLSpanElement, SwitchLabelProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const { size, disabled: contextDisabled } = useSwitchContext();
    
    const sizeStyles = {
      sm: { variant: "body-secondary-regular" as const },
      md: { variant: "body-secondary-medium" as const }
    };

    const currentSize = sizeStyles[size];
    const labelColor = contextDisabled ? 'muted' : 'primary';
    
    if (asChild) {
      return (
        <Slot ref={ref} {...props}>
          <Typography
            variant={currentSize.variant}
            color={labelColor}
            as="span"
            className={cn(contextDisabled && "cursor-not-allowed", className)}
          >
            {children}
          </Typography>
        </Slot>
      );
    }
    
    return (
      <Typography
        ref={ref}
        variant={currentSize.variant}
        color={labelColor}
        as="span"
        className={cn(contextDisabled && "cursor-not-allowed", className)}
        {...props}
      >
        {children}
      </Typography>
    );
  }
);

SwitchLabel.displayName = 'SwitchLabel';

