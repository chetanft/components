import React from 'react';
import { cn } from '../../../lib/utils';
import { Spacer } from '../../atoms/Spacer';

export interface GraphsProps {
  /**
   * Additional CSS classes
   */
  className?: string;
}

export const Graphs: React.FC<GraphsProps> = ({ className = '' }) => {
  return (
    <div className={cn("content-stretch flex flex-col items-start relative size-full", className)} data-name="Type=Bar chart" data-node-id="4026:14389">
      {/* Title */}
      <div className="flex flex-col font-semibold justify-end leading-[0] not-italic relative shrink-0 text-[12px] text-[#5f697b] whitespace-nowrap" data-node-id="4026:14360">
        <p className="leading-[1.4]">AGEING</p>
      </div>
      
      {/* Spacer 1 - 12px after title */}
      <Spacer size="x3" className="w-full shrink-0" data-name="Spacer" data-node-id="4337:17057" />
      
      {/* Bar Chart */}
      <div className="content-stretch flex flex-[1_0_0] gap-[20px] items-end min-h-px min-w-px relative shrink-0 w-full" data-name="Bar" data-node-id="4026:14362">
        <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start justify-end min-h-px min-w-px relative shrink-0" data-name="Bar" data-node-id="4026:14363">
          <div className="bg-[#ffb3c3] h-[27px] shrink-0 w-full" data-name="Segment" data-node-id="4026:14364" />
          <div className="bg-[#ff809a] h-[43px] shrink-0 w-full" data-name="Segment" data-node-id="4026:14365" />
          <div className="bg-[#ff6384] h-[48px] shrink-0 w-full" data-name="Segment" data-node-id="4026:14366" />
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start justify-end min-h-px min-w-px relative shrink-0" data-name="Bar" data-node-id="4026:14367">
          <div className="bg-[#ffb3c3] h-[25px] shrink-0 w-full" data-name="Segment" data-node-id="4026:14368" />
          <div className="bg-[#ff809a] h-[35px] shrink-0 w-full" data-name="Segment" data-node-id="4026:14369" />
          <div className="bg-[#ff6384] h-[36px] shrink-0 w-full" data-name="Segment" data-node-id="4026:14370" />
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start justify-end min-h-px min-w-px relative shrink-0" data-name="Bar" data-node-id="4026:14371">
          <div className="bg-[#ffb3c3] h-[27px] shrink-0 w-full" data-name="Segment" data-node-id="4026:14372" />
          <div className="bg-[#ff809a] h-[33px] shrink-0 w-full" data-name="Segment" data-node-id="4026:14373" />
          <div className="bg-[#ff6384] h-[23px] shrink-0 w-full" data-name="Segment" data-node-id="4026:14374" />
        </div>
      </div>
      
      {/* Spacer 2 - 12px after bar chart */}
      <Spacer size="x3" className="w-full shrink-0" data-name="Spacer" data-node-id="4337:17142" />
      
      {/* X-axis Labels */}
      <div className="content-stretch flex font-normal gap-[20px] items-start leading-[0] relative shrink-0 text-[10px] text-[#434f64] text-center w-full" data-name="Time Label" data-node-id="4026:14375">
        <div className="flex-[1_0_0] min-h-px min-w-px relative shrink-0" data-node-id="4026:14376">
          <p className="leading-[1.4] whitespace-pre-wrap">4+ hrs</p>
        </div>
        <div className="flex-[1_0_0] min-h-px min-w-px relative shrink-0" data-node-id="4026:14377">
          <p className="leading-[1.4] whitespace-pre-wrap">2-4 hrs</p>
        </div>
        <div className="flex-[1_0_0] min-h-px min-w-px relative shrink-0" data-node-id="4026:14378">
          <p className="leading-[1.4] whitespace-pre-wrap">{`<2 hrs`}</p>
        </div>
      </div>
      
      {/* Spacer 3 - 20px after x-axis labels */}
      <Spacer size="x5" className="w-full shrink-0" data-name="Spacer" data-node-id="4337:16993" />
      
      {/* Legend */}
      <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Container" data-node-id="4026:14379">
        <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container" data-node-id="4026:14380">
          <div className="flex items-center justify-center relative shrink-0 size-[12px]">
            <div className="bg-[#ff6384] size-[12px] rounded-sm" />
          </div>
          <div className="font-normal leading-[0] not-italic relative shrink-0 text-[10px] text-[#434f64] whitespace-nowrap" data-node-id="4026:14382">
            <p className="leading-[1.4]">Laxmi Transporters</p>
          </div>
        </div>
        <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container" data-node-id="4026:14383">
          <div className="flex items-center justify-center relative shrink-0 size-[12px]">
            <div className="bg-[#ff809a] size-[12px] rounded-sm" />
          </div>
          <div className="font-normal leading-[0] not-italic relative shrink-0 text-[10px] text-[#434f64] whitespace-nowrap" data-node-id="4026:14385">
            <p className="leading-[1.4]">Singh Transporters</p>
          </div>
        </div>
        <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container" data-node-id="4026:14386">
          <div className="flex items-center justify-center relative shrink-0 size-[12px]">
            <div className="bg-[#ffb3c3] size-[12px] rounded-sm" />
          </div>
          <div className="font-normal leading-[0] not-italic relative shrink-0 text-[10px] text-[#434f64] whitespace-nowrap" data-node-id="4026:14388">
            <p className="leading-[1.4]">Others</p>
          </div>
        </div>
      </div>
    </div>
  );
};

Graphs.displayName = 'Graphs';