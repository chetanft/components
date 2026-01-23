import React from 'react';

interface DiageoWhiteLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export const DiageoWhiteLogo: React.FC<DiageoWhiteLogoProps> = ({ 
  width = 100, 
  height = 28, 
  className 
}) => (
  <svg 
    width={width} 
    height={height} 
    viewBox="0 0 100 28" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* DIAGEO logo - White */}
    <text x="0" y="22" fontSize="20" fontWeight="700" fill="#FFFFFF" letterSpacing="1">DIAGEO</text>
  </svg>
);

export default DiageoWhiteLogo;
