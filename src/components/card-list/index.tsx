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
import { ConfirmDelete } from "../modals/confirm-delete";

interface CardListProps {
  cardData: PayrollData[];
}

export const CardList: React.FC<CardListProps> = ({ cardData }) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm();

  console.log("Card Data:", cardData);

  return (
    <div className="flex flex-wrap gap-6 justify-start">
      {cardData?.map((card, index) => (
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
                  <ViewPayloadDetails data={card} id={card.id} />
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
                  <PayrollForm />
                </DialogWrapper>

                <DialogWrapper
                  maxWidth="100%"
                  className="w-[500px]"
                  trigger={
                    <li className="flex flex-row gap-2 items-center hover:bg-black hover:text-white cursor-pointer p-2 rounded-lg">
                      <TrashIcon className="h-5" />
                      <span>Delete Payroll</span>
                    </li>
                  }
                >
                  <ConfirmDelete />
                </DialogWrapper>
              </ul>
            </PopoverWrapper>
          </header>
          <p className="h-full">{card.description}</p>
          <p className="flex flex-row justify-end text-gray-300 text-sm font-bold">
            Created: {card?.createdAt}
          </p>
        </div>
      ))}
    </div>
  );
};
