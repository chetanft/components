import React from 'react';
import { iconMap } from './iconMap';
import { Slot, type ComposableProps } from '../../../lib/slot';

export type IconName = keyof typeof iconMap;

export interface IconProps extends Omit<ComposableProps<'span'>, 'children'> {
  name: IconName;
  size?: number | string | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

const sizeMap: Record<string, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

export const Icon: React.FC<IconProps> = ({
  name,
  size = 16,
  color = 'currentColor',
  className = '',
  style = {},
  asChild,
  ...props
}) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`Icon "${name}" not found`);
    }
    return null;
  }

  const resolvedSize = typeof size === 'string' && size in sizeMap ? sizeMap[size] : size;

  const iconStyle: React.CSSProperties = {
    width: typeof resolvedSize === 'number' ? `${resolvedSize}px` : resolvedSize,
    height: typeof resolvedSize === 'number' ? `${resolvedSize}px` : resolvedSize,
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
      width: typeof resolvedSize === 'number' ? resolvedSize : resolvedSize,
      height: typeof resolvedSize === 'number' ? resolvedSize : resolvedSize,
      style: {
        width: typeof resolvedSize === 'number' ? `${resolvedSize}px` : resolvedSize,
        height: typeof resolvedSize === 'number' ? `${resolvedSize}px` : resolvedSize,
        color: 'inherit', // Inherit color from parent span which has the color style
      }
    })
    : iconElement;

  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      className={`icon inline-flex items-center justify-center ${className}`}
      style={iconStyle}
      {...props}
    >
      {renderedIcon}
    </Comp>
  );
};

Icon.displayName = 'Icon';

export default Icon; 