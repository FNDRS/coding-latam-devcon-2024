"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { InputField } from "../input-field";
import { SelectWrapper } from "../select-wrapper";

interface EmployeeFormProps {
  errors: any;
  register: any;
  watch: any;
}

export const EmployeeForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      employeeName: "",
      email: "",
      password: "",
      roles: {},
    },
  });

  const onSubmit = async (data: any) => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <div className="w-[300px]">
            <InputField
              type="text"
              labelText="Name"
              name="employeeName"
              errors={errors}
              register={register}
              required
              watch={watch}
            />
          </div>
          <div className="w-[300px]">
            <InputField
              type="text"
              labelText="Last Name"
              name="lastName"
              errors={errors}
              register={register}
              required
              watch={watch}
            />
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <div className="w-[300px]">
            <InputField
              type="text"
              labelText="Age"
              name="age"
              errors={errors}
              register={register}
              required
              watch={watch}
            />
          </div>
          <div className="w-[300px]">
            <InputField
              type="text"
              labelText="Email"
              name="email"
              errors={errors}
              register={register}
              required
              watch={watch}
            />
          </div>
        </div>
        <div className="w-[300px]">
          <InputField
            type="text"
            labelText="Address"
            name="address"
            errors={errors}
            register={register}
            required
            watch={watch}
          />
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <span className="font-bold">Labor Journey</span>
          <div className="flex-row flex gap-4">
            <div className="flex-col flex">
              <label className="text-sm text-black font-bold mb-2">
                Select the Frequency
              </label>
              <SelectWrapper
                control={control}
                name="frequency"
                label="Frequency"
                placeholder="Select..."
                options={[
                  { label: "Biweekly", value: "biweekly" },
                  { label: "Monthly", value: "monthly" },
                ]}
                errors={errors}
              />
            </div>
            <div className="flex-col flex">
              <SelectWrapper
                name="salaryType"
                label="Frequency"
                placeholder="Select..."
                options={[
                  { label: "Per Hour", value: "perHour" },
                  { label: "Monthly", value: "monthly" },
                ]}
                control={control}
                errors={errors}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <span className="font-bold">Payment info</span>
          <SelectWrapper
            name="paymentMethod"
            label="Payment Method"
            placeholder="Select..."
            options={[
              { label: "Bank", value: "bank" },
              { label: "International", value: "international" },
              { label: "Platform", value: "platform" },
              { label: "Transfer", value: "transfer" },
            ]}
            control={control}
            errors={errors}
          />

          <div className="w-[300px]">
            <InputField
              type="text"
              labelText="Salary Base"
              name="salaryBase"
              errors={errors}
              register={register}
              required
              watch={watch}
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-black text-white p-2 rounded-lg px-6 py-3 cursor-pointer mt-10"
        >
          Save
        </button>
      </div>
    </form>
  );
};
