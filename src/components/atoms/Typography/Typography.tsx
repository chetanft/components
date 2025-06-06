import React from "react";
import { cn } from "../../../lib/utils";

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
      <div className="font-[var(--font-weight-medium)] text-[var(--color-dark-100)]">
        {title}
      </div>
      <div className="text-[var(--font-size-sm)] text-[var(--color-dark-50)]">
        {details}
      </div>
      <div className="text-[var(--font-size-sm)] text-[var(--color-dark-50)]">
        {usage}
      </div>
      <div className="text-[var(--font-size-sm)] text-[var(--color-dark-25)]">
        {token}
      </div>
      <div className="col-span-full mt-[var(--spacing-x2)]">
        {children}
      </div>
    </div>
  );
}

export function Typography() {
  return (
    <div className="w-full space-y-[var(--spacing-x10)]">
      <h1 className="text-[var(--font-size-xxl)] font-[var(--font-weight-regular)] mb-[var(--spacing-x8)] text-[var(--color-dark-100)]">Typography</h1>

      <section>
        <h2 className="text-[var(--font-size-xxl)] font-[var(--font-weight-regular)] mb-[var(--spacing-x6)] text-[var(--color-dark-100)]">Type Face: Inter</h2>
        <p className="text-[var(--font-size-xxl)] mb-[var(--spacing-x6)] text-[var(--color-dark-100)]">
          Freight Tiger is building logistics infrastructure to transform commerce in India.
        </p>
        <p className="text-[var(--font-size-xl)] font-[var(--font-weight-semibold)] mb-[var(--spacing-x6)] text-[var(--color-dark-100)]">
          Freight Tiger is building logistics infrastructure to transform commerce in India.
        </p>
        <p className="text-[var(--font-size-lg)] font-[var(--font-weight-medium)] mb-[var(--spacing-x6)] text-[var(--color-dark-100)]">
          Freight Tiger is building logistics infrastructure to transform commerce in India.
        </p>
        <p className="text-[var(--font-size-md)] mb-[var(--spacing-x6)] text-[var(--color-dark-100)]">
          Freight Tiger is building logistics infrastructure to transform commerce in India.
        </p>
        <p className="text-[var(--font-size-md)] font-[var(--font-weight-semibold)] mb-[var(--spacing-x6)] text-[var(--color-dark-100)]">
          Freight Tiger is building logistics infrastructure to transform commerce in India.
        </p>
        <p className="text-[var(--font-size-md)] font-[var(--font-weight-medium)] mb-[var(--spacing-x6)] text-[var(--color-dark-100)]">
          Freight Tiger is building logistics infrastructure to transform commerce in India.
        </p>
      </section>

      <section>
        <h2 className="text-[var(--font-size-xxl)] font-[var(--font-weight-regular)] mb-[var(--spacing-x6)] text-[var(--color-dark-100)]">Title</h2>
        <div className="grid grid-cols-4 gap-4 mb-4 border-b border-[var(--color-border)] py-[var(--spacing-x2)]">
          <div className="font-[var(--font-weight-medium)] text-[var(--color-dark-100)]">Font</div>
          <div className="font-[var(--font-weight-medium)] text-[var(--color-dark-100)]">Details</div>
          <div className="font-[var(--font-weight-medium)] text-[var(--color-dark-100)]">Usage</div>
          <div className="font-[var(--font-weight-medium)] text-[var(--color-dark-100)]">Token</div>
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
          <p className="text-[var(--font-size-xxl)] font-[var(--font-weight-regular)] text-[var(--color-dark-100)]">H1</p>
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
          <p className="text-[var(--font-size-xl)] font-[var(--font-weight-semibold)] text-[var(--color-dark-100)]">H2</p>
        </TypographyExample>
      </section>

      <section>
        <h2 className="text-[var(--font-size-xxl)] font-[var(--font-weight-regular)] mb-[var(--spacing-x6)] text-[var(--color-dark-100)]">Display</h2>
        <div className="grid grid-cols-4 gap-4 mb-4 border-b border-[var(--color-border)] py-[var(--spacing-x2)]">
          <div className="font-[var(--font-weight-medium)] text-[var(--color-dark-100)]">Font</div>
          <div className="font-[var(--font-weight-medium)] text-[var(--color-dark-100)]">Details</div>
          <div className="font-[var(--font-weight-medium)] text-[var(--color-dark-100)]">Usage</div>
          <div className="font-[var(--font-weight-medium)] text-[var(--color-dark-100)]">Token</div>
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
          <p className="text-[var(--font-size-lg)] font-[var(--font-weight-semibold)] text-[var(--color-dark-100)]">Display-bold</p>
        </TypographyExample>
      </section>

      <section>
        <h2 className="text-[var(--font-size-xxl)] font-[var(--font-weight-regular)] mb-[var(--spacing-x6)] text-[var(--color-dark-100)]">Button</h2>
        <div className="grid grid-cols-4 gap-4 mb-4 border-b border-[var(--color-border)] py-[var(--spacing-x2)]">
          <div className="font-[var(--font-weight-medium)] text-[var(--color-dark-100)]">Font</div>
          <div className="font-[var(--font-weight-medium)] text-[var(--color-dark-100)]">Details</div>
          <div className="font-[var(--font-weight-medium)] text-[var(--color-dark-100)]">Usage</div>
          <div className="font-[var(--font-weight-medium)] text-[var(--color-dark-100)]">Token</div>
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
          <p className="text-[var(--font-size-lg)] font-[var(--font-weight-medium)] text-[var(--color-dark-100)]">Button</p>
        </TypographyExample>
      </section>

      <section>
        <h2 className="text-[var(--font-size-xxl)] font-[var(--font-weight-regular)] mb-[var(--spacing-x6)] text-[var(--color-dark-100)]">Body</h2>
        <div className="grid grid-cols-4 gap-4 mb-4 border-b border-[var(--color-border)] py-[var(--spacing-x2)]">
          <div className="font-[var(--font-weight-medium)] text-[var(--color-dark-100)]">Font</div>
          <div className="font-[var(--font-weight-medium)] text-[var(--color-dark-100)]">Details</div>
          <div className="font-[var(--font-weight-medium)] text-[var(--color-dark-100)]">Usage</div>
          <div className="font-[var(--font-weight-medium)] text-[var(--color-dark-100)]">Token</div>
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
          <p className="text-[var(--font-size-md)] font-[var(--font-weight-semibold)] text-[var(--color-dark-100)]">Primary-Semi-bold</p>
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
          <p className="text-[var(--font-size-md)] font-[var(--font-weight-regular)] text-[var(--color-dark-100)]">Primary-Regular</p>
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
          <p className="text-[var(--font-size-sm)] font-[var(--font-weight-semibold)] text-[var(--color-dark-100)]">Secondary-Semibold</p>
        </TypographyExample>
      </section>
    </div>
  );
} 