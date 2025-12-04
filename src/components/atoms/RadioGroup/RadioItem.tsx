"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useRadioGroupContext } from './RadioGroupContext';
import { RadioItemProvider } from './RadioItemContext';

export interface RadioItemProps extends ComposableProps<'label'> {
  /**
   * The value of this radio item
   */
  value: string;
  /**
   * Whether this item is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * The content of the radio item (typically RadioItemInput and RadioItemLabel)
   */
  children: React.ReactNode;
}

/**
 * RadioItem Component
 *
 * A composable component for individual radio items within a RadioGroup.
 * Contains RadioItemInput and RadioItemLabel sub-components.
 *
 * @public
 *
 * @example
 * ```tsx
 * <RadioGroup name="choice" value={value} onValueChange={setValue}>
 *   <RadioItem value="option1">
 *     <RadioItemInput />
 *     <RadioItemLabel>Option 1</RadioItemLabel>
 *   </RadioItem>
 * </RadioGroup>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<label>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically handles selection state based on RadioGroup context.
 * - Accessible: maintains proper radio group semantics.
 */
export const RadioItem = React.forwardRef<HTMLLabelElement, RadioItemProps>(
  ({ className, value, disabled = false, children, asChild, ...props }, ref) => {
    const { size, orientation } = useRadioGroupContext();
    
    const sizeStyles = {
      sm: { gap: "gap-[6px]", groupGap: "gap-[12px]" },
      md: { gap: "gap-[var(--radio-gap)]", groupGap: "gap-[16px]" }
    };

    const currentSize = sizeStyles[size];
    const itemGap = orientation === 'horizontal' ? currentSize.groupGap : currentSize.groupGap;
    
    const Comp = asChild ? Slot : 'label';
    
    return (
      <RadioItemProvider value={{ value, disabled }}>
        <Comp
          ref={ref}
          className={cn(
            "inline-flex items-center",
            currentSize.gap,
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          {...props}
        >
          {children}
        </Comp>
      </RadioItemProvider>
    );
  }
);

RadioItem.displayName = 'RadioItem';
