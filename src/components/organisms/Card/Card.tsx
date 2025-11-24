import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons/Icon';
import { Divider } from '../../atoms/Divider';
import { Spacer } from '../../atoms/Spacer';

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

  /**
   * Card children
   */
  children?: React.ReactNode;
}

const CardElements: React.FC<{ type?: 'Eyebrow' | 'Header' | 'Body' }> = ({ type = 'Eyebrow' }) => {
  if (type === 'Header') {
    return (
      <div className="content-stretch flex items-center justify-between relative size-full">
        <div className="box-border content-stretch flex flex-[1_0_0] gap-[20px] items-start min-h-px min-w-px px-[20px] py-0 relative shrink-0">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px relative shrink-0">
            <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full">
              <div className="font-semibold leading-[0] relative shrink-0 text-[20px] text-primary whitespace-nowrap">
                <p className="leading-[1.4]">Text</p>
              </div>
              <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0">
                <div className="font-normal leading-[0] relative shrink-0 text-[14px] text-secondary w-[56px]">
                  <p className="leading-[1.4] whitespace-pre-wrap">Sub text</p>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-[1_0_0] gap-[20px] items-center justify-end min-h-px min-w-px relative shrink-0">
            <Icon name="arrow-top-right" size={16} className="text-primary" />
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
                <div className="font-normal leading-[0] relative shrink-0 text-[16px] text-primary whitespace-nowrap">
                  <p className="leading-[1.4]">Text</p>
                </div>
              </div>
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                <div className="font-medium leading-[0] relative shrink-0 text-[14px] text-secondary whitespace-nowrap">
                  <p className="leading-[1.4]">Label</p>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-end justify-center min-h-px min-w-px relative shrink-0">
            <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                <div className="font-medium leading-[0] relative shrink-0 text-[14px] text-secondary whitespace-nowrap">
                  <p className="leading-[1.4]">Label</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-[183px]">
                <div className="font-normal leading-[0] relative shrink-0 text-[16px] text-primary whitespace-nowrap">
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
          <div className="bg-surface-alt box-border content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[2px] relative rounded-component shrink-0">
            <div className="font-semibold leading-[0] relative shrink-0 text-[14px] text-primary whitespace-nowrap">
              <p className="leading-[1.4]">Active</p>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[10px] items-end min-h-px min-w-px relative shrink-0">
          <div className="bg-surface-alt box-border content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[2px] relative rounded-component shrink-0">
            <div className="font-semibold leading-[0] relative shrink-0 text-[14px] text-primary whitespace-nowrap">
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
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-0 px-0 relative shrink-0 w-full">
      <Divider type="primary" className="w-full" />
      <Spacer size="x5" />
      <div
        className={cn(
          "box-border content-stretch flex gap-[16px] items-center py-0 relative shrink-0 w-full",
          padding ? "px-[20px]" : "px-0"
        )}
      >
        <div className="box-border content-stretch flex flex-[1_0_0] gap-[20px] items-center justify-center min-h-px min-w-px px-[0px] py-0 relative shrink-0">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center justify-center min-h-px min-w-px relative shrink-0">
            <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full">
              <div className="font-bold leading-[0] relative shrink-0 text-[16px] text-primary whitespace-nowrap">
                <p className="leading-[1.4]">Text</p>
              </div>
            </div>
          </div>
        </div>
        <div className="box-border content-stretch flex flex-[1_0_0] gap-[20px] items-center justify-center min-h-px min-w-px px-[0px] py-0 relative shrink-0">
          <div className="content-stretch flex flex-[1_0_0] gap-[20px] items-center justify-end min-h-px min-w-px relative shrink-0">
            <div className="bg-primary box-border content-stretch flex gap-[8px] h-[40px] items-center justify-center px-[24px] py-[0px] relative rounded-component shrink-0">
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
  children,
}) => {
  if (children) {
    return (
      <div className={cn("bg-surface relative rounded-component border border-border shadow-sm", className)}>
        {children}
      </div>
    );
  }

  if (content === "Advanced" && state === "Default") {
    return (
      <div className={cn("bg-surface relative rounded-component size-full border border-border shadow-sm", className)}>
        <div className="box-border content-stretch flex flex-col gap-[0px] items-start justify-end overflow-clip p-[0px] relative size-full">
          {/* Graphic Section */}
          <div className="bg-surface-alt content-stretch flex flex-col gap-[10px] h-[175px] items-center justify-center relative shrink-0 w-full">
            <div className="flex-[1_0_0] min-h-px min-w-px relative shrink-0 w-full">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-full h-full flex items-center justify-center">
                  <Icon name="add" size={48} className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          <Spacer size="x5" />

          {showEyebrow && (
            <>
              <CardElements type="Eyebrow" />
              <Spacer size="x5" />
            </>
          )}

          <CardElements type="Header" />
          <Spacer size="x5" />

          <CardElements type="Body" />
          <Spacer size="x5" />

          <CardElements type="Body" />
          <Spacer size="x5" />

          {showFooter && (
            <>
              <CardFooter padding={true} />
              <Spacer size="x5" />
            </>
          )}
        </div>
      </div>
    );
  }

  // Basic content
  return (
    <div className={cn("bg-surface relative rounded-component size-full border border-border shadow-sm", className)}>
      <div className="box-border content-stretch flex flex-col gap-[0px] items-start justify-end overflow-clip p-[0px] relative size-full">
        <Spacer size="x5" />

        {showEyebrow && (
          <>
            <CardElements type="Eyebrow" />
            <Spacer size="x5" />
          </>
        )}

        <CardElements type="Header" />
        <Spacer size="x5" />

        <CardElements type="Body" />
        <Spacer size="x5" />

        <CardElements type="Body" />
        <Spacer size="x5" />

        {showFooter && (
          <>
            <CardFooter padding={true} />
            <Spacer size="x5" />
          </>
        )}
      </div>
    </div>
  );
};

Card.displayName = 'Card';