"use client";

import React from "react";
import { cn } from "../../../lib/utils";

export interface InputOTPSeparatorProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const InputOTPSeparator = React.forwardRef<
  HTMLDivElement,
  InputOTPSeparatorProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="input-otp-separator"
    role="separator"
    className={cn("flex items-center justify-center px-1", className)}
    {...props}
  >
    <span className="text-[var(--text-secondary)]">&ndash;</span>
  </div>
));

InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTPSeparator };
