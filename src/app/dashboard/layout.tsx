"use client";
import { Flex, Tabs, Avatar } from "@radix-ui/themes";

import Image from "next/image";
import React from "react";

import { FileMinusIcon, FileTextIcon, PersonIcon } from "@radix-ui/react-icons";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-row w-full ">
      <aside className="h-screen border-r-2 border-gray-50">
        <ul className="flex flex-col gap-2 w-[250px] min-h-[400px] py-4 h-screen">
          <li className="my-6 ml-4 h-auto">
            <Image
              src="/img/logo.webp"
              alt="logo"
              width={90}
              height={140}
              priority
            />
          </li>
          <li className="mx-3 hover:bg-black hover:text-white cursor-pointer py-4 rounded-lg font-bold flex flex-row items-center pl-2">
            <FileTextIcon className="h-4" />
            <span className="pl-2">Payroll cycles</span>
          </li>
          <li className="mx-3 hover:bg-black hover:text-white cursor-pointer py-4 rounded-lg font-bold flex flex-row items-center pl-2">
            <FileMinusIcon className="h-4" />
            <span className="pl-2">Deductions</span>
          </li>
          <li className="mx-3 hover:bg-black hover:text-white cursor-pointer py-4 rounded-lg font-bold flex flex-row items-center pl-2">
            <PersonIcon className="h-4" />
            <span className="pl-2">Employees</span>
          </li>
        </ul>
      </aside>
      <div className="w-full">
        <header className="h-16 font-bold px-6 bg-gray-200 rounded-lg m-4">
          <ul className="flex flex-row items-center justify-between h-full">
            <li className="font-bold text-xl">
              <Tabs.Root defaultValue="dashboard">
                <Tabs.List>
                  <Tabs.Trigger value="dashboard">Dashboard</Tabs.Trigger>
                  <Tabs.Trigger value="payslips">Payslips</Tabs.Trigger>
                </Tabs.List>
              </Tabs.Root>
            </li>
            <li className="font-normal flex flex-row gap-2 items-center">
              <span>
                <Flex gap="2">
                  <Avatar fallback="J" size="2" />
                </Flex>
              </span>
              <span>Jorge Torres</span>
            </li>
          </ul>
        </header>
        <main className="p-4 w-full">{children}</main>
      </div>
    </div>
  );
}
