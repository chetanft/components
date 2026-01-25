"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '../../../lib/utils';
import { Button } from '../../atoms/Button/Button';
import { Checkbox } from '../../atoms/Checkbox';
import { Input } from '../../atoms/Input';

export interface TransferItem {
    key: string;
    title?: string;
    description?: string;
    disabled?: boolean;
}

export interface TransferProps {
    /**
     * Data source array (for declarative API)
     * @deprecated Use TransferItem components as children instead
     */
    dataSource?: TransferItem[];
    titles?: [React.ReactNode, React.ReactNode];
    operations?: [string, string];
    targetKeys?: string[];
    selectedKeys?: string[];
    onChange?: (targetKeys: string[], direction: 'left' | 'right', moveKeys: string[]) => void;
    onSelectChange?: (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => void;
    onScroll?: (direction: 'left' | 'right', e: React.SyntheticEvent<HTMLUListElement>) => void;
    render?: (item: TransferItem) => React.ReactNode;
    footer?: (props: any) => React.ReactNode;
    /**
     * @deprecated Use conditional rendering: `{showSearch && <Input />}`
     */
    showSearch?: boolean;
    filterOption?: (inputValue: string, item: TransferItem) => boolean;
    searchPlaceholder?: string;
    oneWay?: boolean;
    pagination?: boolean | { pageSize: number }; // Simplified pagination support
    disabled?: boolean;
    className?: string;
    /**
     * Transfer items (for composable API)
     */
    children?: React.ReactNode;
}

export interface TransferItemComponentProps extends Omit<TransferItem, 'key'> {
    /**
     * Item identifier (used as key if provided, otherwise React key will be used)
     */
    id?: string;
    /**
     * Item content (for composable API)
     */
    children?: React.ReactNode;
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
    direction,
    footer,
    pagination
}: any) => {
    const [filter, setFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = typeof pagination === 'object' ? pagination.pageSize : 10;

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
        setCurrentPage(1);
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

    const totalPages = pagination
        ? Math.max(1, Math.ceil(filteredDataSource.length / pageSize))
        : 1;
    const safePage = Math.min(currentPage, totalPages);
    const startIndex = pagination ? (safePage - 1) * pageSize : 0;
    const pagedDataSource = pagination
        ? filteredDataSource.slice(startIndex, startIndex + pageSize)
        : filteredDataSource;

    const footerContent = footer?.({
        direction,
        total: filteredDataSource.length,
        checkedCount,
        page: safePage,
        pageSize,
        totalPages,
    });

    return (
        <div className="flex flex-col border border-[var(--border-primary)] rounded-md w-[250px] h-[300px] overflow-hidden bg-[var(--color-bg-primary)]">
            <div className="flex items-center justify-between px-[var(--spacing-x3)] py-[var(--spacing-x2)] border-b border-[var(--border-primary)] bg-[var(--color-bg-secondary)]">
                <Checkbox
                    checked={allChecked}
                    indeterminate={indeterminate}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    disabled={disabled}
                >
                    <span className="ml-[var(--spacing-x2)] text-sm">
                        {checkedCount > 0 ? `${checkedCount}/${filteredDataSource.length} items` : `${filteredDataSource.length} items`}
                    </span>
                </Checkbox>
                {title && <span className="text-sm font-medium">{title}</span>}
            </div>

            {showSearch && (
                <div className="p-[var(--spacing-x2)] border-b border-[var(--border-primary)]">
                    <Input
                        placeholder={searchPlaceholder || "Search"}
                        value={filter}
                        onChange={handleFilterChange}
                        size="sm"
                        disabled={disabled}
                    // prefix={<Icon name="search" size={14} />} // TODO: Fix Input prefix type
                    />
                </div>
            )}

            <ul className="flex-1 overflow-y-auto p-0 m-0 list-none">
                {pagedDataSource.map((item: any) => (
                    <li
                        key={item.key}
                        className={cn(
                            "flex items-center px-[var(--spacing-x3)] py-[var(--spacing-x2)] cursor-pointer transition-colors hover:bg-[var(--surface-hover)]",
                            checkedKeys.includes(item.key) && "bg-[var(--color-bg-secondary)]",
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
                        <span className="ml-[var(--spacing-x2)] text-sm">
                            {render ? render(item) : (item.children || item.title)}
                        </span>
                    </li>
                ))}
                {filteredDataSource.length === 0 && (
                    <div className="flex items-center justify-center h-full text-[var(--text-tertiary)]">
                        No Data
                    </div>
                )}
            </ul>

            {(footerContent || pagination) && (
                <div className="border-t border-[var(--border-primary)] bg-[var(--color-bg-secondary)] px-[var(--spacing-x3)] py-[var(--spacing-x2)] text-xs text-[var(--text-tertiary)]">
                    {footerContent && (
                        <div className="mb-[var(--spacing-x2)]">{footerContent}</div>
                    )}
                    {pagination && (
                        <div className="flex items-center justify-between gap-[var(--spacing-x2)]">
                            <Button
                                variant="text"
                                size="sm"
                                disabled={safePage <= 1}
                                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                            >
                                Previous
                            </Button>
                            <span>
                                {safePage} / {totalPages}
                            </span>
                            <Button
                                variant="text"
                                size="sm"
                                disabled={safePage >= totalPages}
                                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                            >
                                Next
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export const Transfer: React.FC<TransferProps> = ({
    dataSource = [],
    titles = ['', ''],
    operations = ['', ''],
    targetKeys = [],
    selectedKeys: _selectedKeys = [],
    onChange,
    onSelectChange,
    render,
    showSearch,
    searchPlaceholder,
    oneWay,
    footer,
    pagination,
    disabled,
    className,
    onScroll: _onScroll,
    children,
    ...props
}) => {
    const [sourceSelectedKeys, setSourceSelectedKeys] = useState<string[]>([]);
    const [targetSelectedKeys, setTargetSelectedKeys] = useState<string[]>([]);

    // Extract items from children if using composable API
    const itemsFromChildren = React.useMemo(() => {
        if (!children) return [];
        return React.Children.toArray(children)
            .filter((child): child is React.ReactElement<TransferItemComponentProps> => 
                React.isValidElement(child) && child.type === TransferItem
            )
            .map(child => {
                // Use id prop if provided, otherwise fall back to React's key prop
                const itemKey = child.props.id || (child.key as string) || String(Math.random());
                return {
                    key: itemKey,
                    title: child.props.children || child.props.title,
                    description: child.props.description,
                    disabled: child.props.disabled,
                };
            });
    }, [children]);

    // Use children items if available, otherwise use dataSource prop
    const allItems = itemsFromChildren.length > 0 ? itemsFromChildren : dataSource;

    // Check if using composable API
    const hasComposableChildren = React.Children.count(children) > 0 && itemsFromChildren.length > 0;

    // Show deprecation warning
    if (process.env.NODE_ENV !== 'production') {
        if (hasComposableChildren && dataSource.length > 0) {
            console.warn(
                'Transfer: Using deprecated props (dataSource array) with composable API. ' +
                'Please use TransferItem components as children instead. ' +
                'See migration guide: docs/migrations/composable-migration.md'
            );
        } else if (!hasComposableChildren && dataSource.length > 0) {
            console.warn(
                'Transfer: Declarative API (dataSource array prop) is deprecated. ' +
                'Please migrate to composable API using TransferItem components as children. ' +
                'See migration guide: docs/migrations/composable-migration.md'
            );
        }
    }

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

    const leftDataSource = allItems.filter(item => !targetKeys.includes(item.key));
    const rightDataSource = allItems.filter(item => targetKeys.includes(item.key));

    return (
        <div className={cn("flex items-center gap-[var(--spacing-x4)]", className)} {...props}>
            <TransferList
                title={titles[0]}
                dataSource={leftDataSource}
                checkedKeys={sourceSelectedKeys}
                onItemSelect={(key: string, checked: boolean) => handleSelect('left', key, checked)}
                onItemSelectAll={(keys: string[], checked: boolean) => handleSelectAll('left', keys, checked)}
                render={render}
                showSearch={showSearch}
                searchPlaceholder={searchPlaceholder}
                footer={footer}
                pagination={pagination}
                disabled={disabled}
                direction="left"
            />

            <div className="flex flex-col gap-[var(--spacing-x2)]">
                <Button
                    variant="secondary"
                    size="sm"
                    disabled={disabled || sourceSelectedKeys.length === 0}
                    onClick={() => moveTo('right')}
                    icon="chevron-right"
                >
                    {operations[0]}
                </Button>
                {!oneWay && (
                    <Button
                        variant="secondary"
                        size="sm"
                        disabled={disabled || targetSelectedKeys.length === 0}
                        onClick={() => moveTo('left')}
                        icon="chevron-left"
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
                footer={footer}
                pagination={pagination}
                disabled={disabled}
                direction="right"
            />
        </div>
    );
};

Transfer.displayName = 'Transfer';

/**
 * TransferItem Component
 *
 * A composable component for individual items in a Transfer component.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Transfer targetKeys={targetKeys} onChange={setTargetKeys}>
 *   <TransferItem key="1" title="Item 1" />
 *   <TransferItem key="2" title="Item 2" />
 *   <TransferItem key="3" title="Item 3" />
 * </Transfer>
 * ```
 */
export const TransferItem: React.FC<TransferItemComponentProps> = ({ children: _children, ..._props }) => {
    // This component is used for composition only - it doesn't render anything itself
    // The Transfer component extracts props from TransferItem children
    return null;
};

TransferItem.displayName = 'TransferItem';
