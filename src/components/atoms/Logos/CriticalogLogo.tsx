import React from 'react';
import logoImg from './assets/criticalog-logo.png';

interface CriticalogLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export const CriticalogLogo: React.FC<CriticalogLogoProps> = ({
  width = 96,
  height = 22,
  className
}) => (
  <img
    src={(logoImg as any).src || logoImg}
    alt="Criticalog Logo"
    width={width}
    height={height}
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export default CriticalogLogo;
