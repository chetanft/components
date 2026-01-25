"use client";

import React from 'react';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useInputNumberContext } from './InputNumberContext';
import { InputNumberButton } from './InputNumberButton';

export interface InputNumberControlsProps extends ComposableProps<'div'> {
  /**
   * Controls content (typically InputNumberButton components).
   */
  children?: React.ReactNode;
}

/**
 * InputNumberControls Component
 *
 * A composable component for increment/decrement controls.
 * Typically wraps InputNumberButton components.
 *
 * @public
 *
 * @example
 * ```tsx
 * <InputNumber value={10}>
 *   <InputNumberWrapper>
 *     <InputNumberField />
 *     <InputNumberControls>
 *       <InputNumberButton direction="up" />
 *       <InputNumberButton direction="down" />
 *     </InputNumberControls>
 *   </InputNumberWrapper>
 * </InputNumber>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically renders controls based on controlsPosition from context.
 */
export const InputNumberControls = React.forwardRef<HTMLDivElement, InputNumberControlsProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const { controls, controlsPosition, size } = useInputNumberContext();
    
    if (!controls) return null;
    
    const sizeConfig = {
      xxs: { button: 'w-4', icon: 10 },
      xs: { button: 'w-5', icon: 12 },
      sm: { button: 'w-6', icon: 14 },
      md: { button: 'w-8', icon: 16 },
      lg: { button: 'w-10', icon: 18 },
      xl: { button: 'w-11', icon: 20 },
      xxl: { button: 'w-12', icon: 22 },
    };
    
    const _config = sizeConfig[size];
    
    // If children provided, use them
    if (children) {
      const Comp = asChild ? Slot : 'div';
      return (
        <Comp ref={ref} className={className} {...props}>
          {children}
        </Comp>
      );
    }
    
    // Otherwise render default controls based on position
    if (controlsPosition === 'right') {
      return (
        <div className="flex flex-col h-full border-l border-[var(--border-primary)]" ref={ref}>
          <InputNumberButton direction="up" />
          <InputNumberButton direction="down" />
        </div>
      );
    }
    
    // Both mode
    return (
      <>
        <InputNumberButton direction="down" />
        <InputNumberButton direction="up" />
      </>
    );
  }
);

InputNumberControls.displayName = 'InputNumberControls';

