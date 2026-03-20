import React from 'react';
import logoImg from './assets/om-logistics-logo.svg';

interface OMLogisticsLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export const OMLogisticsLogo: React.FC<OMLogisticsLogoProps> = ({
  width = 186,
  height = 22,
  className
}) => (
  <img
    src={(logoImg as any).src || logoImg}
    alt="OM Logistics Logo"
    width={width}
    height={height}
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export default OMLogisticsLogo;
