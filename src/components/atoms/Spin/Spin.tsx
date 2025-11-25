"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../Icons';

export type SpinSize = 'sm' | 'md' | 'lg' | 'xl';

export interface SpinProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size of the spinner */
  size?: SpinSize;
  /** Tip text shown below spinner */
  tip?: string;
  /** Whether to show spinner */
  spinning?: boolean;
  /** Delay before showing spinner (ms) */
  delay?: number;
  /** Custom spinner indicator */
  indicator?: React.ReactNode;
  /** Content to wrap with spinner */
  children?: React.ReactNode;
  /** Whether to use full screen mode */
  fullscreen?: boolean;
}

/**
 * Spin component - Loading spinner built with FT Design System tokens.
 * 
 * Uses:
 * - Colors: var(--primary), var(--neutral)
 * - Spacing: var(--x2), var(--x4)
 * - Animation: CSS keyframes
 */
export const Spin = React.forwardRef<HTMLDivElement, SpinProps>(
  ({
    size = 'md',
    tip,
    spinning = true,
    delay = 0,
    indicator,
    children,
    fullscreen = false,
    className,
    ...props
  }, ref) => {
    const [shouldShow, setShouldShow] = React.useState(delay === 0 && spinning);

    React.useEffect(() => {
      if (spinning) {
        if (delay > 0) {
          const timer = setTimeout(() => setShouldShow(true), delay);
          return () => clearTimeout(timer);
        }
        setShouldShow(true);
      } else {
        setShouldShow(false);
      }
    }, [spinning, delay]);

    // Size configurations using FT Design System spacing
    const sizeConfig = {
      sm: { spinner: 16, container: 'p-[var(--x2)]' },
      md: { spinner: 24, container: 'p-[var(--x3)]' },
      lg: { spinner: 32, container: 'p-[var(--x4)]' },
      xl: { spinner: 48, container: 'p-[var(--x6)]' },
    };

    const config = sizeConfig[size];

    // Default spinner using FT Design System icon
    const defaultIndicator = (
      <Icon
        name="loading"
        size={config.spinner}
        className="animate-spin text-[var(--primary)]"
      />
    );

    const spinnerContent = (
      <div
        className={cn(
          "inline-flex flex-col items-center justify-center gap-[var(--x2)]",
          config.container
        )}
      >
        {indicator || defaultIndicator}
        {tip && (
          <span className="text-[var(--primary)] text-sm font-medium">
            {tip}
          </span>
        )}
      </div>
    );

    // Fullscreen mode
    if (fullscreen && shouldShow) {
      return (
        <div
          ref={ref}
          className={cn(
            "fixed inset-0 z-[var(--z-index-modal,1050)]",
            "flex items-center justify-center",
            "bg-[var(--bg-primary)]/80 backdrop-blur-sm",
            className
          )}
          {...props}
        >
          {spinnerContent}
        </div>
      );
    }

    // No children - just show spinner
    if (!children) {
      if (!shouldShow) return null;
      return (
        <div
          ref={ref}
          className={cn("inline-flex items-center justify-center", className)}
          {...props}
        >
          {spinnerContent}
        </div>
      );
    }

    // With children - show spinner as overlay
    return (
      <div
        ref={ref}
        className={cn("relative", className)}
        {...props}
      >
        {/* Content */}
        <div
          className={cn(
            "transition-opacity duration-200",
            shouldShow && "opacity-40 pointer-events-none select-none"
          )}
        >
          {children}
        </div>

        {/* Spinner overlay */}
        {shouldShow && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-primary)]/50">
            {spinnerContent}
          </div>
        )}
      </div>
    );
  }
);

Spin.displayName = 'Spin';

