"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface FigmaBadgeProps extends ComposableProps<'div'> {
  className?: string;
}

/**
 * Badge component to indicate that Figma design is not available for this component.
 * This component uses FT Design System tokens only.
 */
export const FigmaBadge: React.FC<FigmaBadgeProps> = ({ className, asChild, ...props }) => {
  const Comp = asChild ? Slot : 'div';
  
  return (
    <Comp
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-[var(--radius-sm)]",
        "bg-[var(--color-warning-light)] text-[var(--color-warning)] border border-[var(--color-warning)]",
        "text-xs font-medium",
        className
      )}
      style={{
        fontFamily: 'var(--font-family-primary, "Inter", sans-serif)',
      }}
      title="Figma design not available - Component built using FT Design System tokens"
      {...props}
    >
      <span className="text-[10px]">⚠️</span>
      <span>Figma design not available</span>
    </Comp>
  );
};

FigmaBadge.displayName = 'FigmaBadge';
