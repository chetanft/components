import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../Icons/Icon';
import { Typography, TypographyVariant } from '../Typography';

export interface TextProps {
  /**
   * Whether to show sub text
   */
  subText?: "False" | "True";
  
  /**
   * Whether to show leading icon
   */
  leadingIcon?: "True" | "False";
  
  /**
   * Whether to show trailing icon
   */
  trailingIcon?: "True" | "False";
  
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
  subText = "False",
  leadingIcon = "False", 
  trailingIcon = "False",
  size = "sm",
  className = '' 
}) => {
  // Map size to Typography variant
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
  const textElement = <Typography variant={variant} color="primary">Text</Typography>;

  if (subText === "False" && leadingIcon === "False" && trailingIcon === "False" && size === "md") {
    return (
      <div 
        className={cn(
          "content-stretch flex flex-col gap-[4px] items-start justify-center relative size-full", 
          className
        )}
        data-name="Sub text=False, Leading Icon=False, Trailing Icon=False, Size=md"
      >
        <div className="relative shrink-0 whitespace-nowrap">
          {textElement}
        </div>
      </div>
    );
  }

  if (subText === "True" && leadingIcon === "False" && trailingIcon === "True" && size === "md") {
    return (
      <div 
        className={cn(
          "content-stretch flex flex-col gap-[4px] items-start justify-center relative size-full", 
          className
        )}
        data-name="Sub text=True, Leading Icon=False, Trailing Icon=True, Size=md"
      >
        <div className="content-stretch flex gap-[8px] h-[22px] items-center relative shrink-0">
          <div className="relative shrink-0 whitespace-nowrap">
            <Typography variant={variant} color="primary">Text</Typography>
          </div>
          <div className="relative shrink-0 size-[16px]">
            <Icon name="check-fill" size={16} className="text-[#5f697b]" />
          </div>
        </div>
        <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0">
          <Typography variant="body-secondary-regular" color="secondary" className="relative shrink-0 w-[56px] whitespace-pre-wrap">
            Sub text
          </Typography>
        </div>
      </div>
    );
  }

  if (subText === "True" && leadingIcon === "True" && trailingIcon === "False" && size === "md") {
    return (
      <div 
        className={cn(
          "content-stretch flex flex-col gap-[4px] items-start justify-center relative size-full", 
          className
        )}
        data-name="Sub text=True, Leading Icon=True, Trailing Icon=False, Size=md"
      >
        <div className="content-stretch flex gap-[8px] h-[22px] items-center relative shrink-0">
          <div className="relative shrink-0 size-[16px]">
            <Icon name="check-fill" size={16} className="text-[#5f697b]" />
          </div>
          <div className="relative shrink-0 whitespace-nowrap">
            <Typography variant={variant} color="primary">Text</Typography>
          </div>
        </div>
        <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0">
          <Typography variant="body-secondary-regular" color="secondary" className="relative shrink-0 w-[56px] whitespace-pre-wrap">
            Sub text
          </Typography>
        </div>
      </div>
    );
  }

  if (subText === "True" && leadingIcon === "False" && trailingIcon === "False" && size === "md") {
    return (
      <div 
        className={cn(
          "content-stretch flex flex-col gap-[4px] items-start justify-center relative size-full", 
          className
        )}
        data-name="Sub text=True, Leading Icon=False, Trailing Icon=False, Size=md"
      >
        <div className="relative shrink-0 whitespace-nowrap">
          {textElement}
        </div>
        <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0">
          <Typography variant="body-secondary-regular" color="secondary" className="relative shrink-0 w-[56px] whitespace-pre-wrap">
            Sub text
          </Typography>
        </div>
      </div>
    );
  }

  if (subText === "False" && leadingIcon === "False" && trailingIcon === "True" && size === "md") {
    return (
      <div 
        className={cn(
          "content-stretch flex flex-col gap-[4px] items-start justify-center relative size-full", 
          className
        )}
        data-name="Sub text=False, Leading Icon=False, Trailing Icon=True, Size=md"
      >
        <div className="content-stretch flex gap-[8px] h-[22px] items-center relative shrink-0">
          <div className="relative shrink-0 whitespace-nowrap">
            <Typography variant={variant} color="primary">Text</Typography>
          </div>
          <div className="relative shrink-0 size-[16px]">
            <Icon name="check-fill" size={16} className="text-[#5f697b]" />
          </div>
        </div>
      </div>
    );
  }

  if (subText === "False" && leadingIcon === "True" && trailingIcon === "False" && size === "md") {
    return (
      <div 
        className={cn(
          "content-stretch flex flex-col gap-[4px] items-start justify-center relative size-full", 
          className
        )}
        data-name="Sub text=False, Leading Icon=True, Trailing Icon=False, Size=md"
      >
        <div className="content-stretch flex gap-[8px] h-[22px] items-center relative shrink-0">
          <div className="relative shrink-0 size-[16px]">
            <Icon name="check-fill" size={16} className="text-[#5f697b]" />
          </div>
          <div className="relative shrink-0 whitespace-nowrap">
            <Typography variant={variant} color="primary">Text</Typography>
          </div>
        </div>
      </div>
    );
  }

  // Default case - small size without subtext, icons
  return (
    <div 
      className={cn(
        "content-stretch flex flex-col gap-[4px] items-start justify-center relative size-full", 
        className
      )}
      data-name="Sub text=False, Leading Icon=False, Trailing Icon=False, Size=sm"
    >
      <div className="relative shrink-0 whitespace-nowrap">
        {textElement}
      </div>
    </div>
  );
};

Text.displayName = 'Text';