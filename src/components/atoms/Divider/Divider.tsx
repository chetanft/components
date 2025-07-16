import React from 'react';
import { Typography } from '../Typography';

export type DividerType = 'primary' | 'secondary' | 'with-label';

export interface DividerProps {
  /**
   * The type of divider to display
   * @default 'primary'
   */
  type?: DividerType;
  /**
   * Label to display in the middle of the divider (only for type='with-label')
   */
  label?: string;
  /**
   * Additional CSS classes to apply
   */
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  type = 'primary',
  label,
  className = '',
}) => {
  const baseStyles = 'w-full';
  
  const typeStyles = {
    primary: 'border-t border-[#CED1D7]',
    secondary: 'border-t border-[#F0F1F7]',
    'with-label': 'flex items-center justify-center',
  };

  if (type === 'with-label' && label) {
    return (
      <div className={`${baseStyles} ${typeStyles[type]} ${className}`}>
        <div className="flex-grow border-t border-[#CED1D7]" style={{ width: '253px' }} />
        <div className="mx-4 px-2 py-0.5 bg-white rounded-full shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)]">
          <Typography variant="body-medium" color="secondary">
            {label}
          </Typography>
        </div>
        <div className="flex-grow border-t border-[#CED1D7]" style={{ width: '257px' }} />
      </div>
    );
  }

  return (
    <hr 
      className={`${baseStyles} ${typeStyles[type]} ${className}`}
      role="separator"
    />
  );
}; 