import React from 'react';
import logoImg from './assets/gati-logo.png';
import { resolveImageSrc } from './resolveImageSrc';

interface GatiLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export const GatiLogo: React.FC<GatiLogoProps> = ({
  width = 63,
  height = 22,
  className
}) => (
  <img
    src={resolveImageSrc(logoImg)}
    alt="Gati Logo"
    width={width}
    height={height}
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export default GatiLogo;
