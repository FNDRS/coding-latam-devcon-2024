import { Table } from "@radix-ui/themes";
import { Endpoints } from "@/services/api/enum";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loading } from "../loading";

interface UserTableProps {
  isDialogOpen: boolean;
}
interface User {
  nickname: string;
  email: string;
  last_login: string;
}
export const UserTable: React.FC<UserTableProps> = ({ isDialogOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [usersData, setUsersData] = useState<User[]>([]);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await axios.get(Endpoints.GetUsers);

        if (response.status !== 200) {
          toast.dismiss();
          toast.error("Failed to fetch users.");
        }

        setUsersData(response.data);
      } catch (error) {
        console.error("An error occurred while fetching users", error);
        toast.dismiss();
        toast.error("Failed to fetch users");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [isDialogOpen]);

  if (isLoading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (usersData.length === 0) {
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
          <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Last Login</Table.ColumnHeaderCell>
          {/* <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell> */}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {usersData.map((data, index) => (
          <Table.Row key={index}>
            <Table.RowHeaderCell>{data.nickname}</Table.RowHeaderCell>
            <Table.RowHeaderCell>{data.email}</Table.RowHeaderCell>
            <Table.RowHeaderCell>
              {data.last_login
                ? new Date(data.last_login).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "No login registered."}
            </Table.RowHeaderCell>
            {/*  <Table.RowHeaderCell>
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
            </Table.RowHeaderCell> */}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
