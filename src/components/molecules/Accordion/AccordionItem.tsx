"use client";

import React, { forwardRef } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from '../../../lib/utils';

export interface AccordionItemProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {
  /** Additional CSS classes */
  className?: string;
}

/**
 * AccordionItem Component
 *
 * Wraps a single collapsible section within an Accordion.
 * Contains a trigger and content pair.
 *
 * @public
 */
export const AccordionItem = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(({ className, ...props }, ref) => {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      data-slot="accordion-item"
      className={cn(
        "border-b border-[var(--border-primary)]",
        className
      )}
      {...props}
    />
  );
});

AccordionItem.displayName = "AccordionItem";

export default AccordionItem;
