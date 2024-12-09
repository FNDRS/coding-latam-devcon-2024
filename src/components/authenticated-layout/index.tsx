"use client";

import { useRouter } from "next/navigation";
import { Loading } from "../loading";
import { useAuth } from "@/context/auth-context";
import toast from "react-hot-toast";

export const AuthenticatedLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!isAuthenticated) {
    toast.dismiss();
    toast.error("You need to be logged in to access this page.");
    router.push("/login");
    return null;
  }

  return <>{children}</>;
};
