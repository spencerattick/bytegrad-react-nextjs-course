import Logo from "@/components/logo";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-1 justify-center items-center min-h-screen">
      <Logo />
      {children}
    </div>
  );
}
