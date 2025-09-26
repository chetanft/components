import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons/Icon';

export interface CardProps {
  /**
   * Card content variant
   */
  content?: "Basic" | "Advanced";
  
  /**
   * Card state
   */
  state?: "Default";
  
  /**
   * Show eyebrow section
   */
  showEyebrow?: boolean;
  
  /**
   * Show footer section
   */
  showFooter?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

const Spacer: React.FC = () => (
  <div className="bg-[#ffffff] h-[20px] shrink-0 w-full" />
);

const CardElements: React.FC<{ type?: 'Eyebrow' | 'Header' | 'Body' }> = ({ type = 'Eyebrow' }) => {
  if (type === 'Header') {
    return (
      <div className="content-stretch flex items-center justify-between relative size-full">
        <div className="box-border content-stretch flex flex-[1_0_0] gap-[20px] items-start min-h-px min-w-px px-[20px] py-0 relative shrink-0">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px relative shrink-0">
            <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full">
              <div className="font-semibold leading-[0] relative shrink-0 text-[20px] text-[#434f64] whitespace-nowrap">
                <p className="leading-[1.4]">Text</p>
              </div>
              <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0">
                <div className="font-normal leading-[0] relative shrink-0 text-[14px] text-[#5f697b] w-[56px]">
                  <p className="leading-[1.4] whitespace-pre-wrap">Sub text</p>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-[1_0_0] gap-[20px] items-center justify-end min-h-px min-w-px relative shrink-0">
            <Icon name="arrow-top-right" size={16} className="text-[#434f64]" />
          </div>
        </div>
      </div>
    );
  }
  
  if (type === 'Body') {
    return (
      <div className="content-stretch flex items-center justify-between relative size-full">
        <div className="box-border content-stretch flex flex-[1_0_0] gap-[20px] items-start min-h-px min-w-px px-[20px] py-0 relative shrink-0">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px relative shrink-0">
            <div className="box-border content-stretch flex flex-col gap-[8px] items-start justify-center p-[0px] relative shrink-0 w-full">
              <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-[57px]">
                <div className="font-normal leading-[0] relative shrink-0 text-[16px] text-[#434f64] whitespace-nowrap">
                  <p className="leading-[1.4]">Text</p>
                </div>
              </div>
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                <div className="font-medium leading-[0] relative shrink-0 text-[14px] text-[#5f697b] whitespace-nowrap">
                  <p className="leading-[1.4]">Label</p>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-end justify-center min-h-px min-w-px relative shrink-0">
            <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                <div className="font-medium leading-[0] relative shrink-0 text-[14px] text-[#5f697b] whitespace-nowrap">
                  <p className="leading-[1.4]">Label</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-[183px]">
                <div className="font-normal leading-[0] relative shrink-0 text-[16px] text-[#434f64] whitespace-nowrap">
                  <p className="leading-[1.4]">Text</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Eyebrow type
  return (
    <div className="content-stretch flex items-center justify-between relative size-full">
      <div className="box-border content-stretch flex flex-[1_0_0] gap-[20px] items-start min-h-px min-w-px px-[20px] py-0 relative shrink-0">
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[10px] items-start justify-center min-h-px min-w-px relative shrink-0">
          <div className="bg-[#f0f1f7] box-border content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[2px] relative rounded-[4px] shrink-0">
            <div className="font-semibold leading-[0] relative shrink-0 text-[14px] text-[#434f64] whitespace-nowrap">
              <p className="leading-[1.4]">Active</p>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[10px] items-end min-h-px min-w-px relative shrink-0">
          <div className="bg-[#f0f1f7] box-border content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[2px] relative rounded-[4px] shrink-0">
            <div className="font-semibold leading-[0] relative shrink-0 text-[14px] text-[#434f64] whitespace-nowrap">
              <p className="leading-[1.4]">Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardFooter: React.FC<{ padding?: boolean }> = ({ padding = true }) => {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[0px] px-[0px] relative shrink-0 w-full">
      {/* Divider */}
      <div className="box-border content-stretch flex items-center justify-between pl-0 pr-[36px] py-[0px] relative shrink-0 w-full">
        <div className="flex-[1_0_0] h-0 min-h-px min-w-px mr-[-36px] relative shrink-0">
          <div className="absolute inset-[-0.5px_-0.09%] border-t border-[#ced1d7]" />
        </div>
      </div>
      <Spacer />
      <div className={cn(
        "box-border content-stretch flex gap-[16px] items-center py-0 relative shrink-0 w-full",
        padding ? "px-[20px]" : "px-0"
      )}>
        <div className="box-border content-stretch flex flex-[1_0_0] gap-[20px] items-center justify-center min-h-px min-w-px px-[0px] py-0 relative shrink-0">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center justify-center min-h-px min-w-px relative shrink-0">
            <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full">
              <div className="font-bold leading-[0] relative shrink-0 text-[16px] text-[#434f64] whitespace-nowrap">
                <p className="leading-[1.4]">Text</p>
              </div>
            </div>
          </div>
        </div>
        <div className="box-border content-stretch flex flex-[1_0_0] gap-[20px] items-center justify-center min-h-px min-w-px px-[0px] py-0 relative shrink-0">
          <div className="content-stretch flex flex-[1_0_0] gap-[20px] items-center justify-end min-h-px min-w-px relative shrink-0">
            <div className="bg-[#434f64] box-border content-stretch flex gap-[8px] h-[40px] items-center justify-center px-[24px] py-[0px] relative rounded-[8px] shrink-0">
              <Icon name="add" size={16} className="text-white" />
              <div className="flex flex-col font-medium justify-end leading-[0] relative shrink-0 text-[#ffffff] text-[16px] whitespace-nowrap">
                <p className="leading-[1.4]">Button</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Card: React.FC<CardProps> = ({
  content = "Basic",
  state = "Default",
  showEyebrow = true,
  showFooter = true,
  className = '',
}) => {
  if (content === "Advanced" && state === "Default") {
    return (
      <div className={cn("bg-[#ffffff] relative rounded-[8px] size-full", className)}>
        <div className="box-border content-stretch flex flex-col gap-[0px] items-start justify-end overflow-clip p-[0px] relative size-full">
          {/* Graphic Section */}
          <div className="bg-[#f6f5fa] content-stretch flex flex-col gap-[10px] h-[175px] items-center justify-center relative shrink-0 w-full">
            <div className="flex-[1_0_0] min-h-px min-w-px relative shrink-0 w-full">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-full h-full flex items-center justify-center">
                  <Icon name="add" size={48} className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          
          <Spacer />
          
          {showEyebrow && (
            <>
              <CardElements type="Eyebrow" />
              <Spacer />
            </>
          )}
          
          <CardElements type="Header" />
          <Spacer />
          
          <CardElements type="Body" />
          <Spacer />
          
          <CardElements type="Body" />
          <Spacer />
          
          {showFooter && (
            <>
              <CardFooter padding={true} />
              <Spacer />
            </>
          )}
        </div>
        <div aria-hidden="true" className="absolute border border-[#f0f1f7] border-solid inset-[-1px] pointer-events-none rounded-[9px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.1)]" />
      </div>
    );
  }
  
  // Basic content
  return (
    <div className={cn("bg-[#ffffff] relative rounded-[8px] size-full", className)}>
      <div className="box-border content-stretch flex flex-col gap-[0px] items-start justify-end overflow-clip p-[0px] relative size-full">
        <Spacer />
        
        {showEyebrow && (
          <>
            <CardElements type="Eyebrow" />
            <Spacer />
          </>
        )}
        
        <CardElements type="Header" />
        <Spacer />
        
        <CardElements type="Body" />
        <Spacer />
        
        <CardElements type="Body" />
        <Spacer />
        
        {showFooter && (
          <>
            <CardFooter padding={true} />
            <Spacer />
          </>
        )}
      </div>
      <div aria-hidden="true" className="absolute border border-[#f0f1f7] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
};

Card.displayName = 'Card';