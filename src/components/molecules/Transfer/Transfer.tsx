"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '../../../lib/utils';
import { Button } from '../../atoms/Button/Button';
import { Checkbox } from '../../atoms/Checkbox';
import { Input } from '../../atoms/Input';
import { Icon } from '../../atoms/Icons';
import { Typography } from '../../atoms/Typography';

export interface TransferItem {
  key: string;
  title?: string;
  description?: string;
  disabled?: boolean;
}

export interface TransferProps {
  dataSource: TransferItem[];
  titles?: [React.ReactNode, React.ReactNode];
  operations?: [string, string];
  targetKeys?: string[];
  selectedKeys?: string[];
  onChange?: (targetKeys: string[], direction: 'left' | 'right', moveKeys: string[]) => void;
  onSelectChange?: (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => void;
  onScroll?: (direction: 'left' | 'right', e: React.SyntheticEvent<HTMLUListElement>) => void;
  render?: (item: TransferItem) => React.ReactNode;
  footer?: (props: any) => React.ReactNode;
  showSearch?: boolean;
  filterOption?: (inputValue: string, item: TransferItem) => boolean;
  searchPlaceholder?: string;
  oneWay?: boolean;
  pagination?: boolean | { pageSize: number }; // Simplified pagination support
  disabled?: boolean;
  className?: string;
}

const TransferList = ({
    title,
    dataSource,
    checkedKeys,
    onItemSelect,
    onItemSelectAll,
    handleFilter,
    filterOption,
    render,
    showSearch,
    searchPlaceholder,
    disabled,
    direction
}: any) => {
    const [filter, setFilter] = useState('');

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
        handleFilter?.(e.target.value);
    };

    const filteredDataSource = dataSource.filter((item: any) => {
        if (!filter) return true;
        if (filterOption) return filterOption(filter, item);
        return item.title?.toLowerCase().includes(filter.toLowerCase());
    });

    const checkedCount = filteredDataSource.filter((item: any) => checkedKeys.includes(item.key)).length;
    const indeterminate = checkedCount > 0 && checkedCount < filteredDataSource.length;
    const allChecked = filteredDataSource.length > 0 && checkedCount === filteredDataSource.length;

    const handleSelectAll = (checked: boolean) => {
        onItemSelectAll(
            filteredDataSource.map((item: any) => item.key),
            checked
        );
    };

    return (
        <div className="flex flex-col border border-[var(--border-primary)] rounded-md w-[250px] h-[300px] overflow-hidden bg-white">
            <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--border-primary)] bg-[var(--background-secondary)]">
                <Checkbox 
                    checked={allChecked} 
                    indeterminate={indeterminate}
                    onChange={(checked) => handleSelectAll(checked as boolean)}
                    disabled={disabled}
                >
                    <span className="ml-2 text-sm">
                        {checkedCount > 0 ? `${checkedCount}/${filteredDataSource.length} items` : `${filteredDataSource.length} items`}
                    </span>
                </Checkbox>
                {title && <span className="text-sm font-medium">{title}</span>}
            </div>
            
            {showSearch && (
                <div className="p-2 border-b border-[var(--border-primary)]">
                    <Input 
                        placeholder={searchPlaceholder || "Search"} 
                        value={filter} 
                        onChange={handleFilterChange} 
                        size="sm"
                        disabled={disabled}
                        prefix={<Icon name="search" size={14} />}
                    />
                </div>
            )}

            <ul className="flex-1 overflow-y-auto p-0 m-0 list-none">
                {filteredDataSource.map((item: any) => (
                    <li 
                        key={item.key}
                        className={cn(
                            "flex items-center px-3 py-2 cursor-pointer transition-colors hover:bg-[var(--background-neutral)]",
                            checkedKeys.includes(item.key) && "bg-[var(--primary-bg-subtle)]",
                            (item.disabled || disabled) && "cursor-not-allowed opacity-50"
                        )}
                        onClick={() => {
                            if (!item.disabled && !disabled) {
                                onItemSelect(item.key, !checkedKeys.includes(item.key));
                            }
                        }}
                    >
                        <Checkbox 
                            checked={checkedKeys.includes(item.key)} 
                            disabled={item.disabled || disabled}
                        />
                        <span className="ml-2 text-sm">{render ? render(item) : item.title}</span>
                    </li>
                ))}
                {filteredDataSource.length === 0 && (
                    <div className="flex items-center justify-center h-full text-[var(--text-tertiary)]">
                        No Data
                    </div>
                )}
            </ul>
        </div>
    );
};

export const Transfer: React.FC<TransferProps> = ({
  dataSource = [],
  titles = ['', ''],
  operations = ['', ''],
  targetKeys = [],
  selectedKeys = [],
  onChange,
  onSelectChange,
  render,
  showSearch,
  searchPlaceholder,
  oneWay,
  disabled,
  className,
  ...props
}) => {
  const [sourceSelectedKeys, setSourceSelectedKeys] = useState<string[]>([]);
  const [targetSelectedKeys, setTargetSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
      // Sync internal state with props if provided
      // If controlled selectedKeys provided, split them logic would be needed
  }, []);

  const handleSelect = (direction: 'left' | 'right', key: string, checked: boolean) => {
      const holder = direction === 'left' ? [...sourceSelectedKeys] : [...targetSelectedKeys];
      const index = holder.indexOf(key);
      if (checked && index === -1) {
          holder.push(key);
      } else if (!checked && index > -1) {
          holder.splice(index, 1);
      }
      
      if (direction === 'left') setSourceSelectedKeys(holder);
      else setTargetSelectedKeys(holder);

      onSelectChange?.(
          direction === 'left' ? holder : sourceSelectedKeys,
          direction === 'right' ? holder : targetSelectedKeys
      );
  };

  const handleSelectAll = (direction: 'left' | 'right', keys: string[], checked: boolean) => {
      const holder = direction === 'left' ? [...sourceSelectedKeys] : [...targetSelectedKeys];
      
      keys.forEach(key => {
          const index = holder.indexOf(key);
          if (checked && index === -1) {
              holder.push(key);
          } else if (!checked && index > -1) {
              holder.splice(index, 1);
          }
      });

      if (direction === 'left') setSourceSelectedKeys(holder);
      else setTargetSelectedKeys(holder);
  };

  const moveTo = (direction: 'left' | 'right') => {
      const moveKeys = direction === 'right' ? sourceSelectedKeys : targetSelectedKeys;
      const newTargetKeys = direction === 'right' 
          ? [...targetKeys, ...moveKeys]
          : targetKeys.filter(key => !moveKeys.includes(key));
      
      onChange?.(newTargetKeys, direction, moveKeys);
      
      // Clear selection after move
      if (direction === 'right') setSourceSelectedKeys([]);
      else setTargetSelectedKeys([]);
  };

  const leftDataSource = dataSource.filter(item => !targetKeys.includes(item.key));
  const rightDataSource = dataSource.filter(item => targetKeys.includes(item.key));

  return (
    <div className={cn("flex items-center gap-4", className)} {...props}>
        <TransferList 
            title={titles[0]}
            dataSource={leftDataSource}
            checkedKeys={sourceSelectedKeys}
            onItemSelect={(key: string, checked: boolean) => handleSelect('left', key, checked)}
            onItemSelectAll={(keys: string[], checked: boolean) => handleSelectAll('left', keys, checked)}
            render={render}
            showSearch={showSearch}
            searchPlaceholder={searchPlaceholder}
            disabled={disabled}
            direction="left"
        />
        
        <div className="flex flex-col gap-2">
            <Button 
                variant="secondary" 
                size="sm" 
                disabled={disabled || sourceSelectedKeys.length === 0}
                onClick={() => moveTo('right')}
                icon={<Icon name="chevron-right" />}
            >
                {operations[0]}
            </Button>
            {!oneWay && (
                <Button 
                    variant="secondary" 
                    size="sm" 
                    disabled={disabled || targetSelectedKeys.length === 0}
                    onClick={() => moveTo('left')}
                    icon={<Icon name="chevron-left" />}
                >
                    {operations[1]}
                </Button>
            )}
        </div>

        <TransferList 
            title={titles[1]}
            dataSource={rightDataSource}
            checkedKeys={targetSelectedKeys}
            onItemSelect={(key: string, checked: boolean) => handleSelect('right', key, checked)}
            onItemSelectAll={(keys: string[], checked: boolean) => handleSelectAll('right', keys, checked)}
            render={render}
            showSearch={showSearch}
            searchPlaceholder={searchPlaceholder}
            disabled={disabled}
            direction="right"
        />
    </div>
  );
};

Transfer.displayName = 'Transfer';

