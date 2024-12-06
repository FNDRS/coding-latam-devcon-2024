import React from "react";
import { AuthenticatedLayout } from "@/components/authenticated-layout";
import { SideBar } from "@/components/sidebar";
import { Header } from "@/components/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthenticatedLayout>
      <div className="h-screen flex flex-row w-full">
        <SideBar />
        <div className="w-full">
          <Header />
          <main className="p-4 w-full">{children}</main>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
