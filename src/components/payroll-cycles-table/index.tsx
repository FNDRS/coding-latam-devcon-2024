import { Table } from "@radix-ui/themes";
import React from "react";

interface PayrollCyclesTableProps {
  data: EmployeeData[];
}

export const PayrollCyclesTable: React.FC<PayrollCyclesTableProps> = ({
  data,
}) => {
  return (
    <Table.Root variant="surface" className="rounded-lg my-2">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Id</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>FirstName</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data?.map((data, index) => (
          <Table.Row key={index}>
            <Table.RowHeaderCell>{data.id}</Table.RowHeaderCell>
            <Table.RowHeaderCell>{data.firstName}</Table.RowHeaderCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
