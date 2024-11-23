import React from "react";
import { TabsWrapper } from "../tabs-wrapper";
import { PayrollCyclesTable } from "../payroll-cycles-table";

interface PayrollData {
  payrollName: string;
  payrollDescription: string;
  employeesList: string[];
  createdAt: string;
}

const payrollData = [
  {
    id: "10011",
    employee: "Marlon Geovany",
  },
  {
    id: "10012",
    employee: "Jorge Luis",
  },
];

export const ViewPayloadDetails = ({ data }: { data: PayrollData }) => {
  return (
    <div>
      <h1 className="text-xl font-bold text-blue-500">{data?.payrollName}</h1>
      <p className="text-sm font-bold text-gray-400">{data?.createdAt}</p>
      <p className="my-8">{data?.payrollDescription}</p>
      <p className="font-bold text-md text-blue-900 mb-4">Lista de empleados</p>
      <div className="w-full bg-gray-200 rounded-lg p-4">
        <TabsWrapper
          defaultValue="monthly"
          className="w-full"
          triggerClassName="rounded-lg p-2"
          contentClassName="bg-gray-200 rounded-lg"
          tabs={[
            {
              value: "monthly",
              label: "Monthly",
              content: <PayrollCyclesTable payrollData={payrollData} />,
            },
            {
              value: "biweekly",
              label: "Biweekly",
              content: <p>Biweekly tab content</p>,
            },
          ]}
        />
      </div>
    </div>
  );
};
