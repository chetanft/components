"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { StoryMeta } from "@/lib/story-loader";

interface PropsTableProps {
  /** Story meta containing argTypes */
  meta: StoryMeta;
  /** Optional class name */
  className?: string;
}

interface PropInfo {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description: string;
  options?: string[];
}

/**
 * Extract prop information from Storybook argTypes
 */
function extractPropsFromArgTypes(argTypes: Record<string, any>): PropInfo[] {
  const props: PropInfo[] = [];
  
  for (const [name, config] of Object.entries(argTypes)) {
    if (!config) continue;
    
    const prop: PropInfo = {
      name,
      type: 'any',
      required: false,
      description: config.description || '',
    };
    
    // Extract type from control
    if (config.control) {
      const controlType = typeof config.control === 'string' 
        ? config.control 
        : config.control?.type;
      
      if (controlType === 'select' && config.options) {
        prop.type = config.options.map((o: string) => `'${o}'`).join(' | ');
        prop.options = config.options;
      } else if (controlType === 'boolean') {
        prop.type = 'boolean';
      } else if (controlType === 'number') {
        prop.type = 'number';
      } else if (controlType === 'text') {
        prop.type = 'string';
      } else if (controlType === 'object') {
        prop.type = 'object';
      } else if (controlType === 'array') {
        prop.type = 'array';
      } else if (controlType === 'date') {
        prop.type = 'Date';
      } else if (controlType === 'color') {
        prop.type = 'string (color)';
      } else if (controlType) {
        prop.type = controlType;
      }
    }
    
    // Extract type from table.type if available
    if (config.table?.type?.summary) {
      prop.type = config.table.type.summary;
    }
    
    // Extract type from type field directly
    if (config.type) {
      if (typeof config.type === 'string') {
        prop.type = config.type;
      } else if (config.type.name) {
        prop.type = config.type.name;
      }
    }
    
    // Check if required
    if (config.table?.type?.required) {
      prop.required = true;
    }
    
    // Extract default value
    if (config.defaultValue !== undefined) {
      prop.default = String(config.defaultValue);
    } else if (config.table?.defaultValue?.summary !== undefined) {
      prop.default = String(config.table.defaultValue.summary);
    }
    
    props.push(prop);
  }
  
  // Sort: required first, then alphabetically
  return props.sort((a, b) => {
    if (a.required !== b.required) {
      return a.required ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });
}

/**
 * Display a table of component props extracted from Storybook argTypes
 */
export function PropsTable({ meta, className }: PropsTableProps) {
  const props = React.useMemo(() => {
    if (!meta.argTypes) return [];
    return extractPropsFromArgTypes(meta.argTypes);
  }, [meta.argTypes]);
  
  if (props.length === 0) {
    return (
      <div className={cn("text-muted-foreground text-sm py-4", className)}>
        No props documentation available for this component.
      </div>
    );
  }
  
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="text-left py-3 px-4 font-semibold">Prop</th>
            <th className="text-left py-3 px-4 font-semibold">Type</th>
            <th className="text-left py-3 px-4 font-semibold">Default</th>
            <th className="text-left py-3 px-4 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name} className="border-b hover:bg-muted/30 transition-colors">
              <td className="py-3 px-4">
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded font-mono">
                  {prop.name}
                  {prop.required && <span className="text-destructive">*</span>}
                </code>
              </td>
              <td className="py-3 px-4">
                <code className="text-xs bg-muted/50 px-1.5 py-0.5 rounded font-mono text-muted-foreground break-all max-w-[200px] inline-block">
                  {prop.type}
                </code>
              </td>
              <td className="py-3 px-4 text-muted-foreground">
                {prop.default ? (
                  <code className="text-xs bg-muted/50 px-1.5 py-0.5 rounded font-mono">
                    {prop.default}
                  </code>
                ) : (
                  <span className="text-muted-foreground/50">—</span>
                )}
              </td>
              <td className="py-3 px-4 text-muted-foreground">
                {prop.description || <span className="text-muted-foreground/50">—</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Compact props display for smaller spaces
 */
export function PropsCompact({ meta, className }: PropsTableProps) {
  const props = React.useMemo(() => {
    if (!meta.argTypes) return [];
    return extractPropsFromArgTypes(meta.argTypes);
  }, [meta.argTypes]);
  
  if (props.length === 0) return null;
  
  return (
    <div className={cn("space-y-2", className)}>
      {props.map((prop) => (
        <div key={prop.name} className="flex flex-wrap items-baseline gap-2 text-sm">
          <code className="bg-muted px-1.5 py-0.5 rounded font-mono font-medium">
            {prop.name}
            {prop.required && <span className="text-destructive">*</span>}
          </code>
          <span className="text-muted-foreground">:</span>
          <code className="text-xs text-muted-foreground font-mono">
            {prop.type}
          </code>
          {prop.default && (
            <>
              <span className="text-muted-foreground">=</span>
              <code className="text-xs text-muted-foreground font-mono">
                {prop.default}
              </code>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

