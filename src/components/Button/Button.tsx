import React from 'react';
import { Icon, IconName } from '../Icons';

export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'text' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type IconPosition = 'leading' | 'trailing' | 'only';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  iconPosition?: IconPosition;
  children?: React.ReactNode;
}

// Generate unique class name for this button instance
const generateButtonId = () => `btn-${Math.random().toString(36).substr(2, 9)}`;

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'leading',
  disabled = false,
  children,
  className = '',
  ...props
}) => {
  const isIconOnly = iconPosition === 'only' || (!children && icon);
  const isCircular = isIconOnly || className.includes('rounded-full');
  const buttonId = React.useMemo(() => generateButtonId(), []);

  // Base styles that work across all browsers
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontWeight: 500,
    border: '1px solid',
    borderRadius: isCircular ? '50%' : '8px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease-in-out',
    textDecoration: 'none',
    outline: 'none',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    lineHeight: 1,
    gap: isCircular ? '0' : '8px',
  };

  // Size configurations
  const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
    sm: {
      height: '36px',
      fontSize: '14px',
      lineHeight: '14px',
      padding: isCircular ? '0' : '0 16px',
      width: isCircular ? '36px' : 'auto',
    },
    md: {
      height: '44px',
      fontSize: '16px',
      lineHeight: '16px',
      padding: isCircular ? '0' : '0 24px',
      width: isCircular ? '44px' : 'auto',
    },
    lg: {
      height: '52px',
      fontSize: '20px',
      lineHeight: '20px',
      padding: isCircular ? '0' : '0 32px',
      width: isCircular ? '52px' : 'auto',
    },
  };

  // Variant configurations
  const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
    primary: {
      backgroundColor: '#434f64',
      borderColor: '#434f64',
      color: '#ffffff',
    },
    secondary: {
      backgroundColor: 'transparent',
      borderColor: '#ced1d7',
      color: '#434f64',
    },
    destructive: {
      backgroundColor: '#ff3533',
      borderColor: '#ff3533',
      color: '#ffffff',
    },
    text: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      color: '#434f64',
    },
    link: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      color: '#434f64',
      textDecoration: 'underline',
    },
  };

  // Disabled styles
  const disabledStyles: React.CSSProperties = disabled
    ? {
        opacity: 0.5,
        cursor: 'not-allowed',
      }
    : {};

  // Combine all styles
  const finalStyles: React.CSSProperties = {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...disabledStyles,
  };

  // Generate CSS with hover states
  const buttonCSS = `
    .${buttonId} {
      transition: all 0.2s ease-in-out;
    }
    
    .${buttonId}:not(:disabled):hover {
      ${variant === 'primary' ? `
        background-color: #1d2a38 !important;
        border-color: #1d2a38 !important;
      ` : ''}
      ${variant === 'secondary' ? `
        background-color: #f0f1f7 !important;
        border-color: #838c9d !important;
      ` : ''}
      ${variant === 'destructive' ? `
        background-color: #b80100 !important;
        border-color: #b80100 !important;
      ` : ''}
      ${variant === 'text' ? `
        background-color: rgba(67, 79, 100, 0.1) !important;
      ` : ''}
      ${variant === 'link' ? `
        color: #1d2a38 !important;
      ` : ''}
    }
    
    .${buttonId}:not(:disabled):active {
      transform: translateY(1px);
    }
  `;

  // Icon size based on button size
  const getIconSize = () => {
    switch (size) {
      case 'sm': return 16;
      case 'md': return 20;
      case 'lg': return 24;
      default: return 20;
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: buttonCSS }} />
      <button
        style={finalStyles}
        disabled={disabled}
        className={`${buttonId} ${className}`}
        {...props}
      >
        {isIconOnly && icon && (
          <Icon name={icon} size={getIconSize()} />
        )}
        
        {!isIconOnly && (
          <>
            {icon && iconPosition === 'leading' && (
              <Icon name={icon} size={getIconSize()} />
            )}
            
            {children}
            
            {icon && iconPosition === 'trailing' && (
              <Icon name={icon} size={getIconSize()} />
            )}
          </>
        )}
      </button>
    </>
  );
};

Button.displayName = 'Button'; 