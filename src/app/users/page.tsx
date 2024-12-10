"use client";
import { ButtonWrapper } from "@/components/button-wrapper";
import { DialogWrapper } from "@/components/dialog-wrapper";
import { AddNewUser } from "@/components/modals/add-new-user";

import { UserTable } from "@/components/users-table";
import { Endpoints } from "@/services/api/enum";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Users(): JSX.Element {
  const [usersData, setUsersData] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  useEffect(() => {
    try {
      (async () => {
        const response = await axios.get(Endpoints.GetUsers);

        if (response.status !== 200) {
          toast.dismiss();
          toast.error("Failed to fetch users.");
        }

        setUsersData(response.data);
      })();
    } catch (error) {
      console.error("An error occurred while fetching users", error);
      toast.dismiss();
      toast.error("Failed to fetch users");
    }
  }, [isDialogOpen]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <div>
        <DialogWrapper
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
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
          <AddNewUser onSuccess={handleCloseDialog} />
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
