"use client";

import { useRouter } from "next/navigation";
import { Loading } from "../loading";
import { useAuth } from "@/context/auth-context";
import toast from "react-hot-toast";
import { useEffect } from "react";

export const AuthenticatedLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      toast.dismiss();
      toast.error("You need to be logged in to access this page.");
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return <>{children}</>;
};
