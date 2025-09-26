import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../Icons/Icon';

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
  const textElement = <p className="leading-[1.4]">Text</p>;
  
  // Get font classes based on size
  const getFontClasses = () => {
    switch (size) {
      case "sm":
        return "font-normal text-[14px] text-[#434f64]";
      case "md":
        return "font-normal text-[16px] text-[#434f64]";
      case "lg":
        return "font-semibold text-[16px] text-[#434f64]";
      case "xl":
        return "font-semibold text-[20px] text-[#434f64]";
      case "xx":
        return "font-semibold text-[24px] text-[#434f64]";
      default:
        return "font-normal text-[14px] text-[#434f64]";
    }
  };

  if (subText === "False" && leadingIcon === "False" && trailingIcon === "False" && size === "md") {
    return (
      <div 
        className={cn(
          "content-stretch flex flex-col gap-[4px] items-start justify-center relative size-full", 
          className
        )}
        data-name="Sub text=False, Leading Icon=False, Trailing Icon=False, Size=md"
      >
        <div className={cn("leading-[0] relative shrink-0 whitespace-nowrap", getFontClasses())}>
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
          <div className={cn("leading-[0] relative shrink-0 whitespace-nowrap", getFontClasses())}>
            <p className="leading-[1.4]">Text</p>
          </div>
          <div className="relative shrink-0 size-[16px]">
            <Icon name="check-fill" size={16} className="text-[#5f697b]" />
          </div>
        </div>
        <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0">
          <div className="font-normal leading-[0] relative shrink-0 text-[14px] text-[#5f697b] w-[56px]">
            <p className="leading-[1.4] whitespace-pre-wrap">Sub text</p>
          </div>
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
          <div className={cn("leading-[0] relative shrink-0 whitespace-nowrap", getFontClasses())}>
            <p className="leading-[1.4]">Text</p>
          </div>
        </div>
        <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0">
          <div className="font-normal leading-[0] relative shrink-0 text-[14px] text-[#5f697b] w-[56px]">
            <p className="leading-[1.4] whitespace-pre-wrap">Sub text</p>
          </div>
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
        <div className={cn("leading-[0] relative shrink-0 whitespace-nowrap", getFontClasses())}>
          {textElement}
        </div>
        <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0">
          <div className="font-normal leading-[0] relative shrink-0 text-[14px] text-[#5f697b] w-[56px]">
            <p className="leading-[1.4] whitespace-pre-wrap">Sub text</p>
          </div>
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
          <div className={cn("leading-[0] relative shrink-0 whitespace-nowrap", getFontClasses())}>
            <p className="leading-[1.4]">Text</p>
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
          <div className={cn("leading-[0] relative shrink-0 whitespace-nowrap", getFontClasses())}>
            <p className="leading-[1.4]">Text</p>
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
      <div className={cn("leading-[0] relative shrink-0 whitespace-nowrap", getFontClasses())}>
        {textElement}
      </div>
    </div>
  );
};

Text.displayName = 'Text';