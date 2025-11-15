import React from 'react';

export interface CloudUploadProps {
  size?: number;
  className?: string;
}

export const CloudUpload: React.FC<CloudUploadProps> = ({ 
  size = 65, 
  className = '' 
}) => {
  return (
    <svg 
      width={size} 
      height={(size * 62) / 65} 
      viewBox="0 0 65 62" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M54.1666 40.3334C58.5833 37.6667 61.25 32.6667 61.25 27.1667C61.25 18.0834 53.9166 10.75 44.8333 10.75C44.0416 10.75 43.2916 10.8334 42.5416 10.9584C39.1666 4.37502 32.2083 0.041687 24.3333 0.041687C13.2083 0.041687 4.16663 9.08335 4.16663 20.2084C4.16663 21.4584 4.29163 22.7084 4.49996 23.9167C1.66663 26.9167 -0.208374 31 -0.208374 35.5C-0.208374 45.5417 8.12496 53.875 18.1666 53.875H52.7083C59.7916 53.875 65.4166 48.25 65.4166 41.1667C65.4166 38.2084 64.3333 35.5 62.5833 33.4584"
        fill="currentColor"
      />
      <path
        d="M32.5 27.1667V53.875M32.5 27.1667L24.3333 35.3334M32.5 27.1667L40.6666 35.3334"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CloudUpload;

