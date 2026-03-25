"use client";

import React, { forwardRef } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';

export interface AccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
  /** Additional CSS classes */
  className?: string;
}

/**
 * AccordionTrigger Component
 *
 * The clickable header that toggles the associated AccordionContent.
 * Includes a chevron icon that rotates when the section is open.
 *
 * @public
 */
export const AccordionTrigger = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ className, children, ...props }, ref) => {
  return (
    <AccordionPrimitive.Header className="flex" data-slot="accordion-header">
      <AccordionPrimitive.Trigger
        ref={ref}
        data-slot="accordion-trigger"
        className={cn(
          "flex flex-1 items-center justify-between",
          "py-[var(--spacing-x4)] px-[var(--spacing-x2)]",
          "text-[var(--primary)] font-medium text-base",
          "transition-all cursor-pointer",
          "hover:underline",
          "[&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <Icon
          name="chevron-down"
          size={16}
          className="shrink-0 text-[var(--secondary)] transition-transform duration-200"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});

AccordionTrigger.displayName = "AccordionTrigger";

export default AccordionTrigger;
