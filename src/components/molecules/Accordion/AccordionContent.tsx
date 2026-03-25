"use client";

import React, { forwardRef } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from '../../../lib/utils';

export interface AccordionContentProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {
  /** Additional CSS classes */
  className?: string;
}

/**
 * AccordionContent Component
 *
 * The collapsible content area within an AccordionItem.
 * Animates open and closed with a height transition.
 *
 * @public
 */
export const AccordionContent = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(({ className, children, ...props }, ref) => {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      data-slot="accordion-content"
      className={cn(
        "overflow-hidden text-[var(--secondary)] text-sm",
        "data-[state=open]:animate-accordion-down",
        "data-[state=closed]:animate-accordion-up",
        className
      )}
      {...props}
    >
      <div className="px-[var(--spacing-x2)] pb-[var(--spacing-x4)]">
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
});

AccordionContent.displayName = "AccordionContent";

export default AccordionContent;
