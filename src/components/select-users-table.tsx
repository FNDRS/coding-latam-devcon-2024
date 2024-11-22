import { Table } from "@radix-ui/themes";
import React from "react";

export const SelectUsersTable = () => {
  return (
    <Table.Root variant="surface" className=" my-2">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Code</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Employee</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Total Hours</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Salary</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Deductions</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Final Salary</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.RowHeaderCell>11101</Table.RowHeaderCell>
          <Table.RowHeaderCell>Dan Sousa</Table.RowHeaderCell>
          <Table.Cell>46 hours</Table.Cell>
          <Table.Cell>$2,500</Table.Cell>
          <Table.Cell>$453</Table.Cell>
          <Table.Cell>$2,047</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  );
};
