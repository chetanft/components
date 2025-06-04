import React from 'react';
import { IconName } from '../Icons';
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'normal' | 'danger' | 'success' | 'warning' | 'neutral';
    size?: 'sm' | 'md';
    icon?: IconName;
    children: React.ReactNode;
}
export declare const Badge: React.ForwardRefExoticComponent<BadgeProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Badge.d.ts.map