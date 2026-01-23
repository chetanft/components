import React from 'react';

interface MDCLabsLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export const MDCLabsLogo: React.FC<MDCLabsLogoProps> = ({ 
  width = 120, 
  height = 28, 
  className 
}) => (
  <svg 
    width={width} 
    height={height} 
    viewBox="0 0 120 28" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* MDC Labs logo - Teal & Blue */}
    <text x="0" y="20" fontSize="20" fontWeight="700" fill="#0D9488">MDC</text>
    <text x="50" y="24" fontSize="16" fontWeight="400" fill="#3B82F6">Labs</text>
  </svg>
);

export default MDCLabsLogo;
