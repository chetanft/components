"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface AvatarImageProps extends ComposableProps<'img'> {
  /**
   * Image source URL
   */
  src: string;
  /**
   * Alt text for the image
   */
  alt?: string;
}

/**
 * AvatarImage Component
 *
 * A composable component for displaying an image in an Avatar.
 * Typically used within Avatar.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Avatar size="md">
 *   <AvatarImage src="/avatar.jpg" alt="User" />
 * </Avatar>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<img>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 */
export const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, src, alt = "User Avatar", asChild, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot
          ref={ref as any}
          className={cn("w-full h-full object-cover", className)}
          {...(props as any)}
        />
      );
    }

    return (
      <img
        ref={ref}
        className={cn("w-full h-full object-cover", className)}
        alt={alt}
        src={src}
        {...props}
      />
    );
  }
);

AvatarImage.displayName = 'AvatarImage';

