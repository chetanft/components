import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon, IconName } from '../../atoms/Icons';

export type ToggleSize = 'sm' | 'md' | 'lg';
export type ToggleVariant = 'default' | 'outline';

export interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    pressed?: boolean;
    onPressedChange?: (pressed: boolean) => void;
    defaultPressed?: boolean;
    size?: ToggleSize;
    variant?: ToggleVariant;
    disabled?: boolean;
    icon?: IconName;
    children?: React.ReactNode;
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(({
    pressed,
    onPressedChange,
    defaultPressed = false,
    size = 'md',
    variant = 'default',
    disabled = false,
    icon,
    children,
    className,
    onClick,
    ...props
}, ref) => {
    const [isPressed, setIsPressed] = React.useState(pressed ?? defaultPressed);

    React.useEffect(() => {
        if (pressed !== undefined) {
            setIsPressed(pressed);
        }
    }, [pressed]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) return;

        const newPressed = !isPressed;
        if (pressed === undefined) {
            setIsPressed(newPressed);
        }
        onPressedChange?.(newPressed);
        onClick?.(e);
    };

    const sizeStyles = {
        sm: 'h-8 px-2 min-w-[32px] text-sm',
        md: 'h-10 px-3 min-w-[40px] text-base',
        lg: 'h-12 px-4 min-w-[48px] text-lg',
    };

    const baseStyles = "inline-flex items-center justify-center rounded-[var(--radius-md)] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] disabled:pointer-events-none disabled:opacity-50";

    const variantStyles = {
        default: cn(
            "bg-transparent hover:bg-[var(--color-bg-secondary)] text-[var(--color-secondary)]",
            isPressed && "bg-[var(--color-bg-secondary)] text-[var(--color-primary)]"
        ),
        outline: cn(
            "border border-[var(--color-border-primary)] bg-transparent hover:bg-[var(--color-bg-secondary)] text-[var(--color-secondary)]",
            isPressed && "bg-[var(--color-bg-secondary)] text-[var(--color-primary)] border-[var(--color-primary)]"
        ),
    };

    return (
        <button
            ref={ref}
            type="button"
            aria-pressed={isPressed}
            disabled={disabled}
            onClick={handleClick}
            className={cn(
                baseStyles,
                sizeStyles[size],
                variantStyles[variant],
                className
            )}
            {...props}
        >
            {icon && <Icon name={icon} size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} className={cn(children && "mr-2")} />}
            {children}
        </button>
    );
});

Toggle.displayName = 'Toggle';
