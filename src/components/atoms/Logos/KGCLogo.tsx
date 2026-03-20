import React from 'react';
import logoImg from './assets/kgc-logo.png';

interface KGCLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export const KGCLogo: React.FC<KGCLogoProps> = ({
  width = 89,
  height = 22,
  className
}) => (
  <img
    src={(logoImg as any).src || logoImg}
    alt="KGC Logo"
    width={width}
    height={height}
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export default KGCLogo;
