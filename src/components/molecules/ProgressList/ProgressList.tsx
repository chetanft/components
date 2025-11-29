"use client";
import React, { useState } from 'react';
import { Icon } from '../../atoms/Icons/Icon';
import { Typography } from '../../atoms/Typography';
import { IconName } from '../../atoms/Icons/types';

export type ProgressItemState = 'completed' | 'current' | 'upcoming';
export type PointType = 'parent' | 'icon' | 'primary' | 'label';
export type LineType = 'solid' | 'dashed' | 'none';

export interface ProgressItem {
  id: string;
  title: string;
  description?: string;
  state: ProgressItemState;
  pointType: PointType;
  lineType?: LineType;
  startTime?: string;
  endTime?: string;
  timeLabel?: string;
  icon?: IconName;
  pointLabel?: string;
  badges?: Array<{
    label: string;
    icon?: IconName;
    variant: 'normal' | 'danger' | 'warning' | 'success';
  }>;
  headerType?: 'primary' | 'secondary';
  showHeaderLine?: boolean;
  collapsible?: boolean;
  content?: React.ReactNode;
  // For multiple points in same path
  multiplePoints?: Array<{
    type: PointType;
    label?: string;
    active?: boolean;
  }>;
}

export interface DividerItem {
  type: 'divider';
  id: string;
  label: string;
}

export type ProgressListItem = ProgressItem | DividerItem;

export interface ProgressListProps {
  items: ProgressListItem[];
  showTime?: boolean;
  className?: string;
}

export const ProgressList: React.FC<ProgressListProps> = ({
  items = [],
  showTime = false,
  className = '',
}) => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const renderDivider = (item: DividerItem) => {
    return (
      <div key={item.id} className="flex justify-between items-center gap-[-36px] py-[var(--spacing-x4)] w-full">
        <div className="flex-1 h-px border-b border-[var(--border-primary)]" />
        <div className="flex items-center justify-center gap-[var(--spacing-x2)] px-[var(--spacing-x2)] py-[var(--spacing-x1)] bg-[var(--color-bg-primary)] border border-[var(--border-primary)] rounded-full shadow-sm">
          <Typography 
            variant="body-secondary-medium" 
            color="secondary"
            className="text-right"
          >
            {item.label}
          </Typography>
        </div>
        <div className="flex-1 h-px border-b border-[var(--border-primary)]" />
      </div>
    );
  };

  const renderPoint = (item: ProgressItem) => {
    const isActive = item.state === 'completed' || item.state === 'current';
    const isExpanded = expandedItems[item.id] || false;

    // Handle multiple points
    if (item.multiplePoints && item.multiplePoints.length > 0) {
      return (
        <div className="flex flex-col items-center gap-0">
          {item.multiplePoints.map((point, idx) => (
            <div key={idx} className="flex items-center justify-center">
              {point.type === 'label' && (
                <div className="flex items-center justify-center w-[var(--spacing-x4)] h-[var(--spacing-x4)] rounded-full bg-[var(--primary)]">
                  <span className="text-[var(--color-bg-primary)] text-[10px] font-medium leading-none text-center">
                    {point.label || 'OR'}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }

    // Single point rendering
    switch (item.pointType) {
      case 'parent':
        return (
          <button
            className={`
              flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200
              ${isActive ? 'bg-white border-[var(--primary)]' : 'bg-white border-[var(--border-primary)]'}
              ${item.collapsible ? 'cursor-pointer hover:border-[var(--secondary)] hover:scale-105' : ''}
            `}
            onClick={() => item.collapsible && toggleExpand(item.id)}
            disabled={!item.collapsible}
          >
            <Icon
              name={isExpanded ? "chevron-up" : "chevron-down"}
              size={14}
              color={isActive ? 'var(--primary)' : 'var(--tertiary)'}
            />
          </button>
        );

      case 'icon':
        return (
          <div className={`
            flex items-center justify-center w-[var(--spacing-x4)] h-[var(--spacing-x4)] rounded-full p-[var(--spacing-x1)]
            ${isActive ? 'bg-[var(--primary)]' : 'bg-[var(--border-primary)]'}
          `}>
            <Icon
              name={item.icon || 'arrow-down'}
              size={10}
              color={isActive ? '#FFFFFF' : 'var(--primary)'}
            />
          </div>
        );

      case 'primary':
        return (
          <div className="flex items-center justify-center w-[var(--spacing-x5)] h-[var(--spacing-x5)]">
            <div className={`
              w-3 h-3 rounded-full bg-white border-4
              ${isActive ? 'border-[var(--primary)]' : 'border-[var(--border-primary)]'}
            `} />
          </div>
        );

      case 'label':
        return (
          <div className={`
            flex items-center justify-center w-[var(--spacing-x4)] h-[var(--spacing-x4)] rounded-full
            ${isActive ? 'bg-[var(--primary)]' : 'bg-[var(--border-primary)]'}
          `}>
            <span className={`
              text-[10px] font-medium leading-none text-center
              ${isActive ? 'text-[var(--color-bg-primary)]' : 'text-[var(--primary)]'}
            `}>
              {item.pointLabel || 'OR'}
            </span>
          </div>
        );

      default:
        return null;
    }
  };

  const renderLine = (item: ProgressItem, isLast: boolean) => {
    if (isLast || item.lineType === 'none') return null;

    const lineColor = item.state === 'completed' ? 'var(--primary)' : 'var(--border-primary)';
    const isDashed = item.lineType === 'dashed' || item.state !== 'completed';

    const lineHeight = 60; // Default height, adjust based on content

    if (isDashed) {
      return (
        <div className="flex flex-col justify-center gap-[2px] w-px flex-1">
          <div style={{ width: '1px', height: '4px', backgroundColor: lineColor }} />
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} style={{ width: '1px', height: '6px', backgroundColor: lineColor }} />
          ))}
          <div style={{ width: '1px', height: '4px', backgroundColor: lineColor }} />
        </div>
      );
    }

    return (
      <div 
        className="w-px flex-1"
        style={{ backgroundColor: lineColor, minHeight: `${lineHeight}px` }}
      />
    );
  };

  const renderTimeColumn = (item: ProgressItem) => {
    if (!showTime) return null;

    return (
      <div className="flex flex-col gap-[var(--spacing-x1)] pt-[var(--spacing-x1)] min-w-[var(--spacing-x10)]">
        {item.timeLabel && (
          <Typography 
            variant="body-secondary-medium" 
            color="secondary"
          >
            {item.timeLabel}
          </Typography>
        )}
        {item.startTime && (
          <Typography 
            variant="body-secondary-medium" 
            color="primary"
          >
            {item.startTime}
          </Typography>
        )}
      </div>
    );
  };

  const renderContent = (item: ProgressItem) => {
    const isExpanded = expandedItems[item.id] || false;

    return (
        <div className="flex gap-[var(--spacing-x2)] pt-[var(--spacing-x1)] flex-1">
        {/* Icon */}
        {item.icon && (
          <div className="flex-shrink-0 w-4 h-4 mt-0.5">
            <Icon name={item.icon} size={16} color="var(--tertiary)" />
          </div>
        )}

        {/* Content Container */}
        <div className="flex flex-col gap-[var(--spacing-x1)] flex-1 pb-[var(--spacing-x7)]">
          {/* Header */}
          <div className="flex items-center gap-2 w-full">
            {item.headerType === 'primary' ? (
              <>
                <Typography 
                  variant="body-secondary-semibold" 
                  color="secondary"
                >
                  {item.title}
                </Typography>
                {item.showHeaderLine && (
                  <div className="flex-1 h-0 border-b border-[var(--tertiary)]" />
                )}
              </>
            ) : (
              <Typography 
                variant="body-secondary-medium" 
                color={item.state === 'upcoming' ? 'secondary' : 'primary'}
              >
                {item.title}
              </Typography>
            )}
          </div>

          {/* Description */}
          {item.description && (
            <Typography 
              variant="body-primary-regular" 
              color="primary"
            >
              {item.description}
            </Typography>
          )}

          {/* Badges */}
          {item.badges && item.badges.length > 0 && (
            <div className="flex gap-[var(--spacing-x2)] flex-wrap">
              {item.badges.map((badge, index) => (
                <div
                  key={index}
                  className={`
                    flex items-center gap-2 px-2 py-0.5 rounded text-[14px] font-semibold
                    ${badge.variant === 'danger' 
                      ? 'bg-[var(--critical-light)] text-[var(--critical)]' 
                      : 'bg-[var(--border-secondary)] text-[var(--primary)]'
                    }
                  `}
                >
                  {badge.icon && (
                    <Icon
                      name={badge.icon}
                      size={14}
                      color={badge.variant === 'danger' ? 'var(--critical)' : 'var(--primary)'}
                    />
                  )}
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Expanded Content */}
          {item.content && isExpanded && (
            <div className="mt-[var(--spacing-x4)]">
              {item.content}
            </div>
          )}
        </div>

        {/* End Time Column */}
        {showTime && item.endTime && (
          <div className="flex flex-col gap-[var(--spacing-x1)] items-end min-w-[var(--spacing-x10)]">
            <Typography 
              variant="body-secondary-medium" 
              color="secondary"
            >
              End time
            </Typography>
            <Typography 
              variant="body-secondary-medium" 
              color="primary"
            >
              {item.endTime}
            </Typography>
          </div>
        )}
      </div>
    );
  };

  const renderProgressItem = (item: ProgressItem, isLast: boolean) => {
    return (
      <div key={item.id} className="flex gap-[var(--spacing-x4)] w-full">
        {/* Time Column */}
        {renderTimeColumn(item)}

        {/* Path Column */}
        <div className="flex flex-col items-center pt-1.5">
          {/* Point */}
          {renderPoint(item)}
          
          {/* Line */}
          {renderLine(item, isLast)}
        </div>

        {/* Content Column */}
        {renderContent(item)}
      </div>
    );
  };

  if (!items || items.length === 0) {
    return (
      <div className={`progress-list flex flex-col ${className}`}>
        <div className="text-sm text-gray-500 p-4 text-center">No items to display</div>
      </div>
    );
  }

  return (
    <div className={`progress-list flex flex-col ${className}`}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        if ('type' in item && item.type === 'divider') {
          return renderDivider(item);
        }

        return renderProgressItem(item as ProgressItem, isLast);
      })}
    </div>
  );
}; 
