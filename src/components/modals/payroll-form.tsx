import React from "react";
import { InputField } from "../input-field";

interface PayrollFormProps {
  errors: any;
  register: any;
  watch: any;
}

export const PayrollForm: React.FC<PayrollFormProps> = ({
  errors,
  register,
  watch,
}) => {
  return (
    <form>
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

        <button className="bg-black text-white p-2 rounded-lg px-6 py-3 cursor-pointer">
          Save
        </button>
      </div>
    </form>
  );
};
