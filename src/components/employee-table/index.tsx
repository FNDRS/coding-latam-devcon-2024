"use client";

import { Table } from "@radix-ui/themes";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Endpoints } from "@/services/api/enum";
import { Loading } from "../loading";
import formatNumberAsCurrency from "@/utils/format";

export const EmployeeTable: React.FC = () => {
  const [employeeData, setEmployeeData] = React.useState<Employee[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<EmployeeResponse>(
          `${Endpoints.Employees}`
        );

        if (response.status !== 200) {
          toast.dismiss();
          toast.error("An error occurred while fetching employees");
        }

        setEmployeeData(response.data.content);
      } catch (error) {
        console.error("An error occurred while fetching employees: ", error);
        toast.dismiss();
        toast.error("An error occurred while fetching employee");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (employeeData.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center">
        <p className="text-[16px] font-semibold text-gray-500">
          No employees found!
        </p>
      </div>
    );
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
          {/* <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell> */}
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
              {formatNumberAsCurrency(data.salaryHourly ?? 0, 0)}
            </Table.RowHeaderCell>
            <Table.RowHeaderCell>
              {" "}
              {formatNumberAsCurrency(data.salaryAmount ?? 0, 0)}
            </Table.RowHeaderCell>
            {/*   <Table.RowHeaderCell>
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
            </Table.RowHeaderCell> */}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
