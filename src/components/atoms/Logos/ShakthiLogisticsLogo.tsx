import React from 'react';

interface ShakthiLogisticsLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export const ShakthiLogisticsLogo: React.FC<ShakthiLogisticsLogoProps> = ({ 
  width = 180, 
  height = 28, 
  className 
}) => (
  <svg 
    width={width} 
    height={height} 
    viewBox="0 0 180 28" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Shakthi Logistics logo - Black Italic Text */}
    <text x="0" y="20" fontSize="18" fontStyle="italic" fill="#211F1F" fontFamily="serif">Shakthi Logistics</text>
  </svg>
);

export default ShakthiLogisticsLogo;
