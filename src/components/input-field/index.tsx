"use client";

import React, { useState } from "react";
import {
  FieldErrorsImpl,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { ErrorMessage } from "../error-message";

interface InputFieldProps<T extends FieldValues> {
  labelText: string;
  placeholder?: string;
  name: string;
  type: string;
  note?: string;
  required?: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrorsImpl<T>;
  watch?: UseFormWatch<T>;
}

interface RegisterOptions {
  required?: string;
}

export function InputField<T extends FieldValues>({
  labelText,
  placeholder,
  name,
  type,
  note,
  required,
  register,
  errors,
  watch,
}: InputFieldProps<T>) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const hasError = Boolean(errors[name]);
  const isPasswordField = type === "password";
  const fieldValue = watch ? watch(name as Path<T>) : "";

  const registerOptions: RegisterOptions = {};
  if (required) {
    registerOptions.required = "This field is required";
  }

  return (
    <div className="flex flex-col text-base">
      <div className="flex flex-row gap-1">
        <label className="text-sm font-extrabold mb-1">{labelText}</label>
      </div>
      <div className="flex flex-col gap-2">
        <div className="relative">
          <input
            type={isPasswordField && showPassword ? "text" : type}
            data-cy={name}
            className={`w-full bg-gray-100 text-gray-800 py-4 outline-black rounded-lg placeholder:text-text-gray-500 pl-4
 ${
   hasError
     ? "border-red-500 focus:ring-red-500"
     : "border-gray-300 focus:ring-gray-800"
 }`}
            placeholder={placeholder}
            {...register(name as Path<T>, registerOptions)}
          />
          {isPasswordField && fieldValue && (
            <span
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs font-medium text-gray-800 underline cursor-pointer select-none"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          )}
        </div>
        {hasError && (
          <ErrorMessage message={errors?.[name]?.message?.toString()} />
        )}
        {note && (
          <span className="text-xs font-normal text-gray-500">{note}</span>
        )}
      </div>
    </div>
  );
}
