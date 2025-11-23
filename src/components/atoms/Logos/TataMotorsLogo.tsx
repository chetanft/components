import React from 'react';
import tataMotorstLogoImg from './assets/tata-motors-logo.png';

interface TataMotorsLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export const TataMotorsLogo: React.FC<TataMotorsLogoProps> = ({
  width = 155,
  height = 26,
  className
}) => (
  <img
    src={(tataMotorstLogoImg as any).src || tataMotorstLogoImg}
    alt="Tata Motors Logo"
    width={width}
    height={height}
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export default TataMotorsLogo; 