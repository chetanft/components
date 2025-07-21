import { forwardRef } from 'react';
import { IconProps } from './types';

export const Bundle = forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = 16, ...props }, ref) => {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        ref={ref}
        {...props}
      >
        <path
          d="M2 2h12v12H2V2z"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
);

Bundle.displayName = 'Bundle'; 