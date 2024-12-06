"use client";
import {
  FileMinusIcon,
  FileTextIcon,
  LockClosedIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const SideBar = () => {
  const currentPath = usePathname();

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
    <aside className="h-screen border-r-2 border-gray-50">
      <ul className="flex flex-col gap-2 w-[250px] min-h-[400px] py-4 h-screen">
        <li className="my-6 ml-4 h-auto">
          <h1 className="font-black text-2xl">PAYBRIDGE</h1>
        </li>
        {sidebarItems.map((item, index) => {
          const isActive = currentPath === item.href;
          return (
            <Link href={item.href} key={index}>
              <li
                className={`mx-3 py-4 rounded-lg flex flex-row items-center pl-2 cursor-pointer ${
                  isActive
                    ? "bg-black text-white"
                    : "hover:bg-black hover:text-white"
                }`}
              >
                {item.icon}
                <span className="pl-2">{item.label}</span>
              </li>
            </Link>
          );
        })}
      </ul>
    </aside>
  );
};
