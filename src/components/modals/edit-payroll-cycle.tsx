import { Dialog, Flex, Select, Text, TextField } from "@radix-ui/themes";
import React from "react";
import { ButtonWrapper } from "../button-wrapper";

export const EditPayrollCycle = () => {
  return (
    <Dialog.Content maxWidth="450px">
      <Dialog.Title>Edit Payroll Cycle</Dialog.Title>
      <Dialog.Description size="2" mb="4">
        Make changes to edit your payroll cycle.
      </Dialog.Description>
      <Flex direction="column" gap="3">
        <label>
          <Text as="div" size="2" mb="2" weight="bold">
            Name of the cycle
          </Text>
          <TextField.Root defaultValue="" />
        </label>
        <Select.Root defaultValue="biweekly">
          <Text as="div" size="2" mb="0" weight="bold">
            Frequency
          </Text>
          <Select.Trigger radius="large" />
          <Select.Content>
            <Select.Group>
              <Select.Label>Frequency</Select.Label>
              <Select.Item value="biweekly">BiWeekly</Select.Item>
              <Select.Item value="monthly">Monthly</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </Flex>
      <Flex gap="3" mt="4" justify="end">
        <ButtonWrapper text="Save" />
      </Flex>
    </Dialog.Content>
  );
};
