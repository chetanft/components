import React from 'react';
import logoImg from './assets/mec-logo.svg';
import { resolveImageSrc } from './resolveImageSrc';

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
    src={resolveImageSrc(logoImg)}
    alt="MEC Logo"
    width={width}
    height={height}
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export default MECLogo;
