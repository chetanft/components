import React from 'react';
import logoImg from './assets/apollo-tyres-logo.png';
import { resolveImageSrc } from './resolveImageSrc';

interface ApolloTyresLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export const ApolloTyresLogo: React.FC<ApolloTyresLogoProps> = ({
  width = 68,
  height = 26,
  className
}) => (
  <img
    src={resolveImageSrc(logoImg)}
    alt="Apollo Tyres Logo"
    width={width}
    height={height}
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export default ApolloTyresLogo;
