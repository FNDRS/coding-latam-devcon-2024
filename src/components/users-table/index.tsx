import { Table } from "@radix-ui/themes";
import React from "react";
import { DialogWrapper } from "../dialog-wrapper";
import {
  DotsHorizontalIcon,
  Pencil1Icon,
  PersonIcon,
  TimerIcon,
} from "@radix-ui/react-icons";
import { PopoverWrapper } from "../popover-wrapper";
import { DeductionsForm } from "../modals/deductions-form";
import { ConfirmDelete } from "../modals/confirm-delete";

interface UserData {
  id: string;
  code: string;
  name: string;
}

interface UserTableProps {
  data: UserData[];
  errors: any;
  register: any;
  watch: any;
}

export const UserTable: React.FC<UserTableProps> = ({
  data,
  errors,
  register,
  watch,
}) => {
  return (
    <Table.Root variant="surface" className="rounded-lg my-2">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Code</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>User</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.map((data, index) => (
          <Table.Row key={index}>
            <Table.RowHeaderCell>{data.id}</Table.RowHeaderCell>
            <Table.RowHeaderCell>{data.name}</Table.RowHeaderCell>
            <Table.RowHeaderCell>
              <PopoverWrapper
                trigger={<DotsHorizontalIcon className="h-10" />}
                side="bottom"
                className="w-[260px]"
              >
                <ul className="flex flex-col gap-4">
                  <li className="flex flex-row gap-2 items-center hover:bg-black hover:text-white cursor-pointer p-2 rounded-lg">
                    <Pencil1Icon className="h-5" />
                    <span>Edit User</span>
                  </li>

                  <DialogWrapper
                    maxWidth="100%"
                    className="w-[400px]"
                    trigger={
                      <li className="flex flex-row gap-2 items-center hover:bg-black hover:text-white cursor-pointer p-2 rounded-lg">
                        <PersonIcon className="h-5" />
                        <span>Delete User</span>
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
