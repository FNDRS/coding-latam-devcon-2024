import React from "react";
import { AuthenticatedLayout } from "@/components/authenticated-layout/page";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
}
