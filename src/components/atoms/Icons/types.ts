import { SVGProps } from 'react';
import { iconMap } from './iconMap';

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export type IconName = keyof typeof iconMap; 