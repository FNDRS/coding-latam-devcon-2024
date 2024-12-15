"use client";

import { Table } from "@radix-ui/themes";
import React, { useEffect } from "react";
import { DialogWrapper } from "../dialog-wrapper";
import {
  DotsHorizontalIcon,
  PersonIcon,
  TimerIcon,
} from "@radix-ui/react-icons";
import { PopoverWrapper } from "../popover-wrapper";
import { ConfirmDelete } from "../modals/confirm-delete";
import toast from "react-hot-toast";
import axios from "axios";
import { Endpoints } from "@/services/api/enum";
import { Loading } from "../loading";
import formatNumberAsCurrency from "@/utils/format";

export const EmployeeTable: React.FC = () => {
  const [employeeData, setEmployeeData] = React.useState<Employee[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axios.get<EmployeeResponse>(
          `${Endpoints.GetEmployees}`
        );

        if (response.status !== 200) {
          toast.dismiss();
          toast.error("An error occurred while fetching employees");
        }

        setEmployeeData(response.data.content);
        console.log("Employee data: ", response);
      } catch (error) {
        console.error("An error occurred while fetching employees: ", error);
        toast.dismiss();
        toast.error("An error occurred while fetching employee");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <Table.Root variant="surface" className="rounded-lg my-2">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Code</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Employee</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Salary Type</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Hourly Salary</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {employeeData.map((data, index) => (
          <Table.Row key={index}>
            <Table.RowHeaderCell className="!font-extrabold">
              {data.id}
            </Table.RowHeaderCell>
            <Table.RowHeaderCell>{data.firstName}</Table.RowHeaderCell>
            <Table.RowHeaderCell>{data.email}</Table.RowHeaderCell>
            <Table.RowHeaderCell>{data.salaryType}</Table.RowHeaderCell>
            <Table.RowHeaderCell>
              {formatNumberAsCurrency(data.salaryAmount ?? 0, 0)}
            </Table.RowHeaderCell>
            <Table.RowHeaderCell>{data.salaryType}</Table.RowHeaderCell>
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
