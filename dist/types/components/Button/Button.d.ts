import React from 'react';
export type ButtonVariant = "primary" | "secondary" | "destructive" | "link";
export type ButtonSize = "sm" | "md" | "lg";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    showIcon?: boolean;
    variant?: ButtonVariant;
    size?: ButtonSize;
}
export declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=Button.d.ts.map