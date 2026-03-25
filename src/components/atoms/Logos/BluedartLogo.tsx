import React from 'react';
import logoImg from './assets/bluedart-logo.png';
import { resolveImageSrc } from './resolveImageSrc';

interface BluedartLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export const BluedartLogo: React.FC<BluedartLogoProps> = ({
  width = 114,
  height = 22,
  className
}) => (
  <img
    src={resolveImageSrc(logoImg)}
    alt="Bluedart Logo"
    width={width}
    height={height}
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export default BluedartLogo;
