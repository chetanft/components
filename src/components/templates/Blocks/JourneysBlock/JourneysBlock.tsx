"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { cn } from '../../../../lib/utils';
import { AppHeader } from '../../../organisms/AppHeader';
import { Button } from '../../../atoms/Button/Button';
import { Typography } from '../../../atoms/Typography';
import { Input } from '../../../atoms/Input';
import { Dropdown } from '../../../molecules/Dropdown';
import { DropdownTrigger } from '../../../molecules/Dropdown/DropdownTrigger';
import { DropdownContent } from '../../../molecules/Dropdown/DropdownContent';
import { DropdownMenu } from '../../../molecules/DropdownMenu';
import { DropdownMenuList } from '../../../molecules/DropdownMenu/DropdownMenuList';
import { DropdownMenuItem } from '../../../molecules/DropdownMenu/DropdownMenuItem';
import { DatePicker } from '../../../molecules/DatePicker';
import { Tabs, TabsList, TabsTrigger } from '../../../organisms/Tabs';
import { SegmentedTabs, SegmentedTabItem } from '../../../molecules/SegmentedTabs';
import { Icon } from '../../../atoms/Icons';
import { ComposableDataTable } from '../shared/ComposableDataTable';
import { renderQuickFilters } from '../shared/renderQuickFilters';
import type { Journey, JourneysBlockProps, CompactFilterType } from './JourneysBlock.types';
import {
  DEFAULT_JOURNEYS,
  DEFAULT_JOURNEY_FILTERS,
  JOURNEY_TABS,
  JOURNEY_STATUS_MAP,
  DEFAULT_USER,
  COMPACT_FILTER_CONFIG,
} from './JourneysBlock.constants';
import { getJourneyColumns } from './JourneysBlock.columns';
import { JourneyMobileCard } from './JourneyMobileCard';

export const JourneysBlock: React.FC<JourneysBlockProps> = ({
  journeys = DEFAULT_JOURNEYS,
  filters = DEFAULT_JOURNEY_FILTERS,
  companyOptions = [
    { value: 'mdc-labs', label: 'MDC Labs, Amritsar' },
    { value: 'all', label: 'All Companies' },
  ],
  directionOptions = [
    { value: 'outbound', label: 'Outbound - Source' },
    { value: 'inbound', label: 'Inbound' },
  ],
}) => {
  const [selectedTab, setSelectedTab] = useState(3);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJourneyIds, setSelectedJourneyIds] = useState<number[]>([]);
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());
  const [dateRangeStart, setDateRangeStart] = useState<string>('2024-08-12');
  const [dateRangeEnd, setDateRangeEnd] = useState<string>('2024-09-12');
  const [viewportWidth, setViewportWidth] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1920));
  const [activeCompactFilter, setActiveCompactFilter] = useState<CompactFilterType | null>(null);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = viewportWidth <= 800;
  const isCompactHeader = viewportWidth < 1440;

  useEffect(() => {
    if (!isCompactHeader) {
      setActiveCompactFilter(null);
    }
  }, [isCompactHeader]);

  const toggleCompactFilter = (filter: CompactFilterType) => {
    setActiveCompactFilter((previous) => (previous === filter ? null : filter));
  };

  const filteredByTab = useMemo(() => {
    const status = JOURNEY_STATUS_MAP[selectedTab];
    if (selectedTab === 3) return journeys;
    if (!status) return journeys;
    return journeys.filter((journey) => journey.status === status);
  }, [journeys, selectedTab]);

  const filteredJourneys = useMemo(() => {
    if (activeFilters.size === 0 && !searchTerm) return filteredByTab;
    return filteredByTab.filter((journey) => {
      const matchesFilter = activeFilters.size === 0 || Array.from(activeFilters).some((filter) => {
        if (filter === 'stoppage') return journey.alert_type === 'long_stoppage';
        if (filter === 'deviation') return journey.alert_type === 'route_deviation';
        return true;
      });
      const matchesSearch = !searchTerm || journey.feed_unique_id.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilters, filteredByTab, searchTerm]);

  const tableColumns = useMemo(
    () => getJourneyColumns(selectedJourneyIds, setSelectedJourneyIds),
    [selectedJourneyIds]
  );

  const tableData = filteredJourneys.map((journey) => ({ ...journey, id: journey.journey_id }));

  const renderCompactFilterContent = () => {
    switch (activeCompactFilter) {
      case 'company':
        return (
          <Dropdown placeholder="Select company">
            <DropdownTrigger />
            <DropdownContent>
              <DropdownMenu property="default" className="w-full">
                <DropdownMenuList>
                  {companyOptions.map((opt) => (
                    <DropdownMenuItem key={String(opt.value)} value={String(opt.value)} label={opt.label} />
                  ))}
                </DropdownMenuList>
              </DropdownMenu>
            </DropdownContent>
          </Dropdown>
        );
      case 'dates':
        return (
          <DatePicker
            range
            startValue={dateRangeStart}
            endValue={dateRangeEnd}
            onStartChange={(value) => setDateRangeStart(value)}
            onEndChange={(value) => setDateRangeEnd(value)}
            placeholder="12 Aug, 2024 → 12 Sep 2024"
          />
        );
      case 'direction':
        return (
          <Dropdown placeholder="Direction">
            <DropdownTrigger />
            <DropdownContent>
              <DropdownMenu property="default" className="w-full">
                <DropdownMenuList>
                  {directionOptions.map((opt) => (
                    <DropdownMenuItem key={String(opt.value)} value={String(opt.value)} label={opt.label} />
                  ))}
                </DropdownMenuList>
              </DropdownMenu>
            </DropdownContent>
          </Dropdown>
        );
      case 'search':
        return (
          <Input
            placeholder="Search My Journeys"
            leadingIcon="search"
            value={searchTerm}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
            style={{ width: '100%' }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-[var(--bg-secondary)] w-full rounded-[var(--radius-lg)] overflow-hidden">
      <AppHeader user={DEFAULT_USER} />

      <div className={cn("bg-[var(--bg-primary)]", isMobile ? "p-[var(--spacing-x3)]" : "p-[var(--spacing-x5)]")}>
        <div className="flex justify-between items-center pb-[var(--spacing-x5)] gap-[var(--spacing-x4)] flex-wrap">
          <div className="flex items-center gap-[var(--spacing-x2)]">
            <Icon name="my-trip" className="w-7 h-7 text-[var(--primary)]" />
            <Typography variant="body-primary-medium" className="text-[var(--primary)] text-2xl">
              My Journeys
            </Typography>
          </div>
          {!isMobile && (
            <div className="flex flex-col items-end gap-[var(--spacing-x2)] flex-1">
              {isCompactHeader ? (
                <>
                  <div className="flex items-center gap-[var(--spacing-x3)] flex-wrap justify-end">
                    <div className="flex items-center gap-[var(--spacing-x2)] flex-wrap">
                      {COMPACT_FILTER_CONFIG.map(({ key, icon, label }) => (
                        <Button
                          key={key}
                          variant={activeCompactFilter === key ? 'primary' : 'secondary'}
                          size="md"
                          icon={icon}
                          iconPosition="only"
                          onClick={() => toggleCompactFilter(key)}
                          aria-label={label}
                          aria-pressed={activeCompactFilter === key}
                          className="rounded-lg"
                        />
                      ))}
                    </div>
                    <Button
                      variant="primary"
                      size="md"
                      icon="add"
                      iconPosition="leading"
                      className="rounded-lg"
                    >
                      Add Journey
                    </Button>
                  </div>
                  {activeCompactFilter && (
                    <div className="w-full max-w-[22.5rem] mt-[var(--spacing-x2)]">
                      {renderCompactFilterContent()}
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center gap-[var(--spacing-x4)]">
                  <Dropdown placeholder="Select company">
                    <DropdownTrigger />
                    <DropdownContent>
                      <DropdownMenu property="default" className="w-full">
                        <DropdownMenuList>
                          {companyOptions.map((opt) => (
                            <DropdownMenuItem key={String(opt.value)} value={String(opt.value)} label={opt.label} />
                          ))}
                        </DropdownMenuList>
                      </DropdownMenu>
                    </DropdownContent>
                  </Dropdown>
                  <DatePicker
                    range
                    startValue={dateRangeStart}
                    endValue={dateRangeEnd}
                    onStartChange={(value) => setDateRangeStart(value)}
                    onEndChange={(value) => setDateRangeEnd(value)}
                    placeholder="12 Aug, 2024 → 12 Sep 2024"
                  />
                  <Dropdown placeholder="Direction">
                    <DropdownTrigger />
                    <DropdownContent>
                      <DropdownMenu property="default" className="w-full">
                        <DropdownMenuList>
                          {directionOptions.map((opt) => (
                            <DropdownMenuItem key={String(opt.value)} value={String(opt.value)} label={opt.label} />
                          ))}
                        </DropdownMenuList>
                      </DropdownMenu>
                    </DropdownContent>
                  </Dropdown>
                  <Input
                    placeholder="Search My Journeys"
                    leadingIcon="search"
                    value={searchTerm}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
                    className="w-[17.5rem]"
                  />
                  <Button variant="primary" icon="add" size="md">
                    Add Journey
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-[var(--spacing-x4)] items-center flex-nowrap mb-[var(--spacing-x5)] overflow-hidden">
          <div className="flex-1 min-w-0">
            <Tabs activeTab={selectedTab} onTabChange={setSelectedTab} overflowBehavior="dropdown">
              <TabsList>
                {JOURNEY_TABS.map((tab, index) => (
                  <TabsTrigger
                    key={`${tab.label}-${index}`}
                    value={`journey-tab-${index}`}
                    disabled={tab.disabled}
                    badge={tab.badge}
                    badgeCount={tab.badgeCount}
                    notification={tab.notification}
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          {!isMobile && (
            <div className="shrink-0">
              <SegmentedTabs
                variant="icon-only"
                value={viewMode}
                onChange={(value: string) => setViewMode(value as 'list' | 'map')}
              >
                <SegmentedTabItem value="list" label="List view" icon={<Icon name="hamburger-menu" className="w-4 h-4" />} />
                <SegmentedTabItem value="map" label="Map view" icon={<Icon name="map" className="w-4 h-4" />} />
              </SegmentedTabs>
            </div>
          )}
        </div>

        {!isMobile && (
          <div className="w-full overflow-hidden">
            {renderQuickFilters(
              filters.map((filter) => {
                if (filter.options && filter.options.length > 0) {
                  const selectedOption = filter.options.find((opt) => {
                    const key = `${filter.id}:${opt.id}`;
                    return activeFilters.has(key);
                  });
                  return {
                    ...filter,
                    selectedOption: selectedOption?.id,
                  };
                }
                return {
                  ...filter,
                  selected: activeFilters.has(filter.id),
                };
              }),
              (filterId: string, optionId?: string) => {
                const key = optionId ? `${filterId}:${optionId}` : filterId;
                setActiveFilters((prev) => {
                  const next = new Set(prev);
                  if (next.has(key)) {
                    next.delete(key);
                  } else {
                    next.add(key);
                  }
                  return next;
                });
              },
              (filterId: string, optionId?: string) => {
                const key = optionId ? `${filterId}:${optionId}` : filterId;
                setActiveFilters((prev) => {
                  const next = new Set(prev);
                  next.delete(key);
                  return next;
                });
              },
              { scrollable: true }
            )}
          </div>
        )}

        {/* Journey count and action buttons line */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'var(--spacing-x5)', marginBottom: 'var(--spacing-x3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-x3)' }}>
            <Typography variant="body-primary-semibold" className="text-[var(--primary)]">
              {filteredJourneys.length} Journeys available
            </Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.125rem' }}>
            <Button variant="text" size="md" icon="star" iconPosition="only" />
            <Button variant="text" size="md" icon="bundle" iconPosition="only" />
            <Button variant="text" size="md" icon="chevron-down" iconPosition="only" />
            <Button variant="text" size="md" icon="more" iconPosition="only" />
            <Button variant="text" size="md" icon="add" iconPosition="only" />
            <div style={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-primary)',
              borderRadius: 'var(--spacing-x2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 'var(--spacing-x10)',
              width: '6.25rem',
              padding: '0 var(--spacing-x3)'
            }}>
              <Button variant="text" size="sm" icon="chevron-left" iconPosition="only" style={{ width: 'var(--spacing-x4)', height: 'var(--spacing-x4)', padding: 0 }} />
              <Typography variant="body-primary-regular" className="text-[var(--tertiary)]" style={{ fontSize: 'var(--font-size-md-rem)' }}>
                1
              </Typography>
              <Button variant="text" size="sm" icon="chevron-right" iconPosition="only" style={{ width: 'var(--spacing-x4)', height: 'var(--spacing-x4)', padding: 0 }} />
            </div>
          </div>
        </div>

        <div style={{ marginTop: 'var(--spacing-x5)' }}>
          {!isMobile ? (
            <div className="journeys-table-wrapper" style={{ border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <ComposableDataTable columns={tableColumns} data={tableData} />
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-x4)' }}>
              {filteredJourneys.map((journey) => (
                <JourneyMobileCard key={journey.journey_id} journey={journey} />
              ))}
            </div>
          )}
        </div>

        {isMobile && (
          <Button
            variant="primary"
            icon="add"
            style={{
              position: 'fixed',
              bottom: 'var(--spacing-x5)',
              right: 'var(--spacing-x5)',
              width: 'var(--spacing-x12)',
              height: 'var(--spacing-x12)',
              borderRadius: 'var(--spacing-x3)',
            }}
          />
        )}
      </div>
    </div>
  );
};
