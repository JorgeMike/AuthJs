"use client";
import { useSession } from "next-auth/react";
import React from "react";

export default function Page() {
  const { data: session, status } = useSession();
  return (
    <div className="container">
      <div className="mt-5 border rounded p-3 pb-0 bg-light-subtle">
        <p className="text-break">{JSON.stringify(session?.user)}</p>
      </div>
    </div>
  );
}
