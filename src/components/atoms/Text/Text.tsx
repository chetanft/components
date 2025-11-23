import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../Icons/Icon';
import { Typography, TypographyVariant } from '../Typography';

export interface TextProps {
  /**
   * Whether to show sub text
   */
  subText?: boolean;
  
  /**
   * Whether to show leading icon
   */
  leadingIcon?: boolean;
  
  /**
   * Whether to show trailing icon
   */
  trailingIcon?: boolean;
  
  /**
   * Text size variant
   */
  size?: "sm" | "md" | "lg" | "xl" | "xx";
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

export const Text: React.FC<TextProps> = ({ 
  subText = false,
  leadingIcon = false, 
  trailingIcon = false,
  size = "sm",
  className = '' 
}) => {
  // Map size to Typography variant for main text
  const getVariant = (): TypographyVariant => {
    switch (size) {
      case "sm":
        return "body-secondary-regular"; // 14px, Regular
      case "md":
        return "body-primary-regular";   // 16px, Regular
      case "lg":
        return "body-primary-semibold";  // 16px, Semibold
      case "xl":
        return "display-primary";        // 20px, Semibold
      case "xx":
        return "title-secondary";        // 24px, Semibold
      default:
        return "body-secondary-regular";
    }
  };
  
  const variant = getVariant();
  const hasSubText = subText === true;
  const hasLeadingIcon = leadingIcon === true;
  const hasTrailingIcon = trailingIcon === true;

  // Main text element - using Typography component but matching Figma structure
  const mainText = (
    <Typography variant={variant} color="primary" className="leading-[1.4] relative shrink-0">
      Text
    </Typography>
  );

  // Icon element matching Figma structure
  const iconElement = (
    <div className="relative shrink-0 size-[16px]" data-name="Check- fill">
      <Icon name="check-fill" size={16} color="#434f64" />
    </div>
  );

  // Determine subtext width based on size and icon configuration
  const getSubTextWidth = (): string => {
    if (hasSubText && hasTrailingIcon && !hasLeadingIcon) {
      if (size === "xl") return "w-[68px]";
      if (size === "xx") return "w-[75px]";
      return "w-[56px]";
    }
    return "w-[56px]";
  };

  // Subtext element
  const subTextElement = hasSubText ? (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0" data-name="Sub text">
      <Typography 
        variant="body-secondary-regular" 
        color="secondary" 
        className={cn("relative shrink-0 whitespace-pre-wrap", getSubTextWidth())}
      >
        Sub text
      </Typography>
    </div>
  ) : null;

  // Build the main content row
  const buildMainRow = () => {
    if (!hasLeadingIcon && !hasTrailingIcon) {
      return mainText;
    }

    // Row with icons - matching Figma structure
    const rowContent = [];
    
    if (hasLeadingIcon) {
      rowContent.push(iconElement);
    }
    
    rowContent.push(
      <div key="text" className="relative shrink-0 whitespace-nowrap">
        {mainText}
      </div>
    );
    
    if (hasTrailingIcon) {
      rowContent.push(iconElement);
    }

    return (
      <div className="content-stretch flex gap-[var(--x2,8px)] h-[22px] items-center relative shrink-0" data-name="Text">
        {rowContent}
      </div>
    );
  };

  // Generate data-name attribute matching Figma format
  const dataName = `Sub text=${hasSubText ? "True" : "False"}, Leading Icon=${hasLeadingIcon ? "True" : "False"}, Trailing Icon=${hasTrailingIcon ? "True" : "False"}, Size=${size}`;

  // Container class matching Figma structure
  const containerClass = cn(
    "content-stretch flex flex-col gap-[var(--x1,4px)] items-start justify-center relative size-full",
    className
  );

  return (
    <div 
      className={containerClass}
      data-name={dataName}
    >
      {buildMainRow()}
      {subTextElement}
    </div>
  );
};

Text.displayName = 'Text';