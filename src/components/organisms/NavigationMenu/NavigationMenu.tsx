import React, { useState } from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons/Icon';
import { FTLogo } from '../../atoms/Logos/FTLogo';
import { Spacer } from '../../atoms/Spacer';

export interface NavigationMenuProps {
  /**
   * Close handler
   */
  onClose?: () => void;
  
  /**
   * Navigation item click handler
   */
  onNavigate?: (itemLabel: string) => void;
  
  /**
   * Footer button click handler
   */
  onFooterButtonClick?: (buttonType: 'announcement' | 'releases') => void;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({
  onClose,
  onNavigate,
  onFooterButtonClick,
  className,
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleItemClick = (label: string) => {
    onNavigate?.(label);
  };

  const handleFooterButtonClick = (buttonType: 'announcement' | 'releases') => {
    onFooterButtonClick?.(buttonType);
  };

  return (
    <div className={cn("bg-[#f8f8f9] relative rounded-[20px] size-full", className)}>
      <div className="box-border content-stretch flex flex-col gap-[8px] items-start justify-start overflow-clip p-[8px] relative size-full">
        <div className="bg-white h-[568px] relative rounded-[16px] shrink-0 w-full">
          <div className="content-stretch flex flex-col h-[568px] items-start justify-start overflow-clip relative w-full">
            
            {/* Header */}
            <div className="box-border content-stretch flex items-center justify-between p-[20px] relative shrink-0 w-full">
              <div className="h-[36px] relative shrink-0 w-[218px]">
                <FTLogo width={218} height={36} />
              </div>
              <button 
                className="block cursor-pointer overflow-clip relative shrink-0 size-[24px]" 
                onClick={onClose}
              >
                <Icon name="close-filled" size={24} className="text-[#434f64]" />
              </button>
            </div>

            {/* Main Content */}
            <div className="bg-white box-border content-stretch flex gap-[20px] h-[492px] items-start justify-start px-[20px] py-0 relative shrink-0 w-full">
              <div aria-hidden="true" className="absolute border-[#ced1d7] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
              
              {/* Left Sidebar */}
              <div className="box-border content-stretch flex flex-col gap-[12px] h-[492px] items-start justify-start overflow-clip px-0 py-[20px] relative shrink-0 w-[263px]">
                <div className="content-stretch flex flex-col gap-[12px] h-[472px] items-start justify-start overflow-x-clip overflow-y-auto relative shrink-0 w-full">
                  
                  {/* Summary Page */}
                  <div 
                    className={cn(
                      "bg-white box-border content-stretch flex gap-[10px] items-center justify-start p-[12px] relative rounded-[8px] shrink-0 w-full cursor-pointer transition-colors hover:bg-gray-50"
                    )}
                    onClick={() => handleItemClick('Summary Page')}
                    onMouseEnter={() => setHoveredItem('Summary Page')}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Icon name="dashboard" size={16} className="text-[#434f64]" />
                    <div className="font-['Inter:Semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#434f64] text-[16px] text-nowrap">
                      <p className="leading-[1.4] whitespace-pre">Summary Page</p>
                    </div>
                  </div>

                  {/* Planning */}
                  <div className="content-stretch flex flex-col gap-[10px] items-start justify-start relative shrink-0 w-full">
                    <div 
                      className={cn(
                        "bg-white box-border content-stretch flex gap-[10px] items-center justify-start p-[12px] relative rounded-[8px] shrink-0 w-full cursor-pointer transition-colors hover:bg-gray-50"
                      )}
                      onClick={() => handleItemClick('Planning')}
                      onMouseEnter={() => setHoveredItem('Planning')}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <Icon name="planning" size={16} className="text-[#434f64]" />
                      <div className="font-['Inter:Semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#434f64] text-[16px] text-nowrap">
                        <p className="leading-[1.4] whitespace-pre">Planning</p>
                      </div>
                    </div>
                  </div>

                  {/* Full Truck Load - Selected */}
                  <div className="bg-[#f8f8f9] box-border content-stretch flex items-center justify-between p-[12px] relative rounded-[8px] shrink-0 w-full">
                    <div 
                      className="content-stretch flex gap-[10px] items-center justify-start relative shrink-0 cursor-pointer"
                      onClick={() => handleItemClick('Full Truck Load')}
                    >
                      <Icon name="truck" size={16} className="text-[#434f64]" />
                      <div className="font-['Inter:Semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#434f64] text-[16px] text-nowrap">
                        <p className="leading-[1.4] whitespace-pre">Full Truck Load</p>
                      </div>
                    </div>
                    <Icon name="chevron-right" size={16} className="text-[#434f64]" />
                  </div>

                  {/* Part Truck Load */}
                  <button 
                    className="bg-white box-border content-stretch cursor-pointer flex items-center justify-between overflow-visible p-[12px] relative rounded-[8px] shrink-0 w-full transition-colors hover:bg-gray-50"
                    onClick={() => handleItemClick('Part Truck Load')}
                    onMouseEnter={() => setHoveredItem('Part Truck Load')}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className="content-stretch flex gap-[10px] items-center justify-start relative shrink-0">
                      <Icon name="part-truck-load" size={16} className="text-[#434f64]" />
                      <div className="font-['Inter:Semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#434f64] text-[16px] text-nowrap">
                        <p className="leading-[1.4] whitespace-pre">Part Truck Load</p>
                      </div>
                    </div>
                    <Icon name="chevron-right" size={16} className="text-[#434f64]" />
                  </button>

                  {/* Control Tower */}
                  <div className="content-stretch flex flex-col gap-[10px] items-start justify-start relative shrink-0 w-[263px]">
                    <div 
                      className="bg-white box-border content-stretch flex gap-[10px] items-center justify-start p-[12px] relative rounded-[8px] shrink-0 w-full cursor-pointer transition-colors hover:bg-gray-50"
                      onClick={() => handleItemClick('Control Tower')}
                      onMouseEnter={() => setHoveredItem('Control Tower')}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <Icon name="control-tower" size={16} className="text-[#434f64]" />
                      <div className="font-['Inter:Semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#434f64] text-[16px] text-nowrap">
                        <p className="leading-[1.4] whitespace-pre">Control Tower</p>
                      </div>
                    </div>
                  </div>

                  {/* Dashboard */}
                  <div 
                    className="bg-white box-border content-stretch flex items-center justify-between p-[12px] relative rounded-[8px] shrink-0 w-full cursor-pointer transition-colors hover:bg-gray-50"
                    onClick={() => handleItemClick('Dashboard')}
                    onMouseEnter={() => setHoveredItem('Dashboard')}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className="content-stretch flex gap-[10px] items-center justify-start relative shrink-0">
                      <Icon name="dashboard" size={16} className="text-[#434f64]" />
                      <div className="font-['Inter:Semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#434f64] text-[16px] text-nowrap">
                        <p className="leading-[1.4] whitespace-pre">Dashboard</p>
                      </div>
                    </div>
                    <Icon name="chevron-right" size={16} className="text-[#434f64]" />
                  </div>

                  {/* Reports */}
                  <div className="content-stretch flex flex-col gap-[10px] items-start justify-start relative shrink-0 w-[263px]">
                    <div 
                      className="bg-white box-border content-stretch flex gap-[10px] items-center justify-start p-[12px] relative rounded-[8px] shrink-0 w-full cursor-pointer transition-colors hover:bg-gray-50"
                      onClick={() => handleItemClick('Reports')}
                      onMouseEnter={() => setHoveredItem('Reports')}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <Icon name="reports" size={16} className="text-[#434f64]" />
                      <div className="font-['Inter:Semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#434f64] text-[16px] text-nowrap">
                        <p className="leading-[1.4] whitespace-pre">Reports</p>
                      </div>
                    </div>
                  </div>

                  {/* Onboarding */}
                  <button 
                    className="bg-white box-border content-stretch cursor-pointer flex items-center justify-between overflow-visible p-[12px] relative rounded-[8px] shrink-0 w-full transition-colors hover:bg-gray-50"
                    onClick={() => handleItemClick('Onboarding')}
                    onMouseEnter={() => setHoveredItem('Onboarding')}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className="content-stretch flex gap-[10px] items-center justify-start relative shrink-0">
                      <Icon name="data-stack" size={16} className="text-[#434f64]" />
                      <div className="font-['Inter:Semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#434f64] text-[16px] text-nowrap">
                        <p className="leading-[1.4] whitespace-pre">Onboarding</p>
                      </div>
                    </div>
                    <Icon name="chevron-right" size={16} className="text-[#434f64]" />
                  </button>

                  {/* Support */}
                  <div 
                    className="bg-white box-border content-stretch flex gap-[10px] items-center justify-start p-[12px] relative rounded-[8px] shrink-0 w-full cursor-pointer transition-colors hover:bg-gray-50"
                    onClick={() => handleItemClick('Support')}
                    onMouseEnter={() => setHoveredItem('Support')}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Icon name="user" size={16} className="text-[#434f64]" />
                    <div className="font-['Inter:Semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#434f64] text-[16px] text-nowrap">
                      <p className="leading-[1.4] whitespace-pre">Support</p>
                    </div>
                  </div>

                  {/* Spacer */}
                  <Spacer size="x5" className="bg-white" />
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="flex h-[550px] items-center justify-center relative shrink-0 w-[1px]">
                <div className="h-full w-[1px] bg-[#ced1d7]"></div>
              </div>

              {/* Right Content Area - Submenu Columns */}
              <div className="basis-0 box-border content-stretch flex gap-[32px] grow h-full items-start justify-start min-h-px min-w-px pb-[20px] pt-[32px] px-0 relative shrink-0">
                
                {/* INDENT Column */}
                <div className="basis-0 bg-white content-stretch flex flex-col gap-[16px] grow items-start justify-start min-h-px min-w-px overflow-clip relative shrink-0">
                  <div className="box-border content-stretch flex gap-[10px] items-center justify-center pl-[12px] pr-0 py-0 relative shrink-0">
                    <div className="font-['Inter:Semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#838c9d] text-[14px] w-[102px]">
                      <p className="leading-[1.4]">INDENT</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col gap-[12px] items-start justify-start relative shrink-0 w-full">
                    <div 
                      className="bg-white box-border content-stretch flex gap-[10px] items-center justify-start p-[12px] relative rounded-[8px] shrink-0 w-full cursor-pointer transition-colors hover:bg-gray-50"
                      onClick={() => handleItemClick('My Indents')}
                    >
                      <Icon name="indent" size={16} className="text-[#434f64]" />
                      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#434f64] text-[16px] text-nowrap">
                        <p className="leading-[1.4] whitespace-pre">My Indents</p>
                      </div>
                    </div>
                    <div 
                      className="bg-white box-border content-stretch flex gap-[10px] items-center justify-start p-[12px] relative rounded-[8px] shrink-0 w-full cursor-pointer transition-colors hover:bg-gray-50"
                      onClick={() => handleItemClick('Assigned Vehicles')}
                    >
                      <Icon name="vehicle" size={16} className="text-[#434f64]" />
                      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#434f64] text-[16px] text-nowrap">
                        <p className="leading-[1.4] whitespace-pre">Assigned Vehicles</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* TRACKING Column */}
                <div className="basis-0 bg-white content-stretch flex flex-col gap-[16px] grow items-start justify-start min-h-px min-w-px overflow-clip relative shrink-0">
                  <div className="box-border content-stretch flex gap-[10px] items-center justify-center pl-[12px] pr-0 py-0 relative shrink-0">
                    <div className="font-['Inter:Semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#838c9d] text-[14px] text-nowrap">
                      <p className="leading-[1.4] whitespace-pre">TRACKING</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col gap-[12px] items-start justify-start relative shrink-0 w-full">
                    <button 
                      className="bg-[#f8f8f9] box-border content-stretch cursor-pointer flex gap-[10px] items-center justify-start overflow-visible p-[12px] relative rounded-[8px] shrink-0 w-full"
                      onClick={() => handleItemClick('My Journeys')}
                    >
                      <Icon name="my-trip" size={16} className="text-[#434f64]" />
                      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#434f64] text-[16px] text-nowrap">
                        <p className="leading-[1.4] whitespace-pre">My Journeys</p>
                      </div>
                    </button>
                    
                    <div 
                      className="bg-white box-border content-stretch flex gap-[10px] items-center justify-start p-[12px] relative rounded-[8px] shrink-0 w-full cursor-pointer transition-colors hover:bg-gray-50"
                      onClick={() => handleItemClick('History')}
                    >
                      <Icon name="time" size={16} className="text-[#434f64]" />
                      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#434f64] text-[16px] text-nowrap">
                        <p className="leading-[1.4] whitespace-pre">History</p>
                      </div>
                    </div>

                    <div 
                      className="bg-white box-border content-stretch flex gap-[10px] items-center justify-start p-[12px] relative rounded-[8px] shrink-0 w-full cursor-pointer transition-colors hover:bg-gray-50"
                      onClick={() => handleItemClick('Live View')}
                    >
                      <Icon name="location" size={16} className="text-[#434f64]" />
                      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#434f64] text-[16px] text-nowrap">
                        <p className="leading-[1.4] whitespace-pre">Live View</p>
                      </div>
                    </div>

                    <div className="bg-white box-border content-stretch flex items-center justify-between p-[12px] relative rounded-[8px] shrink-0 w-full">
                      <div className="content-stretch flex gap-[10px] items-center justify-start relative shrink-0">
                        <Icon name="warehouse" size={16} className="text-[#838c9d]" />
                        <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#838c9d] text-[16px] text-nowrap">
                          <p className="leading-[1.4] whitespace-pre">Yard Management</p>
                        </div>
                      </div>
                      <Icon name="chevron-right" size={16} className="text-[#838c9d]" />
                    </div>

                    <div 
                      className="bg-white box-border content-stretch flex gap-[10px] items-center justify-start p-[12px] relative rounded-[8px] shrink-0 w-full cursor-pointer transition-colors hover:bg-gray-50"
                      onClick={() => handleItemClick('Dedicated Vehicles')}
                    >
                      <Icon name="vehicle" size={16} className="text-[#434f64]" />
                      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#434f64] text-[16px] text-nowrap">
                        <p className="leading-[1.4] whitespace-pre">Dedicated Vehicles</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FREIGHT INVOICING Column */}
                <div className="basis-0 bg-white content-stretch flex flex-col gap-[16px] grow items-start justify-start min-h-px min-w-px overflow-clip relative shrink-0">
                  <div className="box-border content-stretch flex gap-[10px] items-center justify-center pl-[12px] pr-0 py-0 relative shrink-0">
                    <div className="font-['Inter:Semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#838c9d] text-[14px] text-nowrap">
                      <p className="leading-[1.4] whitespace-pre">FREIGHT INVOICING</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col gap-[12px] items-start justify-start relative shrink-0 w-full">
                    <div 
                      className="bg-white box-border content-stretch flex gap-[10px] items-center justify-start p-[12px] relative rounded-[8px] shrink-0 w-full cursor-pointer transition-colors hover:bg-gray-50"
                      onClick={() => handleItemClick('Freight Bill')}
                    >
                      <Icon name="document" size={16} className="text-[#434f64]" />
                      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#434f64] text-[16px] text-nowrap">
                        <p className="leading-[1.4] whitespace-pre">Freight Bill</p>
                      </div>
                    </div>
                    
                    <div 
                      className="bg-white box-border content-stretch flex gap-[10px] items-center justify-start p-[12px] relative rounded-[8px] shrink-0 w-full cursor-pointer transition-colors hover:bg-gray-50"
                      onClick={() => handleItemClick('Reconcilation')}
                    >
                      <Icon name="reconciliation" size={16} className="text-[#434f64]" />
                      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#434f64] text-[16px] text-nowrap">
                        <p className="leading-[1.4] whitespace-pre">Reconcilation</p>
                      </div>
                    </div>
                    
                    <div 
                      className="bg-white box-border content-stretch flex gap-[10px] items-center justify-start p-[12px] relative rounded-[8px] shrink-0 w-full cursor-pointer transition-colors hover:bg-gray-50"
                      onClick={() => handleItemClick('Dispute Management')}
                    >
                      <Icon name="alert-critical" size={16} className="text-[#434f64]" />
                      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#434f64] text-[16px] text-nowrap">
                        <p className="leading-[1.4] whitespace-pre">Dispute Management</p>
                      </div>
                    </div>
                    
                    <div 
                      className="bg-white box-border content-stretch flex gap-[10px] items-center justify-start p-[12px] relative rounded-[8px] shrink-0 w-full cursor-pointer transition-colors hover:bg-gray-50"
                      onClick={() => handleItemClick('Contracts')}
                    >
                      <Icon name="contracted-bill" size={16} className="text-[#434f64]" />
                      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#434f64] text-[16px] text-nowrap">
                        <p className="leading-[1.4] whitespace-pre">Contracts</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border border-[#ced1d7] border-solid inset-0 pointer-events-none rounded-[16px]" />
        </div>

        {/* Footer */}
        <div className="box-border content-stretch flex items-center justify-between px-[20px] py-[12px] relative shrink-0 w-full">
          <button 
            className="box-border content-stretch flex gap-[8px] h-[48px] items-center justify-center px-[24px] py-[12px] relative rounded-[8px] shrink-0 cursor-pointer transition-colors hover:bg-gray-100"
            onClick={() => handleFooterButtonClick('announcement')}
          >
            <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-end leading-[0] not-italic relative shrink-0 text-[#434f64] text-[0px] text-nowrap tracking-[0.0264px]">
              <p className="leading-[1.4] whitespace-pre">
                <span className="text-[20px]">{`New: Google drive integration  `}</span>
                <span className="font-['Inter:Regular',_sans-serif] font-normal not-italic text-[16px]">Store reports directly in google drive</span>
              </p>
            </div>
          </button>
          <button 
            className="content-stretch flex gap-[8px] items-center justify-start relative rounded-[8px] shrink-0 cursor-pointer transition-colors hover:bg-blue-50 px-2 py-1"
            onClick={() => handleFooterButtonClick('releases')}
          >
            <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-end leading-[0] not-italic relative shrink-0 text-[#1890ff] text-[20px] text-nowrap tracking-[0.0264px]">
              <p className="leading-[1.4] whitespace-pre">New Releases</p>
            </div>
          </button>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#ced1d7] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_6px_12px_0px_rgba(0,0,0,0.1)]" />
    </div>
  );
};

NavigationMenu.displayName = 'NavigationMenu';