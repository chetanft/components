"use client";

import React from "react";
import { Group, type GroupProps } from "react-resizable-panels";
import { cn } from "../../../lib/utils";

export type ResizablePanelGroupProps = GroupProps;

const ResizablePanelGroup = ({
  className,
  ...props
}: ResizablePanelGroupProps) => (
  <Group
    data-slot="resizable-panel-group"
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props}
  />
);

ResizablePanelGroup.displayName = "ResizablePanelGroup";

export { ResizablePanelGroup };
