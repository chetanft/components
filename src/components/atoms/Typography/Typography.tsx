import React from "react";
import { cn } from "../../../lib/utils";

// ======================
// REUSABLE TYPOGRAPHY COMPONENT FOR AI TOOLS
// ======================

export type TypographyVariant =
  // Figma Design System Variants
  | 'title-primary'             // 28px, Regular, 140%
  | 'title-secondary'           // 24px, Semibold, 140%
  | 'display-primary'           // 20px, Semibold, 140%
  | 'button'                    // 20px, Medium, 140%
  | 'body-primary-semibold'     // 16px, Semibold, 140%
  | 'body-primary-medium'       // 16px, Medium, 140%
  | 'body-primary-italic'       // 16px, Italic, 140%
  | 'body-primary-regular'      // 16px, Regular, 140%
  | 'body-secondary-semibold'   // 14px, Semibold, 140%
  | 'body-secondary-medium'     // 14px, Medium, 140%
  | 'body-secondary-regular';   // 14px, Regular, 140%

export type TypographyColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'muted'
  | 'danger'
  | 'success'
  | 'warning';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  color?: TypographyColor;
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
}

const variantStyles = {
  // Figma Design System - Direct pixel values
  'title-primary': "text-[28px] font-normal leading-[1.4]",                    // Title Primary: 28/140
  'title-secondary': "text-[24px] font-semibold leading-[1.4]",                // Title Secondary: 24/140
  'display-primary': "text-[20px] font-semibold leading-[1.4]",                // Display Primary: 20/140
  'button': "text-[20px] font-medium leading-[1.4] tracking-[0.0264px]",       // Btn: 20/140
  'body-primary-semibold': "text-[16px] font-semibold leading-[1.4]",          // Body Primary Semibold: 16/140
  'body-primary-medium': "text-[16px] font-medium leading-[1.4]",              // Body Primary Medium: 16/140
  'body-primary-italic': "text-[16px] font-normal italic leading-[1.4]",       // Body Primary Italic: 16/140
  'body-primary-regular': "text-[16px] font-normal leading-[1.4]",             // Body Primary Regular: 16/140
  'body-secondary-semibold': "text-[14px] font-semibold leading-[1.4]",        // Body Secondary Semibold: 14/140
  'body-secondary-medium': "text-[14px] font-medium leading-[1.4]",            // Body Secondary Medium: 14/140
  'body-secondary-regular': "text-[14px] font-normal leading-[1.4]",           // Body Secondary Regular: 14/140
};

const colorStyles = {
  primary: "text-[var(--primary)]",     // Uses CSS variable that adapts per theme
  secondary: "text-[var(--secondary)]",
  tertiary: "text-[var(--tertiary)]",
  muted: "text-[var(--tertiary)]",
  danger: "text-[var(--critical)]",
  success: "text-[var(--positive)]",
  warning: "text-[var(--warning)]",
};

const variantToElement = {
  'title-primary': 'h1',
  'title-secondary': 'h2',
  'display-primary': 'div',
  'button': 'span',
  'body-primary-semibold': 'p',
  'body-primary-medium': 'p',
  'body-primary-italic': 'p',
  'body-primary-regular': 'p',
  'body-secondary-semibold': 'p',
  'body-secondary-medium': 'p',
  'body-secondary-regular': 'p',
} as const;

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(({
  variant = 'body-primary-regular',
  color = 'primary',
  as,
  className,
  children,
  ...props
}, ref) => {
  // Determine the HTML element to render
  const Element = (as || variantToElement[variant]) as keyof JSX.IntrinsicElements;

  // Build className based on props
  const classes = cn(
    // Base styles - use standard Tailwind font class, font-family set via inline style
    "font-sans",
    // Variant styles
    variantStyles[variant],
    // Color
    colorStyles[color],
    // Custom className
    className
  );
  
  // Font family via inline style to avoid Tailwind arbitrary value issues
  const fontFamilyStyle = {
    fontFamily: 'var(--font-family-primary, "Inter", sans-serif)',
  };

  // Use a switch to properly handle JSX rendering
  const commonProps = {
    ref: ref as any,
    className: classes,
    style: { ...fontFamilyStyle, ...props.style },
    ...props
  };

  switch (Element) {
    case 'h1':
      return <h1 {...commonProps}>{children}</h1>;
    case 'h2':
      return <h2 {...commonProps}>{children}</h2>;
    case 'h3':
      return <h3 {...commonProps}>{children}</h3>;
    case 'h4':
      return <h4 {...commonProps}>{children}</h4>;
    case 'h5':
      return <h5 {...commonProps}>{children}</h5>;
    case 'h6':
      return <h6 {...commonProps}>{children}</h6>;
    case 'span':
      return <span {...commonProps}>{children}</span>;
    case 'div':
      return <div {...commonProps}>{children}</div>;
    default:
      return <p {...commonProps}>{children}</p>;
  }
});

Typography.displayName = 'Typography';