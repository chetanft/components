import React from "react";
import { cn } from "../../../lib/utils";

// ======================
// REUSABLE TYPOGRAPHY COMPONENT FOR AI TOOLS
// ======================

export type TypographyVariant = 
  // Figma Design System Variants
  | 'title-primary'             // 28px, Regular, 140%
  | 'title-secondary'            // 24px, Semibold, 140%
  | 'display-primary'            // 20px, Semibold, 140%
  | 'button'                     // 20px, Medium, 140%
  | 'body-primary-semibold'      // 16px, Semibold, 140%
  | 'body-primary-medium'        // 16px, Medium, 140%
  | 'body-primary-italic'        // 16px, Italic, 140%
  | 'body-primary-regular'       // 16px, Regular, 140%
  | 'body-secondary-semibold'    // 14px, Semibold, 140%
  | 'body-secondary-medium'      // 14px, Medium, 140%
  | 'body-secondary-regular'     // 14px, Regular, 140%
  // Legacy variants (backward compatibility)
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'h4' 
  | 'h5' 
  | 'h6' 
  | 'p' 
  | 'span'
  | 'display-bold'
  | 'body-semibold'
  | 'body-regular'
  | 'body-medium'
  | 'caption';

export type TypographyColor = 'primary' | 'secondary' | 'muted' | 'danger' | 'success' | 'warning';

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
  
  // Legacy variants (backward compatibility)
  h1: "text-[28px] font-normal leading-[1.4]",
  h2: "text-[24px] font-semibold leading-[1.4]",
  h3: "text-[20px] font-semibold leading-[1.4]",
  h4: "text-[16px] font-semibold leading-[1.4]",
  h5: "text-[14px] font-semibold leading-[1.4]",
  h6: "text-[12px] font-semibold leading-[1.4]",
  p: "text-[16px] font-normal leading-[1.4]",
  span: "text-[16px] font-normal leading-[1.4]",
  'display-bold': "text-[20px] font-semibold leading-[1.4]",
  'body-semibold': "text-[16px] font-semibold leading-[1.4]",
  'body-regular': "text-[16px] font-normal leading-[1.4]",
  'body-medium': "text-[14px] font-medium leading-[1.4]",
  caption: "text-[14px] font-normal leading-[1.4]",
};

const colorStyles = {
  primary: "text-[var(--primary)]",     // Uses CSS variable that adapts per theme
  secondary: "text-[var(--secondary)]", // Uses CSS variable that adapts per theme
  muted: "text-[var(--tertiary)]",      // Uses CSS variable that adapts per theme
  danger: "text-[var(--critical)]",
  success: "text-[var(--positive)]",
  warning: "text-[var(--warning)]",
};

const variantToElement = {
  // Figma variants
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
  
  // Legacy variants
  h1: 'h1',
  h2: 'h2', 
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  span: 'span',
  'display-bold': 'div',
  'body-semibold': 'p',
  'body-regular': 'p',
  'body-medium': 'p',
  caption: 'span',
} as const;

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(({
  variant = 'p',
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
    // Base styles - include fallback font family
    "font-[var(--font-family-primary)] font-sans text-black",
    // Variant styles
    variantStyles[variant],
    // Color
    colorStyles[color],
    // Custom className
    className
  );

  // Use a switch to properly handle JSX rendering
  const commonProps = {
    ref: ref as any,
    className: classes,
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

// ======================
// DOCUMENTATION SHOWCASE COMPONENT
// ======================

interface TypographyExampleProps {
  title: string;
  details: React.ReactNode;
  usage: string;
  token: string;
  className?: string;
  children: React.ReactNode;
}

export function TypographyExample({ title, details, usage, token, className, children }: TypographyExampleProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-4 gap-6 py-6 border-b border-[var(--color-border)]", className)}>
      <div className="font-[var(--font-weight-medium)] text-[var(--color-primary)]">
        {title}
      </div>
      <div className="text-[var(--font-size-sm)] text-[var(--color-secondary)]">
        {details}
      </div>
      <div className="text-[var(--font-size-sm)] text-[var(--color-secondary)]">
        {usage}
      </div>
      <div className="text-[var(--font-size-sm)] text-[var(--color-tertiary)]">
        {token}
      </div>
      <div className="col-span-full mt-[var(--spacing-x2)]">
        {children}
      </div>
    </div>
  );
}

export function TypographyShowcase() {
  return (
    <div className="w-full space-y-[var(--spacing-x10)]">
      <h1 className="text-[var(--font-size-xxl)] font-[var(--font-weight-regular)] mb-[var(--spacing-x8)] text-[var(--color-primary)]">Typography</h1>

      <section>
        <h2 className="text-[var(--font-size-xxl)] font-[var(--font-weight-regular)] mb-[var(--spacing-x6)] text-[var(--color-primary)]">Type Face: Inter</h2>
        <p className="text-[var(--font-size-xxl)] mb-[var(--spacing-x6)] text-[var(--color-primary)]">
          Freight Tiger is building logistics infrastructure to transform commerce in India.
        </p>
        <p className="text-[var(--font-size-xl)] font-[var(--font-weight-semibold)] mb-[var(--spacing-x6)] text-[var(--color-primary)]">
          Freight Tiger is building logistics infrastructure to transform commerce in India.
        </p>
        <p className="text-[var(--font-size-lg)] font-[var(--font-weight-medium)] mb-[var(--spacing-x6)] text-[var(--color-primary)]">
          Freight Tiger is building logistics infrastructure to transform commerce in India.
        </p>
        <p className="text-[var(--font-size-md)] mb-[var(--spacing-x6)] text-[var(--color-primary)]">
          Freight Tiger is building logistics infrastructure to transform commerce in India.
        </p>
        <p className="text-[var(--font-size-md)] font-[var(--font-weight-semibold)] mb-[var(--spacing-x6)] text-[var(--color-primary)]">
          Freight Tiger is building logistics infrastructure to transform commerce in India.
        </p>
        <p className="text-[var(--font-size-md)] font-[var(--font-weight-medium)] mb-[var(--spacing-x6)] text-[var(--color-primary)]">
          Freight Tiger is building logistics infrastructure to transform commerce in India.
        </p>
      </section>

      <section>
        <h2 className="text-[var(--font-size-xxl)] font-[var(--font-weight-regular)] mb-[var(--spacing-x6)] text-[var(--color-primary)]">Title</h2>
        <div className="grid grid-cols-4 gap-4 mb-4 border-b border-[var(--color-border)] py-[var(--spacing-x2)]">
          <div className="font-[var(--font-weight-medium)] text-[var(--color-primary)]">Font</div>
          <div className="font-[var(--font-weight-medium)] text-[var(--color-primary)]">Details</div>
          <div className="font-[var(--font-weight-medium)] text-[var(--color-primary)]">Usage</div>
          <div className="font-[var(--font-weight-medium)] text-[var(--color-primary)]">Token</div>
        </div>

        <TypographyExample 
          title="H1"
          details={
            <div className="space-y-1">
              <p>font-family: var(--font-family-primary);</p>
              <p>font-size: var(--font-size-xxl);</p>
              <p>font-weight: var(--font-weight-regular);</p>
              <p>line-height: 140%;</p>
            </div>
          }
          usage="Page Title"
          token="typography.fontSize.xxl"
        >
          <p className="text-[var(--font-size-xxl)] font-[var(--font-weight-regular)] text-[var(--color-primary)]">H1</p>
        </TypographyExample>

        <TypographyExample 
          title="H2"
          details={
            <div className="space-y-1">
              <p>font-family: var(--font-family-primary);</p>
              <p>font-size: var(--font-size-xl);</p>
              <p>font-weight: var(--font-weight-semibold);</p>
              <p>line-height: 140%;</p>
            </div>
          }
          usage="Section Title"
          token="typography.fontSize.xl"
        >
          <p className="text-[var(--font-size-xl)] font-[var(--font-weight-semibold)] text-[var(--color-primary)]">H2</p>
        </TypographyExample>
      </section>

      <section>
        <h2 className="text-[var(--font-size-xxl)] font-[var(--font-weight-regular)] mb-[var(--spacing-x6)] text-[var(--color-primary)]">Display</h2>
        <div className="grid grid-cols-4 gap-4 mb-4 border-b border-[var(--color-border)] py-[var(--spacing-x2)]">
          <div className="font-[var(--font-weight-medium)] text-[var(--color-primary)]">Font</div>
          <div className="font-[var(--font-weight-medium)] text-[var(--color-primary)]">Details</div>
          <div className="font-[var(--font-weight-medium)] text-[var(--color-primary)]">Usage</div>
          <div className="font-[var(--font-weight-medium)] text-[var(--color-primary)]">Token</div>
        </div>

        <TypographyExample 
          title="Display-bold"
          details={
            <div className="space-y-1">
              <p>font-family: var(--font-family-primary);</p>
              <p>font-size: var(--font-size-lg);</p>
              <p>font-weight: var(--font-weight-semibold);</p>
              <p>line-height: 140%;</p>
            </div>
          }
          usage="High level data, summary, dashboard content"
          token="typography.fontSize.lg"
        >
          <p className="text-[var(--font-size-lg)] font-[var(--font-weight-semibold)] text-[var(--color-primary)]">Display-bold</p>
        </TypographyExample>
      </section>

      <section>
        <h2 className="text-[var(--font-size-xxl)] font-[var(--font-weight-regular)] mb-[var(--spacing-x6)] text-[var(--color-primary)]">Button</h2>
        <div className="grid grid-cols-4 gap-4 mb-4 border-b border-[var(--color-border)] py-[var(--spacing-x2)]">
          <div className="font-[var(--font-weight-medium)] text-[var(--color-primary)]">Font</div>
          <div className="font-[var(--font-weight-medium)] text-[var(--color-primary)]">Details</div>
          <div className="font-[var(--font-weight-medium)] text-[var(--color-primary)]">Usage</div>
          <div className="font-[var(--font-weight-medium)] text-[var(--color-primary)]">Token</div>
        </div>

        <TypographyExample 
          title="Button"
          details={
            <div className="space-y-1">
              <p>font-family: var(--font-family-primary);</p>
              <p>font-size: var(--font-size-lg);</p>
              <p>font-weight: var(--font-weight-medium);</p>
              <p>line-height: 140%;</p>
            </div>
          }
          usage="Button Text"
          token="typography.fontSize.lg"
        >
          <p className="text-[var(--font-size-lg)] font-[var(--font-weight-medium)] text-[var(--color-primary)]">Button</p>
        </TypographyExample>
      </section>

      <section>
        <h2 className="text-[var(--font-size-xxl)] font-[var(--font-weight-regular)] mb-[var(--spacing-x6)] text-[var(--color-primary)]">Body</h2>
        <div className="grid grid-cols-4 gap-4 mb-4 border-b border-[var(--color-border)] py-[var(--spacing-x2)]">
          <div className="font-[var(--font-weight-medium)] text-[var(--color-primary)]">Font</div>
          <div className="font-[var(--font-weight-medium)] text-[var(--color-primary)]">Details</div>
          <div className="font-[var(--font-weight-medium)] text-[var(--color-primary)]">Usage</div>
          <div className="font-[var(--font-weight-medium)] text-[var(--color-primary)]">Token</div>
        </div>

        <TypographyExample 
          title="Primary-Semi-bold"
          details={
            <div className="space-y-1">
              <p>font-family: var(--font-family-primary);</p>
              <p>font-size: var(--font-size-md);</p>
              <p>font-weight: var(--font-weight-semibold);</p>
              <p>line-height: 140%;</p>
            </div>
          }
          usage="Page content, display data and information"
          token="typography.fontSize.md"
        >
          <p className="text-[var(--font-size-md)] font-[var(--font-weight-semibold)] text-[var(--color-primary)]">Primary-Semi-bold</p>
        </TypographyExample>

        <TypographyExample 
          title="Primary-Regular"
          details={
            <div className="space-y-1">
              <p>font-family: var(--font-family-primary);</p>
              <p>font-size: var(--font-size-md);</p>
              <p>font-weight: var(--font-weight-regular);</p>
              <p>line-height: 140%;</p>
            </div>
          }
          usage="Page content, display data and information"
          token="typography.fontSize.md"
        >
          <p className="text-[var(--font-size-md)] font-[var(--font-weight-regular)] text-[var(--color-primary)]">Primary-Regular</p>
        </TypographyExample>

        <TypographyExample 
          title="Secondary-Semibold"
          details={
            <div className="space-y-1">
              <p>font-family: var(--font-family-primary);</p>
              <p>font-size: var(--font-size-sm);</p>
              <p>font-weight: var(--font-weight-semibold);</p>
              <p>line-height: 140%;</p>
            </div>
          }
          usage="Secondary information"
          token="typography.fontSize.sm"
        >
          <p className="text-[var(--font-size-sm)] font-[var(--font-weight-semibold)] text-[var(--color-primary)]">Secondary-Semibold</p>
        </TypographyExample>
      </section>
    </div>
  );
} 