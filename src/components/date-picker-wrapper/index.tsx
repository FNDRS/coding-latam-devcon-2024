import React from "react";
import { DatePicker } from "@medusajs/ui";
import {
  FieldErrorsImpl,
  FieldValues,
  UseFormSetValue,
  Path,
  PathValue,
} from "react-hook-form";
import { ErrorMessage } from "../error-message";

interface DatePickerWrapperProps<T extends FieldValues> {
  label: string;
  name: string;
  required?: boolean;
  errors: FieldErrorsImpl<T>;
  setValue: UseFormSetValue<T>;
  value?: Date | null;
  modal?: boolean;
}

export function DatePickerWrapper<T extends FieldValues>({
  label,
  name,
  errors,
  setValue,
  value,
  modal = false,
}: DatePickerWrapperProps<T>) {
  const hasError = Boolean(errors[name]);

  return (
    <div className="flex flex-col w-full">
      <label className="mb-2 text-sm text-gray-700 font-bold">{label}</label>
      <DatePicker
        className={`w-full bg-gray-100 text-gray-800 py-[0.688rem] outline-black rounded-lg placeholder:text-gray-500 pl-4
        ${
          hasError
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-gray-800"
        }`}
        modal={modal}
        value={value || null}
        onChange={(date) => {
          if (date) {
            setValue(
              name as Path<T>,
              date as unknown as PathValue<T, Path<T>>,
              { shouldValidate: true }
            );
          }
        }}
      />
      {hasError && (
        <ErrorMessage message={errors?.[name]?.message?.toString()} />
      )}
    </div>
  );
}
