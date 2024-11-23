"use client";

import { CardList } from "@/components/card-list";
import { DialogWrapper } from "@/components/dialog-wrapper";
import { PayrollForm } from "@/components/modals/payroll-form";

import React from "react";
import { useForm } from "react-hook-form";

export default function Payrolls(): JSX.Element {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm();

  const cardData = [
    {
      title: "Finance",
      description: "This is the payroll for Finance",
      createdDate: "22-11-24",
    },
    {
      title: "Human Resources",
      description: "This is the payroll for HR",
      createdDate: "20-11-24",
    },
    {
      title: "Marketing",
      description: "This is the payroll for marketing",
      createdDate: "18-11-24",
    },
    {
      title: "Marketing",
      description: "This is the payroll for marketing",
      createdDate: "18-11-24",
    },
    {
      title: "Marketing",
      description: "This is the payroll for marketing",
      createdDate: "18-11-24",
    },
  ];

  return (
    <div className="bg-gray-100 h-full rounded-lg p-4">
      <div className="py-6">
        <DialogWrapper
          maxWidth="100%"
          className="w-[600px]"
          trigger={
            <span className="bg-black text-white p-2 rounded-lg px-6 py-3 cursor-pointer">
              New Payroll
            </span>
          }
          title="Add New Payroll"
          description="Fill in the details to add a new Payroll."
        >
          <PayrollForm register={register} errors={errors} watch={watch} />
        </DialogWrapper>
      </div>
      <CardList cardData={cardData} />
    </div>
  );
}
