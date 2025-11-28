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

  // Check if className contains animation classes that should be applied to the SVG
  const hasAnimation = className.includes('animate-spin') || className.includes('animate-pulse');

  const iconStyle: React.CSSProperties = {
    width: typeof size === 'number' ? `${size}px` : size,
    height: typeof size === 'number' ? `${size}px` : size,
    color: color,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    ...style,
  };

  // Render the icon component
  const iconElement = <IconComponent />;

  // Clone the SVG element to ensure color inheritance works correctly
  // Apply color style directly to SVG so currentColor resolves properly
  const renderedIcon = React.isValidElement(iconElement)
    ? React.cloneElement(iconElement as React.ReactElement<React.SVGProps<SVGSVGElement>>, {
      className: hasAnimation ? className : undefined,
      width: typeof size === 'number' ? size : size,
      height: typeof size === 'number' ? size : size,
      style: {
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size,
        color: 'inherit', // Inherit color from parent span which has the color style
      }
    })
    : iconElement;

  return (
    <span
      className={`icon inline-flex items-center justify-center ${hasAnimation ? '' : className}`}
      style={iconStyle}
      {...props}
    >
      {renderedIcon}
    </span>
  );
};

Icon.displayName = 'Icon';

export default Icon; 