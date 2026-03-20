import React from 'react';
import logoImg from './assets/mdc-labs-logo.svg';

interface MDCLabsLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export const MDCLabsLogo: React.FC<MDCLabsLogoProps> = ({
  width = 158,
  height = 26,
  className
}) => (
  <img
    src={(logoImg as any).src || logoImg}
    alt="MDC Labs Logo"
    width={width}
    height={height}
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export default MDCLabsLogo;
