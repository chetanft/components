"use client";

import React from 'react';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';

export interface ContextMenuRadioGroupProps extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioGroup> {
  children?: React.ReactNode;
}

/**
 * ContextMenuRadioGroup Component
 *
 * Groups radio menu items so only one can be selected at a time.
 *
 * @public
 */
const ContextMenuRadioGroup = React.forwardRef<HTMLDivElement, ContextMenuRadioGroupProps>(
  ({ ...props }, ref) => {
    return (
      <ContextMenuPrimitive.RadioGroup
        ref={ref}
        data-slot="context-menu-radio-group"
        {...props}
      />
    );
  }
);

ContextMenuRadioGroup.displayName = 'ContextMenuRadioGroup';

export { ContextMenuRadioGroup };
