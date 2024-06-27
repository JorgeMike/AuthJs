"use client";
import Navbar from "@/components/navbar/Navbar";
import { useSession } from "next-auth/react";
import React from "react";

export default function Page() {
  const { data: session, status } = useSession();

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="mt-5 border rounded p-3 pb-0 bg-light-subtle">
          <p className="text-break">{JSON.stringify(session)}</p>
        </div>
      </div>
    </div>
  );
}
