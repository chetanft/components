"use client";
import React, { useState } from 'react';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleHeader,
  CollapsibleTitle,
  CollapsibleExtra,
  CollapsibleContent,
  CollapsibleIcon,
} from './index';
import { cn } from '../../../lib/utils';

export interface CollapseProps {
  accordion?: boolean;
  activeKey?: string | string[];
  defaultActiveKey?: string | string[];
  onChange?: (key: string | string[]) => void;
  items?: {
    key: string;
    label: React.ReactNode;
    children: React.ReactNode;
    extra?: React.ReactNode;
    showArrow?: boolean;
    disabled?: boolean;
  }[];
  ghost?: boolean;
  className?: string;
  bordered?: boolean;
}

export const Collapse: React.FC<CollapseProps> = ({
  accordion,
  activeKey: controlledActiveKey,
  defaultActiveKey,
  onChange,
  items = [],
  ghost,
  bordered = true,
  className,
}) => {
  const [internalActiveKey, setInternalActiveKey] = useState<string | string[]>(
    defaultActiveKey || (accordion ? [] : [])
  );

  const activeKey = controlledActiveKey !== undefined ? controlledActiveKey : internalActiveKey;

  const handleToggle = (key: string) => {
    let newActiveKey: string | string[];

    if (accordion) {
      newActiveKey = activeKey === key ? [] : key;
    } else {
      const keys = Array.isArray(activeKey) ? activeKey : (activeKey ? [activeKey] : []);
      if (keys.includes(key)) {
        newActiveKey = keys.filter(k => k !== key);
      } else {
        newActiveKey = [...keys, key];
      }
    }

    if (controlledActiveKey === undefined) {
      setInternalActiveKey(newActiveKey);
    }
    onChange?.(newActiveKey);
  };

  const isActive = (key: string) => {
    return Array.isArray(activeKey) ? activeKey.includes(key) : activeKey === key;
  };

  return (
    <div className={cn(
        "flex flex-col gap-[var(--spacing-x2)]", 
        ghost ? "bg-transparent" : "bg-transparent",
        !bordered && "border-0",
        className
    )}>
      {items.map(item => (
        <Collapsible
          key={item.key}
          isExpanded={isActive(item.key)}
          onToggle={() => handleToggle(item.key)}
          disabled={item.disabled}
          bg={ghost ? 'Primary' : 'Secondary'} // Use Primary (white) for ghost? Or override styles
          type="Secondary" // Use default generic style
          className={cn(ghost && "bg-transparent border-0")}
        >
          <CollapsibleTrigger>
            <CollapsibleHeader>
              {item.showArrow !== false ? <CollapsibleIcon /> : null}
              <CollapsibleTitle>{item.label}</CollapsibleTitle>
              {item.extra ? <CollapsibleExtra>{item.extra}</CollapsibleExtra> : null}
            </CollapsibleHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>{item.children}</CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
};
