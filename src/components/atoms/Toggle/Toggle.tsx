import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon, IconName } from '../../atoms/Icons';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { getGlassClasses, useResolvedGlass, type GlassVariant } from '../../../lib/glass';

export type ToggleSize = 'sm' | 'md' | 'lg';
export type ToggleVariant = 'default' | 'outline';

export interface ToggleProps extends ComposableProps<'button'> {
    pressed?: boolean;
    onPressedChange?: (pressed: boolean) => void;
    defaultPressed?: boolean;
    size?: ToggleSize;
    variant?: ToggleVariant;
    disabled?: boolean;
    icon?: IconName;
    /**
     * Enable glassmorphism effect on toggle container background
     * - `true`: Standard glass effect
     * - `'subtle'`: Subtle glass effect
     * - `'prominent'`: Prominent glass effect
     */
    glass?: GlassVariant;
    children?: React.ReactNode;
}

/**
 * Toggle Component
 *
 * A toggle button component for toggling between pressed and unpressed states.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Toggle pressed={isPressed} onPressedChange={setIsPressed}>
 *   Toggle
 * </Toggle>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<button>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Supports controlled and uncontrolled modes.
 */
export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(({
    pressed,
    onPressedChange,
    defaultPressed = false,
    size = 'md',
    variant = 'default',
    disabled = false,
    icon,
    glass,
    children,
    className,
    onClick,
    asChild,
    ...props
}, ref) => {
    const resolvedGlass = useResolvedGlass(glass);
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
        sm: 'h-8 px-[var(--spacing-x3)] min-w-[var(--spacing-x8)] text-sm-rem',
        md: 'h-10 px-[var(--spacing-x4)] min-w-[var(--spacing-x10)] text-sm-rem',
        lg: 'h-12 px-[var(--spacing-x5)] min-w-[var(--spacing-x12)] text-md-rem',
    };

    const baseStyles = "inline-flex items-center justify-center rounded-[var(--radius-md)] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] disabled:pointer-events-none disabled:opacity-50";

    const variantStyles = {
        default: cn(
            resolvedGlass
                ? cn(getGlassClasses(resolvedGlass, 'bg-transparent', ''), "text-[var(--secondary)]")
                : cn("bg-transparent hover:bg-[var(--bg-secondary)] text-[var(--secondary)]"),
            !resolvedGlass && isPressed && "bg-[var(--bg-secondary)] text-[var(--primary)]",
            resolvedGlass && isPressed && "text-[var(--primary)]"
        ),
        outline: cn(
            resolvedGlass
                ? cn(getGlassClasses(resolvedGlass, 'bg-transparent', 'border border-[var(--border-primary)]'), "text-[var(--secondary)]")
                : cn("border border-[var(--border-primary)] bg-transparent hover:bg-[var(--bg-secondary)] text-[var(--secondary)]"),
            !resolvedGlass && isPressed && "bg-[var(--bg-secondary)] text-[var(--primary)] border-[var(--primary)]",
            resolvedGlass && isPressed && "text-[var(--primary)] border-[var(--primary)]"
        ),
    };

    const Comp = asChild ? Slot : 'button';
    
    const buttonProps = asChild ? props : {
        type: 'button' as const,
        disabled,
        onClick: handleClick,
        ...props
    };
    
    return (
        <Comp
            ref={ref}
            aria-pressed={isPressed}
            className={cn(
                baseStyles,
                sizeStyles[size],
                variantStyles[variant],
                className
            )}
            {...buttonProps}
        >
            {icon && <Icon name={icon} size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} className={cn(children && "mr-[var(--spacing-x2)]")} />}
            {children}
        </Comp>
    );
});

Toggle.displayName = 'Toggle';
