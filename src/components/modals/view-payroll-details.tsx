import React, { useEffect, useState } from "react";
import { TabsWrapper } from "../tabs-wrapper";
import { PayrollCyclesTable } from "../payroll-cycles-table";
import axios from "axios";

interface ViewPayloadDetailsProps {
  data: PayrollData;
  id: string;
}

export const ViewPayloadDetails: React.FC<ViewPayloadDetailsProps> = ({
  data,
  id,
}) => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchPayrollData = async (id: string) => {
      try {
        const response = await axios.post("/api/get-user-by-payroll", {
          payrollId: id,
        });

        console.log("Payroll Data:", response.data);

        setUserData(response.data);
        console.log("Payroll Data:", response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error fetching payroll data:", error.message);
        } else {
          console.error("Unknown error:", error);
        }
      }
    };

    fetchPayrollData(id);
  }, [data]);

  return (
    <div>
      <h1 className="text-xl font-bold text-blue-500">{data?.title}</h1>
      <p className="text-sm font-bold text-gray-400">{data?.createdAt}</p>
      <p className="my-8">{data?.description}</p>
      <p className="font-bold text-md text-blue-900 mb-4">Employee List</p>
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
              content: <PayrollCyclesTable data={userData || []} />,
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
