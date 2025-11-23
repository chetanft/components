"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { FigmaBadge } from '../FigmaBadge';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
  showFigmaBadge?: boolean;
}

/**
 * Skeleton component built using FT Design System tokens.
 * Figma design not available - component created based on design system specifications.
 */
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({
    variant = 'rectangular',
    width,
    height,
    animation = 'pulse',
    showFigmaBadge = true,
    className,
    style,
    ...props
  }, ref) => {
    const baseStyles = cn(
      "bg-[var(--color-bg-secondary)]",
      "rounded-[var(--radius-md)]",
      animation === 'pulse' && "animate-pulse",
      animation === 'wave' && "relative overflow-hidden",
      variant === 'circular' && "rounded-full",
      variant === 'text' && "h-4"
    );

    const computedStyle: React.CSSProperties = {
      width: width || (variant === 'circular' ? height : undefined),
      height: height || (variant === 'text' ? undefined : '1em'),
      ...style,
    };

    return (
      <>
        {animation === 'wave' && (
          <style>{`
            @keyframes skeleton-wave {
              0% {
                transform: translateX(-100%);
              }
              100% {
                transform: translateX(100%);
              }
            }
            .skeleton-wave::after {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: linear-gradient(
                90deg,
                transparent,
                rgba(255, 255, 255, 0.4),
                transparent
              );
              animation: skeleton-wave 1.5s ease-in-out infinite;
            }
          `}</style>
        )}
        <div ref={ref} {...props}>
          {showFigmaBadge && (
            <div className="mb-2">
              <FigmaBadge />
            </div>
          )}
          <div
            className={cn(baseStyles, animation === 'wave' && "skeleton-wave", className)}
            style={computedStyle}
          />
        </div>
      </>
    );
  }
);

Skeleton.displayName = 'Skeleton';

