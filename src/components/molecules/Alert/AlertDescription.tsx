"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface AlertDescriptionProps extends ComposableProps<'div'> {
  /**
   * The description/message content.
   */
  children: React.ReactNode;
}

/**
 * AlertDescription Component
 *
 * A composable component for the description/message of an Alert.
 * Typically used within Alert.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Alert variant="info">
 *   <AlertIcon />
 *   <AlertTitle>Information</AlertTitle>
 *   <AlertDescription>This is an info alert message</AlertDescription>
 * </Alert>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Uses body text styling.
 */
export const AlertDescription = React.forwardRef<HTMLDivElement, AlertDescriptionProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn("text-sm-rem", className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

AlertDescription.displayName = 'AlertDescription';

