"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface AlertActionProps extends ComposableProps<'div'> {
  /**
   * The action content (typically buttons).
   */
  children?: React.ReactNode;
}

/**
 * AlertAction Component
 *
 * A composable component for action buttons in an Alert.
 * Typically contains Button components.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Alert variant="info">
 *   <AlertIcon />
 *   <AlertTitle>Information</AlertTitle>
 *   <AlertDescription>This is an info alert</AlertDescription>
 *   <AlertAction>
 *     <Button>Action</Button>
 *   </AlertAction>
 * </Alert>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Provides proper spacing for action elements.
 */
export const AlertAction = React.forwardRef<HTMLDivElement, AlertActionProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn("flex-shrink-0 ml-4 flex items-center", className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

AlertAction.displayName = 'AlertAction';

