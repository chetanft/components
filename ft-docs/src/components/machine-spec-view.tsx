"use client";

import type { ReactNode } from "react";

interface MachineSpecViewProps {
  children: ReactNode;
  className?: string;
}

export function MachineSpecView({ children, className }: MachineSpecViewProps) {
  return (
    <pre
      className={["whitespace-pre-wrap font-mono text-xs-rem leading-relaxed text-primary", className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </pre>
  );
}

