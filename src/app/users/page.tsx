"use client";
import { ButtonWrapper } from "@/components/button-wrapper";
import { DialogWrapper } from "@/components/dialog-wrapper";

import { UserTable } from "@/components/users-table";
import { Endpoints } from "@/services/api/enum";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Users(): JSX.Element {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    try {
      toast.dismiss();
      toast.loading("Retrieving users...");
      (async () => {
        const response = await axios.get(Endpoints.GetUsers);

        if (response.status !== 200) {
          toast.dismiss();
          toast.error("Failed to fetch users.");
        }
        toast.dismiss();
        toast.success("Users retrieved successfully.");
        setUsersData(response.data);
      })();
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to fetch users");
    }
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <div>
        <DialogWrapper
          maxWidth="100%"
          className="w-[900px]"
          trigger={
            <div className="flex flex-row justify-between items-center">
              <div className="w-full flex flex-row justify-start items-center mt-4">
                <ButtonWrapper text="New User" />
              </div>
            </div>
          }
          title="Add New User"
          description="Fill in the details to add a new user."
        >
          <div>user</div>
        </DialogWrapper>

        <UserTable
          data={usersData}
          errors={{}}
          register={() => {}}
          watch={() => {}}
        />
      </div>
    </div>
  );
}
