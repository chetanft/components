"use client";

import React from 'react';
import { cn } from '../../../lib/utils';

export type AvatarSize = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: AvatarSize;
  src?: string;
  alt?: string;
  className?: string;
}

const sizeMap: Record<AvatarSize, string> = {
  xxs: "size-[16px]",
  xs: "size-[24px]",
  sm: "size-[32px]",
  md: "size-[40px]",
  lg: "size-[48px]",
  xl: "size-[56px]",
  xxl: "size-[64px]",
};

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ size = "md", src, alt = "User Avatar", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center",
          sizeMap[size],
          className
        )}
        {...props}
      >
        <div className="bg-[var(--bg_primary,#ffffff)] h-full w-full overflow-hidden rounded-full shrink-0">
          {src ? (
            <img
              className="w-full h-full object-cover pointer-events-none"
              alt={alt}
              src={src}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[var(--border-primary,#ced1d7)]">
              <div className="size-[60%] text-[var(--primary,#434f64)]">
                {/* Placeholder - could add User icon here if needed */}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

