import { forwardRef } from 'react';
import { IconProps } from './types';

export const Backward = forwardRef<SVGSVGElement, IconProps>(
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
        <g transform="translate(2.5, 2)">
          <path 
            fillRule="evenodd" 
            clipRule="evenodd" 
            d="M6.46589 0.266675C6.67421 0.474993 6.67421 0.812743 6.46589 1.02106L1.50877 5.97818L6.46589 10.9353C6.67421 11.1436 6.67421 11.4814 6.46589 11.6897C6.25757 11.898 5.91982 11.898 5.7115 11.6897L0 5.97818L5.71151 0.266675C5.91982 0.0583575 6.25757 0.0583575 6.46589 0.266675Z" 
            fill="currentColor"
          />
          <path 
            fillRule="evenodd" 
            clipRule="evenodd" 
            d="M10.8438 0.156238C11.0521 0.364556 11.0521 0.702306 10.8438 0.910624L5.88666 5.86774L10.8438 10.8249C11.0521 11.0332 11.0521 11.3709 10.8438 11.5792C10.6355 11.7876 10.2977 11.7876 10.0894 11.5792L4.37789 5.86774L10.0894 0.156238C10.2977 -0.0520795 10.6355 -0.0520795 10.8438 0.156238Z" 
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);

Backward.displayName = 'Backward'; 