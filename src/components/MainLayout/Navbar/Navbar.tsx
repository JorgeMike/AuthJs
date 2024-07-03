import Link from "next/link";
import React from "react";

const links = [
  { name: "Home", href: "/" },
  { name: "Destinations", href: "/destinations" },
  { name: "Special Offers", href: "#" },
  { name: "Bookings", href: "#" },
  { name: "Packages", href: "#" },
  { name: "Flights", href: "#" },
  { name: "Hotels", href: "#" },
];

export default function Navbar() {
  return (
    <div className="py-1 mb-3 border-bottom">
      <nav className="nav nav-underline">
        {links.map((link) => (
          <Link
            key={link.name}
            className="nav-link link-body-emphasis border-0"
            href={link.href}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
