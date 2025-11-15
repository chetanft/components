import React from 'react';
import { cn } from '../../../lib/utils';
import { Typography } from '../Typography';

export interface StatisticProps {
  /**
   * The label text
   */
  label?: string;
  
  /**
   * The statistic value
   */
  value?: string;
  
  /**
   * Label placement relative to value
   */
  labelPlacement?: "Below" | "Top";
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

export const Statistic: React.FC<StatisticProps> = ({
  label = "Label",
  value = "Text",
  labelPlacement = "Below",
  className = '',
}) => {
  const renderLabel = () => (
    <div className="content-stretch flex gap-[4px] items-center justify-start relative shrink-0" data-name="Label">
      <Typography variant="body-secondary-medium" color="secondary" className="relative shrink-0 text-nowrap whitespace-pre">
        {label}
      </Typography>
    </div>
  );

  const renderValue = () => (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-[57px]" data-name="Text">
      <Typography variant="body-primary-regular" color="primary" className="relative shrink-0 text-nowrap whitespace-pre">
        {value}
      </Typography>
    </div>
  );

  const containerClasses = cn(
    "content-stretch flex flex-col gap-[8px] items-start justify-center relative size-full",
    className
  );

  if (labelPlacement === "Top") {
    return (
      <div className={containerClasses} data-name="Label Placement=Top">
        {renderLabel()}
        {renderValue()}
      </div>
    );
  }

  // Default: Below
  return (
    <div className={containerClasses} data-name="Label Placement=Below">
      {renderValue()}
      {renderLabel()}
    </div>
  );
};

Statistic.displayName = 'Statistic';
