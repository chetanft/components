import React, { forwardRef } from 'react';
import { cn } from '../../../lib/utils';

export interface StepsItemProps {
  label?: string;
  state: 'selected' | 'unselected';
  device: 'desktop' | 'mobile';
  className?: string;
}

export const StepsItem = forwardRef<HTMLDivElement, StepsItemProps>(
  ({ state, device, label = "Step", className, ...props }, ref) => {
    // Base styles using exact Figma specifications
    const containerStyles = cn(
      "flex flex-col gap-[var(--steps-gap)]", // 16px gap from Figma
      device === "desktop" ? "w-[292.67px]" : "flex-1", // Exact width from Figma
      className
    );

    // Progress bar styles using exact Figma specifications
    const progressBarStyles = cn(
      "w-full h-[var(--steps-bar-height)] rounded-[var(--steps-bar-radius)] transition-colors", // 8px height, 8px radius from Figma
      state === "selected" 
        ? "bg-[var(--steps-selected-bar)]" // #434F64 from Figma
        : "bg-[var(--steps-unselected-bar)]" // #F0F1F7 from Figma
    );

    // Label styles using exact Figma specifications  
    const labelStyles = cn(
      "font-[Inter] font-[var(--steps-font-weight)] text-[var(--steps-font-size)] leading-[1.4] transition-colors", // Inter 600, 20px from Figma
      state === "selected"
        ? "text-[var(--steps-selected-text)]" // #434F64 from Figma
        : "text-[var(--steps-unselected-text)]", // #CED1D7 from Figma
      device === "mobile" && "sr-only" // Hide labels on mobile per Figma specs
    );

    return (
      <div
        ref={ref}
        className={containerStyles}
        {...props}
      >
        <div className={progressBarStyles} />
        <div className={labelStyles}>
          {label}
        </div>
      </div>
    );
  }
);

StepsItem.displayName = "StepsItem";

export interface Step {
  label: string;
  completed?: boolean;
}

export interface StepsProps {
  steps: Step[];
  currentStep?: number;
  device?: 'desktop' | 'mobile';
  className?: string;
}

export const Steps = forwardRef<HTMLDivElement, StepsProps>(
  ({ device = "desktop", steps, currentStep = 1, className, ...props }, ref) => {
    // Determine count from steps array (2-5 steps per Figma specs)
    const stepCount = Math.min(Math.max(steps.length, 2), 5);
    
    // Ensure we have the right number of steps
    const normalizedSteps = steps.slice(0, stepCount).map((step, index) => ({
      ...step,
      label: step.label || `Step ${index + 1}`
    }));

    // Fill in missing steps if needed
    while (normalizedSteps.length < stepCount) {
      normalizedSteps.push({
        label: `Step ${normalizedSteps.length + 1}`
      });
    }

    // Container styles using exact Figma specifications
    const containerStyles = cn(
      "flex items-center",
      device === "desktop" 
        ? "gap-[12px]" // Desktop gap from Figma
        : "gap-[8px] w-80", // Mobile gap and width from Figma
      className
    );

    return (
      <div
        ref={ref}
        className={containerStyles}
        {...props}
      >
        {normalizedSteps.map((step, index) => {
          const stepNumber = index + 1;
          const isSelected = stepNumber === currentStep;
          const isCompleted = step.completed || stepNumber < currentStep;
          
          return (
            <StepsItem
              key={index}
              state={isSelected || isCompleted ? "selected" : "unselected"}
              device={device}
              label={step.label}
            />
          );
        })}
      </div>
    );
  }
);

Steps.displayName = "Steps";

export default Steps; 