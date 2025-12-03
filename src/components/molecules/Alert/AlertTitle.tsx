"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface AlertTitleProps extends ComposableProps<'h4'> {
  /**
   * The title text.
   */
  children: React.ReactNode;
}

/**
 * AlertTitle Component
 *
 * A composable component for the title of an Alert.
 * Typically used within Alert.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Alert variant="info">
 *   <AlertIcon />
 *   <AlertTitle>Information</AlertTitle>
 *   <AlertDescription>This is an info alert</AlertDescription>
 * </Alert>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<h4>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Uses prominent typography styling.
 */
export const AlertTitle = React.forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'h4';
    return (
      <Comp
        ref={ref}
        className={cn("font-semibold mb-1 text-md-rem", className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

AlertTitle.displayName = 'AlertTitle';

