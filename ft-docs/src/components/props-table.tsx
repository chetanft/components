"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { StoryMeta } from "@/lib/story-loader";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Badge,
} from "../../../src";

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
      <div className={cn("text-muted-foreground text-sm-rem py-4", className)}>
        No props documentation available for this component.
      </div>
    );
  }

  return (
    <Table className={cn("text-sm-rem", className)}>
      <TableHeader>
        <TableRow>
          <TableHead>Prop</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Default</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.map((prop) => (
          <TableRow key={prop.name}>
            <TableCell>
              <code className="text-sm-rem bg-muted px-1.5 py-0.5 rounded font-mono">
                {prop.name}
                {prop.required && (
                  <Badge variant="danger" size="xs" className="ml-1 align-middle">*</Badge>
                )}
              </code>
            </TableCell>
            <TableCell>
              <Badge variant="default" size="xs" className="font-mono break-all max-w-[200px]">
                {prop.type}
              </Badge>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {prop.default ? (
                <code className="text-xs-rem bg-muted/50 px-1.5 py-0.5 rounded font-mono">
                  {prop.default}
                </code>
              ) : (
                <span className="text-muted-foreground/50">&mdash;</span>
              )}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {prop.description || <span className="text-muted-foreground/50">&mdash;</span>}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
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
        <div key={prop.name} className="flex flex-wrap items-baseline gap-2 text-sm-rem">
          <code className="bg-muted px-1.5 py-0.5 rounded font-mono font-medium">
            {prop.name}
            {prop.required && (
              <Badge variant="danger" size="xs" className="ml-1 align-middle">*</Badge>
            )}
          </code>
          <span className="text-muted-foreground">:</span>
          <Badge variant="default" size="xs" className="font-mono">
            {prop.type}
          </Badge>
          {prop.default && (
            <>
              <span className="text-muted-foreground">=</span>
              <code className="text-xs-rem text-muted-foreground font-mono">
                {prop.default}
              </code>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
