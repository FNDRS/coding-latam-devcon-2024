"use client";
import React from "react";
import * as Popover from "@radix-ui/react-popover";

interface PopoverWrapperProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  className?: string;
}

export const PopoverWrapper: React.FC<PopoverWrapperProps> = ({
  trigger,
  children,
  side = "bottom",
  sideOffset = 5,
  className = "",
}) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className={`rounded bg-white p-5 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] ${className}`}
          side={side}
          sideOffset={sideOffset}
        >
          {children}
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
