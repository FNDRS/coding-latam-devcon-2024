"use client";

import { CardList } from "@/components/card-list";
import { DialogWrapper } from "@/components/dialog-wrapper";
import { PayrollForm } from "@/components/modals/payroll-form";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Payrolls(): JSX.Element {
  const [cardData, setCardData] = useState<PayrollData[]>([]);

  useEffect(() => {
    const fetchPayrolls = async () => {
      try {
        const response = await axios.get("/api/get-all-payrolls");

        const mappedData = response.data.map((payroll: any) => ({
          id: payroll.id,
          title: payroll.payrollName,
          description: payroll.description,
          createdAt: payroll.createdAt
            ? new Date(payroll.createdAt).toLocaleDateString()
            : "No Date",
        }));

        setCardData(mappedData);
      } catch (error) {
        console.error("Error fetching payroll data:", error);
      }
    };

    fetchPayrolls();
  }, []);

  return (
    <div className="bg-gray-100 h-full rounded-lg p-4">
      <div className="py-6">
        <DialogWrapper
          maxWidth="100%"
          className="w-[600px]"
          trigger={
            <span className="bg-black text-white p-2 rounded-lg px-6 py-3 cursor-pointer">
              New Payroll
            </span>
          }
          title="Add New Payroll"
          description="Fill in the details to add a new Payroll."
        >
          <PayrollForm />
        </DialogWrapper>
      </div>
      <CardList cardData={cardData} />
    </div>
  );
}
