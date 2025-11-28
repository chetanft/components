import React from 'react';
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
  const handleItemClick = (label: string) => {
    onNavigate?.(label);
  };

  const handleFooterButtonClick = (buttonType: 'announcement' | 'releases') => {
    onFooterButtonClick?.(buttonType);
  };

  return (
    <div className={cn("bg-[var(--color-bg-secondary)] relative rounded-[var(--radius-xl)] size-full", className)}>
      <div className="box-border content-stretch flex flex-col gap-[var(--spacing-x2)] items-start justify-start overflow-clip p-[var(--spacing-x2)] relative size-full">
        <div className="bg-[var(--color-bg-primary)] h-[568px] relative rounded-[var(--radius-xl)] shrink-0 w-full">
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
                <Icon name="close-filled" size={24} className="text-[var(--color-primary)]" />
              </button>
            </div>

            {/* Main Content */}
            <div className="bg-[var(--color-bg-primary)] box-border content-stretch flex gap-[var(--spacing-x5)] h-[492px] items-start justify-start px-[var(--spacing-x5)] py-0 relative shrink-0 w-full">
              <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />

              {/* Left Sidebar */}
              <div className="box-border content-stretch flex flex-col gap-[var(--spacing-x3)] h-[492px] items-start justify-start overflow-clip px-0 py-[var(--spacing-x5)] relative shrink-0 w-[263px]">
                <div className="content-stretch flex flex-col gap-[var(--spacing-x3)] h-[472px] items-start justify-start overflow-x-clip overflow-y-auto relative shrink-0 w-full">

                  {/* Summary Page */}
                  <div
                    className={cn(
                      "bg-[var(--color-bg-primary)] box-border content-stretch flex gap-[var(--spacing-x3)] items-center justify-start p-[var(--spacing-x3)] relative rounded-[var(--radius-md)] shrink-0 w-full cursor-pointer transition-colors hover:bg-[var(--color-bg-secondary)]"
                    )}
                    onClick={() => handleItemClick('Summary Page')}
                  >
                    <Icon name="dashboard" size={16} className="text-[var(--color-primary)]" />
                    <div className="font-['Inter:Semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[var(--color-primary)] text-[var(--font-size-md)] text-nowrap">
                      <p className="leading-[1.4] whitespace-pre">Summary Page</p>
                    </div>
                  </div>

                  {/* Planning */}
                  <div className="content-stretch flex flex-col gap-[var(--spacing-x3)] items-start justify-start relative shrink-0 w-full">
                    <div
                      className={cn(
                        "bg-[var(--color-bg-primary)] box-border content-stretch flex gap-[var(--spacing-x3)] items-center justify-start p-[var(--spacing-x3)] relative rounded-[var(--radius-md)] shrink-0 w-full cursor-pointer transition-colors hover:bg-[var(--color-bg-secondary)]"
                      )}
                      onClick={() => handleItemClick('Planning')}
                    >
                      <Icon name="planning" size={16} className="text-[var(--color-primary)]" />
                      <div className="font-['Inter:Semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[var(--color-primary)] text-[var(--font-size-md)] text-nowrap">
                        <p className="leading-[1.4] whitespace-pre">Planning</p>
                      </div>
                    </div>
                  </div>

                  {/* Full Truck Load - Selected */}
                  <div className="bg-[var(--color-bg-secondary)] box-border content-stretch flex items-center justify-between p-[var(--spacing-x3)] relative rounded-[var(--radius-md)] shrink-0 w-full">
                    <div
                      className="content-stretch flex gap-[var(--spacing-x3)] items-center justify-start relative shrink-0 cursor-pointer"
                      onClick={() => handleItemClick('Full Truck Load')}
                    >
                      <Icon name="truck" size={16} className="text-[var(--color-primary)]" />
                      <div className="font-['Inter:Semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[var(--color-primary)] text-[var(--font-size-md)] text-nowrap">
                        <p className="leading-[1.4] whitespace-pre">Full Truck Load</p>
                      </div>
                    </div>
                    <Icon name="chevron-right" size={16} className="text-[var(--color-primary)]" />
                  </div>

                  {/* Part Truck Load */}
                  <button
                    className="bg-[var(--color-bg-primary)] box-border content-stretch cursor-pointer flex items-center justify-between overflow-visible p-[var(--spacing-x3)] relative rounded-[var(--radius-md)] shrink-0 w-full transition-colors hover:bg-[var(--color-bg-secondary)]"
                    onClick={() => handleItemClick('Part Truck Load')}
                  >
                    <div className="content-stretch flex gap-[var(--spacing-x3)] items-center justify-start relative shrink-0">
                      <Icon name="part-truck-load" size={16} className="text-[var(--color-primary)]" />
                      <div className="font-['Inter:Semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[var(--color-primary)] text-[var(--font-size-md)] text-nowrap">
                        <p className="leading-[1.4] whitespace-pre">Part Truck Load</p>
                      </div>
                    </div>
                    <Icon name="chevron-right" size={16} className="text-[var(--color-primary)]" />
                  </button>

                  {/* Control Tower */}
                  <div className="content-stretch flex flex-col gap-[var(--spacing-x3)] items-start justify-start relative shrink-0 w-[263px]">
                    <div
                      className="bg-[var(--color-bg-primary)] box-border content-stretch flex gap-[var(--spacing-x3)] items-center justify-start p-[var(--spacing-x3)] relative rounded-[var(--radius-md)] shrink-0 w-full cursor-pointer transition-colors hover:bg-[var(--color-bg-secondary)]"
                      onClick={() => handleItemClick('Control Tower')}
                    >
                      <Icon name="control-tower" size={16} className="text-[var(--color-primary)]" />
                      <div className="font-['Inter:Semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[var(--color-primary)] text-[var(--font-size-md)] text-nowrap">
                        <p className="leading-[1.4] whitespace-pre">Control Tower</p>
                      </div>
                    </div>
                  </div>

                  {/* Dashboard */}
                  <div
                    className="bg-[var(--color-bg-primary)] box-border content-stretch flex items-center justify-between p-[var(--spacing-x3)] relative rounded-[var(--radius-md)] shrink-0 w-full cursor-pointer transition-colors hover:bg-[var(--color-bg-secondary)]"
                    onClick={() => handleItemClick('Dashboard')}
                  >
                    <div className="content-stretch flex gap-[var(--spacing-x3)] items-center justify-start relative shrink-0">
                      <Icon name="dashboard" size={16} className="text-[var(--color-primary)]" />
                      <div className="font-['Inter:Semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[var(--color-primary)] text-[var(--font-size-md)] text-nowrap">
                        <p className="leading-[1.4] whitespace-pre">Dashboard</p>
                      </div>
                    </div>
                    <Icon name="chevron-right" size={16} className="text-[var(--color-primary)]" />
                  </div>

                  {/* Reports */}
                  <div className="content-stretch flex flex-col gap-[var(--spacing-x3)] items-start justify-start relative shrink-0 w-[263px]">
                    <div
                      className="bg-[var(--color-bg-primary)] box-border content-stretch flex gap-[var(--spacing-x3)] items-center justify-start p-[var(--spacing-x3)] relative rounded-[var(--radius-md)] shrink-0 w-full cursor-pointer transition-colors hover:bg-[var(--color-bg-secondary)]"
                      onClick={() => handleItemClick('Reports')}
                    >
                      <Icon name="reports" size={16} className="text-[var(--color-primary)]" />
                      <div className="font-['Inter:Semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[var(--color-primary)] text-[var(--font-size-md)] text-nowrap">
                        <p className="leading-[1.4] whitespace-pre">Reports</p>
                      </div>
                    </div>
                  </div>

                  {/* Onboarding */}
                  <button
                    className="bg-[var(--color-bg-primary)] box-border content-stretch cursor-pointer flex items-center justify-between overflow-visible p-[var(--spacing-x3)] relative rounded-[var(--radius-md)] shrink-0 w-full transition-colors hover:bg-[var(--color-bg-secondary)]"
                    onClick={() => handleItemClick('Onboarding')}
                  >
                    <div className="content-stretch flex gap-[var(--spacing-x3)] items-center justify-start relative shrink-0">
                      <Icon name="data-stack" size={16} className="text-[var(--color-primary)]" />
                      <div className="font-['Inter:Semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[var(--color-primary)] text-[var(--font-size-md)] text-nowrap">
                        <p className="leading-[1.4] whitespace-pre">Onboarding</p>
                      </div>
                    </div>
                    <Icon name="chevron-right" size={16} className="text-[var(--color-primary)]" />
                  </button>

                  {/* Support */}
                  <div
                    className="bg-[var(--color-bg-primary)] box-border content-stretch flex gap-[var(--spacing-x3)] items-center justify-start p-[var(--spacing-x3)] relative rounded-[var(--radius-md)] shrink-0 w-full cursor-pointer transition-colors hover:bg-[var(--color-bg-secondary)]"
                    onClick={() => handleItemClick('Support')}
                  >
                    <Icon name="user" size={16} className="text-[var(--color-primary)]" />
                    <div className="font-['Inter:Semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[var(--color-primary)] text-[var(--font-size-md)] text-nowrap">
                      <p className="leading-[1.4] whitespace-pre">Support</p>
                    </div>
                  </div>

                  {/* Spacer */}
                  <Spacer size="x5" className="bg-[var(--color-bg-primary)]" />
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="flex h-[550px] items-center justify-center relative shrink-0 w-[1px]">
                <div className="h-full w-[1px] bg-[var(--color-border-primary)]"></div>
              </div>

              {/* Right Content Area - Submenu Columns */}
              <div className="basis-0 box-border content-stretch flex gap-[var(--spacing-x8)] grow h-full items-start justify-start min-h-px min-w-px pb-[var(--spacing-x5)] pt-[var(--spacing-x8)] px-0 relative shrink-0">

                {/* INDENT Column */}
                <div className="basis-0 bg-[var(--color-bg-primary)] content-stretch flex flex-col gap-[var(--spacing-x4)] grow items-start justify-start min-h-px min-w-px overflow-clip relative shrink-0">
                  <div className="box-border content-stretch flex gap-[var(--spacing-x3)] items-center justify-center pl-[var(--spacing-x3)] pr-0 py-0 relative shrink-0">
                    <div className="font-['Inter:Semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[var(--color-tertiary)] text-[var(--font-size-sm)] w-[102px]">
                      <p className="leading-[1.4]">INDENT</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col gap-[var(--spacing-x3)] items-start justify-start relative shrink-0 w-full">
                    <div
                      className="bg-[var(--color-bg-primary)] box-border content-stretch flex gap-[var(--spacing-x3)] items-center justify-start p-[var(--spacing-x3)] relative rounded-[var(--radius-md)] shrink-0 w-full cursor-pointer transition-colors hover:bg-[var(--color-bg-secondary)]"
                      onClick={() => handleItemClick('My Indents')}
                    >
                      <Icon name="indent" size={16} className="text-[var(--color-primary)]" />
                      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[var(--color-primary)] text-[var(--font-size-md)] text-nowrap">
                        <p className="leading-[1.4] whitespace-pre">My Indents</p>
                      </div>
                    </div>
                    <div
                      className="bg-[var(--color-bg-primary)] box-border content-stretch flex gap-[var(--spacing-x3)] items-center justify-start p-[var(--spacing-x3)] relative rounded-[var(--radius-md)] shrink-0 w-full cursor-pointer transition-colors hover:bg-[var(--color-bg-secondary)]"
                      onClick={() => handleItemClick('Assigned Vehicles')}
                    >
                      <Icon name="vehicle" size={16} className="text-[var(--color-primary)]" />
                      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[var(--color-primary)] text-[var(--font-size-md)] text-nowrap">
                        <p className="leading-[1.4] whitespace-pre">Assigned Vehicles</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* TRACKING Column */}
                <div className="basis-0 bg-[var(--color-bg-primary)] content-stretch flex flex-col gap-[var(--spacing-x4)] grow items-start justify-start min-h-px min-w-px overflow-clip relative shrink-0">
                  <div className="box-border content-stretch flex gap-[var(--spacing-x3)] items-center justify-center pl-[var(--spacing-x3)] pr-0 py-0 relative shrink-0">
                    <div className="font-['Inter:Semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[var(--color-tertiary)] text-[var(--font-size-sm)] text-nowrap">
                      <p className="leading-[1.4] whitespace-pre">TRACKING</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col gap-[var(--spacing-x3)] items-start justify-start relative shrink-0 w-full">
                    <button
                      className="bg-[var(--color-bg-secondary)] box-border content-stretch cursor-pointer flex gap-[var(--spacing-x3)] items-center justify-start overflow-visible p-[var(--spacing-x3)] relative rounded-[var(--radius-md)] shrink-0 w-full"
                      onClick={() => handleItemClick('My Journeys')}
                    >
                      <Icon name="my-trip" size={16} className="text-[var(--color-primary)]" />
                      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[var(--color-primary)] text-[var(--font-size-md)] text-nowrap">
                        <p className="leading-[1.4] whitespace-pre">My Journeys</p>
                      </div>
                    </button>

                    <div
                      className="bg-[var(--color-bg-primary)] box-border content-stretch flex gap-[var(--spacing-x3)] items-center justify-start p-[var(--spacing-x3)] relative rounded-[var(--radius-md)] shrink-0 w-full cursor-pointer transition-colors hover:bg-[var(--color-bg-secondary)]"
                      onClick={() => handleItemClick('History')}
                    >
                      <Icon name="time" size={16} className="text-[var(--color-primary)]" />
                      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[var(--color-primary)] text-[var(--font-size-md)] text-nowrap">
                        <p className="leading-[1.4] whitespace-pre">History</p>
                      </div>
                    </div>

                    <div
                      className="bg-[var(--color-bg-primary)] box-border content-stretch flex gap-[var(--spacing-x3)] items-center justify-start p-[var(--spacing-x3)] relative rounded-[var(--radius-md)] shrink-0 w-full cursor-pointer transition-colors hover:bg-[var(--color-bg-secondary)]"
                      onClick={() => handleItemClick('Live View')}
                    >
                      <Icon name="location" size={16} className="text-[var(--color-primary)]" />
                      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[var(--color-primary)] text-[var(--font-size-md)] text-nowrap">
                        <p className="leading-[1.4] whitespace-pre">Live View</p>
                      </div>
                    </div>

                    <div className="bg-[var(--color-bg-primary)] box-border content-stretch flex items-center justify-between p-[var(--spacing-x3)] relative rounded-[var(--radius-md)] shrink-0 w-full">
                      <div className="content-stretch flex gap-[var(--spacing-x3)] items-center justify-start relative shrink-0">
                        <Icon name="warehouse" size={16} className="text-[var(--color-tertiary)]" />
                        <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[var(--color-tertiary)] text-[var(--font-size-md)] text-nowrap">
                          <p className="leading-[1.4] whitespace-pre">Yard Management</p>
                        </div>
                      </div>
                      <Icon name="chevron-right" size={16} className="text-[var(--color-tertiary)]" />
                    </div>

                    <div
                      className="bg-[var(--color-bg-primary)] box-border content-stretch flex gap-[var(--spacing-x3)] items-center justify-start p-[var(--spacing-x3)] relative rounded-[var(--radius-md)] shrink-0 w-full cursor-pointer transition-colors hover:bg-[var(--color-bg-secondary)]"
                      onClick={() => handleItemClick('Dedicated Vehicles')}
                    >
                      <Icon name="vehicle" size={16} className="text-[var(--color-primary)]" />
                      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[var(--color-primary)] text-[var(--font-size-md)] text-nowrap">
                        <p className="leading-[1.4] whitespace-pre">Dedicated Vehicles</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FREIGHT INVOICING Column */}
                <div className="basis-0 bg-[var(--color-bg-primary)] content-stretch flex flex-col gap-[var(--spacing-x4)] grow items-start justify-start min-h-px min-w-px overflow-clip relative shrink-0">
                  <div className="box-border content-stretch flex gap-[var(--spacing-x3)] items-center justify-center pl-[var(--spacing-x3)] pr-0 py-0 relative shrink-0">
                    <div className="font-['Inter:Semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[var(--color-tertiary)] text-[var(--font-size-sm)] text-nowrap">
                      <p className="leading-[1.4] whitespace-pre">FREIGHT INVOICING</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col gap-[var(--spacing-x3)] items-start justify-start relative shrink-0 w-full">
                    <div
                      className="bg-[var(--color-bg-primary)] box-border content-stretch flex gap-[var(--spacing-x3)] items-center justify-start p-[var(--spacing-x3)] relative rounded-[var(--radius-md)] shrink-0 w-full cursor-pointer transition-colors hover:bg-[var(--color-bg-secondary)]"
                      onClick={() => handleItemClick('Freight Bill')}
                    >
                      <Icon name="document" size={16} className="text-[var(--color-primary)]" />
                      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[var(--color-primary)] text-[var(--font-size-md)] text-nowrap">
                        <p className="leading-[1.4] whitespace-pre">Freight Bill</p>
                      </div>
                    </div>

                    <div
                      className="bg-[var(--color-bg-primary)] box-border content-stretch flex gap-[var(--spacing-x3)] items-center justify-start p-[var(--spacing-x3)] relative rounded-[var(--radius-md)] shrink-0 w-full cursor-pointer transition-colors hover:bg-[var(--color-bg-secondary)]"
                      onClick={() => handleItemClick('Reconcilation')}
                    >
                      <Icon name="reconciliation" size={16} className="text-[var(--color-primary)]" />
                      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[var(--color-primary)] text-[var(--font-size-md)] text-nowrap">
                        <p className="leading-[1.4] whitespace-pre">Reconcilation</p>
                      </div>
                    </div>

                    <div
                      className="bg-[var(--color-bg-primary)] box-border content-stretch flex gap-[var(--spacing-x3)] items-center justify-start p-[var(--spacing-x3)] relative rounded-[var(--radius-md)] shrink-0 w-full cursor-pointer transition-colors hover:bg-[var(--color-bg-secondary)]"
                      onClick={() => handleItemClick('Dispute Management')}
                    >
                      <Icon name="alert-critical" size={16} className="text-[var(--color-primary)]" />
                      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[var(--color-primary)] text-[var(--font-size-md)] text-nowrap">
                        <p className="leading-[1.4] whitespace-pre">Dispute Management</p>
                      </div>
                    </div>

                    <div
                      className="bg-[var(--color-bg-primary)] box-border content-stretch flex gap-[var(--spacing-x3)] items-center justify-start p-[var(--spacing-x3)] relative rounded-[var(--radius-md)] shrink-0 w-full cursor-pointer transition-colors hover:bg-[var(--color-bg-secondary)]"
                      onClick={() => handleItemClick('Contracts')}
                    >
                      <Icon name="contracted-bill" size={16} className="text-[var(--color-primary)]" />
                      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[var(--color-primary)] text-[var(--font-size-md)] text-nowrap">
                        <p className="leading-[1.4] whitespace-pre">Contracts</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border border-[var(--color-border-primary)] border-solid inset-0 pointer-events-none rounded-[var(--radius-xl)]" />
        </div>

        {/* Footer */}
        <div className="box-border content-stretch flex items-center justify-between px-[var(--spacing-x5)] py-[var(--spacing-x3)] relative shrink-0 w-full">
          <button
            className="box-border content-stretch flex gap-[var(--spacing-x2)] h-[48px] items-center justify-center px-[var(--spacing-x6)] py-[var(--spacing-x3)] relative rounded-[var(--radius-md)] shrink-0 cursor-pointer transition-colors hover:bg-[var(--color-bg-secondary)]"
            onClick={() => handleFooterButtonClick('announcement')}
          >
            <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-end leading-[0] not-italic relative shrink-0 text-[var(--color-primary)] text-[0px] text-nowrap tracking-[0.0264px]">
              <p className="leading-[1.4] whitespace-pre">
                <span className="text-[var(--font-size-lg)]">{`New: Google drive integration  `}</span>
                <span className="font-['Inter:Regular',_sans-serif] font-normal not-italic text-[var(--font-size-md)]">Store reports directly in google drive</span>
              </p>
            </div>
          </button>
          <button
            className="content-stretch flex gap-[var(--spacing-x2)] items-center justify-start relative rounded-[var(--radius-md)] shrink-0 cursor-pointer transition-colors hover:bg-[var(--color-neutral-light)] px-2 py-1"
            onClick={() => handleFooterButtonClick('releases')}
          >
            <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-end leading-[0] not-italic relative shrink-0 text-[var(--color-neutral)] text-[var(--font-size-lg)] text-nowrap tracking-[0.0264px]">
              <p className="leading-[1.4] whitespace-pre">New Releases</p>
            </div>
          </button>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[var(--color-border-primary)] border-solid inset-0 pointer-events-none rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)]" />
    </div>
  );
};

NavigationMenu.displayName = 'NavigationMenu';
