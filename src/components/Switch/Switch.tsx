"use client";

import React from 'react';
import { cn } from '../../lib/utils';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  size?: 'sm' | 'md';
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, size = 'md', disabled, ...props }, ref) => {
    // Size styles - exact Figma specifications
    const sizeStyles = {
      sm: {
        track: "w-[30px] h-[16px]",
        thumb: "w-[14px] h-[14px]",
        gap: "gap-[6px]",
        text: "text-[12px]"
      },
      md: {
        track: "w-[34px] h-[14px]", // Exact Figma dimensions from switch track
        thumb: "w-[20px] h-[20px]", // Exact Figma dimensions from thumb (Ellipse 1347)
        gap: "gap-[8px]",
        text: "text-[14px]"
      }
    };

    const currentSize = sizeStyles[size];

    // Track styles using exact Figma specifications
    const trackStyles = cn(
      // Base styles
      "relative inline-flex shrink-0 rounded-full border-0 transition-all duration-200 cursor-pointer",
      // Size
      currentSize.track,
      // State styles using exact Figma colors
      disabled
        ? "bg-[var(--switch-disabled-bg)]" // rgba(139, 139, 139, 0.2) from Figma
        : props.checked
        ? "bg-[var(--switch-on-bg)]" // #CED1D7 from Figma (track when on)
        : "bg-[var(--switch-off-bg)]", // #838C9D from Figma (track when off)
      // Focus styles
      "focus-within:outline-none focus-within:ring-2 focus-within:ring-[var(--color-neutral-light)] focus-within:ring-offset-2",
      className
    );

    // Thumb styles using exact Figma specifications
    const thumbStyles = cn(
      // Base styles
      "absolute top-1/2 transform -translate-y-1/2 rounded-full transition-all duration-200 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.35)]", // Exact shadow from Figma
      // Size
      currentSize.thumb,
      // Position - exact calculations from Figma layout
      props.checked 
        ? "translate-x-[14px]" // When on: thumb moves right (34px track - 20px thumb = 14px)
        : "translate-x-[-3px]", // When off: thumb position (offset to align properly)
      // Colors using exact Figma specifications
      disabled
        ? "bg-[var(--switch-disabled-thumb)]" // #838C9D for disabled state
        : props.checked
        ? "bg-[var(--switch-thumb-on)]" // #434F64 when on from Figma
        : "bg-[var(--switch-thumb-off)]" // #FFFFFF when off from Figma
    );

    // Label styles using exact Figma specifications (similar to checkbox)
    const labelStyles = cn(
      "font-[var(--checkbox-font-weight)] leading-[1.4] cursor-pointer", // 500 weight
      currentSize.text,
      disabled
        ? "text-[var(--color-dark-25)] cursor-not-allowed"
        : "text-[var(--color-dark-100)]"
    );

    // Container styles
    const containerStyles = cn(
      "inline-flex items-center",
      currentSize.gap
    );

    return (
      <label className={containerStyles}>
        <div className={trackStyles}>
          <input
            type="checkbox"
            className="sr-only"
            ref={ref}
            disabled={disabled}
            {...props}
          />
          <div className={thumbStyles} />
        </div>
        {label && <span className={labelStyles}>{label}</span>}
      </label>
    );
  }
);

Switch.displayName = 'Switch'; 