"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface SwitchWrapperProps extends ComposableProps<'div'> {
  /**
   * The content of the switch wrapper.
   */
  children?: React.ReactNode;
}

/**
 * SwitchWrapper Component
 *
 * A composable wrapper component that contains all Switch sub-components.
 * Provides spacing and layout for the switch and its associated elements.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Switch>
 *   <SwitchWrapper>
 *     <SwitchInput />
 *     <SwitchLabel>Enable notifications</SwitchLabel>
 *     <SwitchError>Required</SwitchError>
 *   </SwitchWrapper>
 * </Switch>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Provides default spacing between switch elements.
 */
export const SwitchWrapper = React.forwardRef<HTMLDivElement, SwitchWrapperProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn("flex flex-row items-center flex-wrap", className)}
        style={{ gap: 'var(--spacing-x2)', ...props.style }}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

SwitchWrapper.displayName = 'SwitchWrapper';

