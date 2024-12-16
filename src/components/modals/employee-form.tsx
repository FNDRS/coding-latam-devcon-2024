"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { InputField } from "../input-field";
import { SelectWrapper } from "../select-wrapper";
import axios from "axios";
import { Endpoints } from "@/services/api/enum";
import toast from "react-hot-toast";
import { DatePickerWrapper } from "../date-picker-wrapper";
import { Loading } from "../loading";

interface EmployeeProps {
  onSuccess: () => void;
}

export const EmployeeForm: React.FC<EmployeeProps> = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EmployeeRequest>({
    defaultValues: {
      birthDate: null,
    },
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [payrolls, setPayrolls] = React.useState<Payroll[]>([]);
  const [payrollCycles, setPayrollCycles] = React.useState<PayrollCycle[]>([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<PayrollResponse>(
          `${Endpoints.GetAllPayrolls}`
        );
        if (response.status !== 200) {
          toast.error("An error occurred while fetching payrolls");
          console.error("An error occurred while fetching employees");
          return;
        }
        const data: Payroll[] = response.data.content;
        setPayrolls(data);
      } catch (error) {
        toast.error("An error occurred while fetching employees");
        console.error("An error occurred while fetching employees: ", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (!watch("payrollId")) {
          return;
        }

        const response = await axios.get<PayrollDetailResponse>(
          `${Endpoints.GetPayrollDetails}/${watch("payrollId")}`
        );

        const data: PayrollCycle[] = response.data.payrollCycles;
        setPayrollCycles(data);
      } catch (error) {
        console.error(
          "An error occurred while fetching payroll cycle: ",
          error
        );
      }
    })();
  }, [payrolls, watch("payrollId")]);

  const onSubmit = async (data: EmployeeRequest) => {
    // TODO: Hourly rate is required for hourly salary type
    try {
      // ISO 8601
      const transformedData = {
        ...data,
        birthDate: data.birthDate
          ? new Date(data.birthDate).toISOString().split("T")[0]
          : null,
      };

      toast.loading("Creating employee...");
      const response = await axios.post(
        `${Endpoints.Employees}`,
        transformedData
      );

      if (response.status !== 201) {
        toast.dismiss();
        toast.error("An error occurred while creating the employee");
        console.error("An error occurred while creating the employee");
        return;
      }

      toast.dismiss();
      toast.success("Employee created successfully");
      onSuccess();
    } catch (error) {
      toast.dismiss();
      toast.error("An error occurred while creating the employee");
      console.error("An error occurred while creating the employee: ", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loading />
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <span className="text-sm text-gray-700 font-bold">
          Personal Information
        </span>
        <hr className="border border-gray-100" />
        <div className="flex flex-row gap-4">
          <div className=" w-[50%]">
            <InputField
              type="text"
              labelText="Name"
              name="firstName"
              errors={errors}
              register={register}
              required
              watch={watch}
            />
          </div>
          <div className="flex flex-grow">
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
          <div className="w-[50%]">
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
          <div className="flex flex-grow">
            <DatePickerWrapper
              label="Birth Date"
              name="birthDate"
              errors={errors}
              setValue={setValue}
              value={watch("birthDate")}
              modal
            />
          </div>
        </div>
        <div className="w-[50%]">
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
          <span className="font-bold text-sm text-gray-700">Labor Journey</span>
          <hr className="border border-gray-100" />

          <div className="flex-row flex gap-4">
            <div className="w-[50%]">
              <SelectWrapper
                control={control}
                name="payrollId"
                label="Select Payroll"
                placeholder="Select..."
                options={payrolls.map((payroll) => ({
                  label: payroll.payrollName,
                  value: payroll.id,
                }))}
                errors={errors}
              />
            </div>
            <div className="w-[50%]">
              <SelectWrapper
                name="cycleId"
                label="Select Cycle"
                placeholder={`${
                  watch("payrollId") ? "Select a cycle" : "Select Payroll First"
                }`}
                options={
                  payrollCycles.length > 0
                    ? payrollCycles.map((cycle) => ({
                        label: `Days: ${cycle.cutDays.join(", ")}`,
                        value: cycle.id,
                      }))
                    : [{ label: "No cycles available", value: "N/A" }]
                }
                control={control}
                errors={errors}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <span className="font-bold text-sm text-gray-700">
            Payment Information
          </span>
          <hr className="border border-gray-100" />
          <div className="w-[50%]">
            <InputField
              type="text"
              labelText="Salary Base"
              name="salaryAmount"
              errors={errors}
              register={register}
              required
              watch={watch}
            />
          </div>
          <div className="w-[50%]">
            {/* TODO: change to enum */}
            <SelectWrapper
              name="paymentMethod"
              label="Payment Method"
              placeholder="Select..."
              options={[
                { label: "Bank", value: "BANK" },
                {
                  label: "International Transfer",
                  value: "INTERNATIONAL_TRANSFER",
                },
                {
                  label: "International Platform",
                  value: "INTERNATIONAL_PLATFORM",
                },
              ]}
              control={control}
              errors={errors}
            />
          </div>
          <div className="flex flex-grow">
            <SelectWrapper
              name="salaryType"
              label="Salary Type"
              placeholder="Select..."
              options={[
                { label: "Monthly", value: "MONTHLY" },
                { label: "Hourly", value: "HOURLY" },
              ]}
              control={control}
              errors={errors}
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
