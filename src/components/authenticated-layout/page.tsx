import {
  FileMinusIcon,
  FileTextIcon,
  LockClosedIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { Avatar, Flex, Tabs } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const AuthenticatedLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const sidebarItems = [
    {
      label: "Payrolls",
      icon: <FileTextIcon className="h-4" />,
      href: "/payrolls",
    },
    {
      label: "Deductions",
      icon: <FileMinusIcon className="h-4" />,
      href: "/deductions",
    },
    {
      label: "Employees",
      icon: <PersonIcon className="h-4" />,
      href: "/employees",
    },
    {
      label: "User Management",
      icon: <LockClosedIcon className="h-4" />,
      href: "/users",
    },
  ];

  return (
    <div className="h-screen flex flex-row w-full">
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
          {sidebarItems.map((item, index) => (
            <Link href={item.href} key={index}>
              <li className="mx-3 hover:bg-black hover:text-white cursor-pointer py-4 rounded-lg flex flex-row items-center pl-2">
                {item.icon}
                <span className="pl-2">{item.label}</span>
              </li>
            </Link>
          ))}
        </ul>
      </aside>
      <div className="w-full">
        {/* Header */}
        <header className="h-16 font-bold px-6 bg-gray-100 rounded-lg m-4">
          <ul className="flex flex-row items-center justify-between h-full">
            <li className="font-bold text-xl" />
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
        {/* Main content */}
        <main className="p-4 w-full">{children}</main>
      </div>
    </div>
  );
};
