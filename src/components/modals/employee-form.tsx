"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { InputField } from "../input-field";
import SelectWrapper from "../select-wrapper";

interface EmployeeFormProps {
  errors: any;
  register: any;
  watch: any;
}

export const EmployeeForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

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
                label="Frequency"
                placeholder="Select..."
                options={[
                  { label: "Biweekly", value: "biweekly" },
                  { label: "Monthly", value: "monthly" },
                ]}
              />
            </div>
            <div className="flex-col flex">
              <label className="text-sm text-black font-bold mb-2">
                Salary type
              </label>
              <SelectWrapper
                label="Frequency"
                placeholder="Select..."
                options={[
                  { label: "Per Hour", value: "perHour" },
                  { label: "Monthly", value: "monthly" },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <span className="font-bold">Payment info</span>
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col">
            <label className="text-sm text-black font-bold mb-2">
              Payment method
            </label>
            <SelectWrapper
              label="Payment Method"
              placeholder="Select..."
              options={[
                { label: "Bank", value: "bank" },
                { label: "International", value: "international" },
                { label: "Platform", value: "platform" },
                { label: "Transfer", value: "transfer" },
              ]}
            />
          </div>
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
