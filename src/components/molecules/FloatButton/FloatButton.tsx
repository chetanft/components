"use client";

import React, { useState } from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { Tooltip } from '../../molecules/Tooltip'; // Using Tooltip for description/tooltip

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
  tooltip,
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
  
  const content = (
    <Component
      // @ts-ignore
      ref={ref}
      href={href}
      target={target}
      className={cn(
        "flex flex-col items-center justify-center relative cursor-pointer shadow-md transition-all duration-200 border-0",
        "hover:shadow-lg focus:outline-none",
        shape === 'circle' ? "rounded-full" : "rounded-md",
        type === 'primary' ? "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]" : "bg-white text-[var(--text-primary)] hover:bg-[var(--background-neutral)]",
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

  if (tooltip) {
      return <Tooltip title={tooltip as string}>{content}</Tooltip>;
  }

  return content;
});

FloatButton.displayName = 'FloatButton';

export const FloatButtonGroup = React.forwardRef<HTMLDivElement, FloatButtonGroupProps>(({
    shape = 'circle',
    trigger = 'hover',
    open: controlledOpen,
    onOpenChange,
    icon = <Icon name="plus" />, // Default trigger icon needs to be handled
    description,
    tooltip,
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
                icon={isOpen && trigger === 'click' ? <Icon name="x" /> : icon} 
                onClick={trigger === 'click' ? toggleOpen : undefined}
                tooltip={tooltip}
             />
        </div>
    );
});
FloatButtonGroup.displayName = 'FloatButtonGroup';

