"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Typography } from '../Typography';

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
        variant: "body-secondary-regular" as const // 12px → closest is 14px
      },
      md: {
        track: "w-[34px] h-[14px]", // Exact Figma dimensions from switch track
        thumb: "w-[20px] h-[20px]", // Exact Figma dimensions from thumb (Ellipse 1347)
        gap: "gap-[8px]",
        variant: "body-secondary-medium" as const // 14px, medium weight
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
          ? "bg-[var(--primary)]" // Primary color when on
          : "bg-[var(--neutral-300)]", // Neutral color when off
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
        ? props.checked
          ? "bg-[var(--switch-disabled-thumb-on)]" // #CED1D7 - Disabled thumb when on
          : "bg-[var(--switch-disabled-thumb)]" // #F8F8F9 - Disabled thumb when off
        : props.checked
          ? "bg-[var(--color-bg-primary)]" // White thumb when on
          : "bg-[var(--color-bg-primary)]" // White thumb when off
    );

    // Get color for label based on disabled state
    const getLabelColor = () => {
      if (disabled) return 'muted';
      return 'primary';
    };

    // Container styles
    const containerStyles = cn(
      "inline-flex items-center",
      currentSize.gap
    );

    // Handle controlled/uncontrolled switch
    const isControlled = props.checked !== undefined;
    const hasOnChange = props.onChange !== undefined;
    const inputProps = { ...props };

    // If checked is provided without onChange, use defaultChecked for uncontrolled
    if (isControlled && !hasOnChange) {
      inputProps.defaultChecked = inputProps.checked;
      delete inputProps.checked;
    }

    return (
      <label className={containerStyles}>
        <div className={trackStyles}>
          <input
            type="checkbox"
            className="sr-only"
            ref={ref}
            disabled={disabled}
            {...inputProps}
          />
          <div className={thumbStyles} />
        </div>
        {label && (
          <Typography
            variant={currentSize.variant}
            color={getLabelColor()}
            as="span"
            className={disabled ? "cursor-not-allowed" : "cursor-pointer"}
          >
            {label}
          </Typography>
        )}
      </label>
    );
  }
);

Switch.displayName = 'Switch'; 