"use client";

import React, { forwardRef } from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';

export interface StepsItemProps {
  label?: React.ReactNode;
  description?: React.ReactNode;
  state: 'selected' | 'unselected' | 'completed' | 'error';
  device: 'desktop' | 'mobile';
  className?: string;
  direction?: 'horizontal' | 'vertical';
  type?: 'default' | 'dot' | 'navigation';
  index?: number;
}

export const StepsItem = forwardRef<HTMLDivElement, StepsItemProps>(
  ({ state, device, label = "Step", description, className, direction = 'horizontal', type = 'default', index = 0, ...props }, ref) => {
    
    // Dot Style
    if (type === 'dot') {
        return (
            <div ref={ref} className={cn("flex items-center group", direction === 'vertical' ? "flex-col items-start gap-1" : "flex-row gap-2", className)} {...props}>
                 <div className="relative flex items-center justify-center">
                     <div className={cn(
                         "rounded-full transition-all duration-300",
                         state === 'selected' ? "w-2.5 h-2.5 bg-[var(--primary)]" : "w-2 h-2 bg-[var(--border-secondary)] group-hover:bg-[var(--primary)]",
                         state === 'completed' && "bg-[var(--primary)]"
                     )} />
                 </div>
                 <div className="flex flex-col">
                     <div className={cn("text-sm transition-colors", state === 'selected' ? "font-semibold text-[var(--text-primary)]" : "text-[var(--text-secondary)]")}>
                         {label}
                     </div>
                     {description && <div className="text-xs text-[var(--text-tertiary)]">{description}</div>}
                 </div>
            </div>
        );
    }

    // Default Bar Style (Original FT Design)
    // Updated to support vertical
    
    const containerStyles = cn(
      "flex gap-4",
      direction === 'vertical' ? "flex-row w-full h-full min-h-[64px]" : "flex-col",
      device === "desktop" && direction === 'horizontal' ? "w-[292.67px]" : "flex-1",
      className
    );

    const progressBarStyles = cn(
      "rounded-[8px] transition-colors",
      direction === 'vertical' ? "w-1 h-full min-h-[32px]" : "w-full h-2",
      state === "selected" || state === "completed"
        ? "bg-[var(--primary)]" 
        : "bg-[var(--border-secondary)]"
    );

    const labelStyles = cn(
      "font-primary font-semibold text-[20px] leading-[1.4] transition-colors",
      state === "selected" || state === "completed"
        ? "text-[var(--primary)]" 
        : "text-[var(--border-primary)]",
      device === "mobile" && "sr-only" 
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
  label: React.ReactNode;
  description?: React.ReactNode;
  completed?: boolean;
  status?: 'wait' | 'process' | 'finish' | 'error';
  disabled?: boolean;
}

export interface StepsProps {
  steps: Step[];
  currentStep?: number; // 1-based index usually
  device?: 'desktop' | 'mobile';
  className?: string;
  direction?: 'horizontal' | 'vertical';
  type?: 'default' | 'dot' | 'navigation';
  onChange?: (current: number) => void;
}

export const Steps = forwardRef<HTMLDivElement, StepsProps>(
  ({ device = "desktop", steps, currentStep = 1, className, direction = 'horizontal', type = 'default', onChange, ...props }, ref) => {
    
    // Normalize steps logic
    const stepCount = steps.length;
    
    // Container styles
    const containerStyles = cn(
      "flex",
      direction === 'vertical' ? "flex-col" : "flex-row items-center",
      direction === 'horizontal' && device === "desktop" ? "gap-[12px]" : "gap-[8px]",
      direction === 'vertical' && "gap-0",
      className
    );

    return (
      <div
        ref={ref}
        className={containerStyles}
        {...props}
      >
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isSelected = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep || step.status === 'finish';
          const isError = step.status === 'error';
          
          let state: 'selected' | 'unselected' | 'completed' | 'error' = 'unselected';
          if (isError) state = 'error';
          else if (isSelected) state = 'selected';
          else if (isCompleted) state = 'completed';

          return (
            <div key={index} className={cn("flex-1", direction === 'vertical' ? "w-full" : "")} onClick={() => !step.disabled && onChange?.(stepNumber)}>
                 <StepsItem
                    index={index}
                    state={state}
                    device={device}
                    label={step.label}
                    description={step.description}
                    direction={direction}
                    type={type}
                    className={cn(!step.disabled && "cursor-pointer")}
                />
            </div>
          );
        })}
      </div>
    );
  }
);

Steps.displayName = "Steps";

export default Steps;
