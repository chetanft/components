import React from 'react';
import { FTLogo } from './FTLogo';
import { TataMotorsLogo } from './TataMotorsLogo';

export type LogoName = 'ft' | 'tata-motors';

interface LogoProps {
  name: LogoName;
  width?: number;
  height?: number;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  name, 
  width, 
  height, 
  className 
}) => {
  switch (name) {
    case 'ft':
      return <FTLogo width={width} height={height} className={className} />;
    case 'tata-motors':
      return <TataMotorsLogo width={width} height={height} className={className} />;
    default:
      console.warn(`Logo "${name}" not found`);
      return null;
  }
};

export default Logo; 