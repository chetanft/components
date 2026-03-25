"use client";

import React, { forwardRef } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from '../../../lib/utils';
import { getGlassClasses, useResolvedGlass, type GlassVariant } from '../../../lib/glass';

export interface AccordionSingleProps
  extends Omit<React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>, 'type'> {
  /** Glassmorphism variant */
  glass?: GlassVariant;
  type: 'single';
  collapsible?: boolean;
}

export interface AccordionMultipleProps
  extends Omit<React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>, 'type'> {
  /** Glassmorphism variant */
  glass?: GlassVariant;
  type: 'multiple';
}

export type AccordionProps = AccordionSingleProps | AccordionMultipleProps;

/**
 * Accordion Component
 *
 * A vertically stacked set of interactive headings that each reveal
 * an associated section of content.
 * Built on Radix UI Accordion primitives for full accessibility.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Accordion type="single" collapsible defaultValue="item-1">
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Section 1</AccordionTrigger>
 *     <AccordionContent>Content 1</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
export const Accordion = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  AccordionProps
>(({ glass, className, ...props }, ref) => {
  const resolvedGlass = useResolvedGlass(glass);

  return (
    <AccordionPrimitive.Root
      ref={ref}
      data-slot="accordion"
      className={cn(
        "w-full",
        getGlassClasses(resolvedGlass, "bg-transparent", "border-none"),
        className
      )}
      {...(props as React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>)}
    />
  );
});

Accordion.displayName = "Accordion";

export default Accordion;
