import { Table } from "@radix-ui/themes";
import React from "react";

interface PayrollData {
  id: string;
  employee: string;
}

interface PayrollCyclesTableProps {
  payrollData: PayrollData[];
}

export const PayrollCyclesTable: React.FC<PayrollCyclesTableProps> = ({
  payrollData,
}) => {
  return (
    <Table.Root variant="surface" className="rounded-lg my-2">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Code</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Employee</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {payrollData.map((data, index) => (
          <Table.Row key={index}>
            <Table.RowHeaderCell>{data.id}</Table.RowHeaderCell>
            <Table.RowHeaderCell>{data.employee}</Table.RowHeaderCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
