"use client";
import { AuthProvider } from "@/context/auth-context";
import { Theme } from "@radix-ui/themes";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthProvider>
        <Theme accentColor="blue" panelBackground="solid" radius="large">
          <Toaster />
          {children}
        </Theme>
      </AuthProvider>
    </>
  );
}
