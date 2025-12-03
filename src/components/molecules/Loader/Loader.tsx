"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface LoaderProps extends ComposableProps<'div'> {
  /** Progress value 0-100 */
  value?: number;
  /** Size of the logo/icon */
  logoSize?: number;
  /** Show logo/icon */
  showLogo?: boolean;
  /** Custom logo component */
  logo?: React.ReactNode;
}

/**
 * FT Icon - Icon-only version (slanted bars) without text
 * Extracted from FTLogo, showing only the 5 slanted bars icon
 */
const FTIcon: React.FC<{ size?: number }> = ({ size = 180 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block' }}
  >
    {/* Only the icon paths (5 slanted bars) - no text */}
    <path d="M0 15.7614L2.79299 18.8128L16.3478 4.00397L13.5548 0.952578L0 15.7614Z" fill="#FFBE07"/>
    <path d="M6.48266 14.8089L9.27565 17.8602L22.8305 3.05139L20.0375 0L6.48266 14.8089Z" fill="#211F1F"/>
    <path d="M8.41371 24.9486L11.2067 28L24.7615 13.1911L21.9685 10.1398L8.41371 24.9486Z" fill="#211F1F"/>
    <path d="M7.43886 19.8689L10.2319 22.9203L23.7867 8.11147L20.9937 5.06007L7.43886 19.8689Z" fill="#FFBE07"/>
    <path d="M14.8899 23.9777L17.6797 27.0256L31.242 12.2085L28.4246 9.16061L14.8899 23.9777Z" fill="#FFBE07"/>
  </svg>
);

/**
 * Loader Component
 * 
 * A loading indicator component with progress bar and optional logo.
 * Supports `asChild` prop for flexible composition.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * <Loader value={50} showLogo={true} />
 * ```
 * 
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Uses FT Design System tokens for colors and spacing.
 */
export const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
  ({
    value = 0,
    logoSize = 180,
    showLogo = true,
    logo,
    className,
    asChild,
    ...props
  }, ref) => {
    // Clamp value between 0 and 100
    const numericValue = typeof value === 'number' && !isNaN(value) ? value : 0;
    const clampedValue = Math.min(Math.max(numericValue, 0), 100);

    // Default icon (only the slanted bars, no text)
    const defaultLogo = showLogo ? (
      <div className="overflow-clip relative shrink-0" style={{ width: logoSize, height: logoSize }}>
        <div className="absolute bottom-[11.72%] left-0 right-0 top-[6.25%]">
          <FTIcon size={logoSize} />
        </div>
      </div>
    ) : null;

    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          "content-stretch flex flex-col gap-[var(--x5,20px)] items-center relative size-full",
          className
        )}
        {...props}
      >
        {logo || defaultLogo}
        
        <div 
          className="content-stretch flex flex-col gap-[var(--x2)] items-start relative rounded-full shrink-0 w-full"
          style={{ 
            height: 'var(--x2)',
            backgroundColor: 'var(--border-primary)' 
          }}
        >
          <div
            className="rounded-full shrink-0 transition-all duration-300 ease-out"
            style={{
              width: `${clampedValue}%`,
              height: 'var(--x2)',
              backgroundColor: 'var(--primary)',
            }}
            role="progressbar"
            aria-valuenow={clampedValue}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </Comp>
    );
  }
);

Loader.displayName = 'Loader';

