"use client";
import { useUserContext } from "@/utils/context/UserContext";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import UserAvatarDropDown from "./UserAvatarDropDown";

export default function Header() {
  const { fetchUser } = useUserContext();
  const { data: session, status } = useSession();

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap");

    if (session) {
      fetchUser(session);
    }
  }, [session?.user?.email]);

  return (
    <header className="border-bottom lh-1 py-3 sticky-top bg-white">
      <div className="row flex-nowrap justify-content-between align-items-center">
        <div className="col-7">
          <Link
            className="blog-header-logo text-body-emphasis text-decoration-none"
            href="/"
          >
            Large
          </Link>
        </div>
        <div className="col-5 d-flex justify-content-end align-items-center">
          <a className="link-secondary" href="#" aria-label="Search">
            <BiSearch size={20} className="mx-3" />
          </a>
          {session ? (
            <UserAvatarDropDown src={session?.user?.image || "/profile.png"} />
          ) : (
            <Link
              className="btn btn-sm btn-outline-primary rounded-4"
              href="/signin"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
