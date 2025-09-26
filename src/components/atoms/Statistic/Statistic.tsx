import React from 'react';
import { cn } from '../../../lib/utils';
import { Text } from '../Text/Text';

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
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#5f697b] text-[14px] text-nowrap">
        <p className="leading-[1.4] whitespace-pre">{label}</p>
      </div>
    </div>
  );

  const renderValue = () => (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-[57px]" data-name="Text">
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#434f64] text-[16px] text-nowrap">
        <p className="leading-[1.4] whitespace-pre">{value}</p>
      </div>
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
