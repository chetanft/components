import React from 'react';
import logoImg from './assets/delhivery-logo.png';
import { resolveImageSrc } from './resolveImageSrc';

interface DelhiveryLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export const DelhiveryLogo: React.FC<DelhiveryLogoProps> = ({
  width = 136,
  height = 22,
  className
}) => (
  <img
    src={resolveImageSrc(logoImg)}
    alt="Delhivery Logo"
    width={width}
    height={height}
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export default DelhiveryLogo;
