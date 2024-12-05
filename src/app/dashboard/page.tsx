"use client";
import React from "react";
import { PayrollCyclesTable } from "../../components/payroll-cycles-table";
import { ButtonWrapper } from "@/components/button-wrapper";
import { TabsWrapper } from "@/components/tabs-wrapper";
import { PopoverWrapper } from "@/components/popover-wrapper";
import {
  DotsHorizontalIcon,
  FileTextIcon,
  Pencil1Icon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { DialogWrapper } from "@/components/dialog-wrapper";
import { EditPayrollCycle } from "@/components/modals/edit-payroll-cycle";
import { AddNewEmployeeToPayroll } from "@/components/modals/add-new-employee-to-payroll";

export default function Dashboard(): JSX.Element {
  return (
    <div className="bg-gray-100 rounded-lg w-full h-full p-4">
      <header>
        <ul className="flex flex-row justify-between items-center w-full pb-4">
          <li className="flex flex-row gap-2 w-full">
            <TabsWrapper
              defaultValue="monthly"
              className="w-full"
              triggerClassName="rounded-lg p-2"
              contentClassName="bg-white p-4 rounded-lg"
              tabs={[
                {
                  value: "monthly",
                  label: "Monthly",
                  content: (
                    <div>
                      <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row gap-2">
                          <p className="bg-gray-800 text-white p-2 rounded-lg w-fit px-6">
                            Cut-off date: <span>Nov 15</span>
                          </p>
                          <p className="text-black p-2 rounded-lg w-fit font-bold">
                            Total employees:{" "}
                            <span className="font-thin">10</span>
                          </p>
                        </div>
                        <p className="cursor-pointer text-3xl">
                          <PopoverWrapper
                            trigger={<DotsHorizontalIcon className="h-10" />}
                            side="bottom"
                            className="w-[260px]"
                          >
                            <ul className="flex flex-col gap-4">
                              <DialogWrapper
                                maxWidth="100%"
                                trigger={
                                  <li className="flex flex-row gap-2 items-center hover:bg-black hover:text-white cursor-pointer p-2 rounded-lg">
                                    <PersonIcon className="h-5" />
                                    <span>Add new employee</span>
                                  </li>
                                }
                                title="Add New Employee"
                                description="Fill in the details to add a new employee."
                              >
                                <AddNewEmployeeToPayroll />
                              </DialogWrapper>
                              <DialogWrapper
                                maxWidth="450px"
                                trigger={
                                  <li className="flex flex-row gap-2 items-center hover:bg-black hover:text-white cursor-pointer p-2 rounded-lg">
                                    <FileTextIcon className="h-5" />
                                    <span>Add new payroll cycle</span>
                                  </li>
                                }
                                title="Edit Payroll Cycle"
                                description="Make changes to edit your payroll cycle."
                              >
                                <EditPayrollCycle />
                              </DialogWrapper>
                              <DialogWrapper
                                maxWidth="450px"
                                trigger={
                                  <li className="flex flex-row gap-2 items-center hover:bg-black hover:text-white cursor-pointer p-2 rounded-lg">
                                    <Pencil1Icon className="h-5" />
                                    <span>Edit payroll cycle</span>
                                  </li>
                                }
                                title="Edit Payroll Cycle"
                                description="Make changes to edit your payroll cycle."
                              >
                                <EditPayrollCycle />
                              </DialogWrapper>
                            </ul>
                          </PopoverWrapper>
                        </p>
                      </div>
                      {/* <PayrollCyclesTable /> */}
                      <div className="w-full flex flex-row justify-end items-center mt-4">
                        <ButtonWrapper text="Send Payslip" />
                      </div>
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
          </li>
        </ul>
      </header>
    </div>
  );
}
