"use client";

import React from "react";
import { OTPInput } from "input-otp";
import { cn } from "../../../lib/utils";

export type InputOTPProps = React.ComponentPropsWithoutRef<typeof OTPInput> & {
  className?: string;
};

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  InputOTPProps
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    data-slot="input-otp"
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
));

InputOTP.displayName = "InputOTP";

export { InputOTP };
