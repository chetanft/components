import React from 'react';
import shadowfaxLogoImg from './assets/shadowfax-logo.png';

interface ShadowfaxLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export const ShadowfaxLogo: React.FC<ShadowfaxLogoProps> = ({ 
  width = 140, 
  height = 28, 
  className 
}) => (
  <img
    src={(shadowfaxLogoImg as any).src || shadowfaxLogoImg}
    alt="Shadowfax Logo"
    width={width}
    height={height}
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export default ShadowfaxLogo;
