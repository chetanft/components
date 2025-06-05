import React, { useState } from 'react';
import { Button } from '../Button/Button';
import { Badge } from '../Badge/Badge';
import { cn } from '../../lib/utils';

export interface CollapsibleProps {
  header: string;
  children?: React.ReactNode;
  badges?: {
    loads?: number;
    invoices?: number;
    materials?: number;
  };
  className?: string;
  isExpanded?: boolean;
  onToggle?: (isExpanded: boolean) => void;
  background?: 'gray' | 'white';
  stage?: 'default' | 'submitted';
}

export const Collapsible: React.FC<CollapsibleProps> = ({
  header,
  children,
  badges,
  className,
  isExpanded: controlledIsExpanded,
  onToggle,
  background = 'gray',
  stage = 'default',
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

  // Background colors based on state and background variant
  const getBackgroundColor = () => {
    if (background === 'white') {
      return 'bg-white';
    }
    return 'bg-[#F8F8F9]';
  };

  // Show badges for submitted stage or when explicitly provided
  const shouldShowBadges = stage === 'submitted' || badges;
  const badgesToShow = badges || (stage === 'submitted' ? { loads: 1, invoices: 1, materials: 1 } : undefined);

  if (isExpanded) {
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
          <div className="flex items-center gap-5">
            <Button
              variant="secondary"
              size="md"
              onClick={handleToggle}
              className={cn(
                '!w-10 !h-10 !p-0 !px-0 !py-0 flex items-center justify-center rounded-lg min-w-10 min-h-10 max-w-10 max-h-10 aspect-square shrink-0',
                getBackgroundColor()
              )}
            >
              <MinusIcon className="w-4 h-4" />
            </Button>
            <span className="text-xl font-semibold text-[#434F64]">{header}</span>
            {shouldShowBadges && badgesToShow && (
              <>
                {badgesToShow.loads !== undefined && (
                  <Badge variant="neutral">Loads: {badgesToShow.loads}</Badge>
                )}
                {badgesToShow.invoices !== undefined && (
                  <Badge variant="neutral">Invoices: {badgesToShow.invoices}</Badge>
                )}
                {badgesToShow.materials !== undefined && (
                  <Badge variant="neutral">Materials: {badgesToShow.materials}</Badge>
                )}
              </>
            )}
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
      <div className="flex items-center gap-5">
        <Button
          variant="secondary"
          size="md"
          onClick={handleToggle}
          className={cn(
            '!w-10 !h-10 !p-0 !px-0 !py-0 flex items-center justify-center rounded-lg min-w-10 min-h-10 max-w-10 max-h-10 aspect-square shrink-0',
            getBackgroundColor()
          )}
        >
          <PlusIcon className="w-4 h-4" />
        </Button>
        <span className="text-xl font-semibold text-[#434F64]">{header}</span>
        {shouldShowBadges && badgesToShow && (
          <>
            {badgesToShow.loads !== undefined && (
              <Badge variant="neutral">Loads: {badgesToShow.loads}</Badge>
            )}
            {badgesToShow.invoices !== undefined && (
              <Badge variant="neutral">Invoices: {badgesToShow.invoices}</Badge>
            )}
            {badgesToShow.materials !== undefined && (
              <Badge variant="neutral">Materials: {badgesToShow.materials}</Badge>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const MinusIcon = ({ className }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M13.5 8.5H2.5V7.5H13.5V8.5Z"
      fill="currentColor"
    />
  </svg>
);

const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M8.5 2.5V7.5H13.5V8.5H8.5V13.5H7.5V8.5H2.5V7.5H7.5V2.5H8.5Z"
      fill="currentColor"
    />
  </svg>
); 