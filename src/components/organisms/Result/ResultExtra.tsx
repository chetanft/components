"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface ResultExtraProps extends ComposableProps<'div'> {
  children?: React.ReactNode;
}

export const ResultExtra = React.forwardRef<HTMLDivElement, ResultExtraProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn("flex flex-wrap items-center justify-center gap-[var(--spacing-x3)] mb-[var(--spacing-x6)]", className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

ResultExtra.displayName = 'ResultExtra';
