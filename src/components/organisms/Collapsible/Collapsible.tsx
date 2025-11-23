import React, { useState } from 'react';
import { Button } from '../../atoms/Button/Button';
import { Badge } from '../../atoms/Badge/Badge';
import { Icon } from '../../atoms/Icons';
import { cn } from '../../../lib/utils';

export type CollapsibleBackground = 'Primary' | 'Secondary';
export type CollapsibleType = 'Primary' | 'Secondary' | 'Tertiary';

export interface CollapsibleProps {
  header: string;
  children?: React.ReactNode;
  badges?: boolean;
  className?: string;
  isExpanded?: boolean;
  onToggle?: (isExpanded: boolean) => void;
  bg?: CollapsibleBackground;
  type?: CollapsibleType;
}

export const Collapsible: React.FC<CollapsibleProps> = ({
  header,
  children,
  badges = false,
  className,
  isExpanded: controlledIsExpanded,
  onToggle,
  bg = 'Secondary',
  type = 'Primary',
}) => {
  const [internalIsExpanded, setInternalIsExpanded] = useState(false);
  const isExpanded = controlledIsExpanded ?? internalIsExpanded;

  const handleToggle = () => {
    const newValue = !isExpanded;
    if (onToggle) {
      onToggle(newValue);
    } else {
      setInternalIsExpanded(newValue);
    }
  };

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

  // Render badges if enabled
  const renderBadges = () => {
    if (!badges) return null;
    
    return (
      <div className="flex gap-[var(--x2,8px)] items-center">
        <Badge variant="neutral" className="px-2 py-[2px] bg-[var(--border-secondary,#f0f1f7)] rounded-[var(--x1,4px)]">
          <span className="text-sm font-semibold text-[var(--primary,#434f64)]">Label</span>
        </Badge>
        <Badge variant="neutral" className="px-2 py-[2px] bg-[var(--border-secondary,#f0f1f7)] rounded-[var(--x1,4px)]">
          <span className="text-sm font-semibold text-[var(--primary,#434f64)]">Label</span>
        </Badge>
        <Badge variant="neutral" className="px-2 py-[2px] bg-[var(--border-secondary,#f0f1f7)] rounded-[var(--x1,4px)]">
          <span className="text-sm font-semibold text-[var(--primary,#434f64)]">Label</span>
        </Badge>
      </div>
    );
  };

  // Primary type uses Button with add/subtract icons
  if (type === 'Primary') {
    if (isExpanded) {
      return (
        <div 
          className={cn(
            'flex flex-col items-start p-0',
            getBorderRadius(),
            ...getBackgroundStyles(),
            className
          )}
        >
          {/* Header section with border */}
          <div className="flex items-center gap-[8px] px-0 py-[var(--x5,20px)] border-b border-[var(--border-primary,#ced1d7)] w-full">
            <div className="flex items-center gap-[var(--x5,20px)] px-[var(--x5,20px)] flex-1">
              <Button
                variant="secondary"
                size="md"
                icon="subtract"
                iconPosition="only"
                onClick={handleToggle}
                aria-label="subtract"
                className="!w-10 !h-10 !p-0 flex items-center justify-center rounded-lg shrink-0 border border-[var(--border-primary,#ced1d7)]"
              />
              <div className="flex flex-col gap-[var(--x1,4px)] flex-1">
                <div className="flex items-center gap-[var(--x2,8px)]">
                  <span className="text-xl font-semibold text-[var(--primary,#434f64)]">{header}</span>
                </div>
              </div>
              {badges && (
                <div className="flex items-center gap-[var(--x5,20px)] justify-end">
                  {renderBadges()}
                </div>
              )}
            </div>
            {!badges && (
              <div className="flex items-center gap-[var(--x5,20px)] justify-end px-[var(--x5,20px)]">
                <div 
                  className="cursor-pointer" 
                  onClick={handleToggle}
                  role="button"
                  tabIndex={0}
                  aria-label="Collapse"
                >
                  <Icon 
                    name="three-dot-menu" 
                    size={16}
                    className="text-[var(--primary,#434f64)]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Spacer */}
          <div className="h-[20px] w-full shrink-0" />

          {/* Content section */}
          {children && (
            <div className="flex flex-col items-center justify-center px-[var(--x5,20px)] py-0 flex-1 w-full">
              {children}
            </div>
          )}

          {/* Spacer */}
          <div className="h-[20px] w-full shrink-0" />
        </div>
      );
    }

    // Collapsed state
    return (
      <div 
        className={cn(
          'flex items-center gap-[8px] px-0 py-[var(--x5,20px)]',
          getBorderRadius(),
          ...getBackgroundStyles(),
          className
        )}
      >
        <div className="flex items-center gap-[var(--x5,20px)] px-[var(--x5,20px)] flex-1">
          <Button
            variant="secondary"
            size="md"
            icon="add"
            iconPosition="only"
            onClick={handleToggle}
            aria-label="add"
            className="!w-10 !h-10 !p-0 flex items-center justify-center rounded-lg shrink-0 border border-[var(--border-primary,#ced1d7)]"
          />
          <div className="flex flex-col gap-[var(--x1,4px)] flex-1">
            <div className="flex items-center gap-[var(--x2,8px)]">
              <span className="text-xl font-semibold text-[var(--primary,#434f64)]">{header}</span>
            </div>
          </div>
          {badges && renderBadges()}
        </div>
      </div>
    );
  }

  // Secondary and Tertiary types use chevron icons
  if (isExpanded) {
    return (
      <div 
        className={cn(
          'flex flex-col items-start p-0',
          getBorderRadius(),
          ...getBackgroundStyles(),
          className
        )}
      >
        {/* Header section with border */}
        <div className="flex items-center gap-[8px] px-0 py-[var(--x5,20px)] border-b border-[var(--border-primary,#ced1d7)] w-full">
          <div className="flex items-center gap-[var(--x5,20px)] px-[var(--x5,20px)] flex-1">
            <div className="flex flex-col gap-[var(--x1,4px)] flex-1">
              <div className="flex items-center gap-[var(--x2,8px)]">
                <span className="text-xl font-semibold text-[var(--primary,#434f64)]">{header}</span>
              </div>
            </div>
            {badges && (
              <div className="flex items-center gap-[var(--x5,20px)] justify-end">
                {renderBadges()}
              </div>
            )}
          </div>
          <div className="flex items-center gap-[var(--x5,20px)] justify-end px-[var(--x5,20px)]">
            <div 
              className="cursor-pointer" 
              onClick={handleToggle}
              role="button"
              tabIndex={0}
              aria-label="Collapse"
            >
              <Icon 
                name="chevron-up" 
                size={16}
                className="text-[var(--primary,#434f64)]"
              />
            </div>
            {!badges && (
              <div 
                className="cursor-pointer" 
                onClick={handleToggle}
                role="button"
                tabIndex={0}
                aria-label="Collapse"
              >
                <Icon 
                  name="more-options" 
                  size={16}
                  className="text-[var(--primary,#434f64)]"
                />
              </div>
            )}
          </div>
        </div>

        {/* Spacer */}
        <div className="h-[20px] w-full shrink-0" />

        {/* Content section */}
        {children && (
          <div className={cn(
            'flex flex-col items-center justify-center px-[var(--x5,20px)] py-0 flex-1',
            type === 'Tertiary' ? 'w-[1212px]' : 'w-full'
          )}>
            {children}
          </div>
        )}

        {/* Spacer */}
        {type === 'Tertiary' && <><div className="h-[20px] w-[1212px] shrink-0" /><div className="h-[20px] w-[1212px] shrink-0" /></>}
        {type !== 'Tertiary' && <div className="h-[20px] w-full shrink-0" />}
      </div>
    );
  }

  // Collapsed state for Secondary and Tertiary
  return (
    <div 
      className={cn(
        'flex items-center gap-[8px] px-0 py-[var(--x5,20px)]',
        getBorderRadius(),
        ...getBackgroundStyles(),
        type === 'Tertiary' && 'border-b border-l-0 border-r-0 border-t-0',
        className
      )}
    >
      <div className="flex items-center gap-[var(--x5,20px)] px-[var(--x5,20px)] flex-1">
        <div className="flex flex-col gap-[var(--x1,4px)] flex-1">
          <div className="flex items-center gap-[var(--x2,8px)]">
            {type === 'Tertiary' && (
              <div 
                className="cursor-pointer" 
                onClick={handleToggle}
                role="button"
                tabIndex={0}
                aria-label="Expand"
              >
                <Icon 
                  name="chevron-right" 
                  size={16}
                  className="text-[var(--primary,#434f64)]"
                />
              </div>
            )}
            <span className="text-xl font-semibold text-[var(--primary,#434f64)]">{header}</span>
          </div>
        </div>
        {badges && renderBadges()}
      </div>
      <div className="flex items-center gap-[var(--x5,20px)] justify-end px-[var(--x5,20px)]">
        {type === 'Secondary' && (
          <div 
            className="cursor-pointer" 
            onClick={handleToggle}
            role="button"
            tabIndex={0}
            aria-label="Expand"
          >
            <Icon 
              name="chevron-down" 
              size={16}
              className="text-[var(--primary,#434f64)]"
            />
          </div>
        )}
        {!badges && (
          <div 
            className="cursor-pointer" 
            onClick={handleToggle}
            role="button"
            tabIndex={0}
            aria-label="Expand"
          >
            <Icon 
              name="more-options" 
              size={16}
              className="text-[var(--primary,#434f64)]"
            />
          </div>
        )}
      </div>
    </div>
  );
}; 