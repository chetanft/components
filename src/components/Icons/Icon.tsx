import React from 'react';
import { iconMap } from './iconMap';

export type IconName = keyof typeof iconMap;

export interface IconProps {
  name: IconName;
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 16,
  color = 'currentColor',
  className = '',
  style = {},
  ...props
}) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  const iconStyle: React.CSSProperties = {
    width: typeof size === 'number' ? `${size}px` : size,
    height: typeof size === 'number' ? `${size}px` : size,
    color: color,
    display: 'inline-block',
    verticalAlign: 'middle',
    ...style,
  };

  return (
    <span className={`icon ${className}`} style={iconStyle} {...props}>
      <IconComponent />
    </span>
  );
};

Icon.displayName = 'Icon';

export default Icon; 