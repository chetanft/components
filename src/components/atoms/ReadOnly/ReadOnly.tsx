import React from 'react';
import { CheckFill } from '../Icons';

export interface ReadOnlyProps {
  /**
   * The label text
   */
  label: string;
  
  /**
   * The main value text
   */
  value: string;
  
  /**
   * Optional subtext below the main value
   */
  subtext?: string;
  
  /**
   * Layout orientation
   */
  type?: 'vertical' | 'horizontal';
  
  /**
   * Whether to show an icon
   */
  labelIcon?: boolean;
  
  /**
   * Custom icon to use instead of default check icon
   */
  icon?: React.ReactNode;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

export const ReadOnly: React.FC<ReadOnlyProps> = ({
  label,
  value,
  subtext,
  type = 'vertical',
  labelIcon = false,
  icon,
  className = '',
}) => {
  const defaultIcon = (
    <div style={{ width: '16px', height: '16px', flexShrink: 0 }}>
      <CheckFill />
    </div>
  );

  const iconElement = icon || defaultIcon;

  const labelStyles = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '1.4',
    color: '#5F697B',
  };

  const valueStyles = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '1.4',
    color: '#434F64',
  };

  const subtextStyles = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '1.4',
    color: '#5F697B',
  };

  if (type === 'horizontal') {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
        className={className}
      >
        {labelIcon && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}>
            {iconElement}
            <span style={labelStyles}>{label}:</span>
          </div>
        )}
        {!labelIcon && (
          <span style={labelStyles}>{label}:</span>
        )}
        <span style={valueStyles}>{value}</span>
      </div>
    );
  }

  // Vertical layout
  if (labelIcon) {
    return (
      <div
        style={{
          display: 'flex',
          gap: subtext ? '4px' : '8px',
        }}
        className={className}
      >
        {iconElement}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: subtext ? '4px' : '8px',
          flex: 1,
        }}>
          {/* Label and Value */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}>
            <span style={labelStyles}>{label}</span>
            <span style={valueStyles}>{value}</span>
          </div>
          
          {/* Subtext if provided */}
          {subtext && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}>
              {iconElement}
              <span style={subtextStyles}>{subtext}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Vertical without icon
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: subtext ? '4px' : '8px',
        width: '183px', // Fixed width as in Figma
      }}
      className={className}
    >
      {/* Label and Value */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}>
        <span style={labelStyles}>{label}</span>
        <span style={valueStyles}>{value}</span>
      </div>
      
      {/* Subtext if provided */}
      {subtext && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}>
          {iconElement}
          <span style={subtextStyles}>{subtext}</span>
        </div>
      )}
    </div>
  );
};

ReadOnly.displayName = 'ReadOnly'; 