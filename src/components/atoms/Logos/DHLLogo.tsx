import React from 'react';
import logoImg from './assets/dhl-logo.svg';

interface DHLLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export const DHLLogo: React.FC<DHLLogoProps> = ({
  width = 163,
  height = 22,
  className
}) => (
  <img
    src={(logoImg as any).src || logoImg}
    alt="DHL Logo"
    width={width}
    height={height}
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export default DHLLogo;
