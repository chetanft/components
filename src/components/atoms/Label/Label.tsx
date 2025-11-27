import React from 'react';
import { AlertInformational } from '../Icons';

export interface LabelProps {
  /**
   * The text content of the label
   */
  children: React.ReactNode;
  
  /**
   * Whether the field is mandatory (shows red asterisk)
   */
  mandatory?: boolean;
  
  /**
   * Whether the field is optional (shows "(Optional)" text)
   */
  optional?: boolean;
  
  /**
   * Whether to show a suffix icon (info/alert icon)
   */
  suffixIcon?: boolean;
  
  /**
   * Custom icon to use instead of default AlertTriangle
   */
  icon?: React.ReactNode;
  
  /**
   * HTML element to render as (default: 'label')
   */
  as?: 'label' | 'span' | 'div';
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * HTML attributes for the label element
   */
  htmlFor?: string;
  
  /**
   * Click handler
   */
  onClick?: () => void;
}

export const Label: React.FC<LabelProps> = ({
  children,
  mandatory = false,
  optional = false,
  suffixIcon = false,
  icon,
  as: Component = 'label',
  className = '',
  htmlFor,
  onClick,
  ...props
}) => {
  const baseStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '1.4',
    color: 'var(--tertiary)',
    cursor: onClick ? 'pointer' : 'default',
  };

  const mandatoryAsterisk = (
    <svg
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M4 0L4.94 2.94L8 4L4.94 5.06L4 8L3.06 5.06L0 4L3.06 2.94L4 0Z"
        fill="#FF3533"
      />
    </svg>
  );

  const optionalText = (
    <span
      style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '12px',
        fontWeight: '400',
        lineHeight: '1.4',
        color: '#838C9D',
      }}
    >
      (Optional)
    </span>
  );

  const suffixIconElement = icon || (
    <div style={{ width: '16px', height: '16px', color: 'var(--primary)', flexShrink: 0 }}>
      <AlertInformational />
    </div>
  );

  return (
    <Component
      style={baseStyles}
      className={className}
      htmlFor={htmlFor}
      onClick={onClick}
      {...props}
    >
      {mandatory && mandatoryAsterisk}
      <span style={{ flexShrink: 0 }}>{children}</span>
      {suffixIcon && suffixIconElement}
      {optional && optionalText}
    </Component>
  );
};

Label.displayName = 'Label'; 