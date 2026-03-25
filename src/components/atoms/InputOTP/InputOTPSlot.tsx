"use client";

import React, { useContext } from "react";
import { OTPInputContext } from "input-otp";
import { cn } from "../../../lib/utils";

export interface InputOTPSlotProps
  extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
}

const InputOTPSlot = React.forwardRef<HTMLDivElement, InputOTPSlotProps>(
  ({ index, className, ...props }, ref) => {
    const inputOTPContext = useContext(OTPInputContext);
    const slot = inputOTPContext.slots[index];

    if (!slot) return null;

    const { char, hasFakeCaret, isActive } = slot;

    return (
      <div
        ref={ref}
        data-slot="input-otp-slot"
        data-active={isActive}
        data-filled={!!char}
        className={cn(
          "relative flex h-10 w-10 items-center justify-center",
          "border-y border-r border-[var(--border-primary)]",
          "text-sm font-medium transition-all",
          "first:rounded-l-component first:border-l",
          "last:rounded-r-component",
          isActive &&
            "z-10 ring-2 ring-[var(--primary)] border-[var(--primary)]",
          className
        )}
        {...props}
      >
        {char}
        {hasFakeCaret && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-px animate-caret-blink bg-[var(--primary)] duration-1000" />
          </div>
        )}
      </div>
    );
  }
);

InputOTPSlot.displayName = "InputOTPSlot";

export { InputOTPSlot };
