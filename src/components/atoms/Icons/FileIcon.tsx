import React from 'react';

export type FileIconType = 'excel' | 'csv' | 'generic';

export interface FileIconProps {
  type?: FileIconType;
  size?: number;
  className?: string;
}

export const FileIcon: React.FC<FileIconProps> = ({ 
  type = 'excel', 
  size = 40,
  className = '' 
}) => {
  // Excel icon from Figma
  if (type === 'excel') {
    return (
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 33 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path 
          d="M20.625 0H4.125C1.84766 0 0 1.84766 0 4.125V35.875C0 38.1523 1.84766 40 4.125 40H28.875C31.1523 40 33 38.1523 33 35.875V12.375L20.625 0Z" 
          fill="#1D6F42"
        />
        <path 
          d="M20.625 0V8.25C20.625 10.5273 22.4727 12.375 24.75 12.375H33L20.625 0Z" 
          fill="#12542E"
        />
        <path 
          d="M8.25 23.375L12.375 28.5L8.25 33.625M24.75 23.375L20.625 28.5L24.75 33.625M18.5625 21.5L14.4375 35.75" 
          stroke="white" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // CSV icon
  if (type === 'csv') {
    return (
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 33 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path 
          d="M20.625 0H4.125C1.84766 0 0 1.84766 0 4.125V35.875C0 38.1523 1.84766 40 4.125 40H28.875C31.1523 40 33 38.1523 33 35.875V12.375L20.625 0Z" 
          fill="#4A90E2"
        />
        <path 
          d="M20.625 0V8.25C20.625 10.5273 22.4727 12.375 24.75 12.375H33L20.625 0Z" 
          fill="#2E5C8A"
        />
        <path 
          d="M10 24C10 22.8954 10.8954 22 12 22H21C22.1046 22 23 22.8954 23 24V32C23 33.1046 22.1046 34 21 34H12C10.8954 34 10 33.1046 10 32V24Z" 
          fill="white" 
          fillOpacity="0.3"
        />
        <path 
          d="M10 26H23M10 29H23M13.5 22V34M19.5 22V34" 
          stroke="white" 
          strokeWidth="1.5" 
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // Generic file icon
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 33 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M20.625 0H4.125C1.84766 0 0 1.84766 0 4.125V35.875C0 38.1523 1.84766 40 4.125 40H28.875C31.1523 40 33 38.1523 33 35.875V12.375L20.625 0Z" 
        fill="#838C9D"
      />
      <path 
        d="M20.625 0V8.25C20.625 10.5273 22.4727 12.375 24.75 12.375H33L20.625 0Z" 
        fill="#5F697B"
      />
    </svg>
  );
};

export default FileIcon;

