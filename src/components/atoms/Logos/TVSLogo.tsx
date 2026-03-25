import React from 'react';
import logoImg from './assets/tvs-logo.png';
import { resolveImageSrc } from './resolveImageSrc';

interface TVSLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export const TVSLogo: React.FC<TVSLogoProps> = ({
  width = 30,
  height = 22,
  className
}) => (
  <img
    src={resolveImageSrc(logoImg)}
    alt="TVS Logo"
    width={width}
    height={height}
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export default TVSLogo;
