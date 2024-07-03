import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IUserAvatarDropDownProps {
  src: string;
}

export default function UserAvatarDropDown({ src }: IUserAvatarDropDownProps) {
  return (
    <div className="flex-shrink-0 dropstart rounded p-1">
      <a
        href="#"
        className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <Image
          src={src}
          alt="user"
          width={30}
          height={30}
          className="rounded-circle"
        />
      </a>
      <ul className="dropdown-menu text-small shadow" style={{ zIndex: 10000 }}>
        <li>
          <Link className="dropdown-item" href="/customer/new-project">
            My travels
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" href="/customer/settings">
            Favorits
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" href="/customer/profile">
            Profile
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <button
            onClick={async () => await signOut({ callbackUrl: "/" })}
            className="dropdown-item text-danger"
          >
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
}
