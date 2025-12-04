"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { AvatarImage } from './AvatarImage';
import { AvatarFallback } from './AvatarFallback';

export type AvatarSize = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export type AvatarShape = "circle" | "square";

export interface AvatarProps extends ComposableProps<'div'> {
  size?: AvatarSize | number;
  shape?: AvatarShape;
  src?: string | React.ReactNode; // Allow custom content
  icon?: React.ReactNode;
  alt?: string;
  gap?: number; // Gap for text scaling (not fully implemented in simple version)
  className?: string;
  style?: React.CSSProperties;
}

export interface AvatarGroupProps {
  maxCount?: number;
  maxStyle?: React.CSSProperties;
  maxPopoverPlacement?: 'top' | 'bottom';
  size?: AvatarSize;
  shape?: AvatarShape;
  children?: React.ReactNode;
  className?: string;
}

const sizeMap: Record<string, string> = {
  xxs: "size-[16px] text-[8px]",
  xs: "size-[24px] text-[10px]",
  sm: "size-[32px] text-xs",
  md: "size-[40px] text-sm",
  lg: "size-[48px] text-base",
  xl: "size-[56px] text-lg",
  xxl: "size-[64px] text-xl",
};

/**
 * Avatar Component
 *
 * A composable component for displaying user avatars.
 * Supports both composable API (recommended) and declarative API (deprecated).
 *
 * @public
 *
 * @example
 * ```tsx
 * // Composable API (recommended)
 * <Avatar size="md" shape="circle">
 *   <AvatarImage src="/avatar.jpg" alt="User" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 * 
 * // Declarative API (deprecated)
 * <Avatar src="/avatar.jpg" alt="User" />
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Declarative API is deprecated but still functional for backward compatibility.
 */
export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ size = "md", shape = "circle", src, icon, alt = "User Avatar", className, style, children, asChild, ...props }, ref) => {
    // Check if using composable API (has AvatarImage or AvatarFallback as children)
    const hasComposableChildren = React.Children.toArray(children as React.ReactNode | React.ReactNode[]).some((child: any) => 
        child?.type?.displayName === 'AvatarImage' || child?.type?.displayName === 'AvatarFallback'
    );

    let sizeClass = typeof size === 'string' ? sizeMap[size] || sizeMap.md : '';
    let sizeStyle = typeof size === 'number' ? { width: size, height: size, fontSize: size / 2 } : {};

    const isImage = typeof src === 'string';
    const Comp = asChild ? Slot : 'div';

    // If using composable API, render with sub-components
    if (hasComposableChildren) {
        if (process.env.NODE_ENV !== 'production' && (src || icon)) {
            console.warn(
                'Avatar: Using deprecated props (src, icon) with composable API. ' +
                'Please use AvatarImage and AvatarFallback components instead. ' +
                'See migration guide: docs/migrations/composable-migration.md'
            );
        }
        
        // Cast children to exclude bigint which Slot doesn't accept
        const safeChildren = children as Exclude<React.ReactNode, bigint>;
        
        return (
            <Comp
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center overflow-hidden shrink-0",
                    sizeClass,
                    shape === "circle" ? "rounded-full" : "rounded-md",
                    "bg-[var(--bg-secondary)] text-[var(--secondary)]",
                    className
                )}
                style={{ ...sizeStyle, ...style }}
                {...props}
            >
                {safeChildren}
            </Comp>
        );
    }

    // Otherwise use declarative API (deprecated)
    if (process.env.NODE_ENV !== 'production' && (src || icon)) {
        console.warn(
            'Avatar: Declarative API (src, icon props) is deprecated. ' +
            'Please migrate to composable API using AvatarImage and AvatarFallback components. ' +
            'See migration guide: docs/migrations/composable-migration.md'
        );
    }

    // Cast children and other ReactNode values to exclude bigint which Slot doesn't accept
    const safeSrc = src as Exclude<React.ReactNode, bigint> | undefined;
    const safeIcon = icon as Exclude<React.ReactNode, bigint> | undefined;
    const safeChildren = children as Exclude<React.ReactNode, bigint> | undefined;

    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center overflow-hidden shrink-0",
          sizeClass,
          shape === "circle" ? "rounded-full" : "rounded-md",
          "bg-[var(--bg-secondary)] text-[var(--secondary)]",
          className
        )}
        style={{ ...sizeStyle, ...style }}
        {...props}
      >
        {isImage ? (
          <img
            className="w-full h-full object-cover"
            alt={alt}
            src={src as string}
          />
        ) : safeSrc ? (
          safeSrc
        ) : safeIcon ? (
          <span className="flex items-center justify-center">{safeIcon}</span>
        ) : safeChildren ? (
          safeChildren
        ) : (
          <AvatarFallback />
        )}
      </Comp>
    );
  }
);

Avatar.displayName = 'Avatar';

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ maxCount, maxStyle, size = 'md', shape = 'circle', children, className, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children as React.ReactNode | React.ReactNode[]);
    const totalCount = childrenArray.length;

    let renderChildren = childrenArray;
    if (maxCount && maxCount < totalCount) {
      const childrenToShow = childrenArray.slice(0, maxCount);
      const excess = totalCount - maxCount;

      renderChildren = [
        ...childrenToShow,
        <Avatar
          key="excess"
          size={size}
          shape={shape}
          style={maxStyle}
          className="cursor-pointer bg-[var(--bg-tertiary)]"
        >
          +{excess}
        </Avatar>
      ];
    }

    return (
      <div
        ref={ref}
        className={cn("flex items-center -space-x-3 rtl:space-x-reverse", className)}
        {...props}
      >
        {React.Children.map(renderChildren, (child) => {
          // Clone child to pass size and shape if not explicitly set on child?
          // Usually AvatarGroup overrides child props
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<AvatarProps>, {
              size: child.props.size || size,
              shape: child.props.shape || shape,
              className: cn("border-2 border-white dark:border-gray-800", child.props.className)
            });
          }
          return child;
        })}
      </div>
    );
  }
);
AvatarGroup.displayName = 'AvatarGroup';

export { AvatarGroup };
export { AvatarImage } from './AvatarImage';
export { AvatarFallback } from './AvatarFallback';
