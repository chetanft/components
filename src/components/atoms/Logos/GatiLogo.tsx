import React from 'react';

interface GatiLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export const GatiLogo: React.FC<GatiLogoProps> = ({ 
  width = 80, 
  height = 28, 
  className 
}) => (
  <svg 
    width={width} 
    height={height} 
    viewBox="0 0 80 28" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* GATI logo - Teal/Blue stylized */}
    <text x="0" y="22" fontSize="22" fontWeight="700" fill="#0D9488" letterSpacing="2">GATI</text>
  </svg>
);

export default GatiLogo;
