"use client";

import React from "react";
import * as Select from "@radix-ui/react-select";
import {
  FieldErrorsImpl,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { ErrorMessage } from "../error-message";

interface SelectWrapperProps<T extends FieldValues> {
  label: string;
  name: string;
  options: { label: string; value: string; disabled?: boolean }[];
  placeholder: string;
  required?: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrorsImpl<T>;
}

interface SelectItemProps {
  children: React.ReactNode;
  className?: string;
  value: string;
  disabled?: boolean;
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={`text-sm leading-none text-black flex items-center h-14 px-6 relative select-none rounded-md 
          data-[disabled]:text-gray-500 data-[disabled]:pointer-events-none 
          data-[highlighted]:outline-none data-[highlighted]:bg-black data-[highlighted]:text-white ${className}`}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
      </Select.Item>
    );
  }
);

SelectItem.displayName = "SelectItem";

export function SelectWrapper<T extends FieldValues>({
  label,
  name,
  options,
  placeholder,
  required,
  register,
  errors,
}: SelectWrapperProps<T>) {
  const hasError = Boolean(errors[name]);
  return (
    <div className="flex flex-col w-full h-full">
      <label className="text-sm font-extrabold mb-1">{label}</label>
      <Select.Root>
        <Select.Trigger
          className={`all-unset inline-flex items-center justify-between rounded-lg px-4 text-sm border 
            h-14 w-full gap-1 bg-white shadow-md focus:ring-2 focus:ring-black 
            ${
              hasError
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-gray-800"
            }`}
          aria-label={label}
          {...register(name as Path<T>, {
            required: required ? "This field is required" : false,
          })}
        >
          <Select.Value placeholder={placeholder} />
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="overflow-hidden bg-white rounded-md z-50 shadow-lg shadow-black/20">
            <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white text-black"></Select.ScrollUpButton>
            <Select.Viewport className="p-1">
              <Select.Group>
                {options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
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
      {hasError && (
        <ErrorMessage message={errors?.[name]?.message?.toString()} />
      )}
    </div>
  );
}
