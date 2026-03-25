"use client";

import React from "react";
import { cn } from "../../../lib/utils";

export interface InputOTPGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const InputOTPGroup = React.forwardRef<HTMLDivElement, InputOTPGroupProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="input-otp-group"
      className={cn("flex items-center", className)}
      {...props}
    />
  )
);

InputOTPGroup.displayName = "InputOTPGroup";

export { InputOTPGroup };
