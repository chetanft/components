import React from 'react';
import { IconName } from '../Icons';
export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'text' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type IconPosition = 'leading' | 'trailing' | 'only';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: IconName;
    iconPosition?: IconPosition;
    children?: React.ReactNode;
}
export declare const Button: React.FC<ButtonProps>;
//# sourceMappingURL=Button.d.ts.map