import React from "react";
import * as Select from "@radix-ui/react-select";
import { CheckmarkIcon } from "react-hot-toast";

interface SelectItemProps {
  children: React.ReactNode;
  className?: string;
  value: string;
  disabled?: boolean;
}

interface SelectWrapperProps {
  label: string;
  options: { label: string; value: string; disabled?: boolean }[];
  placeholder: string;
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={`text-sm leading-none text-black flex items-center h-6 px-6 relative select-none rounded-md 
          data-[disabled]:text-gray-500 data-[disabled]:pointer-events-none 
          data-[highlighted]:outline-none data-[highlighted]:bg-black data-[highlighted]:text-white ${className}`}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 flex items-center justify-center">
          {/* <CheckmarkIcon /> */}
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

SelectItem.displayName = "SelectItem";

const SelectWrapper: React.FC<SelectWrapperProps> = ({
  label,
  options,
  placeholder,
}) => {
  return (
    <Select.Root>
      <Select.Trigger
        className="all-unset inline-flex items-center justify-between rounded-lg px-4 text-sm border border-gray-300 
          h-11 w-48 gap-1 bg-white shadow-md focus:ring-2 focus:ring-black"
        aria-label={label}
      >
        <Select.Value placeholder={placeholder} />
        {/* <Select.Icon className="text-gray-500"></Select.Icon> */}
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className="overflow-hidden bg-white rounded-md z-50 shadow-lg 
            shadow-black/20"
        >
          <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white text-black"></Select.ScrollUpButton>
          <Select.Viewport className="p-1">
            <Select.Group>
              <Select.Label className="px-6 text-xs leading-6 text-gray-700">
                {label}
              </Select.Label>
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className="text-md my-2 py-6"
                >
                  {option.label}
                </SelectItem>
              ))}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white text-black"></Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default SelectWrapper;
