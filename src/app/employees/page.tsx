import { ButtonWrapper } from "@/components/button-wrapper";
import { DialogWrapper } from "@/components/dialog-wrapper";
import { EmployeeTable } from "@/components/employee-table";
import { AddNewEmployeeToPayroll } from "@/components/modals/add-new-employee-to-payroll";
import { EditPayrollCycle } from "@/components/modals/edit-payroll-cycle";
import { EmployeeForm } from "@/components/modals/employee-form";
import { PopoverWrapper } from "@/components/popover-wrapper";
import { TabsWrapper } from "@/components/tabs-wrapper";
import {
  DotsHorizontalIcon,
  FileTextIcon,
  Pencil1Icon,
  PersonIcon,
} from "@radix-ui/react-icons";
import React from "react";

interface Employee {
  id: string;
  name: string;
  position: string;
  code: string;
  salary: number;
  hourlyRate: number;
  overtimeRate: number;
  grossIncome: number;
}

const employeeData: Employee[] = [
  {
    id: "1",
    name: "John Doe",
    position: "Software Engineer",
    code: "EMP-001",
    salary: 5000,
    hourlyRate: 20,
    overtimeRate: 30,
    grossIncome: 6000,
  },
  {
    id: "2",
    name: "Jane Doe",
    position: "Software Engineer",
    code: "EMP-002",
    salary: 5000,
    hourlyRate: 20,
    overtimeRate: 30,
    grossIncome: 6000,
  },
  {
    id: "3",
    name: "John Smith",
    position: "Software Engineer",
    code: "EMP-003",
    salary: 5000,
    hourlyRate: 20,
    overtimeRate: 30,
    grossIncome: 6000,
  },
];

export default function Employees(): JSX.Element {
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
                <DialogWrapper
                  maxWidth="100%"
                  className="w-[900px]"
                  trigger={
                    <div className="flex flex-row justify-between items-center">
                      <div className="w-full flex flex-row justify-start items-center mt-4">
                        <ButtonWrapper text="New Employee" />
                      </div>
                    </div>
                  }
                  title="Add New Employee"
                  description="Fill in the details to add a new employee."
                >
                  <EmployeeForm />
                </DialogWrapper>

                <EmployeeTable
                  employeeData={employeeData}
                  errors={{}}
                  register={() => {}}
                  watch={() => {}}
                />
                {/* <PayrollCyclesTable /> */}
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
