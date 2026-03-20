import React from 'react';
import logoImg from './assets/mec-logo.svg';

interface MECLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export const MECLogo: React.FC<MECLogoProps> = ({
  width = 69,
  height = 22,
  className
}) => (
  <img
    src={(logoImg as any).src || logoImg}
    alt="MEC Logo"
    width={width}
    height={height}
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export default MECLogo;
