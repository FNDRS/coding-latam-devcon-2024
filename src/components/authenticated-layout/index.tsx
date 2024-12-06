"use client";

import { useRouter } from "next/navigation";
import { Loading } from "../loading";
import { useAuth } from "@/context/auth-context";

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
    router.push("/");
    return null;
  }

  return <>{children}</>;
};
