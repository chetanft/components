import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { Icon } from '../Icons';

export type ButtonVariant = "primary" | "secondary" | "destructive" | "link";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  showIcon?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", showIcon = false, disabled = false, children, style, ...props }, ref) => {
    
    // Check if this should be a circular button
    const isCircular = className?.includes('rounded-full');
    
    // Base button styles that apply to all variants
    const baseStyles = [
      "inline-flex",
      "items-center", 
      "justify-center",
      "gap-[var(--spacing-x2)]",
      "rounded-[var(--button-border-radius)]",
      "border",
      "border-solid",
      "font-[var(--font-family-primary)]",
      "font-[var(--button-font-weight)]",
      "transition-all",
      "duration-200",
      "cursor-pointer",
      "focus-visible:outline-none",
      "focus-visible:ring-2", 
      "focus-visible:ring-[var(--button-focus-ring)]",
      "focus-visible:ring-offset-2",
      "disabled:pointer-events-none",
      "disabled:opacity-[var(--button-disabled-opacity)]"
    ];

    // Variant-specific styles without text colors (we'll use inline styles for text)
    const variantStyles = {
      primary: [
        "bg-[var(--button-primary-bg)]",
        "border-[var(--button-primary-border)]",
        "hover:bg-[var(--button-primary-hover-bg)]"
      ],
      secondary: [
        "bg-[var(--button-secondary-bg)]", 
        "border-[var(--button-secondary-border)]",
        "hover:bg-[var(--button-secondary-hover-bg)]",
        "hover:border-[var(--button-secondary-hover-border)]"
      ],
      destructive: [
        "bg-[var(--button-destructive-bg)]",
        "border-[var(--button-destructive-border)]", 
        "hover:bg-[var(--button-destructive-hover-bg)]"
      ],
      link: [
        "bg-[var(--button-link-bg)]",
        "border-[var(--button-link-border)]",
        "hover:text-[var(--button-link-hover-text)]",
        "underline",
        "shadow-none"
      ]
    };

    // Size-specific styles with proper font sizes matching Figma
    // For circular buttons, width equals height and no horizontal padding
    const sizeStyles = {
      sm: [
        "h-[var(--button-height-sm)]",
        "text-[14px]", // Fixed font size for small buttons
        variant === "link" ? "p-0" : 
          isCircular ? "w-[var(--button-height-sm)] p-0" : "px-[16px] py-[8px]"
      ],
      md: [
        "h-[var(--button-height-md)]", 
        "text-[16px]", // Fixed font size for medium buttons
        variant === "link" ? "p-0" : 
          isCircular ? "w-[var(--button-height-md)] p-0" : "px-[24px] py-[12px]"
      ],
      lg: [
        "h-[var(--button-height-lg)]",
        "text-[20px]", // Fixed font size for large buttons
        variant === "link" ? "p-0" : 
          isCircular ? "w-[var(--button-height-lg)] p-0" : "px-[32px] py-[16px]"
      ]
    };

    // Text colors using inline styles to override any inheritance
    const getTextColor = () => {
      switch (variant) {
        case "primary":
        case "destructive":
          return "#ffffff";  // White text for filled buttons
        case "secondary":
        case "link":
          return "#434f64";  // Dark gray text for outlined/text buttons
        default:
          return "#ffffff";
      }
    };

    // Font weight based on variant and size
    const getFontWeight = () => {
      return "500"; // Medium font weight for all buttons (common in modern designs)
    };

    // Combine all styles
    const buttonClasses = cn(
      ...baseStyles,
      ...variantStyles[variant],
      ...sizeStyles[size],
      className
    );

    // Create inline style object that forces text color and font weight
    const buttonStyle = {
      color: getTextColor(),
      fontWeight: getFontWeight(),
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
      ...style
    };

    return (
      <button
        className={buttonClasses}
        style={buttonStyle}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        {showIcon && variant !== "link" && (
          <Icon name="add" size={16} />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button"; 