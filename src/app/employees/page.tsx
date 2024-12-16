"use client";

import { ButtonWrapper } from "@/components/button-wrapper";
import { DialogWrapper } from "@/components/dialog-wrapper";
import { EmployeeTable } from "@/components/employee-table";
import { EmployeeForm } from "@/components/modals/employee-form";
import { TabsWrapper } from "@/components/tabs-wrapper";

import React from "react";

export default function Employees(): JSX.Element {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <TabsWrapper
        defaultValue="monthly"
        className="w-full "
        triggerClassName="rounded-lg p-2"
        contentClassName="bg-white p-4 rounded-lg"
        tabs={[
          {
            value: "monthly",
            label: "Monthly",
            content: (
              <div>
                <div className="flex flex-row justify-between items-center">
                  <div className="w-full flex flex-row justify-start items-center mt-4">
                    <DialogWrapper
                      open={isDialogOpen}
                      onOpenChange={setIsDialogOpen}
                      maxWidth="100%"
                      className="w-[900px]"
                      trigger={
                        <div className="flex flex-row gap-4">
                          <ButtonWrapper text="New Employee" />
                        </div>
                      }
                      title="Add New Employee"
                      description="Fill in the details to add a new employee."
                    >
                      <EmployeeForm onSuccess={handleCloseDialog} />
                    </DialogWrapper>
                  </div>
                </div>
                <div className="overflow-y-auto max-h-[60vh] my-2">
                  <EmployeeTable />
                </div>
              </div>
            ),
          },
          {
            value: "biweekly",
            label: "Biweekly",
            content: <p className="text-center">No content yet.</p>,
          },
        ]}
      />
    </div>
  );
}
