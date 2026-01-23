import React from "react";
import { cn } from "../../../lib/utils";
import { Slot, type ComposableProps } from "../../../lib/slot";

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

export interface TypographyProps extends Omit<ComposableProps<'div'>, 'as'> {
  variant?: TypographyVariant;
  color?: TypographyColor;
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
}

const variantStyles = {
  // Figma Design System - Rem-based values (responsive)
  'title-primary': "text-xxl-rem font-normal leading-[1.4]",                    // Title Primary: 28px → 2rem (responsive)
  'title-secondary': "text-xl-rem font-semibold leading-[1.4]",                // Title Secondary: 24px → 1.714rem (responsive)
  'display-primary': "text-lg-rem font-semibold leading-[1.4]",                // Display Primary: 20px → 1.429rem (responsive)
  'button': "text-lg-rem font-medium leading-[1.4] tracking-[0.0264px]",       // Btn: 20px → 1.429rem (responsive)
  'body-primary-semibold': "text-md-rem font-semibold leading-[1.4]",          // Body Primary Semibold: 16px → 1.143rem (responsive)
  'body-primary-medium': "text-md-rem font-medium leading-[1.4]",              // Body Primary Medium: 16px → 1.143rem (responsive)
  'body-primary-italic': "text-md-rem font-normal italic leading-[1.4]",       // Body Primary Italic: 16px → 1.143rem (responsive)
  'body-primary-regular': "text-md-rem font-normal leading-[1.4]",             // Body Primary Regular: 16px → 1.143rem (responsive)
  'body-secondary-semibold': "text-sm-rem font-semibold leading-[1.4]",        // Body Secondary Semibold: 14px → 1rem (responsive)
  'body-secondary-medium': "text-sm-rem font-medium leading-[1.4]",            // Body Secondary Medium: 14px → 1rem (responsive)
  'body-secondary-regular': "text-sm-rem font-normal leading-[1.4]",           // Body Secondary Regular: 14px → 1rem (responsive)
};

const colorStyles = {
  primary: "var(--primary)",     // Uses CSS variable that adapts per theme
  secondary: "var(--secondary)",
  tertiary: "var(--tertiary)",
  muted: "var(--tertiary)",
  danger: "var(--critical)",
  success: "var(--positive)",
  warning: "var(--warning)",
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
  asChild,
  ...props
}, ref) => {
  // Determine the HTML element to render
  const BaseElement = (as || variantToElement[variant]) as keyof JSX.IntrinsicElements;
  const Element = asChild ? Slot : BaseElement;

  // Build className based on props
  const classes = cn(
    // Base styles - use standard Tailwind font class, font-family set via inline style
    "font-sans",
    // Variant styles
    variantStyles[variant as keyof typeof variantStyles],
    // Custom className
    className
  );

  // Font family via inline style to avoid Tailwind arbitrary value issues
  const fontFamilyStyle = {
    fontFamily: 'var(--font-family-primary, "Inter", sans-serif)',
    color: colorStyles[color as keyof typeof colorStyles],
  };

  // Use a switch to properly handle JSX rendering
  const commonProps = {
    className: classes,
    style: { ...fontFamilyStyle, ...(props.style || {}) },
    ...props
  };

  if (Element === Slot) {
    return <Slot ref={ref} {...commonProps}>{children}</Slot>;
  }

  switch (Element) {
    case 'h1':
      return <h1 ref={ref as React.Ref<HTMLHeadingElement>} {...commonProps}>{children}</h1>;
    case 'h2':
      return <h2 ref={ref as React.Ref<HTMLHeadingElement>} {...commonProps}>{children}</h2>;
    case 'h3':
      return <h3 ref={ref as React.Ref<HTMLHeadingElement>} {...commonProps}>{children}</h3>;
    case 'h4':
      return <h4 ref={ref as React.Ref<HTMLHeadingElement>} {...commonProps}>{children}</h4>;
    case 'h5':
      return <h5 ref={ref as React.Ref<HTMLHeadingElement>} {...commonProps}>{children}</h5>;
    case 'h6':
      return <h6 ref={ref as React.Ref<HTMLHeadingElement>} {...commonProps}>{children}</h6>;
    case 'span':
      return <span ref={ref as React.Ref<HTMLSpanElement>} {...commonProps}>{children}</span>;
    case 'div':
      return <div ref={ref as React.Ref<HTMLDivElement>} {...commonProps}>{children}</div>;
    default:
      return <p ref={ref as React.Ref<HTMLParagraphElement>} {...commonProps}>{children}</p>;
  }
});

Typography.displayName = 'Typography';
