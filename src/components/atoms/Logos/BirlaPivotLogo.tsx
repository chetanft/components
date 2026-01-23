import React from 'react';

interface BirlaPivotLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export const BirlaPivotLogo: React.FC<BirlaPivotLogoProps> = ({ 
  width = 160, 
  height = 28, 
  className 
}) => (
  <svg 
    width={width} 
    height={height} 
    viewBox="0 0 160 28" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* BIRLA PIVOT logo - Black with Gradient Polygon */}
    <defs>
      <linearGradient id="birlaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="50%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
    </defs>
    <text x="0" y="20" fontSize="18" fontWeight="600" fill="#211F1F">BIRLA</text>
    <text x="60" y="20" fontSize="18" fontWeight="600" fill="#211F1F">PIV</text>
    <polygon points="100,8 110,8 105,20" fill="url(#birlaGradient)" />
    <text x="115" y="20" fontSize="18" fontWeight="600" fill="#211F1F">T</text>
  </svg>
);

export default BirlaPivotLogo;
