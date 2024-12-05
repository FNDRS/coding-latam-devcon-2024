import { Table } from "@radix-ui/themes";
import React from "react";
import { DialogWrapper } from "../dialog-wrapper";
import {
  DotsHorizontalIcon,
  PersonIcon,
  TimerIcon,
} from "@radix-ui/react-icons";
import { PopoverWrapper } from "../popover-wrapper";
import { DeductionsForm } from "../modals/deductions-form";
import { ConfirmDelete } from "../modals/confirm-delete";

interface EmployeeData {
  id: string;
  code: string;
  name: string;
  salary: number;
  hourlyRate: number;
  overtimeRate: number;
  grossIncome: number;
}

interface EmployeeTableProps {
  employeeData: EmployeeData[];
  errors: any;
  register: any;
  watch: any;
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employeeData,
  errors,
  register,
  watch,
}) => {
  return (
    <Table.Root variant="surface" className="rounded-lg my-2">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Code</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Employee</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Salary</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Hourly Rate</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Overtime Rate</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Gross Income</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {employeeData.map((data, index) => (
          <Table.Row key={index}>
            <Table.RowHeaderCell>{data.id}</Table.RowHeaderCell>
            <Table.RowHeaderCell>{data.name}</Table.RowHeaderCell>
            <Table.RowHeaderCell>{data.salary}</Table.RowHeaderCell>
            <Table.RowHeaderCell>{data.hourlyRate}</Table.RowHeaderCell>
            <Table.RowHeaderCell>{data.overtimeRate}</Table.RowHeaderCell>
            <Table.RowHeaderCell>{data.grossIncome}</Table.RowHeaderCell>
            <Table.RowHeaderCell>
              <PopoverWrapper
                trigger={<DotsHorizontalIcon className="h-10" />}
                side="bottom"
                className="w-[260px]"
              >
                <ul className="flex flex-col gap-4">
                  <li className="flex flex-row gap-2 items-center hover:bg-black hover:text-white cursor-pointer p-2 rounded-lg">
                    <TimerIcon className="h-5" />
                    <span>Edit Hours</span>
                  </li>

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
