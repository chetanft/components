"use client";

import React, { forwardRef } from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useResolvedGlass, type GlassVariant } from '../../../lib/glass';
import { StepsProvider } from './StepsContext';

export interface StepsProps extends Omit<ComposableProps<'div'>, 'onChange'> {
  /**
   * Current step number (1-based)
   * @default 1
   */
  currentStep?: number;
  /**
   * Device type
   * @default 'desktop'
   */
  device?: 'desktop' | 'mobile';
  /**
   * Direction of steps
   * @default 'horizontal'
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * Step type
   * @default 'default'
   */
  type?: 'default' | 'dot' | 'navigation';
  /**
   * Callback when step changes
   */
  onChange?: (current: number) => void;
  /**
   * Steps content (for composable API)
   */
  children?: React.ReactNode;
  /**
   * Apply glassmorphism effect to the steps container
   */
  glass?: GlassVariant;
}

/**
 * Steps Component
 * 
 * A component for displaying step-by-step progress indicators.
 * Uses composable sub-components for flexible composition.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Steps currentStep={1} device="desktop" direction="horizontal" type="default">
 *   <StepsList>
 *     <StepItem value={1}>
 *       <StepIcon />
 *       <StepContent>
 *         <StepTitle>Step 1</StepTitle>
 *         <StepDescription>Description</StepDescription>
 *       </StepContent>
 *     </StepItem>
 *   </StepsList>
 * </Steps>
 * ```
 *
 * @remarks
 * - Composable API provides maximum flexibility and control
 * - All sub-components (StepsList, StepItem, StepIcon, etc.) support `asChild`
 * - Supports multiple types (default, dot, navigation) and directions
 */
export const Steps = forwardRef<HTMLDivElement, StepsProps>(
  ({ device = "desktop", currentStep = 1, className, direction = 'horizontal', type = 'default', onChange, glass, children, asChild, ...props }, ref) => {
    const resolvedGlass = useResolvedGlass(glass);
    const Comp = asChild ? Slot : 'div';

    return (
        <StepsProvider
            value={{
                currentStep,
                device,
                direction,
                type,
                onChange,
            }}
        >
            <Comp ref={ref} className={cn(
                resolvedGlass && 'rounded-[var(--radius-md)] p-[var(--spacing-x3)]',
                className
            )} {...props}>
                {children}
            </Comp>
        </StepsProvider>
    );
  }
);

Steps.displayName = "Steps";

export default Steps;
