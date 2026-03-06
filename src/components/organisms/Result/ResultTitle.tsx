"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Typography } from '../../atoms/Typography';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface ResultTitleProps extends ComposableProps<'div'> {
  children?: React.ReactNode;
}

export const ResultTitle = React.forwardRef<HTMLDivElement, ResultTitleProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp ref={ref} {...props}>
        <Typography
          variant="title-secondary"
          className={cn("text-[var(--primary)] mb-[var(--spacing-x3)]", className)}
        >
          {children}
        </Typography>
      </Comp>
    );
  }
);

ResultTitle.displayName = 'ResultTitle';
