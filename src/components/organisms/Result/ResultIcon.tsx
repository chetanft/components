"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface ResultIconProps extends ComposableProps<'div'> {
  children?: React.ReactNode;
}

export const ResultIcon = React.forwardRef<HTMLDivElement, ResultIconProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn("mb-[var(--spacing-x6)]", className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

ResultIcon.displayName = 'ResultIcon';
