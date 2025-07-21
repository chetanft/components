import { forwardRef } from 'react';
import { IconProps } from './types';

export const Forward = forwardRef<SVGSVGElement, IconProps>(
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
            d="M4.53413 11.5792C4.32581 11.3709 4.32581 11.0332 4.53413 10.8249L9.49125 5.86774L4.53413 0.910624C4.32581 0.702306 4.32581 0.364556 4.53413 0.156238C4.74244 -0.0520794 5.08019 -0.0520794 5.28851 0.156238L11 5.86774L5.28851 11.5792C5.08019 11.7876 4.74244 11.7876 4.53413 11.5792Z" 
            fill="currentColor"
          />
          <path 
            fillRule="evenodd" 
            clipRule="evenodd" 
            d="M0.156238 11.6897C-0.0520795 11.4814 -0.0520794 11.1436 0.156238 10.9353L5.11336 5.97818L0.15624 1.02106C-0.0520781 0.812742 -0.052078 0.474992 0.15624 0.266675C0.364558 0.0583571 0.702308 0.0583572 0.910626 0.266675L6.62213 5.97818L0.910624 11.6897C0.702306 11.898 0.364556 11.898 0.156238 11.6897Z" 
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);

Forward.displayName = 'Forward'; 