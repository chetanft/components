import React from 'react';
import { FTLogo } from './FTLogo';
import { TataMotorsLogo } from './TataMotorsLogo';
import { Slot, type ComposableProps } from '../../../lib/slot';

export type LogoName = 'ft' | 'tata-motors';

interface LogoProps extends ComposableProps<'div'> {
  name: LogoName;
  width?: number;
  height?: number;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  name, 
  width, 
  height, 
  className,
  asChild,
  ...props
}) => {
  const Comp = asChild ? Slot : 'div';
  
  switch (name) {
    case 'ft':
      return asChild ? (
        <Comp className={className} {...props}>
          <FTLogo width={width} height={height} />
        </Comp>
      ) : (
        <FTLogo width={width} height={height} className={className} />
      );
    case 'tata-motors':
      return asChild ? (
        <Comp className={className} {...props}>
          <TataMotorsLogo width={width} height={height} />
        </Comp>
      ) : (
        <TataMotorsLogo width={width} height={height} className={className} />
      );
    default:
      console.warn(`Logo "${name}" not found`);
      return null;
  }
};

export default Logo; 