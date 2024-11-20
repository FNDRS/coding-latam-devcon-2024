"use client";
import React from "react";
import { Tabs } from "@radix-ui/themes";

interface Tab {
  value: string;
  label: string;
  content: React.ReactNode;
}

interface TabsWrapperProps {
  tabs: Tab[];
  defaultValue: string;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
}

export const TabsWrapper: React.FC<TabsWrapperProps> = ({
  tabs,
  defaultValue,
  className = "",
  triggerClassName = "",
  contentClassName = "",
}) => {
  return (
    <Tabs.Root defaultValue={defaultValue} className={className}>
      <Tabs.List className="flex gap-2 border-b-2 border-gray-200 pb-2">
        {tabs.map((tab) => (
          <Tabs.Trigger
            key={tab.value}
            value={tab.value}
            className={`tabs-trigger-active ${triggerClassName}`}
          >
            {tab.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {tabs.map((tab) => (
        <Tabs.Content
          key={tab.value}
          value={tab.value}
          className={`mt-4 ${contentClassName}`}
        >
          {tab.content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
};
