import React from 'react';
import logoImg from './assets/avikam-logo.png';
import { resolveImageSrc } from './resolveImageSrc';

interface AvikamLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export const AvikamLogo: React.FC<AvikamLogoProps> = ({
  width = 102,
  height = 22,
  className
}) => (
  <img
    src={resolveImageSrc(logoImg)}
    alt="Avikam Logo"
    width={width}
    height={height}
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export default AvikamLogo;
