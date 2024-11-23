import React from "react";
import { PopoverWrapper } from "../popover-wrapper";
import {
  DotsHorizontalIcon,
  EyeOpenIcon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { DialogWrapper } from "../dialog-wrapper";
import { AddNewEmployeeToPayroll } from "../modals/add-new-employee-to-payroll";
import { PayrollForm } from "../modals/payroll-form";
import { useForm } from "react-hook-form";
import { ViewPayloadDetails } from "../modals/view-payroll-details";

interface CardData {
  title: string;
  description: string;
  createdDate: string;
}

interface CardListProps {
  cardData: CardData[];
}

export const CardList: React.FC<CardListProps> = ({ cardData }) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm();

  const payloadData = {
    payrollName: "Payroll 1",
    payrollDescription: "This is a payroll for the month of November",
    employeesList: ["Employee 1", "Employee 2", "Employee 3"],
    createdAt: "Nov 15, 2021",
  };

  return (
    <div className="flex flex-wrap gap-6 justify-start">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="rounded-lg bg-white p-4 flex flex-col justify-between w-[320px] h-[290px] shadow-xl"
        >
          <header className="flex flex-row gap-2 items-center justify-between">
            <h1 className="text-lg font-bold">{card.title}</h1>
            <PopoverWrapper
              trigger={<DotsHorizontalIcon className="h-10" />}
              side="bottom"
              className="w-[260px]"
            >
              <ul className="flex flex-col gap-4">
                <DialogWrapper
                  className="w-[900px]"
                  maxWidth="100%"
                  trigger={
                    <li className="flex flex-row gap-2 items-center hover:bg-black hover:text-white cursor-pointer p-2 rounded-lg">
                      <EyeOpenIcon className="h-5 cursor-pointer" />
                      <span>Payroll Details</span>
                    </li>
                  }
                >
                  <ViewPayloadDetails data={payloadData} />
                </DialogWrapper>
                <DialogWrapper
                  maxWidth="100%"
                  className="w-[500px]"
                  trigger={
                    <li className="flex flex-row gap-2 items-center hover:bg-black hover:text-white cursor-pointer p-2 rounded-lg">
                      <Pencil1Icon className="h-5" />
                      <span>Edit Payroll</span>
                    </li>
                  }
                  title="Edit Payroll"
                  description="Fill in the details to add a edit payroll."
                >
                  <PayrollForm
                    register={register}
                    errors={errors}
                    watch={watch}
                  />
                </DialogWrapper>

                <li className="flex flex-row gap-2 items-center hover:bg-black hover:text-white cursor-pointer p-2 rounded-lg">
                  <TrashIcon className="h-5" />
                  <span>Delete Payroll</span>
                </li>
              </ul>
            </PopoverWrapper>
          </header>
          <p className="h-full">{card.description}</p>
          <p className="flex flex-row justify-end text-gray-300 text-sm font-bold">
            Created: {card.createdDate}
          </p>
        </div>
      ))}
    </div>
  );
};
