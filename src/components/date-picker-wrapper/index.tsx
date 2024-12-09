import React from "react";
import { DatePicker } from "@medusajs/ui";
import { FieldErrorsImpl, FieldValues, UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "../error-message";

interface DatePickerWrapperProps<T extends FieldValues> {
  label: string;
  value?: Date | null;
  onChange?: (value: Date | null) => void;
  modal?: boolean;
  name: string;
  required?: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrorsImpl<T>;
}

export function DatePickerWrapper<T extends FieldValues>({
  label,
  value,
  onChange,
  modal = false,
  name,
  required,
  register,
  errors,
}: DatePickerWrapperProps<T>) {
  const hasError = Boolean(errors[name]);

  return (
    <div className="flex flex-col w-full">
      <label className="mb-2 text-sm text-gray-700 font-bold">{label}</label>

      <DatePicker
        className={`w-full bg-gray-100 text-gray-800 py-[0.688rem] outline-black rounded-lg placeholder:text-text-gray-500 pl-4
        ${
          hasError
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-gray-800"
        }`}
        modal={modal}
        value={value}
        onChange={onChange}
      />
      {hasError && (
        <ErrorMessage message={errors?.[name]?.message?.toString()} />
      )}
    </div>
  );
}
