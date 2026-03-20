import React from 'react';
import logoImg from './assets/safexpress-logo.png';

interface SafexpressLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export const SafexpressLogo: React.FC<SafexpressLogoProps> = ({
  width = 114,
  height = 22,
  className
}) => (
  <img
    src={(logoImg as any).src || logoImg}
    alt="Safexpress Logo"
    width={width}
    height={height}
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export default SafexpressLogo;
