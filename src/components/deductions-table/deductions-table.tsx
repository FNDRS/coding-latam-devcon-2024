import { Table } from "@radix-ui/themes";
import React from "react";
import { DialogWrapper } from "../dialog-wrapper";
import { DotsHorizontalIcon, PersonIcon } from "@radix-ui/react-icons";
import { PopoverWrapper } from "../popover-wrapper";
import { DeductionsForm } from "../modals/deductions-form";
import { ConfirmDelete } from "../modals/confirm-delete";

interface DeductionData {
  id: string;
  name: string;
  amount: number;
}

interface DeductionsTableProps {
  deductionData: DeductionData[];
  errors: any;
  register: any;
  watch: any;
}

export const DeductionsTable: React.FC<DeductionsTableProps> = ({
  deductionData,
  errors,
  register,
  watch,
}) => {
  return (
    <Table.Root variant="surface" className="rounded-lg my-2">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Code</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Deduction Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {deductionData.map((data, index) => (
          <Table.Row key={index}>
            <Table.RowHeaderCell>{data.id}</Table.RowHeaderCell>
            <Table.RowHeaderCell>{data.name}</Table.RowHeaderCell>
            <Table.RowHeaderCell>{data.amount}</Table.RowHeaderCell>
            <Table.RowHeaderCell>
              <PopoverWrapper
                trigger={<DotsHorizontalIcon className="h-10" />}
                side="bottom"
                className="w-[260px]"
              >
                <ul className="flex flex-col gap-4">
                  <DialogWrapper
                    maxWidth="100%"
                    className="w-[400px]"
                    trigger={
                      <li className="flex flex-row gap-2 items-center hover:bg-black hover:text-white cursor-pointer p-2 rounded-lg">
                        <PersonIcon className="h-5" />
                        <span>Edit deduction</span>
                      </li>
                    }
                    title="Edit Deduction"
                    description="Fill in the details to edit a deduction."
                  >
                    <DeductionsForm
                      deductionData={data}
                      errors={errors}
                      register={register}
                      watch={watch}
                    />
                  </DialogWrapper>
                  <DialogWrapper
                    maxWidth="100%"
                    className="w-[400px]"
                    trigger={
                      <li className="flex flex-row gap-2 items-center hover:bg-black hover:text-white cursor-pointer p-2 rounded-lg">
                        <PersonIcon className="h-5" />
                        <span>Delete deduction</span>
                      </li>
                    }
                  >
                    <ConfirmDelete />
                  </DialogWrapper>
                </ul>
              </PopoverWrapper>
            </Table.RowHeaderCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
