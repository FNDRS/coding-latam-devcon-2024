"use client";
import {
  FileMinusIcon,
  FileTextIcon,
  LockClosedIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { Avatar, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { PopoverWrapper } from "../popover-wrapper";
import toast from "react-hot-toast";
import { Endpoints } from "@/services/api/enum";
import axios from "axios";

export const AuthenticatedLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const currentPath = usePathname();
  const router = useRouter();
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

  const handleSignOut = async () => {
    try {
      toast.loading("Signing out...");
      await axios.post(Endpoints.Logout);

      toast.dismiss();
      toast.success("Signed out successfully");
      router.push("/login");
    } catch (error) {
      toast.dismiss();
      toast.error("An error occurred while signing out");
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex flex-row w-full">
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
      <div className="w-full">
        <header className="h-16 font-bold px-6 bg-gray-100 rounded-lg m-4">
          <ul className="flex flex-row items-center justify-between h-full">
            <li className="font-bold text-xl" />
            <PopoverWrapper
              trigger={
                <li className="font-normal flex flex-row gap-2 items-center cursor-pointer">
                  <span>
                    <Flex gap="2">
                      <Avatar fallback="J" size="2" />
                    </Flex>
                  </span>
                  <span>Jorge Torres</span>
                </li>
              }
              side="bottom"
              className="w-[260px]"
            >
              <div>
                <p className="text-gray-400 mb-2">Settings</p>
                <hr />
                <ul className="my-2">
                  <li
                    className="hover:bg-black hover:text-white px-4 py-3 rounded-md cursor-pointer"
                    onClick={handleSignOut}
                  >
                    Sign out
                  </li>
                </ul>
              </div>
            </PopoverWrapper>
          </ul>
        </header>
        <main className="p-4 w-full">{children}</main>
      </div>
    </div>
  );
};
