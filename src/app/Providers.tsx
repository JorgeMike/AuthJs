import UserProvider from "@/utils/context/UserContext";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <UserProvider>
        <Toaster />
        {children}
      </UserProvider>
    </SessionProvider>
  );
}
