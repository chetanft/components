"use client";

import React, { useState } from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';

export type FloatButtonType = 'default' | 'primary';
export type FloatButtonShape = 'circle' | 'square';

export interface FloatButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  description?: React.ReactNode;
  tooltip?: React.ReactNode;
  type?: FloatButtonType;
  shape?: FloatButtonShape;
  href?: string;
  target?: string;
  badge?: { count?: number; dot?: boolean; color?: string }; // Simplified badge
  onClick?: React.MouseEventHandler<HTMLElement>;
  className?: string;
}

export interface FloatButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: FloatButtonShape;
  trigger?: 'click' | 'hover';
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  icon?: React.ReactNode;
  description?: React.ReactNode;
  tooltip?: React.ReactNode;
  type?: FloatButtonType;
  children?: React.ReactNode;
}

export const FloatButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, FloatButtonProps>(({
  icon,
  description,
  tooltip: _tooltip,
  type = 'default',
  shape = 'circle',
  href,
  target,
  badge,
  onClick,
  className,
  children, // If used as a container
  ...props
}, ref) => {
  const isLink = !!href;
  const Component = isLink ? 'a' : 'button';

  // Use FT Design System Button tokens to match Button component styling exactly
  const variantStyles = type === 'primary'
    ? cn(
      "bg-[var(--button-primary-bg)] text-[var(--button-primary-text)] border border-[var(--button-primary-border)]",
      "hover:bg-[var(--button-primary-hover-bg)] hover:border-[var(--button-primary-hover-bg)] hover:shadow-button",
      "active:transform active:translate-y-px",
      "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--primary)]"
    )
    : cn(
      "bg-[var(--button-secondary-bg)] text-[var(--button-secondary-text)] border border-[var(--button-secondary-border)]",
      "hover:bg-[var(--button-secondary-hover-bg)] hover:border-[var(--button-secondary-hover-border)] hover:shadow-button",
      "active:transform active:translate-y-px",
      "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--primary)]"
    );

  const content = (
    <Component
      // @ts-expect-error - forwarding refs to both anchor and button variants
      ref={ref}
      href={href}
      target={target}
      className={cn(
        "flex flex-col items-center justify-center relative cursor-pointer",
        "font-medium transition-all duration-200",
        "focus-visible:outline-none",
        shape === 'circle' ? "rounded-full" : "rounded-md",
        variantStyles,
        "w-10 h-10", // Default size
        className
      )}
      onClick={onClick as any}
      {...props}
    >
      <div className="flex flex-col items-center justify-center">
        {icon || children}
        {description && <span className="text-[10px] leading-tight mt-0.5">{description}</span>}
      </div>
      {badge && (
        <span className={cn(
          "absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4",
          "bg-[var(--danger)] text-white text-xs font-bold px-1.5 rounded-full min-w-[1.25rem] h-5 flex items-center justify-center border-2 border-white",
          badge.dot ? "w-2.5 h-2.5 p-0 min-w-0" : ""
        )}>
          {!badge.dot && badge.count}
        </span>
      )}
    </Component>
  );

  // if (tooltip) {
  //     // TODO: Fix Tooltip usage. Current Tooltip component is a static box, not a trigger.
  //     // return <Tooltip title={tooltip as string}>{content}</Tooltip>;
  // }

  return content;
});

FloatButton.displayName = 'FloatButton';

export const FloatButtonGroup = React.forwardRef<HTMLDivElement, FloatButtonGroupProps>(({
  shape = 'circle',
  trigger = 'hover',
  open: controlledOpen,
  onOpenChange,
  icon = <Icon name="add" />, // Default trigger icon needs to be handled
  description: _groupDescription,
  tooltip: _groupTooltip,
  type = 'default',
  children,
  className,
  ...props
}, ref) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const toggleOpen = () => {
    const next = !isOpen;
    setInternalOpen(next);
    onOpenChange?.(next);
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      setInternalOpen(true);
      onOpenChange?.(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      setInternalOpen(false);
      onOpenChange?.(false);
    }
  };

  return (
    <div
      ref={ref}
      className={cn("fixed right-6 bottom-6 flex flex-col items-center gap-3 z-50", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {isOpen && (
        <div className="flex flex-col gap-3 mb-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
          {children}
        </div>
      )}
      <FloatButton
        shape={shape}
        type={type}
        icon={isOpen && trigger === 'click' ? <Icon name="cross" /> : icon}
        onClick={trigger === 'click' ? toggleOpen : undefined}
      />
    </div>
  );
});
FloatButtonGroup.displayName = 'FloatButtonGroup';
