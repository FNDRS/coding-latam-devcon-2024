import { ButtonWrapper } from "@/components/button-wrapper";
import { DialogWrapper } from "@/components/dialog-wrapper";

import { TabsWrapper } from "@/components/tabs-wrapper";
import { UserTable } from "@/components/users-table";
import React from "react";

const usersData = [
  {
    id: "1",
    code: "1",
    name: "John Doe",
  },
  {
    id: "2",
    code: "2",
    name: "Jane Doe",
  },
  {
    id: "3",
    code: "3",
    name: "John Smith",
  },
  {
    id: "4",
    code: "4",
    name: "Jane Smith",
  },
];

export default function Users(): JSX.Element {
  return (
    <div className="p-2 bg-gray-100 rounded-lg">
      <TabsWrapper
        defaultValue="admin"
        className="w-full "
        triggerClassName="rounded-lg p-2"
        contentClassName="bg-white p-4 rounded-lg"
        tabs={[
          {
            value: "admin",
            label: "Admin",
            content: (
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
            ),
          },
          {
            value: "biweekly",
            label: "Biweekly",
            content: <p>Biweekly tab content</p>,
          },
        ]}
      />
    </div>
  );
}
