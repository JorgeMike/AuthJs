"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";

export default function Navbar() {
  const session = useSession();
  
  return (
    <nav className="navbar px-5 bg-secondary-subtle align-items-center">
      <div>
        <span>Google</span>
      </div>
      <ul className="d-flex list-unstyled gap-3 m-0">
        <li>Home</li>
        <li>
          <button
            onClick={async () => await signOut({ callbackUrl: "/" })}
            className="border-0 bg-secondary-subtle p-0 m-0"
          >
            Sign Out
          </button>
        </li>
      </ul>
    </nav>
  );
}
