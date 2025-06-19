import React, { useState } from 'react';
import { Button } from '../../atoms/Button/Button';
import { Badge } from '../../atoms/Badge/Badge';
import { Icon } from '../../atoms/Icons';
import { cn } from '../../../lib/utils';

export type CollapsibleBackground = 'bg' | 'white';
export type CollapsibleState = 'open' | 'closed';
export type CollapsibleStage = 'default' | 'submitted';
export type CollapsibleType = 'form' | 'text';

export interface CollapsibleProps {
  header: string;
  children?: React.ReactNode;
  badges?: {
    loads?: number;
    invoices?: number;
    materials?: number;
    [key: string]: number | undefined;
  };
  className?: string;
  isExpanded?: boolean;
  onToggle?: (isExpanded: boolean) => void;
  background?: CollapsibleBackground;
  stage?: CollapsibleStage;
  type?: CollapsibleType;
}

export const Collapsible: React.FC<CollapsibleProps> = ({
  header,
  children,
  badges,
  className,
  isExpanded: controlledIsExpanded,
  onToggle,
  background = 'bg',
  stage = 'default',
  type = 'form',
}) => {
  const [internalIsExpanded, setInternalIsExpanded] = useState(false);
  const isExpanded = controlledIsExpanded ?? internalIsExpanded;
  const state: CollapsibleState = isExpanded ? 'open' : 'closed';

  const handleToggle = () => {
    const newValue = !isExpanded;
    if (onToggle) {
      onToggle(newValue);
    } else {
      setInternalIsExpanded(newValue);
    }
  };

  // Background colors based on variant
  const getBackgroundColor = () => {
    return background === 'white' ? 'bg-white' : 'bg-[#F8F8F9]';
  };

  // Show badges for submitted stage or when explicitly provided
  const shouldShowBadges = stage === 'submitted' || badges;
  const badgesToShow = badges || (stage === 'submitted' ? { loads: 1, invoices: 1, materials: 1 } : undefined);

  // Render badges if they exist
  const renderBadges = () => {
    if (!shouldShowBadges || !badgesToShow) return null;
    
    return Object.entries(badgesToShow).map(([key, value]) => {
      if (value === undefined) return null;
      const label = key.charAt(0).toUpperCase() + key.slice(1);
      return (
        <Badge key={key} variant="neutral" className="px-2 py-[3px] bg-[#F0F1F7] rounded-[5px]">
          <span className="text-sm font-semibold text-[#434F64]">{label}: {value}</span>
        </Badge>
      );
    });
  };

  // Form type collapsible uses Button with icon
  if (type === 'form') {
    if (state === 'open') {
      // Expanded state: column layout with gap and bottom padding
      return (
        <div 
          className={cn(
            'rounded-lg flex flex-col gap-8 pb-5',
            getBackgroundColor(),
            className
          )}
        >
          {/* Header section with border */}
          <div className="flex items-center p-5 border-b border-[#CED1D7]">
            <div className="flex items-center flex-wrap gap-5">
              <Button
                variant="secondary"
                size="md"
                icon="subtract"
                iconPosition="only"
                onClick={handleToggle}
                aria-label="subtract"
                className={cn(
                  '!w-10 !h-10 !p-0 !px-0 !py-0 flex items-center justify-center rounded-lg min-w-10 min-h-10 max-w-10 max-h-10 aspect-square shrink-0',
                  getBackgroundColor()
                )}
              />
              <span className="text-xl font-semibold text-[#434F64]">{header}</span>
              {renderBadges()}
            </div>
          </div>

          {/* Content section */}
          {children && (
            <div className="flex flex-row self-stretch gap-2.5 px-5">
              {children}
            </div>
          )}
        </div>
      );
    }

    // Collapsed state: single row layout with padding
    return (
      <div 
        className={cn(
          'rounded-lg flex items-center p-5',
          getBackgroundColor(),
          className
        )}
      >
        <div className="flex items-center flex-wrap gap-5">
          <Button
            variant="secondary"
            size="md"
            icon="add"
            iconPosition="only"
            onClick={handleToggle}
            aria-label="add"
            className={cn(
              '!w-10 !h-10 !p-0 !px-0 !py-0 flex items-center justify-center rounded-lg min-w-10 min-h-10 max-w-10 max-h-10 aspect-square shrink-0',
              getBackgroundColor()
            )}
          />
          <span className="text-xl font-semibold text-[#434F64]">{header}</span>
          {renderBadges()}
        </div>
      </div>
    );
  }

  // Text type collapsible uses chevron icons
  if (state === 'open') {
    return (
      <div 
        className={cn(
          'rounded-lg flex flex-col gap-8 pb-5',
          getBackgroundColor(),
          className
        )}
      >
        {/* Header section with border */}
        <div className="flex items-center justify-between p-5 border-b border-[#CED1D7]">
          <div className="flex items-center flex-wrap gap-5 flex-grow">
            <span className="text-xl font-semibold text-[#434F64]">{header}</span>
            {renderBadges()}
          </div>
          <div 
            className="cursor-pointer p-1" 
            onClick={handleToggle}
            role="button"
            tabIndex={0}
            aria-label="Collapse"
          >
            <Icon 
              name="chevron-up" 
              size={20}
              className="text-[#434F64]"
            />
          </div>
        </div>

        {/* Content section */}
        {children && (
          <div className="flex flex-row self-stretch gap-2.5 px-5">
            {children}
          </div>
        )}
      </div>
    );
  }

  // Text type collapsed state
  return (
    <div 
      className={cn(
        'rounded-lg flex items-center justify-between p-5',
        getBackgroundColor(),
        className
      )}
    >
      <div className="flex items-center flex-wrap gap-5 flex-grow">
        <span className="text-xl font-semibold text-[#434F64]">{header}</span>
        {renderBadges()}
      </div>
      <div 
        className="cursor-pointer p-1" 
        onClick={handleToggle}
        role="button"
        tabIndex={0}
        aria-label="Expand"
      >
        <Icon 
          name="chevron-down" 
          size={20}
          className="text-[#434F64]"
        />
      </div>
    </div>
  );
}; 