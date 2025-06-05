import React from 'react';
import { IconName } from '../Icons';
export type ButtonVariant = "primary" | "secondary" | "destructive" | "text" | "link";
export type ButtonSize = "sm" | "md" | "lg";
export type IconPosition = "leading" | "trailing" | "only";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Button visual variant */
    variant?: ButtonVariant;
    /** Button size */
    size?: ButtonSize;
    /** Icon name to display */
    icon?: IconName;
    /** Position of the icon relative to text */
    iconPosition?: IconPosition;
    /** Legacy prop for backwards compatibility */
    showIcon?: boolean;
    /** Whether this button is circular (for icon-only buttons) */
    isCircular?: boolean;
}
export declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=Button.d.ts.map