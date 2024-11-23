import { ButtonWrapper } from "@/components/button-wrapper";
import { DialogWrapper } from "@/components/dialog-wrapper";
import { AddNewEmployeeToPayroll } from "@/components/modals/add-new-employee-to-payroll";
import { PayrollCyclesTable } from "@/components/payroll-cycles-table";
import { PopoverWrapper } from "@/components/popover-wrapper";
import { TabsWrapper } from "@/components/tabs-wrapper";
import { DotsHorizontalIcon, PersonIcon } from "@radix-ui/react-icons";
import React from "react";

export default function Deductions(): JSX.Element {
  return (
    <div className="bg-gray-100 rounded-lg w-full h-full p-4">
      <header>
        <ul className="flex flex-row justify-between items-center w-full pb-4">
          <li className="flex flex-row gap-2 w-full">
            <TabsWrapper
              defaultValue="employee"
              className="w-full"
              triggerClassName="rounded-lg p-2"
              contentClassName="bg-white p-4 rounded-lg"
              tabs={[
                {
                  value: "employee",
                  label: "Employee",
                  content: (
                    <div>
                      <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row gap-2">
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
                                    <span>Add new deduction</span>
                                  </li>
                                }
                                title="Add New Deduction"
                                description="Fill in the details to add a new deduction."
                              >
                                <AddNewEmployeeToPayroll />
                              </DialogWrapper>
                            </ul>
                          </PopoverWrapper>
                        </p>
                      </div>
                      <PayrollCyclesTable />
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
