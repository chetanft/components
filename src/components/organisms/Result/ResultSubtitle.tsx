"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Typography } from '../../atoms/Typography';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface ResultSubtitleProps extends ComposableProps<'div'> {
  children?: React.ReactNode;
}

export const ResultSubtitle = React.forwardRef<HTMLDivElement, ResultSubtitleProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp ref={ref} {...props}>
        <Typography
          variant="body-primary-regular"
          className={cn("text-[var(--tertiary)] max-w-md mb-[var(--spacing-x6)]", className)}
        >
          {children}
        </Typography>
      </Comp>
    );
  }
);

ResultSubtitle.displayName = 'ResultSubtitle';
