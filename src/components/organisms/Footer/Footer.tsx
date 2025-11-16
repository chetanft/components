import React from 'react';
import { cn } from '../../../lib/utils';
import { Button } from '../../atoms/Button/Button';
import { Divider } from '../../atoms/Divider';

export interface FooterProps {
  /** Number of buttons to display (1-4) */
  buttonCount?: 1 | 2 | 3 | 4;
  /** Whether to show the left side button (only for 3+ button layouts) */
  leftSideButton?: boolean;
  /** Custom button texts - if not provided, defaults to "Button" */
  buttonTexts?: string[];
  /** Custom button variants for each button */
  buttonVariants?: Array<'primary' | 'secondary' | 'text' | 'link'>;
  /** Custom click handlers for each button */
  onButtonClick?: Array<() => void>;
  /** Additional CSS classes */
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({
  buttonCount = 1,
  leftSideButton = false,
  buttonTexts = [],
  buttonVariants = [],
  onButtonClick = [],
  className,
}) => {
  // Generate default button texts if not provided
  const defaultTexts = Array.from({ length: buttonCount }, (_, i) => buttonTexts[i] || 'Button');
  
  // Generate default button variants based on Figma design patterns
  const getDefaultVariants = () => {
    const variants: Array<'primary' | 'secondary' | 'text' | 'link'> = [];
    
    if (buttonCount === 1) {
      variants.push('primary');
    } else if (buttonCount === 2) {
      variants.push('secondary', 'primary');
    } else if (buttonCount === 3) {
      if (leftSideButton) {
        variants.push('text', 'secondary', 'primary');
      } else {
        variants.push('text', 'secondary', 'primary');
      }
    } else if (buttonCount === 4) {
      variants.push('text', 'text', 'secondary', 'primary');
    }
    
    return variants;
  };

  const finalVariants = buttonVariants.length > 0 ? buttonVariants : getDefaultVariants();

  // Render buttons with proper layout
  const renderButtons = () => {
    const buttons = defaultTexts.map((text, index) => (
      <Button
        key={index}
        variant={finalVariants[index] || 'primary'}
        size="lg"
        icon="add"
        iconPosition="leading"
        onClick={onButtonClick[index]}
        className="min-w-[188px] h-12"
      >
        {text}
      </Button>
    ));

    // Layout logic based on Figma design
    if (buttonCount === 1) {
      return buttons[0];
    }

    if (buttonCount === 2) {
      return (
        <div className="flex items-center gap-5">
          {buttons}
        </div>
      );
    }

    if (buttonCount === 3) {
      if (leftSideButton) {
        return (
          <>
            {buttons[0]}
            <div className="flex items-center gap-5">
              {buttons[1]}
              {buttons[2]}
            </div>
          </>
        );
      } else {
        return (
          <div className="flex items-center gap-5">
            {buttons}
          </div>
        );
      }
    }

    if (buttonCount === 4) {
      return (
        <>
          {buttons[0]}
          <div className="flex items-center gap-5">
            {buttons[1]}
            {buttons[2]}
            {buttons[3]}
          </div>
        </>
      );
    }

    return null;
  };

  // Layout classes based on button configuration
  const getLayoutClasses = () => {
    if (buttonCount === 1) {
      return "flex justify-end items-center";
    }
    
    if (buttonCount >= 3 && leftSideButton) {
      return "flex justify-between items-center";
    }
    
    return "flex justify-end items-center";
  };

  return (
    <footer className={cn("w-full bg-white", className)}>
      <Divider type="primary" className="w-full" />
      <div
        className={cn(
          "px-5 py-4 gap-[366px]", // Large gap as specified in Figma design
          getLayoutClasses()
        )}
      >
        {renderButtons()}
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer'; 