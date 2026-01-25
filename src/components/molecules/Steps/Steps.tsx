"use client";

import React, { forwardRef } from 'react';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { StepsProvider } from './StepsContext';
import { StepsList } from './StepsList';
import { StepItem } from './StepItem';
import { StepIcon } from './StepIcon';
import { StepContent } from './StepContent';
import { StepTitle } from './StepTitle';
import { StepDescription } from './StepDescription';

// Keep StepsItem for backward compatibility (deprecated)
export interface StepsItemProps {
  label?: React.ReactNode;
  description?: React.ReactNode;
  state: 'selected' | 'unselected' | 'completed' | 'error';
  device: 'desktop' | 'mobile';
  className?: string;
  direction?: 'horizontal' | 'vertical';
  type?: 'default' | 'dot' | 'navigation';
}

export interface Step {
  label: React.ReactNode;
  description?: React.ReactNode;
  completed?: boolean;
  status?: 'wait' | 'process' | 'finish' | 'error';
  disabled?: boolean;
}

export interface StepsProps extends Omit<ComposableProps<'div'>, 'onChange'> {
  /**
   * Steps array for declarative API (deprecated)
   * @deprecated Use StepItem components instead
   */
  steps?: Step[];
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
}

/**
 * Steps Component
 * 
 * A component for displaying step-by-step progress indicators.
 * Supports both composable API (recommended) and declarative API (deprecated).
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Composable API (recommended)
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
 * 
 * // Declarative API (deprecated)
 * <Steps steps={[{label: 'Step 1', description: 'Description'}]} currentStep={1} />
 * ```
 * 
 * @remarks
 * - Composable API provides maximum flexibility and control
 * - All sub-components (StepsList, StepItem, StepIcon, etc.) support `asChild`
 * - Supports multiple types (default, dot, navigation) and directions
 * - Declarative API is deprecated but still functional for backward compatibility
 */
export const Steps = forwardRef<HTMLDivElement, StepsProps>(
  ({ device = "desktop", steps, currentStep = 1, className, direction = 'horizontal', type = 'default', onChange, children, asChild, ...props }, ref) => {
    // Check if using composable API (has children with Steps sub-components)
    const hasComposableChildren = React.Children.toArray(children).some((child: any) => 
        child?.type?.displayName?.startsWith('Steps') || child?.type?.displayName?.startsWith('Step')
    );
    
    // If using composable API, render with context provider
    if (hasComposableChildren) {
        // Show deprecation warning if using old props with composable API
        if (process.env.NODE_ENV !== 'production' && steps?.length) {
            console.warn(
                'Steps: Using deprecated props (steps array) with composable API. ' +
                'Please use StepsList and StepItem components instead. ' +
                'See migration guide: docs/migrations/composable-migration.md'
            );
        }
        
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
                <Comp ref={ref} className={className} {...props}>
                    {children}
                </Comp>
            </StepsProvider>
        );
    }
    
    // Otherwise use declarative API (deprecated)
    if (process.env.NODE_ENV !== 'production' && steps?.length) {
        console.warn(
            'Steps: Declarative API (steps array prop) is deprecated. ' +
            'Please migrate to composable API using StepsList, StepItem, StepIcon, StepContent, StepTitle, and StepDescription components. ' +
            'See migration guide: docs/migrations/composable-migration.md'
        );
    }
    
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
            <Comp ref={ref} className={className} {...props}>
                <StepsList>
                    {steps?.map((step, index) => {
                        const stepNumber = index + 1;
                        return (
                            <StepItem
                                key={index}
                                value={stepNumber}
                                disabled={step.disabled}
                                status={step.status}
                            >
                                <StepIcon />
                                <StepContent>
                                    <StepTitle>{step.label}</StepTitle>
                                    {step.description && <StepDescription>{step.description}</StepDescription>}
                                </StepContent>
                            </StepItem>
                        );
                    })}
                </StepsList>
            </Comp>
        </StepsProvider>
    );
  }
);

Steps.displayName = "Steps";

export default Steps;
