"use client";

import React from "react";
import { Separator, type SeparatorProps } from "react-resizable-panels";
import { cn } from "../../../lib/utils";

export interface ResizableHandleProps extends SeparatorProps {
  withHandle?: boolean;
}

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: ResizableHandleProps) => (
  <Separator
    data-slot="resizable-handle"
    className={cn(
      "relative flex w-px items-center justify-center bg-[var(--border-primary)]",
      "after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2",
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-1",
      "data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full",
      "data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full",
      "data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0",
      "[&[data-panel-group-direction=vertical]>div]:rotate-90",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border border-[var(--border-primary)] bg-[var(--border-primary)]">
        <div className="flex flex-col gap-px">
          <span className="h-px w-1.5 rounded-full bg-[var(--secondary)]" />
          <span className="h-px w-1.5 rounded-full bg-[var(--secondary)]" />
          <span className="h-px w-1.5 rounded-full bg-[var(--secondary)]" />
        </div>
      </div>
    )}
  </Separator>
);

ResizableHandle.displayName = "ResizableHandle";

export { ResizableHandle };
