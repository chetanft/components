"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Typography } from '../../atoms/Typography';

export type EmptyImage = 'default' | 'simple' | 'no-data' | 'error';

export interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Description text */
  description?: React.ReactNode;
  /** Image type or custom image */
  image?: EmptyImage | React.ReactNode;
  /** Custom image style */
  imageStyle?: React.CSSProperties;
  /** Action buttons or content below description */
  children?: React.ReactNode;
}

/**
 * Empty component - Empty state display built with FT Design System tokens.
 * 
 * Uses:
 * - Colors: var(--tertiary), var(--border-primary), var(--border-secondary)
 * - Typography: body-secondary variants
 * - Spacing: var(--x4), var(--x6), var(--x8)
 */
export const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(
  ({
    description = 'No data',
    image = 'default',
    imageStyle,
    children,
    className,
    ...props
  }, ref) => {
    // Render image based on type
    const renderImage = () => {
      if (React.isValidElement(image)) {
        return image;
      }

      const imageType = image as EmptyImage;
      
      // SVG illustrations using FT Design System colors
      const illustrations: Record<EmptyImage, React.ReactNode> = {
        default: (
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={imageStyle}
          >
            <rect
              x="8"
              y="16"
              width="48"
              height="32"
              rx="4"
              stroke="var(--border-primary)"
              strokeWidth="2"
              fill="var(--border-secondary)"
            />
            <path
              d="M8 24h48"
              stroke="var(--border-primary)"
              strokeWidth="2"
            />
            <circle cx="14" cy="20" r="2" fill="var(--tertiary)" />
            <circle cx="20" cy="20" r="2" fill="var(--tertiary)" />
            <circle cx="26" cy="20" r="2" fill="var(--tertiary)" />
            <rect
              x="16"
              y="32"
              width="32"
              height="8"
              rx="2"
              fill="var(--border-primary)"
              opacity="0.5"
            />
          </svg>
        ),
        simple: (
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={imageStyle}
          >
            <circle
              cx="32"
              cy="32"
              r="24"
              stroke="var(--border-primary)"
              strokeWidth="2"
              fill="var(--border-secondary)"
            />
            <path
              d="M24 32h16"
              stroke="var(--tertiary)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ),
        'no-data': (
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={imageStyle}
          >
            <rect
              x="12"
              y="8"
              width="40"
              height="48"
              rx="4"
              stroke="var(--border-primary)"
              strokeWidth="2"
              fill="var(--border-secondary)"
            />
            <path
              d="M20 20h24M20 28h16M20 36h20"
              stroke="var(--tertiary)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle
              cx="44"
              cy="44"
              r="12"
              fill="var(--bg-primary)"
              stroke="var(--border-primary)"
              strokeWidth="2"
            />
            <path
              d="M40 44h8M44 40v8"
              stroke="var(--tertiary)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ),
        error: (
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={imageStyle}
          >
            <circle
              cx="32"
              cy="32"
              r="24"
              stroke="var(--critical)"
              strokeWidth="2"
              fill="var(--critical-light)"
              opacity="0.3"
            />
            <path
              d="M24 24l16 16M40 24L24 40"
              stroke="var(--critical)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ),
      };

      return illustrations[imageType] || illustrations.default;
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center",
          "py-[var(--x8)] px-[var(--x4)]",
          "text-center",
          className
        )}
        {...props}
      >
        {/* Image */}
        <div className="mb-[var(--x4)]">
          {renderImage()}
        </div>

        {/* Description */}
        {description && (
          <Typography
            variant="body-secondary-regular"
            className="text-[var(--tertiary)] max-w-[256px]"
          >
            {description}
          </Typography>
        )}

        {/* Actions */}
        {children && (
          <div className="mt-[var(--x6)]">
            {children}
          </div>
        )}
      </div>
    );
  }
);

Empty.displayName = 'Empty';

// Preset configurations for common empty states
export const EmptyPresets = {
  /** No search results */
  noResults: {
    image: 'simple' as EmptyImage,
    description: 'No results found',
  },
  /** No data available */
  noData: {
    image: 'no-data' as EmptyImage,
    description: 'No data available',
  },
  /** Error state */
  error: {
    image: 'error' as EmptyImage,
    description: 'Something went wrong',
  },
  /** Empty inbox/list */
  emptyList: {
    image: 'default' as EmptyImage,
    description: 'Nothing here yet',
  },
};
