"use client";

import React from 'react';
import { cn } from '../../../lib/utils';

export type AvatarSize = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export type AvatarShape = "circle" | "square";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
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

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ size = "md", shape = "circle", src, icon, alt = "User Avatar", className, style, children, ...props }, ref) => {

    let sizeClass = typeof size === 'string' ? sizeMap[size] || sizeMap.md : '';
    let sizeStyle = typeof size === 'number' ? { width: size, height: size, fontSize: size / 2 } : {};

    const isImage = typeof src === 'string';

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center overflow-hidden shrink-0",
          sizeClass,
          shape === "circle" ? "rounded-full" : "rounded-md",
          "bg-[var(--bg-secondary)] text-[var(--secondary)]", // Default placeholder styling
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
        ) : src ? (
          src
        ) : icon ? (
          <span className="flex items-center justify-center">{icon}</span>
        ) : children ? (
          children
        ) : (
          // Default placeholder (Initials or Icon)
          <span className="flex items-center justify-center font-medium">
            {/* Fallback to generic icon if needed, or just nothing */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-1/2 h-1/2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </span>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ maxCount, maxStyle, size = 'md', shape = 'circle', children, className, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children);
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
