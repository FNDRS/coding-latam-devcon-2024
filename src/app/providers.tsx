"use client";
import { Theme } from "@radix-ui/themes";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Theme accentColor="blue" panelBackground="solid" radius="large">
        <Toaster />
        {children}
      </Theme>
    </>
  );
}
