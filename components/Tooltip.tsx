"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import type { ReactNode } from "react";

type TooltipProviderProps = {
  children: ReactNode;
  delayDuration?: number;
};

export function TooltipProvider({ children, delayDuration = 120 }: TooltipProviderProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration} skipDelayDuration={80}>
      {children}
    </TooltipPrimitive.Provider>
  );
}

type TooltipProps = {
  label: ReactNode;
  children: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
};

export function Tooltip({ label, children, side = "top", sideOffset = 8 }: TooltipProps) {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          className="cusec-tooltip"
          side={side}
          sideOffset={sideOffset}
          collisionPadding={12}
        >
          {label}
          <TooltipPrimitive.Arrow className="cusec-tooltip__arrow" width={10} height={5} />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
