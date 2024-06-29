"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { SlMenu } from "react-icons/sl";

const links = [
  { href: "/d", label: "Overview" },
  { href: "/d/inventory", label: "Inventory" },
  { href: "/d/customers", label: "Customers" },
  { href: "/d/products", label: "Products" },
];

export default function Navbar() {
  const { data: session } = useSession();
  const path = usePathname();

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <header className="py-3 mb-3 border-bottom">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-between">
          <span className="d-none d-sm-flex">MyAplication</span>
          <a
            className="text-decoration-none text-white border px-2 py-1 rounded d-sm-none"
            data-bs-toggle="offcanvas"
            href="#offcanvasExample"
            role="button"
            aria-controls="offcanvasExample"
          >
            <SlMenu size={20} />
          </a>
          <div
            className="offcanvas offcanvas-start d-sm-none"
            tabIndex={-1}
            id="offcanvasExample"
            aria-labelledby="offcanvasExampleLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                Offcanvas
              </h5>
              <button
                type="button"
                className="btn-close fs-6"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="nav d-flex flex-column d-sm-none">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`nav-link px-2 text-white ${
                        path === href && "bg-light-subtle rounded text"
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="d-flex align-items-center">
            <ul className="nav d-none d-sm-flex me-1">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`nav-link px-2 text-white hover-light-subtle rounded ${
                      path === href && "text-muted"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex-shrink-0 dropdown">
              <a
                href="#"
                className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <Image
                  src={session?.user?.image || "/profile.png"}
                  alt="user"
                  width={32}
                  height={32}
                  className="rounded-circle"
                />
              </a>
              <ul className="dropdown-menu text-small shadow">
                <li>
                  <Link className="dropdown-item" href="/d/new-project">
                    New project
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="/d/settings">
                    Settings
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="/d/profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    onClick={async () => await signOut({ callbackUrl: "/" })}
                    className="dropdown-item"
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
