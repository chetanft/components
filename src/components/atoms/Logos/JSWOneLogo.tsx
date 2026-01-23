import React from 'react';
import jswLogoImg from './assets/jsw-logo.png';

interface JSWOneLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export const JSWOneLogo: React.FC<JSWOneLogoProps> = ({ 
  width = 78, 
  height = 26, 
  className 
}) => (
  <img
    src={(jswLogoImg as any).src || jswLogoImg}
    alt="JSW ONE Logo"
    width={width}
    height={height}
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export default JSWOneLogo;
