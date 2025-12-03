"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface TextareaWrapperProps extends ComposableProps<'div'> {
  /**
   * The content of the textarea wrapper.
   */
  children?: React.ReactNode;
}

/**
 * TextareaWrapper Component
 *
 * A composable wrapper component that contains all Textarea sub-components.
 * Provides spacing and layout for the textarea field and its associated elements.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Textarea>
 *   <TextareaWrapper>
 *     <TextareaLabel>Description</TextareaLabel>
 *     <TextareaField rows={4} />
 *     <TextareaError>Invalid description</TextareaError>
 *   </TextareaWrapper>
 * </Textarea>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Provides default spacing between textarea elements.
 */
export const TextareaWrapper = React.forwardRef<HTMLDivElement, TextareaWrapperProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn("w-full", className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

TextareaWrapper.displayName = 'TextareaWrapper';

