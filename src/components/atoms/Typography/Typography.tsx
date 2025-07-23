import React from "react";
import { cn } from "../../../lib/utils";

// ======================
// REUSABLE TYPOGRAPHY COMPONENT FOR AI TOOLS
// ======================

export type TypographyVariant = 
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
  | 'caption'
  | 'button';

export type TypographySize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type TypographyWeight = 'regular' | 'medium' | 'semibold' | 'bold';
export type TypographyColor = 'primary' | 'secondary' | 'muted' | 'danger' | 'success' | 'warning';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  size?: TypographySize;
  weight?: TypographyWeight;
  color?: TypographyColor;
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
}

const variantStyles = {
  h1: "text-[var(--font-size-xxl)] font-[var(--font-weight-regular)] leading-[1.4] text-[28px] font-normal", // Title Primary: 28px, Regular, 140%
  h2: "text-[var(--font-size-xl)] font-[var(--font-weight-semibold)] leading-[1.4] text-[24px] font-semibold", // Title Secondary: 24px, Semibold, 140%
  h3: "text-[var(--font-size-lg)] font-[var(--font-weight-semibold)] leading-[1.4] text-[20px] font-semibold",
  h4: "text-[var(--font-size-md)] font-[var(--font-weight-semibold)] leading-[1.4] text-[16px] font-semibold",
  h5: "text-[var(--font-size-sm)] font-[var(--font-weight-semibold)] leading-[1.4] text-[14px] font-semibold",
  h6: "text-[var(--font-size-xs)] font-[var(--font-weight-semibold)] leading-[1.4] text-[12px] font-semibold",
  p: "text-[var(--font-size-md)] font-[var(--font-weight-regular)] leading-[1.4] text-[16px] font-normal",
  span: "text-[var(--font-size-md)] font-[var(--font-weight-regular)] leading-[1.4] text-[16px] font-normal",
  'display-bold': "text-[var(--font-size-lg)] font-[var(--font-weight-semibold)] leading-[1.4] text-[20px] font-semibold", // Display Primary: 20px, Semibold, 140%
  'body-semibold': "text-[var(--font-size-md)] font-[var(--font-weight-semibold)] leading-[1.4] text-[16px] font-semibold", // Body Primary Semibold: 16px, Semibold, 140%
  'body-regular': "text-[var(--font-size-md)] font-[var(--font-weight-regular)] leading-[1.4] text-[16px] font-normal", // Body Primary Regular: 16px, Regular, 140%
  'body-medium': "text-[var(--font-size-sm)] font-[var(--font-weight-medium)] leading-[1.4] text-[14px] font-medium", // Body Secondary Medium: 14px, Medium, 140%
  caption: "text-[var(--font-size-sm)] font-[var(--font-weight-regular)] leading-[1.4] text-[14px] font-normal",
  button: "text-[var(--font-size-lg)] font-[var(--font-weight-medium)] leading-[1.4] text-[20px] font-medium tracking-[0.00163rem]", // Button: 20px, Medium, 140%, Letter-spacing
};

const sizeStyles = {
  xs: "text-[var(--font-size-xs)] text-[12px]",
  sm: "text-[var(--font-size-sm)] text-[14px]",
  md: "text-[var(--font-size-md)] text-[16px]",
  lg: "text-[var(--font-size-lg)] text-[20px]",
  xl: "text-[var(--font-size-xl)] text-[24px]",
  xxl: "text-[var(--font-size-xxl)] text-[32px]",
};

const weightStyles = {
  regular: "font-[var(--font-weight-regular)] font-normal",
  medium: "font-[var(--font-weight-medium)] font-medium",
  semibold: "font-[var(--font-weight-semibold)] font-semibold",
  bold: "font-[var(--font-weight-bold)] font-bold",
};

const colorStyles = {
  primary: "text-[var(--color-primary)] text-gray-900",     // was --color-primary
  secondary: "text-[var(--color-secondary)] text-gray-600", // was --color-secondary
  muted: "text-[var(--color-tertiary)] text-gray-400",     // was --color-tertiary
  danger: "text-[var(--color-critical)] text-red-600",
  success: "text-[var(--color-success)] text-green-600",
  warning: "text-[var(--color-warning)] text-yellow-600",
};

const variantToElement = {
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
  button: 'span',
} as const;

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(({
  variant = 'p',
  size,
  weight,
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
    // Variant styles (default if no custom size/weight provided)
    !size && !weight && variantStyles[variant],
    // Custom size override
    size && sizeStyles[size],
    // Custom weight override  
    weight && weightStyles[weight],
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