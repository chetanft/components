import React from 'react';
import { cn } from '../../lib/utils';
import { defaultChartOptions, ftChartColors } from './chartConfig';

export interface BaseChartProps {
  title?: string;
  height?: number;
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const BaseChart: React.FC<BaseChartProps> = ({
  title,
  height = 400,
  responsive = true,
  maintainAspectRatio = false,
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 w-full',
        className
      )}
      style={{
        color: ftChartColors.text.primary,
      }}
    >
      {title && (
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            fontFamily: 'Inter, system-ui, sans-serif',
            color: ftChartColors.text.primary,
            margin: 0,
          }}
        >
          {title}
        </h3>
      )}
      <div
        style={{
          height: `${height}px`,
          minHeight: `${height}px`,
          width: '100%',
          position: 'relative',
          display: 'block',
        }}
      >
        {children}
      </div>
    </div>
  );
};

