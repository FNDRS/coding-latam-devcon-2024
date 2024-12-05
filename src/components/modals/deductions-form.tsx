import React from "react";
import { InputField } from "../input-field";

interface DeductionsFormProps {
  errors: any;
  register: any;
  watch: any;
  deductionData?: any;
}

export const DeductionsForm: React.FC<DeductionsFormProps> = ({
  errors,
  register,
  watch,
  deductionData,
}) => {
  return (
    <form>
      <div className="flex flex-col gap-4">
        <InputField
          type="text"
          labelText="Deduction Name"
          name="deductionName"
          placeholder="Enter your Deduction Name"
          errors={errors}
          register={register}
          required
          watch={watch}
        />
        <InputField
          type="text"
          labelText="Amount"
          name="amount"
          placeholder="Enter the amount"
          errors={errors}
          register={register}
          required
          watch={watch}
        />

        <button className="bg-black text-white p-2 rounded-lg px-6 py-3 cursor-pointer">
          Save
        </button>
      </div>
    </form>
  );
};
