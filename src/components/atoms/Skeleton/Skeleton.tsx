"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { SkeletonText } from './SkeletonText';
import { SkeletonImage } from './SkeletonImage';

export interface SkeletonProps extends ComposableProps<'div'> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

/**
 * Skeleton Component
 *
 * A composable component for displaying skeleton loaders.
 * Supports both composable API (recommended) and declarative API (deprecated).
 *
 * @public
 *
 * @example
 * ```tsx
 * // Composable API (recommended)
 * <Skeleton>
 *   <SkeletonImage width={200} height={200} />
 *   <SkeletonText lines={3} />
 * </Skeleton>
 * 
 * // Declarative API (deprecated)
 * <Skeleton variant="rectangular" width={200} height={100} />
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Declarative API is deprecated but still functional for backward compatibility.
 */
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({
    variant = 'rectangular',
    width,
    height,
    animation = 'pulse',
    className,
    style,
    children,
    asChild,
    ...props
  }, ref) => {
    // Check if using composable API (has SkeletonText or SkeletonImage as children)
    const hasComposableChildren = React.Children.toArray(children as any).some((child: any) =>
      child?.type?.displayName === 'SkeletonText' || child?.type?.displayName === 'SkeletonImage'
    );

    // If using composable API, render with sub-components
    if (hasComposableChildren) {
      if (process.env.NODE_ENV !== 'production' && (variant || width || height)) {
        console.warn(
          'Skeleton: Using deprecated props (variant, width, height) with composable API. ' +
          'Please use SkeletonText and SkeletonImage components instead. ' +
          'See migration guide: docs/migrations/composable-migration.md'
        );
      }

      return (
        <>
          {animation === 'wave' && (
            <style>{`
                        @keyframes skeleton-wave {
                            0% { transform: translateX(-100%); }
                            100% { transform: translateX(100%); }
                        }
                        .skeleton-wave::after {
                            content: '';
                            position: absolute;
                            top: 0; left: 0; right: 0; bottom: 0;
                            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
                            animation: skeleton-wave 1.5s ease-in-out infinite;
                        }
                    `}</style>
          )}
          {asChild ? (
            <Slot ref={ref as any} className={className} style={style} {...(props as any)}>
              {children}
            </Slot>
          ) : (
            <div ref={ref} className={className} style={style} {...props}>
              {children}
            </div>
          )}
        </>
      );
    }

    // Otherwise use declarative API (deprecated)
    if (process.env.NODE_ENV !== 'production' && (variant || width || height)) {
      console.warn(
        'Skeleton: Declarative API (variant, width, height props) is deprecated. ' +
        'Please migrate to composable API using SkeletonText and SkeletonImage components. ' +
        'See migration guide: docs/migrations/composable-migration.md'
      );
    }

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
        {asChild ? (
          <Slot ref={ref as any} {...(props as any)}>
            <div
              className={cn(baseStyles, animation === 'wave' && "skeleton-wave", className)}
              style={computedStyle}
            />
          </Slot>
        ) : (
          <div ref={ref} {...props}>
            <div
              className={cn(baseStyles, animation === 'wave' && "skeleton-wave", className)}
              style={computedStyle}
            />
          </div>
        )}
      </>
    );
  }
);

Skeleton.displayName = 'Skeleton';

