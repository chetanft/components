import React, { useState } from 'react';
import { Button } from '../../atoms/Button/Button';
import { Badge } from '../../atoms/Badge/Badge';
import { Icon } from '../../atoms/Icons';
import { cn } from '../../../lib/utils';
import { CollapseContext } from './CollapseContext';

export interface CollapsibleProps {
  header: React.ReactNode; // Changed to ReactNode
  key?: string | number;
  children?: React.ReactNode;
  extra?: React.ReactNode;
  showArrow?: boolean;
  disabled?: boolean;
  className?: string;
  // Legacy
  badges?: boolean;
  bg?: 'Primary' | 'Secondary';
  type?: 'Primary' | 'Secondary' | 'Tertiary';
  isExpanded?: boolean;
  onToggle?: (isExpanded: boolean) => void;
}

export const Collapsible: React.FC<CollapsibleProps> = ({
  header,
  children,
  extra,
  showArrow = true,
  disabled,
  className,
  // Legacy
  badges,
  bg = 'Secondary',
  type = 'Primary',
  isExpanded: controlledIsExpanded,
  onToggle,
  ...props
}) => {
  const [internalIsExpanded, setInternalIsExpanded] = useState(false);
  const isExpanded = controlledIsExpanded ?? internalIsExpanded;

  const handleToggle = () => {
    if (disabled) return;
    const newValue = !isExpanded;
    if (onToggle) {
      onToggle(newValue);
    } else {
      setInternalIsExpanded(newValue);
    }
  };

  // Reuse existing legacy rendering logic or map to simpler one?
  // For compatibility, let's keep the structure but support "accordion" logic via context if we add it later
  // Currently this component is standalone.

  // I'll keep the existing "Primary/Secondary/Tertiary" styling logic but ensure children rendering works
  
    // Background colors and styling based on variant
  const getBackgroundStyles = () => {
    const baseStyles = [];
    
    if (bg === 'Primary') {
      baseStyles.push('bg-[var(--bg-primary,#ffffff)]');
      if (type === 'Tertiary') {
        baseStyles.push('border border-[var(--border-primary,#ced1d7)]');
      }
    } else {
      baseStyles.push('bg-[var(--bg-secondary,#f8f8f9)]');
      if (type === 'Tertiary') {
        baseStyles.push('border border-[var(--border-secondary,#f0f1f7)]');
      }
    }
    
    return baseStyles;
  };

  const getBorderRadius = () => {
    return type === 'Tertiary' ? 'rounded-[var(--x3,16px)]' : 'rounded-[var(--x2,8px)]';
  };

  const renderHeader = () => {
      // Logic for icon
      const icon = type === 'Primary' 
         ? (isExpanded ? 'subtract' : 'add') 
         : (isExpanded ? 'chevron-up' : 'chevron-down'); // For Secondary
      
      // Secondary logic is different in original: chevron-down (collapsed), chevron-up (expanded)
      // Actually original code: Secondary/Tertiary collapsed -> chevron-right if Tertiary, chevron-down if Secondary...
      
      return (
         <div 
            className={cn(
                "flex items-center gap-[8px] px-0 py-[var(--x5,20px)] w-full cursor-pointer",
                isExpanded ? "border-b border-[var(--border-primary,#ced1d7)]" : "",
            )}
            onClick={handleToggle}
         >
             <div className="flex items-center gap-[var(--x5,20px)] px-[var(--x5,20px)] flex-1">
                 {type === 'Primary' && (
                     <Button
                        variant="secondary"
                        size="md"
                        icon={icon}
                        iconPosition="only"
                        className="!w-10 !h-10 !p-0 flex items-center justify-center rounded-lg shrink-0 border border-[var(--border-primary)] pointer-events-none"
                     />
                 )}
                 {(type === 'Secondary' || type === 'Tertiary') && (
                     <div className="text-[var(--primary)]">
                         {type === 'Tertiary' && !isExpanded && <Icon name="chevron-right" size={16} />}
                         {type === 'Tertiary' && isExpanded && <Icon name="chevron-up" size={16} />}
                         {/* Secondary doesn't show icon on left in original, it shows chevron-down on right */}
                     </div>
                 )}
                 
                 <div className="flex-1 font-semibold text-xl text-[var(--primary)]">{header}</div>

                 {extra}
                 
                 {type === 'Secondary' && (
                     <div className="text-[var(--primary)]">
                         {isExpanded ? <Icon name="chevron-up" size={16} /> : <Icon name="chevron-down" size={16} />}
                     </div>
                 )}
             </div>
         </div>
      );
  };

  return (
    <div 
        className={cn(
            'flex flex-col overflow-hidden',
            getBorderRadius(),
            ...getBackgroundStyles(),
            disabled && "opacity-50 cursor-not-allowed",
            className
        )}
    >
        {renderHeader()}
        {isExpanded && (
            <div className={cn("px-[var(--x5,20px)] py-[var(--x5,20px)]", type === 'Tertiary' ? "pt-0" : "")}>
                {children}
            </div>
        )}
    </div>
  );
};
