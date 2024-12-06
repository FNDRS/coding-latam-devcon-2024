import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { InputField } from "../input-field";
import toast, { Toaster } from "react-hot-toast";

export const PayrollForm: React.FC = () => {
  const [ids, setIds] = useState<{ monthlyId?: string; biweeklyId?: string }>(
    {}
  );
  const [loading, setLoading] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchPayrollFrequencies = async () => {
      try {
        const response = await axios.get("/api/payroll/get-payroll-frequency");
        const data = response.data;

        const monthlyFrequency = data.find(
          (frequency: any) => frequency.name === "Monthly"
        );
        const biweeklyFrequency = data.find(
          (frequency: any) => frequency.name === "Bimonthly"
        );

        setIds({
          monthlyId: monthlyFrequency?.id,
          biweeklyId: biweeklyFrequency?.id,
        });
        setLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error fetching payroll frequencies:", error.message);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    };

    fetchPayrollFrequencies();
  }, []);

  const onSubmit = async (formData: any) => {
    if (!ids.monthlyId || !ids.biweeklyId) {
      toast.dismiss();
      toast.error("Missing payroll cycle IDs. Please reload the page.");
      return;
    }

    const payload = {
      payrollName: formData.payrollName,
      description: formData.description,
      payrollCycles: [
        {
          payrollCycleId: ids.monthlyId,
          cutDays: [parseInt(formData.monthlyPayrollCycle)],
        },
        {
          payrollCycleId: ids.biweeklyId,
          cutDays: [
            parseInt(formData.biweeklyStartDate),
            parseInt(formData.biweeklyFinalDate),
          ],
        },
      ],
    };

    try {
      await axios.post("/api/payroll/create", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error: any) {
      console.error("Error creating payroll:", error.message);
    }
  };

  if (loading) {
    return <div>Loading payroll data...</div>;
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <InputField
            type="text"
            labelText="Payroll Name"
            name="payrollName"
            placeholder="Enter your Payroll Name"
            errors={errors}
            register={register}
            required
            watch={watch}
          />
          <InputField
            type="text"
            labelText="Description"
            name="description"
            placeholder="Enter your details"
            errors={errors}
            register={register}
            required
            watch={watch}
          />
          <div className="flex flex-col gap-4 mt-4">
            <span className="font-bold">Monthly Cycle</span>
            <InputField
              type="text"
              labelText="Final Day"
              name="monthlyPayrollCycle"
              placeholder="Final Day of the month"
              errors={errors}
              register={register}
              required
              watch={watch}
            />
          </div>
          <div className="flex flex-col gap-4 my-4">
            <span className="font-bold">Biweekly Cycle</span>
            <InputField
              type="text"
              labelText="Start Date"
              name="biweeklyStartDate"
              placeholder="Enter the start date"
              errors={errors}
              register={register}
              required
              watch={watch}
            />
            <InputField
              type="text"
              labelText="Final Date"
              name="biweeklyFinalDate"
              placeholder="Enter the final date"
              errors={errors}
              register={register}
              required
              watch={watch}
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white p-2 rounded-lg px-6 py-3 cursor-pointer"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};
